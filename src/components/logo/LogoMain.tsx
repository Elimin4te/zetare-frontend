// material-ui
import { useTheme } from '@mui/material/styles';

import logo from 'assets/images/logo.png';
import logoDark from 'assets/images/logoDark.png';

export default function LogoMain({ width = 100 }: { width?: number }) {
  const theme = useTheme();

  return <img src={theme.palette.mode === 'dark' ? logoDark : logo} alt="logo" width={width} />;
}
