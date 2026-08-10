import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { Notification } from '@/types';
import { Calendar, MessageCircle, Tag, Bell, Percent } from 'lucide-react-native';

interface NotificationCardProps {
  notification: Notification;
  onPress?: () => void;
  style?: ViewStyle;
}

const typeConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
  booking: { icon: <Calendar size={18} color={Colors.white} />, color: Colors.primary, bg: 'rgba(10,91,255,0.1)' },
  message: { icon: <MessageCircle size={18} color={Colors.white} />, color: Colors.darkBlue, bg: 'rgba(16,43,123,0.1)' },
  offer: { icon: <Tag size={18} color={Colors.white} />, color: Colors.orange, bg: 'rgba(255,138,0,0.1)' },
  promotion: { icon: <Percent size={18} color={Colors.white} />, color: Colors.success, bg: 'rgba(34,197,94,0.1)' },
  update: { icon: <Bell size={18} color={Colors.white} />, color: Colors.warning, bg: 'rgba(245,158,11,0.1)' },
};

export function NotificationCard({ notification: n, onPress, style }: NotificationCardProps) {
  const cfg = typeConfig[n.type] || typeConfig.update;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={[styles.card, !n.isRead && styles.unread, style]}>
      <View style={[styles.iconWrap, { backgroundColor: cfg.color }]}>
        {cfg.icon}
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{n.title}</Text>
          {!n.isRead && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.body} numberOfLines={2}>{n.body}</Text>
        <Text style={styles.time}>{n.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 14,
    backgroundColor: Colors.white,
    borderRadius: 20,
    ...Shadow.card,
  },
  unread: {
    backgroundColor: 'rgba(10,91,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(10,91,255,0.1)',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
  body: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 3,
    lineHeight: 19,
  },
  time: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 4,
    fontWeight: '500',
  },
});
