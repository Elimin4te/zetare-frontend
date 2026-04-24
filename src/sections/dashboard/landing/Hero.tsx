import { useIntl } from 'react-intl';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// third party
import { motion } from 'framer-motion';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { getAppTitle, getCompanyName } from 'constants/branding';

// ==============================|| DASHBOARD LANDING - HERO ||============================== //

export default function DashboardHero() {
  const theme = useTheme();
  const intl = useIntl();
  const appName = getAppTitle();
  const companyName = getCompanyName();

  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 200px)',
        position: 'relative',
        pb: 8,
        pt: 6,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Gradient Spheres */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}20 0%, ${theme.palette.primary.main}08 40%, transparent 70%)`,
          filter: 'blur(40px)',
          animation: 'float-sphere 20s ease-in-out infinite',
          '@keyframes float-sphere': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(-20px, -30px) scale(1.1)' }
          },
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}05 40%, transparent 70%)`,
          filter: 'blur(40px)',
          animation: 'float-sphere 25s ease-in-out infinite reverse',
          '@keyframes float-sphere': {
            '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
            '50%': { transform: 'translate(20px, 30px) scale(1.1)' }
          },
          zIndex: 0
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}12 0%, transparent 60%)`,
          filter: 'blur(30px)',
          animation: 'float-sphere 18s ease-in-out infinite',
          '@keyframes float-sphere': {
            '0%, 100%': { transform: 'translate(0, 0)' },
            '50%': { transform: 'translate(-15px, -20px)' }
          },
          zIndex: 0
        }}
      />
      {/* SVG Background Elements */}
      <Box
        component="svg"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.05,
          zIndex: 0,
          pointerEvents: 'none'
        }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 800"
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity="0.3" />
            <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="150" r="100" fill={theme.palette.primary.main} opacity="0.1">
          <animate attributeName="r" values="100;120;100" dur="8s" repeatCount="indefinite" />
        </circle>
        <circle cx="1000" cy="600" r="150" fill={theme.palette.primary.main} opacity="0.1">
          <animate attributeName="r" values="150;170;150" dur="10s" repeatCount="indefinite" />
        </circle>
        <path d="M0,400 Q300,200 600,400 T1200,400" stroke={theme.palette.primary.main} strokeWidth="2" fill="none" opacity="0.2">
          <animate
            attributeName="d"
            values="M0,400 Q300,200 600,400 T1200,400;M0,400 Q300,300 600,400 T1200,400;M0,400 Q300,200 600,400 T1200,400"
            dur="12s"
            repeatCount="indefinite"
          />
        </path>
      </Box>
      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item xs={12} md={10}>
            <Grid container spacing={3} sx={{ textAlign: 'center' }}>
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
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                      fontWeight: 700,
                      lineHeight: 1.2,
                      mb: 2,
                      background: `linear-gradient(135deg, ${theme.palette.text.primary} 0%, ${theme.palette.primary.main} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      position: 'relative'
                    }}
                  >
                    {intl.formatMessage({ id: 'dashboard-landing-hero-title' }, { appName })}
                  </Typography>
                </motion.div>
              </Grid>
              <Grid container justifyContent="center" item xs={12}>
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
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: { xs: '1rem', md: '1.25rem' },
                        fontWeight: 400,
                        lineHeight: 1.6,
                        color: 'text.secondary',
                        mb: 4
                      }}
                    >
                      {intl.formatMessage({ id: 'dashboard-landing-hero-description' }, { appName, companyName })}
                    </Typography>
                  </motion.div>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <motion.div
                  initial={{ opacity: 0, translateY: 50 }}
                  whileInView={{ opacity: 1, translateY: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 30,
                    delay: 0.4
                  }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <AnimateButton>
                      <Button
                        onClick={handleScrollToFeatures}
                        size="large"
                        color="primary"
                        variant="contained"
                        sx={{
                          boxShadow: `0 8px 24px ${theme.palette.primary.main}40`,
                          '&:hover': {
                            boxShadow: `0 12px 32px ${theme.palette.primary.main}60`
                          }
                        }}
                      >
                        {intl.formatMessage({ id: 'dashboard-landing-hero-button' })}
                      </Button>
                    </AnimateButton>
                  </motion.div>
                </motion.div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
