import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { categories } from '@/data/categories';
import { CategoryCard } from '@/components/CategoryCard';
import { Header } from '@/components/Header';
import { Search } from 'lucide-react-native';

export default function CategoriesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Header title="Categories" large titleStyle={{ marginLeft: 0 }} />
      <TouchableOpacity style={styles.searchBar} onPress={() => router.push('/search')}>
        <Search size={18} color={Colors.textSecondary} />
        <Text style={styles.searchPlaceholder}>Search categories...</Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
        <View style={styles.grid}>
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} size="md" onPress={() => router.push(`/category/${cat.id}`)} />
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 48,
    marginHorizontal: 16,
    marginBottom: 16,
    ...Shadow.sm,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
});
