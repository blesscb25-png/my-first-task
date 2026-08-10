import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Typography, Shadow } from '@/constants/Typography';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Logo } from '@/components/ui/Logo';
import { useStore } from '@/store/useStore';
import { Mail, Lock, Eye, EyeOff, Apple, Check } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();
  const setAuthenticated = useStore((s) => s.setAuthenticated);
  const [email, setEmail] = useState('jessica@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAuthenticated(true);
      router.replace('/(tabs)');
    }, 1200);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Logo size={56} showText={false} />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to your Linkly account</Text>
      </View>

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
        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          icon={<Lock size={20} color={Colors.textSecondary} />}
          rightIcon={
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={20} color={Colors.textSecondary} /> : <Eye size={20} color={Colors.textSecondary} />}
            </TouchableOpacity>
          }
        />
        <View style={styles.rowBetween}>
          <TouchableOpacity style={styles.rememberRow} onPress={() => setRemember(!remember)}>
            <View style={[styles.checkbox, remember && styles.checkboxActive]}>
              {remember && <Check size={14} color={Colors.white} />}
            </View>
            <Text style={styles.rememberText}>Remember Me</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/forgot-password')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <Button title="Login" onPress={handleLogin} loading={loading} fullWidth size="lg" style={{ marginTop: 8 }} />
      </View>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>or login with</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialBtn} onPress={() => { setAuthenticated(true); router.replace('/(tabs)'); }}>
          <Mail size={20} color={Colors.textPrimary} />
          <Text style={styles.socialLabel}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn} onPress={() => { setAuthenticated(true); router.replace('/(tabs)'); }}>
          <Apple size={20} color={Colors.textPrimary} />
          <Text style={styles.socialLabel}>Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn} onPress={() => { setAuthenticated(true); router.replace('/(tabs)'); }}>
          <Text style={styles.facebookIcon}>f</Text>
          <Text style={styles.socialLabel}>Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Do not have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.footerLink}>Sign Up</Text>
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
  },
  form: {
    gap: 4,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  rememberText: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  forgotText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
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
    flex: 1,
    maxWidth: 100,
    height: 56,
    borderRadius: 18,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    ...Shadow.sm,
  },
  socialLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  facebookIcon: {
    fontSize: 22,
    lineHeight: 20,
    fontWeight: '800',
    color: '#1877F2',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
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
