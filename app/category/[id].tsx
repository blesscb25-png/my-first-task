import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { categories } from '@/data/categories';
import { professionals } from '@/data/professional';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import { Header } from '@/components/Header';
import { EmptyState } from '@/components/EmptyState';
import { SlidersHorizontal } from 'lucide-react-native';

export default function CategoryScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const category = categories.find((c) => c.id === id);
  const [sortBy, setSortBy] = useState<'rating' | 'price' | 'distance'>('rating');

  const filtered = professionals.filter((p) => p.categoryId === id);
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price') return a.priceFrom - b.priceFrom;
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  return (
    <View style={styles.container}>
      <Header title={category?.name || 'Category'} showBack titleStyle={{ marginLeft: 8 }} />
      {category && (
        <View style={styles.heroWrap}>
          <Image source={{ uri: category.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroIcon}>{category.icon}</Text>
            <Text style={styles.heroName}>{category.name}</Text>
            <Text style={styles.heroCount}>{category.count} professionals available</Text>
          </View>
        </View>
      )}

      <View style={styles.sortRow}>
        {[
          { key: 'rating', label: 'Top Rated' },
          { key: 'price', label: 'Lowest Price' },
          { key: 'distance', label: 'Nearest' },
        ].map((s) => (
          <TouchableOpacity
            key={s.key}
            style={[styles.sortChip, sortBy === s.key && styles.sortChipActive]}
            onPress={() => setSortBy(s.key as any)}
          >
            <Text style={[styles.sortChipText, sortBy === s.key && styles.sortChipTextActive]}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={sorted}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        renderItem={({ item }) => (
          <ProfessionalCard professional={item} variant="horizontal" onPress={() => router.push(`./professional/${item.id}`)} />
        )}
        ListEmptyComponent={
          <EmptyState
            title="No professionals yet"
            subtitle={`No ${category?.name || 'professionals'} found in your area yet. Check back soon!`}
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
  heroWrap: {
    marginHorizontal: 16,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    ...Shadow.card,
  },
  heroImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  heroIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  heroName: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.3,
  },
  heroCount: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
  sortRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 12,
  },
  sortChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    ...Shadow.sm,
  },
  sortChipActive: {
    backgroundColor: Colors.primary,
  },
  sortChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  sortChipTextActive: {
    color: Colors.white,
  },
});
