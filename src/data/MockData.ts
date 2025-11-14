import { ImageSourcePropType } from 'react-native';

// --- Tipe Data (UPDATE) ---

// Tipe konten: tutorial atau musik
export type ContentType = 'tutorial' | 'music';
// Kategori untuk filter
export type ContentCategory = 'general' | 'anxious' | 'sleep' | 'kids';

const LOREM_IPSUM =
  'Ini adalah deskripsi placeholder. Konten ini akan menjelaskan secara detail langkah-langkah, manfaat, dan panduan untuk sesi ini. Ikuti instruksi dengan tenang dan fokus pada pernapasan Anda.';

export type Course = {
  id: string;
  title: string;
  duration: string;
  image: ImageSourcePropType;
  category: ContentCategory;
  type: ContentType;
  description: string;
};

export type PlayerTopic = {
  id: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  category: ContentCategory;
  type: ContentType;
  description: string;
};

export type Category = {
  id: string;
  label: string;
  iconName: string;
  category: ContentCategory | 'all' | 'my'; // Kategori untuk filter
};

export type MeditationTopic = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  category: ContentCategory;
  type: ContentType;
  description: string;
};

export type SleepTopic = {
  id: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  category: ContentCategory;
  type: ContentType;
  description: string;
  trackUrl?: string; // Khusus untuk musik tidur
};

export type MusicTrack = {
  id: string;
  title: string;
  subtitle: string;
  image: ImageSourcePropType;
  trackUrl?: string;
  category: ContentCategory;
  type: ContentType;
  description: string;
};

export type Topic = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  category: ContentCategory;
};

// --- Data untuk Home Screen ---

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

export const DAILY_THOUGHT: PlayerTopic = {
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
  {
    id: 'c5',
    title: 'Focus',
    duration: '3-10 MIN',
    image: require('../assets/images/focus.png'),
    category: 'general',
    type: 'tutorial',
    description: `Panduan untuk meningkatkan fokus (lagi). ${LOREM_IPSUM}`,
  },
];

// --- Data untuk Meditate Screen ---

export const MEDITATE_CATEGORIES: Category[] = [
  { id: 'mc1', label: 'All', iconName: 'meditation', category: 'all' },
  { id: 'mc2', label: 'My', iconName: 'account', category: 'my' },
  { id: 'mc3', label: 'Anxious', iconName: 'emoticon-sad-outline', category: 'anxious' },
  { id: 'mc4', label: 'Sleep', iconName: 'moon-waning-crescent', category: 'sleep' },
  { id: 'mc5', label: 'Kids', iconName: 'human-child', category: 'kids' },
];

export const DAILY_CALM: PlayerTopic = {
  id: 'p2',
  title: 'Daily Calm',
  subtitle: 'APR 30 • PAUSE PRACTICE',
  image: require('../assets/images/daily-calm.png'),
  category: 'general',
  type: 'tutorial',
  description: `Panduan ketenangan harian Anda. ${LOREM_IPSUM}`,
};

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
  {
    id: 'm3',
    title: 'Stress Relief',
    image: require('../assets/images/reduce-stress.png'),
    category: 'anxious',
    type: 'tutorial',
    description: `Panduan untuk mengurangi stres. ${LOREM_IPSUM}`,
  },
  {
    id: 'm4',
    title: 'Better Sleep',
    image: require('../assets/images/better-sleep.png'),
    category: 'sleep',
    type: 'tutorial',
    description: `Panduan untuk tidur lebih baik. ${LOREM_IPSUM}`,
  },
];

// --- Data untuk Sleep Screen ---

export const SLEEP_PLAYER_CARD: PlayerTopic = {
  id: 's1',
  title: 'The Ocean Moon',
  subtitle: 'Non-stop 8-hour mixes of our most popular sleep audio',
  image: require('../assets/images/moon-clouds.png'),
  category: 'sleep',
  type: 'music',
  description: `Musik 8 jam untuk tidur nyenyak. ${LOREM_IPSUM}`,
};

export const SLEEP_TOPICS: SleepTopic[] = [
  {
    id: 's2',
    title: 'Night Island',
    subtitle: '45 MIN • SLEEP MUSIC',
    image: require('../assets/images/night-island.png'),
    category: 'sleep',
    type: 'music',
    description: `Musik pengantar tidur Night Island. ${LOREM_IPSUM}`,
  },
  {
    id: 's3',
    title: 'Sweet Sleep',
    subtitle: '45 MIN • SLEEP MUSIC',
    image: require('../assets/images/sweet-sleep.png'),
    category: 'sleep',
    type: 'music',
    description: `Musik pengantar tidur Sweet Sleep. ${LOREM_IPSUM}`,
  },
  {
    id: 's4',
    title: 'Good Night',
    subtitle: '45 MIN • SLEEP MUSIC',
    image: require('../assets/images/good-night.png'),
    category: 'sleep',
    type: 'music',
    description: `Musik pengantar tidur Good Night. ${LOREM_IPSUM}`,
  },
  {
    id: 's5',
    title: 'Moon Clouds',
    subtitle: '45 MIN • SLEEP MUSIC',
    image: require('../assets/images/moon-clouds.png'),
    category: 'sleep',
    type: 'music',
    description: `Musik pengantar tidur Moon Clouds. ${LOREM_IPSUM}`,
  },
];

// --- Data untuk Onboarding (ChooseTopicScreen) ---
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
  {
    id: 't4',
    title: 'Reduce Anxiety',
    image: require('../assets/images/reduce-anxiety.png'),
    category: 'anxious',
  },
  {
    id: 't5',
    title: 'Personal Growth',
    image: require('../assets/images/personal-growth.png'),
    category: 'general',
  },
  {
    id: 't6',
    title: 'Better Sleep',
    image: require('../assets/images/better-sleep.png'),
    category: 'sleep',
  },
];