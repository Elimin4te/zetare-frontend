import React, { createContext, useEffect, useRef } from 'react';
import { useAuth as useOidcAuth } from 'react-oidc-context';
import { User as OidcUser } from 'oidc-client-ts';

import { identifyUser, resetAnalytics, trackUserLogin, trackUserLogout } from 'analytics/mixpanel';
import Loader from 'components/Loader';
import { isOidcClientConfigured } from 'config/appConfig';
import { isTokenExpired, setStoredAccessToken, userProfileFromAccessToken } from 'lib/authentikUser';
import { OidcReturnState, oidcAppUrl } from 'lib/oidcPaths';
import { JWTContextType, UserProfile } from 'types/auth';

const JWTContext = createContext<JWTContextType | null>(null);

function oidcToProfile(user: OidcUser | null | undefined): UserProfile | null {
  if (!user?.access_token) {
    return null;
  }
  if (isTokenExpired(user.access_token)) {
    return null;
  }
  try {
    return userProfileFromAccessToken(user.access_token);
  } catch {
    return null;
  }
}

/** Renders when OIDC env is missing. */
const StaticModeProvider = ({ children }: { children: React.ReactElement }) => {
  const value: JWTContextType = {
    isLoggedIn: false,
    isInitialized: true,
    user: null,
    startOidcLogin: () => {},
    logout: () => {},
    updateProfile: () => {}
  };
  return <JWTContext.Provider value={value}>{children}</JWTContext.Provider>;
};

/** Renders when wrapped by react-oidc `AuthProvider`. */
const OidcModeProvider = ({ children }: { children: React.ReactElement }) => {
  const oidc = useOidcAuth();
  const { isLoading, user: oidcUser, signinRedirect, removeUser } = oidc;
  const lastTrackedToken = useRef<string | null>(null);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const u = oidcToProfile(oidcUser);
    if (u && oidcUser?.access_token) {
      setStoredAccessToken(oidcUser.access_token);
      if (lastTrackedToken.current !== oidcUser.access_token) {
        lastTrackedToken.current = oidcUser.access_token;
        identifyUser(u);
        trackUserLogin({ method: 'authentik_jwt' });
      }
    } else {
      lastTrackedToken.current = null;
      setStoredAccessToken(null);
      if (oidcUser) {
        void removeUser();
      }
    }
  }, [isLoading, oidcUser, removeUser]);

  const startOidcLogin = (redirectTo = '/landing') => {
    const r = redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`;
    const st: OidcReturnState = { returnPath: r };
    void signinRedirect({ state: st });
  };

  /** Clears this app’s OIDC session only (UserManager storage); does not call Authentik end-session / SSO logout. */
  const logout = () => {
    trackUserLogout();
    resetAnalytics();
    setStoredAccessToken(null);
    lastTrackedToken.current = null;
    void (async () => {
      await removeUser();
      window.location.replace(oidcAppUrl('/login'));
    })();
  };

  const updateProfile = () => {};

  if (isLoading) {
    return <Loader />;
  }

  const user = oidcToProfile(oidcUser);
  const value: JWTContextType = {
    isLoggedIn: Boolean(user),
    isInitialized: true,
    user,
    startOidcLogin,
    logout,
    updateProfile
  };

  return <JWTContext.Provider value={value}>{children}</JWTContext.Provider>;
};

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  if (!isOidcClientConfigured()) {
    return <StaticModeProvider>{children}</StaticModeProvider>;
  }
  return <OidcModeProvider>{children}</OidcModeProvider>;
};

export default JWTContext;
