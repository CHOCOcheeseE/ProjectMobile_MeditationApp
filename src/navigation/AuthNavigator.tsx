import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Impor layar-layar kita
import SplashOnboardScreen from '../screens/Auth/SplashOnboardScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
// (FIX) Impor layar Onboarding yang hilang
import WelcomeScreen from '../screens/Onboarding/WelcomeScreen';
import ChooseTopicScreen from '../screens/Onboarding/ChooseTopicScreen';

// (FIX) Impor tipe AuthStackParamList dari file types.ts yang benar
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashOnboard"
      screenOptions={{
        headerShown: false, // Menyembunyikan header di semua layar
      }}>
      <Stack.Screen name="SplashOnboard" component={SplashOnboardScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      {/* (FIX) Menambahkan layar Onboarding ke Auth Stack */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ChooseTopic" component={ChooseTopicScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;