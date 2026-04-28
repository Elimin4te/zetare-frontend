import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useIntl } from 'react-intl';

import loaderGif from 'assets/images/loader.gif';

type Props = {
  /** Gif size in px. */
  size?: number;
  /** Minimum height of the loader container. */
  minHeight?: number;
  /** Override the localized loading label. */
  message?: ReactNode;
  /** Fullscreen overlay with themed background. */
  fullScreen?: boolean;
};

export default function BrandedLoader({ size = 96, minHeight = 200, message, fullScreen = true }: Props) {
  const intl = useIntl();
  const label = message ?? intl.formatMessage({ id: 'loading' });

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
      style={{ minHeight }}
    >
      <Stack direction="column" spacing={0.5} sx={{ justifyContent: 'center', alignItems: 'center', minHeight }}>
        <Box component="img" src={loaderGif} alt="Loading" sx={{ width: size, height: size, objectFit: 'contain' }} />
        <Typography variant="body1" color="text.secondary">
          {label}
        </Typography>
      </Stack>
    </motion.div>
  );

  if (!fullScreen) {
    return content;
  }

  return (
    <Box sx={{ position: 'fixed', inset: 0, zIndex: 2001, display: 'grid', placeItems: 'center', bgcolor: 'background.default', p: 2 }}>
      {content}
    </Box>
  );
}
