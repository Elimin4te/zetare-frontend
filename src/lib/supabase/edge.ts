import { getSupabaseClientOrThrow } from './client';

type InvokeOptions = {
  body?: object;
  headers?: Record<string, string>;
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE';
};

/**
 * Invoke a Supabase Edge Function (`supabase/functions/<name>`).
 * Pass a JWT in options.headers.Authorization when the function requires a logged-in user.
 */
export async function invokeEdgeFunction<T = unknown>(
  functionName: string,
  options?: InvokeOptions
): Promise<{ data: T | null; error: Error | null }> {
  const supabase = getSupabaseClientOrThrow();
  return supabase.functions.invoke<T>(functionName, options);
}
