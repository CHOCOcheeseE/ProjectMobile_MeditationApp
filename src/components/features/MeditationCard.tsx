import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  ImageSourcePropType,
  Dimensions,
  View,
} from 'react-native';
import { METRICS } from '../../constants/metrics';
import { useTheme } from '../../context/ThemeContext'; // (Poin 4)

// (Poin 7) Tipe untuk props
type Props = {
  title: string;
  imageSource: ImageSourcePropType;
  onPress: () => void;
};

const { width } = Dimensions.get('window');
// (lebar layar - (padding horizontal * 2) - (jarak antar kartu)) / 2
const cardWidth = (width - METRICS.padding * 2 - METRICS.margin) / 2;

const MeditationCard: React.FC<Props> = ({
  title,
  imageSource,
  onPress,
}) => {
  const { theme } = useTheme(); // (Poin 4)

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ImageBackground
        source={imageSource}
        style={styles.image}
        imageStyle={styles.imageStyle}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: cardWidth * 1.2, // Buat kartu sedikit lebih tinggi dari lebarnya
    marginBottom: METRICS.margin,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end', // Dorong teks ke bawah
  },
  imageStyle: {
    borderRadius: METRICS.radius,
  },
  textContainer: {
    padding: METRICS.padding / 1.5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MeditationCard;