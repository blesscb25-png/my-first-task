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
import { bookings } from '@/data/bookings';
import { reviews } from '@/data/reviews';
import { Header } from '@/components/Header';
import { Badge } from '@/components/Badge';
import { Rating } from '@/components/Rating';
import { ReviewCard } from '@/components/ReviewCard';
import { WalletTransactionCard } from '@/components/WalletTransactionCard';
import { walletTransactions } from '@/data/mockData';
import {
  Calendar,
  Clock,
  TrendingUp,
  DollarSign,
  Star,
  Users,
  ChevronRight,
  Grid3x3,
  MessageCircle,
  Wallet,
  Settings,
  Plus,
  CheckCircle,
  XCircle,
  Camera,
  Briefcase,
  BarChart3,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Tab = 'dashboard' | 'bookings' | 'calendar' | 'messages' | 'portfolio' | 'reviews' | 'wallet' | 'settings';

export default function ProfessionalDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const todayJobs = bookings.filter((b) => b.status === 'upcoming').slice(0, 3);
  const upcomingJobs = bookings.filter((b) => b.status === 'upcoming');
  const completedJobs = bookings.filter((b) => b.status === 'completed');

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
          <View style={styles.proRow}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.proName}>Rose Nails Studio</Text>
              <Text style={styles.proCategory}>Nail Technician</Text>
              <View style={styles.proMeta}>
                <Rating value={4.9} size={12} showValue color={Colors.white} reviewCount={128} />
              </View>
            </View>
            <TouchableOpacity style={styles.settingsBtn}>
              <Settings size={20} color={Colors.white} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tabBar}>
          {[
            { key: 'dashboard', label: 'Dashboard', icon: <BarChart3 size={16} color={Colors.textPrimary} /> },
            { key: 'bookings', label: 'Bookings', icon: <Calendar size={16} color={Colors.textPrimary} /> },
            { key: 'messages', label: 'Messages', icon: <MessageCircle size={16} color={Colors.textPrimary} /> },
            { key: 'portfolio', label: 'Portfolio', icon: <Camera size={16} color={Colors.textPrimary} /> },
            { key: 'reviews', label: 'Reviews', icon: <Star size={16} color={Colors.textPrimary} /> },
            { key: 'wallet', label: 'Wallet', icon: <Wallet size={16} color={Colors.textPrimary} /> },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key as Tab)}
            >
              {tab.icon}
              <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>{tab.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.content}>
          {activeTab === 'dashboard' && (
            <>
              <View style={styles.statsGrid}>
                <StatCard icon={<Calendar size={18} color={Colors.white} />} label="Today" value="3" bg={Colors.primary} />
                <StatCard icon={<CheckCircle size={18} color={Colors.white} />} label="Completed" value="45" bg={Colors.success} />
                <StatCard icon={<TrendingUp size={18} color={Colors.white} />} label="This Week" value="12" bg={Colors.orange} />
                <StatCard icon={<DollarSign size={18} color={Colors.white} />} label="Earnings" value="$1.2k" bg={Colors.darkBlue} />
              </View>

              <SectionTitle title="Today's Jobs" onSeeAll={() => setActiveTab('bookings')} />
              {todayJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}

              <SectionTitle title="Quick Actions" />
              <View style={styles.quickActions}>
                <TouchableOpacity style={styles.quickAction}>
                  <View style={[styles.quickIcon, { backgroundColor: 'rgba(10,91,255,0.1)' }]}>
                    <Plus size={20} color={Colors.primary} />
                  </View>
                  <Text style={styles.quickLabel}>Add Service</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickAction}>
                  <View style={[styles.quickIcon, { backgroundColor: 'rgba(255,138,0,0.1)' }]}>
                    <Camera size={20} color={Colors.orange} />
                  </View>
                  <Text style={styles.quickLabel}>Add Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickAction}>
                  <View style={[styles.quickIcon, { backgroundColor: 'rgba(34,197,94,0.1)' }]}>
                    <Clock size={20} color={Colors.success} />
                  </View>
                  <Text style={styles.quickLabel}>Availability</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.quickAction}>
                  <View style={[styles.quickIcon, { backgroundColor: 'rgba(16,43,123,0.1)' }]}>
                    <Briefcase size={20} color={Colors.darkBlue} />
                  </View>
                  <Text style={styles.quickLabel}>Profile</Text>
                </TouchableOpacity>
              </View>

              <SectionTitle title="Recent Reviews" onSeeAll={() => setActiveTab('reviews')} />
              <ReviewCard review={reviews[0]} />
            </>
          )}

          {activeTab === 'bookings' && (
            <>
              <SectionTitle title="Upcoming Jobs" />
              {upcomingJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
              <SectionTitle title="Completed Jobs" />
              {completedJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </>
          )}

          {activeTab === 'messages' && (
            <View style={styles.emptyWrap}>
              <MessageCircle size={40} color={Colors.primary} fill={'rgba(10,91,255,0.1)'} strokeWidth={1.5} />
              <Text style={styles.emptyTitle}>Messages</Text>
              <Text style={styles.emptyText}>3 unread messages from clients</Text>
              <TouchableOpacity style={styles.viewBtn} onPress={() => router.push('/(tabs)/chat')}>
                <Text style={styles.viewBtnText}>View Messages</Text>
              </TouchableOpacity>
            </View>
          )}

          {activeTab === 'portfolio' && (
            <>
              <View style={styles.portfolioHeader}>
                <Text style={styles.portfolioTitle}>Portfolio Gallery</Text>
                <TouchableOpacity style={styles.addPhotoBtn}>
                  <Plus size={16} color={Colors.white} />
                  <Text style={styles.addPhotoText}>Add Photo</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.portfolioGrid}>
                {[
                  'https://images.pexels.com/photos/3997388/pexels-photo-3997388.jpeg?auto=compress&cs=tinysrgb&w=400',
                  'https://images.pexels.com/photos/3997390/pexels-photo-3997390.jpeg?auto=compress&cs=tinysrgb&w=400',
                  'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=400',
                  'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=400',
                ].map((img, i) => (
                  <Image key={i} source={{ uri: img }} style={styles.portfolioImg} />
                ))}
              </View>
            </>
          )}

          {activeTab === 'reviews' && (
            <>
              <View style={styles.reviewSummary}>
                <Text style={styles.bigRating}>4.9</Text>
                <View>
                  <Rating value={4.9} size={16} showValue={false} />
                  <Text style={styles.reviewCount}>128 reviews</Text>
                </View>
              </View>
              {reviews.slice(0, 5).map((rev) => (
                <ReviewCard key={rev.id} review={rev} style={{ marginBottom: 12 }} />
              ))}
            </>
          )}

          {activeTab === 'wallet' && (
            <>
              <LinearGradient colors={Colors.gradientPrimary} style={styles.walletCard}>
                <Text style={styles.walletLabel}>Total Earnings</Text>
                <Text style={styles.walletAmount}>$3,245.00</Text>
                <View style={styles.walletRow}>
                  <View>
                    <Text style={styles.walletSubLabel}>This Week</Text>
                    <Text style={styles.walletSubValue}>$845.00</Text>
                  </View>
                  <View>
                    <Text style={styles.walletSubLabel}>This Month</Text>
                    <Text style={styles.walletSubValue}>$3,245.00</Text>
                  </View>
                  <TouchableOpacity style={styles.withdrawBtn}>
                    <Text style={styles.withdrawText}>Withdraw</Text>
                  </TouchableOpacity>
                </View>
              </LinearGradient>
              <SectionTitle title="Recent Transactions" />
              {walletTransactions.slice(0, 5).map((tx) => (
                <WalletTransactionCard key={tx.id} transaction={tx} style={{ marginBottom: 10 }} />
              ))}
            </>
          )}

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </View>
  );
}

