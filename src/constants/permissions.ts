/**
 * Permission constants for RBAC.
 * Values match the format used in backend config/rbac_permissions.yaml.
 * Format: module:submodule:permission:scope
 */
export const Permission = {
  // Sales (scoped: all, team, own)
  STATISTICS_SALES_READ_ALL: 'statistics:sales:read:all',
  STATISTICS_SALES_READ_TEAM: 'statistics:sales:read:team',
  STATISTICS_SALES_READ_OWN: 'statistics:sales:read:own',

  // Special sales
  STATISTICS_SPECIAL_SALES_READ_ALL: 'statistics:special-sales:read:all',

  // Accounts receivable (scoped: all, team, own)
  STATISTICS_ACCOUNTS_RECEIVABLE_READ_ALL: 'statistics:accounts-receivable:read:all',
  STATISTICS_ACCOUNTS_RECEIVABLE_READ_TEAM: 'statistics:accounts-receivable:read:team',
  STATISTICS_ACCOUNTS_RECEIVABLE_READ_OWN: 'statistics:accounts-receivable:read:own',

  // Inventory Statistics
  STATISTICS_INVENTORY_READ_ALL: 'statistics:inventory:read:all',

  // Market share
  STATISTICS_MARKET_SHARE_READ_ALL: 'statistics:market-share:read:all',

  // AI
  AI_CHAT_ACCESS: 'ai:chat:access',

  // Inventory full resource permission
  INVENTORY_READ_ALL: 'inventory:read:all'
} as const;

export type PermissionValue = (typeof Permission)[keyof typeof Permission];
