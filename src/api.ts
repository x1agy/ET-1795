import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

type ConstructArray<T> = T | T[];

interface AxiosBaseQueryArgs {
  method?: Method;
  url: string;
  body?: unknown;
  params?: Record<string, ConstructArray<string | number | undefined | null>>;
  headers?: AxiosRequestConfig['headers'];
}

type AxiosBaseQuery = BaseQueryFn<AxiosBaseQueryArgs, unknown, AxiosError<unknown>>;

export const apiClient = axios.create({
  baseURL: `/commonTask`,
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
