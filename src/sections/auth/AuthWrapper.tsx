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
  /** Shown on the left over the vortex (lg+ only). */
  hero?: ReactNode;
};

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //
// lg+: split — vortex + hero | card on paper.
// <lg: full-viewport vortex, single centered card (no strip + panel stack).

export default function AuthWrapper({ children, hero }: Props) {
  const theme = useTheme();
  const isBelowLg = useMediaQuery(theme.breakpoints.down('lg'));

  const wash = `linear-gradient(125deg,
    ${alpha(theme.palette.primary.dark, 0.38)} 0%,
    ${alpha(theme.palette.primary.main, 0.3)} 32%,
    ${alpha(theme.palette.warning.main, 0.36)} 58%,
    ${alpha(theme.palette.warning.dark, 0.28)} 78%,
    ${alpha(theme.palette.warning.light, 0.2)} 100%)`;

  const mobileCardFill = alpha(theme.palette.background.paper, 0.85);

  if (isBelowLg) {
    return (
      <Box sx={{ position: 'relative', isolation: 'isolate', minHeight: '100vh' }}>
        <Box
          aria-hidden
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden'
          }}
        >
          <Box sx={{ position: 'absolute', inset: 0, background: wash }} />
          <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <AuthBackgroundVortex />
          </Box>
        </Box>

        <Box
          component="main"
          sx={{
            position: 'relative',
            zIndex: 1,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: { xs: 3, sm: 4 },
            px: { xs: 2, sm: 2.5 }
          }}
        >
          {/*
            Box-shadow on a wrapper: backdrop-filter on the Card often prevents
            the same element’s box-shadow from painting in browsers.
          */}
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: 440, sm: 460 },
              borderRadius: { xs: 5, sm: 6, md: 7 },
              boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
              overflow: 'hidden'
            }}
          >
            <AuthCard
              contentBoxSx={{
                py: { xs: 4, sm: 4.5 },
                px: { xs: 3.25, sm: 3.5 }
              }}
              sx={{
                maxWidth: '100%',
                width: '100%',
                borderRadius: 0,
                border: 'none',
                boxShadow: 'none',
                bgcolor: mobileCardFill,
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)'
              }}
            >
              {children}
            </AuthCard>
          </Box>
        </Box>
      </Box>
    );
  }

  const leftPanel = (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        flex: '0 0 55%',
        maxWidth: '55%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: { xs: 2, sm: 3, lg: 4 },
        pb: 4
      }}
    >
      <Box sx={{ position: 'absolute', zIndex: 0, inset: 0, background: wash }} />
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
        flex: '0 0 45%',
        minWidth: 0,
        minHeight: '100vh',
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
          width: '100%',
          border: 'none',
          boxShadow: 'none'
        }}
      >
        {children}
      </AuthCard>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'row' }}>
      {leftPanel}
      {rightPanel}
    </Box>
  );
}
