import React, { useState } from 'react';
import {
  View, // (FIX) Impor ditambahkan
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
// (FIX) Menggunakan @expo/vector-icons dan alias 'as Icon'
import { Ionicons as Icon } from '@expo/vector-icons';
import { METRICS } from '../../constants/metrics';
import { useTheme } from '../../context/ThemeContext'; // (FIX)

// (Poin 7) Definisikan Props
interface Props extends TextInputProps {
  iconName: string;
  isPassword?: boolean;
  isValid?: boolean;
}

const CustomTextInput: React.FC<Props> = ({
  iconName,
  isPassword = false,
  isValid,
  style,
  ...props
}) => {
  const { theme } = useTheme(); // (FIX)
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!isPassword);

  // (Poin 4) Tentukan warna border dinamis
  const borderColor = isFocused
    ? theme.primary
    : isValid === undefined
    ? theme.lightPurple // Warna netral
    : isValid
    ? 'green' // Warna valid
    : 'red'; // Warna error

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.lightPurple,
          borderColor,
        },
        style,
      ]}>
      {/* (FIX) iconName perlu di-cast ke tipe yang benar untuk Ionicons */}
      <Icon
        name={iconName as keyof typeof Icon.glyphMap}
        size={22}
        color={theme.textSecondary}
      />

      <TextInput
        style={[styles.input, { color: theme.text }]}
        placeholderTextColor={theme.textSecondary}
        secureTextEntry={!showPassword}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />

      {/* (Poin 3) Logika untuk tombol show/hide password */}
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
          <Icon
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color={theme.textSecondary}
          />
        </TouchableOpacity>
      )}

      {/* (Poin 3) Logika untuk ikon validasi */}
      {isValid !== undefined && (
        <Icon
          name={isValid ? 'checkmark-circle' : 'close-circle'}
          size={22}
          color={isValid ? 'green' : 'red'}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: METRICS.inputHeight,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: METRICS.radius,
    paddingHorizontal: METRICS.padding,
    borderWidth: 1,
    marginBottom: METRICS.margin / 1.5,
  },
  input: {
    flex: 1,
    height: '100%',
    marginLeft: 15,
    marginRight: 10,
    fontSize: 16,
  },
});

export default CustomTextInput;