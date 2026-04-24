import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

/**
 * Returns minimalist scrollbar styles that can be spread into any scrollable component's sx prop
 * @param theme - MUI theme object
 * @returns SxProps object with scrollbar styling
 */
export function getScrollbarStyles(theme: Theme): SxProps {
  return {
    // Minimalist scrollbar styling
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.divider,
      borderRadius: '4px',
      border: '2px solid transparent',
      backgroundClip: 'padding-box',
      '&:hover': {
        backgroundColor: theme.palette.text.disabled
      }
    },
    // Firefox scrollbar
    scrollbarWidth: 'thin',
    scrollbarColor: `${theme.palette.divider} transparent`
  };
}
