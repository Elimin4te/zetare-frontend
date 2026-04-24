import { useMemo, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import ThemeLayout from './ThemeLayout';
import ThemeMode from './ThemeMode';
import ColorScheme from './ColorScheme';
import ThemeMenuLayout from './ThemeMenuLayout';
import ThemeFont from './ThemeFont';

import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';

import { HEADER_HEIGHT } from 'config';
import useConfig from 'hooks/useConfig';
import useMediaQuery from '@mui/material/useMediaQuery';

// assets
import { Add, Setting2 } from 'iconsax-react';

// ==============================|| HEADER CONTENT - CUSTOMIZATION ||============================== //

export default function Customization() {
  const theme = useTheme();
  const intl = useIntl();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mode, presetColor, miniDrawer, themeDirection, menuOrientation, fontFamily } = useConfig();

  const [pathname, setPathname] = useState(window.location.pathname);

  // Update pathname when route changes
  useEffect(() => {
    const updatePathname = () => {
      setPathname(window.location.pathname);
    };

    // Listen to popstate for browser back/forward
    window.addEventListener('popstate', updatePathname);

    // Also check periodically for React Router navigation (which doesn't trigger popstate)
    const interval = setInterval(updatePathname, 100);

    return () => {
      window.removeEventListener('popstate', updatePathname);
      clearInterval(interval);
    };
  }, []);

  // Don't show customization panel on auth pages
  const isAuthRoute = pathname === '/login' || pathname.startsWith('/login/');

  // eslint-disable-next-line
  const themeLayout = useMemo(() => <ThemeLayout />, [miniDrawer, themeDirection]);
  // eslint-disable-next-line
  const themeMenuLayout = useMemo(() => <ThemeMenuLayout />, [menuOrientation]);
  // eslint-disable-next-line
  const themeMode = useMemo(() => <ThemeMode />, [mode]);
  // eslint-disable-next-line
  const themeColor = useMemo(() => <ColorScheme />, [presetColor]);
  // eslint-disable-next-line
  const themeFont = useMemo(() => <ThemeFont />, [fontFamily]);

  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Fab
        component="div"
        onClick={handleToggle}
        size="large"
        variant="circular"
        sx={{
          borderRadius: 0,
          borderTopLeftRadius: '50%',
          borderBottomLeftRadius: '50%',
          borderTopRightRadius: '4px',
          borderBottomRightRadius: '4px',
          top: isMobile ? '31.5%' : '21.5%',
          position: 'fixed',
          right: 0,
          zIndex: 1000,
          boxShadow: theme.customShadows.z1,
          bgcolor: 'background.paper',
          border: '4px solid ',
          borderColor: 'background.paper',
          borderRight: 'none',
          '&:hover': { bgcolor: 'primary.lighter' },
          display: isAuthRoute ? 'none' : 'flex'
        }}
      >
        <IconButton
          onClick={handleToggle}
          aria-label="settings toggler"
          size="large"
          sx={{ p: 0, '& :hover': { bgcolor: 'red' }, '& svg': { width: 28, height: 28 } }}
        >
          <Setting2 variant="Bulk" />
        </IconButton>
      </Fab>
      <Drawer
        sx={{
          zIndex: 2001,
          display: isAuthRoute ? 'none' : 'block'
        }}
        anchor="right"
        onClose={handleToggle}
        open={open && !isAuthRoute}
        PaperProps={{
          sx: {
            width: 350
          }
        }}
      >
        {open && (
          <MainCard content={false} border={false}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5} sx={{ p: 2.5 }}>
              <Typography variant="h5">{intl.formatMessage({ id: 'customize-title' })}</Typography>
              <IconButton color="error" sx={{ p: 0 }} onClick={handleToggle}>
                <Add size={28} style={{ transform: 'rotate(45deg)' }} />
              </IconButton>
            </Stack>
            <SimpleBar
              sx={{
                '& .simplebar-content': {
                  display: 'flex',
                  flexDirection: 'column'
                }
              }}
            >
              <Box sx={{ p: 3, height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
                <Grid container spacing={2.5}>
                  {/* theme-mode */}
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant="subtitle1" color="text.primary">
                        {intl.formatMessage({ id: 'theme-mode-title' })}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {intl.formatMessage({ id: 'theme-mode-description' })}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    {themeMode}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* custom-theme */}
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant="subtitle1" color="text.primary">
                        {intl.formatMessage({ id: 'custom-theme-title' })}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {intl.formatMessage({ id: 'custom-theme-description' })}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12}>
                    {themeColor}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* theme-layout */}
                  {!isMobile && (
                    <>
                      <Grid item xs={12}>
                        <Stack>
                          <Typography variant="subtitle1" color="text.primary">
                            {intl.formatMessage({ id: 'theme-layout-title' })}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {intl.formatMessage({ id: 'theme-layout-description' })}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        {themeLayout}
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                    </>
                  )}

                  {/* theme-orientation */}
                  {!isMobile && (
                    <>
                      <Grid item xs={12}>
                        <Stack>
                          <Typography variant="subtitle1" color="text.primary">
                            {intl.formatMessage({ id: 'menu-orientation-title' })}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {intl.formatMessage({ id: 'menu-orientation-description' })}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12}>
                        {themeMenuLayout}
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                    </>
                  )}

                  {/* theme-font-family */}
                  <Grid item xs={12}>
                    <Stack>
                      <Typography variant="subtitle1" color="text.primary">
                        {intl.formatMessage({ id: 'font-family-title' })}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {intl.formatMessage({ id: 'font-family-description' })}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sx={{ mb: 3 }}>
                    {themeFont}
                  </Grid>
                </Grid>
              </Box>
            </SimpleBar>
          </MainCard>
        )}
      </Drawer>
    </>
  );
}
