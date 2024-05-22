import { Suspense } from 'react';
import { Button } from 'antd';
import { createBrowserRouter, Link } from 'react-router-dom';

import { AppHeader } from '@/components/AppHeader';
import { HomePage } from '@/pages';

const SuspenseLayout = () => (
  <Suspense fallback={<div></div>}>
    <AppHeader />
    <HomePage />
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

    children: [],
  },
]);
