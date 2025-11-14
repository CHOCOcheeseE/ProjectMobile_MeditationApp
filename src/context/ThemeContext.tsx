import React, { createContext, useState, useContext, ReactNode } from 'react';
import { darkColors, lightColors, ColorPalette } from '../constants/colors';

// Tipe untuk nilai yang ada di dalam Context
type ThemeContextType = {
  theme: ColorPalette;
  isDarkMode: boolean;
  setTheme: (theme: 'light' | 'dark') => void;
};

// 1. Membuat Context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Props untuk Provider
type ThemeProviderProps = {
  children: ReactNode;
};

// 2. Membuat Provider
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  const theme = themeMode === 'light' ? lightColors : darkColors;

  const setTheme = (mode: 'light' | 'dark') => {
    setThemeMode(mode);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, isDarkMode: themeMode === 'dark', setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3. (Poin 7) Custom hook agar lebih mudah digunakan di komponen lain
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};