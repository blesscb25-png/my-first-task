import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing, Radius } from '@/constants/Typography';

type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
  size?: 'sm' | 'md';
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  primary: { bg: 'rgba(10, 91, 255, 0.1)', text: Colors.primary },
  success: { bg: 'rgba(34, 197, 94, 0.12)', text: Colors.success },
  warning: { bg: 'rgba(245, 158, 11, 0.12)', text: Colors.warning },
  danger: { bg: 'rgba(239, 68, 68, 0.12)', text: Colors.danger },
  info: { bg: 'rgba(16, 43, 123, 0.1)', text: Colors.darkBlue },
  neutral: { bg: Colors.gray, text: Colors.textSecondary },
};

export function Badge({ label, variant = 'primary', style, size = 'sm' }: BadgeProps) {
  const colors = variantColors[variant];
  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          paddingVertical: size === 'sm' ? 3 : Spacing.xs,
          paddingHorizontal: size === 'sm' ? Spacing.sm : Spacing.base,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: colors.text, fontSize: size === 'sm' ? Typography.fontSize.xs : Typography.fontSize.sm }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
