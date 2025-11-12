import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingNavigator } from './OnboardingNavigator.js';
import { MainTabs } from './MainTabs.js';
import { HabitFormScreen } from '../screens/HabitFormScreen.js';
import { HabitDetailScreen } from '../screens/HabitDetailScreen.js';
import { EmotionLogScreen } from '../screens/EmotionLogScreen.js';
import { useHabits } from '../hooks/useHabitsContext.js';

const RootStack = createNativeStackNavigator();

export function AppNavigator() {
  const { onboardingComplete } = useHabits();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!onboardingComplete && (
          <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        )}
        <RootStack.Screen name="Main" component={MainTabs} />
        <RootStack.Screen name="HabitForm" component={HabitFormScreen} />
        <RootStack.Screen name="HabitDetail" component={HabitDetailScreen} />
        <RootStack.Screen name="EmotionLog" component={EmotionLogScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
