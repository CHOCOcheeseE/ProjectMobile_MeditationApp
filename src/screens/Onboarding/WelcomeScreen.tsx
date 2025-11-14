import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
// (FIX) Impor dipindahkan ke sini
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../context/ThemeContext';
import { METRICS } from '../../constants/metrics';
import { WelcomeProps } from '../../navigation/types';
import CustomButton from '../../components/common/CustomButton';

const WelcomeScreen: React.FC<WelcomeProps> = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Hi Afsar, Welcome
          </Text>
          <Text style={[styles.title, { color: theme.text }]}>
            to Silent Moon
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Explore the app, Find some peace of mind to prepare for meditation.
          </Text>
        </View>

        <View style={styles.imageContainer}>
          {/* Ilustrasi menggunakan Ionicons sebagai pengganti gambar */}
          <View style={styles.iconWrapper}>
            <Ionicons 
              name="moon" 
              size={180} 
              color={theme.tabActive || '#8E97FD'} 
              style={styles.mainIcon}
            />
            <View style={styles.starsContainer}>
              <Ionicons name="sparkles" size={40} color="#FFD700" style={styles.star1} />
              <Ionicons name="sparkles" size={30} color="#FFC700" style={styles.star2} />
              <Ionicons name="sparkles" size={35} color="#FFE066" style={styles.star3} />
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="GET STARTED"
            onPress={() => navigation.navigate('ChooseTopic')}
            variant="primary"
          />
        </View>
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
    alignItems: 'center',
    paddingHorizontal: METRICS.padding,
  },
  header: {
    alignItems: 'center',
    marginTop: METRICS.margin * 2,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: METRICS.margin,
    paddingHorizontal: METRICS.padding,
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: METRICS.margin,
  },
  iconWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainIcon: {
    opacity: 0.9,
  },
  starsContainer: {
    position: 'absolute',
    width: 250,
    height: 250,
  },
  star1: {
    position: 'absolute',
    top: 20,
    right: 30,
    opacity: 0.8,
  },
  star2: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    opacity: 0.7,
  },
  star3: {
    position: 'absolute',
    top: 60,
    left: 40,
    opacity: 0.6,
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: METRICS.padding,
  },
});

export default WelcomeScreen;