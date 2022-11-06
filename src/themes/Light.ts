import { createTheme } from '@mui/material';

export const LightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7b1fa2',
      dark: '#4a0072',
      light: '#ae52d4',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#e9da51',
      dark: '#b4a919',
      light: '#ffff83',
      contrastText: '#000',
    },
    background: {
      paper: '#ffffff',
      default: '#f7f6f3',
    },
  },
});
