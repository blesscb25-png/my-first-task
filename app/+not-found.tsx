import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Button } from '@/components/Button';
import { Logo } from '@/components/ui/Logo';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Logo size={56} showText={false} />
      <Text style={styles.emoji}>🤔</Text>
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.subtitle}>The page you are looking for does not exist or has been moved.</Text>
      <Link href="/(tabs)" asChild>
        <Button title="Back to Home" size="lg" onPress={() => {}} style={{ marginTop: 24 }} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emoji: {
    fontSize: 48,
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginTop: 16,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
});
