import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// (FIX) Ganti react-native-vector-icons dengan @expo/vector-icons untuk Expo
import { Ionicons } from '@expo/vector-icons';

// Impor Tipe
import {
  AppTabParamList,
  HomeStackParamList,
  SleepStackParamList,
  MeditateStackParamList,
  MusicStackParamList,
} from './types';

// Impor Layar
import HomeScreen from '../screens/Home/HomeScreen';
import SleepScreen from '../screens/Sleep/SleepScreen';
import MeditateScreen from '../screens/Meditate/MeditateScreen';
import MusicScreen from '../screens/Music/MusicScreen';
import PlayerScreen from '../screens/detail/PlayerScreen';
import TutorialScreen from '../screens/detail/TutorialScreen'; // (BARU)

import { useTheme } from '../context/ThemeContext';

const Tab = createBottomTabNavigator<AppTabParamList>();

// Definisikan Stack Navigator di LUAR komponen AppNavigator
const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();
const SleepStackNav = createNativeStackNavigator<SleepStackParamList>();
const MeditateStackNav = createNativeStackNavigator<MeditateStackParamList>();
const MusicStackNav = createNativeStackNavigator<MusicStackParamList>();

// --- Stack Component Definitions ---

const HomeStack = () => (
  <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
    <HomeStackNav.Screen name="HomeList" component={HomeScreen} />
    <HomeStackNav.Screen name="Player" component={PlayerScreen} />
    <HomeStackNav.Screen name="Tutorial" component={TutorialScreen} />
  </HomeStackNav.Navigator>
);

const SleepStack = () => (
  <SleepStackNav.Navigator screenOptions={{ headerShown: false }}>
    <SleepStackNav.Screen name="SleepList" component={SleepScreen} />
    <SleepStackNav.Screen name="Player" component={PlayerScreen} />
    <SleepStackNav.Screen name="Tutorial" component={TutorialScreen} />
  </SleepStackNav.Navigator>
);

const MeditateStack = () => (
  <MeditateStackNav.Navigator screenOptions={{ headerShown: false }}>
    <MeditateStackNav.Screen name="MeditateList" component={MeditateScreen} />
    <MeditateStackNav.Screen name="Player" component={PlayerScreen} />
    <MeditateStackNav.Screen name="Tutorial" component={TutorialScreen} />
  </MeditateStackNav.Navigator>
);

const MusicStack = () => (
  <MusicStackNav.Navigator screenOptions={{ headerShown: false }}>
    <MusicStackNav.Screen name="MusicList" component={MusicScreen} />
    <MusicStackNav.Screen name="Player" component={PlayerScreen} />
    <MusicStackNav.Screen name="Tutorial" component={TutorialScreen} />
  </MusicStackNav.Navigator>
);

// --- Main Tab Navigator ---

const AppNavigator = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.background,
          height: 90,
        },
        tabBarActiveTintColor: theme.tabActive,
        tabBarInactiveTintColor: theme.tabInactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Sleep') {
            iconName = focused ? 'moon' : 'moon-outline';
          } else if (route.name === 'Meditate') {
            iconName = focused ? 'sparkles' : 'sparkles-outline';
          } else if (route.name === 'Music') {
            iconName = focused ? 'musical-notes' : 'musical-notes-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        listeners={{
          tabPress: () => setTheme('light'),
        }}
      />
      <Tab.Screen
        name="Sleep"
        component={SleepStack}
        listeners={{
          tabPress: () => setTheme('dark'),
        }}
      />
      <Tab.Screen
        name="Meditate"
        component={MeditateStack}
        listeners={{
          tabPress: () => setTheme('light'),
        }}
      />
      <Tab.Screen
        name="Music"
        component={MusicStack}
        listeners={{
          tabPress: () => setTheme('dark'),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;