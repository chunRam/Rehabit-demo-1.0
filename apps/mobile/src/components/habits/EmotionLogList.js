import React from 'react';
import { View } from 'react-native';
import dayjs from 'dayjs';
import { Text } from '../ui/Text.js';
import { useTheme } from '../../theme/ThemeProvider.js';
import { Tag } from '../ui/Tag.js';

export function EmotionLogList({ logs }) {
  const { theme } = useTheme();
  const sorted = [...logs].sort((a, b) => new Date(b.loggedAt) - new Date(a.loggedAt));

  return (
    <View style={{ marginTop: theme.spacing.md }}>
      {sorted.map((log) => (
        <View
          key={log.id}
          style={{
            paddingVertical: theme.spacing.md,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border
          }}
        >
          <Text variant="bodyMedium">{dayjs(log.loggedAt).format('MMM D, YYYY')}</Text>
          <Text variant="bodySmall" color="textMuted" style={{ marginTop: theme.spacing.xs }}>
            {log.note || 'No note recorded'}
          </Text>
          <View style={{ marginTop: theme.spacing.sm }}>
            <Tag label={log.emotionLabel} tone={log.emotionTone} />
          </View>
        </View>
      ))}
      {sorted.length === 0 && (
        <Text variant="body" color="textMuted">
          감정 로그가 아직 없습니다.
        </Text>
      )}
    </View>
  );
}
