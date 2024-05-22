import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AppHeader } from '@/components/AppHeader';

const SuspenseLayout = () => (
  <Suspense fallback={<div></div>}>
    <AppHeader />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    Component: SuspenseLayout,
    path: '/',
    errorElement: (
      <div
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(50%, 50%)' }}
      >
        Ooops!
      </div>
    ),

    children: [],
  },
]);
