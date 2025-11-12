export const colorPalette = {
  primary: '#4A5FC1',
  primaryDark: '#243188',
  secondary: '#F38F6E',
  success: '#3CBDA9',
  warning: '#FFB347',
  danger: '#E25B45',
  neutral100: '#FFFFFF',
  neutral200: '#F5F6FA',
  neutral300: '#E4E7EE',
  neutral400: '#BEC3D0',
  neutral500: '#8E94A3',
  neutral600: '#555B6C',
  neutral700: '#2F3446',
  neutral800: '#1E2231',
  neutral900: '#141824'
};

export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48
};

export const radii = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  pill: 999
};

export const typography = {
  fontFamily: 'System',
  headings: {
    h1: { fontSize: 32, fontWeight: '700', lineHeight: 38 },
    h2: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
    h3: { fontSize: 22, fontWeight: '600', lineHeight: 28 }
  },
  body: {
    regular: { fontSize: 16, fontWeight: '400', lineHeight: 22 },
    medium: { fontSize: 16, fontWeight: '500', lineHeight: 22 },
    small: { fontSize: 14, fontWeight: '400', lineHeight: 18 }
  },
  caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 }
};

export const elevation = {
  level0: { shadowColor: 'transparent', shadowOpacity: 0, shadowRadius: 0, elevation: 0 },
  level1: { shadowColor: '#0F172A', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 8, elevation: 3 },
  level2: { shadowColor: '#0F172A', shadowOpacity: 0.15, shadowOffset: { width: 0, height: 6 }, shadowRadius: 18, elevation: 6 }
};
