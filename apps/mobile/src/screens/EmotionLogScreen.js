import React, { useState, useMemo } from 'react';
import { View, TextInput } from 'react-native';
import { Screen } from '../components/ui/Screen.js';
import { Text } from '../components/ui/Text.js';
import { Button } from '../components/ui/Button.js';
import { useTheme } from '../theme/ThemeProvider.js';
import { useHabits } from '../hooks/useHabitsContext.js';

const emotions = [
  { label: 'Energized', tone: 'success' },
  { label: 'Balanced', tone: 'primary' },
  { label: 'Drained', tone: 'danger' }
];

export function EmotionLogScreen({ route, navigation }) {
  const { habitId } = route.params;
  const { habits, actions, isSyncing } = useHabits();
  const { theme } = useTheme();

  const habit = useMemo(() => habits.find((item) => item.id === habitId), [habits, habitId]);
  const [selectedEmotion, setSelectedEmotion] = useState(emotions[0]);
  const [note, setNote] = useState('');
  const [successRate, setSuccessRate] = useState(habit?.successRate || 0.5);

  const handleSubmit = async () => {
    await actions.logEmotion({
      habitId,
      emotionLabel: selectedEmotion.label,
      emotionTone: selectedEmotion.tone,
      note,
      successRate
    });
    navigation.goBack();
  };

  return (
    <Screen>
      <View style={{ gap: theme.spacing.lg }}>
        <Text variant="h2">감정 기록</Text>
        <Text variant="body" color="textMuted">
          {habit?.name}
        </Text>
        <View style={{ gap: theme.spacing.sm }}>
          <Text variant="bodyMedium">감정 선택</Text>
          <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
            {emotions.map((emotion) => {
              const isSelected = emotion.label === selectedEmotion.label;
              return (
                <Button
                  key={emotion.label}
                  variant={isSelected ? 'primary' : 'ghost'}
                  onPress={() => setSelectedEmotion(emotion)}
                >
                  {emotion.label}
                </Button>
              );
            })}
          </View>
        </View>
        <View>
          <Text variant="bodyMedium">메모</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="오늘 루틴이 어떤 감정을 불러왔나요?"
            multiline
            numberOfLines={4}
            style={{
              borderColor: theme.colors.border,
              borderWidth: 1,
              borderRadius: theme.radii.md,
              padding: theme.spacing.md,
              marginTop: theme.spacing.sm,
              minHeight: 120,
              textAlignVertical: 'top'
            }}
          />
        </View>
        <View>
          <Text variant="bodyMedium">성공률 (0~1)</Text>
          <TextInput
            keyboardType="decimal-pad"
            value={String(successRate)}
            onChangeText={(value) => {
              const numeric = Number(value);
              if (!Number.isNaN(numeric)) {
                setSuccessRate(Math.max(0, Math.min(1, numeric)));
              }
            }}
            style={{
              borderColor: theme.colors.border,
              borderWidth: 1,
              borderRadius: theme.radii.md,
              padding: theme.spacing.md,
              marginTop: theme.spacing.sm
            }}
          />
        </View>
        <Button onPress={handleSubmit} loading={isSyncing}>
          기록 저장하기
        </Button>
      </View>
    </Screen>
  );
}
