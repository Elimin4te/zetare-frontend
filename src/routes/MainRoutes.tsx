// project-imports
import DashboardLayout from 'layout/Dashboard';
import DefaultRouteHandler from 'components/DefaultRouteHandler';
import { Navigate } from 'react-router-dom';

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <DefaultRouteHandler />
        },
        {
          path: 'landing',
          element: <Navigate to="/" replace />
        }
      ]
    }
  ]
};

export default MainRoutes;
