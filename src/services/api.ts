import {
  HOME_COURSES,
  DAILY_THOUGHT_FALLBACK,
  RECOMMENDED_COURSES,
  MEDITATE_CATEGORIES,
  MEDITATE_TOPICS,
  SLEEP_PLAYER_CARD,
  TOPICS,
  MusicTrack,
  SleepTopic,
  PlayerTopic,
  Category,
  MeditationTopic,
} from '../data/MockData';

// --- CONFIG ---
// Gunakan API Key yang valid. Jika error 429 (Rate Limit), data fallback akan muncul.
const PIXABAY_API_KEY = '48360875-5735c024d9c7482f534446c65';
const ZENQUOTES_URL = 'https://zenquotes.io/api/today';
const PIXABAY_AUDIO_URL = 'https://pixabay.com/api/audio/';

// --- FIREBASE CONFIG ---
// Firebase configuration untuk MeditasiApp
export const firebaseConfig = {
  apiKey: "AIzaSyAGlAdxnnZ_d0cehFMhexaXQQeYIFk4DZU",
  authDomain: "meditasiapp.firebaseapp.com",
  projectId: "meditasiapp",
  storageBucket: "meditasiapp.firebasestorage.app",
  messagingSenderId: "584555386244",
  appId: "1:584555386244:web:a810435970a65900b279d1",
  measurementId: "G-BS1TZQEXWL"
};

// --- TYPES ---
export type HomeDataResponse = {
  courses: typeof HOME_COURSES;
  dailyThought: PlayerTopic;
  recommended: typeof RECOMMENDED_COURSES;
};

export type SleepDataResponse = {
  playerCard: PlayerTopic;
  topics: SleepTopic[];
};

export type MeditateDataResponse = {
  categories: Category[];
  dailyCalm: PlayerTopic;
  topics: MeditationTopic[];
};

// --- API FETCHERS ---

// 1. Fetch Daily Quote
const fetchDailyQuote = async (): Promise<PlayerTopic> => {
  try {
    const response = await fetch(ZENQUOTES_URL);
    if (!response.ok) throw new Error('Network fail');

    const data = await response.json();
    const quote = data[0];

    return {
      id: 'quote_' + Date.now(),
      title: 'Daily Wisdom',
      subtitle: 'QUOTE OF THE DAY',
      image: require('../assets/images/daily-thought.png'),
      category: 'general',
      type: 'tutorial',
      description: `"${quote.q}" \n\n— ${quote.a}`,
    };
  } catch (error) {
    console.log('Using Fallback Quote');
    return DAILY_THOUGHT_FALLBACK;
  }
};

// 2. Fetch Pixabay Audio (Safe)
const fetchPixabayAudio = async (query: string): Promise<any[]> => {
  try {
    const url = `${PIXABAY_AUDIO_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&per_page=12`;
    const response = await fetch(url);
    if (!response.ok) return [];

    const data = await response.json();
    return data.hits || [];
  } catch (error) {
    console.log('Pixabay Error, returning empty list');
    return [];
  }
};

// --- EXPORTED FUNCTIONS ---

export const fetchHomeData = async (): Promise<HomeDataResponse> => {
  // Ambil quote baru
  const quote = await fetchDailyQuote();

  return {
    courses: HOME_COURSES, // Masih statis untuk stabilitas
    dailyThought: quote,   // Dinamis
    recommended: RECOMMENDED_COURSES,
  };
};

export const fetchMusicData = async (): Promise<MusicTrack[]> => {
  const hits = await fetchPixabayAudio('meditation zen nature');

  // Jika API gagal/kosong, kembalikan array kosong agar UI tidak crash
  if (hits.length === 0) return [];

  return hits.map((hit: any) => ({
    id: hit.id.toString(),
    title: hit.tags ? hit.tags.split(',')[0].trim() : 'Relaxing Audio',
    subtitle: hit.user || 'Artist',
    image: require('../assets/images/relaxtation.png'), // Placeholder image
    trackUrl: hit.audio,
    category: 'general',
    type: 'music',
    description: `Tags: ${hit.tags}`,
  }));
};

export const fetchSleepData = async (): Promise<{ playerCard: PlayerTopic; topics: SleepTopic[] }> => {
  const hits = await fetchPixabayAudio('sleep rain night');

  const topics: SleepTopic[] = hits.map((hit: any) => ({
    id: hit.id.toString(),
    title: hit.tags ? hit.tags.split(',')[0].trim() : 'Sleep Sound',
    subtitle: 'Sleep Music',
    image: require('../assets/images/night-island.png'),
    category: 'sleep',
    type: 'music',
    description: 'Relaxing sounds for sleep.',
    trackUrl: hit.audio,
  }));

  // Jika topics kosong, pakai Mock Data minimal agar tidak blank
  if (topics.length === 0) {
    // return mock data here if needed, or handle in UI
  }

  return {
    playerCard: SLEEP_PLAYER_CARD,
    topics: topics,
  };
};

export const fetchMeditateData = async (): Promise<MeditateDataResponse> => {
  const quote = await fetchDailyQuote();
  return {
    categories: MEDITATE_CATEGORIES,
    dailyCalm: quote,
    topics: MEDITATE_TOPICS,
  };
};

export const fetchTopicsData = async () => {
  return { topics: TOPICS };
};