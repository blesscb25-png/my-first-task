import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  rightComponent?: React.ReactNode;
  onBack?: () => void;
  style?: ViewStyle;
  titleStyle?: any;
  large?: boolean;
}

export function Header({ title, showBack, rightComponent, onBack, style, titleStyle, large }: HeaderProps) {
  const router = useRouter();
  return (
    <View style={[styles.container, large && styles.largeContainer, style]}>
      {showBack && (
        <TouchableOpacity onPress={() => (onBack ? onBack() : router.back())} style={styles.backBtn} hitSlop={8}>
          <ChevronLeft size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      )}
      {title && (
        <Text style={[styles.title, large && styles.largeTitle, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
      )}
      {rightComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  largeContainer: {
    paddingVertical: 16,
  minHeight: 64,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.sm,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginLeft: 12,
  },
  largeTitle: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
});
