import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { Header } from '@/components/Header';
import { Badge } from '@/components/Badge';
import { useStore } from '@/store/useStore';
import {
  User as UserIcon,
  MapPin,
  CreditCard,
  Globe,
  Moon,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  Heart,
  Wallet,
  Settings as SettingsIcon,
  Calendar,
  Star,
  Shield,
} from 'lucide-react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const user = useStore((s) => s.user);
  const logout = useStore((s) => s.logout);
  const isDarkMode = useStore((s) => s.isDarkMode);
  const toggleDarkMode = useStore((s) => s.toggleDarkMode);

  const menuItems = [
    { icon: <Calendar size={20} color={Colors.primary} />, label: 'My Bookings', onPress: () => router.push('/(tabs)/bookings') },
    { icon: <Heart size={20} color={Colors.danger} />, label: 'Favorites', onPress: () => router.push('/favorites') },
    { icon: <Wallet size={20} color={Colors.orange} />, label: 'Wallet', onPress: () => router.push('/wallet') },
    { icon: <MapPin size={20} color={Colors.success} />, label: 'Addresses', onPress: () => {} },
    { icon: <CreditCard size={20} color={Colors.darkBlue} />, label: 'Saved Cards', onPress: () => {} },
    { icon: <Star size={20} color={Colors.warning} />, label: 'My Reviews', onPress: () => router.push('/reviews') },
    { icon: <Globe size={20} color={Colors.primary} />, label: 'Language', value: 'English', onPress: () => {} },
    { icon: <SettingsIcon size={20} color={Colors.textSecondary} />, label: 'Settings', onPress: () => router.push('/settings') },
    { icon: <HelpCircle size={20} color={Colors.primary} />, label: 'Help & Support', onPress: () => {} },
  ];

  return (
    <View style={styles.container}>
      <Header title="Profile" large titleStyle={{ marginLeft: 0 }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
        <LinearGradient
          colors={Colors.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.profileCard}
        >
          <View style={styles.profileTop}>
            <Image source={{ uri: user?.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
                {user?.isVerified && <Badge label="Verified" variant="neutral" size="sm" />}
              </View>
              <Text style={styles.email}>{user?.email}</Text>
              <Text style={styles.location}>{user?.city}, {user?.country}</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user?.totalBookings}</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user?.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>${user?.walletBalance?.toFixed(0)}</Text>
              <Text style={styles.statLabel}>Wallet</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.darkModeRow}>
          <View style={styles.darkModeLeft}>
            <Moon size={20} color={Colors.primary} />
            <Text style={styles.menuLabel}>Dark Mode</Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: Colors.grayMid, true: Colors.primary }}
            thumbColor={Colors.white}
          />
        </View>

        <View style={styles.menuList}>
          {menuItems.map((item, i) => (
            <TouchableOpacity key={i} style={styles.menuItem} onPress={item.onPress}>
              <View style={styles.menuLeft}>
                {item.icon}
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <View style={styles.menuRight}>
                {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
                <ChevronRight size={18} color={Colors.textMuted} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => { logout(); router.replace('/welcome'); }}>
          <LogOut size={20} color={Colors.danger} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Linkly v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    ...Shadow.lg,
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.3,
  },
  email: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 4,
  },
  location: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  darkModeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    ...Shadow.sm,
  },
  darkModeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuList: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    ...Shadow.card,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuValue: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.danger,
  },
  version: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    fontWeight: '500',
  },
});
