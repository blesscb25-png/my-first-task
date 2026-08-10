import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { coupons } from '@/data/mockData';
import { Header } from '@/components/Header';
import { Badge } from '@/components/Badge';
import { Tag, Copy, Check } from 'lucide-react-native';

export default function CouponsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="Coupons" showBack titleStyle={{ marginLeft: 8 }} />

      <FlatList
        data={coupons}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        renderItem={({ item }) => (
          <View style={styles.couponCard}>
            <View style={styles.couponLeft}>
              <View style={styles.couponIconWrap}>
                <Tag size={20} color={Colors.white} />
              </View>
            </View>
            <View style={styles.couponBody}>
              <View style={styles.couponHeader}>
                <Text style={styles.couponDiscount}>{item.discount} OFF</Text>
                {item.isUsed ? (
                  <Badge label="Used" variant="neutral" />
                ) : (
                  <Badge label="Active" variant="success" />
                )}
              </View>
              <Text style={styles.couponCode}>{item.code}</Text>
              <Text style={styles.couponMin}>Min order: ${item.minOrder}</Text>
              <Text style={styles.couponExpiry}>Expires: {item.expiresAt}</Text>
            </View>
            <TouchableOpacity style={styles.copyBtn}>
              <Copy size={16} color={Colors.primary} />
            </TouchableOpacity>
          </View>
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
  couponCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    ...Shadow.card,
  },
  couponLeft: {
    width: 60,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  couponBody: {
    flex: 1,
    padding: 14,
    gap: 4,
  },
  couponHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  couponDiscount: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
  },
  couponCode: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: 4,
  },
  couponMin: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  couponExpiry: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  copyBtn: {
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
  },
});
