import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { professionals } from '@/data/professional';
import { categories } from '@/data/categories';
import { promotions } from '@/data/mockData';
import { reviews } from '@/data/reviews';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import { CategoryCard } from '@/components/Categorycard';
import { Rating } from '@/components/Rating';
import { Badge } from '@/components/Badge';
import { useStore } from '@/store/useStore';
import { Bell, Search, MapPin, ChevronRight, Star, Zap, TrendingUp, Heart, Quote } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const user = useStore((s) => s.user);
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = new Animated.Value(0);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const topRated = professionals.filter((p) => p.isTopRated).slice(0, 6);
  const nearby = professionals.slice(0, 6);
  const recommended = professionals.slice(2, 8);
  const featured = professionals.slice(0, 4);
  const testimonials = reviews.slice(0, 3);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradientPrimary}
        style={styles.topBg}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.white} />}
      >
        <View style={styles.header}>
          <View style={styles.greetingRow}>
            <View>
              <Text style={styles.greeting}>Good Morning</Text>
              <Text style={styles.userName}>{user?.firstName} {user?.lastName}</Text>
            </View>
            <TouchableOpacity style={styles.bellBtn} onPress={() => router.push('/notification')}>
              <Bell size={20} color={Colors.white} />
              <View style={styles.bellDot} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.locationRow} onPress={() => router.push('/explore')}>
            <MapPin size={14} color={Colors.white} />
            <Text style={styles.location}>{user?.city}, {user?.country}</Text>
            <ChevronRight size={14} color={Colors.white} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/search')}>
            <Search size={18} color={Colors.textSecondary} />
            <Text style={styles.searchPlaceholder}>Search for services, professionals...</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <SectionHeader title="Categories" onSeeAll={() => router.push('/categories')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
            {categories.slice(0, 8).map((cat) => (
              <CategoryCard key={cat.id} category={cat} size="md" onPress={() => router.push(`/category/${cat.id}`)} />
            ))}
          </ScrollView>

          <View style={styles.promoWrap}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled snapToInterval={width - 32}>
              {promotions.map((promo) => (
                <TouchableOpacity key={promo.id} style={styles.promoCard} activeOpacity={0.9} onPress={() => router.push('/promotions')}>
                  <LinearGradient colors={promo.gradient} style={styles.promoGradient}>
                    <View style={styles.promoContent}>
                      <View>
                        <Badge label={`${promo.discount} OFF`} variant="neutral" size="md" />
                        <Text style={styles.promoTitle}>{promo.title}</Text>
                        <Text style={styles.promoSubtitle}>{promo.subtitle}</Text>
                        <Text style={styles.promoCode}>Code: {promo.code}</Text>
                      </View>
                      <Image source={{ uri: promo.image }} style={styles.promoImage} />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <SectionHeader title="Popular Professionals" onSeeAll={() => router.push('/explore')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 14 }}>
            {topRated.map((pro) => (
              <ProfessionalCard key={pro.id} professional={pro} variant="horizontal" onPress={() => router.push(`./professional/${pro.id}`)} />
            ))}
          </ScrollView>

          <SectionHeader title="Nearby Professionals" onSeeAll={() => router.push('/explore')} />
          <View style={styles.grid}>
            {nearby.slice(0, 4).map((pro) => (
              <ProfessionalCard key={pro.id} professional={pro} onPress={() => router.push(`./professional/${pro.id}`)} />
            ))}
          </View>

          <SectionHeader title="Featured Services" onSeeAll={() => router.push('/categories')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
            {featured.flatMap((p) => p.services.slice(0, 1).map((s) => (
              <TouchableOpacity key={s.id} style={styles.serviceCard} onPress={() => router.push(`./professional/${p.id}`)}>
                <Image source={{ uri: p.coverImage }} style={styles.serviceImage} />
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName} numberOfLines={1}>{s.name}</Text>
                  <Text style={styles.servicePro} numberOfLines={1}>{p.name}</Text>
                  <View style={styles.serviceMeta}>
                    <Rating value={p.rating} size={11} showValue reviewCount={p.reviewCount} />
                  </View>
                  <Text style={styles.servicePrice}>${s.price}</Text>
                </View>
              </TouchableOpacity>
            )))}
          </ScrollView>

          <SectionHeader title="Top Rated" onSeeAll={() => router.push('/explore')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 14 }}>
            {topRated.map((pro) => (
              <ProfessionalCard key={pro.id} professional={pro} variant="horizontal" onPress={() => router.push(`./professional/${pro.id}`)} />
            ))}
          </ScrollView>

          <SectionHeader title="Recommended For You" onSeeAll={() => router.push('/explore')} />
          <View style={styles.grid}>
            {recommended.slice(0, 4).map((pro) => (
              <ProfessionalCard key={pro.id} professional={pro} onPress={() => router.push(`./professional/${pro.id}`)} />
            ))}
          </View>

          <SectionHeader title="Special Offers" onSeeAll={() => router.push('/promotions')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
            {promotions.map((promo) => (
              <TouchableOpacity key={promo.id} style={styles.offerCard} onPress={() => router.push('/promotions')}>
                <LinearGradient colors={promo.gradient} style={styles.offerGradient}>
                  <Zap size={20} color={Colors.white} />
                  <Text style={styles.offerDiscount}>{promo.discount}</Text>
                  <Text style={styles.offerTitle}>{promo.title}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <SectionHeader title="Trending Services" onSeeAll={() => router.push('/categories')} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
            {categories.slice(8, 16).map((cat) => (
              <CategoryCard key={cat.id} category={cat} size="lg" onPress={() => router.push(`/category/${cat.id}`)} />
            ))}
          </ScrollView>

          <SectionHeader title="Testimonials" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 14 }}>
            {testimonials.map((rev) => (
              <View key={rev.id} style={styles.testimonialCard}>
                <Quote size={24} color={Colors.primary} fill={Colors.primary} strokeWidth={0} />
                <Text style={styles.testimonialText}>{rev.comment}</Text>
                <View style={styles.testimonialUser}>
                  <Image source={{ uri: rev.userAvatar }} style={styles.testimonialAvatar} />
                  <View>
                    <Text style={styles.testimonialName}>{rev.userName}</Text>
                    <Rating value={rev.rating} size={11} showValue={false} />
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={{ height: 24 }} />
        </View>
      </ScrollView>
    </View>
  );
}

function SectionHeader({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Text style={styles.seeAllText}>See All</Text>
          <ChevronRight size={14} color={Colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 240,
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  greetingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  userName: {
    fontSize: 22,
    color: Colors.white,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.orange,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 12,
  },
  location: {
    fontSize: 13,
    color: Colors.white,
    fontWeight: '600',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    marginTop: 16,
    ...Shadow.md,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: 8,
    paddingTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 14,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  seeAllText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  promoWrap: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  promoCard: {
    width: width - 32,
    borderRadius: 24,
    overflow: 'hidden',
    marginRight: 0,
  },
  promoGradient: {
    borderRadius: 24,
    padding: 20,
    minHeight: 160,
  },
  promoContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  promoTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    marginTop: 10,
    letterSpacing: -0.3,
  },
  promoSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
  promoCode: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: '700',
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  promoImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  grid: {
    paddingHorizontal: 16,
    gap: 14,
  },
  serviceCard: {
    width: 160,
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    ...Shadow.card,
  },
  serviceImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  serviceInfo: {
    padding: 12,
    gap: 4,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  servicePro: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  serviceMeta: {
    marginTop: 2,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
    marginTop: 4,
  },
  offerCard: {
    width: 140,
    borderRadius: 20,
    overflow: 'hidden',
    ...Shadow.card,
  },
  offerGradient: {
    padding: 16,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  offerDiscount: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.white,
  },
  offerTitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    textAlign: 'center',
  },
  testimonialCard: {
    width: 280,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    gap: 12,
    ...Shadow.card,
  },
  testimonialText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  testimonialUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  testimonialAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  testimonialName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
});
