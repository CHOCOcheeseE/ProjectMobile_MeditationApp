import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';
import { METRICS } from '../../constants/metrics';
import { useTheme } from '../../context/ThemeContext'; // (FIX) Impor useTheme

type Props = {
  title: string;
  imageSource: ImageSourcePropType;
  onPress: () => void;
  isRed?: boolean;
  isYellow?: boolean;
};

const { width } = Dimensions.get('window');
const cardWidth = (width - METRICS.padding * 2 - METRICS.margin) / 2;

// (Poin 8) Warna kustom sesuai Figma
const RED_COLOR = '#F9A88C';
const YELLOW_COLOR = '#FAD57B';
const GREEN_COLOR = '#AFEAAA';
// Warna default akan diambil dari theme.primary

const TopicCard: React.FC<Props> = ({
  title,
  imageSource,
  onPress,
  isRed = false,
  isYellow = false,
}) => {
  const { theme } = useTheme(); // (FIX) Gunakan hook tema

  // Tentukan warna latar
  let backgroundColor = theme.primary;
  if (isRed) {
    backgroundColor = RED_COLOR;
  } else if (isYellow) {
    backgroundColor = YELLOW_COLOR;
  } else if (title === 'Personal Growth') {
    // Contoh lain, bisa di-hardcode
    backgroundColor = GREEN_COLOR;
  }

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.title, { color: theme.darkGrey }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: cardWidth * 1.25, // Buat kartu tinggi
    borderRadius: METRICS.radius,
    padding: METRICS.padding / 1.5,
    justifyContent: 'space-between', // Dorong teks ke bawah
    marginBottom: METRICS.margin,
  },
  image: {
    width: '100%',
    height: '60%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TopicCard;