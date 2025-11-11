import React from 'react';
import { View, Image } from 'react-native';
import { Screen } from '../components/ui/Screen.js';
import { Text } from '../components/ui/Text.js';
import { Button } from '../components/ui/Button.js';
import { useTheme } from '../theme/ThemeProvider.js';

export const onboardingSteps = [
  {
    id: 'step-1',
    title: 'Build habits with emotion awareness',
    description: 'Rehabit tracks your routines and the emotions tied to them so you can adapt with intention.'
  },
  {
    id: 'step-2',
    title: 'Capture mood in seconds',
    description: 'Log how each habit made you feel to discover triggers and motivation patterns.'
  },
  {
    id: 'step-3',
    title: 'Celebrate momentum',
    description: 'Visualize your streaks and emotion-success link in one place.'
  }
];

export function OnboardingScreen({ navigation, route }) {
  const { theme } = useTheme();
  const currentIndex = onboardingSteps.findIndex((step) => step.id === route.name);
  const currentStep = onboardingSteps[currentIndex] ?? onboardingSteps[0];
  const isLastStep = currentIndex === onboardingSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      navigation.navigate('OnboardingFinish');
    } else {
      navigation.navigate(onboardingSteps[currentIndex + 1].id);
    }
  };

  return (
    <Screen>
      <View style={{ alignItems: 'center', gap: theme.spacing.xl }}>
        <Image
          accessibilityLabel="Rehabit onboarding illustration"
          source={{ uri: 'https://dummyimage.com/320x240/4a5fc1/ffffff&text=Rehabit' }}
          style={{ width: '100%', height: 200, borderRadius: theme.radii.lg }}
        />
        <Text variant="h2" style={{ textAlign: 'center' }}>
          {currentStep.title}
        </Text>
        <Text variant="body" color="textMuted" style={{ textAlign: 'center' }}>
          {currentStep.description}
        </Text>
        <Button onPress={handleNext}>{isLastStep ? 'Start tracking' : 'Next'}</Button>
        <Text variant="caption" color="textMuted">
          Step {currentIndex + 1} of {onboardingSteps.length}
        </Text>
      </View>
    </Screen>
  );
}

export const onboardingScreens = onboardingSteps.map((step) => ({
  name: step.id,
  component: OnboardingScreen
}));
