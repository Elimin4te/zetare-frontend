import useAuth from './useAuth';

/**
 * Check if the current user has any of the given permissions.
 * Returns true if user has at least one of the permissions, or if no permissions are required.
 */
export function useHasPermission(requiredPermissions: string[] | string | undefined): boolean {
  const { user } = useAuth();
  const permissions = user?.permissions ?? [];

  if (!requiredPermissions || requiredPermissions.length === 0) {
    return true;
  }

  const toCheck = Array.isArray(requiredPermissions) ? requiredPermissions : [requiredPermissions];
  return toCheck.some((p) => permissions.includes(p));
}

/**
 * Get the current user's permissions.
 */
export function usePermissions(): string[] {
  const { user } = useAuth();
  return user?.permissions ?? [];
}
