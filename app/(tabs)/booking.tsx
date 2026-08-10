import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { bookings } from '@/data/bookings';
import { BookingCard } from '@/components/BookingsCard';
import { Header } from '@/components/Header';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/Button';
import { Calendar } from 'lucide-react-native';

type Tab = 'upcoming' | 'completed' | 'cancelled';

export default function BookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('upcoming');

  const filtered = bookings.filter((b) => b.status === activeTab);

  return (
    <View style={styles.container}>
      <Header title="My Bookings" large titleStyle={{ marginLeft: 0 }} />

      <View style={styles.tabsRow}>
        {[
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'completed', label: 'Completed' },
          { key: 'cancelled', label: 'Cancelled' },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key as Tab)}
          >
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        renderItem={({ item }) => (
          <BookingCard booking={item} onPress={() => router.push(`./booking-details/${item.id}`)} />
        )}
        ListEmptyComponent={
          <EmptyState
            icon={<Calendar size={36} color={Colors.primary} />}
            title={`No ${activeTab} bookings`}
            subtitle="Your booking history will appear here"
            action={<Button title="Book a Service" onPress={() => router.push('./(tabs)')} size="md" />}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: Colors.white,
    alignItems: 'center',
    ...Shadow.sm,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.white,
  },
});
