import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { Category } from '@/types';
import { LinearGradient } from 'expo-linear-gradient';

interface CategoryCardProps {
  category: Category;
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export function CategoryCard({ category, onPress, size = 'md', style }: CategoryCardProps) {
  const dimensions = {
    sm: { width: 72, height: 72, iconSize: 28 },
    md: { width: 100, height: 110, iconSize: 36 },
    lg: { width: 160, height: 120, iconSize: 44 },
  };
  const d = dimensions[size];

  if (size === 'lg') {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.lgCard, style]}>
        <Image source={{ uri: category.image }} style={styles.lgImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.lgOverlay}
        />
        <View style={styles.lgContent}>
          <Text style={styles.lgIcon}>{category.icon}</Text>
          <Text style={styles.lgName}>{category.name}</Text>
          <Text style={styles.lgCount}>{category.count} pros</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.card, { width: d.width, height: d.height }, style]}>
      <LinearGradient
        colors={category.gradient as [string, string]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.iconWrap}
      >
        <Text style={{ fontSize: d.iconSize }}>{category.icon}</Text>
      </LinearGradient>
      <Text style={styles.name} numberOfLines={1}>{category.name}</Text>
      {size === 'md' && <Text style={styles.count}>{category.count}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: 8,
  },
  iconWrap: {
    width: '100%',
    height: '70%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.sm,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  count: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
  lgCard: {
    width: 160,
    height: 120,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    ...Shadow.card,
  },
  lgImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  lgOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  lgContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    gap: 2,
  },
  lgIcon: {
    fontSize: 24,
  marginBottom: 4,
  alignSelf: 'flex-start',
  textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  lgName: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.white,
  },
  lgCount: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
});
