import { useIntl } from 'react-intl';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third party
import { motion } from 'framer-motion';

// project-imports
import { getAppTitle, getCompanyName } from 'constants/branding';

// assets
import { TickCircle, CloseCircle } from 'iconsax-react';

// ==============================|| DASHBOARD LANDING - BENEFITS ||============================== //

export default function DashboardBenefits() {
  const intl = useIntl();
  const theme = useTheme();
  const appName = getAppTitle();
  const companyName = getCompanyName();

  const benefits = [
    {
      icon: <TickCircle variant="Bulk" size={24} />,
      text: intl.formatMessage({ id: 'dashboard-landing-benefit-1' })
    },
    {
      icon: <TickCircle variant="Bulk" size={24} />,
      text: intl.formatMessage({ id: 'dashboard-landing-benefit-2' })
    },
    {
      icon: <TickCircle variant="Bulk" size={24} />,
      text: intl.formatMessage({ id: 'dashboard-landing-benefit-3' })
    },
    {
      icon: <CloseCircle variant="Bulk" size={24} />,
      text: intl.formatMessage({ id: 'dashboard-landing-benefit-4' }),
      isNegative: true
    },
    {
      icon: <CloseCircle variant="Bulk" size={24} />,
      text: intl.formatMessage({ id: 'dashboard-landing-benefit-5' }),
      isNegative: true
    },
    {
      icon: <CloseCircle variant="Bulk" size={24} />,
      text: intl.formatMessage({ id: 'dashboard-landing-benefit-6' }),
      isNegative: true
    }
  ];

  return (
    <Box
      sx={{
        bgcolor: 'primary.lighter',
        py: { md: 10, xs: 5 },
        position: 'relative',
        overflow: 'hidden',
        '&:after': {
          content: '""',
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23${theme.palette.primary.main.replace('#', '')}' fill-opacity='0.15' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'/%3E%3Cpath fill='%23${theme.palette.primary.main.replace('#', '')}' fill-opacity='0.1' d='M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'/%3E%3C/svg%3E") 100% 100% / cover no-repeat`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          opacity: 0.6
        }
      }}
    >
      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, translateX: -50 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30
              }}
            >
              <Typography variant="h2" sx={{ mb: 3, px: { md: 0, xs: 1 } }}>
                {intl.formatMessage({ id: 'dashboard-landing-benefits-title' }, { appName })}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: { md: 4, xs: 0 }, px: { md: 0, xs: 1 } }}>
                {intl.formatMessage({ id: 'dashboard-landing-benefits-description' }, { companyName })}
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, translateX: 50 }}
              whileInView={{ opacity: 1, translateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 0.2
              }}
            >
              <Stack spacing={2}>
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      delay: 0.1 * index,
                      duration: 0.5
                    }}
                    whileHover={{ x: -8, transition: { duration: 0.2 } }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      sx={{
                        p: 2,
                        borderRadius: 1,
                        bgcolor: 'background.paper',
                        transition: 'all 0.3s ease',
                        cursor: 'default',
                        '&:hover': {
                          boxShadow: `0 4px 12px ${theme.palette.primary.main}15`,
                          transform: 'translateX(-8px)'
                        },
                        ...(benefit.isNegative && {
                          opacity: 0.7
                        })
                      }}
                    >
                      <Box
                        sx={{
                          color: benefit.isNegative ? 'error.main' : 'success.main'
                        }}
                      >
                        {benefit.icon}
                      </Box>
                      <Typography variant="body1">{benefit.text}</Typography>
                    </Stack>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
