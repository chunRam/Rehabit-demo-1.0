import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider.js';

export function Surface({ elevation = 'level1', radius = 'md', padding = 'md', style, children, ...rest }) {
  const { theme } = useTheme();
  const shadow = theme.elevation[elevation] || theme.elevation.level0;

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.radii[radius] ?? radius,
        padding: theme.spacing[padding] ?? padding,
        ...shadow,
        ...style
      }}
      {...rest}
    >
      {children}
    </View>
  );
}
