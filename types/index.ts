export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string;
  city: string;
  country: string;
  joinedAt: string;
  isVerified: boolean;
  rating?: number;
  totalBookings?: number;
  walletBalance?: number;
}

export interface Professional {
  id: string;
  name: string;
  avatar: string;
  coverImage: string;
  category: string;
  categoryId: string;
  rating: number;
  reviewCount: number;
  experience: string;
  priceFrom: number;
  currency: string;
  isVerified: boolean;
  isOnline: boolean;
  isTopRated: boolean;
  distance: string;
  location: string;
  city: string;
  bio: string;
  languages: string[];
  services: Service[];
  portfolio: PortfolioItem[];
  certificates: Certificate[];
  workingHours: WorkingHours;
  badges: string[];
  lat?: number;
  lng?: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  duration: number;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: [string, string];
  count: number;
  image: string;
}

export interface Booking {
  id: string;
  professionalId: string;
  professionalName: string;
  professionalAvatar: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
  currency: string;
  location: string;
  notes?: string;
  paymentMethod: string;
  bookingNumber: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  professionalId: string;
  rating: number;
  comment: string;
  date: string;
  images?: string[];
  helpful: number;
  isHelpful?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  time: string;
  isRead: boolean;
  isVoice?: boolean;
  isImage?: boolean;
  imageUrl?: string;
  voiceDuration?: number;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface Notification {
  id: string;
  type: 'booking' | 'message' | 'offer' | 'update' | 'promotion';
  title: string;
  body: string;
  time: string;
  isRead: boolean;
  avatar?: string;
  actionId?: string;
}

export interface Promotion {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  expiresAt: string;
  code: string;
  gradient: [string, string];
  category?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: string;
  discountType: 'percent' | 'fixed';
  minOrder: number;
  expiresAt: string;
  isUsed: boolean;
  category?: string;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  title: string;
  subtitle: string;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'paypal' | 'orange_money' | 'mtn' | 'cash' | 'wallet';
  label: string;
  last4?: string;
  isDefault: boolean;
}

export interface PortfolioItem {
  id: string;
  image: string;
  title: string;
  category: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image?: string;
}

export interface WorkingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  open: string;
  close: string;
}

export interface ProfessionalStats {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalEarnings: number;
  weeklyEarnings: number;
  monthlyEarnings: number;
  rating: number;
  reviewCount: number;
}

export interface Address {
  id: string;
  label: string;
  address: string;
  city: string;
  isDefault: boolean;
  lat?: number;
  lng?: number;
}
