import { Fragment, useMemo, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// project-imports
import NavItem from './NavItem';
import NavGroup from './NavGroup';
import { filterMenuByPermissions } from 'utils/filterMenuByPermissions';
import { getMenuItemsForGroup } from 'utils/getMenuItemsForGroup';

import useConfig from 'hooks/useConfig';
import useAuth from 'hooks/useAuth';
import { usePermissions } from 'hooks/usePermissions';
import { useUserGroup } from 'hooks/useUserGroup';
import { MenuOrientation, HORIZONTAL_MAX_ITEM } from 'config';
import { useGetMenuMaster } from 'lib/menuState';

// types
import { NavItemType } from 'types/menu';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {
  const theme = useTheme();
  const { user } = useAuth();
  const permissions = usePermissions();
  const { groupConfig } = useUserGroup();
  const userGroups = user?.groups ?? [];

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { menuOrientation } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const [selectedID, setSelectedID] = useState<string | undefined>('');
  const [selectedItems, setSelectedItems] = useState<string | undefined>('');
  const [selectedLevel, setSelectedLevel] = useState<number>(0);

  const menuItemsForGroup = useMemo(() => getMenuItemsForGroup(groupConfig), [groupConfig]);

  const filteredItems = useMemo(
    () => filterMenuByPermissions(menuItemsForGroup, permissions, userGroups),
    [menuItemsForGroup, permissions, userGroups]
  );

  const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;
  let lastItemIndex = filteredItems.length - 1;
  let remItems: NavItemType[] = [];
  let lastItemId: string;

  if (lastItem && lastItem < filteredItems.length) {
    lastItemId = filteredItems[lastItem - 1].id!;
    lastItemIndex = lastItem - 1;
    remItems = filteredItems.slice(lastItem - 1, filteredItems.length).map((item) => ({
      title: item.title,
      elements: item.children,
      icon: item.icon,
      ...(item.url && {
        url: item.url
      })
    }));
  }

  const navGroups = filteredItems.slice(0, lastItemIndex + 1).map((item) => {
    switch (item.type) {
      case 'group':
        if (item.url && item.id !== lastItemId) {
          return (
            <Fragment key={item.id}>
              {menuOrientation !== MenuOrientation.HORIZONTAL && <Divider sx={{ my: 0.5 }} />}
              <NavItem item={item} level={1} isParents />
            </Fragment>
          );
        }
        return (
          <NavGroup
            key={item.id}
            selectedID={selectedID}
            setSelectedID={setSelectedID}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            lastItem={lastItem!}
            remItems={remItems}
            lastItemId={lastItemId}
            item={item}
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });

  return (
    <Box
      sx={{
        pt: drawerOpen ? (isHorizontal ? 0 : 2) : 0,
        '& > ul:first-of-type': { mt: 0 },
        display: isHorizontal ? { xs: 'block', lg: 'flex' } : 'block'
      }}
    >
      {navGroups}
    </Box>
  );
}
