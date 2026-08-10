import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { WalletTransaction } from '@/types';
import { ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react-native';

interface WalletTransactionCardProps {
  transaction: WalletTransaction;
  style?: ViewStyle;
}

export function WalletTransactionCard({ transaction: t, style }: WalletTransactionCardProps) {
  const isCredit = t.type === 'credit';
  const statusColor = t.status === 'completed' ? Colors.success : t.status === 'pending' ? Colors.warning : Colors.danger;

  return (
    <View style={[styles.card, style]}>
      <View style={[styles.iconWrap, { backgroundColor: isCredit ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)' }]}>
        {isCredit ? (
          <ArrowDownLeft size={18} color={Colors.success} />
        ) : (
          <ArrowUpRight size={18} color={Colors.danger} />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{t.title}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>{t.subtitle}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.date}>{t.date}</Text>
          <View style={[styles.statusBadge, { backgroundColor: `${statusColor}15` }]}>
            <Text style={[styles.statusText, { color: statusColor }]}>{t.status}</Text>
          </View>
        </View>
      </View>
      <Text style={[styles.amount, { color: isCredit ? Colors.success : Colors.danger }]}>
        {isCredit ? '+' : '-'}${t.amount}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    backgroundColor: Colors.white,
    borderRadius: 18,
    ...Shadow.card,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  date: {
    fontSize: 11,
    color: Colors.textMuted,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  amount: {
    fontSize: 16,
    fontWeight: '800',
  },
});
