import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Logo } from '@/components/ui/Logo';
import { Mail } from 'lucide-react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
      <View style={styles.header}>
        <Logo size={56} showText={false} />
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          {sent ? 'A reset link has been sent to your email' : 'Enter your email to receive a reset link'}
        </Text>
      </View>

      {!sent ? (
        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon={<Mail size={20} color={Colors.textSecondary} />}
          />
          <Button title="Send Reset Link" onPress={() => setSent(true)} fullWidth size="lg" />
        </View>
      ) : (
        <View style={styles.form}>
          <View style={styles.successCard}>
            <Text style={styles.successIcon}>✓</Text>
            <Text style={styles.successText}>
              We have sent a password reset link to {email || 'your email'}. Please check your inbox.
            </Text>
          </View>
          <Button title="Back to Login" onPress={() => router.push('/login')} fullWidth size="lg" />
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Remember your password? </Text>
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.footerLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginTop: 6,
    textAlign: 'center',
  },
  form: {
    gap: 4,
  },
  successCard: {
    backgroundColor: 'rgba(34,197,94,0.08)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  successIcon: {
    fontSize: 40,
    color: Colors.success,
    fontWeight: '900',
  },
  successText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  footerLink: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '700',
  },
});
