import type { ReactNode } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { motion } from 'framer-motion';

import IconByName from 'components/IconByName';

type Props = {
  icon?: string;
  title: ReactNode;
  body?: ReactNode;
  actionLabel?: ReactNode;
  onAction?: () => void;
};

export default function FlowsStateMessage({ icon = 'InfoCircle', title, body, actionLabel, onAction }: Props) {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 6, md: 9 }, display: 'grid', placeItems: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{ width: '100%' }}
      >
        <Stack spacing={1.25} alignItems="center" sx={{ textAlign: 'center', maxWidth: 520, mx: 'auto', px: 2 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'secondary.100',
              color: theme.palette.text.secondary
            }}
          >
            <IconByName name={icon} size={30} variant="Bulk" />
          </Box>
          <Typography variant="h5">{title}</Typography>
          {body ? (
            <Typography variant="body2" color="text.secondary">
              {body}
            </Typography>
          ) : null}
          {actionLabel && onAction ? (
            <Button onClick={onAction} variant="outlined" color="primary" sx={{ mt: 0.5, textTransform: 'none' }}>
              {actionLabel}
            </Button>
          ) : null}
        </Stack>
      </motion.div>
    </Box>
  );
}

