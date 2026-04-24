import { Link } from 'react-router-dom';
import { To } from 'history';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';
import { SxProps } from '@mui/system';

// project-imports
import Logo from './LogoMain';
import LogoIcon from './LogoIcon';
import useAuth from 'hooks/useAuth';
import { useDefaultPath } from 'hooks/useDefaultPath';

interface Props {
  isIcon?: boolean;
  sx?: SxProps;
  to?: To;
}

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection({ isIcon, sx, to }: Props) {
  const { isLoggedIn } = useAuth();
  const defaultPath = useDefaultPath();

  const { width } = sx as { width?: number };

  return (
    <ButtonBase disableRipple {...(isLoggedIn && { component: Link, to: !to ? defaultPath : to, sx })}>
      {isIcon ? <LogoIcon width={width ?? 100} /> : <Logo width={width ?? 100} />}
    </ButtonBase>
  );
}
