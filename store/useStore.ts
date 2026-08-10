import { create } from 'zustand';
import { User, Booking, Notification, Coupon, WalletTransaction, PaymentMethod, Address } from '@/types';

interface AppStore {
  user: User | null;
  isAuthenticated: boolean;
  isDarkMode: boolean;
  favorites: string[];
  notifications: Notification[];
  recentSearches: string[];
  currentRole: 'user' | 'professional' | 'admin';

  setUser: (user: User | null) => void;
  setAuthenticated: (value: boolean) => void;
  toggleDarkMode: () => void;
  toggleFavorite: (id: string) => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setRole: (role: 'user' | 'professional' | 'admin') => void;
  logout: () => void;
}

export const useStore = create<AppStore>((set, get) => ({
  user: {
    id: 'user_1',
    firstName: 'Jessica',
    lastName: 'Miller',
    email: 'jessica@example.com',
    phone: '+1 234 567 8901',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
    city: 'New York',
    country: 'United States',
    joinedAt: '2024-01-15',
    isVerified: true,
    rating: 4.9,
    totalBookings: 24,
    walletBalance: 160.50,
  },
  isAuthenticated: false,
  isDarkMode: false,
  favorites: ['pro_1', 'pro_3', 'pro_7'],
  notifications: [],
  recentSearches: ['Nail technician', 'Barber near me', 'Hair stylist', 'Massage'],
  currentRole: 'user',

  setUser: (user) => set({ user }),
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id],
    })),
  addRecentSearch: (query) =>
    set((state) => ({
      recentSearches: [query, ...state.recentSearches.filter((s) => s !== query)].slice(0, 10),
    })),
  clearRecentSearches: () => set({ recentSearches: [] }),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    })),
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),
  setRole: (role) => set({ currentRole: role }),
  logout: () => set({ isAuthenticated: false }),
}));
