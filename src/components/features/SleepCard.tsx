import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';
import { METRICS } from '../../constants/metrics';
import { useTheme } from '../../context/ThemeContext';

// (Poin 7) Tipe untuk props
type Props = {
  title: string;
  subtitle: string;
  imageSource: ImageSourcePropType;
  onPress: () => void;
  isHero?: boolean; // Style khusus untuk kartu besar
};

const { width } = Dimensions.get('window');
// (lebar layar - (padding horizontal * 2) - (jarak antar kartu)) / 2
const cardWidth = (width - METRICS.padding * 2 - METRICS.margin) / 2;

const SleepCard: React.FC<Props> = ({
  title,
  subtitle,
  imageSource,
  onPress,
  isHero = false,
}) => {
  const { theme } = useTheme(); // (Poin 4)

  // (Poin 2) Tentukan style dinamis
  const containerStyle = isHero
    ? styles.heroContainer
    : [styles.cardContainer, { width: cardWidth }];

  const titleStyle = isHero ? styles.heroTitle : styles.cardTitle;
  const subtitleStyle = isHero ? styles.heroSubtitle : styles.cardSubtitle;

  return (
    <TouchableOpacity style={[containerStyle]} onPress={onPress}>
      <ImageBackground
        source={imageSource}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}>
        <View style={styles.textContainer}>
          <Text style={[titleStyle, { color: theme.text }]}>{title}</Text>
          <Text style={[subtitleStyle, { color: theme.textSecondary }]}>
            {subtitle}
          </Text>
        </View>

        {/* Tampilkan tombol START hanya di kartu hero */}
        {isHero && (
          <TouchableOpacity
            style={[styles.playButton, { backgroundColor: theme.white }]}>
            <Text style={[styles.playButtonText, { color: theme.darkGrey }]}>
              START
            </Text>
          </TouchableOpacity>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Style untuk kartu hero (besar)
  heroContainer: {
    width: '100%',
    height: 210, // Kartu besar
    borderRadius: METRICS.radius,
    overflow: 'hidden',
    marginBottom: METRICS.margin,
  },
  // Style untuk kartu grid (kecil)
  cardContainer: {
    height: 180, // Kartu kecil
    borderRadius: METRICS.radius,
    overflow: 'hidden',
    marginBottom: METRICS.margin,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'space-between',
    padding: METRICS.padding / 1.5,
  },
  imageStyle: {
    borderRadius: METRICS.radius,
    opacity: 0.7,
  },
  textContainer: {
    // Kontainer untuk teks di bagian atas
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  heroSubtitle: {
    fontSize: 14,
    marginTop: 5,
  },
  cardSubtitle: {
    fontSize: 12,
    marginTop: 3,
  },
  playButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start', // Posisikan di kiri bawah
  },
  playButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default SleepCard;