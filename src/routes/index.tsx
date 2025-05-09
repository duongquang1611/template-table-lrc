import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

// Lazy load các components
const Home = lazy(() => import('@/pages/Home'));
const FunctionsList = lazy(() => import('@/pages/FunctionsList'));
const Profile = lazy(() => import('@/pages/Profile'));
const TemplateTable = lazy(() => import('@/pages/demo/TemplateTable'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/functions-list',
    element: <FunctionsList />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/functions-list/template-table',
    element: <TemplateTable />,
  },
]);
