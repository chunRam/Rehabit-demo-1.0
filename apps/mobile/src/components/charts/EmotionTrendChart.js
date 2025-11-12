import React from 'react';
import { View } from 'react-native';
import { Text } from '../ui/Text.js';
import { useTheme } from '../../theme/ThemeProvider.js';

export function EmotionTrendChart({ data }) {
  const { theme } = useTheme();
  const maxValue = Math.max(...data.map((item) => item.successRate || 0), 1);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: theme.spacing.md, height: 160 }}>
      {data.map((item) => {
        const height = Math.max(16, (item.successRate / maxValue) * 140);
        const barColor = theme.colors[item.emotionTone] || theme.colors.primary;
        return (
          <View key={item.label} style={{ alignItems: 'center', flex: 1 }}>
            <View
              style={{
                height,
                width: 32,
                borderRadius: theme.radii.md,
                backgroundColor: barColor
              }}
            />
            <Text variant="caption" style={{ marginTop: theme.spacing.xs }}>
              {item.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
