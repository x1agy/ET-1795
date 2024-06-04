import { lazy, Suspense } from 'react';
import { Button } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { createBrowserRouter, Link, Outlet } from 'react-router-dom';

import { AppHeader } from '@/components/AppHeader';

import { accountApi } from './store/api';
import { store } from './store';

const SuspenseLayout = () => (
  <Suspense fallback={<div></div>}>
    <AppHeader />
    <Content>
      <Outlet />
    </Content>
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
          gap: '1em',
        }}
      >
        Ooops! We are sorry for that <br />
        <Button>
          <Link to="/">go back</Link>
        </Button>
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
        loader: () => {
          try {
            const response = store.dispatch(accountApi.endpoints.getAccount.initiate()).unwrap();
            return response;
          } catch (e) {
            console.log(e);
            return false;
          }
        },
      },
    ],
  },
]);
