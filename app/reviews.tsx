import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { reviews } from '@/data/reviews';
import { ReviewCard } from '@/components/ReviewCard';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { Rating } from '@/components/Rating';
import { Star, Camera } from 'lucide-react-native';

export default function ReviewsScreen() {
  const router = useRouter();
  const [showWrite, setShowWrite] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <View style={styles.container}>
      <Header title="Reviews" showBack titleStyle={{ marginLeft: 8 }} />

      <View style={styles.summaryCard}>
        <View style={styles.summaryLeft}>
          <Text style={styles.bigRating}>4.9</Text>
          <Rating value={4.9} size={14} showValue={false} />
          <Text style={styles.totalReviews}>1,000 reviews</Text>
        </View>
        <View style={styles.summaryRight}>
          {[5, 4, 3, 2, 1].map((star) => (
            <View key={star} style={styles.barRow}>
              <Text style={styles.barLabel}>{star}</Text>
              <Star size={12} color={Colors.orange} fill={Colors.orange} strokeWidth={0} />
              <View style={styles.barBg}>
                <View style={[styles.barFill, { width: `${[85, 10, 3, 1, 1][5 - star]}%` }]} />
              </View>
            </View>
          ))}
        </View>
      </View>

      <Button title="Write a Review" fullWidth size="md" style={{ marginHorizontal: 16, marginBottom: 16 }} onPress={() => setShowWrite(true)} />

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => <ReviewCard review={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    gap: 20,
    ...Shadow.card,
  },
  summaryLeft: {
    alignItems: 'center',
  },
  bigRating: {
    fontSize: 48,
    fontWeight: '900',
    color: Colors.primary,
  },
  totalReviews: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  summaryRight: {
    flex: 1,
    gap: 6,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  barLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
    width: 12,
  },
  barBg: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.grayMid,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: Colors.orange,
  },
});
