import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { professionals } from '@/data/professional';
import { ProfessionalCard } from '@/components/ProfessionalCard';
import { Header } from '@/components/Header';
import { EmptyState } from '@/components/EmptyState';
import { Button } from '@/components/Button';
import { useStore } from '@/store/useStore';
import { Heart } from 'lucide-react-native';

export default function FavoritesScreen() {
  const router = useRouter();
  const favorites = useStore((s) => s.favorites);
  const favPros = professionals.filter((p) => favorites.includes(p.id));

  return (
    <View style={styles.container}>
      <Header title="Favorites" showBack titleStyle={{ marginLeft: 8 }} />

      <FlatList
        data={favPros}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        renderItem={({ item }) => (
          <ProfessionalCard professional={item} onPress={() => router.push(`./professional/${item.id}`)} />
        )}
        ListEmptyComponent={
          <EmptyState
            icon={<Heart size={36} color={Colors.primary} />}
            title="No favorites yet"
            subtitle="Tap the heart icon on any professional to save them here"
            action={<Button title="Explore Professionals" onPress={() => router.push('/explore')} size="md" />}
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
});
