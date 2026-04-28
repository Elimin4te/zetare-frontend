/**
 * User menu / home routing. Match JWT `groups` from your IdP to config here as you add roles.
 */

export const LANDING_PATH = '/';

export const SECTION_LANDING = 'landing';

export type GroupConfig = {
  defaultPath: string;
  sectionIds: string[];
};

const DEFAULT: GroupConfig = {
  defaultPath: LANDING_PATH,
  sectionIds: [SECTION_LANDING]
};

/** Add IdP group names and optional overrides as needed. */
const GROUP_CONFIGS: Record<string, GroupConfig> = {
  app: DEFAULT
};

const DEFAULT_GROUP_CONFIG = DEFAULT;

/**
 * Resolves which menu / default path to use from the user’s `groups` claim.
 */
export function getEffectiveGroupConfig(groups: string[] | undefined): GroupConfig {
  if (groups?.length) {
    for (const g of groups) {
      if (g in GROUP_CONFIGS) {
        return GROUP_CONFIGS[g]!;
      }
    }
  }
  return DEFAULT_GROUP_CONFIG;
}
