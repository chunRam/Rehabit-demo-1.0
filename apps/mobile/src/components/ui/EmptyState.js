import React from 'react';
import { Text } from './Text.js';
import { Box } from './Box.js';
import { Button } from './Button.js';

export function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <Box align="center" justify="center" gap="md" padding="xl">
      <Text variant="h3">{title}</Text>
      <Text variant="body" color="textMuted" style={{ textAlign: 'center' }}>
        {description}
      </Text>
      {actionLabel && <Button onPress={onAction}>{actionLabel}</Button>}
    </Box>
  );
}
