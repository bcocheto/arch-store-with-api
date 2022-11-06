import { createTheme } from '@mui/material';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
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
      paper: '#303134',
      default: '#202124',
    },
  },
  typography: {
    allVariants: {
      color: 'white',
    },
  },
});
