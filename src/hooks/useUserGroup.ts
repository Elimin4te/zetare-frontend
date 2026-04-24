import useAuth from './useAuth';
import { getEffectiveGroupConfig, LANDING_PATH } from 'constants/groups';
import type { GroupConfig } from 'constants/groups';

export type UseUserGroupResult = {
  groupConfig: GroupConfig;
  defaultPath: string;
  canAccessLanding: boolean;
};

/**
 * Get the effective group configuration for the current user.
 * Uses the group hierarchy to resolve config.
 */
export function useUserGroup(): UseUserGroupResult {
  const { user } = useAuth();
  const groupConfig = getEffectiveGroupConfig(user?.groups);

  return {
    groupConfig,
    defaultPath: groupConfig.defaultPath,
    canAccessLanding: groupConfig.defaultPath === LANDING_PATH
  };
}
