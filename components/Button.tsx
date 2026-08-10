import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, Radius, Shadow } from '@/constants/Typography';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const sizeStyles = {
    sm: { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.lg, fontSize: Typography.fontSize.sm },
    md: { paddingVertical: Spacing.base + 2, paddingHorizontal: Spacing.xl, fontSize: Typography.fontSize.md },
    lg: { paddingVertical: Spacing.lg, paddingHorizontal: Spacing['2xl'], fontSize: Typography.fontSize.lg },
  };

  const isGradient = variant === 'primary' || variant === 'secondary' || variant === 'danger' || variant === 'success';

  const gradients: Record<string, [string, string]> = {
    primary: Colors.gradientPrimary,
    secondary: Colors.gradientOrange,
    danger: ['#EF4444', '#DC2626'],
    success: Colors.gradientSuccess,
  };

  const solidBg: Record<string, string> = {
    outline: 'transparent',
    ghost: 'transparent',
  };

  const textColors: Record<string, string> = {
    primary: Colors.white,
    secondary: Colors.white,
    danger: Colors.white,
    success: Colors.white,
    outline: Colors.primary,
    ghost: Colors.primary,
  };

  const borderColors: Record<string, string> = {
    outline: Colors.primary,
    ghost: 'transparent',
  };

  const content = (
    <>
      {loading ? (
        <ActivityIndicator color={textColors[variant]} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {icon}
          <Text
            style={[
              styles.text,
              { color: textColors[variant], fontSize: sizeStyles[size].fontSize },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </>
  );

  const baseStyle: ViewStyle = {
    paddingVertical: sizeStyles[size].paddingVertical,
    paddingHorizontal: sizeStyles[size].paddingHorizontal,
    borderRadius: Radius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: fullWidth ? '100%' : undefined,
    alignSelf: fullWidth ? 'stretch' : undefined,
    ...(variant === 'primary' ? Shadow.md : {}),
  };

  if (isGradient) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.85}
        style={[{ opacity: disabled ? 0.5 : 1 }, style]}
      >
        <LinearGradient
          colors={gradients[variant]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[baseStyle, style]}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        baseStyle,
        {
          backgroundColor: solidBg[variant],
          borderWidth: variant === 'outline' ? 1.5 : 0,
          borderColor: borderColors[variant],
        },
        { opacity: disabled ? 0.5 : 1 },
        style,
      ]}
    >
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
});
