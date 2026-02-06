import { db } from './firebase'; // Import db instance
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

// --- TYPES ---

export type UserProgress = {
  totalMinutes: number;
  sessionsCompleted: number;
  currentStreak: number;
  lastMeditateDate: string | null; // ISO Date String
  favorites: string[]; // List of IDs
};

const DEFAULT_PROGRESS: UserProgress = {
  totalMinutes: 0,
  sessionsCompleted: 0,
  currentStreak: 0,
  lastMeditateDate: null,
  favorites: []
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
// 50+ Curated Quotes for "AI-like" variety
const FALLBACK_QUOTES = [
  { q: "Peace comes from within. Do not seek it without.", a: "Buddha" },
  { q: "Nature does not hurry, yet everything is accomplished.", a: "Lao Tzu" },
  { q: "Quiet the mind, and the soul will speak.", a: "Ma Jaya Sati Bhagavati" },
  { q: "Your calm mind is the ultimate weapon against your challenges.", a: "Bryant McGill" },
  { q: "Mindfulness isn't difficult, we just need to remember to do it.", a: "Sharon Salzberg" },
  { q: "The present moment is the only time over which we have dominion.", a: "Thich Nhat Hanh" },
  { q: "Breath is the anchor of the present moment.", a: "Unknown" },
  { q: "You are the sky. Everything else – it’s just the weather.", a: "Pema Chödrön" },
  { q: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", a: "Buddha" },
  { q: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.", a: "Thich Nhat Hanh" }
];

// 1. Fetch Daily Quote (Enhanced)
// Helper for Timeout
// Helper for Timeout
const fetchWithTimeout = async (resource: string, options: any = {}, timeout = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    // Log error but don't throw to prevent Node/Undici crashes
    // Return a dummy response with ok: false to trigger fallback
    console.log(`Fetch Error/Timeout (${resource}):`, error instanceof Error ? error.message : error);
    return { ok: false, status: 408, json: async () => ({}) } as Response;
  }
};

// 1. Fetch Daily Quote (Enhanced)
const fetchDailyQuote = async (): Promise<PlayerTopic> => {
  try {
    // Try API first with 4s timeout
    const response = await fetchWithTimeout(ZENQUOTES_URL, {}, 4000);
    if (!response.ok) throw new Error('Network fail');

    const data = await response.json();
    const quote = data[0];

    return {
      id: 'quote_' + Date.now(),
      title: 'Daily Wisdom',
      subtitle: 'QUOTE OF THE DAY',
      image: { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60' },
      category: 'general',
      type: 'tutorial',
      description: `"${quote.q}" \n\n— ${quote.a}`,
    };
  } catch (error) {
    console.log('Quote API Error/Timeout, using Random Fallback');
    const randomQuote = FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];

    return {
      ...DAILY_THOUGHT_FALLBACK,
      image: { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60' },
      description: `"${randomQuote.q}" \n\n— ${randomQuote.a}`
    };
  }
};

// 2. Fetch Pixabay Audio (Safe)
const fetchPixabayAudio = async (query: string): Promise<any[]> => {
  try {
    const url = `${PIXABAY_AUDIO_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&per_page=12`;
    // 5s timeout for Audio
    const response = await fetchWithTimeout(url, {}, 5000);
    if (!response.ok) return [];

    const data = await response.json();
    return data.hits || [];
  } catch (error) {
    console.log('Pixabay Error/Timeout, returning empty list');
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

// Fallback Music Data (Expanded)
const FALLBACK_MUSIC: MusicTrack[] = [
  {
    id: 'mb1',
    title: 'Relaxing Rain',
    subtitle: 'Nature Sounds',
    image: { uri: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format&fit=crop&q=60' },
    category: 'meditation',
    type: 'music',
    description: 'Soothing rain sounds for deep relaxation.',
    trackUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
  },
  {
    id: 'mb2',
    title: 'Forest Birds',
    subtitle: 'Nature Sounds',
    image: { uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&auto=format&fit=crop&q=60' }, // New Forest Image
    category: 'meditation',
    type: 'music',
    description: 'Birds chirping in a quiet forest.',
    trackUrl: 'https://cdn.pixabay.com/download/audio/2022/03/09/audio_c8c8a73467.mp3',
  },
  {
    id: 'mb3',
    title: 'Lofi Study Beats',
    subtitle: 'Chillhop',
    image: { uri: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=500&auto=format&fit=crop&q=60' },
    category: 'general',
    type: 'music',
    description: 'Focus beats for studying or working.',
    trackUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  },
  {
    id: 'mb4',
    title: 'Night Sky',
    subtitle: 'Ambient',
    image: { uri: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&auto=format&fit=crop&q=60' },
    category: 'sleep',
    type: 'music',
    description: 'Deep ambient textures for sleep.',
    trackUrl: 'https://cdn.pixabay.com/download/audio/2022/04/27/audio_6ebb24d86c.mp3',
  },
  {
    id: 'mb5',
    title: 'Coffee Shop Vibes',
    subtitle: 'Jazz Lofi',
    image: { uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60' },
    category: 'general',
    type: 'music',
    description: 'Soft jazz piano music.',
    trackUrl: 'https://cdn.pixabay.com/download/audio/2022/03/09/audio_c8c8a73467.mp3',
  },
  {
    id: 'mb6',
    title: 'Ocean Waves',
    subtitle: 'Nature',
    image: { uri: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=500&auto=format&fit=crop&q=60' },
    category: 'meditation',
    type: 'music',
    description: 'Calm ocean waves hitting the shore.',
    trackUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3',
  }
];

export const fetchMusicData = async (): Promise<MusicTrack[]> => {
  // Ditambahkan query Lofi, Chill, Beats
  const queries = ['meditation', 'zen', 'nature', 'calm', 'ambient', 'piano', 'relaxing', 'lofi', 'chillhop', 'lowfi', 'study beats'];
  const randomQuery = queries[Math.floor(Math.random() * queries.length)];

  console.log(`Fetching Music with query: ${randomQuery}`);
  // Ditambahkan limit menjadi 20 lagu
  const url = `${PIXABAY_AUDIO_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(randomQuery)}&per_page=20`;

  try {
    const response = await fetchWithTimeout(url, {}, 5000);
    if (!response.ok) throw new Error('API Fail');
    const data = await response.json();
    const hits = data.hits || [];

    // Jika API gagal/kosong, kembalikan Fallback Data
    if (hits.length === 0) {
      console.log("Music API Empty/Error, using Fallback Data");
      return FALLBACK_MUSIC;
    }

    // List of images for variety (Mixed Local + URL)
    const musicImages = [
      { uri: 'https://images.unsplash.com/photo-1517685352821-92cf88a85a8d?w=500&auto=format&fit=crop&q=60' },
      { uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60' },
      { uri: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format&fit=crop&q=60' },
      { uri: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=500&auto=format&fit=crop&q=60' },
      { uri: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&auto=format&fit=crop&q=60' },
      { uri: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&auto=format&fit=crop&q=60' }, // Chill
      { uri: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=500&auto=format&fit=crop&q=60' }, // Lofi
      { uri: 'https://images.unsplash.com/photo-1614730341194-75c60740a070?w=500&auto=format&fit=crop&q=60' }, // Aesthetic
      { uri: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=60' }, // Music
    ];

    return hits.map((hit: any, index: number) => ({
      id: hit.id.toString(),
      title: hit.tags ? hit.tags.split(',')[0].trim() : 'Relaxing Audio',
      subtitle: hit.user || 'Artist',
      image: musicImages[index % musicImages.length], // Cycle through images
      trackUrl: hit.audio,
      category: 'general',
      type: 'music',
      description: `Tags: ${hit.tags}`,
    }));
  } catch (error) {
    console.log("Music API Error, using Fallback Data");
    return FALLBACK_MUSIC;
  }
};

// Fallback Sleep Data (Images from Unsplash)
const FALLBACK_SLEEP_TOPICS: SleepTopic[] = [
  {
    id: 'sb1',
    title: 'Sleepy Rain',
    subtitle: 'Sleep Music',
    image: { uri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&auto=format&fit=crop&q=60' },
    category: 'sleep',
    type: 'music',
    description: 'Heavy rain for deep sleep.',
    trackUrl: 'https://cdn.pixabay.com/download/audio/2022/03/09/audio_c8c8a73467.mp3'
  },
  {
    id: 'sb2',
    title: 'Night Crickets',
    subtitle: 'Nature',
    image: { uri: 'https://images.unsplash.com/photo-1621252179027-94459d27d3ee?w=500&auto=format&fit=crop&q=60' },
    category: 'sleep',
    type: 'music',
    description: 'Crickets chirping at night.',
    trackUrl: 'https://cdn.pixabay.com/download/audio/2022/03/09/audio_c8c8a73467.mp3'
  },
  {
    id: 'sb3',
    title: 'Moonlight Calm',
    subtitle: 'Ambient',
    image: { uri: 'https://images.unsplash.com/photo-1532975769720-3b03806be44d?w=500&auto=format&fit=crop&q=60' },
    category: 'sleep',
    type: 'music',
    description: 'Soft ambient pads for dreaming.',
    trackUrl: 'https://cdn.pixabay.com/download/audio/2022/04/27/audio_6ebb24d86c.mp3'
  },
  {
    id: 'sb4',
    title: 'Deep Space',
    subtitle: 'Drone',
    image: { uri: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=500&auto=format&fit=crop&q=60' },
    category: 'sleep',
    type: 'music',
    description: 'Deep space drone sounds.',
    trackUrl: 'https://cdn.pixabay.com/download/audio/2022/03/09/audio_c8c8a73467.mp3'
  },
  {
    id: 'sb5',
    title: 'City at Night',
    subtitle: 'Atmosphere',
    image: { uri: 'https://images.unsplash.com/photo-1519501025564-95ebb29a5e6f?w=500&auto=format&fit=crop&q=60' },
    category: 'sleep',
    type: 'music',
    description: 'Muffled city sounds from a high rise.',
    trackUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3'
  }
];

export const fetchSleepData = async (): Promise<{ playerCard: PlayerTopic; topics: SleepTopic[] }> => {
  const hits = await fetchPixabayAudio('sleep rain night ambient 432hz');

  let topics: SleepTopic[] = [];

  // Sleep Images (Night, Moon, Stars)
  const sleepImages = [
    { uri: 'https://images.unsplash.com/photo-1532767153502-398c256e6d1a?w=500&auto=format&fit=crop&q=60' },
    { uri: 'https://images.unsplash.com/photo-1472552944129-b035e9ea6fb3?w=500&auto=format&fit=crop&q=60' },
    { uri: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&auto=format&fit=crop&q=60' },
    { uri: 'https://images.unsplash.com/photo-1464802622765-93288f886f44?w=500&auto=format&fit=crop&q=60' },
    { uri: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&auto=format&fit=crop&q=60' },
  ];

  if (hits.length > 0) {
    topics = hits.map((hit: any, index: number) => ({
      id: hit.id.toString(),
      title: hit.tags ? hit.tags.split(',')[0].trim() : 'Sleep Sound',
      subtitle: 'Sleep Music',
      image: sleepImages[index % sleepImages.length],
      category: 'sleep',
      type: 'music',
      description: 'Relaxing sounds for sleep.',
      trackUrl: hit.audio,
    }));
  }

  // Jika topics kosong (API fail), pakai Fallback
  if (topics.length === 0) {
    console.log("Sleep API Empty, using Fallback");
    topics = FALLBACK_SLEEP_TOPICS;
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

// --- USER PROGRESS API ---

// 1. Get User Progress
export const getUserProgress = async (userId: string): Promise<UserProgress> => {
  if (!userId || !db) return DEFAULT_PROGRESS;

  try {
    const docRef = db.collection('users').doc(userId);
    const doc = await docRef.get();

    if (doc.exists) {
      return { ...DEFAULT_PROGRESS, ...(doc.data() as UserProgress) };
    } else {
      // First time user, create default
      await docRef.set(DEFAULT_PROGRESS);
      return DEFAULT_PROGRESS;
    }
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return DEFAULT_PROGRESS;
  }
};

// 2. Update User Progress
export const updateUserProgress = async (userId: string, data: Partial<UserProgress>) => {
  if (!userId || !db) return;

  try {
    const docRef = db.collection('users').doc(userId);
    await docRef.set(data, { merge: true });
  } catch (error) {
    console.error("Error updating user progress:", error);
  }
};

// 3. Toggle Favorite
export const toggleFavorite = async (userId: string, itemId: string) => {
  if (!userId || !db) return;

  try {
    const docRef = db.collection('users').doc(userId);
    const doc = await docRef.get();
    if (doc.exists) {
      const currentData = doc.data() as UserProgress;
      let favs = currentData.favorites || [];

      if (favs.includes(itemId)) {
        favs = favs.filter(id => id !== itemId);
      } else {
        favs.push(itemId);
      }

      await docRef.update({ favorites: favs });
      return favs;
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
  }
  return [];
};