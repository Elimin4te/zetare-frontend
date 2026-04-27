import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useIntl } from 'react-intl';

import IconButton from 'components/@extended/IconButton';
import { ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

import { Moon, Sun1 } from 'iconsax-react';

// ==============================|| HEADER - THEME (LIGHT / DARK) ||============================== //

export default function ThemeModeToggle() {
  const theme = useTheme();
  const intl = useIntl();
  const { onChangeMode } = useConfig();

  const isDarkUi = theme.palette.mode === 'dark';
  const iconBackColorOpen = isDarkUi ? 'background.paper' : 'secondary.200';
  const iconBackColor = isDarkUi ? 'background.default' : 'secondary.100';

  const handleClick = () => {
    onChangeMode(isDarkUi ? ThemeMode.LIGHT : ThemeMode.DARK);
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <Tooltip
        title={intl.formatMessage({
          id: isDarkUi ? 'theme-mode-toggle-to-light' : 'theme-mode-toggle-to-dark'
        })}
      >
        <IconButton
          color="secondary"
          variant="light"
          onClick={handleClick}
          size="large"
          aria-label={intl.formatMessage({
            id: isDarkUi ? 'theme-mode-toggle-to-light' : 'theme-mode-toggle-to-dark'
          })}
          sx={{ color: 'secondary.main', bgcolor: iconBackColor, p: 1, '&:hover': { bgcolor: iconBackColorOpen } }}
        >
          {isDarkUi ? <Sun1 variant="Bulk" /> : <Moon variant="Bulk" />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
