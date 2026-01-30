import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons as Icon } from '@expo/vector-icons';

import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { METRICS } from '../../constants/metrics';
import { SignUpProps } from '../../navigation/types';

import CustomButton from '../../components/common/CustomButton';
import CustomTextInput from '../../components/common/CustomTextInput';

// Optimization Hooks
import { useFormValidation } from '../../hooks/useFormValidation';
import { useResponsive } from '../../hooks/useResponsive';

const SignUpScreen: React.FC<SignUpProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { signUp, signInWithGoogle, isLoading, error, clearError } = useAuth();

  // Custom Hook: useResponsive
  const { isSmallDevice, spacing, fontSize } = useResponsive();

  // Custom Hook: useFormValidation
  const {
    values,
    handleChange,
    validate,
    errors: formErrors,
    passwordStrength
  } = useFormValidation({
    name: '',
    email: '',
    password: ''
  });

  // Derived Values (Simple example, can be expanded)
  const isFormValid = values.name.length > 2 && values.email.includes('@') && values.password.length >= 6;

  // useCallback Optimization for handlers
  const onGetStarted = useCallback(async () => {
    // Validate form locally before sending
    const isValid = validate({
      name: (val) => val.length > 2 ? null : 'Name too short',
      email: (val) => val.includes('@') ? null : 'Invalid email',
      password: (val) => val.length >= 6 ? null : 'Password too short (min 6 chars)'
    });

    if (!isValid) return;

    try {
      const success = await signUp(values.name, values.email, values.password);
      if (success) {
        navigation.navigate('Welcome');
      }
    } catch (e: any) {
      // Error handled by AuthContext but we catch here just in case
    }
  }, [values, signUp, navigation, validate]);

  const onGoogleSignUp = useCallback(async () => {
    try {
      await signInWithGoogle();
    } catch (e: any) {
      // Error handled by AuthContext
    }
  }, [signInWithGoogle]);

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'red';
    if (passwordStrength <= 3) return 'orange';
    return 'green';
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={[styles.container, { paddingHorizontal: spacing.md }]}>
        <TouchableOpacity
          style={[styles.backButton, { marginTop: spacing.sm }]}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={theme.text} />
        </TouchableOpacity>

        <Text style={[styles.title, {
          color: theme.text,
          fontSize: fontSize.xl,
          marginVertical: spacing.md
        }]}>
          Create your account
        </Text>

        {/* Tombol Google */}
        <CustomButton
          title="CONTINUE WITH GOOGLE"
          onPress={onGoogleSignUp}
          variant="social"
          iconName="logo-google"
          disabled={isLoading}
        />

        <Text style={[styles.dividerText, {
          color: theme.textSecondary,
          marginVertical: spacing.md
        }]}>
          OR LOG IN WITH EMAIL
        </Text>

        {/* Form Input */}
        <CustomTextInput
          placeholder="Name"
          value={values.name}
          onChangeText={(text) => handleChange('name', text)}
          iconName="person-outline"
          isValid={values.name.length > 2}
          errorMessage={formErrors.name}
        />
        <CustomTextInput
          placeholder="Email address"
          value={values.email}
          onChangeText={(text) => handleChange('email', text)}
          iconName="mail-outline"
          isValid={values.email.includes('@')}
          keyboardType="email-address"
          errorMessage={formErrors.email}
        />
        <CustomTextInput
          placeholder="Password"
          value={values.password}
          onChangeText={(text) => handleChange('password', text)}
          iconName="lock-closed-outline"
          isPassword
          isValid={values.password.length >= 6}
          errorMessage={formErrors.password}
        />

        {/* Password Strength Indicator (Optimization Feature) */}
        {values.password.length > 0 && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, alignSelf: 'flex-start', marginLeft: 10 }}>
            <View style={{ height: 4, width: 100, backgroundColor: '#eee', borderRadius: 2, marginRight: 10 }}>
              <View style={{
                height: 4,
                width: `${(passwordStrength / 5) * 100}%`,
                backgroundColor: getPasswordStrengthColor(),
                borderRadius: 2
              }} />
            </View>
            <Text style={{ fontSize: 12, color: theme.textSecondary }}>
              Strength: {passwordStrength}/5
            </Text>
          </View>
        )}

        {(error) && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <View style={[styles.policyContainer, { marginVertical: spacing.md }]}>
          <Text style={[styles.policyText, { color: theme.textSecondary }]}>
            I have read the{' '}
            <Text style={[styles.policyLink, { color: theme.primary }]}>
              Privacy Policy
            </Text>
          </Text>
        </View>

        <CustomButton
          title={isLoading ? 'CREATING ACCOUNT...' : 'GET STARTED'}
          onPress={onGetStarted}
          variant="primary"
          disabled={isLoading}
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
    paddingBottom: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dividerText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
  policyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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