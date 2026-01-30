import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
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
import { Course } from '../../data/MockData';

interface CourseCardProps {
  item: Course | any;
  onPress: () => void;
  isRecommended?: boolean;
  index?: number; // Untuk delay animasi stagger
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const CourseCard: React.FC<CourseCardProps> = ({
  item,
  onPress,
  isRecommended = false,
  index = 0,
}) => {
  const { theme } = useTheme();

  // Animasi nilai
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    // Delay berdasarkan index untuk efek stagger
    const delay = index * 100;
    animationProgress.value = withDelay(
      delay,
      withSpring(1, { damping: 15, stiffness: 90 })
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
          [20, 0],
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

  const imageSource = item.image;

  return (
    <AnimatedTouchable
      style={[
        styles.container,
        isRecommended && styles.recommendedContainer,
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
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="cover"
        />
        {/* Gradient overlay untuk efek premium */}
        <View style={styles.imageOverlay} />
        {/* Durasi badge dengan desain baru */}
        {item.duration && (
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{item.duration}</Text>
          </View>
        )}
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.title,
            { color: theme.text },
            isRecommended && styles.recommendedTitle,
          ]}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {item.category ? item.category.toUpperCase() : 'MEDITATION'}
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
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  recommendedContainer: {
    width: 170,
    marginRight: METRICS.margin,
  },
  imageContainer: {
    width: '100%',
    height: 120,
    backgroundColor: '#E8E8F0',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  textContainer: {
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  recommendedTitle: {
    fontSize: 17,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default CourseCard;