import { useRef, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

// project-imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';
import useConfig from 'hooks/useConfig';
import { ThemeMode } from 'config';

// assets
import { Notification } from 'iconsax-react';
import { useIntl } from 'react-intl';

// ==============================|| HEADER CONTENT - NOTIFICATION ||============================== //

export default function NotificationPage() {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
  const { mode } = useConfig();
  const intl = useIntl();
  const anchorRef = useRef<any>(null);
  const [read] = useState(0); // No notifications
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const iconBackColorOpen = mode === ThemeMode.DARK ? 'background.paper' : 'secondary.200';
  const iconBackColor = mode === ThemeMode.DARK ? 'background.default' : 'secondary.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.5 }}>
      <Tooltip title={intl.formatMessage({ id: 'notifications' })}>
        <IconButton
          color="secondary"
          variant="light"
          aria-label="open notifications"
          ref={anchorRef}
          aria-controls={open ? 'notification-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          size="large"
          sx={{ color: 'secondary.main', bgcolor: open ? iconBackColorOpen : iconBackColor, p: 1 }}
        >
          <Badge badgeContent={read} color="success" sx={{ '& .MuiBadge-badge': { top: 2, right: 4 } }}>
            <Notification variant="Bulk" />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popper
        placement={matchesXs ? 'bottom-start' : 'bottom'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? 0 : 0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position={matchesXs ? 'top-right' : 'top'} in={open} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.customShadows.z1, borderRadius: 1.5 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} content={false}>
                  <Box
                    sx={{
                      p: 1,
                      width: '100%',
                      minWidth: 200,
                      maxWidth: 290,
                      bgcolor: theme.palette.background.paper,
                      [theme.breakpoints.down('md')]: { maxWidth: 250 }
                    }}
                  >
                    <Box sx={{ py: 3, textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary">
                        {intl.formatMessage({ id: 'no-notifications' })}
                      </Typography>
                    </Box>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}
