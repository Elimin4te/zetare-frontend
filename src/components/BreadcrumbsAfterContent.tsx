import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Stack from '@mui/material/Stack';
import type { SxProps, Theme } from '@mui/material/styles';

// Staggered breadcrumbs: keep them above content in layout; drive `reveal` from main block onAnimationComplete.

const FALLBACK_DELAY_SEC = 0.4;
const FALLBACK_DURATION_SEC = 0.38;
const REVEAL_DURATION_SEC = 0.36;

interface BreadcrumbsAfterContentProps {
  animationKey?: string | number;
  children: ReactNode;
  stackSx?: SxProps<Theme>;
  /**
   * Set true when the main content entrance animation has finished.
   * Omit to use a fixed delay after mount instead.
   */
  reveal?: boolean;
}

export default function BreadcrumbsAfterContent({ animationKey = 'bc', children, stackSx, reveal }: BreadcrumbsAfterContentProps) {
  const useTimedDelay = reveal === undefined;

  return (
    <motion.div
      key={animationKey}
      initial={{ opacity: 0, y: 12 }}
      animate={useTimedDelay ? { opacity: 1, y: 0 } : { opacity: reveal ? 1 : 0, y: reveal ? 0 : 12 }}
      transition={
        useTimedDelay
          ? { duration: FALLBACK_DURATION_SEC, delay: FALLBACK_DELAY_SEC, ease: 'easeOut' }
          : { duration: REVEAL_DURATION_SEC, ease: 'easeOut' }
      }
      style={{ width: '100%' }}
    >
      <Stack direction="row" spacing={2} sx={{ width: '100%', ...stackSx }}>
        {children}
      </Stack>
    </motion.div>
  );
}
