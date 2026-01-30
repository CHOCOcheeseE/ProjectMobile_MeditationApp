import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';

// 1. Parameter untuk layar detail
export type PlayerScreenParams = {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  trackUrl?: string; // Opsional, untuk musik
};

// (BARU) Tipe untuk layar Tutorial
export type TutorialScreenParams = {
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  description: string;
};

// 2. Tipe untuk Auth Stack
export type AuthStackParamList = {
  SplashOnboard: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Welcome: undefined;
  ChooseTopic: undefined;
};

// 3. Tipe untuk Stack di dalam Tab
// (FIX) Nama layar di sini ('HomeList', 'SleepList', dll.)
// harus cocok dengan nama yang Anda gunakan di <Screen name="..."> di AppNavigator.tsx
export type HomeStackParamList = {
  HomeList: undefined;
  Player: PlayerScreenParams;
  Tutorial: TutorialScreenParams; // (BARU)
};

export type SleepStackParamList = {
  SleepList: undefined;
  Player: PlayerScreenParams;
  Tutorial: TutorialScreenParams; // (BARU)
};

export type MeditateStackParamList = {
  MeditateList: undefined;
  Player: PlayerScreenParams;
  Tutorial: TutorialScreenParams; // (BARU)
};

export type MusicStackParamList = {
  MusicList: undefined;
  Player: PlayerScreenParams;
  Tutorial: TutorialScreenParams; // (BARU)
};

// 4. Tipe untuk Tab Navigator Utama
export type AppTabParamList = {
  Home: undefined; // Nama Tab
  Sleep: undefined; // Nama Tab
  Meditate: undefined; // Nama Tab
  Music: undefined; // Nama Tab
};

// --- (FIX) EKSPOR TIPE PROPS UNTUK LAYAR ---
// Ini akan memperbaiki error "has no exported member"

// Tipe Props untuk Layar di AuthStack
export type AuthStackProps = NativeStackScreenProps<AuthStackParamList>;
export type SplashOnboardProps = NativeStackScreenProps<
  AuthStackParamList,
  'SplashOnboard'
>;
export type SignInProps = NativeStackScreenProps<AuthStackParamList, 'SignIn'>;
export type SignUpProps = NativeStackScreenProps<AuthStackParamList, 'SignUp'>;
export type ForgotPasswordProps = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;
export type WelcomeProps = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;
export type ChooseTopicProps = NativeStackScreenProps<
  AuthStackParamList,
  'ChooseTopic'
>;

// Tipe Props untuk Layar di dalam Stack Tab
// (FIX) Ini adalah tipe generik yang dicari oleh layar Anda
export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  NativeStackScreenProps<HomeStackParamList, T>;

export type SleepStackScreenProps<T extends keyof SleepStackParamList> =
  NativeStackScreenProps<SleepStackParamList, T>;

export type MeditateStackScreenProps<T extends keyof MeditateStackParamList> =
  NativeStackScreenProps<MeditateStackParamList, T>;

export type MusicStackScreenProps<T extends keyof MusicStackParamList> =
  NativeStackScreenProps<MusicStackParamList, T>;