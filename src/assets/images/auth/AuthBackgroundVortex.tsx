// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';

//project-imports
import { ThemeMode } from 'config';

// ==============================|| AUTH VORTEX BACKGROUND ||============================== //

// Configuration constants
const VORTEX_OPACITY = 0.4; // Additional opacity multiplier (25% increase)
const VORTEX_SIZE_FACTOR = 2; // Size multiplier for all vortex elements

// Vortex rotation animation
const rotateVortex = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Counter-rotation for inner vortex
const rotateVortexReverse = keyframes`
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

// Floating animation for depth
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const AuthBackgroundVortex = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === ThemeMode.DARK;

  // Get primary color values
  const primaryMain = theme.palette.primary.main;
  const primaryLight = theme.palette.primary.light;
  const primaryLighter = theme.palette.primary.lighter;
  const primaryDark = theme.palette.primary.dark;

  // Helper function to add opacity to hex color
  const withOpacity = (color: string, opacity: number) => {
    // Remove # if present
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: -1,
        bottom: 0,
        left: 0,
        top: 0,
        right: 0,
        overflow: 'hidden',
        opacity: (isDark ? 0.4 : 0.6) + VORTEX_OPACITY
      }}
    >
      {/* Outer rotating vortex */}
      <Box
        sx={{
          position: 'absolute',
          width: `${800 * VORTEX_SIZE_FACTOR}px`,
          height: `${800 * VORTEX_SIZE_FACTOR}px`,
          top: '25%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
          background: `conic-gradient(
            from 0deg,
            ${withOpacity(primaryLighter, 0)} 0deg,
            ${withOpacity(primaryLighter, 0.25)} 60deg,
            ${withOpacity(primaryLight, 0.4)} 120deg,
            ${withOpacity(primaryMain, 0.5)} 180deg,
            ${withOpacity(primaryLight, 0.4)} 240deg,
            ${withOpacity(primaryLighter, 0.25)} 300deg,
            ${withOpacity(primaryLighter, 0)} 360deg
          )`,
          borderRadius: '50%',
          filter: `blur(${80 * VORTEX_SIZE_FACTOR}px)`,
          animation: `${rotateVortex} 20s linear infinite`,
          opacity: (isDark ? 0.5 : 0.7) + VORTEX_OPACITY
        }}
      />

      {/* Middle rotating vortex (counter-rotation) */}
      <Box
        sx={{
          position: 'absolute',
          width: `${600 * VORTEX_SIZE_FACTOR}px`,
          height: `${600 * VORTEX_SIZE_FACTOR}px`,
          top: '25%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
          background: `conic-gradient(
            from 180deg,
            ${withOpacity(primaryMain, 0)} 0deg,
            ${withOpacity(primaryMain, 0.3)} 90deg,
            ${withOpacity(primaryDark, 0.45)} 180deg,
            ${withOpacity(primaryMain, 0.3)} 270deg,
            ${withOpacity(primaryMain, 0)} 360deg
          )`,
          borderRadius: '50%',
          filter: `blur(${60 * VORTEX_SIZE_FACTOR}px)`,
          animation: `${rotateVortexReverse} 15s linear infinite`,
          opacity: (isDark ? 0.4 : 0.6) + VORTEX_OPACITY
        }}
      />

      {/* Inner rotating vortex */}
      <Box
        sx={{
          position: 'absolute',
          width: `${400 * VORTEX_SIZE_FACTOR}px`,
          height: `${400 * VORTEX_SIZE_FACTOR}px`,
          top: '25%',
          left: '25%',
          transform: 'translate(-50%, -50%)',
          background: `radial-gradient(
            circle,
            ${withOpacity(primaryMain, 0.4)} 0%,
            ${withOpacity(primaryLight, 0.25)} 30%,
            ${withOpacity(primaryLighter, 0.15)} 60%,
            transparent 100%
          )`,
          borderRadius: '50%',
          filter: `blur(${40 * VORTEX_SIZE_FACTOR}px)`,
          animation: `${rotateVortex} 10s linear infinite, ${float} 8s ease-in-out infinite`,
          opacity: (isDark ? 0.5 : 0.7) + VORTEX_OPACITY
        }}
      />

      {/* Additional accent orbs */}
      <Box
        sx={{
          position: 'absolute',
          width: `${300 * VORTEX_SIZE_FACTOR}px`,
          height: `${300 * VORTEX_SIZE_FACTOR}px`,
          top: '25%',
          right: '25%',
          background: `radial-gradient(circle, ${withOpacity(primaryLight, 0.25)}, transparent 70%)`,
          borderRadius: '50%',
          filter: `blur(${50 * VORTEX_SIZE_FACTOR}px)`,
          animation: `${float} 6s ease-in-out infinite`,
          opacity: (isDark ? 0.3 : 0.5) + VORTEX_OPACITY
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          width: `${250 * VORTEX_SIZE_FACTOR}px`,
          height: `${250 * VORTEX_SIZE_FACTOR}px`,
          bottom: '20%',
          left: '8%',
          background: `radial-gradient(circle, ${withOpacity(primaryDark, 0.2)}, transparent 70%)`,
          borderRadius: '50%',
          filter: `blur(${45 * VORTEX_SIZE_FACTOR}px)`,
          animation: `${float} 7s ease-in-out infinite 1s`,
          opacity: (isDark ? 0.3 : 0.5) + VORTEX_OPACITY
        }}
      />
    </Box>
  );
};

export default AuthBackgroundVortex;
