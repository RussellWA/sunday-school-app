// theme.ts
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1A2463',      // Navy Blue
    secondary: '#00A89D',    // Teal Green
    tertiary: '#F7931E',     // Bright Orange
    error: '#E94B35',        // Coral Red
    surface: '#FFFFFF',      // White
    background: '#FFFFFF',   // App background
    onPrimary: '#FFFFFF',    // Text on primary
    onSecondary: '#FFFFFF',  // Text on secondary
    text: '#333333',         // General text
    textWhite: '#FFFFFF',
    outline: '#D2E100',      // Lime
  },
};
