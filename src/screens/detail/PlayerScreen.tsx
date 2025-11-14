// Kriteria 3 & 5: Layar detail untuk navigasi
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  // (FIX) 'ImageSourcePropType' dihapus karena tidak terpakai
  ImageBackground,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { METRICS } from '../../constants/metrics';
import { Ionicons as Icon } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// (FIX) Mengganti tipe 'HomeStackParamList' ke 'MeditateStackParamList'
// (Sebenarnya tidak masalah, karena 'Player' sama di semua stack)
import { MeditateStackParamList } from '../../navigation/types';

// Tipe props ini agak rumit karena bisa datang dari stack mana saja
// Kita ambil satu saja sebagai contoh, 'Player' params-nya sama
type Props = NativeStackScreenProps<MeditateStackParamList, 'Player'>;

const PlayerScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme } = useTheme();
  // (FIX) Ambil data dari route.params
  const { title, subtitle, image } = route.params;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ImageBackground
        source={image}
        style={styles.imageBackground}
        blurRadius={10}>
        {/* Tombol back kustom */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-down" size={32} color={theme.white} />
        </TouchableOpacity>

        <View style={styles.contentContainer}>
          {/* Gambar Album */}
          <View style={styles.imageContainer}>
            <Image
              source={image}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          {/* (FIX) Menggunakan 'theme.text' untuk warna yang benar di Dark Mode */}
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {subtitle}
          </Text>
        </View>

        {/* Kontrol Player */}
        <View style={styles.controlsContainer}>
          {/* Kontrol Player (Tombol palsu) */}
          <Icon name="shuffle" size={28} color={theme.textSecondary} />
          <Icon name="play-skip-back" size={32} color={theme.text} />
          <View style={[styles.playButton, { backgroundColor: theme.primary }]}>
            <Icon name="play" size={40} color={theme.white} />
          </View>
          <Icon name="play-skip-forward" size={32} color={theme.text} />
          <Icon name="repeat" size={28} color={theme.textSecondary} />
        </View>
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
    paddingTop: METRICS.margin / 2, // Padding untuk tombol back
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
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
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
    paddingLeft: 5, // Sesuaikan agar ikon play terlihat di tengah
  },
});

export default PlayerScreen;