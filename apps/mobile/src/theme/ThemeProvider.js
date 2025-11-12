import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { Appearance } from 'react-native';
import Constants from 'expo-constants';
import { lightTheme, darkTheme } from './themes.js';

const ThemeContext = createContext({
  theme: lightTheme,
  setScheme: () => {},
  scheme: 'light'
});

export function ThemeProvider({ children }) {
  const [scheme, setScheme] = useState(() => {
    const expoScheme = Constants?.expoConfig?.extra?.preferredColorScheme;
    if (expoScheme === 'dark' || expoScheme === 'light') {
      return expoScheme;
    }
    return Appearance.getColorScheme?.() || 'light';
  });

  useEffect(() => {
    if (!Appearance?.addChangeListener) {
      return undefined;
    }
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setScheme(colorScheme || 'light');
    });
    return () => subscription?.remove?.();
  }, []);

  const value = useMemo(() => {
    const theme = scheme === 'dark' ? darkTheme : lightTheme;
    return { theme, scheme, setScheme };
  }, [scheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
