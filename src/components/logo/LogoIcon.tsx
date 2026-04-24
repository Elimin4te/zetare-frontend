// material-ui
import logoIcon from 'assets/images/logoIcon.png';

// ==============================|| LOGO ICON SVG ||============================== //

export default function LogoIcon({ width = 100 }: { width?: number }) {
  return <img src={logoIcon} alt="icon logo" width={width} />;
}
