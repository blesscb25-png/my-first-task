import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay, withTiming } from 'react-native-reanimated';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { Button } from '@/components/Button';
import { Logo } from '@/components/ui/Logo';
import { Check, Download, Share2, Home } from 'lucide-react-native';

export default function BookingSuccessScreen() {
  const router = useRouter();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1, { damping: 12, stiffness: 120 });
    opacity.value = withTiming(1, { duration: 400 });
    contentOpacity.value = withDelay(300, withTiming(1, { duration: 500 }));
  }, []);

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const handleShare = async () => {
    try {
      await Share.share({ message: 'My booking is confirmed on Linkly! Booking #LNK-2026-001234' });
    } catch {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Logo size={48} showText={false} />
      </View>

      <Animated.View style={[styles.checkCircle, circleStyle]}>
        <LinearGradient colors={Colors.gradientSuccess} style={styles.checkGradient}>
          <Check size={48} color={Colors.white} strokeWidth={3} />
        </LinearGradient>
      </Animated.View>

      <Animated.View style={[styles.content, contentStyle]}>
        <Text style={styles.title}>Booking Confirmed!</Text>
        <Text style={styles.subtitle}>
          Your appointment has been successfully booked. You will receive a confirmation shortly.
        </Text>

        <View style={styles.bookingCard}>
          <Text style={styles.bookingLabel}>Booking Number</Text>
          <Text style={styles.bookingNumber}>LNK-2026-001234</Text>
          <View style={styles.bookingDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Service</Text>
              <Text style={styles.detailValue}>Manicure</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>Aug 10, 2026</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>2:00 PM</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Total</Text>
              <Text style={styles.detailValue}>$17.00</Text>
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <Button title="Download Receipt" variant="outline" fullWidth size="md" icon={<Download size={18} color={Colors.primary} />} onPress={() => {}} />
          <Button title="Share" variant="ghost" fullWidth size="md" icon={<Share2 size={18} color={Colors.primary} />} onPress={handleShare} />
        </View>

        <Button title="Back to Home" fullWidth size="lg" onPress={() => router.replace('/(tabs)')} style={{ marginTop: 8 }} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  logoWrap: {
    marginTop: 60,
  },
  checkCircle: {
    marginTop: 40,
  },
  checkGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.lg,
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  bookingCard: {
    width: '100%',
    backgroundColor: Colors.gray,
    borderRadius: 24,
    padding: 24,
    marginTop: 32,
    gap: 4,
  },
  bookingLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  bookingNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  bookingDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  detailItem: {
    width: '48%',
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginTop: 2,
  },
  actions: {
    width: '100%',
    gap: 8,
    marginTop: 24,
  },
});
