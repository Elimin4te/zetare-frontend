import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// ==============================|| WIDGET - CHARTS (placeholder) ||============================== //

export default function WidgetChart() {
  return (
    <Box p={2}>
      <Stack spacing={1}>
        <Typography variant="h3">Chart widgets</Typography>
        <Typography color="text.secondary">Static placeholder until chart widgets are wired to your data.</Typography>
      </Stack>
    </Box>
  );
}
