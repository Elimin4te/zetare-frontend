import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - USE MEDIA QUERY ||============================== //

export default function UseMediaQuery(_: Theme) {
  return {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true
      }
    }
  };
}

