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
import { useTheme } from '../../context/ThemeContext'; // (Poin 4)
// (FIX) Hapus impor Ikon yang tidak terpakai
// import Icon from 'react-native-vector-icons/Ionicons';

// (FIX) Definisikan tipe data 'Course' di sini agar konsisten
export type Course = {
  id: string;
  title: string;
  duration: string;
  image: ImageSourcePropType;
  category: string; // Pastikan 'category' ada di tipe ini
};

type Props = {
  item: Course; // Gunakan tipe yang sudah didefinisikan
  onPress: () => void;
  isRecommended?: boolean; // Untuk style horizontal
};

const { width } = Dimensions.get('window');
const horizontalCardWidth = width * 0.45;
const verticalCardWidth = (width - METRICS.padding * 2 - METRICS.margin) / 2;

const CourseCard: React.FC<Props> = ({ item, onPress, isRecommended }) => {
  const { theme } = useTheme(); // (Poin 4)

  const cardStyle = {
    width: isRecommended ? horizontalCardWidth : verticalCardWidth,
    height: isRecommended ? 160 : 200, // Buat kartu horizontal lebih pendek
    marginRight: isRecommended ? METRICS.margin / 1.5 : 0,
  };

  return (
    <TouchableOpacity style={[styles.container, cardStyle]} onPress={onPress}>
      <ImageBackground
        source={item.image}
        style={styles.imageBackground}
        imageStyle={styles.image}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {item.duration.toUpperCase()}
          </Text>
        </View>

        {/* Hanya tampilkan tombol START jika bukan kartu rekomendasi */}
        {!isRecommended && (
          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: theme.white }]}
          >
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
    borderRadius: METRICS.radius,
    overflow: 'hidden', // Penting agar ImageBackground tidak keluar
    marginBottom: METRICS.margin,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'space-between', // Dorong teks ke atas dan tombol ke bawah
    padding: METRICS.padding / 1.5,
  },
  image: {
    opacity: 0.7, // Sedikit redupkan gambar
  },
  textContainer: {
    // Kontainer untuk teks di bagian atas
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 11,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  startButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start', // Posisikan di kiri bawah
  },
  startButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CourseCard;