import React from 'react';
import { Screen } from '../components/ui/Screen.js';
import { Text } from '../components/ui/Text.js';
import { Button } from '../components/ui/Button.js';
import { Box } from '../components/ui/Box.js';
import { useHabits } from '../hooks/useHabitsContext.js';

export function OnboardingFinishScreen({ navigation }) {
  const { actions } = useHabits();

  const handleStart = () => {
    actions.completeOnboarding();
    navigation.replace('Main');
  };

  return (
    <Screen>
      <Box gap="lg" align="center">
        <Text variant="h2" style={{ textAlign: 'center' }}>
          Ready to Rehabit!
        </Text>
        <Text variant="body" color="textMuted" style={{ textAlign: 'center' }}>
          We have prepared a gentle routine to kickstart your habit-building journey.
        </Text>
        <Button onPress={handleStart}>Go to dashboard</Button>
      </Box>
    </Screen>
  );
}
