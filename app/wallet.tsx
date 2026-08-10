import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { walletTransactions, coupons, paymentMethods } from '@/data/mockData';
import { WalletTransactionCard } from '@/components/WalletTransactionCard';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { useStore } from '@/store/useStore';
import { Wallet, Plus, ArrowDownLeft, ArrowUpRight, CreditCard, Tag, Gift, ChevronRight } from 'lucide-react-native';

export default function WalletScreen() {
  const router = useRouter();
  const user = useStore((s) => s.user);

  return (
    <View style={styles.container}>
      <Header title="Wallet" showBack titleStyle={{ marginLeft: 8 }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        <LinearGradient
          colors={Colors.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceCard}
        >
          <View style={styles.balanceTop}>
            <View>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Text style={styles.balanceAmount}>${user?.walletBalance?.toFixed(2) || '0.00'}</Text>
            </View>
            <Wallet size={28} color={Colors.white} fill={'rgba(255,255,255,0.2)'} strokeWidth={1.5} />
          </View>
          <View style={styles.balanceActions}>
            <TouchableOpacity style={styles.balanceBtn}>
              <View style={styles.balanceBtnIcon}><Plus size={18} color={Colors.primary} /></View>
              <Text style={styles.balanceBtnLabel}>Top Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.balanceBtn}>
              <View style={styles.balanceBtnIcon}><ArrowUpRight size={18} color={Colors.primary} /></View>
              <Text style={styles.balanceBtnLabel}>Withdraw</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.balanceBtn}>
              <View style={styles.balanceBtnIcon}><ArrowDownLeft size={18} color={Colors.primary} /></View>
              <Text style={styles.balanceBtnLabel}>Transfer</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.quickRow}>
          <TouchableOpacity style={styles.quickCard} onPress={() => router.push('/coupons')}>
            <View style={[styles.quickIcon, { backgroundColor: 'rgba(255,138,0,0.1)' }]}>
              <Tag size={20} color={Colors.orange} />
            </View>
            <Text style={styles.quickLabel}>Coupons</Text>
            <Text style={styles.quickCount}>{coupons.filter(c => !c.isUsed).length} available</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickCard}>
            <View style={[styles.quickIcon, { backgroundColor: 'rgba(34,197,94,0.1)' }]}>
              <Gift size={20} color={Colors.success} />
            </View>
            <Text style={styles.quickLabel}>Rewards</Text>
            <Text style={styles.quickCount}>1,250 pts</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>Payment Methods</Text>
        <View style={styles.paymentList}>
          {paymentMethods.filter(pm => pm.type !== 'cash' && pm.type !== 'wallet').map((pm) => (
            <TouchableOpacity key={pm.id} style={styles.paymentItem}>
              <View style={styles.paymentLeft}>
                <View style={styles.paymentIconWrap}>
                  <CreditCard size={18} color={Colors.primary} />
                </View>
                <View>
                  <Text style={styles.paymentLabel}>{pm.label}</Text>
                  {pm.last4 && <Text style={styles.paymentLast4}>**** {pm.last4}</Text>}
                </View>
              </View>
              {pm.isDefault && <Badge label="Default" variant="primary" size="sm" />}
              <ChevronRight size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addCardBtn}>
            <Plus size={20} color={Colors.primary} />
            <Text style={styles.addCardText}>Add Payment Method</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>Transactions</Text>
        <View style={styles.txList}>
          {walletTransactions.map((tx) => (
            <WalletTransactionCard key={tx.id} transaction={tx} style={{ marginBottom: 10 }} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  balanceCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    ...Shadow.lg,
  },
  balanceTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  balanceLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 40,
    color: Colors.white,
    fontWeight: '900',
    letterSpacing: -1,
    marginTop: 4,
  },
  balanceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  balanceBtn: {
    alignItems: 'center',
    gap: 6,
  },
  balanceBtnIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceBtnLabel: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: '600',
  },
  quickRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  quickCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    gap: 6,
    ...Shadow.card,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  quickCount: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
    marginTop: 8,
  },
  paymentList: {
    gap: 10,
    marginBottom: 16,
  },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    ...Shadow.sm,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
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
  addCardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 16,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
  },
  addCardText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.primary,
  },
  txList: {
    gap: 10,
  },
});
