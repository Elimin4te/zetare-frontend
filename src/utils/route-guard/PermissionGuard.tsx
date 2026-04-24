import { useEffect, ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// project-imports
import { usePermissions } from 'hooks/usePermissions';
import { getRequiredPermissionsForRoute } from 'constants/routePermissions';
import { useDefaultPath } from 'hooks/useDefaultPath';

// types
import { GuardProps } from 'types/auth';

function hasPermission(userPermissions: string[], required: string[]): boolean {
  return required.some((p) => userPermissions.includes(p));
}

/**
 * Guards routes that require RBAC permissions.
 * Redirects to landing if user lacks the required permission.
 */
export default function PermissionGuard({ children }: GuardProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const permissions = usePermissions();
  const defaultPath = useDefaultPath();

  useEffect(() => {
    const required = getRequiredPermissionsForRoute(pathname);
    if (required && !hasPermission(permissions, required)) {
      navigate(defaultPath, { replace: true });
    }
  }, [pathname, permissions, defaultPath, navigate]);

  const required = getRequiredPermissionsForRoute(pathname);
  const allowed = !required || hasPermission(permissions, required);

  if (!allowed) {
    return null;
  }

  return children as ReactElement;
}
