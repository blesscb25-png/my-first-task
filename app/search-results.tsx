import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { professionals } from '@/data/professional';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import { Header } from '@/components/Header';
import { EmptyState } from '@/components/EmptyState';
import { Search, X } from 'lucide-react-native';

export default function SearchResultsScreen() {
  const router = useRouter();
  const { q } = useLocalSearchParams<{ q: string }>();
  const [query, setQuery] = useState(q || '');

  const results = professionals.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase()) ||
    p.bio.toLowerCase().includes(query.toLowerCase()) ||
    p.services.some((s) => s.name.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={8}>
          <X size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.searchInputWrap}>
          <Search size={18} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor={Colors.textMuted}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
        </View>
      </View>

      <Text style={styles.resultCount}>{results.length} results found</Text>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        renderItem={({ item }) => (
          <ProfessionalCard professional={item} variant="horizontal" onPress={() => router.push(`./professional/${item.id}`)} />
        )}
        ListEmptyComponent={
          <EmptyState
            title="No results found"
            subtitle={`No professionals match "${query}". Try a different search term.`}
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
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 56,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Colors.white,
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
  resultCount: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
