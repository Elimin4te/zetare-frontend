import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// project-imports
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ComponentsRoutes from './ComponentsRoutes';
import Loadable from 'components/Loadable';

// import { SimpleLayoutType } from 'config';
// import SimpleLayout from 'layout/Simple';

// render - landing page
// const PagesLanding = Loadable(lazy(() => import('pages/landing')));

// render - error page
const Error404 = Loadable(lazy(() => import('pages/maintenance/error/404')));

const OAuthCallback = Loadable(lazy(() => import('pages/auth/oauth-callback')));

// ==============================|| ROUTES RENDER ||============================== //

const router = createBrowserRouter(
  [
    {
      path: 'auth',
      children: [
        {
          path: 'callback',
          element: <OAuthCallback />
        }
      ]
    },
    // {
    //   path: '/',
    //   element: <SimpleLayout layout={SimpleLayoutType.LANDING} />,
    //   children: [
    //     {
    //       index: true,
    //       element: <PagesLanding />
    //     }
    //   ]
    // },
    LoginRoutes,
    ComponentsRoutes,
    MainRoutes,
    {
      path: '*',
      element: <Error404 />
    }
  ],
  { basename: import.meta.env.VITE_BASE_PATH || '/' }
);

export default router;
