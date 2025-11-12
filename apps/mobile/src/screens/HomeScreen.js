import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Screen } from '../components/ui/Screen.js';
import { Text } from '../components/ui/Text.js';
import { Button } from '../components/ui/Button.js';
import { HabitCard } from '../components/habits/HabitCard.js';
import { EmptyState } from '../components/ui/EmptyState.js';
import { useHabits } from '../hooks/useHabitsContext.js';
import { useTheme } from '../theme/ThemeProvider.js';

export function HomeScreen({ navigation }) {
  const { habits, isSyncing } = useHabits();
  const { theme } = useTheme();

  const summary = useMemo(() => {
    if (habits.length === 0) {
      return { average: 0 };
    }
    const average = habits.reduce((acc, item) => acc + (item.successRate || 0), 0) / habits.length;
    return { average };
  }, [habits]);

  return (
    <Screen>
      <View style={{ gap: theme.spacing.lg }}>
        <View>
          <Text variant="h2">오늘의 루틴</Text>
          <Text variant="body" color="textMuted">
            평균 성공률 {Math.round(summary.average * 100)}%
          </Text>
        </View>
        <Button onPress={() => navigation.navigate('HabitForm', { mode: 'create' })} loading={isSyncing}>
          새 습관 만들기
        </Button>
        {habits.length === 0 ? (
          <EmptyState
            title="먼저 습관을 등록해 보세요"
            description="루틴을 추가하고 감정을 기록하면 맞춤형 리포트를 만들어 드립니다."
            actionLabel="습관 만들기"
            onAction={() => navigation.navigate('HabitForm', { mode: 'create' })}
          />
        ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onPress={(selected) => navigation.navigate('HabitDetail', { habitId: selected.id })}
              onLogEmotion={(selected) => navigation.navigate('EmotionLog', { habitId: selected.id })}
            />
          ))
        )}
      </View>
    </Screen>
  );
}
