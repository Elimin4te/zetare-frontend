import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

// project-imports
import Drawer from './Drawer';
import Header from './Header';
import Footer from './Footer';
import HorizontalBar from './Drawer/HorizontalBar';
import Loader from 'components/Loader';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import PageTitle from 'components/PageTitle';
import AuthGuard from 'utils/route-guard/AuthGuard';

import { DRAWER_WIDTH, MenuOrientation } from 'config';
import { useRouteLayoutHandle } from 'hooks/useRouteLayoutHandle';
import { useFirstAvailableRoute } from 'hooks/useFirstAvailableRoute';
import useConfig from 'hooks/useConfig';
import { handlerDrawerOpen, useGetMenuMaster } from 'lib/menuState';

// ==============================|| MAIN LAYOUT ||============================== //

export default function MainLayout() {
  const theme = useTheme();

  const { menuMasterLoading } = useGetMenuMaster();
  const downXL = useMediaQuery(theme.breakpoints.down('xl'));
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { container, miniDrawer, menuOrientation } = useConfig();
  const routeLayout = useRouteLayoutHandle();
  const firstAvailableRoute = useFirstAvailableRoute();

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;
  const isSalesMobileLayout = false;

  // set media wise responsive drawer
  useEffect(() => {
    if (!miniDrawer) {
      handlerDrawerOpen(!downXL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downXL]);

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
            width: !isHorizontal && !isSalesMobileLayout ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%',
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
              flexDirection: 'column'
            }}
          >
            {!routeLayout.hideLayoutBreadcrumbs && <Breadcrumbs />}
            <Outlet />
            {!isSalesMobileLayout && routeLayout.showFooter !== false && <Footer />}
          </Container>
        </Box>
      </Box>
    </AuthGuard>
  );
}
