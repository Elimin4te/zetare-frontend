// project-imports
import DashboardLayout from 'layout/Dashboard';
import FlowsLayout from 'layout/Dashboard/FlowsLayout';
import DefaultRouteHandler from 'components/DefaultRouteHandler';
import { Navigate } from 'react-router-dom';

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <FlowsLayout />,
      children: [
        {
          index: true,
          element: <DefaultRouteHandler />,
          handle: { layout: { hideLayoutBreadcrumbs: true } }
        }
      ]
    },
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'landing',
          element: <Navigate to="/" replace />
        }
      ]
    }
  ]
};

export default MainRoutes;
