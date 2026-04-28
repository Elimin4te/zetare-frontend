import { lazy } from 'react';

// project-imports
import Loadable from 'components/Loadable';

const FlowsLanding = Loadable(lazy(() => import('pages/flows')));

export default function DefaultRouteHandler() {
  return <FlowsLanding />;
}
