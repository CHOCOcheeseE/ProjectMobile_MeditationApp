import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  // (FIX) Impor 'ActivityIndicator' dihapus karena tidak terpakai
  Text,
} from 'react-native';
// (FIX) Impor dipindahkan ke sini
import { SafeAreaView } from 'react-native-safe-area-context';
// (FIX) Menggunakan @expo/vector-icons dan alias 'as Icon'
import { Ionicons as Icon } from '@expo/vector-icons';

// (FIX) Impor yang benar
import { useTheme } from '../../context/ThemeContext';
// (FIX) Impor useAuth
import { useAuth } from '../../context/AuthContext'; // (FIX) Jalur impor yang benar
import { METRICS } from '../../constants/metrics';
import { SignUpProps } from '../../navigation/types';

// (FIX) Impor komponen yang menggunakan useTheme
import CustomButton from '../../components/common/CustomButton';
import CustomTextInput from '../../components/common/CustomTextInput';

const SignUpScreen: React.FC<SignUpProps> = ({ navigation }) => {
  const { theme } = useTheme();
  // (FIX) Ambil signUp, isLoading, dan error
  const { signUp, isLoading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('eve.holt@reqres.in'); // (FIX) Contoh email
  const [password, setPassword] = useState('pistol'); // (FIX) Contoh password
  const [localError, setLocalError] = useState<string | null>(null);

  const onGetStarted = async () => {
    setLocalError(null);
    try {
      // (FIX) Kriteria 6: Panggil API signUp dan cek status sukses
      const success = await signUp(name, email, password);

      if (success) {
        // (FIX) Jika sukses, lanjut ke alur onboarding
        navigation.navigate('Welcome');
      }
      // Jika !success, error akan ditampilkan oleh state 'error' dari context
    } catch (e: any) {
      setLocalError(e.message);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: theme.text }]}>
          Create your account
        </Text>

        {/* Tombol Sosial */}
        <CustomButton
          title="CONTINUE WITH FACEBOOK"
          onPress={() => {}}
          variant="social"
          iconName="logo-facebook"
        />
        <CustomButton
          title="CONTINUE WITH GOOGLE"
          onPress={() => {}}
          variant="social"
          iconName="logo-google"
        />

        <Text style={[styles.dividerText, { color: theme.textSecondary }]}>
          OR LOG IN WITH EMAIL
        </Text>

        {/* Form Input */}
        <CustomTextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          iconName="person-outline"
          isValid={name.length > 2} // Contoh validasi (Poin 4)
        />
        <CustomTextInput
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          iconName="mail-outline"
          isValid={email.includes('@')} // Contoh validasi (Poin 4)
          keyboardType="email-address"
        />
        <CustomTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          iconName="lock-closed-outline"
          isPassword
          isValid={password.length >= 6} // Contoh validasi (Poin 4)
        />

        {/* (FIX) Tampilkan error API */}
        {(error || localError) && (
          <Text style={styles.errorText}>{error || localError}</Text>
        )}

        {/* Checkbox (Simulasi) */}
        <View style={styles.policyContainer}>
          <Text style={[styles.policyText, { color: theme.textSecondary }]}>
            I have read the{' '}
            <Text style={[styles.policyLink, { color: theme.primary }]}>
              Privacy Policy
            </Text>
          </Text>
        </View>

        {/* Tombol Utama */}
        <CustomButton
          title={isLoading ? 'CREATING ACCOUNT...' : 'GET STARTED'}
          onPress={onGetStarted}
          variant="primary"
          disabled={isLoading} // (FIX)
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: METRICS.padding,
    paddingBottom: METRICS.padding,
  },
  backButton: {
    marginTop: METRICS.margin / 2,
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: METRICS.margin,
  },
  dividerText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: METRICS.margin,
  },
  // (FIX) Style untuk error text
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
  policyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: METRICS.margin,
    paddingHorizontal: 5,
  },
  policyText: {
    fontSize: 14,
  },
  policyLink: {
    fontWeight: 'bold',
  },
});

export default SignUpScreen;