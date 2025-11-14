import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, StatusBar, View } from 'react-native';

import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext'; // (BARU)

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme(); // (BARU) Dapatkan tema saat ini

  // (Poin 6) Tampilkan loading indicator jika sedang mengecek auth
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* (BARU) StatusBar sekarang dikontrol oleh tema */}
      <StatusBar
        barStyle={theme.statusBar}
        backgroundColor={theme.background}
      />
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        {/* (BARU) Bungkus RootNavigator dengan ThemeProvider */}
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;