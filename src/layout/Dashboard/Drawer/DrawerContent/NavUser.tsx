// material-ui
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

// project import
import UserAvatar from 'components/@extended/UserAvatar';
import { getCompanyName } from 'constants/branding';
import useAuth from 'hooks/useAuth';
import { useGetMenuMaster } from 'lib/menuState';

// ==============================|| LIST - USER ||============================== //

export default function UserList() {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster?.isDashboardDrawerOpened ?? false;

  const { user } = useAuth();

  // Get display name (displayName or fallback to firstName + lastName or username)
  const displayName =
    user?.displayName || (user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : null) || user?.username || 'User';

  // Get secondary text (title or department or email)
  const secondaryText = user?.title || user?.department || user?.email || getCompanyName();

  return (
    <Box
      sx={{
        p: 1.25,
        px: !drawerOpen ? 1.25 : 3,
        borderTop: '2px solid ',
        borderTopColor: 'divider',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.paper'
      }}
    >
      <List disablePadding>
        <ListItem
          disablePadding
          sx={{
            ...(!drawerOpen && { display: 'flex', justifyContent: 'flex-end' })
          }}
        >
          <ListItemAvatar>
            <UserAvatar size={drawerOpen ? 40 : undefined} alt={displayName} />
          </ListItemAvatar>
          <ListItemText primary={displayName} sx={{ ...(!drawerOpen && { display: 'none' }) }} secondary={secondaryText} />
        </ListItem>
      </List>
    </Box>
  );
}
