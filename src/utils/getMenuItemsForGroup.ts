import type { NavItemType } from 'types/menu';
import { SECTION_LANDING, type GroupConfig } from 'constants/groups';

import landing from 'menu-items/landing';

const SECTION_MAP: Record<string, NavItemType> = {
  [SECTION_LANDING]: landing
};

export function getMenuItemsForGroup(groupConfig: GroupConfig): NavItemType[] {
  return groupConfig.sectionIds.map((id) => SECTION_MAP[id]).filter((item): item is NavItemType => item != null);
}
