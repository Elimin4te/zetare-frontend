import { useIntl } from 'react-intl';

// material-ui
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import MainCard from 'components/MainCard';
import { useSupportMailtoLink } from 'constants/support';

// assets
import { I24Support } from 'iconsax-react';
import AnimateButton from 'components/@extended/AnimateButton';

// ==============================|| DRAWER CONTENT - NAV CARD ||============================== //

export default function NavCard() {
  const intl = useIntl();
  const getSupportLink = useSupportMailtoLink('common-issue');
  const mailtoLink = getSupportLink();

  return (
    <MainCard sx={{ bgcolor: 'secondary.lighter', m: 2 }}>
      <Stack alignItems="center" spacing={2.5}>
        <Box
          sx={{
            width: 70,
            height: 70,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            bgcolor: 'primary.lighter',
            color: 'primary.main'
          }}
        >
          <I24Support variant="Bulk" size={40} />
        </Box>
        <Stack alignItems="center">
          <Typography variant="h6">{intl.formatMessage({ id: 'nav-card-title' })}</Typography>
          <Typography variant="body2" color="text.secondary">
            {intl.formatMessage({ id: 'nav-card-subtitle' })}
          </Typography>
        </Stack>
        <AnimateButton>
          <Button variant="shadow" size="small" component={Link} href={mailtoLink}>
            {intl.formatMessage({ id: 'nav-card-button' })}
          </Button>
        </AnimateButton>
      </Stack>
    </MainCard>
  );
}
