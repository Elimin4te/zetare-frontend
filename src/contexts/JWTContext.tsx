import React, { createContext, useEffect, useReducer } from 'react';

// reducer
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';

import { identifyUser, resetAnalytics, trackUserLogin, trackUserLogout } from 'analytics/mixpanel';
import Loader from 'components/Loader';
import { isOidcClientConfigured, appConfig } from 'config/appConfig';
import {
  getStoredAccessToken,
  isTokenExpired,
  setStoredAccessToken,
  userProfileFromAccessToken
} from 'lib/authentikUser';
import { AuthProps, JWTContextType, UserProfile } from 'types/auth';

const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const run = () => {
      const token = getStoredAccessToken();
      if (token && !isTokenExpired(token)) {
        try {
          const user: UserProfile = userProfileFromAccessToken(token);
          setStoredAccessToken(token);
          identifyUser(user);
          trackUserLogin({ method: 'authentik_jwt' });
          dispatch({ type: LOGIN, payload: { isLoggedIn: true, isInitialized: true, user } });
        } catch (e) {
          console.error(e);
          setStoredAccessToken(null);
          dispatch({ type: LOGOUT });
        }
      } else {
        if (token) {
          setStoredAccessToken(null);
        }
        dispatch({ type: LOGOUT });
      }
    };
    run();
  }, []);

  const startOidcLogin = (redirectTo = '/landing') => {
    const r = redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`;
    if (appConfig.oidcLoginUrl) {
      const u = new URL(appConfig.oidcLoginUrl);
      u.searchParams.set('state', btoa(unescape(encodeURIComponent(r))).replace(/=+$/, ''));
      window.location.assign(u.toString());
      return;
    }
    if (!isOidcClientConfigured()) {
      // eslint-disable-next-line no-alert
      alert('Set VITE_OIDC_LOGIN_URL, or VITE_OIDC_ISSUER + VITE_OIDC_CLIENT_ID + VITE_OIDC_REDIRECT_URI. See .env.example.');
      return;
    }
    const issuer = appConfig.oidcIssuer!.replace(/\/$/, '');
    const p = new URLSearchParams({
      client_id: appConfig.oidcClientId!,
      redirect_uri: appConfig.oidcRedirectUri!,
      response_type: 'code',
      scope: 'openid profile email',
      state: btoa(unescape(encodeURIComponent(r))).replace(/=+$/, '')
    });
    window.location.assign(`${issuer}/application/o/authorize/?${p.toString()}`);
  };

  const logout = () => {
    trackUserLogout();
    resetAnalytics();
    setStoredAccessToken(null);
    dispatch({ type: LOGOUT });
    if (appConfig.oidcEndSessionUrl) {
      window.location.assign(appConfig.oidcEndSessionUrl);
    }
  };

  const updateProfile = () => {};

  if (state.isInitialized === false) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider value={{ ...state, startOidcLogin, logout, updateProfile }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
