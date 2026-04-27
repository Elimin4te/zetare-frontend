import { useLayoutEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';

import Logo from 'components/logo';
import useAuth from 'hooks/useAuth';
import { useDefaultPath } from 'hooks/useDefaultPath';
import { appConfig, isOidcLoginConfigured } from 'config/appConfig';
import { clearOidcSigninFailedFromSession, initialShowOidcSigninFailedBanner } from 'lib/oidcPaths';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| LOGIN — LANDING + SIGN-IN ||============================== //

export default function Login() {
  const { startOidcLogin } = useAuth();
  const intl = useIntl();
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSignInFailed, setShowSignInFailed] = useState(() => initialShowOidcSigninFailedBanner());
  const defaultPath = useDefaultPath();
  const isNarrow = useMediaQuery(theme.breakpoints.down('sm'));
  const logoW = isNarrow ? 120 : 150;
  const appName = appConfig.appTitle;
  const supportMail = `mailto:${appConfig.supportEmail}`;
  const loginEnabled = isOidcLoginConfigured();

  const hero = (
    <Stack spacing={1.5} sx={{ py: { lg: 2 } }}>
      <Typography
        component="h1"
        fontWeight={800}
        sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem', lg: '2.4rem' }, lineHeight: 1.2 }}
      >
        {intl.formatMessage({ id: 'login-hero-title' })}
      </Typography>
      <Typography
        component="p"
        variant="h6"
        sx={{
          fontWeight: 500,
          opacity: 0.95,
          fontSize: { xs: '1rem', sm: '1.1rem', lg: '1.2rem' },
          maxWidth: 400,
          lineHeight: 1.4
        }}
      >
        {intl.formatMessage({ id: 'login-hero-subtitle' }, { app: appName })}
      </Typography>
    </Stack>
  );

  useLayoutEffect(() => {
    if (searchParams.get('signin') === 'failed') {
      const next = new URLSearchParams(searchParams);
      next.delete('signin');
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return (
    <AuthWrapper hero={loginEnabled ? hero : undefined}>
      <Stack alignItems="center" spacing={2.5} sx={{ textAlign: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: 300 }}>
          <Logo sx={{ width: '100%', maxWidth: logoW, height: 'auto' }} />
        </Box>

        {loginEnabled ? (
          <>
            {showSignInFailed ? (
              <Alert
                severity="error"
                variant="outlined"
                sx={{ width: '100%', textAlign: 'left' }}
                onClose={() => {
                  clearOidcSigninFailedFromSession();
                  setShowSignInFailed(false);
                }}
              >
                {intl.formatMessage({ id: 'login-signin-failed' })}
              </Alert>
            ) : null}
            <Typography component="h2" variant="h3" fontWeight={700} sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }}>
              {intl.formatMessage({ id: 'login-welcome' })}
            </Typography>
            <Typography color="text.secondary" sx={{ maxWidth: 400, lineHeight: 1.6 }}>
              {intl.formatMessage({ id: 'login-lead' })}
            </Typography>
            <Box sx={{ width: '100%', maxWidth: 360, pt: 1 }}>
              <AnimateButton>
                <Button
                  fullWidth
                  type="button"
                  size="large"
                  onClick={() => startOidcLogin(defaultPath)}
                  variant="outlined"
                  color="primary"
                  sx={(t) => ({
                    py: 1.75,
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    borderRadius: 10,
                    borderColor: t.palette.mode === 'dark' ? t.palette.divider : t.palette.grey[300],
                    bgcolor: t.palette.mode === 'dark' ? 'action.hover' : t.palette.grey[50],
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: t.palette.mode === 'dark' ? 'action.selected' : t.palette.grey[100]
                    }
                  })}
                >
                  {intl.formatMessage({ id: 'login-auth-button' })}
                </Button>
              </AnimateButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ pt: 1 }}>
              {intl.formatMessage({ id: 'login-need-help' })}{' '}
              <Link href={supportMail} color="primary" fontWeight={600} underline="hover">
                {intl.formatMessage({ id: 'login-need-help-cta' })}
              </Link>
            </Typography>
          </>
        ) : (
          <Alert severity="warning" variant="outlined" sx={{ textAlign: 'left', width: '100%' }}>
            {intl.formatMessage({ id: 'login-disabled-warning' })}
          </Alert>
        )}
      </Stack>
    </AuthWrapper>
  );
}
