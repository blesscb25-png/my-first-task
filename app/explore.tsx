import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { professionals } from '@/data/professional';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import { Header } from '@/components/Header';
import { EmptyState } from '@/components/EmptyState';
import { LayoutGrid, List, Map, SlidersHorizontal } from 'lucide-react-native';

type ViewMode = 'grid' | 'list' | 'map';
type SortMode = 'rating' | 'distance' | 'price';

export default function ExploreScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortMode, setSortMode] = useState<SortMode>('rating');

  const sorted = [...professionals].sort((a, b) => {
    if (sortMode === 'rating') return b.rating - a.rating;
    if (sortMode === 'price') return a.priceFrom - b.priceFrom;
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  return (
    <View style={styles.container}>
      <Header title="Explore" large titleStyle={{ marginLeft: 0 }} />
      <View style={styles.toolbar}>
        <View style={styles.viewToggle}>
          <TouchableOpacity style={[styles.toggleBtn, viewMode === 'list' && styles.toggleActive]} onPress={() => setViewMode('list')}>
            <List size={16} color={viewMode === 'list' ? Colors.white : Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.toggleBtn, viewMode === 'grid' && styles.toggleActive]} onPress={() => setViewMode('grid')}>
            <LayoutGrid size={16} color={viewMode === 'grid' ? Colors.white : Colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.toggleBtn, viewMode === 'map' && styles.toggleActive]} onPress={() => setViewMode('map')}>
            <Map size={16} color={viewMode === 'map' ? Colors.white : Colors.textSecondary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.sortBtn} onPress={() => {}}>
          <SlidersHorizontal size={16} color={Colors.primary} />
          <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sortChips}>
        {[
          { key: 'rating', label: 'Top Rated' },
          { key: 'distance', label: 'Nearest' },
          { key: 'price', label: 'Lowest Price' },
        ].map((s) => (
          <TouchableOpacity
            key={s.key}
            style={[styles.sortChip, sortMode === s.key && styles.sortChipActive]}
            onPress={() => setSortMode(s.key as SortMode)}
          >
            <Text style={[styles.sortChipText, sortMode === s.key && styles.sortChipTextActive]}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {viewMode === 'map' ? (
        <View style={styles.mapPlaceholder}>
          <Map size={48} color={Colors.primary} fill={'rgba(10,91,255,0.1)'} strokeWidth={1} />
          <Text style={styles.mapText}>Map View</Text>
          <Text style={styles.mapSubtext}>{professionals.length} professionals nearby</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 24 }} style={{ width: '100%' }}>
            {sorted.map((pro) => (
              <ProfessionalCard key={pro.id} professional={pro} variant="horizontal" onPress={() => router.push(`./professional/${pro.id}`)} />
            ))}
          </ScrollView>
        </View>
      ) : (
        <FlatList
          data={sorted}
          keyExtractor={(item) => item.id}
          numColumns={viewMode === 'grid' ? 2 : 1}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
          columnWrapperStyle={viewMode === 'grid' ? { gap: 14 } : undefined}
          ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
          renderItem={({ item }) => (
            <ProfessionalCard
              professional={item}
              variant={viewMode === 'grid' ? 'default' : 'horizontal'}
              style={viewMode === 'grid' ? { flex: 1 } : undefined}
              onPress={() => router.push(`./professional/${item.id}`)}
            />
          )}
          ListEmptyComponent={<EmptyState title="No professionals found" subtitle="Try adjusting your filters" />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 4,
    gap: 2,
    ...Shadow.sm,
  },
  toggleBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: Colors.primary,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    ...Shadow.sm,
  },
  sortText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
  },
  sortChips: {
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
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 48,
    backgroundColor: 'rgba(10,91,255,0.03)',
  },
  mapText: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 12,
  },
  mapSubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
