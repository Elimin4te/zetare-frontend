import { useIntl } from 'react-intl';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third party
import { motion } from 'framer-motion';

// project-imports
import MainCard from 'components/MainCard';
import { getAppTitle } from 'constants/branding';

// assets
import { Chart21, DocumentText, SecuritySafe, Speedometer } from 'iconsax-react';

// ==============================|| DASHBOARD LANDING - FEATURES ||============================== //

export default function DashboardFeatures() {
  const intl = useIntl();
  const theme = useTheme();
  const appName = getAppTitle();

  const features = [
    {
      icon: <Chart21 variant="Bulk" size={48} />,
      title: intl.formatMessage({ id: 'dashboard-landing-feature-1-title' }),
      description: intl.formatMessage({ id: 'dashboard-landing-feature-1-description' })
    },
    {
      icon: <Speedometer variant="Bulk" size={48} />,
      title: intl.formatMessage({ id: 'dashboard-landing-feature-2-title' }),
      description: intl.formatMessage({ id: 'dashboard-landing-feature-2-description' })
    },
    {
      icon: <DocumentText variant="Bulk" size={48} />,
      title: intl.formatMessage({ id: 'dashboard-landing-feature-3-title' }),
      description: intl.formatMessage({ id: 'dashboard-landing-feature-3-description' })
    },
    {
      icon: <SecuritySafe variant="Bulk" size={48} />,
      title: intl.formatMessage({ id: 'dashboard-landing-feature-4-title' }),
      description: intl.formatMessage({ id: 'dashboard-landing-feature-4-description' })
    }
  ];

  return (
    <Box
      id="features-section"
      sx={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle gradient spheres */}
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          right: '8%',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}10 0%, transparent 60%)`,
          filter: 'blur(30px)',
          animation: 'float-subtle 15s ease-in-out infinite',
          '@keyframes float-subtle': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(-10px, -15px) scale(1.05)' }
          },
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}08 0%, transparent 60%)`,
          filter: 'blur(25px)',
          animation: 'float-subtle 18s ease-in-out infinite reverse',
          '@keyframes float-subtle': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(10px, 15px) scale(1.05)' }
          },
          zIndex: 0
        }}
      />
      <Container>
        <Grid container spacing={4} sx={{ mt: { md: 8, xs: 4 }, mb: { md: 8, xs: 4 }, position: 'relative', zIndex: 1 }}>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="center" sx={{ textAlign: 'center', marginBottom: { md: 4, xs: 0 } }}>
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, translateY: 50 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 30
                  }}
                >
                  <Typography variant="h2">{intl.formatMessage({ id: 'dashboard-landing-features-title' })}</Typography>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={8}>
                <motion.div
                  initial={{ opacity: 0, translateY: 50 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 30,
                    delay: 0.2
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    {intl.formatMessage({ id: 'dashboard-landing-features-description' }, { appName })}
                  </Typography>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, translateY: 50 }}
                    whileInView={{ opacity: 1, translateY: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      type: 'spring',
                      stiffness: 150,
                      damping: 30,
                      delay: 0.1 * index
                    }}
                  >
                    <motion.div whileHover={{ y: -8, transition: { duration: 0.3 } }} style={{ height: '100%' }}>
                      <MainCard
                        sx={{
                          height: '10',
                          minHeight: { lg: '320px', sm: '280px', xs: 'none' },
                          textAlign: 'center',
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: `0 8px 24px ${theme.palette.primary.main}20`,
                            transform: 'translateY(-8px)'
                          }
                        }}
                      >
                        <Stack spacing={3} alignItems="center" sx={{ flex: 1, justifyContent: 'space-between' }}>
                          <motion.div
                            animate={{
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              repeatDelay: 2,
                              ease: 'easeInOut'
                            }}
                          >
                            <Box
                              sx={{
                                width: 80,
                                height: 80,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                bgcolor: 'primary.lighter',
                                color: 'primary.main',
                                position: 'relative',
                                '&::before': {
                                  content: '""',
                                  position: 'absolute',
                                  inset: -4,
                                  borderRadius: '50%',
                                  border: `2px solid ${theme.palette.primary.main}`,
                                  opacity: 0.3,
                                  animation: 'ripple 2s ease-out infinite',
                                  '@keyframes ripple': {
                                    '0%': { transform: 'scale(0.8)', opacity: 0.8 },
                                    '100%': { transform: 'scale(1.3)', opacity: 0 }
                                  }
                                }
                              }}
                            >
                              {feature.icon}
                            </Box>
                          </motion.div>
                          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                            <Typography variant="h5" sx={{ mb: 1 }}>
                              {feature.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {feature.description}
                            </Typography>
                          </Box>
                        </Stack>
                      </MainCard>
                    </motion.div>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
