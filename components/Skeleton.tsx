import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Radius } from '@/constants/Typography';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export function Skeleton({ width = '100%', height = 20, borderRadius = 8, style }: SkeletonProps) {
  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: Colors.grayMid,
          opacity: 0.6,
        },
        style,
      ]}
    />
  );
}

export function ProfessionalCardSkeleton() {
  return (
    <View style={styles.cardSkeleton}>
      <Skeleton width="100%" height={120} borderRadius={16} />
      <View style={styles.row}>
        <Skeleton width={48} height={48} borderRadius={24} />
        <View style={{ flex: 1, gap: 6 }}>
          <Skeleton width="70%" height={14} />
          <Skeleton width="40%" height={12} />
        </View>
      </View>
      <Skeleton width="50%" height={12} />
    </View>
  );
}

export function ServiceCardSkeleton() {
  return (
    <View style={styles.serviceSkeleton}>
      <Skeleton width="100%" height={80} borderRadius={12} />
      <Skeleton width="60%" height={12} style={{ marginTop: 8 }} />
      <Skeleton width="40%" height={10} style={{ marginTop: 4 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardSkeleton: {
    gap: 10,
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: Radius['2xl'],
  },
  serviceSkeleton: {
    width: 140,
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
