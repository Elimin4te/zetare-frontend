import { useLayoutEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useSearchParams } from 'react-router-dom';
import { alpha, keyframes, useTheme } from '@mui/material/styles';
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
import zetaAuthIcon from 'assets/images/auth/zeta-auth.png';

const HERO_PHRASE_IDS = ['login-hero-phrase-0', 'login-hero-phrase-1', 'login-hero-phrase-2', 'login-hero-phrase-3'] as const;

const heroTitleAlive = keyframes`
  0%, 100% {
    filter: brightness(1);
    text-shadow: 0 2px 20px rgba(255, 255, 255, 0.18), 0 0 40px rgba(255, 255, 255, 0.08);
  }
  50% {
    filter: brightness(1.1);
    text-shadow: 0 2px 28px rgba(255, 255, 255, 0.32), 0 0 56px rgba(255, 255, 255, 0.14);
  }
`;

// ==============================|| LOGIN — LANDING + SIGN-IN ||============================== //

export default function Login() {
  const { startOidcLogin } = useAuth();
  const intl = useIntl();
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSignInFailed, setShowSignInFailed] = useState(() => initialShowOidcSigninFailedBanner());
  const defaultPath = useDefaultPath();
  const isBelowLg = useMediaQuery(theme.breakpoints.down('lg'));
  const logoW = isBelowLg ? 150 : 300;
  const supportMail = `mailto:${appConfig.supportEmail}`;
  const loginEnabled = isOidcLoginConfigured();

  const heroPhraseIndex = useMemo(() => Math.floor(Math.random() * HERO_PHRASE_IDS.length), []);

  const hero = useMemo(
    () => (
      <Stack spacing={1.75} sx={{ py: { lg: 2 } }}>
        <Typography
          component="h1"
          fontWeight={800}
          sx={{
            fontSize: { xs: '1.85rem', sm: '2.15rem', lg: '3rem' },
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            animation: `${heroTitleAlive} 5s ease-in-out infinite`
          }}
        >
          {intl.formatMessage({ id: 'login-hero-title' })}
        </Typography>
        <Typography
          component="p"
          variant="body1"
          sx={{
            fontWeight: 400,
            fontSize: { xs: '0.95rem', sm: '1rem', lg: '1.08rem' },
            maxWidth: 420,
            lineHeight: 1.5,
            color: alpha(theme.palette.common.white, 0.72)
          }}
        >
          {intl.formatMessage({ id: HERO_PHRASE_IDS[heroPhraseIndex] })}
        </Typography>
      </Stack>
    ),
    [heroPhraseIndex, intl, theme]
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
      <Stack alignItems="center" spacing={2.25} sx={{ textAlign: 'center' }}>
        <Stack alignItems="center" spacing={2} sx={{ width: '100%' }}>
          <Box sx={{ width: '100%', maxWidth: 300 }}>
            <Logo sx={{ width: logoW, height: 'auto' }} />
          </Box>
          <Typography
            component="p"
            sx={{
              fontSize: { xs: '0.95rem', sm: '1.05rem' },
              fontWeight: 600,
              letterSpacing: '0.02em',
              color: 'text.primary',
              maxWidth: 380,
              lineHeight: 1.45
            }}
          >
            {intl.formatMessage({ id: 'login-brand-tagline' })}
          </Typography>
        </Stack>

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
            <Typography
              component="h2"
              sx={{
                fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                fontWeight: 400,
                lineHeight: 1.5,
                maxWidth: 360,
                color: 'text.secondary'
              }}
            >
              {intl.formatMessage({ id: 'login-signin-prompt' })}
            </Typography>
            <Box sx={{ width: '100%', maxWidth: 360, pt: 0.25 }}>
              <AnimateButton>
                <Button
                  fullWidth
                  type="button"
                  size="large"
                  onClick={() => startOidcLogin(defaultPath)}
                  variant="outlined"
                  color="primary"
                  startIcon={
                    <Box
                      component="img"
                      src={zetaAuthIcon}
                      alt=""
                      aria-hidden
                      sx={{ width: 36, height: 36, flexShrink: 0, display: 'block' }}
                    />
                  }
                  sx={(t) => ({
                    py: 1.35,
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: t.palette.primary.main,
                    borderRadius: 10,
                    borderColor: t.palette.mode === 'dark' ? t.palette.divider : t.palette.grey[300],
                    bgcolor: t.palette.mode === 'dark' ? 'action.hover' : t.palette.grey[50],
                    textTransform: 'none',
                    '& .MuiButton-startIcon': { mr: 1.25, ml: -0.25, color: 'inherit' },
                    '&:hover': {
                      bgcolor: t.palette.mode === 'dark' ? 'action.selected' : t.palette.grey[100],
                      color: t.palette.primary.main
                    }
                  })}
                >
                  {intl.formatMessage({ id: 'login-auth-button' })}
                </Button>
              </AnimateButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ pt: 0.75 }}>
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
