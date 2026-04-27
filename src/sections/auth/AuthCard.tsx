// material-ui
import { useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project-imports
import MainCard, { MainCardProps } from 'components/MainCard';

// ==============================|| AUTHENTICATION - CARD ||============================== //

/**
 * Rounded "pill" card: large radius, light surface (matches landing-style sign-in UIs).
 */
export default function AuthCard({ children, ...other }: MainCardProps) {
  const theme = useTheme();

  return (
    <MainCard
      boxShadow
      border={false}
      sx={{
        maxWidth: { xs: 440, md: 500 },
        margin: { xs: 0, sm: 0 },
        width: '100%',
        borderRadius: { xs: 5, sm: 6, md: 7 },
        bgcolor: theme.palette.background.paper,
        boxShadow: theme.customShadows?.z1 ?? '0 8px 32px rgba(0,0,0,0.08)',
        border: `1px solid ${alpha(theme.palette.divider, 0.4)}`
      }}
      content={false}
      {...other}
    >
      <Box sx={{ p: { xs: 3, sm: 3.5, md: 4, lg: 4.5 } }}>{children}</Box>
    </MainCard>
  );
}
