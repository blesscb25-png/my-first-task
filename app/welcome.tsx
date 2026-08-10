import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Typography, Shadow } from '@/constants/Typography';
import { Button } from '@/components/Button';
import { Logo } from '@/components/ui/Logo';
import { useStore } from '@/store/useStore';
import { Mail, Apple } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  const setAuthenticated = useStore((s) => s.setAuthenticated);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradientPrimary}
        style={styles.topSection}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.logoWrap}>
          <Logo size={72} showText={false} />
          <Text style={styles.appName}>Linkly</Text>
          <Text style={styles.tagline}>Connect. Book. Relax.</Text>
        </View>
      </LinearGradient>

      <View style={styles.bottomSection}>
        <Text style={styles.welcomeTitle}>Welcome to Linkly</Text>
        <Text style={styles.welcomeSubtitle}>
          Book trusted professionals for any service, anytime, anywhere.
        </Text>

        <View style={styles.buttonGroup}>
          <Button title="Login" onPress={() => router.push('/login')} fullWidth size="lg" />
          <Button
            title="Create Account"
            onPress={() => router.push('/register')}
            variant="secondary"
            fullWidth
            size="lg"
          />
        </View>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn} onPress={() => { setAuthenticated(true); router.replace('/(tabs)'); }}>
            <Mail size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn} onPress={() => { setAuthenticated(true); router.replace('/(tabs)'); }}>
            <Apple size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn} onPress={() => { setAuthenticated(true); router.replace('/(tabs)'); }}>
            <Text style={styles.facebookIcon}>f</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => { setAuthenticated(true); router.replace('/(tabs)'); }} style={styles.guestBtn}>
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  topSection: {
    height: '42%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  logoWrap: {
    alignItems: 'center',
  },
  appName: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.white,
    marginTop: 16,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 6,
    fontWeight: '500',
  },
  bottomSection: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 36,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginTop: 8,
    lineHeight: 22,
  },
  buttonGroup: {
    gap: 12,
    marginTop: 32,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 28,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialBtn: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.sm,
  },
  facebookIcon: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1877F2',
  },
  guestBtn: {
    alignItems: 'center',
    marginTop: 28,
    paddingVertical: 12,
  },
  guestText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
});
