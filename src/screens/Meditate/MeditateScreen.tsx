import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
// (FIX) Impor SafeAreaView dari context
import { SafeAreaView } from 'react-native-safe-area-context';
// Impor tipe
import { MeditateStackScreenProps } from '../../navigation/types';
// (FIX) Impor semua tipe yang dibutuhkan dari MockData
import {
  Category,
  PlayerTopic,
  MeditationTopic,
  ContentCategory, // Pastikan ini diekspor dari MockData
} from '../../data/MockData';
// Impor hook dan context
import { useTheme } from '../../context/ThemeContext';
// Impor API
import { fetchMeditateData, MeditateDataResponse } from '../../services/api';
// Impor komponen
import { METRICS } from '../../constants/metrics';
import CategoryChip from '../../components/features/CategoryChip';
import PlayerCard from '../../components/features/PlayerCard';
import MeditationCard from '../../components/features/MeditationCard';

// Tipe untuk state data
type MeditateDataState = {
  categories: Category[];
  dailyCalm: PlayerTopic;
  topics: MeditationTopic[];
};

const MeditateScreen: React.FC<MeditateStackScreenProps<'MeditateList'>> = ({
  navigation,
}) => {
  const { theme } = useTheme();
  // (FIX) Tipe state untuk activeCategory harus Category, bukan string
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  // State untuk API data
  const [meditateData, setMeditateData] = useState<MeditateDataState | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data: MeditateDataResponse = await fetchMeditateData();
        setMeditateData({
          categories: data.categories,
          dailyCalm: data.dailyCalm,
          topics: data.topics,
        });
        // (FIX) Set kategori aktif pertama sebagai default
        if (data.categories && data.categories.length > 0) {
          setActiveCategory(data.categories[0]);
        }
      } catch (e: any) {
        setError(e.message || 'Gagal memuat data');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // (FIX) Perbaikan Fungsi Navigasi Kondisional
  const onTopicPress = (item: PlayerTopic | MeditationTopic) => {
    // Cek tipe konten
    if (item.type === 'music') {
      navigation.navigate('Player', {
        title: item.title,
        // (FIX) Cek apakah properti 'subtitle' ada sebelum mengakses
        subtitle: 'subtitle' in item ? item.subtitle : 'Music',
        image: item.image,
        // (FIX) Cek apakah 'trackUrl' ada sebelum mengakses
        trackUrl: 'trackUrl' in item ? (item as any).trackUrl : undefined,
      });
    } else {
      // Jika 'tutorial'
      navigation.navigate('Tutorial', {
        title: item.title,
        // (FIX) Sediakan subtitle. Gunakan item.subtitle jika ada, jika tidak, 'MEDITATION'
        subtitle: 'subtitle' in item ? item.subtitle : 'MEDITATION',
        image: item.image,
        description: item.description,
      });
    }
  };

  // Tampilan Loading
  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // Tampilan Error
  if (error) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // (FIX) Penjaga yang lebih kuat untuk data
  if (!meditateData || !activeCategory) {
    // Tampilkan loading atau null jika data/kategori belum siap
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // (FIX) Logika filter dipindahkan ke sini, setelah penjaga null
  const filteredTopics = meditateData.topics.filter(topic => {
    if (activeCategory.category === 'all') return true;
    // 'My' belum diimplementasikan
    if (activeCategory.category === 'my') return false;
    // Filter berdasarkan kategori
    return topic.category === activeCategory.category;
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        {/* ... (Header Text) ... */}
        <Text style={[styles.title, { color: theme.text }]}>Meditate</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          we can learn how to recognize when our minds are doing their normal
          acrobatics.
        </Text>

        {/* ... (Category Chips) ... */}
        <View style={styles.categoryList}>
          <FlatList
            data={meditateData.categories}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CategoryChip
                label={item.label}
                iconName={item.iconName}
                // (FIX) Perbandingan berdasarkan 'id'
                isActive={item.id === activeCategory.id}
                onPress={() => setActiveCategory(item)}
              />
            )}
          />
        </View>

        {/* ... (Daily Calm Card) ... */}
        <PlayerCard
          title={meditateData.dailyCalm.title}
          subtitle={meditateData.dailyCalm.subtitle}
          imageSource={meditateData.dailyCalm.image}
          onPress={() => onTopicPress(meditateData.dailyCalm)}
        />

        {/* ... (Meditation Topics List) ... */}
        <FlatList
          data={filteredTopics} // (FIX) Menggunakan data yang sudah difilter
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          ListHeaderComponent={
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Meditation
            </Text>
          }
          renderItem={({ item }) => (
            <MeditationCard
              title={item.title}
              imageSource={item.image}
              onPress={() => onTopicPress(item)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

// ... (Styles) ...
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: METRICS.padding,
  },
  errorText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
  },
  container: {
    flex: 1,
    paddingHorizontal: METRICS.padding,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: METRICS.margin,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: METRICS.margin,
    paddingHorizontal: METRICS.padding,
  },
  categoryList: {
    height: 100,
    marginBottom: METRICS.margin,
  },
  row: {
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: METRICS.margin,
    marginTop: METRICS.margin,
  },
});

export default MeditateScreen;