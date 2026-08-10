import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Logo } from '@/components/ui/Logo';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const taglineAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(taglineAnim, {
      toValue: 1,
      duration: 600,
      delay: 500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={Colors.gradientPrimary} style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }] }}>
        <Logo size={90} showText={false} />
      </Animated.View>
      <Animated.View style={{ opacity: taglineAnim }}>
        <Animated.Text style={styles.appName}>Linkly</Animated.Text>
        <Animated.Text style={styles.tagline}>Connect. Book. Relax.</Animated.Text>
      </Animated.View>
      <Animated.View style={[styles.loader, { opacity: taglineAnim }]}>
        <Animated.View style={styles.loaderBar} />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 42,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: -1,
    marginTop: 20,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  loader: {
    position: 'absolute',
    bottom: 80,
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
  },
  loaderBar: {
    width: '40%',
    height: '100%',
    borderRadius: 2,
    backgroundColor: Colors.orange,
  },
});
