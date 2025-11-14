import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { METRICS } from '../../constants/metrics';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// (FIX) Impor HomeStackParamList
import { HomeStackParamList } from '../../navigation/types';

// (FIX) Sederhanakan Tipe Props
type Props = NativeStackScreenProps<HomeStackParamList, 'Tutorial'>;

const TutorialScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { title, subtitle, image, description } = route.params;

  const onShare = async () => {
    try {
      await Share.share({
        message: `Ayo coba ${title} di Silent Moon! ${description.substring(
          0,
          100,
        )}...`,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <ImageBackground source={image} style={styles.imageBackground}>
          {/* Header Kustom */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color={theme.text} />
            </TouchableOpacity>
            <View style={styles.headerIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="heart-outline" size={24} color={theme.text} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={onShare}>
                <Ionicons name="share-outline" size={24} color={theme.text} />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {/* Konten Teks */}
        <ScrollView
          style={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {subtitle.toUpperCase()}
          </Text>
          <Text style={[styles.description, { color: theme.text }]}>
            {description}
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  imageBackground: {
    width: '100%',
    height: METRICS.screenHeight * 0.4,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: METRICS.padding,
    paddingTop: METRICS.margin, // Padding untuk status bar
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    marginHorizontal: 5,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: -20, // Tarik ke atas menutupi gambar
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: METRICS.padding,
    paddingTop: METRICS.margin,
    // (FIX) Tambahkan background color dari theme agar menutupi gambar
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
});

export default TutorialScreen;