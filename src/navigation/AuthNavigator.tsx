import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Impor layar-layar Auth
import SplashOnboardScreen from '../screens/Auth/SplashOnboardScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';

// Impor layar Onboarding
import WelcomeScreen from '../screens/Onboarding/WelcomeScreen';
import ChooseTopicScreen from '../screens/Onboarding/ChooseTopicScreen';

import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashOnboard"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashOnboard" component={SplashOnboardScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="ChooseTopic" component={ChooseTopicScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;