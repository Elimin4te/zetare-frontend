import { Link as RouterLink } from 'react-router-dom';
import { useIntl } from 'react-intl';

// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getCompanyName } from 'constants/branding';
import { useSupportMailtoLink } from 'constants/support';
import { useDefaultPath } from 'hooks/useDefaultPath';

// ==============================|| MAIN LAYOUT - FOOTER ||============================== //

export default function Footer() {
  const intl = useIntl();
  const defaultPath = useDefaultPath();
  const companyName = getCompanyName();
  const getSupportLink = useSupportMailtoLink('contact');

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
      <Typography variant="caption">
        &copy; {new Date().getFullYear()} {companyName}
      </Typography>
      <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
        <Link component={RouterLink} to={defaultPath} variant="caption" color="text.primary">
          {intl.formatMessage({ id: 'home' })}
        </Link>
        <Link component={RouterLink} to={getSupportLink()} target="_blank" variant="caption" color="text.primary">
          {intl.formatMessage({ id: 'support' })}
        </Link>
      </Stack>
    </Stack>
  );
}
