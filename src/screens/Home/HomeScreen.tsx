import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackScreenProps } from '../../navigation/types';
import { Course, PlayerTopic } from '../../data/MockData';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { fetchHomeData, HomeDataResponse } from '../../services/api';
import { METRICS } from '../../constants/metrics';
import CourseCard from '../../components/features/CourseCard';
import PlayerCard from '../../components/features/PlayerCard';
import { useResponsive } from '../../hooks/useResponsive';

type HomeDataState = {
  courses: Course[];
  dailyThought: PlayerTopic;
  recommended: Course[];
};

const HomeScreen: React.FC<HomeStackScreenProps<'HomeList'>> = ({
  navigation,
}) => {
  const { user } = useAuth(); // Ambil data user dari Auth Context
  const { theme } = useTheme();

  const [homeData, setHomeData] = useState<HomeDataState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      const data: HomeDataResponse = await fetchHomeData();
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
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

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

  // Optimize with useResponsive
  const { isSmallDevice, spacing, fontSize } = useResponsive();

  // renderItem untuk FlatList Utama (Courses)
  const renderCourseItem = useCallback(({ item, index }: { item: Course; index: number }) => (
    <View style={{ flex: 1, paddingHorizontal: spacing.xs, marginBottom: spacing.md }}>
      <CourseCard
        item={item}
        onPress={() => onCoursePress(item)}
        index={index}
      />
    </View>
  ), [spacing, onCoursePress]);

  // Header Component (User Greeting)
  // Header Component (User Greeting)
  const renderHeader = useCallback(() => (
    <View style={styles.headerContainer}>
      <View>
        <Text style={[styles.title, { color: theme.text, marginTop: 0, paddingHorizontal: 0 }]}>
          Good Morning, {user?.displayName || (user?.email ? user.email.split('@')[0] : 'Guest')}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary, paddingHorizontal: 0 }]}>
          We Wish you have a good day
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={40} color={theme.text} />
        </TouchableOpacity>
      </View>
    </View>
  ), [theme, user, navigation]);

  // Footer Component (Daily Thought & Recommended)
  const renderFooter = useCallback(() => {
    if (!homeData) return null;

    return (
      <View style={{ paddingBottom: spacing.xl }}>
        {/* Daily Thought Section */}
        <View style={[styles.playerCardContainer, { marginTop: spacing.sm }]}>
          <PlayerCard
            title={homeData.dailyThought.title}
            subtitle={homeData.dailyThought.subtitle}
            imageSource={homeData.dailyThought.image}
            onPress={() => onPlayerPress(homeData.dailyThought)}
            delay={200}
          />
        </View>

        <Text style={[styles.sectionTitle, {
          color: theme.text,
          marginTop: spacing.lg,
          marginBottom: spacing.md
        }]}>
          Recommended for you
        </Text>

        {/* Horizontal List for Recommended - Nested FlatList is OK here */}
        <FlatList
          data={homeData.recommended}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <CourseCard
              item={item}
              onPress={() => onCoursePress(item)}
              isRecommended
              index={index}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recommendList}
          initialNumToRender={3}
        />
      </View>
    );
  }, [homeData, theme, spacing, onPlayerPress, onCoursePress]);

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

  // Fallback UI jika data kosong
  if (!homeData) return null;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* 
        OPTIMIZATION: Menggunakan FlatList sebagai container utama 
        menggantikan ScrollView untuk performa yang lebih baik.
      */}
      <FlatList
        data={homeData.courses}
        keyExtractor={(item) => item.id}
        renderItem={renderCourseItem}
        numColumns={2} // Grid Layout
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: METRICS.padding }}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      />
      {/* Floating Action Button (FAB) for Chat */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Chat')}
        activeOpacity={0.8}
      >
        <Ionicons name="chatbubble-ellipses" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  // ... (existing styles)
  fab: {
    position: 'absolute',
    bottom: METRICS.margin * 2,
    right: METRICS.margin,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#8E97FD', // Primary Blue
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    zIndex: 999,
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
  playerCardContainer: {
    paddingHorizontal: METRICS.padding,
    marginTop: METRICS.margin,
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
    paddingRight: METRICS.padding - METRICS.margin / 1.5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: METRICS.padding,
    paddingLeft: METRICS.padding,
    paddingTop: METRICS.padding,
    paddingBottom: METRICS.margin,
    backgroundColor: 'transparent',
  },
  profileButton: {
    marginTop: 10,
  },
});

export default HomeScreen;