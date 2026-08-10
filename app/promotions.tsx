import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { promotions } from '@/data/mockData';
import { Header } from '@/components/Header';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Zap, Clock, ChevronRight } from 'lucide-react-native';

export default function PromotionsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="Promotions" showBack titleStyle={{ marginLeft: 8 }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        {promotions.map((promo) => (
          <View key={promo.id} style={styles.promoCard}>
            <LinearGradient
              colors={promo.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.promoGradient}
            >
              <View style={styles.promoTop}>
                <View style={styles.promoBadge}>
                  <Zap size={14} color={Colors.white} fill={Colors.white} strokeWidth={0} />
                  <Text style={styles.promoBadgeText}>{promo.discount} OFF</Text>
                </View>
                <Image source={{ uri: promo.image }} style={styles.promoImage} />
              </View>
              <Text style={styles.promoTitle}>{promo.title}</Text>
              <Text style={styles.promoSubtitle}>{promo.subtitle}</Text>
              <View style={styles.promoFooter}>
                <View style={styles.promoCodeWrap}>
                  <Text style={styles.promoCodeLabel}>Code:</Text>
                  <Text style={styles.promoCode}>{promo.code}</Text>
                </View>
                <View style={styles.promoExpiry}>
                  <Clock size={12} color={Colors.white} />
                  <Text style={styles.promoExpiryText}>Exp: {promo.expiresAt}</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        ))}

        <Button title="Browse Services" fullWidth size="lg" style={{ marginTop: 8 }} onPress={() => router.push('/categories')} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  promoCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    ...Shadow.card,
  },
  promoGradient: {
    padding: 20,
  minHeight: 180,
  justifyContent: 'space-between',
  },
  promoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  promoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  promoBadgeText: {
    fontSize: 13,
    color: Colors.white,
    fontWeight: '800',
  },
  promoImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  promoTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.3,
    marginTop: 12,
  },
  promoSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
  promoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  promoCodeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  promoCodeLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  promoCode: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  promoExpiry: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  promoExpiryText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
});
