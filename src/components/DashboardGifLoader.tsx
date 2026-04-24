import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { motion } from 'framer-motion';
import loaderGif from 'assets/images/loader.gif';
import Typography from '@mui/material/Typography';
import { useIntl } from 'react-intl';

interface DashboardGifLoaderProps {
  size?: number;
  minHeight?: number;
}

export default function DashboardGifLoader({ size = 96, minHeight = 200 }: DashboardGifLoaderProps) {
  const intl = useIntl();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      style={{ minHeight }}
    >
      <Stack direction="column" spacing={0} sx={{ justifyContent: 'center', alignItems: 'center', minHeight }}>
        <Box component="img" src={loaderGif} alt="Loading" sx={{ width: size, height: size, objectFit: 'contain' }} />
        <Typography variant="body1" color="text.secondary">
          {intl.formatMessage({ id: 'loading' })}
        </Typography>
      </Stack>
    </motion.div>
  );
}
