import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius, Shadow, Spacing } from '@/constants/Typography';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  noShadow?: boolean;
}

export function Card({ children, style, padding = Spacing.base, noShadow }: CardProps) {
  return (
    <View
      style={[
        styles.card,
        { padding, backgroundColor: Colors.white },
        !noShadow && Shadow.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius['2xl'],
  },
});
