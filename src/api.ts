import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import Cookies from 'js-cookie';

type ConstructArray<T> = T | T[];

interface AxiosBaseQueryArgs {
  method?: Method;
  url: string;
  body?: unknown;
  params?: Record<string, ConstructArray<string | number | undefined | null>>;
  headers?: AxiosRequestConfig['headers'];
}

type AxiosBaseQuery = BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosError<unknown>>;

const APP_URL = import.meta.env.VITE_BACKEND_URL;
export const apiClient = axios.create({
  baseURL: `http://${APP_URL}/commonTask`,
  proxy: { protocol: 'http', host: 'localhost', port: 4000 },
});

apiClient.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.data?.data?.access_token) {
      const { access_token, refresh_token } = response.data.data;
      Cookies.set('access_token', access_token);
      Cookies.set('refresh_token', refresh_token);
    }
    return response;
  },
  async (err) => {
    const originalConfig: AxiosRequestConfig & { _retry?: boolean } = err.config;
    if (err.response?.status === 401) {
      if (!originalConfig._retry && originalConfig.url) {
        originalConfig._retry = true;
        return apiClient(originalConfig);
      }

      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      window.location.replace('/');
    }

    return Promise.reject(err);
  },
);
apiClient.interceptors.request.use((response) => {
  if (response.url) {
    const accessToken = Cookies.get('access_token');
    response.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return response;
});

export const createApiBaseQuery =
  (basePath = ''): AxiosBaseQuery =>
  ({ url, body, method, params, headers }, { signal }) => {
    const requestUrl = [basePath, url].map((path) => path.replace(/^\\+|\\+$/g, '')).join('');
    return apiClient.request({
      url: requestUrl,
      method: method,
      data: body,
      headers: {
        ...headers,
      },
      params,
      signal,
    });
  };
