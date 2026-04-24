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
   * Optional: full browser URL to your provider’s authorization page. If set, `startOidcLogin` uses this
   * (with `state` for post-login redirect) instead of building from issuer + client.
   */
  oidcLoginUrl: opt(e.VITE_OIDC_LOGIN_URL),
  /** Authentik (or any OIDC) base URL, no trailing slash, e.g. https://authentik.example.com */
  oidcIssuer: opt(e.VITE_OIDC_ISSUER),
  oidcClientId: opt(e.VITE_OIDC_CLIENT_ID),
  oidcRedirectUri: opt(e.VITE_OIDC_REDIRECT_URI),
  /** OpenID end-session (optional) — e.g. Authentik end-session for your app */
  oidcEndSessionUrl: opt(e.VITE_OIDC_END_SESSION_URL)
} as const;

export function isOidcClientConfigured() {
  return Boolean(appConfig.oidcIssuer && appConfig.oidcClientId && appConfig.oidcRedirectUri);
}

export function isSupabaseConfigured() {
  return Boolean(appConfig.supabaseUrl && appConfig.supabaseAnonKey);
}
