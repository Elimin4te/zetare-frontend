import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

// project import
import GuestGuard from 'utils/route-guard/GuestGuard';
import PageTitle from 'components/PageTitle';

// ==============================|| LAYOUT - AUTH ||============================== //

export default function AuthLayout() {
  return (
    <GuestGuard>
      <Box>
        <PageTitle />
        <Outlet />
      </Box>
    </GuestGuard>
  );
}
