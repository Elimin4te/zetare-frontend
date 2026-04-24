import { lazy } from 'react';

import AuthLayout from 'layout/Auth';
import Loadable from 'components/Loadable';

const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <AuthLogin />
        },
        {
          path: 'login',
          element: <AuthLogin />
        }
      ]
    }
  ]
};

export default LoginRoutes;
