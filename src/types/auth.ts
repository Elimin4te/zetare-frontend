import { type ReactNode } from 'react';

// ==============================|| TYPES - AUTH  ||============================== //

export type GuardProps = {
  children: ReactNode;
};

export type UserProfile = {
  username?: string;
  email?: string | null;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  groups?: string[];
  department?: string | null;
  title?: string | null;
  avatar?: string;
  image?: string;
  /** RBAC permissions: module:submodule:permission:scope */
  permissions?: string[];
  /**
   * Custom claim for collector app capabilities.
   * Comes from access token claim: `zeta_collector`.
   */
  zetaCollector?: {
    flows?: string[];
    permissions?: string[];
  };
  id?: string;
  name?: string;
  role?: string;
  tier?: string;
};

export interface AuthProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null;
  token?: string | null;
}

export interface AuthActionProps {
  type: string;
  payload?: AuthProps;
}

export interface JWTDataProps {
  userId: string;
}

export type JWTContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
  startOidcLogin: (redirectTo?: string) => void;
  logout: () => void;
  updateProfile: VoidFunction;
};
