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
  trackUrl?: string; // Added for optional audio playback
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

// --- Data Fallback (Jika API Gagal) ---

const BASICS_DESC = `Langkah awal perjalanan mindfulness Anda.
1. Cari posisi duduk yang nyaman, punggung tegak namun santai.
2. Fokuskan perhatian pada napas alami Anda. Rasakan udara masuk dan keluar.
3. Saat pikiran melayang, perlahan kembalikan fokus ke napas tanpa menghakimi diri sendiri.
4. Lakukan ini selama 3-5 menit untuk membangun fondasi ketenangan.`;

const RELAXATION_DESC = `Lepaskan ketegangan fisik dan mental dengan teknik Body Scan.
1. Berbaring atau duduk santai. Tutup mata Anda.
2. Bawa perhatian ke ujung kaki, rasakan sensasinya, lalu biarkan rileks.
3. Perlahan bergerak ke atas: betis, lutut, paha, perut, hingga kepala.
4. Bayangkan setiap hembusan napas membawa keluar sisa ketegangan dari tubuh.`;

const FOCUS_DESC = `Melatih otak untuk fokus seperti melatih otot.
1. Pilih satu objek fokus (napas, suara, atau sensasi fisik).
2. Tanamkan niat untuk tetap bersama objek tersebut.
3. Sadari ketika perhatian teralihkan oleh pikiran atau gangguan.
4. Dengan lembut namun tegas, kembali ke objek fokus. Konsistensi adalah kunci.`;

const HAPPINESS_DESC = `Menanamkan benih kebahagiaan melalui rasa syukur.
1. Ingatlah tiga hal kecil yang Anda syukuri hari ini (sinar matahari, kopi pagi, senyum teman).
2. Rasakan emosi positif yang muncul saat mengingatnya.
3. Biarkan perasaan hangat ini menyebar ke seluruh tubuh.
4. Tersenyumlah perlahan dan bawa perasaan ini sepanjang hari.`;

const M7_DAYS_DESC = `Program 7 hari untuk mereset sistem saraf Anda.
Hari 1: Bernapas dengan Sadar.
Hari 2: Menyadari Tubuh.
Hari 3: Melepaskan Kontrol.
Hari 4: Menangani Emosi Sulit.
Hari 5: Kebaikan untuk Diri Sendiri.
Hari 6: Melatih Fokus.
Hari 7: Mengintegrasikan Mindfulness ke Hidup Sehari-hari.`;

const ANXIETY_DESC = `Teknik grounding untuk meredakan kecemasan seketika.
1. Teknik 5-4-3-2-1:
   - Sebutkan 5 hal yang Anda lihat.
   - 4 hal yang bisa Anda sentuh.
   - 3 suara yang Anda dengar.
   - 2 bau yang Anda cium.
   - 1 hal yang Anda rasakan secara emosional.
2. Tarik napas panjang 4 detik, tahan 7 detik, hembuskan 8 detik (4-7-8 Breathing).`;

const SLEEP_DESC = `Persiapan menuju tidur yang nyenyak dan berkualitas.
1. Matikan gadget 30 menit sebelum tidur.
2. Redupkan lampu kamar.
3. Dengarkan suara alam atau musik ambient ini.
4. Bayangkan tubuh Anda menjadi sangat berat dan tenggelam nyaman ke kasur.
5. Biarkan pikiran melambat seiring irama musik.`;

const MORNING_DESC = `Awali pagi dengan energi positif dan intensi yang jelas.
1. Sebelum bangkit dari tempat tidur, luangkan 1 menit untuk bernapas.
2. Tanyakan: "Apa satu hal yang ingin saya capai atau rasakan hari ini?"
3. Visualisasikan diri Anda menjalani hari dengan tenang dan produktif.
4. Bangun dengan senyuman.`;

const COMPASSION_DESC = `Menjadi sahabat untuk diri sendiri di saat sulit.
1. Letakkan tangan di dada, rasakan kehangatannya.
2. Katakan pada diri sendiri: "Aku menerima diriku apa adanya."
3. "Aku mengizinkan diriku untuk tidak sempurna."
4. "Aku pantas mendapatkan ketenangan dan kebahagiaan."
5. Rasakan kasih sayang mengalir dari telapak tangan ke hati Anda.`;

// ... (previous code)

// ... (previous code)

