// material-ui
import Box from '@mui/material/Box';

// project-imports
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

interface DrawerContentProps {
  /** Use native overflow scroll (reliable on mobile). When false, uses SimpleBar. */
  useNativeScroll?: boolean;
}

export default function DrawerContent({ useNativeScroll = false }: DrawerContentProps) {
  if (useNativeScroll) {
    return (
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          height: 'calc(100vh - 100px)',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          pb: 2
        }}
      >
        <Navigation />
      </Box>
    );
  }

  return (
    <SimpleBar
      sx={{
        flex: 1,
        minHeight: 0,
        '& .simplebar-content': { display: 'flex', flexDirection: 'column', pb: 10 },
        // Hide native scrollbar; SimpleBar provides custom one
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        '& .simplebar-content-wrapper': {
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' }
        }
      }}
    >
      <Navigation />
    </SimpleBar>
  );
}
