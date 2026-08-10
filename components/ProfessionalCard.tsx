import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow } from '@/constants/Typography';
import { Star, BadgeCheck, MapPin } from 'lucide-react-native';
import { Rating } from './rating';
import { Badge } from './Badge';
import { Professional } from '@/types';
import { useStore } from '@/store/useStore';
import { Heart } from 'lucide-react-native';

interface ProfessionalCardProps {
  professional: Professional;
  onPress?: () => void;
  style?: ViewStyle;
  variant?: 'default' | 'compact' | 'horizontal';
}

export function ProfessionalCard({ professional: pro, onPress, style, variant = 'default' }: ProfessionalCardProps) {
  const favorites = useStore((s) => s.favorites);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const isFav = favorites.includes(pro.id);

  if (variant === 'compact') {
    return (
      <View style={[styles.compactCard, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
          <Image source={{ uri: pro.avatar }} style={styles.compactAvatar} />
          <Text style={styles.compactName} numberOfLines={1}>{pro.name}</Text>
          <Text style={styles.compactCategory}>{pro.category}</Text>
          <Rating value={pro.rating} size={12} showValue reviewCount={pro.reviewCount} />
        </TouchableOpacity>
      </View>
    );
  }

  if (variant === 'horizontal') {
    return (
      <View style={[styles.horizontalCard, style]}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={{ flex: 1 }}>
          <View style={{ position: 'relative' }}>
            <Image source={{ uri: pro.coverImage }} style={styles.horizontalImage} />
            <View style={styles.horizontalFavBtn}>
              <Heart size={16} color={isFav ? Colors.danger : Colors.white} fill={isFav ? Colors.danger : 'transparent'} onPress={() => toggleFavorite(pro.id)} />
            </View>
          </View>
          <View style={styles.horizontalInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.horizontalName} numberOfLines={1}>{pro.name}</Text>
              {pro.isVerified && <BadgeCheck size={16} color={Colors.primary} fill={Colors.primary} />}
            </View>
            <Text style={styles.horizontalCategory}>{pro.category}</Text>
            <View style={styles.horizontalMeta}>
              <Rating value={pro.rating} size={12} showValue reviewCount={pro.reviewCount} />
              <View style={styles.dotSep} />
              <MapPin size={11} color={Colors.textSecondary} />
              <Text style={styles.distance}>{pro.distance}</Text>
            </View>
            <Text style={styles.price}>From ${pro.priceFrom}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.card, style]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
        <View style={{ position: 'relative' }}>
          <Image source={{ uri: pro.coverImage }} style={styles.coverImage} />
          <View style={styles.favBtn}>
            <Heart size={18} color={isFav ? Colors.danger : Colors.white} fill={isFav ? Colors.danger : 'transparent'} onPress={() => toggleFavorite(pro.id)} />
          </View>
          {pro.isTopRated && (
            <View style={styles.topRatedBadge}>
              <Star size={10} color={Colors.white} fill={Colors.white} strokeWidth={0} />
              <Text style={styles.topRatedText}>Top Rated</Text>
            </View>
          )}
        </View>
        <View style={styles.cardBody}>
          <View style={styles.avatarRow}>
            <Image source={{ uri: pro.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.name} numberOfLines={1}>{pro.name}</Text>
                {pro.isVerified && <BadgeCheck size={16} color={Colors.primary} fill={Colors.primary} />}
              </View>
              <Text style={styles.category}>{pro.category}</Text>
            </View>
          </View>
          <View style={styles.metaRow}>
            <Rating value={pro.rating} size={13} showValue reviewCount={pro.reviewCount} />
            <View style={styles.dotSep} />
            <MapPin size={12} color={Colors.textSecondary} />
            <Text style={styles.distance}>{pro.distance}</Text>
          </View>
          <View style={styles.badgeRow}>
            {pro.badges.slice(0, 3).map((b) => (
              <Badge key={b} label={b} variant="primary" size="sm" />
            ))}
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>From</Text>
            <Text style={styles.price}>${pro.priceFrom}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    overflow: 'hidden',
    ...Shadow.card,
  },
  coverImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  favBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRatedBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(255,138,0,0.95)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  topRatedText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  cardBody: {
    padding: 14,
    gap: 10,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    flexShrink: 1,
  },
  category: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dotSep: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.grayDark,
  },
  distance: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  priceLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
  fontWeight: '500',
  flex: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
  },
  compactCard: {
    width: 140,
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    ...Shadow.card,
  },
  compactAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  compactName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  compactCategory: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  horizontalCard: {
    width: 240,
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    ...Shadow.card,
  },
  horizontalImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  horizontalFavBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalInfo: {
    padding: 12,
    gap: 6,
  },
  horizontalName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    flexShrink: 1,
  },
  horizontalCategory: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  horizontalMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
