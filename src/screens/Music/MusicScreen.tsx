import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MusicStackScreenProps } from '../../navigation/types';
import { MusicTrack } from '../../data/MockData';
import { useTheme } from '../../context/ThemeContext';
import { fetchMusicData } from '../../services/api';
import { METRICS } from '../../constants/metrics';
import CourseCard from '../../components/features/CourseCard';

const MusicScreen: React.FC<MusicStackScreenProps<'MusicList'>> = ({ navigation }) => {
  const { theme } = useTheme();
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMusic = async () => {
      try {
        const data = await fetchMusicData();
        setTracks(data);
      } catch (error) {
        console.error("Failed to load music", error);
      } finally {
        setLoading(false);
      }
    };
    loadMusic();
  }, []);

  const onTrackPress = (item: MusicTrack) => {
    navigation.navigate('Player', {
      title: item.title,
      subtitle: item.subtitle,
      image: item.image,
      trackUrl: item.trackUrl, // Pass URL ke Player
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.headerTitle, { color: theme.text }]}>Meditation Music</Text>
      <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
        Relax your mind with calming sounds
      </Text>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item, index }) => (
          <CourseCard
            item={item}
            onPress={() => onTrackPress(item)}
            index={index}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginLeft: METRICS.padding,
    marginTop: METRICS.margin,
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: METRICS.padding,
    marginTop: 6,
    marginBottom: METRICS.margin,
    letterSpacing: 0.2,
  },
  listContent: {
    paddingHorizontal: METRICS.padding,
    paddingBottom: METRICS.padding,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default MusicScreen;