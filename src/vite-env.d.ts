/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH?: string;
  readonly VITE_DEV_SERVER_PORT?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;
  readonly VITE_COMPANY_NAME?: string;
  readonly VITE_SUPPORT_EMAIL?: string;
  readonly VITE_TITLE?: string;
  readonly VITE_VERSION?: string;
  readonly VITE_MANIFEST_DESCRIPTION?: string;
  readonly VITE_ENVIRONMENT?: string;
  readonly VITE_MIXPANEL_TOKEN?: string;
  /** OpenID authority (issuer URL from .well-known/openid-configuration) */
  readonly VITE_OIDC_ISSUER?: string;
  readonly VITE_OIDC_CLIENT_ID?: string;
  readonly VITE_OIDC_REDIRECT_URI?: string;
  /** Optional. Defaults to `openid email profile` if unset. */
  readonly VITE_OIDC_SCOPE?: string;
  /** OIDC BFF (confidential code→token). No trailing slash. */
  readonly VITE_OIDC_BFF_URL?: string;
  /** Optional. `client_key` for BFF `POST /v1/token` when multiple clients are configured. */
  readonly VITE_OIDC_BFF_CLIENT_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
