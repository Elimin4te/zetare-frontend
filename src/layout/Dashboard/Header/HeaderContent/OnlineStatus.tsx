import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import { useIntl } from 'react-intl';

import IconButton from 'components/@extended/IconButton';
import useConfig from 'hooks/useConfig';
import { useOnlineStatus } from 'hooks/useOnlineStatus';
import IconByName from 'components/IconByName';

export default function OnlineStatus() {
  const theme = useTheme();
  const intl = useIntl();
  const { mode } = useConfig();

  const isOnline = useOnlineStatus();

  const title = isOnline ? intl.formatMessage({ id: 'online' }) : intl.formatMessage({ id: 'offline' });
  const color = isOnline ? theme.palette.success.main : theme.palette.error.main;

  // Prefer Wifi icons if available in iconsax; fallback handled by IconByName.
  const iconName = isOnline ? 'Wifi' : null;

  return (
    <Box sx={{ flexShrink: 0, ml: 0.5 }}>
      <Tooltip title={title}>
          <IconButton
            color="secondary"
            variant="light"
            size="large"
            disabled
            aria-label={title}
            sx={{
              color,
              p: 1,
              bgcolor: 'transparent',
              '&:hover': { bgcolor: 'transparent' },
              '&.Mui-disabled': {
                opacity: 1,
                color,
                bgcolor: 'transparent'
              }
            }}
          >
            <IconByName name={iconName} variant="Bulk" />
          </IconButton>
      </Tooltip>
    </Box>
  );
}

