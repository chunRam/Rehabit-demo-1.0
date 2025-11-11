import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider.js';

export function ProgressBar({ value, background = 'surfaceMuted', fill = 'primary' }) {
  const { theme } = useTheme();
  const clamped = Math.max(0, Math.min(1, value ?? 0));

  return (
    <View
      style={{
        height: 10,
        borderRadius: theme.radii.pill,
        backgroundColor: theme.colors[background] || background,
        overflow: 'hidden'
      }}
    >
      <View
        style={{
          width: `${clamped * 100}%`,
          backgroundColor: theme.colors[fill] || fill,
          height: '100%'
        }}
      />
    </View>
  );
}
