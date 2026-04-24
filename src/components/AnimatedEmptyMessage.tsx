import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

// ==============================|| ANIMATED EMPTY MESSAGE (shared) ||============================== //

interface AnimatedEmptyMessageProps {
  message: string;
}

export default function AnimatedEmptyMessage({ message }: AnimatedEmptyMessageProps) {
  return (
    <Box sx={{ p: 1, textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
        <motion.div animate={{ opacity: [0.55, 1, 0.55] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
          <Typography variant="body1" color="text.secondary">
            {message}
          </Typography>
        </motion.div>
      </motion.div>
    </Box>
  );
}
