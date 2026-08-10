import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Typography, Shadow } from '@/constants/Typography';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Logo } from '@/components/ui/Logo';
import { useStore } from '@/store/useStore';
import { Mail, Lock, Eye, EyeOff, Phone, User, MapPin, Camera, Check } from 'lucide-react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const setAuthenticated = useStore((s) => s.setAuthenticated);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: 'United States',
    city: 'New York',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (key: string, value: string) => setForm({ ...form, [key]: value });

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/otp');
    }, 1200);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Logo size={56} showText={false} />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join Linkly and book trusted professionals</Text>
      </View>

      <View style={styles.avatarWrap}>
        <View style={styles.avatarPlaceholder}>
          <Camera size={28} color={Colors.textMuted} />
        </View>
        <TouchableOpacity style={styles.avatarEditBtn}>
          <Camera size={14} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Input label="First Name" placeholder="John" value={form.firstName} onChangeText={(v) => update('firstName', v)} icon={<User size={20} color={Colors.textSecondary} />} />
          </View>
          <View style={{ flex: 1 }}>
            <Input label="Last Name" placeholder="Doe" value={form.lastName} onChangeText={(v) => update('lastName', v)} />
          </View>
        </View>
        <Input label="Phone" placeholder="+1 234 567 8901" value={form.phone} onChangeText={(v) => update('phone', v)} keyboardType="phone-pad" icon={<Phone size={20} color={Colors.textSecondary} />} />
        <Input label="Email" placeholder="you@example.com" value={form.email} onChangeText={(v) => update('email', v)} keyboardType="email-address" autoCapitalize="none" icon={<Mail size={20} color={Colors.textSecondary} />} />
        <Input label="Password" placeholder="Create a password" value={form.password} onChangeText={(v) => update('password', v)} secureTextEntry={!showPassword} icon={<Lock size={20} color={Colors.textSecondary} />} rightIcon={<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={20} color={Colors.textSecondary} /> : <Eye size={20} color={Colors.textSecondary} />}</TouchableOpacity>} />
        <Input label="Confirm Password" placeholder="Re-enter password" value={form.confirmPassword} onChangeText={(v) => update('confirmPassword', v)} secureTextEntry={!showPassword} icon={<Lock size={20} color={Colors.textSecondary} />} />
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Input label="Country" placeholder="United States" value={form.country} onChangeText={(v) => update('country', v)} icon={<MapPin size={20} color={Colors.textSecondary} />} />
          </View>
          <View style={{ flex: 1 }}>
            <Input label="City" placeholder="New York" value={form.city} onChangeText={(v) => update('city', v)} />
          </View>
        </View>

        <TouchableOpacity style={styles.termsRow} onPress={() => setAcceptTerms(!acceptTerms)}>
          <View style={[styles.checkbox, acceptTerms && styles.checkboxActive]}>
            {acceptTerms && <Check size={14} color={Colors.white} />}
          </View>
          <Text style={styles.termsText}>
            I accept the <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        <Button title="Create Account" onPress={handleRegister} loading={loading} disabled={!acceptTerms} fullWidth size="lg" style={{ marginTop: 8 }} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
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
    paddingTop: 50,
    paddingBottom: 20,
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
  avatarWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.sm,
  },
  avatarEditBtn: {
    position: 'absolute',
    bottom: 4,
    right: '42%',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  form: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 24,
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  termsLink: {
    color: Colors.primary,
    fontWeight: '600',
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
