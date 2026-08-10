import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Star } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { Typography, Spacing } from '@/constants/Typography';

interface RatingProps {
  value: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
  style?: ViewStyle;
  color?: string;
}

export function Rating({
  value,
  size = 14,
  showValue = true,
  reviewCount,
  style,
  color,
}: RatingProps) {
  return (
    <View style={[styles.container, style]}>
      <Star size={size} color={Colors.orange} fill={Colors.orange} strokeWidth={0} />
      {showValue && (
        <Text style={[styles.value, { fontSize: size - 1, color: color || Colors.textPrimary }]}>
          {value.toFixed(1)}
        </Text>
      )}
      {reviewCount !== undefined && (
        <Text style={[styles.count, { fontSize: size - 2, color: color || Colors.textSecondary }]}>
          ({reviewCount})
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  value: {
    fontWeight: '700',
  },
  count: {
    fontWeight: '500',
  },
});
