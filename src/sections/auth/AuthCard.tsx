// material-ui
import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

// project-imports
import MainCard, { MainCardProps } from 'components/MainCard';

type AuthCardProps = MainCardProps & {
  /** Merged into the inner content wrapper (padding, etc.). */
  contentBoxSx?: BoxProps['sx'];
};

// ==============================|| AUTHENTICATION - CARD ||============================== //

/**
 * Rounded "pill" card: large radius, light surface (matches landing-style sign-in UIs).
 */
export default function AuthCard({ children, contentBoxSx, sx, ...other }: AuthCardProps) {
  const theme = useTheme();

  const baseCardSx = {
    maxWidth: { xs: 440, md: 500 },
    margin: { xs: 0, sm: 0 },
    width: '100%',
    borderRadius: { xs: 5, sm: 6, md: 7 },
    bgcolor: theme.palette.background.paper,
    boxShadow: theme.customShadows?.z1 ?? '0 8px 32px rgba(0,0,0,0.08)',
    border: 'none'
  };

  const mergedSx = { ...baseCardSx, ...(sx != null && !Array.isArray(sx) ? sx : {}) };

  return (
    <MainCard
      boxShadow={false}
      border={false}
      elevation={0}
      sx={mergedSx}
      content={false}
      {...other}
    >
      <Box sx={{ p: { xs: 3, sm: 3.5, md: 4, lg: 4.5 }, ...contentBoxSx }}>{children}</Box>
    </MainCard>
  );
}
