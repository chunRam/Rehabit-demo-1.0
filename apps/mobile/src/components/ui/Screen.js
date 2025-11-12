import React from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../theme/ThemeProvider.js';

export function Screen({ children, scrollable = true, background = 'background', style, contentContainerStyle }) {
  const { theme, scheme } = useTheme();
  const containerStyle = { flex: 1, backgroundColor: theme.colors[background] || background, ...style };

  return (
    <SafeAreaView style={containerStyle}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
      {scrollable ? (
        <ScrollView contentContainerStyle={{ padding: theme.spacing.lg, ...contentContainerStyle }}>{children}</ScrollView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
}
