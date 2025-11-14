import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
// (FIX) Impor SafeAreaView dari context
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { METRICS } from '../../constants/metrics';
import SleepCard from '../../components/features/SleepCard';
// Impor Tipe
import { SleepStackScreenProps } from '../../navigation/types';
import { SleepTopic, PlayerTopic } from '../../data/MockData';
// Impor API
import { fetchSleepData, SleepDataResponse } from '../../services/api';

// Tipe untuk state data
type SleepDataState = {
  playerCard: PlayerTopic;
  topics: SleepTopic[];
};

const SleepScreen: React.FC<SleepStackScreenProps<'SleepList'>> = ({
  navigation,
}) => {
  const { theme } = useTheme();

  // State untuk API data
  const [sleepData, setSleepData] = useState<SleepDataState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data: SleepDataResponse = await fetchSleepData(); // Panggil API
        setSleepData({
          playerCard: data.playerCard,
          topics: data.topics,
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

  // (UPDATE) Logika navigasi kondisional
  const onTopicPress = (item: PlayerTopic | SleepTopic) => {
    // Di layar ini, kita asumsikan semua adalah 'music'
    // Sesuai desain Figma "Sleep Music"
    if (item.type === 'music') {
      navigation.navigate('Player', {
        title: item.title,
        subtitle: item.subtitle,
        image: item.image,
        // trackUrl: (item as MusicTrack).trackUrl, // Jika ada
      });
    } else {
      // Fallback jika ada tutorial
      navigation.navigate('Tutorial', {
        title: item.title,
        subtitle: item.subtitle,
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

  // Tampilan Sukses (tapi data null)
  if (!sleepData) {
    return null;
  }

  // Komponen Header untuk FlatList
  const renderHeader = () => (
    <>
      {/* (UPDATE) Ganti nama Sesuai Figma */}
      <Text style={[styles.title, { color: theme.text }]}>Sleep Music</Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        Soothing bedtime music to help you fall into a deep and natural
        sleep.
      </Text>

      <SleepCard
        title={sleepData.playerCard.title}
        subtitle={sleepData.playerCard.subtitle}
        imageSource={sleepData.playerCard.image}
        isHero={true}
        onPress={() => onTopicPress(sleepData.playerCard)}
      />
    </>
  );

  // Fungsi render untuk grid
  const renderSleepTopic = ({ item }: { item: SleepTopic }) => {
    return (
      <SleepCard
        title={item.title}
        subtitle={item.subtitle}
        imageSource={item.image}
        onPress={() => onTopicPress(item)}
      />
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <FlatList
        data={sleepData.topics}
        keyExtractor={item => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.row}
        renderItem={renderSleepTopic}
      />
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
  container: {
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
  row: {
    justifyContent: 'space-between',
  },
});

export default SleepScreen;