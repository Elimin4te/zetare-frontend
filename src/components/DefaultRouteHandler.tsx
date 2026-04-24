import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';

const DashboardLanding = Loadable(lazy(() => import('pages/dashboard/landing')));

export default function DefaultRouteHandler() {
  return <DashboardLanding />;
}
