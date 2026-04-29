import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { appConfig } from 'config/appConfig';
import { getAccessTokenForApi } from 'lib/accessTokenForApi';

let _client: SupabaseClient | null = null;

/**
 * Browser Supabase client. Passes the Authentik (OIDC) access token as `Authorization: Bearer`
 * for PostgREST/Storage/Edge so RLS and `auth.jwt()` see the real user JWT. When there is no
 * stored token, the client falls back to the anon key for the Bearer (see `fetchWithAuth` in
 * supabase-js). `accessToken` replaces built-in Supabase Auth for this client — do not use
 * `supabase.auth.*` on this instance. The token callback refreshes via OIDC silent renew when
 * the JWT is missing, expired, or close to expiry, then falls back to login if renew fails.
 */
export function getSupabaseClient(): SupabaseClient | null {
  const url = appConfig.supabaseUrl;
  const key = appConfig.supabaseAnonKey;
  if (!url || !key) {
    return null;
  }
  if (!_client) {
    _client = createClient(url, key, {
      accessToken: async () => getAccessTokenForApi()
    });
  }
  return _client;
}

export function getSupabaseClientOrThrow(): SupabaseClient {
  const c = getSupabaseClient();
  if (!c) {
    throw new Error('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env');
  }
  return c;
}
