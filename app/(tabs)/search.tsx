import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { categories } from '@/data/categories';
import { CategoryCard } from '@/components/Categorycard';
import { useStore } from '@/store/useStore';
import { Search, X, Mic, TrendingUp, Clock } from 'lucide-react-native';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const recentSearches = useStore((s) => s.recentSearches);
  const addRecentSearch = useStore((s) => s.addRecentSearch);
  const clearRecentSearches = useStore((s) => s.clearRecentSearches);
  const trendingSearches = ['Nail technician', 'Barber near me', 'Hair stylist', 'Massage therapy', 'House cleaning', 'Electrician', 'Photographer', 'Makeup artist'];

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (term: string) => {
    setQuery(term);
    if (term.trim()) {
      addRecentSearch(term.trim());
      router.push(`/search-results?q=${encodeURIComponent(term)}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <X size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.searchInputWrap}>
            <Search size={18} color={Colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search services, professionals..."
              placeholderTextColor={Colors.textMuted}
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={() => handleSearch(query)}
              autoFocus
              returnKeyType="search"
            />
            <TouchableOpacity style={styles.micBtn}>
              <Mic size={18} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {!query && (
          <>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleRow}>
                  <Clock size={16} color={Colors.textPrimary} />
                  <Text style={styles.sectionTitle}>Recent Searches</Text>
                </View>
                <TouchableOpacity onPress={clearRecentSearches}>
                  <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.chipsWrap}>
                {recentSearches.map((s, i) => (
                  <TouchableOpacity key={i} style={styles.chip} onPress={() => handleSearch(s)}>
                    <Text style={styles.chipText}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionTitleRow}>
                <TrendingUp size={16} color={Colors.textPrimary} />
                <Text style={styles.sectionTitle}>Trending Searches</Text>
              </View>
              <View style={styles.chipsWrap}>
                {trendingSearches.map((s, i) => (
                  <TouchableOpacity key={i} style={[styles.chip, styles.trendingChip]} onPress={() => handleSearch(s)}>
                    <Text style={styles.chipText}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Browse Categories</Text>
              <View style={styles.categoryGrid}>
                {categories.map((cat) => (
                  <CategoryCard key={cat.id} category={cat} size="md" onPress={() => router.push(`/category/${cat.id}`)} />
                ))}
              </View>
            </View>
          </>
        )}

        {query && filteredCategories.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.categoryGrid}>
              {filteredCategories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} size="md" onPress={() => router.push(`/category/${cat.id}`)} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Colors.white,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.gray,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  micBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(10,91,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 14,
  },
  clearText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    ...Shadow.sm,
  },
  trendingChip: {
    backgroundColor: 'rgba(255,138,0,0.08)',
  },
  chipText: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
});
