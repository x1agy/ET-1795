import { createApi } from '@reduxjs/toolkit/query/react';

import { createApiBaseQuery } from '@/api';
import { endpoints } from '@/constants';

// interface CommonResponse<TData> {
//   data: TData;
//   error: Error | null;
// }

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
    getAccount: builder.query<{ email: string }, void>({
      query: () => ({
        url: endpoints.user,
      }),
    }),
    logoutUser: builder.query<unknown, void>({
      query: () => ({
        url: endpoints.logout,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useLazyPostAccountQuery, useGetAccountQuery, useLazyLogoutUserQuery } = accountApi;
