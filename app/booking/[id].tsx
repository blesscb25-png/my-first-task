import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { professionals } from '@/data/professional';
import { paymentMethods } from '@/data/mockData';
import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Badge } from '@/components/Badge';
import { Calendar, Clock, MapPin, CreditCard, Tag, ChevronRight, Check } from 'lucide-react-native';

export default function BookingScreen() {
  const router = useRouter();
  const { id, serviceId } = useLocalSearchParams<{ id: string; serviceId: string }>();
  const pro = professionals.find((p) => p.id === id);
  const service = pro?.services.find((s) => s.id === serviceId) || pro?.services[0];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0].id);
  const [loading, setLoading] = useState(false);

  if (!pro || !service) {
    return <View style={styles.container}><Text>Service not found</Text></View>;
  }

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const times = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('./booking-success');
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Header title="Book Appointment" showBack titleStyle={{ marginLeft: 8 }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}>
        <View style={styles.proCard}>
          <View style={styles.proRow}>
            <View style={styles.proIconWrap}>
              <Text style={styles.proEmoji}>📅</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.proName}>{pro.name}</Text>
              <Text style={styles.serviceName}>{service.name}</Text>
            </View>
            <Text style={styles.price}>${service.price}</Text>
          </View>
          <View style={styles.serviceInfo}>
            <Clock size={14} color={Colors.textSecondary} />
            <Text style={styles.durationText}>{service.duration} minutes</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Choose Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
          {dates.map((d, i) => {
            const isSelected = d.toDateString() === selectedDate.toDateString();
            return (
              <TouchableOpacity
                key={i}
                style={[styles.dateCard, isSelected && styles.dateCardActive]}
                onPress={() => setSelectedDate(d)}
              >
                <Text style={[styles.dateDay, isSelected && styles.dateTextActive]}>
                  {d.toLocaleDateString('en-US', { weekday: 'short' })}
                </Text>
                <Text style={[styles.dateNum, isSelected && styles.dateTextActive]}>
                  {d.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionLabel}>Choose Time</Text>
        <View style={styles.timeGrid}>
          {times.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.timeChip, selectedTime === t && styles.timeChipActive]}
              onPress={() => setSelectedTime(t)}
            >
              <Text style={[styles.timeText, selectedTime === t && styles.timeTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Location</Text>
        <View style={styles.inputWrap}>
          <MapPin size={18} color={Colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            placeholderTextColor={Colors.textMuted}
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <Text style={styles.sectionLabel}>Notes (Optional)</Text>
        <View style={styles.notesWrap}>
          <TextInput
            style={styles.notesInput}
            placeholder="Add any special requests..."
            placeholderTextColor={Colors.textMuted}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        <Text style={styles.sectionLabel}>Promo Code</Text>
        <View style={styles.promoRow}>
          <View style={styles.promoInputWrap}>
            <Tag size={18} color={Colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Enter promo code"
              placeholderTextColor={Colors.textMuted}
              value={promoCode}
              onChangeText={setPromoCode}
            />
          </View>
          <Button title="Apply" variant="outline" size="sm" onPress={() => {}} />
        </View>

        <Text style={styles.sectionLabel}>Payment Method</Text>
        <View style={styles.paymentList}>
          {paymentMethods.map((pm) => (
            <TouchableOpacity
              key={pm.id}
              style={[styles.paymentItem, paymentMethod === pm.id && styles.paymentItemActive]}
              onPress={() => setPaymentMethod(pm.id)}
            >
              <View style={styles.paymentLeft}>
                <View style={styles.paymentIconWrap}>
                  <CreditCard size={18} color={Colors.primary} />
                </View>
                <View>
                  <Text style={styles.paymentLabel}>{pm.label}</Text>
                  {pm.last4 && <Text style={styles.paymentLast4}>**** {pm.last4}</Text>}
                </View>
              </View>
              {paymentMethod === pm.id && (
                <View style={styles.checkIcon}>
                  <Check size={14} color={Colors.white} />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionLabel}>Booking Summary</Text>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service</Text>
            <Text style={styles.summaryValue}>{service.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Professional</Text>
            <Text style={styles.summaryValue}>{pro.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Date & Time</Text>
            <Text style={styles.summaryValue}>{selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {selectedTime}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration</Text>
            <Text style={styles.summaryValue}>{service.duration} min</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${service.price}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Fee</Text>
            <Text style={styles.summaryValue}>$2.00</Text>
          </View>
          {promoCode && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={[styles.summaryValue, { color: Colors.success }]}>-$5.00</Text>
            </View>
          )}
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${promoCode ? service.price - 3 : service.price + 2}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <Button title="Confirm Booking" onPress={handleConfirm} loading={loading} fullWidth size="lg" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  proCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    gap: 10,
    marginBottom: 16,
    ...Shadow.card,
  },
  proRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  proIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(10,91,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  proEmoji: { fontSize: 24 },
  proName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  serviceName: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  durationText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 12,
    marginTop: 8,
  },
  dateCard: {
    width: 56,
    height: 72,
    borderRadius: 16,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    ...Shadow.sm,
  },
  dateCardActive: {
    backgroundColor: Colors.primary,
  },
  dateDay: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },
  dateNum: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  dateTextActive: {
    color: Colors.white,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: Colors.white,
    ...Shadow.sm,
  },
  timeChipActive: {
    backgroundColor: Colors.primary,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  timeTextActive: {
    color: Colors.white,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    ...Shadow.sm,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  notesWrap: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...Shadow.sm,
  },
  notesInput: {
    minHeight: 70,
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  promoRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  promoInputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    ...Shadow.sm,
  },
  paymentList: {
    gap: 10,
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  paymentItemActive: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(10,91,255,0.03)',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(10,91,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  paymentLast4: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  totalValue: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.primary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadow.lg,
  },
});
