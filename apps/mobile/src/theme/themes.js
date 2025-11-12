import { colorPalette, spacing, radii, typography, elevation } from './designTokens.js';

export const lightTheme = {
  name: 'light',
  colors: {
    background: colorPalette.neutral200,
    surface: colorPalette.neutral100,
    surfaceMuted: colorPalette.neutral200,
    primary: colorPalette.primary,
    primaryMuted: colorPalette.primaryDark,
    secondary: colorPalette.secondary,
    text: colorPalette.neutral800,
    textMuted: colorPalette.neutral500,
    border: colorPalette.neutral300,
    success: colorPalette.success,
    warning: colorPalette.warning,
    danger: colorPalette.danger
  },
  spacing,
  radii,
  typography,
  elevation
};

export const darkTheme = {
  name: 'dark',
  colors: {
    background: colorPalette.neutral900,
    surface: colorPalette.neutral800,
    surfaceMuted: colorPalette.neutral700,
    primary: colorPalette.primary,
    primaryMuted: colorPalette.primaryDark,
    secondary: colorPalette.secondary,
    text: colorPalette.neutral100,
    textMuted: colorPalette.neutral400,
    border: colorPalette.neutral700,
    success: colorPalette.success,
    warning: colorPalette.warning,
    danger: colorPalette.danger
  },
  spacing,
  radii,
  typography,
  elevation
};
