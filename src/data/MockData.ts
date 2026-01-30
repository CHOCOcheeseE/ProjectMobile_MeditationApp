import { ImageSourcePropType } from 'react-native';

// --- Tipe Data (UPDATE) ---

// Tipe konten: tutorial atau musik
export type ContentType = 'tutorial' | 'music';
// Kategori untuk filter
export type ContentCategory = 'general' | 'anxious' | 'sleep' | 'kids' | 'meditation';

// Kita ubah image agar bisa menerima object URI (untuk gambar dari API) atau number (require lokal)
export type ImageProp = ImageSourcePropType | { uri: string };

export type Course = {
  id: string;
  title: string;
  duration: string;
  image: ImageProp; // Updated
  category: ContentCategory;
  type: ContentType;
  description: string;
};

export type PlayerTopic = {
  id: string;
  title: string;
  subtitle: string;
  image: ImageProp; // Updated
  category: ContentCategory;
  type: ContentType;
  description: string;
  trackUrl?: string; // URL audio dari API
};

export type Category = {
  id: string;
  label: string;
  iconName: string;
  category: ContentCategory | 'all' | 'my';
};

export type MeditationTopic = {
  id: string;
  title: string;
  image: ImageProp; // Updated
  category: ContentCategory;
  type: ContentType;
  description: string;
};

export type SleepTopic = {
  id: string;
  title: string;
  subtitle: string;
  image: ImageProp; // Updated
  category: ContentCategory;
  type: ContentType;
  description: string;
  trackUrl?: string; // URL audio dari API
};

export type MusicTrack = {
  id: string;
  title: string;
  subtitle: string;
  image: ImageProp; // Updated
  trackUrl?: string;
  category: ContentCategory;
  type: ContentType;
  description: string;
};

export type Topic = {
  id: string;
  title: string;
  image: ImageProp; // Updated
  category: ContentCategory;
};

// --- Data Fallback (Jika API Gagal) ---

const LOREM_IPSUM =
  'Ini adalah deskripsi placeholder. Konten ini akan menjelaskan secara detail langkah-langkah, manfaat, dan panduan untuk sesi ini.';

export const HOME_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Basics',
    duration: '3-10 MIN',
    image: require('../assets/images/basics.png'),
    category: 'general',
    type: 'tutorial',
    description: `Selamat datang di 'Basics' 101. ${LOREM_IPSUM}`,
  },
  {
    id: 'c2',
    title: 'Relaxation',
    duration: '5-10 MIN',
    image: require('../assets/images/relaxtation.png'),
    category: 'general',
    type: 'music',
    description: `Musik relaksasi untuk menenangkan pikiran. ${LOREM_IPSUM}`,
  },
];

export const DAILY_THOUGHT_FALLBACK: PlayerTopic = {
  id: 'p1',
  title: 'Daily Thought',
  subtitle: 'MEDITATION • 3-10 MIN',
  image: require('../assets/images/daily-thought.png'),
  category: 'general',
  type: 'tutorial',
  description: `Panduan meditasi harian Anda. ${LOREM_IPSUM}`,
};

export const RECOMMENDED_COURSES: Course[] = [
  {
    id: 'c3',
    title: 'Focus',
    duration: '3-10 MIN',
    image: require('../assets/images/focus.png'),
    category: 'general',
    type: 'tutorial',
    description: `Panduan untuk meningkatkan fokus. ${LOREM_IPSUM}`,
  },
  {
    id: 'c4',
    title: 'Happiness',
    duration: '3-10 MIN',
    image: require('../assets/images/happiness.png'),
    category: 'general',
    type: 'tutorial',
    description: `Panduan untuk meningkatkan kebahagiaan. ${LOREM_IPSUM}`,
  },
];

export const MEDITATE_CATEGORIES: Category[] = [
  { id: 'mc1', label: 'All', iconName: 'meditation', category: 'all' },
  { id: 'mc2', label: 'My', iconName: 'account', category: 'my' },
  { id: 'mc3', label: 'Anxious', iconName: 'emoticon-sad-outline', category: 'anxious' },
  { id: 'mc4', label: 'Sleep', iconName: 'moon-waning-crescent', category: 'sleep' },
  { id: 'mc5', label: 'Kids', iconName: 'human-child', category: 'kids' },
];

export const MEDITATE_TOPICS: MeditationTopic[] = [
  {
    id: 'm1',
    title: '7 Days of Calm',
    image: require('../assets/images/7-days-calm.png'),
    category: 'general',
    type: 'tutorial',
    description: `Panduan 7 hari menuju ketenangan. ${LOREM_IPSUM}`,
  },
  {
    id: 'm2',
    title: 'Anxiety Release',
    image: require('../assets/images/anxiet-release.png'),
    category: 'anxious',
    type: 'tutorial',
    description: `Panduan untuk melepaskan kecemasan. ${LOREM_IPSUM}`,
  },
];

export const SLEEP_PLAYER_CARD: PlayerTopic = {
  id: 's1',
  title: 'The Ocean Moon',
  subtitle: 'Non-stop 8-hour mixes',
  image: require('../assets/images/moon-clouds.png'),
  category: 'sleep',
  type: 'music',
  description: `Musik 8 jam untuk tidur nyenyak. ${LOREM_IPSUM}`,
};

export const TOPICS: Topic[] = [
  {
    id: 't1',
    title: 'Reduce Stress',
    image: require('../assets/images/reduce-stress.png'),
    category: 'anxious',
  },
  {
    id: 't2',
    title: 'Improve Performance',
    image: require('../assets/images/improve-performmance.png'),
    category: 'general',
  },
  {
    id: 't3',
    title: 'Increase Happiness',
    image: require('../assets/images/increase-happiness.png'),
    category: 'general',
  },
];