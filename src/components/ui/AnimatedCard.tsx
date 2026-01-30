import React, { useEffect } from 'react';
import {
    StyleSheet,
    ViewStyle,
    TouchableOpacity,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withDelay,
} from 'react-native-reanimated';

interface AnimatedCardProps {
    children: React.ReactNode;
    delay?: number;
    style?: ViewStyle;
    onPress?: () => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedCard: React.FC<AnimatedCardProps> = ({
    children,
    delay = 0,
    style,
    onPress,
}) => {
    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(30);

    useEffect(() => {
        // Animasi masuk dengan delay
        scale.value = withDelay(delay, withSpring(1, { damping: 12, stiffness: 100 }));
        opacity.value = withDelay(delay, withSpring(1, { damping: 12, stiffness: 100 }));
        translateY.value = withDelay(delay, withSpring(0, { damping: 12, stiffness: 100 }));
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: scale.value },
            { translateY: translateY.value },
        ],
        opacity: opacity.value,
    }));

    if (onPress) {
        return (
            <AnimatedTouchable
                style={[styles.container, style, animatedStyle]}
                onPress={onPress}
                activeOpacity={0.85}
            >
                {children}
            </AnimatedTouchable>
        );
    }

    return (
        <Animated.View style={[styles.container, style, animatedStyle]}>
            {children}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Shadow untuk iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        // Shadow untuk Android
        elevation: 5,
    },
});

export default AnimatedCard;
