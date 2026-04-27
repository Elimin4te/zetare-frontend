// material-ui
import { useTheme, alpha, keyframes } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project-imports
import { ThemeMode } from 'config';

// ==============================|| AUTH VORTEX BACKGROUND ||============================== //

// Configuration constants
const VORTEX_SIZE_FACTOR = 1.2;

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
  50% { transform: translateY(-20px); }
`;

const AuthBackgroundVortex = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === ThemeMode.DARK;

  const c = (color: string, o: number) => alpha(color, o);

  const pr = theme.palette.primary;
  const primaryMain = pr.main;
  const primaryLight = pr.light;
  const primaryLighter = (pr as { lighter?: string }).lighter ?? pr.light;
  const primaryDark = pr.dark;

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: 0,
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        // visible stack: keep above a soft base, never z-index: -1 (hides behind parent background)
        opacity: isDark ? 0.85 : 0.95
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
            ${c(primaryLighter, 0.2)} 60deg,
            ${c(primaryLight, 0.35)} 120deg,
            ${c(primaryMain, 0.5)} 180deg,
            ${c(primaryLight, 0.35)} 240deg,
            ${c(primaryLighter, 0.2)} 300deg,
            ${c(primaryLighter, 0)} 360deg
          )`,
          borderRadius: '50%',
          filter: `blur(${80 * VORTEX_SIZE_FACTOR}px)`,
          animation: `${rotateVortex} 20s linear infinite`
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
            ${c(primaryMain, 0.3)} 90deg,
            ${c(primaryDark, 0.45)} 180deg,
            ${c(primaryMain, 0.3)} 270deg,
            ${c(primaryMain, 0)} 360deg
          )`,
          borderRadius: '50%',
          filter: `blur(${60 * VORTEX_SIZE_FACTOR}px)`,
          animation: `${rotateVortexReverse} 15s linear infinite`
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
            ${c(primaryMain, 0.4)} 0%,
            ${c(primaryLight, 0.25)} 30%,
            ${c(primaryLighter, 0.15)} 60%,
            transparent 100%
          )`,
          borderRadius: '50%',
          filter: `blur(${40 * VORTEX_SIZE_FACTOR}px)`,
          animation: `${rotateVortex} 10s linear infinite, ${float} 8s ease-in-out infinite`
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: `${300 * VORTEX_SIZE_FACTOR}px`,
          height: `${300 * VORTEX_SIZE_FACTOR}px`,
          top: '25%',
          right: '15%',
          background: `radial-gradient(circle, ${c(primaryLight, 0.25)}, transparent 70%)`,
          borderRadius: '50%',
          filter: `blur(${50 * VORTEX_SIZE_FACTOR}px)`,
          animation: `${float} 6s ease-in-out infinite`
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: `${250 * VORTEX_SIZE_FACTOR}px`,
          height: `${250 * VORTEX_SIZE_FACTOR}px`,
          bottom: '15%',
          left: '5%',
          background: `radial-gradient(circle, ${c(primaryDark, 0.2)}, transparent 70%)`,
          borderRadius: '50%',
          filter: `blur(${45 * VORTEX_SIZE_FACTOR}px)`,
          animation: `${float} 7s ease-in-out infinite 1s`
        }}
      />
    </Box>
  );
};

export default AuthBackgroundVortex;
