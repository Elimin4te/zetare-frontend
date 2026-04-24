import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';

import Logo from 'components/logo';
import Loader from 'components/Loader';
import useAuth from 'hooks/useAuth';
import AuthWrapper from 'sections/auth/AuthWrapper';

// ================================|| LOGIN — Authentik OIDC ||================================ //

export default function Login() {
  const { startOidcLogin } = useAuth();
  const intl = useIntl();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const logoWidth = isMobile ? 125 : 140;

  useEffect(() => {
    startOidcLogin();
    // One-shot: browser navigates to the IdP; no need to re-run.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Logo sx={{ width: logoWidth }} />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant="h4">{intl.formatMessage({ id: 'login-title' })}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <Box sx={{ minHeight: 40, minWidth: 40, position: 'relative' }}>
            <Loader />
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {intl.formatMessage({ id: 'login-auth-hint' })}
          </Typography>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
