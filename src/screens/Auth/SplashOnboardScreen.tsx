import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { SplashOnboardProps } from '../../navigation/types';

const SplashOnboardScreen = ({ navigation }: SplashOnboardProps) => {
  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  const onLogInPress = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Silent</Text>
          <Text style={styles.logoText}> ☁️ Moon</Text>
        </View>

        <View style={styles.imageContainer}>
          {/* Ilustrasi menggunakan Ionicons */}
          <View style={styles.iconWrapper}>
            <Ionicons 
              name="moon" 
              size={220} 
              color="#8E97FD" 
              style={styles.mainIcon}
            />
            <View style={styles.starsContainer}>
              <Ionicons name="sparkles" size={50} color="#FFD700" style={styles.star1} />
              <Ionicons name="sparkles" size={35} color="#FFC700" style={styles.star2} />
              <Ionicons name="sparkles" size={40} color="#FFE066" style={styles.star3} />
              <Ionicons name="sparkles" size={30} color="#FFD700" style={styles.star4} />
            </View>
            <View style={styles.cloudContainer}>
              <Ionicons name="cloud" size={60} color="#E8E8E8" style={styles.cloud1} />
              <Ionicons name="cloud" size={50} color="#F0F0F0" style={styles.cloud2} />
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>We are what we do</Text>
          <Text style={styles.subtitle}>
            Thousand of people are using silent moon for small meditation
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.signUpButton}
            onPress={onSignUpPress}>
            <Text style={styles.signUpButtonText}>SIGN UP</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logInButton} onPress={onLogInPress}>
            <Text style={styles.logInButtonText}>
              ALREADY HAVE AN ACCOUNT?{' '}
              <Text style={styles.logInTextBold}>LOG IN</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F414E',
  },
  imageContainer: {
    flex: 3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  iconWrapper: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  mainIcon: {
    opacity: 0.9,
  },
  starsContainer: {
    position: 'absolute',
    width: 300,
    height: 300,
  },
  star1: {
    position: 'absolute',
    top: 30,
    right: 40,
    opacity: 0.9,
  },
  star2: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    opacity: 0.7,
  },
  star3: {
    position: 'absolute',
    top: 80,
    left: 50,
    opacity: 0.8,
  },
  star4: {
    position: 'absolute',
    bottom: 80,
    right: 60,
    opacity: 0.6,
  },
  cloudContainer: {
    position: 'absolute',
    width: 300,
    height: 300,
  },
  cloud1: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    opacity: 0.5,
  },
  cloud2: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    opacity: 0.4,
  },
  contentContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#3F414E',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#A1A4B2',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    flex: 1.5,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#8E97FD',
    paddingVertical: 18,
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logInButton: {
    // Tidak perlu style khusus
  },
  logInButtonText: {
    color: '#A1A4B2',
    fontSize: 14,
  },
  logInTextBold: {
    fontWeight: 'bold',
    color: '#8E97FD',
  },
});

export default SplashOnboardScreen;