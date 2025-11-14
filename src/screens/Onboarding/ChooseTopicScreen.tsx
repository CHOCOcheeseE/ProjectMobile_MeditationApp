import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator, // (FIX) Impor ditambahkan
} from 'react-native';
// (FIX) Impor dipindahkan ke sini
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { METRICS } from '../../constants/metrics';
import TopicCard from '../../components/features/TopicCard';
import { ChooseTopicProps } from '../../navigation/types';
import { useAuth } from '../../context/AuthContext'; // (FIX) Jalur impor yang benar
import { fetchTopicsData } from '../../services/api'; // (FIX) Impor API
import { Topic } from '../../data/MockData'; // (FIX) Impor Tipe

const ChooseTopicScreen: React.FC<ChooseTopicProps> = () => {
  const { theme } = useTheme();
  // (FIX) Mengganti 'signIn' dengan 'completeOnboarding'
  const { completeOnboarding } = useAuth();

  // (FIX) State untuk API
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchTopicsData();
        setTopics(data.topics);
      } catch (e: any) { // (FIX) Memberi tipe 'any' pada 'e'
        setError(e.message || 'Gagal memuat topik');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadTopics();
  }, []);

  const onTopicPress = (title: string) => {
    console.log('Topic selected:', title);
    // (FIX) Panggil 'completeOnboarding'
    completeOnboarding();
  };

  // (FIX) Menampilkan loading indicator
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

  // (FIX) Menampilkan error
  if (error) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: theme.background }]}>
        <View style={styles.centered}>
          {/* (FIX) Style tidak lagi inline */}
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            What Brings you
          </Text>
          <Text style={[styles.title, { color: theme.text }]}>
            to Silent Moon?
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            choose a topic to focus on:
          </Text>
        </View>

        <FlatList
          data={topics} // (FIX) Menggunakan data dari state
          keyExtractor={item => item.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.row}
          renderItem={({ item, index }) => {
            const isRed = (index + 1) % 4 === 2;
            const isYellow = (index + 1) % 4 === 3;
            return (
              <TopicCard
                title={item.title}
                imageSource={item.image}
                onPress={() => onTopicPress(item.title)}
                isRed={isRed}
                isYellow={isYellow}
              />
            );
          }}
        />
      </View>
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
  // (FIX) Style untuk error, tidak lagi inline
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
  header: {
    alignItems: 'center',
    marginTop: METRICS.margin,
    marginBottom: METRICS.margin,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: METRICS.margin / 2,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default ChooseTopicScreen;