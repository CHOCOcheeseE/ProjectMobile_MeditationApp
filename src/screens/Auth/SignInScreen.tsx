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
import { useAuth } from '../../context/AuthContext'; // (FIX) Jalur impor yang benar
import { METRICS } from '../../constants/metrics';
import { SignInProps } from '../../navigation/types';

// (FIX) Impor komponen yang menggunakan useTheme
import CustomButton from '../../components/common/CustomButton';
import CustomTextInput from '../../components/common/CustomTextInput';

const SignInScreen: React.FC<SignInProps> = ({ navigation }) => {
  const { theme } = useTheme();
  // (FIX) Ambil isLoading dan error dari context
  const { signIn, isLoading, error } = useAuth();
  const [email, setEmail] = useState('eve.holt@reqres.in'); // (FIX) Contoh email (UPDATE: Sesuai petunjuk API)
  const [password, setPassword] = useState('pistol'); // (FIX) Contoh password (UPDATE: Sesuai petunjuk API)
  const [localError, setLocalError] = useState<string | null>(null);

  const onLogin = async () => {
    setLocalError(null);
    try {
      // (FIX) Kriteria 6: Panggil API signIn dari context
      // Navigasi tidak perlu di sini, Root navigator akan handle
      await signIn(email, password);
    } catch (e: any) {
      // Tangkap error jika login gagal
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

        <Text style={[styles.title, { color: theme.text }]}>Welcome Back!</Text>

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
          placeholder="Email address"
          value={email}
          onChangeText={setEmail}
          iconName="mail-outline"
          keyboardType="email-address"
        />
        <CustomTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          iconName="lock-closed-outline"
          isPassword
        />

        {/* (FIX) Tampilkan error API */}
        {(error || localError) && (
          <Text style={styles.errorText}>{error || localError}</Text>
        )}

        {/* Tombol Utama */}
        <CustomButton
          title={isLoading ? 'LOGGING IN...' : 'LOG IN'}
          onPress={onLogin}
          variant="primary"
          disabled={isLoading} // (FIX) Disable tombol saat loading
        />

        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.forgotText, { color: theme.text }]}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            DON'T HAVE AN ACCOUNT?{' '}
            <Text
              style={[styles.footerLink, { color: theme.primary }]}
              onPress={() => navigation.navigate('SignUp')}>
              SIGN UP
            </Text>
          </Text>
        </View>
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
  forgotText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: METRICS.margin,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: METRICS.margin * 2,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontWeight: 'bold',
  },
});

export default SignInScreen;