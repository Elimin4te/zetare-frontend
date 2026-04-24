import { Permission } from './permissions';

/**
 * Maps route paths to the permission(s) required to access them.
 * A route is accessible if the user has ANY of the listed permissions.
 */
export const ROUTE_PERMISSIONS: Record<string, string[]> = {
  '/dashboard/sales': [Permission.STATISTICS_SALES_READ_ALL, Permission.STATISTICS_SALES_READ_TEAM, Permission.STATISTICS_SALES_READ_OWN],
  '/dashboard/special-sales': [Permission.STATISTICS_SPECIAL_SALES_READ_ALL],
  '/dashboard/accounts-receivable': [
    Permission.STATISTICS_ACCOUNTS_RECEIVABLE_READ_ALL,
    Permission.STATISTICS_ACCOUNTS_RECEIVABLE_READ_TEAM,
    Permission.STATISTICS_ACCOUNTS_RECEIVABLE_READ_OWN
  ],
  '/dashboard/stocks': [Permission.STATISTICS_INVENTORY_READ_ALL, Permission.INVENTORY_READ_ALL],
  '/dashboard/market-share': [Permission.STATISTICS_MARKET_SHARE_READ_ALL]
};

/**
 * Get the required permissions for a route path.
 * Returns undefined if the route has no permission requirement (e.g. landing).
 */
export function getRequiredPermissionsForRoute(path: string): string[] | undefined {
  // Normalize path (remove leading slash for consistency)
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return ROUTE_PERMISSIONS[normalized];
}
