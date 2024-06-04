import { createApi } from '@reduxjs/toolkit/query/react';

import { createApiBaseQuery } from '@/api';
import { endpoints } from '@/constants';

interface CommonResponse<TData> {
  data: TData;
  error: Error | null;
}

export interface AuthUser {
  token: string;
  user: {
    id: string;
    login: string;
    password: string;
    username: string;
    roles: string[];
    color: string;
  };
}

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: createApiBaseQuery(),
  tagTypes: ['auth'],
  endpoints: (builder) => ({
    postAccount: builder.query<{ status: string }, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: endpoints.auth,
        body: { email: email, password: password },
        method: 'POST',
      }),
    }),
    getAccount: builder.query<any, void>({
      query: () => ({
        url: endpoints.user,
      }),
      transformResponse: (res: string) => {
        console.log(res);
        return res;
      },
      transformErrorResponse: () => {},
    }),
  }),
});

export const { useLazyPostAccountQuery, useGetAccountQuery } = accountApi;
