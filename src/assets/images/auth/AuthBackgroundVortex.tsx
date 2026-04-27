// material-ui
import { useTheme, alpha, keyframes } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project-imports
import { ThemeMode } from 'config';

// ==============================|| AUTH VORTEX BACKGROUND ||============================== //

// Configuration constants — larger, faster motion reads more “alive”
const VORTEX_SIZE_FACTOR = 1.55;

const rotateVortex = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const rotateVortexReverse = keyframes`
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0deg); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-28px); }
`;

const AuthBackgroundVortex = () => {
  const theme = useTheme();

  const c = (color: string, o: number) => alpha(color, o);

  const pr = theme.palette.primary;
  // Orange accent in preset themes (MUI `warning`); pairs with primary in the vortex.
  const accent = theme.palette.warning;
  const primaryMain = pr.main;
  const primaryLight = pr.light;
  const primaryLighter = (pr as { lighter?: string }).lighter ?? pr.light;
  const primaryDark = pr.dark;
  const accentMain = accent.main;
  const accentLight = accent.light;
  const accentDark = accent.dark;
  const accentDarker = (accent as { darker?: string }).darker ?? accent.dark;

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 0,
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        // visible stack: keep above a soft base, never z-index: -1 (hides behind parent background)
        opacity: 0.75
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: `${800 * VORTEX_SIZE_FACTOR}px`,
          height: `${800 * VORTEX_SIZE_FACTOR}px`,
          top: '30%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
          background: `conic-gradient(
            from 0deg,
            ${c(primaryLighter, 0)} 0deg,
            ${c(accentLight, 0.28)} 45deg,
            ${c(primaryLighter, 0.22)} 60deg,
            ${c(primaryLight, 0.42)} 120deg,
            ${c(accentMain, 0.38)} 150deg,
            ${c(primaryMain, 0.55)} 180deg,
            ${c(accentDark, 0.32)} 210deg,
            ${c(primaryLight, 0.4)} 240deg,
            ${c(primaryLighter, 0.22)} 300deg,
            ${c(accentLight, 0.2)} 330deg,
            ${c(primaryLighter, 0)} 360deg
          )`,
          borderRadius: '50%',
          filter: `blur(${72 * VORTEX_SIZE_FACTOR}px)`,
          animation: `${rotateVortex} 14s linear infinite`
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: `${600 * VORTEX_SIZE_FACTOR}px`,
          height: `${600 * VORTEX_SIZE_FACTOR}px`,
          top: '30%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
          background: `conic-gradient(
            from 180deg,
            ${c(primaryMain, 0)} 0deg,
            ${c(accentMain, 0.35)} 60deg,
            ${c(primaryMain, 0.38)} 90deg,
            ${c(primaryDark, 0.52)} 180deg,
            ${c(accentDark, 0.4)} 220deg,
            ${c(primaryMain, 0.36)} 270deg,
            ${c(accentLight, 0.28)} 310deg,
            ${c(primaryMain, 0)} 360deg
          )`,
          borderRadius: '50%',
          filter: `blur(${52 * VORTEX_SIZE_FACTOR}px)`,
          animation: `${rotateVortexReverse} 11s linear infinite`
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: `${400 * VORTEX_SIZE_FACTOR}px`,
          height: `${400 * VORTEX_SIZE_FACTOR}px`,
          top: '30%',
          left: '20%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(
            circle,
            ${c(accentMain, 0.35)} 0%,
            ${c(primaryMain, 0.48)} 22%,
            ${c(primaryLight, 0.3)} 38%,
            ${c(accentLight, 0.22)} 55%,
            ${c(primaryLighter, 0.12)} 72%,
            transparent 100%
          )`,
          borderRadius: '50%',
          filter: `blur(${36 * VORTEX_SIZE_FACTOR}px)`,
          animation: `${rotateVortex} 8s linear infinite, ${float} 6.5s ease-in-out infinite`
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: `${300 * VORTEX_SIZE_FACTOR}px`,
          height: `${300 * VORTEX_SIZE_FACTOR}px`,
          top: '25%',
          right: '15%',
          background: `radial-gradient(circle, ${c(accentLight, 0.32)}, ${c(primaryLight, 0.18)} 45%, transparent 70%)`,
          borderRadius: '50%',
          filter: `blur(${44 * VORTEX_SIZE_FACTOR}px)`,
          animation: `${float} 5s ease-in-out infinite`
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: `${250 * VORTEX_SIZE_FACTOR}px`,
          height: `${250 * VORTEX_SIZE_FACTOR}px`,
          bottom: '15%',
          left: '5%',
          background: `radial-gradient(circle, ${c(accentDarker, 0.26)}, ${c(primaryDark, 0.22)} 50%, transparent 72%)`,
          borderRadius: '50%',
          filter: `blur(${40 * VORTEX_SIZE_FACTOR}px)`,
          animation: `${float} 5.5s ease-in-out infinite 0.8s`
        }}
      />
    </Box>
  );
};

export default AuthBackgroundVortex;
