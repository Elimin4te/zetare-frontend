import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import { APP_DEFAULT_PATH } from 'constants/routes';

// assets
import error404 from 'assets/images/maintenance/img-error-404.svg';

// ==============================|| ERROR 404 ||============================== //

export default function Error404() {
  const intl = useIntl();

  return (
    <Grid
      container
      spacing={10}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', pt: 2, pb: 1, overflow: 'hidden' }}
    >
      <Grid item xs={12}>
        <Stack direction="row">
          <Grid item>
            <Box sx={{ width: { xs: 250, sm: 590 }, height: { xs: 130, sm: 300 } }}>
              <img src={error404} alt="error 404" style={{ width: '100%', height: '100%' }} />
            </Box>
          </Grid>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} justifyContent="center" alignItems="center">
          <Typography variant="h1">{intl.formatMessage({ id: 'error-404-title' })}</Typography>
          <Typography color="text.secondary" align="center" sx={{ width: { xs: '73%', sm: '61%' } }}>
            {intl.formatMessage({ id: 'error-404-description' })}
          </Typography>
          <Button component={Link} to={APP_DEFAULT_PATH} variant="contained">
            {intl.formatMessage({ id: 'error-404-button' })}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
