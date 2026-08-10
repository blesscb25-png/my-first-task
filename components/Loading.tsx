import React from 'react';
import { View, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';

interface LoadingProps {
  size?: 'small' | 'large';
  style?: ViewStyle;
  color?: string;
  fullscreen?: boolean;
  label?: string;
}

export function Loading({ size = 'large', style, color, fullscreen, label }: LoadingProps) {
  if (fullscreen) {
    return (
      <View style={[styles.fullscreen, style]}>
        <ActivityIndicator size={size} color={color || Colors.primary} />
      </View>
    );
  }
  return (
    <View style={[styles.inline, style]}>
      <ActivityIndicator size={size} color={color || Colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  inline: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
