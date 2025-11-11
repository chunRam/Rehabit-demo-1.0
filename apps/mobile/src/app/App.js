import React from 'react';
import { AppProviders } from './providers/AppProviders.js';
import { AppNavigator } from '../navigation/AppNavigator.js';

export default function App() {
  return (
    <AppProviders>
      <AppNavigator />
    </AppProviders>
  );
}
