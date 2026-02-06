import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

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
import TutorialScreen from '../screens/detail/TutorialScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ChatScreen from '../screens/Chat/ChatScreen';

import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');
const Tab = createMaterialTopTabNavigator<AppTabParamList>();

// Stack Navigators
const HomeStackNav = createNativeStackNavigator<HomeStackParamList>();
const SleepStackNav = createNativeStackNavigator<SleepStackParamList>();
const MeditateStackNav = createNativeStackNavigator<MeditateStackParamList>();
const MusicStackNav = createNativeStackNavigator<MusicStackParamList>();

// Stack Components
const HomeStack = () => (
  <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
    <HomeStackNav.Screen name="HomeList" component={HomeScreen} />
    <HomeStackNav.Screen name="Player" component={PlayerScreen} />
    <HomeStackNav.Screen name="Tutorial" component={TutorialScreen} />
    <HomeStackNav.Screen name="Profile" component={ProfileScreen} />
    <HomeStackNav.Screen name="Chat" component={ChatScreen} />
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

// Tab Button dengan animasi
interface TabButtonProps {
  focused: boolean;
  iconName: keyof typeof Ionicons.glyphMap;
  iconNameOutline: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  activeColor: string;
  inactiveColor: string;
}

const TabButton: React.FC<TabButtonProps> = ({
  focused,
  iconName,
  iconNameOutline,
  label,
  onPress,
  activeColor,
  inactiveColor,
}) => {
  const scale = useSharedValue(focused ? 1 : 0.85);
  const opacity = useSharedValue(focused ? 1 : 0.6);

  useEffect(() => {
    scale.value = withSpring(focused ? 1 : 0.85, { damping: 12, stiffness: 150 });
    opacity.value = withSpring(focused ? 1 : 0.6, { damping: 12, stiffness: 150 });
  }, [focused]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Pressable onPress={onPress} style={styles.tabButton}>
      <Animated.View style={[styles.tabButtonContent, animatedStyle]}>
        <Ionicons
          name={focused ? iconName : iconNameOutline}
          size={24}
          color={focused ? activeColor : inactiveColor}
        />
        <Animated.Text
          style={[
            styles.tabLabel,
            { color: focused ? activeColor : inactiveColor },
          ]}
        >
          {label}
        </Animated.Text>
      </Animated.View>
      {focused && (
        <View style={[styles.activeIndicator, { backgroundColor: activeColor }]} />
      )}
    </Pressable>
  );
};

// Custom Tab Bar Component
const CustomTabBar = ({ state, navigation }: any) => {
  const { theme, setTheme } = useTheme();

  const tabConfig = [
    { name: 'Home', icon: 'home', iconOutline: 'home-outline', themeMode: 'light' as const },
    { name: 'Sleep', icon: 'moon', iconOutline: 'moon-outline', themeMode: 'dark' as const },
    { name: 'Meditate', icon: 'sparkles', iconOutline: 'sparkles-outline', themeMode: 'light' as const },
    { name: 'Music', icon: 'musical-notes', iconOutline: 'musical-notes-outline', themeMode: 'dark' as const },
  ];

  return (
    <View style={[styles.tabBar, { backgroundColor: theme.background, borderTopColor: theme.cardBorder }]}>
      {state.routes.map((route: any, index: number) => {
        const config = tabConfig[index];
        const focused = state.index === index;

        const onPress = () => {
          setTheme(config.themeMode);
          navigation.navigate(route.name);
        };

        return (
          <TabButton
            key={route.key}
            focused={focused}
            iconName={config.icon as keyof typeof Ionicons.glyphMap}
            iconNameOutline={config.iconOutline as keyof typeof Ionicons.glyphMap}
            label={config.name}
            onPress={onPress}
            activeColor={theme.tabActive}
            inactiveColor={theme.tabInactive}
          />
        );
      })}
    </View>
  );
};

// Main Navigator
const AppNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        swipeEnabled: true,
        animationEnabled: true,
        lazy: true,
        lazyPreloadDistance: 1,
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Sleep" component={SleepStack} />
      <Tab.Screen name="Meditate" component={MeditateStack} />
      <Tab.Screen name="Music" component={MusicStack} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    height: 85,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tabButtonContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0.3,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 24,
    height: 3,
    borderRadius: 2,
  },
});

export default AppNavigator;