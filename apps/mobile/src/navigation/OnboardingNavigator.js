import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onboardingScreens, OnboardingScreen } from '../screens/OnboardingScreen.js';
import { OnboardingFinishScreen } from '../screens/OnboardingFinishScreen.js';

const Stack = createNativeStackNavigator();

export function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {onboardingScreens.map((screen) => (
        <Stack.Screen key={screen.name} name={screen.name} component={OnboardingScreen} />
      ))}
      <Stack.Screen name="OnboardingFinish" component={OnboardingFinishScreen} />
    </Stack.Navigator>
  );
}
