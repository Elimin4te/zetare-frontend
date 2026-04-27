import type { User, UserManagerSettings } from 'oidc-client-ts';
import { UserManager } from 'oidc-client-ts';
import type { AuthProviderUserManagerProps } from 'react-oidc-context';

import { appConfig, isOidcBffConfigured } from 'config/appConfig';
import { hasOidcCallbackParamsInUrl, isOauthCallbackPathname, logOidcSigninFailure, oidcAppUrl, returnPathFromOidcState } from 'lib/oidcPaths';

const e = import.meta.env as { VITE_OIDC_SCOPE?: string };

let userManagerSingleton: UserManager | null = null;

export const onSigninCallback: NonNullable<AuthProviderUserManagerProps['onSigninCallback']> = (user: User | undefined) => {
  if (!user?.access_token) {
    logOidcSigninFailure({
      reason: 'onSigninCallback: no user or no access_token (IdP ?error= in URL, or in-browser token step failed). With VITE_OIDC_BFF_URL, the callback uses the BFF instead.'
    });
    return;
  }
  const to = returnPathFromOidcState(user.state);
  window.location.replace(oidcAppUrl(to));
};

function getOidcUserManagerSettings(): UserManagerSettings {
  if (!appConfig.oidcAuthority || !appConfig.oidcClientId || !appConfig.oidcRedirectUri) {
    throw new Error('getOidcUserManagerSettings: missing VITE_OIDC_* env');
  }
  const sc = e.VITE_OIDC_SCOPE;
  return {
    authority: appConfig.oidcAuthority,
    client_id: appConfig.oidcClientId,
    redirect_uri: appConfig.oidcRedirectUri,
    response_type: 'code',
    scope: sc && sc.trim() !== '' ? sc : 'openid email profile',
    // Browser cannot refresh against a confidential client without a secret; BFF will own refresh in a follow-up.
    automaticSilentRenew: !isOidcBffConfigured()
  };
}

/** Single `UserManager` for the app (used by `AuthProvider` and BFF sign-in). */
export function getOidcUserManager(): UserManager {
  if (!userManagerSingleton) {
    userManagerSingleton = new UserManager(getOidcUserManagerSettings());
  }
  return userManagerSingleton;
}

/** When true, `AuthProvider` does not run the in-browser `POST` to the IdP token URL; `/auth/callback` uses the BFF. */
export function shouldSkipOidcSpaTokenExchange(): boolean {
  if (!isOidcBffConfigured() || typeof window === 'undefined') {
    return false;
  }
  return isOauthCallbackPathname() && hasOidcCallbackParamsInUrl();
}

export function oidcProviderPropsForAuthProvider(): AuthProviderUserManagerProps {
  return {
    userManager: getOidcUserManager(),
    onSigninCallback,
    skipSigninCallback: shouldSkipOidcSpaTokenExchange()
  };
}
