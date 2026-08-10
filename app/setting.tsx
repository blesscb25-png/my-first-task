import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { Header } from '@/components/Header';
import { useStore } from '@/store/useStore';
import { Moon, Bell, Shield, Info, FileText, Trash2, ChevronRight, Globe, Lock } from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const isDarkMode = useStore((s) => s.isDarkMode);
  const toggleDarkMode = useStore((s) => s.toggleDarkMode);
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [bookingNotif, setBookingNotif] = useState(true);
  const [messageNotif, setMessageNotif] = useState(true);
  const [promoNotif, setPromoNotif] = useState(false);

  const handleDelete = () => {
    Alert.alert('Delete Account', 'Are you sure you want to delete your account? This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => router.replace('/welcome') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Header title="Settings" showBack titleStyle={{ marginLeft: 8 }} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
        <Text style={styles.sectionLabel}>Appearance</Text>
        <View style={styles.group}>
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Moon size={20} color={Colors.primary} />
              <Text style={styles.itemLabel}>Dark Mode</Text>
            </View>
            <Switch value={isDarkMode} onValueChange={toggleDarkMode} trackColor={{ false: Colors.grayMid, true: Colors.primary }} thumbColor={Colors.white} />
          </View>
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Globe size={20} color={Colors.primary} />
              <Text style={styles.itemLabel}>Language</Text>
            </View>
            <View style={styles.itemRight}>
              <Text style={styles.itemValue}>English</Text>
              <ChevronRight size={18} color={Colors.textMuted} />
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Notifications</Text>
        <View style={styles.group}>
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <Bell size={20} color={Colors.primary} />
              <Text style={styles.itemLabel}>Push Notifications</Text>
            </View>
            <Switch value={notifEnabled} onValueChange={setNotifEnabled} trackColor={{ false: Colors.grayMid, true: Colors.primary }} thumbColor={Colors.white} />
          </View>
          {notifEnabled && (
            <>
              <View style={styles.item}>
                <View style={styles.itemLeft}>
                  <Text style={styles.subLabel}>Booking Updates</Text>
                </View>
                <Switch value={bookingNotif} onValueChange={setBookingNotif} trackColor={{ false: Colors.grayMid, true: Colors.primary }} thumbColor={Colors.white} />
              </View>
              <View style={styles.item}>
                <View style={styles.itemLeft}>
                  <Text style={styles.subLabel}>Messages</Text>
                </View>
                <Switch value={messageNotif} onValueChange={setMessageNotif} trackColor={{ false: Colors.grayMid, true: Colors.primary }} thumbColor={Colors.white} />
              </View>
              <View style={styles.item}>
                <View style={styles.itemLeft}>
                  <Text style={styles.subLabel}>Promotions & Offers</Text>
                </View>
                <Switch value={promoNotif} onValueChange={setPromoNotif} trackColor={{ false: Colors.grayMid, true: Colors.primary }} thumbColor={Colors.white} />
              </View>
            </>
          )}
        </View>

        <Text style={styles.sectionLabel}>Privacy & Security</Text>
        <View style={styles.group}>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <View style={styles.itemLeft}>
              <Shield size={20} color={Colors.primary} />
              <Text style={styles.itemLabel}>Privacy</Text>
            </View>
            <ChevronRight size={18} color={Colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <View style={styles.itemLeft}>
              <Lock size={20} color={Colors.primary} />
              <Text style={styles.itemLabel}>Security</Text>
            </View>
            <ChevronRight size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>About</Text>
        <View style={styles.group}>
          <TouchableOpacity style={styles.item} onPress={() => router.push('/about')}>
            <View style={styles.itemLeft}>
              <Info size={20} color={Colors.primary} />
              <Text style={styles.itemLabel}>About Linkly</Text>
            </View>
            <ChevronRight size={18} color={Colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <View style={styles.itemLeft}>
              <FileText size={20} color={Colors.primary} />
              <Text style={styles.itemLabel}>Terms & Conditions</Text>
            </View>
            <ChevronRight size={18} color={Colors.textMuted} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => {}}>
            <View style={styles.itemLeft}>
              <FileText size={20} color={Colors.primary} />
              <Text style={styles.itemLabel}>Privacy Policy</Text>
            </View>
            <ChevronRight size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Trash2 size={20} color={Colors.danger} />
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 8,
    marginTop: 16,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  group: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    ...Shadow.card,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  subLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginLeft: 32,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemValue: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 24,
  },
  deleteText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.danger,
  },
});
