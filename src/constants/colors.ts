import { StatusBarStyle } from 'react-native';

// Definisi tipe untuk ColorPalette dengan properti tambahan untuk gradient dan accent
export type ColorPalette = {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  accentLight: string;
  white: string;
  black: string;
  darkGrey: string;
  lightGrey: string;
  socialBlue: string;
  lightPurple: string;
  background: string;
  text: string;
  textSecondary: string;
  cardBackground: string;
  card: string;
  cardBorder: string;
  tabActive: string;
  tabInactive: string;
  statusBar: StatusBarStyle;
  // Gradient colors untuk UI premium
  gradientStart: string;
  gradientEnd: string;
  gradientAccent: string;
  // Overlay dan shadow
  overlay: string;
  shadowColor: string;
  // Success, warning, error
  success: string;
  warning: string;
  error: string;
};

// Tema untuk Mode Terang (Light Mode) - Premium & Modern
export const lightColors: ColorPalette = {
  primary: '#7C83ED',
  primaryLight: '#A5ABFF',
  primaryDark: '#5A60C4',
  accent: '#FF8B8B',
  accentLight: '#FFB5B5',
  white: '#FFFFFF',
  black: '#000000',
  darkGrey: '#2D3142',
  lightGrey: '#9097A7',
  socialBlue: '#5B7FFF',
  lightPurple: '#F8F9FF',
  background: '#FAFBFF',
  text: '#2D3142',
  textSecondary: '#7B8399',
  cardBackground: '#FFFFFF',
  card: '#FFFFFF',
  cardBorder: 'rgba(124, 131, 237, 0.1)',
  tabActive: '#7C83ED',
  tabInactive: '#B8BDD1',
  statusBar: 'dark-content',
  // Gradient premium
  gradientStart: '#7C83ED',
  gradientEnd: '#A5ABFF',
  gradientAccent: '#FF8B8B',
  // Overlay
  overlay: 'rgba(45, 49, 66, 0.5)',
  shadowColor: 'rgba(124, 131, 237, 0.25)',
  // Status
  success: '#4CAF93',
  warning: '#FFB347',
  error: '#FF7070',
};

// Tema untuk Mode Gelap (Dark Mode) - Premium Night
export const darkColors: ColorPalette = {
  primary: '#8B93FF',
  primaryLight: '#B5BCFF',
  primaryDark: '#6B72D6',
  accent: '#FF9B9B',
  accentLight: '#FFC5C5',
  white: '#FFFFFF',
  black: '#000000',
  darkGrey: '#3F414E',
  lightGrey: '#8E92A3',
  socialBlue: '#7B9FFF',
  lightPurple: '#252A4A',
  background: '#0D1B3D',
  text: '#F0F2FA',
  textSecondary: '#A8B0C5',
  cardBackground: '#162347',
  card: '#1A2850',
  cardBorder: 'rgba(139, 147, 255, 0.15)',
  tabActive: '#8B93FF',
  tabInactive: 'rgba(248, 249, 255, 0.4)',
  statusBar: 'light-content',
  // Gradient premium night
  gradientStart: '#1A2850',
  gradientEnd: '#0D1B3D',
  gradientAccent: '#8B93FF',
  // Overlay
  overlay: 'rgba(13, 27, 61, 0.8)',
  shadowColor: 'rgba(0, 0, 0, 0.4)',
  // Status
  success: '#5CDB95',
  warning: '#FFD166',
  error: '#FF6B6B',
};