import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons as Icon } from '@expo/vector-icons';

import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { METRICS } from '../../constants/metrics';
import { ForgotPasswordProps } from '../../navigation/types';

import CustomButton from '../../components/common/CustomButton';
import CustomTextInput from '../../components/common/CustomTextInput';

const ForgotPasswordScreen: React.FC<ForgotPasswordProps> = ({ navigation }) => {
    const { theme } = useTheme();
    const { resetPassword, isLoading, error, clearError } = useAuth();
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const onResetPassword = async () => {
        if (!email.includes('@')) {
            Alert.alert('Error', 'Masukkan email yang valid');
            return;
        }

        clearError();
        const result = await resetPassword(email);

        if (result) {
            setSuccess(true);
            Alert.alert(
                'Email Terkirim!',
                `Link reset password telah dikirim ke ${email}. Silakan cek inbox atau folder spam.`,
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-back" size={28} color={theme.text} />
                </TouchableOpacity>

                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Icon name="lock-open-outline" size={60} color={theme.primary} />
                    </View>

                    <Text style={[styles.title, { color: theme.text }]}>
                        Forgot Password?
                    </Text>

                    <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                        Masukkan email yang terdaftar. Kami akan mengirimkan link untuk reset password.
                    </Text>

                    <CustomTextInput
                        placeholder="Email address"
                        value={email}
                        onChangeText={setEmail}
                        iconName="mail-outline"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {error && (
                        <Text style={styles.errorText}>{error}</Text>
                    )}

                    {success && (
                        <Text style={styles.successText}>
                            Email reset password telah dikirim!
                        </Text>
                    )}

                    <CustomButton
                        title={isLoading ? 'MENGIRIM...' : 'KIRIM LINK RESET'}
                        onPress={onResetPassword}
                        variant="primary"
                        disabled={isLoading || !email}
                    />

                    <TouchableOpacity
                        style={styles.backToLogin}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={[styles.backToLoginText, { color: theme.textSecondary }]}>
                            Kembali ke <Text style={{ color: theme.primary, fontWeight: 'bold' }}>Login</Text>
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
    },
    container: {
        flex: 1,
        paddingHorizontal: METRICS.padding,
    },
    backButton: {
        marginTop: METRICS.margin / 2,
        alignSelf: 'flex-start',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 100,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: METRICS.margin * 2,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: METRICS.margin,
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: METRICS.margin * 2,
        lineHeight: 22,
        paddingHorizontal: METRICS.padding,
    },
    errorText: {
        color: '#FF6B6B',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 14,
    },
    successText: {
        color: '#4CAF93',
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 14,
        fontWeight: '600',
    },
    backToLogin: {
        marginTop: METRICS.margin * 2,
        alignItems: 'center',
    },
    backToLoginText: {
        fontSize: 14,
    },
});

export default ForgotPasswordScreen;
