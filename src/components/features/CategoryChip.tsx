import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { METRICS } from '../../constants/metrics';
import { useTheme } from '../../context/ThemeContext';

type Props = {
  label: string;
  iconName: string;
  isActive: boolean;
  onPress: () => void;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const CategoryChip: React.FC<Props> = ({
  label,
  iconName,
  isActive,
  onPress,
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(isActive ? 1 : 0.92, { damping: 15, stiffness: 120 });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Style dinamis berdasarkan isActive
  const containerStyle = {
    backgroundColor: isActive ? theme.primary : theme.card,
    borderColor: isActive ? theme.primary : theme.cardBorder,
    shadowColor: isActive ? theme.primary : theme.shadowColor,
  };
  const iconContainerStyle = {
    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : theme.primary,
  };
  const iconColor = isActive ? theme.white : theme.white;
  const textColor = isActive ? theme.white : theme.textSecondary;

  return (
    <AnimatedTouchable
      style={[styles.container, containerStyle, animatedStyle]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={[styles.iconContainer, iconContainerStyle]}>
        <Icon
          name={iconName as keyof typeof Icon.glyphMap}
          size={22}
          color={iconColor}
        />
      </View>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 85,
    height: 95,
    borderRadius: METRICS.radius + 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: METRICS.margin / 1.5,
    borderWidth: 1,
    // Shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default CategoryChip;