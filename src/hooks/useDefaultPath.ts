import { useUserGroup } from './useUserGroup';

/**
 * Get the default path for the current user based on their group.
 * Use this instead of APP_DEFAULT_PATH when the path should vary by user.
 */
export function useDefaultPath(): string {
  const { defaultPath } = useUserGroup();
  return defaultPath;
}
