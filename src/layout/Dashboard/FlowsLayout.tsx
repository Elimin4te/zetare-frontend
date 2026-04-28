import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { motion } from 'framer-motion';

import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';
import HorizontalBar from './Drawer/HorizontalBar';
import Loader from 'components/Loader';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import PageTitle from 'components/PageTitle';
import AuthGuard from 'utils/route-guard/AuthGuard';

import { MINI_DRAWER_WIDTH, MenuOrientation } from 'config';
import { useRouteLayoutHandle } from 'hooks/useRouteLayoutHandle';
import { useFirstAvailableRoute } from 'hooks/useFirstAvailableRoute';
import useConfig from 'hooks/useConfig';
import { handlerDrawerOpen, useGetMenuMaster } from 'lib/menuState';

/**
 * Dashboard layout variant for the Flows page.
 * Adds a layout-level animated background that doesn’t depend on page content sizing.
 */
export default function FlowsLayout() {
  const theme = useTheme();
  const { menuMasterLoading } = useGetMenuMaster();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const { container, menuOrientation } = useConfig();
  const routeLayout = useRouteLayoutHandle();
  const firstAvailableRoute = useFirstAvailableRoute();

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;
  const isSalesMobileLayout = false;

  useEffect(() => {
    if (!downLG) {
      handlerDrawerOpen(false);
    }
  }, [downLG]);

  if (menuMasterLoading) return <Loader />;

  return (
    <AuthGuard>
      <PageTitle />
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Header
          hideDrawerToggle={isSalesMobileLayout}
          showMobileBackButton={routeLayout.showMobileBackButton && (isSalesMobileLayout || downLG)}
          mobileBackTo={routeLayout.mobileBackTo ?? firstAvailableRoute}
        />
        {!isHorizontal && !isSalesMobileLayout ? <Drawer /> : null}
        {isHorizontal && !isSalesMobileLayout ? <HorizontalBar /> : null}

        <Box
          component="main"
          sx={{
            width: !isHorizontal && !isSalesMobileLayout ? `calc(100% - ${MINI_DRAWER_WIDTH}px)` : '100%',
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            pb: isSalesMobileLayout && routeLayout.showDrawerOrNavbar ? 8 : { xs: 2, md: 3 }
          }}
        >
          <Toolbar sx={{ mt: isHorizontal ? 8 : 'inherit', mb: isHorizontal ? 2 : 'inherit' }} />
          <Container
            maxWidth={container ? 'xl' : false}
            sx={{
              xs: 0,
              ...(container && { px: { xs: 0, md: 2 } }),
              position: 'relative',
              minHeight: 'calc(100vh - 130px)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'clip'
            }}
          >
            {/* Layout-level background (flows) - hide on md and down */}
            {!downMD ? (
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  inset: -24,
                  zIndex: 0,
                  pointerEvents: 'none',
                  contain: 'paint',
                  transform: 'translateZ(0)',
                  '& .flow-blob': {
                    position: 'absolute',
                    borderRadius: '50%',
                    filter: theme.palette.mode === 'dark' ? 'blur(64px)' : 'blur(54px)',
                    opacity: theme.palette.mode === 'dark' ? 0.18 : 0.22,
                    willChange: 'transform'
                  }
                }}
              >
                <Box
                  className="flow-blob"
                  component={motion.div}
                  animate={{ x: [0, -80, 40, 0], y: [0, -60, -30, 0], scale: [1, 1.08, 1.03, 1] }}
                  transition={{ duration: 30, ease: 'easeInOut', repeat: Infinity }}
                  sx={{
                    top: '2%',
                    right: '6%',
                    width: 560,
                    height: 560,
                    background: `radial-gradient(circle, ${theme.palette.primary.main}66 0%, ${theme.palette.primary.main}14 52%, transparent 76%)`
                  }}
                />
                <Box
                  className="flow-blob"
                  component={motion.div}
                  animate={{ x: [0, 70, -50, 0], y: [0, 55, 80, 0], scale: [1, 1.06, 1.02, 1] }}
                  transition={{ duration: 36, ease: 'easeInOut', repeat: Infinity }}
                  sx={{
                    bottom: '4%',
                    left: '6%',
                    width: 720,
                    height: 720,
                    background: `radial-gradient(circle, ${theme.palette.secondary.main}52 0%, ${theme.palette.secondary.main}12 54%, transparent 78%)`
                  }}
                />
                <Box
                  className="flow-blob"
                  component={motion.div}
                  animate={{ x: [0, -60, 30, 0], y: [0, 40, -70, 0], scale: [1, 1.07, 1.02, 1] }}
                  transition={{ duration: 28, ease: 'easeInOut', repeat: Infinity }}
                  sx={{
                    top: '48%',
                    left: '62%',
                    width: 420,
                    height: 420,
                    background: `radial-gradient(circle, ${theme.palette.primary.light}38 0%, transparent 66%)`
                  }}
                />
                <Box
                  className="flow-blob"
                  component={motion.div}
                  animate={{ x: [0, 55, -65, 0], y: [0, -45, 30, 0], scale: [1, 1.09, 1.03, 1] }}
                  transition={{ duration: 32, ease: 'easeInOut', repeat: Infinity }}
                  sx={{
                    top: '22%',
                    left: '18%',
                    width: 380,
                    height: 380,
                    background: `radial-gradient(circle, ${theme.palette.accent.main}56 0%, ${theme.palette.accent.main}12 52%, transparent 76%)`
                  }}
                />
              </Box>
            ) : null}

            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0 }}>
              {!routeLayout.hideLayoutBreadcrumbs && <Breadcrumbs />}
              <Outlet />
              {!isSalesMobileLayout && routeLayout.showFooter !== false && <Footer />}
            </Box>
          </Container>
        </Box>
      </Box>
    </AuthGuard>
  );
}

