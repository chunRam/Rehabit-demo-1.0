import React, { useState, useEffect } from 'react';
import { TextInput, View } from 'react-native';
import { Box } from '../ui/Box.js';
import { Text } from '../ui/Text.js';
import { Button } from '../ui/Button.js';
import { useTheme } from '../../theme/ThemeProvider.js';

const defaultHabit = {
  name: '',
  description: '',
  cadence: 'daily'
};

export function HabitForm({ habit, onSubmit, submitLabel = 'Save habit', loading }) {
  const [formState, setFormState] = useState(defaultHabit);
  const { theme } = useTheme();

  useEffect(() => {
    if (habit) {
      setFormState({
        name: habit.name,
        description: habit.description,
        cadence: habit.cadence
      });
    } else {
      setFormState(defaultHabit);
    }
  }, [habit]);

  const updateField = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit?.({ ...habit, ...formState });
  };

  return (
    <Box gap="lg">
      <View>
        <Text variant="bodyMedium">Habit name</Text>
        <TextInput
          value={formState.name}
          onChangeText={(value) => updateField('name', value)}
          placeholder="예: 아침 10분 명상"
          style={{
            borderColor: theme.colors.border,
            borderWidth: 1,
            borderRadius: theme.radii.md,
            padding: theme.spacing.md,
            marginTop: theme.spacing.sm
          }}
        />
      </View>
      <View>
        <Text variant="bodyMedium">Description</Text>
        <TextInput
          value={formState.description}
          onChangeText={(value) => updateField('description', value)}
          placeholder="루틴에 대한 간단한 설명"
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
        <Text variant="bodyMedium">Cadence</Text>
        <TextInput
          value={formState.cadence}
          onChangeText={(value) => updateField('cadence', value)}
          placeholder="daily / weekly"
          style={{
            borderColor: theme.colors.border,
            borderWidth: 1,
            borderRadius: theme.radii.md,
            padding: theme.spacing.md,
            marginTop: theme.spacing.sm
          }}
        />
      </View>
      <Button onPress={handleSubmit} loading={loading}>
        {submitLabel}
      </Button>
    </Box>
  );
}
