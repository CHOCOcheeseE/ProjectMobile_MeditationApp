import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { getUserProgress, UserProgress } from '../../services/api';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }: any) => {
    const { user, signOut } = useAuth();
    const { theme } = useTheme();
    const [stats, setStats] = useState<UserProgress | null>(null);
    const [loading, setLoading] = useState(true);

    // Load Stats
    useEffect(() => {
        const loadStats = async () => {
            if (user?.uid) {
                const data = await getUserProgress(user.uid);
                setStats(data);
            }
            setLoading(false);
        };
        loadStats();
    }, [user]);

    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (e: any) {
            Alert.alert("Error", e.message);
        }
    };

    const StatCard = ({ icon, label, value, color }: any) => (
        <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
            <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
                <Ionicons name={icon} size={24} color={color} />
            </View>
            <View>
                <Text style={[styles.statValue, { color: theme.text }]}>{value}</Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>{label}</Text>
            </View>
        </View>
    );

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.profileImagePlaceholder}>
                        <Text style={styles.profileInitial}>{user?.displayName ? user.displayName[0] : 'U'}</Text>
                    </View>
                    <Text style={[styles.userName, { color: theme.text }]}>
                        {user?.displayName || user?.email || 'Meditator'}
                    </Text>
                    <Text style={[styles.userEmail, { color: theme.textSecondary }]}>
                        {user?.email}
                    </Text>
                </View>

                {/* Stats Grid */}
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Your Progress</Text>

                {loading ? (
                    <ActivityIndicator size="large" color={theme.primary} style={{ marginVertical: 20 }} />
                ) : (
                    <View style={styles.statsGrid}>
                        <StatCard
                            icon="time"
                            label="Minutes Meditated"
                            value={stats?.totalMinutes || 0}
                            color="#4A90E2"
                        />
                        <StatCard
                            icon="trophy"
                            label="Current Streak"
                            value={(stats?.currentStreak || 0) + ' Days'}
                            color="#F5A623"
                        />
                        <StatCard
                            icon="infinite"
                            label="Sessions"
                            value={stats?.sessionsCompleted || 0}
                            color="#50E3C2"
                        />
                    </View>
                )}

                {/* Settings / Actions */}
                <View style={styles.actionSection}>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.cardBackground }]} onPress={handleSignOut}>
                        <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
                        <Text style={[styles.actionText, { color: "#FF6B6B" }]}>Sign Out</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingTop: 60,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#8E97FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8,
    },
    profileInitial: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    statsGrid: {
        gap: 15,
        marginBottom: 30,
    },
    statCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 15,
        gap: 15,
    },
    iconContainer: {
        padding: 10,
        borderRadius: 12,
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 12,
    },
    actionSection: {
        marginTop: 20,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 12,
        gap: 10,
    },
    actionText: {
        fontWeight: 'bold',
    }
});

export default ProfileScreen;
