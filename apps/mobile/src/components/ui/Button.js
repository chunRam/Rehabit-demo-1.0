import React from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import { Box } from './Box.js';
import { Text } from './Text.js';
import { useTheme } from '../../theme/ThemeProvider.js';

export function Button({
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
  onPress,
  icon,
  style
}) {
  const { theme } = useTheme();
  const palette = {
    primary: {
      backgroundColor: theme.colors.primary,
      textColor: theme.colors.neutral100
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
      textColor: theme.colors.neutral900
    },
    ghost: {
      backgroundColor: 'transparent',
      textColor: theme.colors.primary,
      borderWidth: 1,
      borderColor: theme.colors.primary
    }
  };

  const current = palette[variant] || palette.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [{
        opacity: pressed || disabled ? 0.7 : 1,
        borderRadius: theme.radii.md,
        backgroundColor: current.backgroundColor,
        borderWidth: current.borderWidth,
        borderColor: current.borderColor,
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.lg
      }, style]}
    >
      <Box direction="row" align="center" justify="center" gap="sm">
        {loading && <ActivityIndicator size="small" color={current.textColor} />}
        {icon}
        <Text variant="bodyMedium" style={{ color: current.textColor }}>
          {children}
        </Text>
      </Box>
    </Pressable>
  );
}
