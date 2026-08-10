import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Typography, Shadow } from '@/constants/Typography';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { useStore } from '@/store/useStore';

const OTP_LENGTH = 4;

export default function OTPScreen() {
  const router = useRouter();
  const setAuthenticated = useStore((s) => s.setAuthenticated);
  const [codes, setCodes] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(45);
  const [loading, setLoading] = useState(false);
  const refs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const handleChange = (text: string, idx: number) => {
    const newCodes = [...codes];
    newCodes[idx] = text;
    setCodes(newCodes);
    if (text && idx < OTP_LENGTH - 1) {
      refs.current[idx + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace' && !codes[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAuthenticated(true);
      router.replace('/(tabs)');
    }, 1200);
  };

  const isComplete = codes.every((c) => c.length === 1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo size={56} showText={false} />
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.subtitle}>
          Enter the {OTP_LENGTH}-digit code sent to{'\n'}your email address
        </Text>
      </View>

      <View style={styles.codeRow}>
        {codes.map((code, idx) => (
          <View key={idx} style={[styles.codeBox, code && styles.codeBoxFilled]}>
            <TextInput
              ref={(r) => { refs.current[idx] = r; }}
              style={styles.codeInput}
              value={code}
              onChangeText={(t) => handleChange(t.replace(/[^0-9]/g, ''), idx)}
              onKeyPress={(e) => handleKeyPress(e, idx)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              autoFocus={idx === 0}
            />
          </View>
        ))}
      </View>

      <View style={styles.timerRow}>
        <Text style={styles.timerText}>
          {timer > 0 ? `Resend code in ${timer}s` : 'Did not receive the code?'}
        </Text>
        {timer === 0 && (
          <TouchableOpacity onPress={() => setTimer(45)}>
            <Text style={styles.resendBtn}> Resend</Text>
          </TouchableOpacity>
        )}
      </View>

      <Button title="Verify" onPress={handleVerify} loading={loading} disabled={!isComplete} fullWidth size="lg" style={{ marginTop: 32 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 16,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  codeBox: {
    width: 64,
    height: 72,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.border,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeBoxFilled: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(10,91,255,0.05)',
  },
  codeInput: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.textPrimary,
    width: '100%',
    height: '100%',
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  timerText: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  resendBtn: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '700',
  },
});
