import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { Header } from '@/components/Header';
import { Logo } from '@/components/ui/Logo';
import { Mail, Globe, Star, Heart, Award } from 'lucide-react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Header title="About" showBack titleStyle={{ marginLeft: 8 }} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32, alignItems: 'center' }}>
        <View style={styles.logoWrap}>
          <Logo size={80} showText={false} />
          <Text style={styles.appName}>Linkly</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <Text style={styles.description}>
          Linkly is your go-to platform for booking trusted professionals for any service. From beauty and wellness to home repairs and professional services, we connect you with verified experts in your area.
        </Text>

        <View style={styles.featuresRow}>
          <View style={styles.feature}>
            <View style={styles.featureIcon}><Award size={24} color={Colors.primary} /></View>
            <Text style={styles.featureTitle}>Verified Pros</Text>
            <Text style={styles.featureText}>All professionals are vetted</Text>
          </View>
          <View style={styles.feature}>
            <View style={styles.featureIcon}><Star size={24} color={Colors.orange} fill={Colors.orange} strokeWidth={0} /></View>
            <Text style={styles.featureTitle}>Top Rated</Text>
            <Text style={styles.featureText}>Best in your area</Text>
          </View>
          <View style={styles.feature}>
            <View style={styles.featureIcon}><Heart size={24} color={Colors.danger} fill={Colors.danger} strokeWidth={0} /></View>
            <Text style={styles.featureTitle}>Trusted</Text>
            <Text style={styles.featureText}>Loved by thousands</Text>
          </View>
        </View>

        <View style={styles.contactCard}>
          <TouchableOpacity style={styles.contactRow} onPress={() => Linking.openURL('mailto:support@linkly.app')}>
            <Mail size={20} color={Colors.primary} />
            <Text style={styles.contactText}>support@linkly.app</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.contactRow}>
            <Globe size={20} color={Colors.primary} />
            <Text style={styles.contactText}>www.linkly.app</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.copyright}>© 2026 Linkly. All rights reserved.</Text>
        <Text style={styles.tagline}>Made with care for our users</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  logoWrap: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
  },
  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.darkBlue,
    marginTop: 12,
    letterSpacing: -0.5,
  },
  version: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
    width: '100%',
  },
  feature: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    gap: 6,
    ...Shadow.card,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(10,91,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  featureText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  contactCard: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    ...Shadow.card,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  contactText: {
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 8,
  },
  copyright: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 24,
    fontWeight: '500',
  },
  tagline: {
    fontSize: 13,
    color: Colors.primary,
    marginTop: 4,
    fontWeight: '600',
  },
});
