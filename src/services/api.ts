import {
  HOME_COURSES,
  DAILY_THOUGHT,
  RECOMMENDED_COURSES,
  MEDITATE_CATEGORIES,
  DAILY_CALM,
  MEDITATE_TOPICS,
  SLEEP_PLAYER_CARD,
  SLEEP_TOPICS,
  TOPICS,
  MusicTrack,
} from '../data/MockData';

// --- Tipe untuk API Autentikasi ---
export type LoginResponse = { token: string };
export type RegisterResponse = { id: string; token: string };

// --- Tipe untuk API Data (Simulasi) ---
export type HomeDataResponse = {
  courses: typeof HOME_COURSES;
  dailyThought: typeof DAILY_THOUGHT;
  recommended: typeof RECOMMENDED_COURSES;
};
export type MeditateDataResponse = {
  categories: typeof MEDITATE_CATEGORIES;
  dailyCalm: typeof DAILY_CALM;
  topics: typeof MEDITATE_TOPICS;
};
export type SleepDataResponse = {
  playerCard: typeof SLEEP_PLAYER_CARD;
  topics: typeof SLEEP_TOPICS;
};
export type TopicsDataResponse = {
  topics: typeof TOPICS;
};

// --- URL API ---
const ITUNES_API_URL =
  'https://itunes.apple.com/search?term=meditation&entity=song&limit=20';

// --- Fungsi Helper ---
// Fungsi helper untuk simulasi delay jaringan
const simulateNetworkDelay = (ms: number) =>
  // (FIX) Membungkus 'resolve(undefined)' di dalam '() => ...'
  // Ini adalah cara paling aman untuk memuaskan 'setTimeout' (yang butuh 0 argumen)
  // dan 'Promise' (yang butuh 1 argumen).
  new Promise(resolve => setTimeout(() => resolve(undefined), ms));

// --- API Autentikasi (Nyata) ---

export const apiLogin = (
  email: string,
  _pass: string,
): Promise<LoginResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      await simulateNetworkDelay(1000);
      if (email.toLowerCase().includes('eve.holt')) {
        resolve({ token: 'QpwL5tke4Pnpja7X4' });
      } else {
        reject(new Error('Email atau password salah. (Hint: eve.holt@reqres.in)'));
      }
    } catch (error: any) {
      console.error(error);
      reject(new Error(error.message || 'Terjadi kesalahan jaringan.'));
    }
  });
};

export const apiRegister = (
  name: string,
  email: string,
  _pass: string,
): Promise<RegisterResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      await simulateNetworkDelay(1000);
      if (name && email && !email.toLowerCase().includes('eve.holt')) {
        resolve({ id: '4', token: 'QpwL5tke4Pnpja7X4' });
      } else {
        reject(new Error('Gagal mendaftar (email eve.holt@reqres.in sudah dipakai).'));
      }
    } catch (error: any) {
      console.error(error);
      reject(new Error(error.message || 'Terjadi kesalahan jaringan.'));
    }
  });
};

// --- API Data (Nyata) ---

export const fetchMusicData = (): Promise<MusicTrack[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(ITUNES_API_URL);
      if (!response.ok) {
        throw new Error('Gagal mengambil data dari iTunes.');
      }
      const data = await response.json();
      const transformedData: MusicTrack[] = data.results
        .filter(
          (result: any) =>
            result.trackId && result.trackName && result.artistName,
        )
        .map((result: any) => ({
          id: result.trackId.toString(),
          title: result.trackName,
          subtitle: result.artistName,
          image: { uri: result.artworkUrl100 },
          trackUrl: result.previewUrl,
        }));
      resolve(transformedData);
    } catch (error: any) {
      console.error(error);
      reject(new Error(error.message || 'Terjadi kesalahan jaringan.'));
    }
  });
};

// --- API Data (Simulasi) ---
// (API Simulasi untuk Home)
export const fetchHomeData = (): Promise<HomeDataResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      await simulateNetworkDelay(800);
      resolve({
        courses: HOME_COURSES,
        dailyThought: DAILY_THOUGHT,
        recommended: RECOMMENDED_COURSES,
      });
    } catch (error: any) {
      console.error(error);
      reject(new Error(error.message || 'Gagal memuat data Home.'));
    }
  });
};

// (API Simulasi untuk Meditate)
export const fetchMeditateData = (): Promise<MeditateDataResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      await simulateNetworkDelay(800);
      resolve({
        categories: MEDITATE_CATEGORIES,
        dailyCalm: DAILY_CALM,
        topics: MEDITATE_TOPICS,
      });
    } catch (error: any) {
      console.error(error);
      reject(new Error(error.message || 'Gagal memuat data Meditate.'));
    }
  });
};

// (API Simulasi untuk Sleep)
export const fetchSleepData = (): Promise<SleepDataResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      await simulateNetworkDelay(800);
      resolve({
        playerCard: SLEEP_PLAYER_CARD,
        topics: SLEEP_TOPICS,
      });
    } catch (error: any) {
      console.error(error);
      reject(new Error(error.message || 'Gagal memuat data Sleep.'));
    }
  });
};

// (API Simulasi untuk Topics Onboarding)
export const fetchTopicsData = (): Promise<TopicsDataResponse> => {
  return new Promise(async (resolve, reject) => {
    try {
      await simulateNetworkDelay(800);
      resolve({
        topics: TOPICS,
      });
    } catch (error: any) {
      console.error(error);
      reject(new Error(error.message || 'Gagal memuat data Topik.'));
    }
  });
};