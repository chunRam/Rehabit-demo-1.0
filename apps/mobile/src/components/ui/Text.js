import React from 'react';
import { Text as RNText } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider.js';

const variantMap = {
  h1: (theme) => ({ ...theme.typography.headings.h1 }),
  h2: (theme) => ({ ...theme.typography.headings.h2 }),
  h3: (theme) => ({ ...theme.typography.headings.h3 }),
  body: (theme) => ({ ...theme.typography.body.regular }),
  bodyMedium: (theme) => ({ ...theme.typography.body.medium }),
  bodySmall: (theme) => ({ ...theme.typography.body.small }),
  caption: (theme) => ({ ...theme.typography.caption })
};

export function Text({ variant = 'body', color = 'text', style, children, ...rest }) {
  const { theme } = useTheme();
  const baseStyle = variantMap[variant] ? variantMap[variant](theme) : {};
  const resolvedStyle = {
    color: theme.colors[color] || color,
    fontFamily: theme.typography.fontFamily,
    ...baseStyle,
    ...style
  };

  return (
    <RNText style={resolvedStyle} {...rest}>
      {children}
    </RNText>
  );
}
