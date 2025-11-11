import React from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider.js';
import { Text } from './Text.js';
import { ProgressBar } from './ProgressBar.js';

export function ListItem({ title, subtitle, progress, onPress, right, left }) {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? theme.colors.surfaceMuted : theme.colors.surface,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.radii.md,
        marginBottom: theme.spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
        ...theme.elevation.level1
      })}
    >
      {left && <View>{left}</View>}
      <View style={{ flex: 1 }}>
        <Text variant="bodyMedium">{title}</Text>
        {subtitle && (
          <Text variant="bodySmall" color="textMuted" style={{ marginTop: theme.spacing.xs }}>
            {subtitle}
          </Text>
        )}
        {typeof progress === 'number' && (
          <View style={{ marginTop: theme.spacing.sm }}>
            <ProgressBar value={progress} />
          </View>
        )}
      </View>
      {right && <View>{right}</View>}
    </Pressable>
  );
}
