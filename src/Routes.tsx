import { lazy, Suspense } from 'react';
import { Button, Spin } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { createBrowserRouter, Link, Outlet, redirect } from 'react-router-dom';

import { AppHeader } from '@/components/AppHeader';

import { accountApi } from './store/api';
import { store } from './store';

const SuspenseLayout = () => (
  <Suspense fallback={<Spin fullscreen />}>
    <AppHeader />
    <Suspense fallback={<Spin fullscreen />}>
      <Content>
        <Outlet />
      </Content>
    </Suspense>
  </Suspense>
);

export const router = createBrowserRouter([
  {
    Component: SuspenseLayout,
    path: '/',
    errorElement: (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1em',
        }}
      >
        Ooops! U are unauthorized! <br />
        <Link to="/">
          <Button>go back</Button>
        </Link>
      </div>
    ),

    children: [
      {
        index: true,

        Component: lazy(() => import('@/pages/HomePage/HomePage')),
      },
      {
        path: '/zip-string',
        Component: lazy(() => import('@/pages/ZipString/ZipString')),
      },
      {
        path: '/string-statistic',
        Component: lazy(() => import('@/pages/StringStats/StringStats')),
        loader: async () => {
          try {
            const response = store.dispatch(accountApi.endpoints.getAccount.initiate()).unwrap();
            return response;
          } catch (e) {
            redirect('/');
          }
        },
      },
      {
        path: '*',
        Component: lazy(() => import('@/pages/HomePage/HomePage')),
      },
    ],
  },
]);
