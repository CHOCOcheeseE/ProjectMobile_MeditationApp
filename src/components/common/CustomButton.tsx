import React from 'react';
import {
  TouchableOpacity,
  Text, // (FIX) Impor ditambahkan
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
// (FIX) Menggunakan @expo/vector-icons dan alias 'as Icon'
import { Ionicons as Icon } from '@expo/vector-icons';
import { METRICS } from '../../constants/metrics';
import { useTheme } from '../../context/ThemeContext'; // (FIX)

// (Poin 7) Definisikan Props
interface Props extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant: 'primary' | 'social';
  iconName?: string;
}

const CustomButton: React.FC<Props> = ({
  title,
  onPress,
  variant,
  iconName,
  style,
  ...props
}) => {
  const { theme } = useTheme(); // (FIX)

  // (Poin 2) Tentukan style dinamis
  const containerStyle =
    variant === 'primary'
      ? { backgroundColor: theme.primary }
      : { backgroundColor: theme.socialBlue };

  const textStyle =
    variant === 'primary'
      ? { color: theme.white }
      : { color: theme.white };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle, style]}
      onPress={onPress}
      {...props}>
      {/* (FIX) iconName perlu di-cast ke tipe yang benar untuk Ionicons */}
      {iconName && (
        <Icon
          name={iconName as keyof typeof Icon.glyphMap}
          size={20}
          color={theme.white}
          style={styles.icon}
        />
      )}
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: METRICS.radius,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: METRICS.margin / 1.5,
  },
  icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;