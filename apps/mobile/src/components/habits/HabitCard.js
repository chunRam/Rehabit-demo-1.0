import React from 'react';
import { Surface } from '../ui/Surface.js';
import { Text } from '../ui/Text.js';
import { Box } from '../ui/Box.js';
import { ProgressBar } from '../ui/ProgressBar.js';
import { Button } from '../ui/Button.js';

export function HabitCard({ habit, onPress, onLogEmotion }) {
  return (
    <Surface style={{ marginBottom: 16 }}>
      <Box gap="sm">
        <Text variant="h3">{habit.name}</Text>
        <Text variant="body" color="textMuted">
          {habit.description}
        </Text>
        <ProgressBar value={habit.successRate}
          fill={habit.successRate > 0.7 ? 'success' : habit.successRate > 0.4 ? 'warning' : 'danger'}
        />
        <Box direction="row" justify="space-between" align="center">
          <Text variant="bodySmall" color="textMuted">
            {Math.round((habit.successRate || 0) * 100)}% success
          </Text>
          <Button variant="ghost" onPress={() => onLogEmotion?.(habit)}>
            Log Emotion
          </Button>
        </Box>
        <Button onPress={() => onPress?.(habit)}>View details</Button>
      </Box>
    </Surface>
  );
}
