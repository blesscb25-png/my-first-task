import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Share } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { bookings } from '@/data/bookings';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Header } from '@/components/Header';
import { Calendar, Clock, MapPin, CreditCard, Phone, MessageCircle, Download, Share2, X, CheckCircle } from 'lucide-react-native';

export default function BookingDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const booking = bookings.find((b) => b.id === id);

  if (!booking) {
    return <View style={styles.container}><Text>Booking not found</Text></View>;
  }

  const handleShare = async () => {
    try {
      await Share.share({ message: `My Linkly booking: ${booking.bookingNumber}` });
    } catch {}
  };

  const statusVariant: Record<string, 'success' | 'info' | 'danger'> = {
    upcoming: 'info',
    completed: 'success',
    cancelled: 'danger',
  };

  return (
    <View style={styles.container}>
      <Header title="Booking Details" showBack titleStyle={{ marginLeft: 8 }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}>
        <View style={[styles.statusBanner, { backgroundColor: `${booking.status === 'completed' ? Colors.success : booking.status === 'cancelled' ? Colors.danger : Colors.primary}15` }]}>
          <CheckCircle size={20} color={booking.status === 'completed' ? Colors.success : booking.status === 'cancelled' ? Colors.danger : Colors.primary} />
          <Text style={[styles.statusText, { color: booking.status === 'completed' ? Colors.success : booking.status === 'cancelled' ? Colors.danger : Colors.primary }]}>
            {booking.status === 'upcoming' ? 'Upcoming Appointment' : booking.status === 'completed' ? 'Completed' : 'Cancelled'}
          </Text>
        </View>

        <View style={styles.proCard}>
          <Image source={{ uri: booking.professionalAvatar }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.proName}>{booking.professionalName}</Text>
            <Text style={styles.serviceName}>{booking.serviceName}</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Appointment Info</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Calendar size={18} color={Colors.primary} />
            <Text style={styles.infoLabel}>Date</Text>
            <Text style={styles.infoValue}>{formatDate(booking.date)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Clock size={18} color={Colors.primary} />
            <Text style={styles.infoLabel}>Time</Text>
            <Text style={styles.infoValue}>{booking.time}</Text>
          </View>
          <View style={styles.infoRow}>
            <MapPin size={18} color={Colors.primary} />
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue} numberOfLines={2}>{booking.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <CreditCard size={18} color={Colors.primary} />
            <Text style={styles.infoLabel}>Payment</Text>
            <Text style={styles.infoValue}>{booking.paymentMethod}</Text>
          </View>
        </View>

        {booking.notes && (
          <>
            <Text style={styles.sectionLabel}>Notes</Text>
            <View style={styles.notesCard}>
              <Text style={styles.notesText}>{booking.notes}</Text>
            </View>
          </>
        )}

        <Text style={styles.sectionLabel}>Payment Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Fee</Text>
            <Text style={styles.summaryValue}>${booking.price}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Booking Fee</Text>
            <Text style={styles.summaryValue}>$2.00</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Paid</Text>
            <Text style={styles.totalValue}>${booking.price + 2}</Text>
          </View>
        </View>

        <View style={styles.bookingNoCard}>
          <Text style={styles.bookingNoLabel}>Booking Number</Text>
          <Text style={styles.bookingNo}>{booking.bookingNumber}</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        {booking.status === 'upcoming' && (
          <>
            <TouchableOpacity style={styles.actionBtn} onPress={() => router.push(`/chat/${booking.professionalId}`)}>
              <MessageCircle size={20} color={Colors.primary} />
              <Text style={styles.actionLabel}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Phone size={20} color={Colors.primary} />
              <Text style={styles.actionLabel}>Call</Text>
            </TouchableOpacity>
            <Button title="Reschedule" variant="outline" size="md" onPress={() => router.push(`/booking/${booking.professionalId}`)} />
          </>
        )}
        {booking.status === 'completed' && (
          <>
            <Button title="Write Review" variant="outline" size="md" onPress={() => router.push('/reviews')} />
            <Button title="Book Again" size="md" onPress={() => router.push(`./professional/${booking.professionalId}`)} />
          </>
        )}
        {booking.status === 'cancelled' && (
          <Button title="Book Again" fullWidth size="lg" onPress={() => router.push(`./professional/${booking.professionalId}`)} />
        )}
      </View>
    </View>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 15,
    fontWeight: '700',
  },
  proCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    ...Shadow.card,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  proName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  serviceName: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 10,
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    gap: 14,
    ...Shadow.card,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
    width: 70,
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  notesCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    ...Shadow.card,
  },
  notesText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    gap: 10,
    ...Shadow.card,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.primary,
  },
  bookingNoCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  bookingNoLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  bookingNo: {
    fontSize: 22,
    color: Colors.white,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: 1,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 32,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadow.lg,
  },
  actionBtn: {
    alignItems: 'center',
    gap: 2,
  },
  actionLabel: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
});
