import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Spacing, Radius, Shadow, Typography } from '@/constants/Typography';
import { professionals } from '@/data/professional';
import { bookings } from '@/data/bookings';
import { reviews } from '@/data/reviews';
import { categories } from '@/data/categories';
import { Badge } from '@/components/Badge';
import { Header } from '@/components/Header';
import { Rating } from '@/components/Rating';
import {
  Users,
  Briefcase,
  Calendar,
  DollarSign,
  TrendingUp,
  Star,
  BarChart3,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  FileText,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Tab = 'analytics' | 'users' | 'professionals' | 'bookings' | 'reports' | 'approvals';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('analytics');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Colors.gradientPrimary}
        style={styles.topBg}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.adminRow}>
            <View style={styles.adminIcon}>
              <BarChart3 size={24} color={Colors.white} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.adminTitle}>Admin Dashboard</Text>
              <Text style={styles.adminSub}>Linkly Platform Overview</Text>
            </View>
            <TouchableOpacity style={styles.settingsBtn}>
              <Settings size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabBar}>
          {[
            { key: 'analytics', label: 'Analytics' },
            { key: 'users', label: 'Users' },
            { key: 'professionals', label: 'Pros' },
            { key: 'bookings', label: 'Bookings' },
            { key: 'reports', label: 'Reports' },
            { key: 'approvals', label: 'Approvals' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key as Tab)}
            >
              <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.content}>
          {activeTab === 'analytics' && (
            <>
              <View style={styles.statsGrid}>
                <StatCard icon={<Users size={18} color={Colors.white} />} label="Total Users" value="12,450" bg={Colors.primary} trend="+8%" />
                <StatCard icon={<Briefcase size={18} color={Colors.white} />} label="Professionals" value="3,200" bg={Colors.orange} trend="+12%" />
                <StatCard icon={<Calendar size={18} color={Colors.white} />} label="Bookings" value="48,900" bg={Colors.success} trend="+24%" />
                <StatCard icon={<DollarSign size={18} color={Colors.white} />} label="Revenue" value="$284k" bg={Colors.darkBlue} trend="+18%" />
              </View>

              <SectionTitle title="Revenue Overview" />
              <View style={styles.chartCard}>
                <View style={styles.chartBars}>
                  {[40, 65, 45, 80, 55, 90, 70, 100, 60, 85, 75, 95].map((h, i) => (
                    <View key={i} style={styles.chartBarWrap}>
                      <View style={[styles.chartBar, { height: `${h}%` }]} />
                    </View>
                  ))}
                </View>
                <View style={styles.chartLabels}>
                  {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'].map((m, i) => (
                    <Text key={i} style={styles.chartLabel}>{m}</Text>
                  ))}
                </View>
              </View>

              <SectionTitle title="Category Distribution" />
              <View style={styles.catList}>
                {categories.slice(0, 6).map((cat) => (
                  <View key={cat.id} style={styles.catRow}>
                    <Text style={styles.catEmoji}>{cat.icon}</Text>
                    <Text style={styles.catName}>{cat.name}</Text>
                    <Text style={styles.catCount}>{cat.count}</Text>
                    <View style={styles.catBarBg}>
                      <View style={[styles.catBarFill, { width: `${(cat.count / 312) * 100}%`, backgroundColor: cat.color }]} />
                    </View>
                  </View>
                ))}
              </View>
            </>
          )}

          {activeTab === 'users' && (
            <>
              <SectionTitle title="Recent Users" />
              {[
                { name: 'Jessica Miller', email: 'jessica@example.com', bookings: 24, status: 'active' },
                { name: 'Michael Chen', email: 'michael@example.com', bookings: 8, status: 'active' },
                { name: 'Sarah Johnson', email: 'sarah@example.com', bookings: 15, status: 'active' },
                { name: 'David Wilson', email: 'david@example.com', bookings: 3, status: 'inactive' },
                { name: 'Emily Davis', email: 'emily@example.com', bookings: 12, status: 'active' },
              ].map((user, i) => (
                <View key={i} style={styles.userCard}>
                  <View style={styles.userAvatar}>
                    <Text style={styles.userAvatarText}>{user.name.charAt(0)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.userBookings}>{user.bookings} bookings</Text>
                    <Badge label={user.status} variant={user.status === 'active' ? 'success' : 'neutral'} size="sm" />
                  </View>
                </View>
              ))}
            </>
          )}

          {activeTab === 'professionals' && (
            <>
              <SectionTitle title="Top Professionals" />
              {professionals.slice(0, 6).map((pro) => (
                <View key={pro.id} style={styles.proCard}>
                  <Image source={{ uri: pro.avatar }} style={styles.proAvatar} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.proName}>{pro.name}</Text>
                    <Text style={styles.proCat}>{pro.category}</Text>
                    <Rating value={pro.rating} size={11} showValue reviewCount={pro.reviewCount} />
                  </View>
                  <Badge label={pro.isVerified ? 'Verified' : 'Pending'} variant={pro.isVerified ? 'success' : 'warning'} size="sm" />
                </View>
              ))}
            </>
          )}

          {activeTab === 'bookings' && (
            <>
              <SectionTitle title="Recent Bookings" />
              {bookings.slice(0, 6).map((b) => (
                <View key={b.id} style={styles.bookingRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.bookingService}>{b.serviceName}</Text>
                    <Text style={styles.bookingPro}>{b.professionalName}</Text>
                    <Text style={styles.bookingNo}>{b.bookingNumber}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={styles.bookingPrice}>${b.price}</Text>
                    <Badge label={b.status} variant={b.status === 'completed' ? 'success' : b.status === 'upcoming' ? 'info' : 'danger'} size="sm" />
                  </View>
                </View>
              ))}
            </>
          )}

          {activeTab === 'reports' && (
            <>
              <SectionTitle title="Generated Reports" />
              {[
                { title: 'Monthly Revenue Report', date: 'Aug 2026', type: 'Revenue' },
                { title: 'User Growth Analysis', date: 'Q3 2026', type: 'Users' },
                { title: 'Professional Performance', date: 'Aug 2026', type: 'Performance' },
                { title: 'Category Analytics', date: '2026 YTD', type: 'Categories' },
              ].map((r, i) => (
                <TouchableOpacity key={i} style={styles.reportCard}>
                  <View style={styles.reportIcon}>
                    <FileText size={20} color={Colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.reportTitle}>{r.title}</Text>
                    <Text style={styles.reportDate}>{r.date}</Text>
                  </View>
                  <Badge label={r.type} variant="info" size="sm" />
                  <ChevronRight size={18} color={Colors.textMuted} />
                </TouchableOpacity>
              ))}
            </>
          )}

          {activeTab === 'approvals' && (
            <>
              <SectionTitle title="Pending Approvals" />
              {professionals.slice(0, 4).map((pro) => (
                <View key={pro.id} style={styles.approvalCard}>
                  <Image source={{ uri: pro.avatar }} style={styles.approvalAvatar} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.approvalName}>{pro.name}</Text>
                    <Text style={styles.approvalCat}>{pro.category} - {pro.city}</Text>
                    <View style={styles.approvalActions}>
                      <TouchableOpacity style={styles.approveBtn}>
                        <CheckCircle size={14} color={Colors.white} />
                        <Text style={styles.approveText}>Approve</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.rejectBtn}>
                        <XCircle size={14} color={Colors.danger} />
                        <Text style={styles.rejectText}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </>
          )}

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({ icon, label, value, bg, trend }: { icon: React.ReactNode; label: string; value: string; bg: string; trend: string }) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statTop}>
        <View style={[styles.statIcon, { backgroundColor: bg }]}>{icon}</View>
        <View style={styles.trendBadge}>
          <TrendingUp size={10} color={Colors.success} />
          <Text style={styles.trendText}>{trend}</Text>
        </View>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 180,
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  adminRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  adminIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adminTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.3,
  },
  adminSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
  },
  tab: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: Colors.white,
    ...Shadow.sm,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.white,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: 8,
    paddingTop: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 8,
  },
  statCard: {
    width: '48%',
    flexGrow: 1,
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 14,
    gap: 8,
    ...Shadow.card,
  },
  statTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(34,197,94,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  trendText: {
    fontSize: 10,
    color: Colors.success,
    fontWeight: '700',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  sectionTitleRow: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  chartCard: {
    marginHorizontal: 16,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    ...Shadow.card,
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 140,
    gap: 6,
  },
  chartBarWrap: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  chartBar: {
    width: '100%',
    borderRadius: 6,
    backgroundColor: Colors.primary,
    minHeight: 8,
  },
  chartLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  chartLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600',
    width: 16,
    textAlign: 'center',
  },
  catList: {
    paddingHorizontal: 16,
    gap: 10,
  },
  catRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 12,
    ...Shadow.sm,
  },
  catEmoji: {
    fontSize: 20,
  },
  catName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    width: 80,
  },
  catCount: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
    width: 40,
  },
  catBarBg: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.grayMid,
    overflow: 'hidden',
  },
  catBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    ...Shadow.sm,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  userEmail: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  userBookings: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '700',
    marginBottom: 4,
  },
  proCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    ...Shadow.sm,
  },
  proAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  proName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  proCat: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
    marginBottom: 4,
  },
  bookingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    ...Shadow.sm,
  },
  bookingService: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  bookingPro: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  bookingNo: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
    fontWeight: '600',
  },
  bookingPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
  },
  reportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    ...Shadow.sm,
  },
  reportIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(10,91,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  reportDate: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  approvalCard: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 14,
    ...Shadow.card,
  },
  approvalAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  approvalName: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  approvalCat: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
    marginBottom: 10,
  },
  approvalActions: {
    flexDirection: 'row',
    gap: 8,
  },
  approveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.success,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  approveText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  },
  rejectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(239,68,68,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  rejectText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.danger,
  },
});
