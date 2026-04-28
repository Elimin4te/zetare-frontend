import { lazy } from 'react';

import AuthLayout from 'layout/Auth';
import Loadable from 'components/Loadable';

const AuthLogin = Loadable(lazy(() => import('pages/auth/login')));

const LoginRoutes = {
  path: '/login',
  children: [
    {
      path: '/login',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <AuthLogin />
        }
      ]
    }
  ]
};

export default LoginRoutes;
