import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { Booking } from '@/types';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react-native';
import { Badge } from './Badge';

interface BookingCardProps {
  booking: Booking;
  onPress?: () => void;
  style?: ViewStyle;
}

export function BookingCard({ booking, onPress, style }: BookingCardProps) {
  const statusVariant: Record<string, 'success' | 'info' | 'danger'> = {
    upcoming: 'info',
    completed: 'success',
    cancelled: 'danger',
  };
  const statusLabel: Record<string, string> = {
    upcoming: 'Upcoming',
    completed: 'Completed',
    cancelled: 'Cancelled',
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.card, style]}>
      <View style={styles.header}>
        <Image source={{ uri: booking.professionalAvatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.proName} numberOfLines={1}>{booking.professionalName}</Text>
          <Text style={styles.serviceName}>{booking.serviceName}</Text>
        </View>
        <Badge label={statusLabel[booking.status]} variant={statusVariant[booking.status]} size="sm" />
      </View>
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Calendar size={14} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{formatDate(booking.date)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Clock size={14} color={Colors.textSecondary} />
          <Text style={styles.detailText}>{booking.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <MapPin size={14} color={Colors.textSecondary} />
          <Text style={styles.detailText} numberOfLines={1}>{booking.location}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View>
          <Text style={styles.bookingNo}>{booking.bookingNumber}</Text>
          <Text style={styles.price}>${booking.price}</Text>
        </View>
        <ChevronRight size={20} color={Colors.primary} />
      </View>
    </TouchableOpacity>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 16,
    gap: 14,
    ...Shadow.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  proName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  serviceName: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  details: {
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  bookingNo: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
    marginTop: 2,
  },
});
