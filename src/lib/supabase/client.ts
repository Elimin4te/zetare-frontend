import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { appConfig } from 'config/appConfig';

let _client: SupabaseClient | null = null;

/** Lazily create the browser Supabase client. Returns null if URL/anon key are not configured. */
export function getSupabaseClient(): SupabaseClient | null {
  const url = appConfig.supabaseUrl;
  const key = appConfig.supabaseAnonKey;
  if (!url || !key) {
    return null;
  }
  if (!_client) {
    _client = createClient(url, key, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
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
