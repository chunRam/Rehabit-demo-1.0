import React from 'react';
import { Box } from './Box.js';
import { Text } from './Text.js';
import { useTheme } from '../../theme/ThemeProvider.js';

export function Tag({ label, tone = 'primary' }) {
  const { theme } = useTheme();
  const textColor = tone === 'secondary' ? theme.colors.neutral900 : theme.colors.neutral100;

  return (
    <Box paddingHorizontal="sm" paddingVertical="xs" background={tone} radius="pill" style={{ alignSelf: 'flex-start' }}>
      <Text variant="caption" style={{ color: textColor }}>
        {label}
      </Text>
    </Box>
  );
}
