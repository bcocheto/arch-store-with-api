import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { Box } from '@mui/system';
import { LightTheme } from '~/themes/Light';
import { DarkTheme } from '~/themes/Dark';

interface ThemeContextProps {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

type ThemeProviderProps = {
  children: ReactNode;
};
const ThemeContext = createContext({} as ThemeContextProps);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('dark');

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) => (oldThemeName === 'light' ? 'dark' : 'light'));
  }, []);

  const theme = useMemo(() => {
    if (themeName === 'light') return LightTheme;

    return DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box bgcolor={theme.palette.background.default}>{children}</Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
