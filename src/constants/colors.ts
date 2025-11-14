import { StatusBarStyle } from 'react-native'; // (FIX) Impor tipe ini

// (Poin 7) Definisikan TIPE-nya dulu secara eksplisit
export type ColorPalette = {
  primary: string;
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
  tabActive: string;
  tabInactive: string;
  statusBar: StatusBarStyle; // (FIX) Tipe yang benar, bukan 'string'
};

// (Poin 2) Tema untuk Mode Terang (Light Mode)
// Sekarang kita paksakan tipenya di sini
export const lightColors: ColorPalette = {
  primary: '#8E97FD',
  white: '#FFFFFF',
  black: '#000000',
  darkGrey: '#3F414E',
  lightGrey: '#A1A4B2',
  socialBlue: '#7583CA',
  lightPurple: '#F5F5F9',
  background: '#FFFFFF',
  text: '#3F414E',
  textSecondary: '#A1A4B2',
  cardBackground: '#F5F5F9',
  tabActive: '#8E97FD',
  tabInactive: '#A1A4B2',
  statusBar: 'dark-content', // <-- Ini sekarang valid
};

// (Poin 2 & 8) Tema untuk Mode Gelap (Dark Mode)
// Paksakan tipenya di sini juga
export const darkColors: ColorPalette = {
  primary: '#8E97FD',
  white: '#FFFFFF',
  black: '#000000',
  darkGrey: '#3F414E',
  lightGrey: '#A1A4B2',
  socialBlue: '#7583CA',
  lightPurple: '#F5F5F9',
  background: '#03174C', // Warna biru tua dari Figma
  text: '#E6E7F2', // Warna teks terang
  textSecondary: '#98A1BD', // Warna teks abu-abu terang
  cardBackground: '#0A2057', // Warna kartu yang sedikit lebih terang
  tabActive: '#E6E7F2',
  tabInactive: 'rgba(230, 231, 242, 0.5)', // Opacity 50%
  statusBar: 'light-content', // <-- Ini sekarang valid
};