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
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { METRICS } from '../../constants/metrics';

interface SleepCardProps {
  title: string;
  subtitle: string;
  imageSource: ImageSourcePropType | { uri: string };
  isHero?: boolean;
  onPress: () => void;
  index?: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const SleepCard: React.FC<SleepCardProps> = ({
  title,
  subtitle,
  imageSource,
  isHero,
  onPress,
  index = 0,
}) => {
  const { theme } = useTheme();

  // Animasi nilai
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    const delay = isHero ? 0 : index * 80;
    animationProgress.value = withDelay(
      delay,
      withSpring(1, { damping: 14, stiffness: 85 })
    );
  }, [index, isHero]);

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
          [isHero ? 15 : 25, 0],
          Extrapolation.CLAMP
        ),
      },
      {
        scale: interpolate(
          animationProgress.value,
          [0, 1],
          [0.95, 1],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  if (isHero) {
    return (
      <AnimatedTouchable
        style={[styles.heroContainer, animatedStyle]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image
          source={imageSource}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay}>
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>{title}</Text>
            <Text style={styles.heroSubtitle}>{subtitle}</Text>
          </View>
          <View style={styles.heroPlayButton}>
            <Ionicons name="play" size={20} color="#1A2850" />
          </View>
        </View>
      </AnimatedTouchable>
    );
  }

  return (
    <AnimatedTouchable
      style={[styles.container, animatedStyle]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay} />
      </View>
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
        {title}
      </Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        {subtitle}
      </Text>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    marginBottom: METRICS.margin + 4,
  },
  imageWrapper: {
    borderRadius: METRICS.radius + 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 130,
    backgroundColor: '#1A2850',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(139, 147, 255, 0.08)',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  // Hero Card Styles
  heroContainer: {
    width: '100%',
    height: 200,
    borderRadius: METRICS.radius + 6,
    marginBottom: METRICS.margin + 4,
    overflow: 'hidden',
    // Shadow premium
    shadowColor: 'rgba(139, 147, 255, 0.4)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: METRICS.padding + 2,
    paddingBottom: METRICS.padding,
    backgroundColor: 'rgba(13, 27, 61, 0.75)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroTextContainer: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  heroPlayButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#8B93FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
});

export default SleepCard;