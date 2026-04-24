import { useMatches } from 'react-router-dom';

import type { RouteHandle, RouteLayoutHandle } from 'types/routes';

const DEFAULT_LAYOUT: RouteLayoutHandle = {
  showDrawerOrNavbar: true,
  showMobileBackButton: false,
  showFooter: true
};

/**
 * Get the effective layout handle for the current route.
 * Merges handle from matched routes (leaf overrides parent).
 */
export function useRouteLayoutHandle(): RouteLayoutHandle {
  const matches = useMatches();

  const merged = matches.reduce<RouteLayoutHandle>((acc, match) => {
    const handle = (match.handle as RouteHandle | undefined)?.layout;
    if (!handle) return acc;
    return {
      ...acc,
      ...(handle.showDrawerOrNavbar !== undefined && { showDrawerOrNavbar: handle.showDrawerOrNavbar }),
      ...(handle.showMobileBackButton !== undefined && { showMobileBackButton: handle.showMobileBackButton }),
      ...(handle.mobileBackTo !== undefined && { mobileBackTo: handle.mobileBackTo }),
      ...(handle.showFooter !== undefined && { showFooter: handle.showFooter }),
      ...(handle.hideLayoutBreadcrumbs !== undefined && { hideLayoutBreadcrumbs: handle.hideLayoutBreadcrumbs })
    };
  }, {});

  return { ...DEFAULT_LAYOUT, ...merged };
}
