import { useEffect } from 'react';
import Box from '@mui/material/Box';

// project import
import Loader from 'components/Loader';
import { oidcRefreshTokenStorageKey, setStoredAccessToken } from 'lib/authentikUser';

function withBasename(redirectTo: string) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const basename = import.meta.env.VITE_BASE_PATH || '/';
  if (basename === '/' || basename === '') {
    return redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`;
  }
  return `${String(basename).replace(/\/$/, '')}${redirectTo.startsWith('/') ? redirectTo : `/${redirectTo}`}`;
}

// Hash fragment with access_token (e.g. from IdP) → localStorage, then full navigation so JWTProvider re-runs.

export default function OAuthBridge() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) {
      window.location.replace(withBasename('/login?error=missing_token'));
      return;
    }
    const params = new URLSearchParams(hash);
    const access = params.get('access_token');
    const refresh = params.get('refresh_token');
    let redirectTo = params.get('redirectTo') || '/landing';
    if (!access) {
      window.location.replace(withBasename('/login?error=missing_token'));
      return;
    }
    if (!redirectTo.startsWith('/') || redirectTo.startsWith('//')) {
      redirectTo = '/landing';
    }
    setStoredAccessToken(access);
    if (refresh) {
      localStorage.setItem(oidcRefreshTokenStorageKey, refresh);
    }
    window.location.replace(withBasename(redirectTo));
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <Loader />
    </Box>
  );
}
