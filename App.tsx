import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import AuthNavigator from './src/navigation/AuthNavigator';
import AppNavigator from './src/navigation/AppNavigator';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

const RootNavigator = () => {
  const { user, isLoading } = useAuth();
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={theme.statusBar}
        backgroundColor={theme.background}
      />
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <ThemeProvider>
            <RootNavigator />
          </ThemeProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;