/** In-app path including Vite `VITE_BASE_PATH` (e.g. `/app/landing`). */
export function withOidcAppPath(redirectTo: string): string {
  const basename = import.meta.env.VITE_BASE_PATH || '/';
  if (basename === '/' || basename === '') {
    return redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`;
  }
  return `${String(basename).replace(/\/$/, '')}${redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`}`;
}

/** Full URL to navigate after OIDC sign-in. */
export function oidcAppUrl(path: string): string {
  return new URL(withOidcAppPath(path), window.location.origin).href;
}

export type OidcReturnState = { returnPath?: string };

export function returnPathFromOidcState(state: unknown): string {
  const s = state as OidcReturnState | undefined;
  const p = s?.returnPath;
  if (typeof p === 'string' && p.startsWith('/') && !p.startsWith('//')) {
    return p;
  }
  return '/landing';
}

/** `true` when the current `pathname` is the SPA `/auth/callback` (respects `VITE_BASE_PATH`). */
export function isOauthCallbackPathname(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  const want = withOidcAppPath('/auth/callback').replace(/\/$/, '') || '/';
  const p = (window.location.pathname || '/').replace(/\/$/, '') || '/';
  return p === want;
}

/**
 * True when the URL has OAuth callback params (matches react-oidc / OIDC).
 */
export function hasOidcCallbackParamsInUrl(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  let searchParams = new URLSearchParams(window.location.search);
  if ((searchParams.get('code') || searchParams.get('error')) && searchParams.get('state')) {
    return true;
  }
  searchParams = new URLSearchParams(window.location.hash.replace(/^#/, '?'));
  return Boolean((searchParams.get('code') || searchParams.get('error')) && searchParams.get('state'));
}

const signinFailedStorageKey = 'oidcSigninFailedBanner';

export type OidcSigninFailedContext = {
  /** Where / why the redirect was triggered (for devtools only). */
  reason?: string;
  /** The underlying error, e.g. from `useAuth().error` or oidc-client-ts. */
  error?: unknown;
};

/** Log OIDC failure details to the devtools console (and URL OAuth error params, if any). */
export function logOidcSigninFailure(ctx?: OidcSigninFailedContext): void {
  if (ctx?.reason) {
    console.error('[OIDC] Sign-in failed —', ctx.reason);
  } else {
    console.error('[OIDC] Sign-in failed');
  }
  if (ctx?.error != null) {
    const e = ctx.error;
    if (e instanceof Error) {
      if ('source' in e) {
        console.error('[OIDC] error (react-oidc ErrorContext):', {
          name: e.name,
          message: e.message,
          source: (e as Error & { source?: string }).source,
          innerError: (e as Error & { innerError?: unknown }).innerError
        });
      }
      console.error('[OIDC] error.message:', e.message);
      if ('innerError' in e && (e as Error & { innerError?: unknown }).innerError != null) {
        console.error('[OIDC] error.innerError:', (e as Error & { innerError?: unknown }).innerError);
      }
      if (e.stack) {
        console.error(e.stack);
      }
    } else {
      console.error('[OIDC] error (non-Error):', e);
    }
  }
  if (typeof window === 'undefined') {
    return;
  }
  const s = new URLSearchParams(window.location.search);
  const oidcErr = s.get('error') ?? s.get('error_description');
  if (oidcErr) {
    console.error('[OIDC] URL query params:', {
      error: s.get('error'),
      error_description: s.get('error_description'),
      error_uri: s.get('error_uri')
    });
  }
  const h = new URLSearchParams(window.location.hash.replace(/^#/, '?'));
  if (h.get('error') || h.get('error_description')) {
    console.error('[OIDC] URL hash (OAuth) params:', {
      error: h.get('error'),
      error_description: h.get('error_description')
    });
  }
}

/** Text for the callback debug screen and support tickets (no redirect). */
export function formatOidcErrorForDisplay(error: unknown): string {
  if (error == null) {
    return '';
  }
  if (error instanceof Error) {
    const src = (error as Error & { source?: string }).source;
    const inner = (error as Error & { innerError?: unknown }).innerError;
    const parts = [error.name + ': ' + error.message, src ? `source: ${src}` : ''].filter(Boolean);
    if (inner !== undefined) {
      try {
        parts.push('inner: ' + (inner instanceof Error ? inner.message : JSON.stringify(inner, null, 0)));
      } catch {
        parts.push('inner: ' + String(inner));
      }
    }
    if (error.stack) {
      parts.push(error.stack);
    }
    return parts.join('\n\n');
  }
  try {
    return JSON.stringify(error, null, 2);
  } catch {
    return String(error);
  }
}

const innerErr = (e: unknown) =>
  e instanceof Error ? (e as Error & { innerError?: { error?: string; error_description?: string } }).innerError : undefined;

/**
 * If the IdP returned `invalid_client` at the token endpoint, this explains the usual Authentik + SPA fix.
 */
export function oidcErrorFriendlyHint(error: unknown): string | null {
  if (error == null) {
    return null;
  }
  const i = innerErr(error);
  const code = i?.error;
  const isInvalidClient =
    code === 'invalid_client' ||
    (error instanceof Error &&
      (/(invalid_client|Client authentication failed)/i.test(error.message) || code === 'invalid_client'));
  if (isInvalidClient) {
    return 'The IdP token endpoint rejected client authentication. For a confidential client, the browser must not call `/token` directly: use the OIDC BFF (`VITE_OIDC_BFF_URL`) for the code exchange, or use a public PKCE client if you must keep a pure in-browser flow. If you already use the BFF, check `VITE_OIDC_BFF_URL`, `VITE_OIDC_BFF_CLIENT_KEY`, and the BFF logs — `invalid_client` should not come from a correctly configured BFF+IdP pair.';
  }
  return null;
}

/**
 * Full navigation to the login page with a flag for a non-technical "sign-in failed" message.
 * Sets sessionStorage (best-effort) so the message still shows under React Strict Mode.
 * Pass `ctx` so details are `console.error`-logged (UI stays generic).
 */
export function redirectToOidcLoginFailed(ctx?: OidcSigninFailedContext): void {
  logOidcSigninFailure(ctx);
  try {
    sessionStorage.setItem(signinFailedStorageKey, '1');
  } catch {
    /* private mode, etc. */
  }
  window.location.replace(oidcAppUrl('/login?signin=failed'));
}

function signinFailedFromWindowSearch(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return new URLSearchParams(window.location.search).get('signin') === 'failed';
}

/**
 * For login page initial state: true if the user was sent here after a sign-in error.
 * Session is cleared in UI when the user dismisses the banner (see `clearOidcSigninFailedFromSession()`).
 */
export function initialShowOidcSigninFailedBanner(): boolean {
  if (signinFailedFromWindowSearch()) {
    return true;
  }
  try {
    return sessionStorage.getItem(signinFailedStorageKey) === '1';
  } catch {
    return false;
  }
}

export function clearOidcSigninFailedFromSession(): void {
  try {
    sessionStorage.removeItem(signinFailedStorageKey);
  } catch {
    /* ignore */
  }
}
