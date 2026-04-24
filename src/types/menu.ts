import { ReactNode } from 'react';

// material-ui
import { ChipProps } from '@mui/material/Chip';

import { GenericCardProps } from './root';
import { NavActionType } from 'config';

// ==============================|| TYPES - MENU  ||============================== //

export type NavActionProps = {
  type: NavActionType;
  label: string;
  function?: any;
  url?: string;
  target?: boolean;
  icon: GenericCardProps['iconPrimary'] | string;
};

export type NavItemType = {
  /** Shown in breadcrumbs when different from title (e.g. longer for breadcrumbs, shorter for drawer) */
  breadcrumbTitle?: ReactNode | string;
  breadcrumbs?: boolean;
  caption?: ReactNode | string;
  children?: NavItemType[];
  elements?: NavItemType[];
  chip?: ChipProps;
  color?: 'primary' | 'secondary' | 'default' | undefined;
  disabled?: boolean;
  external?: boolean;
  isDropdown?: boolean;
  icon?: GenericCardProps['iconPrimary'] | string;
  id?: string;
  link?: string;
  search?: string;
  target?: boolean;
  title?: ReactNode | string;
  type?: string;
  url?: string | undefined;
  /** If set, user must belong to ANY of these JWT groups (in addition to `permission` when present). */
  groups?: string[];
  /** RBAC: user needs ANY of these permissions to see this item */
  permission?: string | string[];
  actions?: NavActionProps[];
};

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type MenuProps = {
  /**
   * Indicate if dashboard layout menu open or not
   */
  isDashboardDrawerOpened: boolean;

  /**
   * Indicate if component layout menu open or not
   */
  isComponentDrawerOpened: boolean;
};
