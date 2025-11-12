import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Screen } from '../components/ui/Screen.js';
import { Text } from '../components/ui/Text.js';
import { Button } from '../components/ui/Button.js';
import { Surface } from '../components/ui/Surface.js';
import { ProgressBar } from '../components/ui/ProgressBar.js';
import { useHabits } from '../hooks/useHabitsContext.js';
import { EmotionLogList } from '../components/habits/EmotionLogList.js';
import { useTheme } from '../theme/ThemeProvider.js';

export function HabitDetailScreen({ route, navigation }) {
  const { habitId } = route.params;
  const { habits, emotionLogs, actions } = useHabits();
  const { theme } = useTheme();

  const habit = useMemo(() => habits.find((item) => item.id === habitId), [habits, habitId]);
  const logs = useMemo(() => emotionLogs.filter((log) => log.habitId === habitId), [emotionLogs, habitId]);

  if (!habit) {
    return (
      <Screen>
        <Text variant="body">습관 정보를 찾을 수 없습니다.</Text>
      </Screen>
    );
  }

  const handleEdit = () => {
    navigation.navigate('HabitForm', { mode: 'edit', habitId: habit.id });
  };

  const handleDelete = () => {
    actions.deleteHabit(habit.id);
    navigation.goBack();
  };

  return (
    <Screen>
      <View style={{ gap: theme.spacing.lg }}>
        <Surface>
          <View style={{ gap: theme.spacing.md }}>
            <Text variant="h2">{habit.name}</Text>
            <Text variant="body" color="textMuted">
              {habit.description}
            </Text>
            <Text variant="bodySmall" color="textMuted">
              Cadence: {habit.cadence}
            </Text>
            <ProgressBar value={habit.successRate} />
            <Text variant="bodySmall" color="textMuted">
              Success rate {Math.round((habit.successRate || 0) * 100)}%
            </Text>
          </View>
        </Surface>
        <Button variant="ghost" onPress={handleEdit}>
          수정하기
        </Button>
        <Button variant="ghost" onPress={() => navigation.navigate('EmotionLog', { habitId: habit.id })}>
          감정 기록 추가하기
        </Button>
        <Button variant="ghost" onPress={handleDelete}>
          삭제하기
        </Button>
        <Surface>
          <Text variant="h3">감정 로그</Text>
          <EmotionLogList logs={logs} />
        </Surface>
      </View>
    </Screen>
  );
}
