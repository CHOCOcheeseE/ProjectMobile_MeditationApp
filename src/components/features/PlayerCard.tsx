import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ImageSourcePropType,
} from 'react-native';
import { METRICS } from '../../constants/metrics';
import { useTheme } from '../../context/ThemeContext'; // (Poin 4)
// (FIX) Menggunakan @expo/vector-icons dan alias 'as Icon'
import { Ionicons as Icon } from '@expo/vector-icons';

type Props = {
  title: string;
  subtitle: string;
  imageSource: ImageSourcePropType;
  onPress: () => void;
  showPlayButton?: boolean;
  startButton?: boolean;
};

const PlayerCard: React.FC<Props> = ({
  title,
  subtitle,
  imageSource,
  onPress,
  showPlayButton = true, // Default true untuk Daily Thought
  startButton = false, // Default false
}) => {
  const { theme } = useTheme(); // (Poin 4)

  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={imageSource}
        style={[styles.container, { backgroundColor: theme.cardBackground }]}
        imageStyle={styles.image}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {subtitle}
          </Text>
        </View>

        {/* (Poin 3) Tampilkan tombol play atau start */}
        {showPlayButton && (
          <TouchableOpacity
            style={[styles.playButton, { backgroundColor: theme.white }]}>
            <Icon name="play" size={20} color={theme.darkGrey} />
          </TouchableOpacity>
        )}
        {startButton && (
          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: theme.white }]}>
            <Text style={[styles.startButtonText, { color: theme.darkGrey }]}>
              START
            </Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 110,
    borderRadius: METRICS.radius,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: METRICS.padding,
    overflow: 'hidden',
    marginTop: METRICS.margin,
  },
  image: {
    opacity: 0.5, // Sedikit redupkan gambar latar
  },
  textContainer: {
    flex: 1, // Agar teks mengambil ruang
    marginRight: METRICS.margin,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  startButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default PlayerCard;