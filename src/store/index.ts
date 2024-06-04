import { configureStore } from '@reduxjs/toolkit';

import { accountApi } from './api/authApi';
import { userSlice } from './slices';

export const store = configureStore({
  reducer: {
    [accountApi.reducerPath]: accountApi.reducer,
    userData: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(accountApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