export const HOME_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Basics',
    duration: '3-10 MIN',
    image: { uri: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=500&auto=format&fit=crop&q=60' },
    category: 'general',
    type: 'tutorial',
    description: BASICS_DESC,
  },
  {
    id: 'c2',
    title: 'Relaxation',
    duration: '5-10 MIN',
    image: { uri: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=500&auto=format&fit=crop&q=60' }, // Stones/Relax
    category: 'general',
    type: 'music',
    description: RELAXATION_DESC,
    trackUrl: 'https://cdn.pixabay.com/download/audio/2022/03/09/audio_c8c8a73467.mp3',
  },
];

export const DAILY_THOUGHT_FALLBACK: PlayerTopic = {
  id: 'p1',
  title: 'Daily Thought',
  subtitle: 'MEDITATION • 3-10 MIN',
  image: { uri: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=500&auto=format&fit=crop&q=60' },
  category: 'general',
  type: 'tutorial',
  description: MORNING_DESC,
};

export const RECOMMENDED_COURSES: Course[] = [
  {
    id: 'c3',
    title: 'Focus',
    duration: '3-10 MIN',
    image: { uri: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=60' },
    category: 'general',
    type: 'tutorial',
    description: FOCUS_DESC,
  },
  {
    id: 'c4',
    title: 'Happiness',
    duration: '3-10 MIN',
    image: { uri: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop&q=60' },
    category: 'general',
    type: 'tutorial',
    description: HAPPINESS_DESC,
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
    image: { uri: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60' }, // Beach/Calm
    category: 'general',
    type: 'tutorial',
    description: M7_DAYS_DESC,
  },
  {
    id: 'm2',
    title: 'Anxiety Release',
    image: { uri: 'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?w=500&auto=format&fit=crop&q=60' },
    category: 'anxious',
    type: 'tutorial',
    description: ANXIETY_DESC,
  },

  {
    id: 'm4',
    title: 'Deep Sleep',
    image: { uri: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60' },
    category: 'sleep',
    type: 'tutorial',
    description: SLEEP_DESC,
  },
  {
    id: 'm5',
    title: 'Focus Flow',
    image: { uri: 'https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?w=500&auto=format&fit=crop&q=60' },
    category: 'general',
    type: 'tutorial',
    description: FOCUS_DESC,
  },
  {
    id: 'm6',
    title: 'Self Compassion',
    image: { uri: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=500&auto=format&fit=crop&q=60' },
    category: 'anxious',
    type: 'tutorial',
    description: COMPASSION_DESC,
  },
  // Kids Content
  {
    id: 'k1',
    title: 'Magical Forest',
    image: { uri: 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=500&auto=format&fit=crop&q=60' },
    category: 'kids',
    type: 'tutorial',
    description: `Petualangan ke hutan ajaib untuk si kecil.
1. Tutup matamu dan bayangkan kamu sedang berdiri di pinggir hutan yang indah.
2. Lihatlah pohon-pohon yang tersenyum dan bunga-bunga yang bersinar.
3. Tarik napas dalam-dalam, hirup udara hutan yang segar.
4. Hembuskan napas, seolah-olah kamu meniup debu peri.
5. Rasakan betapa amannya kamu di sini.`,
  },
  {
    id: 'k2',
    title: 'Little Astronaut',
    image: { uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60' },
    category: 'kids',
    type: 'tutorial',
    description: `Perjalanan tenang menuju bintang-bintang.
1. Bayangkan kamu memakai baju astronot yang empuk dan nyaman.
2. Kamu perlahan melayang naik ke angkasa, semakin ringan.
3. Lihatlah bintang-bintang berkelip seperti lampu tidur kecil.
4. Tangkap satu bintang harapan dan simpan di hatimu.
5. Tidurlah dengan nyaman di atas bulan sabit yang lembut.`,
  },
];

// ... (other exports)

export const SLEEP_PLAYER_CARD: PlayerTopic = {
  id: 's1',
  title: 'The Ocean Moon',
  subtitle: 'Non-stop 8-hour mixes',
  image: { uri: 'https://images.unsplash.com/photo-1470723710355-95304d8aece4?w=500&auto=format&fit=crop&q=60' },
  category: 'sleep',
  type: 'music',
  description: SLEEP_DESC,
  trackUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3', // ADDED TRACK URL
};

export const TOPICS: Topic[] = [
  {
    id: 't1',
    title: 'Reduce Stress',
    image: { uri: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&auto=format&fit=crop&q=60' }, // Yoga/Stress
    category: 'anxious',
  },
  {
    id: 't2',
    title: 'Improve Performance',
    image: { uri: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&auto=format&fit=crop&q=60' }, // Focus
    category: 'general',
  },
  {
    id: 't3',
    title: 'Increase Happiness',
    image: { uri: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=500&auto=format&fit=crop&q=60' }, // Happy/Success
    category: 'general',
  },
];