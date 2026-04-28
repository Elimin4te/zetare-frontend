import { useEffect, useRef, useState } from 'react';
import { useAuth as useOidcAuth } from 'react-oidc-context';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import { isOidcBffConfigured } from 'config/appConfig';
import BrandedLoader from 'components/BrandedLoader';
import { signInWithOidcBffDeduplicated } from 'lib/oidcBffExchange';
import {
  formatOidcErrorForDisplay,
  hasOidcCallbackParamsInUrl,
  logOidcSigninFailure,
  oidcErrorFriendlyHint,
  returnPathFromOidcState,
  withOidcAppPath
} from 'lib/oidcPaths';

function formatBffError(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  return String(err);
}

/**
 * OAuth redirect: `/auth/callback` (see `VITE_OIDC_REDIRECT_URI`).
 * With `VITE_OIDC_BFF_URL`, the in-browser token step is skipped; this page exchanges the code via the BFF.
 */
export default function OAuthCallback() {
  const { isLoading, error, isAuthenticated, user } = useOidcAuth();
  const navigate = useNavigate();
  const isBffRoute = isOidcBffConfigured() && hasOidcCallbackParamsInUrl();
  const [bffError, setBffError] = useState<unknown | null>(null);
  const [loggedError, setLoggedError] = useState<unknown | null>(null);
  const didNavigate = useRef(false);

  useEffect(() => {
    if (!isBffRoute) {
      return;
    }
    setBffError(null);
    void signInWithOidcBffDeduplicated().catch((e) => {
      setBffError(e);
    });
  }, [isBffRoute]);

  useEffect(() => {
    if (error == null) {
      return;
    }
    if (loggedError === error) {
      return;
    }
    setLoggedError(error);
    logOidcSigninFailure({ reason: 'useAuth() error (in-browser OIDC; unset VITE_OIDC_BFF_URL to debug)', error });
  }, [error, loggedError]);

  // Avoid full page reload navigation (reduces white flashes). We route inside the SPA after auth is ready.
  useEffect(() => {
    if (didNavigate.current) {
      return;
    }
    if (error != null || bffError != null) {
      return;
    }
    if (!isAuthenticated || !user?.access_token) {
      return;
    }
    didNavigate.current = true;
    navigate(returnPathFromOidcState(user.state));
  }, [bffError, error, isAuthenticated, navigate, user]);

  if (isBffRoute) {
    if (bffError) {
      return (
        <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
          <Paper elevation={0} sx={{ p: 3, maxWidth: 720, width: 1 }}>
            <Stack spacing={2}>
              <Typography variant="h5" component="h1">
                Sign-in could not complete
              </Typography>
              <Alert severity="error" variant="outlined">
                The OIDC BFF could not exchange the code for tokens. CORS, `VITE_OIDC_BFF_URL`, and `VITE_OIDC_BFF_CLIENT_KEY` must
                match your deployment. Check the BFF and IdP logs.
              </Alert>
              <Typography component="pre" variant="body2" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace', fontSize: 12, m: 0, p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
                {formatBffError(bffError)}
              </Typography>
              <Button component={Link} to={withOidcAppPath('/login')} variant="contained" color="primary">
                Back to sign-in
              </Button>
            </Stack>
          </Paper>
        </Box>
      );
    }
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
        <Stack spacing={1} alignItems="center">
          <Typography color="text.secondary" variant="body2">
            Completing sign-in…
          </Typography>
          <BrandedLoader />
        </Stack>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
        <BrandedLoader />
      </Box>
    );
  }

  if (error) {
    const friendly = oidcErrorFriendlyHint(error);
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
        <Paper elevation={0} sx={{ p: 3, maxWidth: 720, width: 1 }}>
          <Stack spacing={2}>
            <Typography variant="h5" component="h1">
              Sign-in could not complete
            </Typography>
            {friendly && (
              <Alert severity="info" variant="outlined">
                {friendly}
              </Alert>
            )}
            <Alert severity="error">Raw response below. This page does not redirect so you can copy it for support.</Alert>
            <Typography
              component="pre"
              variant="body2"
              sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace', fontSize: 12, m: 0, p: 1, bgcolor: 'action.hover', borderRadius: 1 }}
            >
              {formatOidcErrorForDisplay(error)}
            </Typography>
            <Button component={Link} to={withOidcAppPath('/login')} variant="contained" color="primary">
              Back to sign-in
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  if (isAuthenticated && user) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
        <Stack spacing={1} alignItems="center">
          <Typography variant="body1">Signed in. Redirecting…</Typography>
          <BrandedLoader />
        </Stack>
      </Box>
    );
  }

  if (!hasOidcCallbackParamsInUrl()) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
        <Paper elevation={0} sx={{ p: 3, maxWidth: 560, width: 1 }}>
          <Stack spacing={2}>
            <Typography variant="h5" component="h1">
              OpenID callback
            </Typography>
            <Typography color="text.secondary">
              This address is only used when your identity provider redirects you back with <code>code</code> and <code>state</code> in the URL. There
              is no active OAuth response here.
            </Typography>
            <Button component={Link} to={withOidcAppPath('/login')} variant="contained">
              Go to sign-in
            </Button>
          </Stack>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2 }}>
      <Paper elevation={0} sx={{ p: 3, maxWidth: 720, width: 1 }}>
        <Stack spacing={2}>
          <Alert severity="warning">Sign-in did not finish. Check the browser console for [OIDC] lines. If you use a BFF, set `VITE_OIDC_BFF_URL`.</Alert>
          <Typography variant="body2" color="text.secondary">
            isAuthenticated: {String(isAuthenticated)} -� has user: {String(!!user)}
          </Typography>
          <Button component={Link} to={withOidcAppPath('/login')} variant="outlined">
            Back to sign-in
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

