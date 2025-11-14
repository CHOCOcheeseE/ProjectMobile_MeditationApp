import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView, // (FIX) Impor ScrollView
} from 'react-native';
// (FIX) Impor SafeAreaView dari context
import { SafeAreaView } from 'react-native-safe-area-context';
// Impor tipe
import { HomeStackScreenProps } from '../../navigation/types';
import { Course, PlayerTopic } from '../../data/MockData';
// Impor hook dan context
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
// Impor API
import { fetchHomeData, HomeDataResponse } from '../../services/api';
// Impor komponen
import { METRICS } from '../../constants/metrics';
import CourseCard from '../../components/features/CourseCard';
import PlayerCard from '../../components/features/PlayerCard';

// Tipe untuk state data
type HomeDataState = {
  courses: Course[];
  dailyThought: PlayerTopic;
  recommended: Course[];
};

const HomeScreen: React.FC<HomeStackScreenProps<'HomeList'>> = ({
  navigation,
}) => {
  const { signOut } = useAuth();
  const { theme } = useTheme();

  // State untuk API data
  const [homeData, setHomeData] = useState<HomeDataState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data: HomeDataResponse = await fetchHomeData(); // Panggil API
        setHomeData({
          courses: data.courses,
          dailyThought: data.dailyThought,
          recommended: data.recommended,
        });
      } catch (e: any) {
        setError(e.message || 'Gagal memuat data');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Fungsi navigasi
  const onCoursePress = (item: Course) => {
    navigation.navigate('Player', {
      title: item.title,
      subtitle: item.duration,
      image: item.image,
    });
  };

  const onPlayerPress = (item: PlayerTopic) => {
    navigation.navigate('Player', {
      title: item.title,
      subtitle: item.subtitle,
      image: item.image,
    });
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

  // Tampilan Sukses (tapi data null)
  if (!homeData) {
    return null;
  }

  // (FIX) Menggunakan ScrollView sebagai pembungkus utama
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.text }]}>
          Good Morning, Afsar
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          We Wish you have a good day
        </Text>

        <View style={styles.courseRow}>
          <CourseCard
            item={homeData.courses[0]}
            onPress={() => onCoursePress(homeData.courses[0])}
          />
          <CourseCard
            item={homeData.courses[1]}
            onPress={() => onCoursePress(homeData.courses[1])}
          />
        </View>

        <View style={styles.playerCardContainer}>
          <PlayerCard
            title={homeData.dailyThought.title}
            subtitle={homeData.dailyThought.subtitle}
            imageSource={homeData.dailyThought.image}
            onPress={() => onPlayerPress(homeData.dailyThought)}
          />
        </View>

        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Recomended for you
        </Text>
        
        {/* (FIX) FlatList horizontal sekarang ada di dalam ScrollView */}
        <FlatList
          data={homeData.recommended} // Data untuk daftar horizontal
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CourseCard
              item={item}
              onPress={() => onCoursePress(item)}
              isRecommended
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recommendList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: METRICS.margin * 2,
    paddingHorizontal: METRICS.padding,
  },
  subtitle: {
    fontSize: 20,
    paddingHorizontal: METRICS.padding,
    marginBottom: METRICS.margin,
  },
  courseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: METRICS.padding,
  },
  // (FIX) Menambahkan padding horizontal untuk PlayerCard
  playerCardContainer: {
    paddingHorizontal: METRICS.padding,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: METRICS.padding,
    marginTop: METRICS.margin,
    marginBottom: METRICS.margin / 2,
  },
  recommendList: {
    paddingLeft: METRICS.padding,
    paddingRight: METRICS.padding - METRICS.margin / 1.5, // Agar padding kanan pas
  },
});

export default HomeScreen;