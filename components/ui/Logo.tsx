import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing, Shadow } from '@/constants/Typography';

interface LogoProps {
  size?: number;
  showText?: boolean;
  textColor?: string;
  style?: ViewStyle;
}

export function Logo({ size = 48, showText = true, textColor, style }: LogoProps) {
  const barW = size * 0.5;
  const barH = Math.max(3, size * 0.08);
  const dotSize = size * 0.14;

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.iconWrap,
          { width: size, height: size, borderRadius: size * 0.28 },
        ]}
      >
        <View style={[styles.linkBar, { width: barW, height: barH, top: size * 0.3 }]} />
        <View style={[styles.linkBar, { width: barW, height: barH, top: size * 0.46 }]} />
        <View style={[styles.linkBar, { width: barW, height: barH, top: size * 0.62 }]} />
        <View
          style={[
            styles.dot,
            { width: dotSize, height: dotSize, right: size * 0.14, top: size * 0.16 },
          ]}
        />
      </View>
      {showText && (
        <Text style={[styles.text, { color: textColor || Colors.darkBlue, fontSize: size * 0.5 }]}>
          Linkly
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconWrap: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'flex-start',
    ...Shadow.md,
  },
  linkBar: {
    position: 'absolute',
    left: '24%',
    backgroundColor: Colors.white,
    borderRadius: 2,
  },
  dot: {
    position: 'absolute',
    backgroundColor: Colors.orange,
    borderRadius: 99,
  },
  text: {
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});
