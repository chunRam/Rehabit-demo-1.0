import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen.js';
import { EmotionInsightsScreen } from '../screens/EmotionInsightsScreen.js';

const Tab = createBottomTabNavigator();

export function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} />
      <Tab.Screen name="Insights" component={EmotionInsightsScreen} options={{ title: '감정 리포트' }} />
    </Tab.Navigator>
  );
}
