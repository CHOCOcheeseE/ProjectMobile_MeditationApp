import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { METRICS } from '../../constants/metrics';
import { Ionicons as Icon } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MeditateStackParamList } from '../../navigation/types';
import { Audio } from 'expo-av';

type Props = NativeStackScreenProps<MeditateStackParamList, 'Player'>;

const PlayerScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { title, subtitle, image, trackUrl } = route.params;

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load Sound
  useEffect(() => {
    let soundObject: Audio.Sound | null = null;

    const loadAudio = async () => {
      if (!trackUrl) return;

      setIsLoading(true);
      try {
        console.log('Loading Sound:', trackUrl);
        const { sound } = await Audio.Sound.createAsync(
          { uri: trackUrl },
          { shouldPlay: true }
        );
        soundObject = sound;
        setSound(sound);
        setIsPlaying(true);

        // Handle finish
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
            sound.setPositionAsync(0);
          }
        });

      } catch (error) {
        console.error('Error loading sound', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (trackUrl) {
      loadAudio();
    }

    // Cleanup
    return () => {
      if (soundObject) {
        console.log('Unloading Sound');
        soundObject.unloadAsync();
      }
    };
  }, [trackUrl]);

  const togglePlayback = async () => {
    if (!sound) return;

    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  };

  const handleSeek = async (seconds: number) => {
    if (!sound) return;
    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      let newPosition = status.positionMillis + (seconds * 1000);
      if (newPosition < 0) newPosition = 0;
      await sound.setPositionAsync(newPosition);
    }
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ImageBackground
        source={image}
        style={styles.imageBackground}
        blurRadius={10}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-down" size={32} color={theme.white} />
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          {/* Album Art */}
          <View style={styles.imageContainer}>
            <Image
              source={image}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {subtitle}
          </Text>
        </View>

        {/* Player Controls */}
        <View style={styles.controlsContainer}>
          <TouchableOpacity onPress={() => console.log('Shuffle')}>
            <Icon name="shuffle" size={28} color={theme.textSecondary} />
          </TouchableOpacity>

          {/* Rewind 10s */}
          <TouchableOpacity onPress={() => handleSeek(-10)}>
            <Icon name="play-skip-back" size={32} color={theme.text} />
          </TouchableOpacity>

          {/* Play/Pause Button */}
          <TouchableOpacity
            style={[styles.playButton, { backgroundColor: theme.primary }]}
            onPress={togglePlayback}
            disabled={isLoading || !trackUrl}
          >
            {isLoading ? (
              <ActivityIndicator color={theme.white} size="large" />
            ) : (
              <Icon name={isPlaying ? "pause" : "play"} size={40} color={theme.white} />
            )}
          </TouchableOpacity>

          {/* Forward 10s */}
          <TouchableOpacity onPress={() => handleSeek(10)}>
            <Icon name="play-skip-forward" size={32} color={theme.text} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => console.log('Repeat')}>
            <Icon name="repeat" size={28} color={theme.textSecondary} />
          </TouchableOpacity>
        </View>

        {!trackUrl && (
          <Text style={{ textAlign: 'center', color: theme.textSecondary, marginBottom: 20 }}>
            (Preview Only - No Audio URL)
          </Text>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    paddingHorizontal: METRICS.padding,
    paddingTop: METRICS.margin / 2,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: METRICS.screenWidth * 0.7,
    height: METRICS.screenWidth * 0.7,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: METRICS.margin * 2,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: METRICS.padding,
    marginBottom: METRICS.margin,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 3,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});

export default PlayerScreen;