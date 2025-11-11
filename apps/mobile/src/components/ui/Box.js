import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider.js';

export function Box({
  padding = 'none',
  paddingHorizontal,
  paddingVertical,
  margin = 'none',
  marginHorizontal,
  marginVertical,
  background,
  radius = 'none',
  style,
  children,
  align,
  justify,
  gap,
  direction = 'column',
  ...rest
}) {
  const { theme } = useTheme();
  const gapValue = theme.spacing[gap] ?? gap;

  const resolvedStyle = {
    flexDirection: direction,
    padding: paddingHorizontal ? undefined : theme.spacing[padding] ?? padding,
    paddingHorizontal: theme.spacing[paddingHorizontal] ?? paddingHorizontal,
    paddingVertical: theme.spacing[paddingVertical] ?? paddingVertical,
    margin: marginHorizontal ? undefined : theme.spacing[margin] ?? margin,
    marginHorizontal: theme.spacing[marginHorizontal] ?? marginHorizontal,
    marginVertical: theme.spacing[marginVertical] ?? marginVertical,
    backgroundColor: background ? theme.colors[background] || background : undefined,
    borderRadius: theme.radii[radius] ?? radius,
    alignItems: align,
    justifyContent: justify,
    rowGap: gapValue,
    columnGap: gapValue,
    ...style
  };

  return (
    <View style={resolvedStyle} {...rest}>
      {children}
    </View>
  );
}
