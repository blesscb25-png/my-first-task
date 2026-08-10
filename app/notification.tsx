import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { notifications as mockNotifications } from '@/data/mockData';
import { NotificationCard } from '@/components/NotificationCard';
import { Header } from '@/components/Header';
import { useStore } from '@/store/useStore';
import { Bell, CheckCheck } from 'lucide-react-native';

type Filter = 'all' | 'booking' | 'message' | 'offer' | 'promotion';

export default function NotificationsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>('all');
  const [notifications, setNotifications] = useState(mockNotifications);

  const filtered = filter === 'all' ? notifications : notifications.filter((n) => n.type === filter);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <View style={styles.container}>
      <Header
        title="Notifications"
        large
        titleStyle={{ marginLeft: 0 }}
        rightComponent={
          <TouchableOpacity onPress={markAllRead} style={styles.markAllBtn}>
            <CheckCheck size={16} color={Colors.primary} />
            <Text style={styles.markAllText}>Read All</Text>
          </TouchableOpacity>
        }
      />

      <View style={styles.filterRow}>
        {[
          { key: 'all', label: 'All' },
          { key: 'booking', label: 'Bookings' },
          { key: 'message', label: 'Messages' },
          { key: 'offer', label: 'Offers' },
          { key: 'promotion', label: 'Promos' },
        ].map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterChip, filter === f.key && styles.filterChipActive]}
            onPress={() => setFilter(f.key as Filter)}
          >
            <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item }) => (
          <NotificationCard notification={item} onPress={() => {
            if (item.type === 'booking') router.push('../(tabs)/bookings');
            else if (item.type === 'message') router.push('./(tabs)/chat');
            else if (item.type === 'offer' || item.type === 'promotion') router.push('/promotions');
          }} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  markAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(10,91,255,0.08)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  markAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    ...Shadow.sm,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.white,
  },
});
