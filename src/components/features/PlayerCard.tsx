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
import { Ionicons } from '@expo/vector-icons';

interface PlayerCardProps {
  title: string;
  subtitle: string;
  imageSource: ImageSourcePropType | { uri: string };
  onPress: () => void;
  delay?: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const PlayerCard: React.FC<PlayerCardProps> = ({
  title,
  subtitle,
  imageSource,
  onPress,
  delay = 150,
}) => {
  const { theme } = useTheme();

  // Animasi nilai
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withDelay(
      delay,
      withSpring(1, { damping: 14, stiffness: 80 })
    );
  }, [delay]);

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
          [0.96, 1],
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
          shadowColor: theme.shadowColor,
        },
        animatedStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.imageWrapper}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
        <View style={styles.gradientOverlay} />
      </View>

      <View style={styles.contentOverlay}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <View style={[styles.playButton, { backgroundColor: theme.primary }]}>
          <Ionicons name="play" size={18} color="#fff" />
        </View>
      </View>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    borderRadius: METRICS.radius + 4,
    overflow: 'hidden',
    position: 'relative',
    // Shadow premium
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  imageWrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#333',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  contentOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: METRICS.padding + 4,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
    color: '#fff',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.8,
    color: 'rgba(255, 255, 255, 0.9)',
    textTransform: 'uppercase',
  },
  playButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
    // Glow effect
    shadowColor: '#7C83ED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default PlayerCard;