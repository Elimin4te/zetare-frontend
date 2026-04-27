import { OidcClient, User, type UserProfile } from 'oidc-client-ts';
import { jwtDecode } from 'jwt-decode';

import { getOidcUserManager } from 'config/oidcConfig';
import { oidcAppUrl, returnPathFromOidcState } from 'lib/oidcPaths';
import { appConfig, isOidcBffConfigured } from 'config/appConfig';

type OauthTokenResponse = {
  access_token: string;
  id_token?: string;
  refresh_token?: string;
  token_type: string;
  expires_in?: number;
  scope?: string;
  session_state?: string | null;
};

let oidcClient: OidcClient | null = null;
/** Deduplicate callback handling (e.g. React 18 Strict Mode double `useEffect`). */
let bffCallbackPromise: Promise<void> | null = null;

function getOidcClient(um: ReturnType<typeof getOidcUserManager>) {
  oidcClient ??= new OidcClient(um.settings);
  return oidcClient;
}

async function signInWithOidcBffImpl(): Promise<void> {
  if (!isOidcBffConfigured() || !appConfig.oidcBffBaseUrl) {
    throw new Error('oidcBff: VITE_OIDC_BFF_URL is not set');
  }
  const um = getOidcUserManager();
  const client = getOidcClient(um);
  const href = window.location.href;

  const { state, response: authResponse } = await client.readSigninResponseState(href, true);

  if (authResponse.error) {
    throw new Error(
      [authResponse.error, authResponse.error_description].filter(Boolean).join(': ') || 'IdP error on redirect'
    );
  }
  if (!authResponse.code) {
    throw new Error('oidcBff: expected authorization `code` in the callback URL');
  }

  const bff = `${appConfig.oidcBffBaseUrl.replace(/\/$/, '')}/v1/token`;
  const body: Record<string, string> = {
    code: authResponse.code,
    redirect_uri: state.redirect_uri
  };
  if (appConfig.oidcBffClientKey) {
    body.client_key = appConfig.oidcBffClientKey;
  }
  if (state.code_verifier) {
    body.code_verifier = state.code_verifier;
  }

  const bffRes = await fetch(bff, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const bffText = await bffRes.text();
  let bffData: OauthTokenResponse & { error?: string; error_description?: string };
  try {
    bffData = JSON.parse(bffText) as typeof bffData;
  } catch {
    throw new Error(`BFF: expected JSON, got: ${bffText.slice(0, 200)}`);
  }

  if (!bffRes.ok) {
    const errMsg = bffData.error
      ? [bffData.error, bffData.error_description].filter(Boolean).join(': ')
      : bffText.slice(0, 500);
    throw new Error(errMsg || `BFF: HTTP ${bffRes.status}`);
  }
  if (!bffData.access_token) {
    throw new Error('BFF: no access_token in response');
  }

  const idToken = bffData.id_token;
  const profile: UserProfile = idToken
    ? (jwtDecode(idToken) as UserProfile)
    : ({ sub: 'unknown' } as UserProfile);

  const now = Math.floor(Date.now() / 1000);
  const expiresAt = bffData.expires_in != null ? now + bffData.expires_in : undefined;

  const user: User = new User({
    access_token: bffData.access_token,
    id_token: idToken,
    refresh_token: bffData.refresh_token,
    token_type: bffData.token_type || 'Bearer',
    session_state: bffData.session_state != null ? bffData.session_state : null,
    scope: bffData.scope,
    profile,
    expires_at: expiresAt,
    userState: state.data,
    url_state: state.url_state
  });

  await um.storeUser(user);
  await um.events.load(user);

  const to = returnPathFromOidcState(user.state);
  window.location.replace(oidcAppUrl(to));
}

/**
 * `POST` authorization code to the configured OIDC BFF, then persist the session with oidc-client-ts
 * and navigate to the in-app return path. Deduplicated if called twice (Strict Mode / concurrent effects).
 */
export function signInWithOidcBffDeduplicated(): Promise<void> {
  if (bffCallbackPromise) {
    return bffCallbackPromise;
  }
  bffCallbackPromise = signInWithOidcBffImpl().finally(() => {
    bffCallbackPromise = null;
  });
  return bffCallbackPromise;
}
