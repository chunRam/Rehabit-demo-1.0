import React, { useMemo } from 'react';
import { View } from 'react-native';
import dayjs from 'dayjs';
import { Screen } from '../components/ui/Screen.js';
import { Text } from '../components/ui/Text.js';
import { Surface } from '../components/ui/Surface.js';
import { EmotionTrendChart } from '../components/charts/EmotionTrendChart.js';
import { useTheme } from '../theme/ThemeProvider.js';
import { useHabits } from '../hooks/useHabitsContext.js';

export function EmotionInsightsScreen() {
  const { emotionLogs } = useHabits();
  const { theme } = useTheme();

  const grouped = useMemo(() => {
    const results = new Map();
    emotionLogs.forEach((log) => {
      const week = dayjs(log.loggedAt).format('MMM D');
      const existing = results.get(week) || { count: 0, successTotal: 0, emotionTone: log.emotionTone };
      results.set(week, {
        count: existing.count + 1,
        successTotal: existing.successTotal + (log.successRate || 0),
        emotionTone: log.emotionTone
      });
    });
    return Array.from(results.entries()).map(([label, value]) => ({
      label,
      successRate: value.count ? value.successTotal / value.count : 0,
      emotionTone: value.emotionTone
    }));
  }, [emotionLogs]);

  const mostRecentLogs = useMemo(() => emotionLogs.slice(0, 5), [emotionLogs]);

  return (
    <Screen>
      <View style={{ gap: theme.spacing.lg }}>
        <Text variant="h2">감정 & 성공률</Text>
        <Surface>
          <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>
            주별 추이
          </Text>
          {grouped.length > 0 ? (
            <EmotionTrendChart data={grouped} />
          ) : (
            <Text variant="body" color="textMuted">
              아직 충분한 데이터가 없습니다. 습관을 기록해 보세요.
            </Text>
          )}
        </Surface>
        <Surface>
          <Text variant="h3" style={{ marginBottom: theme.spacing.md }}>
            최근 감정 로그
          </Text>
          {mostRecentLogs.map((log) => (
            <View key={log.id} style={{ marginBottom: theme.spacing.sm }}>
              <Text variant="bodyMedium">{dayjs(log.loggedAt).format('MMM D, YYYY')}</Text>
              <Text variant="bodySmall" color="textMuted">
                {log.emotionLabel} — 성공률 {Math.round((log.successRate || 0) * 100)}%
              </Text>
              <Text variant="bodySmall">{log.note}</Text>
            </View>
          ))}
          {mostRecentLogs.length === 0 && (
            <Text variant="body" color="textMuted">
              감정 기록이 비어 있습니다.
            </Text>
          )}
        </Surface>
      </View>
    </Screen>
  );
}
