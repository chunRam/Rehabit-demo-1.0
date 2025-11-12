import React from 'react';
import { ThemeProvider } from '../../theme/ThemeProvider.js';
import { HabitsProvider } from './HabitsProvider.js';

export function AppProviders({ children }) {
  return (
    <ThemeProvider>
      <HabitsProvider>{children}</HabitsProvider>
    </ThemeProvider>
  );
}
