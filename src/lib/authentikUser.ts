import { jwtDecode } from 'jwt-decode';

import { UserProfile } from 'types/auth';

type JwtPayload = {
  sub?: string;
  email?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  preferred_username?: string;
  picture?: string;
  exp?: number;
  iat?: number;
  groups?: unknown;
  [key: string]: unknown;
};

/**
 * Map Authentik (or compatible) access token claims to the in-app user shape.
 * Adjust claim keys to match your provider (property mappings in Authentik).
 */
export function userProfileFromAccessToken(token: string): UserProfile {
  const c = jwtDecode<JwtPayload>(token);
  const groups = normalizeStringArray(
    c.groups ?? c['urn:authentik:2022:groups'] ?? c['cognito:groups'] ?? c['ak_groups']
  );
  const permissions = normalizeStringArray(
    c.permissions ?? c['urn:zetare:permissions'] ?? c['permissions']
  );

  const zetaCollectorRaw = c['zeta_collector'];
  const zetaCollector =
    zetaCollectorRaw && typeof zetaCollectorRaw === 'object'
      ? {
          flows: normalizeStringArray((zetaCollectorRaw as any).flows),
          permissions: normalizeStringArray((zetaCollectorRaw as any).permissions)
        }
      : undefined;

  const email = typeof c.email === 'string' ? c.email : null;
  const fullName = [c.given_name, c.family_name].filter(Boolean).join(' ').trim();
  const name = (fullName || (c.name as string) || c.preferred_username) as string | undefined;
  return {
    id: typeof c.sub === 'string' ? c.sub : undefined,
    email,
    name,
    displayName: (c.name as string) || c.preferred_username,
    username: c.preferred_username,
    firstName: c.given_name as string | undefined,
    lastName: c.family_name as string | undefined,
    image: c.picture,
    avatar: c.picture,
    groups,
    permissions: permissions.length ? permissions : undefined,
    zetaCollector
  };
}

function normalizeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((v) => String(v)).filter(Boolean);
  }
  // Support Set-like iterables (e.g. claim serialized strangely by upstream mapping).
  if (value && typeof value === 'object' && (value as any)[Symbol.iterator]) {
    try {
      return Array.from(value as any, (v: any) => String(v)).filter(Boolean);
    } catch {
      // ignore
    }
  }
  if (typeof value === 'string' && value) {
    return [value];
  }
  return [];
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    if (typeof decoded.exp !== 'number') return true;
    return decoded.exp <= Date.now() / 1000;
  } catch {
    return true;
  }
}

export const accessTokenStorageKey = 'access_token';
export const oidcRefreshTokenStorageKey = 'oidc_refresh_token';

export function getStoredAccessToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(accessTokenStorageKey);
}

export function setStoredAccessToken(token: string | null): void {
  if (typeof window === 'undefined') {
    return;
  }
  if (token) {
    window.localStorage.setItem(accessTokenStorageKey, token);
  } else {
    window.localStorage.removeItem(accessTokenStorageKey);
    window.localStorage.removeItem(oidcRefreshTokenStorageKey);
  }
}
