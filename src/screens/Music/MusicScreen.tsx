import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
// (FIX) Impor dipindahkan ke sini
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { METRICS } from '../../constants/metrics';
// (FIX) Impor tipe navigasi yang benar
import { MusicStackScreenProps } from '../../navigation/types';
// (FIX) Impor API dengan jalur yang benar
import { fetchMusicData } from '../../services/api';
// (FIX) Impor tipe data 'MusicTrack'
import { MusicTrack } from '../../data/MockData';

// (FIX) Tipe props yang benar untuk layar ini
type Props = MusicStackScreenProps<'MusicList'>;

const MusicScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();

  // State untuk API (sesuai Kriteria 6)
  const [music, setMusic] = useState<MusicTrack[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMusic = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchMusicData();
        setMusic(data);
      } catch (e: any) {
        // Perbaikan error sintaks ('catch' block)
        setError(e.message || 'Gagal memuat musik');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    loadMusic();
  }, []);

  const onTrackPress = (item: MusicTrack) => {
    // (FIX) Sekarang 'item' memiliki properti ini
    navigation.navigate('Player', {
      title: item.title,
      subtitle: item.subtitle,
      image: item.image,
      trackUrl: item.trackUrl,
    });
  };

  // Penanganan state Loading
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

  // Penanganan state Error
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

  // Tampilan data
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <FlatList
        data={music}
        keyExtractor={item => item.id} // (FIX) Sekarang 'item.id' ada
        contentContainerStyle={styles.container}
        ListHeaderComponent={
          <>
            <Text style={[styles.title, { color: theme.text }]}>Music</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Relaxing sounds from the iTunes API
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.trackItem}
            onPress={() => onTrackPress(item)}>
            <Image
              source={item.image} // (FIX) Sekarang 'item.image' ada
              style={styles.trackImage}
            />
            <View style={styles.trackInfo}>
              <Text style={[styles.trackTitle, { color: theme.text }]}>
                {item.title} {/* (FIX) Sekarang 'item.title' ada */}
              </Text>
              <Text style={[styles.trackSubtitle, { color: theme.textSecondary }]}>
                {item.subtitle} {/* (FIX) Sekarang 'item.subtitle' ada */}
              </Text>
            </View>
          </TouchableOpacity>
        )}
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
    marginBottom: METRICS.margin,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: METRICS.margin / 1.5,
  },
  trackImage: {
    width: 60,
    height: 60,
    borderRadius: METRICS.radius / 2,
  },
  trackInfo: {
    flex: 1,
    marginLeft: METRICS.margin / 1.5,
  },
  trackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  trackSubtitle: {
    fontSize: 14,
  },
});

export default MusicScreen;