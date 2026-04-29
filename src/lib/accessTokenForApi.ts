import { isOidcClientConfigured } from 'config/appConfig';
import { getOidcUserManager } from 'config/oidcConfig';
import { getStoredAccessToken, isTokenExpired, setStoredAccessToken, shouldRefreshAccessToken } from 'lib/authentikUser';
import { isOauthCallbackPathname, withOidcAppPath } from 'lib/oidcPaths';

let silentRenewInflight: Promise<string | null> | null = null;

function normalizedPathname(): string {
  const p = (typeof window !== 'undefined' ? window.location.pathname : '/') || '/';
  return p.replace(/\/$/, '') || '/';
}

function isOnLoginPath(): boolean {
  const want = withOidcAppPath('/login').replace(/\/$/, '') || '/';
  return normalizedPathname() === want;
}

function shouldSkipRedirectToLogin(): boolean {
  return isOnLoginPath() || isOauthCallbackPathname();
}

function redirectToLogin(): void {
  if (typeof window === 'undefined' || shouldSkipRedirectToLogin()) {
    return;
  }
  window.location.replace(withOidcAppPath('/login'));
}

async function trySilentRenew(): Promise<string | null> {
  const um = getOidcUserManager();
  const user = await um.signinSilent();
  const next = user?.access_token ?? null;
  if (next && !isTokenExpired(next)) {
    setStoredAccessToken(next);
    return next;
  }
  await um.removeUser();
  setStoredAccessToken(null);
  redirectToLogin();
  return null;
}

/**
 * Access token for outbound API calls (e.g. Supabase `Authorization`).
 * When OIDC is configured and the stored token is missing, expired, or near expiry, runs
 * `UserManager.signinSilent()` once (deduped). On failure, clears the OIDC session and sends the
 * browser to `/login` (unless already on login or OAuth callback).
 */
export async function getAccessTokenForApi(): Promise<string | null> {
  const stored = getStoredAccessToken();

  if (!isOidcClientConfigured()) {
    return stored;
  }

  if (!shouldRefreshAccessToken(stored)) {
    return stored;
  }

  if (shouldSkipRedirectToLogin()) {
    return stored;
  }

  if (!silentRenewInflight) {
    silentRenewInflight = (async () => {
      try {
        return await trySilentRenew();
      } catch {
        try {
          await getOidcUserManager().removeUser();
        } catch {
          // ignore secondary cleanup errors
        }
        setStoredAccessToken(null);
        redirectToLogin();
        return null;
      } finally {
        silentRenewInflight = null;
      }
    })();
  }

  return silentRenewInflight;
}
