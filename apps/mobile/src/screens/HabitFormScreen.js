import React, { useMemo } from 'react';
import { Screen } from '../components/ui/Screen.js';
import { HabitForm } from '../components/habits/HabitForm.js';
import { useHabits } from '../hooks/useHabitsContext.js';

export function HabitFormScreen({ route, navigation }) {
  const { mode, habitId } = route.params ?? { mode: 'create' };
  const { habits, actions, isSyncing } = useHabits();

  const habit = useMemo(() => habits.find((item) => item.id === habitId), [habits, habitId]);

  const handleSubmit = async (data) => {
    if (mode === 'edit') {
      await actions.updateHabit(data);
    } else {
      await actions.createHabit(data);
    }
    navigation.goBack();
  };

  return (
    <Screen>
      <HabitForm habit={habit} onSubmit={handleSubmit} loading={isSyncing} submitLabel={mode === 'edit' ? 'Update habit' : 'Create habit'} />
    </Screen>
  );
}
