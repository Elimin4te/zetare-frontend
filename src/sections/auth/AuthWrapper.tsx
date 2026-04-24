import { ReactElement } from 'react';

// material-ui
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from '@mui/material';

// project-imports
import AuthCard from './AuthCard';

// assets
import AuthBackgroundVortex from 'assets/images/auth/AuthBackgroundVortex';

interface Props {
  children: ReactElement;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //
// Desktop (lg+): ~60% vortex (left) / ~40% form (right). Below lg: vortex top strip, then form.

export default function AuthWrapper({ children }: Props) {
  const theme = useTheme();
  const isStacked = useMediaQuery(theme.breakpoints.down('lg'));

  if (isStacked) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            position: 'relative',
            minHeight: { xs: 200, sm: 240 },
            flex: '0 0 auto',
            overflow: 'hidden',
            bgcolor: 'background.default'
          }}
        >
          <AuthBackgroundVortex />
        </Box>
        <Box
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 3,
            px: 2
          }}
        >
          <AuthCard>{children}</AuthCard>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      <Box
        sx={{
          position: 'relative',
          flex: '0 0 60%',
          maxWidth: '60%',
          minHeight: '100vh',
          overflow: 'hidden',
          bgcolor: 'background.default'
        }}
      >
        <AuthBackgroundVortex />
      </Box>
      <Box
        component="main"
        sx={{
          flex: '0 0 40%',
          minWidth: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 3,
          px: { lg: 2, xl: 4 }
        }}
      >
        <AuthCard
          sx={{
            maxWidth: { lg: 420, xl: 480 },
            width: '100%'
          }}
        >
          {children}
        </AuthCard>
      </Box>
    </Box>
  );
}
