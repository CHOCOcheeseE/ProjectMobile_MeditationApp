import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface GradientBackgroundProps {
    colors?: string[];
    children: React.ReactNode;
    style?: ViewStyle;
}

/**
 * Komponen gradient background sederhana menggunakan View berlapis
 * Tidak perlu library tambahan, tetap terlihat premium
 */
const GradientBackground: React.FC<GradientBackgroundProps> = ({
    colors = ['#667eea', '#764ba2'],
    children,
    style,
}) => {
    return (
        <View style={[styles.container, { backgroundColor: colors[0] }, style]}>
            <View style={[styles.overlay, { backgroundColor: colors[1] }]} />
            <View style={styles.content}>{children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.6,
    },
    content: {
        flex: 1,
        zIndex: 1,
    },
});

export default GradientBackground;
