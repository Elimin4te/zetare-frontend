import { ReactNode, ReactElement } from 'react';

// material-ui
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme, alpha } from '@mui/material';

// project-imports
import AuthCard from './AuthCard';

// assets
import AuthBackgroundVortex from 'assets/images/auth/AuthBackgroundVortex';

type Props = {
  children: ReactElement;
  /** Shown on the left / top over the vortex (welcome line, short brand line). */
  hero?: ReactNode;
};

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //
// Desktop (lg+): 50% hero + vortex / 50% form. Below: vortex top strip, then form.

export default function AuthWrapper({ children, hero }: Props) {
  const theme = useTheme();
  const isStacked = useMediaQuery(theme.breakpoints.down('lg'));

  const leftPanel = (
    <Box
      sx={{
        position: 'relative',
        minHeight: isStacked ? { xs: 220, sm: 280 } : '100vh',
        height: isStacked ? { xs: 220, sm: 280 } : 'auto',
        alignSelf: isStacked ? 'stretch' : 'stretch',
        flex: isStacked ? '0 0 auto' : '0 0 55%',
        maxWidth: isStacked ? '100%' : '55%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isStacked ? 'flex-end' : 'center',
        // no solid bgcolor here: it was hiding the vortex (child used zIndex -1)
        p: { xs: 2, sm: 3, lg: 4 },
        pb: isStacked ? 2 : 4
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          zIndex: 0,
          inset: 0,
          background: `linear-gradient(125deg,
            ${alpha(theme.palette.primary.dark, 0.42)} 0%,
            ${alpha(theme.palette.primary.main, 0.32)} 45%,
            ${alpha(theme.palette.warning?.main ?? theme.palette.secondary?.main ?? theme.palette.primary.main, 0.22)} 100%)`
        }}
      />
      <Box sx={{ position: 'absolute', zIndex: 0, inset: 0, pointerEvents: 'none' }}>
        <AuthBackgroundVortex />
      </Box>
      {hero != null && (
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '60%',
            color: 'common.white',
            textShadow: '0 1px 3px rgba(0,0,0,0.2)'
          }}
        >
          {hero}
        </Box>
      )}
    </Box>
  );

  const rightPanel = (
    <Box
      component="main"
      sx={{
        flex: isStacked ? 1 : '0 0 45%',
        minWidth: 0,
        minHeight: isStacked ? 0 : '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 2, sm: 3, lg: 4 },
        px: { xs: 2, sm: 2, lg: 3, xl: 5 },
        bgcolor: 'background.paper'
      }}
    >
      <AuthCard
        sx={{
          maxWidth: { xs: 440, sm: 460, md: 480, lg: 480 },
          width: '100%'
        }}
      >
        {children}
      </AuthCard>
    </Box>
  );

  if (isStacked) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {leftPanel}
        {rightPanel}
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      {leftPanel}
      {rightPanel}
    </Box>
  );
}
