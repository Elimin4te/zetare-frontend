// project-imports
import DashboardLayout from 'layout/Dashboard';
import DefaultRouteHandler from 'components/DefaultRouteHandler';

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
          element: <DefaultRouteHandler />
        }
      ]
    }
  ]
};

export default MainRoutes;
