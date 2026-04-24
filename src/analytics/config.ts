/** Deployment / build environment label for Mixpanel super-properties and event payloads. */
export function getAppEnvironment(): string {
  const raw = import.meta.env.VITE_ENVIRONMENT;
  if (typeof raw === 'string' && raw.trim() !== '') {
    return raw.trim();
  }
  return import.meta.env.MODE || 'development';
}
