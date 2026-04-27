/**
 * Public app configuration (Vite). Inlined at `vite build` time.
 */
const e = import.meta.env;

function opt(s: string | undefined): string | undefined {
  return s && s.trim() !== '' ? s : undefined;
}

export const appConfig = {
  basePath: e.VITE_BASE_PATH || '/',
  supabaseUrl: opt(e.VITE_SUPABASE_URL),
  supabaseAnonKey: opt(e.VITE_SUPABASE_ANON_KEY),
  appTitle: e.VITE_TITLE || 'ZetaRe',
  companyName: e.VITE_COMPANY_NAME || 'Flor de Aragua C.A',
  appVersion: opt(e.VITE_VERSION),
  supportEmail: e.VITE_SUPPORT_EMAIL || 'soporte@flordearagua.com',
  manifestDescription: opt(e.VITE_MANIFEST_DESCRIPTION),
  mixpanelToken: opt(e.VITE_MIXPANEL_TOKEN),
  appEnvironment: opt(e.VITE_ENVIRONMENT),
  /**
   * OpenID `issuer` (authority for oidc-client-ts). Use the exact `issuer` from
   * .well-known/openid-configuration, e.g. `https://auth…/application/o/slug/`.
   */
  oidcAuthority: opt(e.VITE_OIDC_ISSUER),
  oidcClientId: opt(e.VITE_OIDC_CLIENT_ID),
  oidcRedirectUri: opt(e.VITE_OIDC_REDIRECT_URI),
  /**
   * OIDC BFF base URL (no trailing slash) for `POST /v1/token` — confidential code exchange, server-side.
   * Example: `https://oidc-bff.flordearagua.com`
   */
  oidcBffBaseUrl: opt(e.VITE_OIDC_BFF_URL),
  /** BFF `clients` key when the BFF has multiple OAuth clients. */
  oidcBffClientKey: opt(e.VITE_OIDC_BFF_CLIENT_KEY)
} as const;

export function isOidcClientConfigured() {
  return Boolean(appConfig.oidcAuthority && appConfig.oidcClientId && appConfig.oidcRedirectUri);
}

/** Set when the SPA is configured to use the external OIDC BFF for the code → token step. */
export function isOidcBffConfigured() {
  return Boolean(appConfig.oidcBffBaseUrl);
}

/** True when the app can start browser OIDC sign-in. */
export function isOidcLoginConfigured() {
  return isOidcClientConfigured();
}

export function isSupabaseConfigured() {
  return Boolean(appConfig.supabaseUrl && appConfig.supabaseAnonKey);
}
