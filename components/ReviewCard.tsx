import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { Review } from '@/types';
import { Rating } from './Rating';
import { ThumbsUp } from 'lucide-react-native';

interface ReviewCardProps {
  review: Review;
  onHelpful?: () => void;
  style?: ViewStyle;
}

export function ReviewCard({ review, onHelpful, style }: ReviewCardProps) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        <Image source={{ uri: review.userAvatar }} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{review.userName}</Text>
          <View style={styles.metaRow}>
            <Rating value={review.rating} size={12} showValue={false} />
            <Text style={styles.date}>{review.date}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.comment}>{review.comment}</Text>
      {review.images && review.images.length > 0 && (
        <View style={styles.imageRow}>
          {review.images.map((img, i) => (
            <Image key={i} source={{ uri: img }} style={styles.reviewImage} />
          ))}
        </View>
      )}
      <TouchableOpacity onPress={onHelpful} style={styles.helpfulBtn}>
        <ThumbsUp size={14} color={review.isHelpful ? Colors.primary : Colors.textSecondary} fill={review.isHelpful ? Colors.primary : 'transparent'} />
        <Text style={[styles.helpfulText, review.isHelpful && { color: Colors.primary }]}>
          Helpful ({review.helpful})
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    gap: 12,
    ...Shadow.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  comment: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  imageRow: {
    flexDirection: 'row',
    gap: 8,
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  helpfulBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  helpfulText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});
