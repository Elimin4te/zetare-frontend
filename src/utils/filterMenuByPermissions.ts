import type { NavItemType } from 'types/menu';

/**
 * Check if user has any of the required permissions for a menu item.
 */
function hasPermission(userPermissions: string[], required: string | string[] | undefined): boolean {
  if (!required) return true;
  const toCheck = Array.isArray(required) ? required : [required];
  return toCheck.some((p) => userPermissions.includes(p));
}

function matchesGroups(userGroups: string[], requiredGroups: string[] | undefined): boolean {
  if (!requiredGroups?.length) return true;
  return userGroups.some((g) => requiredGroups.includes(g));
}

/**
 * Filter menu items recursively based on user permissions and optional JWT groups.
 * Items without `permission` / `groups` are not restricted by that dimension.
 */
export function filterMenuByPermissions(items: NavItemType[], userPermissions: string[], userGroups: string[] = []): NavItemType[] {
  return items
    .map((item) => {
      if (item.children?.length) {
        const filteredChildren = filterMenuByPermissions(item.children, userPermissions, userGroups);
        // Hide group if all children were filtered out
        if (filteredChildren.length === 0) return null;
        return { ...item, children: filteredChildren };
      }
      if (!matchesGroups(userGroups, item.groups)) {
        return null;
      }
      if (!hasPermission(userPermissions, item.permission)) {
        return null;
      }
      return item;
    })
    .filter((item): item is NavItemType => item !== null);
}
