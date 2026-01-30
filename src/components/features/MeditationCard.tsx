import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import { METRICS } from '../../constants/metrics';

interface MeditationCardProps {
  title: string;
  imageSource: ImageSourcePropType | { uri: string };
  onPress: () => void;
  index?: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const MeditationCard: React.FC<MeditationCardProps> = ({
  title,
  imageSource,
  onPress,
  index = 0,
}) => {
  const { theme } = useTheme();

  // Animasi nilai
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    const delay = index * 80;
    animationProgress.value = withDelay(
      delay,
      withSpring(1, { damping: 14, stiffness: 85 })
    );
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animationProgress.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP
    ),
    transform: [
      {
        translateY: interpolate(
          animationProgress.value,
          [0, 1],
          [25, 0],
          Extrapolation.CLAMP
        ),
      },
      {
        scale: interpolate(
          animationProgress.value,
          [0, 1],
          [0.92, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  return (
    <AnimatedTouchable
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          borderColor: theme.cardBorder,
          shadowColor: theme.shadowColor,
        },
        animatedStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
        <View style={styles.imageOverlay} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {title}
        </Text>
      </View>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: METRICS.margin,
    borderRadius: METRICS.radius + 4,
    overflow: 'hidden',
    borderWidth: 1,
    // Shadow premium
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  imageContainer: {
    height: 140,
    width: '100%',
    backgroundColor: '#E8E8F0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  textContainer: {
    padding: 14,
    justifyContent: 'center',
    minHeight: 65,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
});

export default MeditationCard;