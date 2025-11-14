import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
// (FIX) Menggunakan @expo/vector-icons dan alias 'as Icon'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { METRICS } from '../../constants/metrics';
import { useTheme } from '../../context/ThemeContext'; // (Poin 4)

type Props = {
  label: string;
  iconName: string;
  isActive: boolean;
  onPress: () => void;
};

const CategoryChip: React.FC<Props> = ({
  label,
  iconName,
  isActive,
  onPress,
}) => {
  const { theme } = useTheme(); // (Poin 4)

  // (Poin 2) Tentukan style dinamis berdasarkan 'isActive'
  const containerStyle = {
    backgroundColor: isActive ? theme.primary : theme.cardBackground,
  };
  const iconContainerStyle = {
    backgroundColor: isActive ? theme.white : theme.primary,
  };
  const iconColor = isActive ? theme.primary : theme.white;
  const textColor = isActive ? theme.white : theme.textSecondary;

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      <View style={[styles.iconContainer, iconContainerStyle]}>
        {/* (FIX) iconName perlu di-cast ke tipe yang benar untuk MaterialCommunityIcons */}
        <Icon
          name={iconName as keyof typeof Icon.glyphMap}
          size={24}
          color={iconColor}
        />
      </View>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 90,
    borderRadius: METRICS.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: METRICS.margin / 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CategoryChip;