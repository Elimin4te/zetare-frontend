// material-ui
import { useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';

// project-imports
import MainCard, { MainCardProps } from 'components/MainCard';

// ==============================|| AUTHENTICATION - CARD ||============================== //

export default function AuthCard({ children, ...other }: MainCardProps) {
  const theme = useTheme();

  return (
    <MainCard
      sx={{
        maxWidth: { xs: 400, md: 480 },
        margin: { xs: 2, md: 1 },
        bgcolor: alpha(theme.palette.background.paper, 0.75), // 75% opacity to show vortex through
        backdropFilter: 'blur(10px)', // Optional: adds a subtle blur effect
        '& > *': {
          flexGrow: 1,
          flexBasis: '50%'
        }
      }}
      content={false}
      {...other}
    >
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>{children}</Box>
    </MainCard>
  );
}
