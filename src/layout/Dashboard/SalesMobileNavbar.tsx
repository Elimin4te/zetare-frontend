import { useMemo } from 'react';

// react-router
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// i18n
import { useIntl } from 'react-intl';

// project-imports
import useAuth from 'hooks/useAuth';
import { usePermissions } from 'hooks/usePermissions';
import { useUserGroup } from 'hooks/useUserGroup';
import { filterMenuByPermissions } from 'utils/filterMenuByPermissions';
import { getMenuItemsForGroup } from 'utils/getMenuItemsForGroup';

// types
import type { NavItemType } from 'types/menu';

// ==============================|| SALES MOBILE NAVBAR ||============================== //

export default function SalesMobileNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const intl = useIntl();

  const { user } = useAuth();
  const permissions = usePermissions();
  const { groupConfig } = useUserGroup();
  const userGroups = user?.groups ?? [];
  const navigate = useNavigate();
  const location = useLocation();

  // Only render on mobile-sized viewports.
  if (!isMobile) {
    return null;
  }

  const menuItemsForGroup = useMemo(() => getMenuItemsForGroup(groupConfig), [groupConfig]);

  const salesSection = useMemo(() => menuItemsForGroup.find((section) => section.id === 'group-sales-administration'), [menuItemsForGroup]);

  const aiSection = useMemo(() => menuItemsForGroup.find((section) => section.id === 'group-ai'), [menuItemsForGroup]);

  const orderedItems = useMemo(() => {
    const sectionsToMerge: NavItemType[] = [];
    if (salesSection?.children?.length) {
      const sectionAsNav: NavItemType = { ...salesSection, children: salesSection.children };
      const [filtered] = filterMenuByPermissions([sectionAsNav], permissions, userGroups);
      if (filtered?.children?.length) sectionsToMerge.push(...filtered.children);
    }
    if (aiSection?.children?.length) {
      const sectionAsNav: NavItemType = { ...aiSection, children: aiSection.children };
      const [filtered] = filterMenuByPermissions([sectionAsNav], permissions, userGroups);
      if (filtered?.children?.length) sectionsToMerge.push(...filtered.children);
    }
    return sectionsToMerge;
  }, [permissions, userGroups, salesSection, aiSection]);

  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1300
      }}
    >
      <Box
        sx={{
          mx: 2,
          mb: 1.75,
          px: 2,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          bgcolor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: `0 10px 30px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(15,23,42,0.15)'}`
        }}
      >
        {orderedItems.map((item) => {
          const Icon = item.icon as React.ElementType | undefined;
          const isActive = !!item.url && location.pathname === item.url;
          const label = intl.formatMessage({ id: item.id! });

          return (
            <Box key={item.id} sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Tooltip title={label} arrow placement="top">
                <IconButton
                  onClick={() => {
                    if (item.url) {
                      navigate(item.url);
                    }
                  }}
                  sx={{
                    mx: 0.5,
                    width: 44,
                    height: 44,
                    p: 0,
                    borderRadius: '50%',
                    position: 'relative',
                    bgcolor: 'transparent',
                    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                    '&:hover': {
                      bgcolor: 'transparent',
                      color: theme.palette.primary.main
                    }
                  }}
                >
                  {/* background circle behind the wrapper */}
                  <Box
                    sx={{
                      display: isActive ? 'block' : 'none',
                      position: 'absolute',
                      left: '50%',
                      bottom: 8,
                      transform: 'translateX(-50%)',
                      width: 68,
                      height: 68,
                      borderRadius: '50%',
                      bgcolor: theme.palette.background.default,
                      transition: 'all 0.25s ease-out',
                      zIndex: 995
                    }}
                  />

                  {/* wrapper that follows the icon and uses primary color */}
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: isActive ? theme.palette.primary.main : theme.palette.background.paper,
                      position: 'relative',
                      zIndex: 996,
                      transition: 'transform 0.2s ease-out, background-color 0.2s ease-out',
                      ...(isActive && { transform: 'translateY(-20px)' })
                    }}
                  >
                    {Icon && (
                      <Icon variant="Bulk" size={20} color={isActive ? theme.palette.primary.contrastText : theme.palette.text.secondary} />
                    )}
                  </Box>
                </IconButton>
              </Tooltip>
              <Typography
                variant="caption"
                sx={{
                  mt: 0,
                  mb: 1,
                  fontSize: 10,
                  lineHeight: 1,
                  color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
                  textAlign: 'center'
                }}
              >
                {label}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