function StatCard({ icon, label, value, bg }: { icon: React.ReactNode; label: string; value: string; bg: string }) {
  return (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: bg }]}>{icon}</View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function JobCard({ job }: { job: any }) {
  return (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <Image source={{ uri: job.professionalAvatar }} style={styles.jobAvatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.jobService}>{job.serviceName}</Text>
          <Text style={styles.jobNo}>{job.bookingNumber}</Text>
        </View>
        <Badge
          label={job.status}
          variant={job.status === 'upcoming' ? 'info' : job.status === 'completed' ? 'success' : 'danger'}
          size="sm"
        />
      </View>
      <View style={styles.jobDetails}>
        <View style={styles.jobDetailRow}>
          <Calendar size={14} color={Colors.textSecondary} />
          <Text style={styles.jobDetailText}>{formatDate(job.date)}</Text>
        </View>
        <View style={styles.jobDetailRow}>
          <Clock size={14} color={Colors.textSecondary} />
          <Text style={styles.jobDetailText}>{job.time}</Text>
        </View>
      </View>
      <View style={styles.jobFooter}>
        <Text style={styles.jobPrice}>${job.price}</Text>
        <View style={styles.jobActions}>
          {job.status === 'upcoming' && (
            <>
              <TouchableOpacity style={[styles.jobBtn, styles.jobBtnAccept]}>
                <CheckCircle size={14} color={Colors.white} />
                <Text style={styles.jobBtnText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.jobBtn, styles.jobBtnDecline]}>
                <XCircle size={14} color={Colors.danger} />
                <Text style={[styles.jobBtnText, { color: Colors.danger }]}>Decline</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

function SectionTitle({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) {
  return (
    <View style={styles.sectionTitleRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          <Text style={styles.seeAllText}>See All</Text>
          <ChevronRight size={14} color={Colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
    height: 200,
  },
  header: {
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  proRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  proName: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.3,
  },
  proCategory: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  proMeta: {
    marginTop: 4,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    alignItems: 'center',
    gap: 6,
    ...Shadow.card,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  seeAllText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  quickIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  jobCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    gap: 12,
    ...Shadow.card,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  jobAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  jobService: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  jobNo: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
    fontWeight: '600',
  },
  jobDetails: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  jobDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  jobDetailText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
  },
  jobActions: {
    flexDirection: 'row',
    gap: 8,
  },
  jobBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  jobBtnAccept: {
    backgroundColor: Colors.success,
  },
  jobBtnDecline: {
    backgroundColor: 'rgba(239,68,68,0.1)',
  },
  jobBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.white,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  viewBtn: {
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    borderRadius: 14,
  },
  viewBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  portfolioTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  addPhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  addPhotoText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
  },
  portfolioImg: {
    width: (width - 52) / 2,
    height: 150,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  reviewSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    ...Shadow.card,
  },
  bigRating: {
    fontSize: 48,
    fontWeight: '900',
    color: Colors.primary,
  },
  reviewCount: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  walletCard: {
    marginHorizontal: 16,
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    ...Shadow.lg,
  },
  walletLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '500',
  },
  walletAmount: {
    fontSize: 40,
    color: Colors.white,
    fontWeight: '900',
    letterSpacing: -1,
    marginTop: 4,
  },
  walletRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  walletSubLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  walletSubValue: {
    fontSize: 18,
    color: Colors.white,
    fontWeight: '800',
    marginTop: 2,
  },
  withdrawBtn: {
    backgroundColor: Colors.orange,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  withdrawText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '700',
  },
});
