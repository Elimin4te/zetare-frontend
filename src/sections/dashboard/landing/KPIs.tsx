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

// assets
import { Chart21, MoneyRecive, ShoppingCart, TrendUp } from 'iconsax-react';

// ==============================|| DASHBOARD LANDING - KPIs ||============================== //

export default function DashboardKPIs() {
  const intl = useIntl();
  const theme = useTheme();

  const kpis = [
    {
      icon: <Chart21 variant="Bulk" size={40} />,
      title: intl.formatMessage({ id: 'dashboard-landing-kpi-1-title' }),
      description: intl.formatMessage({ id: 'dashboard-landing-kpi-1-description' })
    },
    {
      icon: <MoneyRecive variant="Bulk" size={40} />,
      title: intl.formatMessage({ id: 'dashboard-landing-kpi-2-title' }),
      description: intl.formatMessage({ id: 'dashboard-landing-kpi-2-description' })
    },
    {
      icon: <ShoppingCart variant="Bulk" size={40} />,
      title: intl.formatMessage({ id: 'dashboard-landing-kpi-3-title' }),
      description: intl.formatMessage({ id: 'dashboard-landing-kpi-3-description' })
    },
    {
      icon: <TrendUp variant="Bulk" size={40} />,
      title: intl.formatMessage({ id: 'dashboard-landing-kpi-4-title' }),
      description: intl.formatMessage({ id: 'dashboard-landing-kpi-4-description' })
    }
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle gradient spheres */}
      <Box
        sx={{
          position: 'absolute',
          top: '12%',
          left: '6%',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}08 0%, transparent 60%)`,
          filter: 'blur(25px)',
          animation: 'float-subtle 16s ease-in-out infinite',
          '@keyframes float-subtle': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(12px, -18px) scale(1.06)' }
          },
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}06 0%, transparent 60%)`,
          filter: 'blur(20px)',
          animation: 'float-subtle 19s ease-in-out infinite reverse',
          '@keyframes float-subtle': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(-12px, 18px) scale(1.06)' }
          },
          zIndex: 0
        }}
      />
      <Container>
        <Grid container spacing={4} sx={{ mt: 4, mb: { md: 8, xs: 4 }, position: 'relative', zIndex: 1 }}>
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
                  <Typography variant="h2">{intl.formatMessage({ id: 'dashboard-landing-kpis-title' })}</Typography>
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
                    {intl.formatMessage({ id: 'dashboard-landing-kpis-description' })}
                  </Typography>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {kpis.map((kpi, index) => (
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
                          height: '100%',
                          minHeight: { lg: '240px', sm: '280px', xs: 'none' },
                          p: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '4px',
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                            transform: 'scaleX(0)',
                            transformOrigin: 'left',
                            transition: 'transform 0.3s ease'
                          },
                          '&:hover': {
                            boxShadow: `0 8px 24px ${theme.palette.primary.main}25`,
                            transform: 'translateY(-8px)',
                            '&::before': {
                              transform: 'scaleX(1)'
                            }
                          }
                        }}
                      >
                        <Stack spacing={3} alignItems="center" textAlign="center" sx={{ flex: 1, justifyContent: 'space-between' }}>
                          <motion.div
                            animate={{
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.05, 1]
                            }}
                            transition={{
                              duration: 4,
                              repeat: Infinity,
                              repeatDelay: 3,
                              ease: 'easeInOut'
                            }}
                          >
                            <Box
                              sx={{
                                width: 70,
                                height: 70,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '50%',
                                bgcolor: 'primary.lighter',
                                color: 'primary.main',
                                position: 'relative',
                                '&::after': {
                                  content: '""',
                                  position: 'absolute',
                                  inset: -2,
                                  borderRadius: '50%',
                                  border: `1px solid ${theme.palette.primary.main}`,
                                  opacity: 0.2,
                                  animation: 'pulse-ring 2s ease-out infinite',
                                  '@keyframes pulse-ring': {
                                    '0%': { transform: 'scale(0.9)', opacity: 0.6 },
                                    '100%': { transform: 'scale(1.3)', opacity: 0 }
                                  }
                                }
                              }}
                            >
                              {kpi.icon}
                            </Box>
                          </motion.div>
                          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                            <Typography variant="h5" sx={{ mb: 1 }}>
                              {kpi.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {kpi.description}
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
