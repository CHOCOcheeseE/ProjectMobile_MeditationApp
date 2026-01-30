import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  Text // (FIX)
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { METRICS } from '../../constants/metrics';
import { useTheme } from '../../context/ThemeContext';

interface Props extends TextInputProps {
  iconName: string;
  isPassword?: boolean;
  isValid?: boolean;
  errorMessage?: string; // New Prop for validation error
}

const CustomTextInput: React.FC<Props> = ({
  iconName,
  isPassword = false,
  isValid,
  errorMessage, // Destructure errorMessage
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!isPassword);

  const borderColor = isFocused
    ? theme.primary
    : errorMessage // Prioritize error message for red border
      ? 'red'
      : isValid === undefined
        ? theme.lightPurple
        : isValid
          ? 'green'
          : 'red';

  return (
    <View style={{ width: '100%', marginBottom: METRICS.margin / 1.5 }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.lightPurple,
            borderColor,
          },
          style,
        ]}>
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

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
            <Icon
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        )}

        {/* Show checkmark only if valid and no error message */}
        {isValid !== undefined && !errorMessage && (
          <Icon
            name={isValid ? 'checkmark-circle' : 'close-circle'}
            size={22}
            color={isValid ? 'green' : 'red'}
          />
        )}

        {/* If there is an error message, show warning icon inside input */}
        {!!errorMessage && (
          <Icon name="alert-circle" size={22} color="red" />
        )}
      </View>

      {/* Display Error Message below input */}
      {!!errorMessage && (
        <Text style={{ color: 'red', fontSize: 12, marginTop: 4, marginLeft: 4 }}>
          {errorMessage}
        </Text>
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
    // marginBottom removed from here, moved to wrapper View
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