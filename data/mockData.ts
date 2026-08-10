import { Conversation, Message, Notification, Promotion, Coupon, WalletTransaction, PaymentMethod } from '@/types';

export const conversations: Conversation[] = [
  { id: 'conv_1', participantId: 'pro_1', participantName: 'Rose Nails Studio', participantAvatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=200', lastMessage: 'See you tomorrow at 2pm!', lastMessageTime: '14:32', unreadCount: 2, isOnline: true },
  { id: 'conv_2', participantId: 'pro_6', participantName: 'Seun Massage & Spa', participantAvatar: 'https://images.pexels.com/photos/3765114/pexels-photo-3765114.jpeg?auto=compress&cs=tinysrgb&w=200', lastMessage: 'Your booking is confirmed', lastMessageTime: '12:15', unreadCount: 1, isOnline: true },
  { id: 'conv_3', participantId: 'pro_2', participantName: 'Sharp Fade Barber', participantAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200', lastMessage: 'Thanks for the tip!', lastMessageTime: 'Yesterday', unreadCount: 0, isOnline: false },
  { id: 'conv_4', participantId: 'pro_8', participantName: 'Fatima Photography', participantAvatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200', lastMessage: 'I sent you the photo gallery link', lastMessageTime: 'Yesterday', unreadCount: 3, isOnline: false },
  { id: 'conv_5', participantId: 'pro_10', participantName: 'CleanPro Services', participantAvatar: 'https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=200', lastMessage: 'We will bring all cleaning supplies', lastMessageTime: '2 days ago', unreadCount: 0, isOnline: true },
];

export const messagesByConversation: Record<string, Message[]> = {
  conv_1: [
    { id: 'm1', senderId: 'pro_1', receiverId: 'user_1', text: 'Hi Jessica! Thank you for booking with us.', time: '14:20', isRead: true },
    { id: 'm2', senderId: 'user_1', receiverId: 'pro_1', text: 'Hi Rose! I am excited for my appointment tomorrow.', time: '14:25', isRead: true },
    { id: 'm3', senderId: 'pro_1', receiverId: 'user_1', text: 'We are excited to have you! I have some new polish colors to show you.', time: '14:28', isRead: true },
    { id: 'm4', senderId: 'user_1', receiverId: 'pro_1', text: 'That sounds great! Can I bring a reference photo?', time: '14:30', isRead: true },
    { id: 'm5', senderId: 'pro_1', receiverId: 'user_1', text: 'See you tomorrow at 2pm!', time: '14:32', isRead: false },
  ],
  conv_2: [
    { id: 'm6', senderId: 'pro_6', receiverId: 'user_1', text: 'Your booking is confirmed for Aug 15 at 10:30 AM', time: '12:15', isRead: false },
  ],
  conv_3: [
    { id: 'm7', senderId: 'user_1', receiverId: 'pro_2', text: 'Great haircut today, thanks!', time: '16:30', isRead: true },
    { id: 'm8', senderId: 'pro_2', receiverId: 'user_1', text: 'Thanks for the tip!', time: '17:00', isRead: true },
  ],
  conv_4: [
    { id: 'm9', senderId: 'pro_8', receiverId: 'user_1', text: 'Your photos are ready!', time: '10:00', isRead: false },
    { id: 'm10', senderId: 'pro_8', receiverId: 'user_1', text: 'I sent you the photo gallery link', time: '10:05', isRead: false },
    { id: 'm11', senderId: 'pro_8', receiverId: 'user_1', isImage: true, imageUrl: 'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=400', text: '', time: '10:10', isRead: false },
  ],
  conv_5: [
    { id: 'm12', senderId: 'user_1', receiverId: 'pro_10', text: 'Do I need to provide any cleaning supplies?', time: '09:00', isRead: true },
    { id: 'm13', senderId: 'pro_10', receiverId: 'user_1', text: 'We will bring all cleaning supplies', time: '09:15', isRead: true },
  ],
};

export const notifications: Notification[] = [
  { id: 'n1', type: 'booking', title: 'Booking Confirmed', body: 'Your manicure with Rose Nails Studio is confirmed for Aug 10 at 2:00 PM', time: '5 min ago', isRead: false, avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=100', actionId: 'bk_1' },
  { id: 'n2', type: 'message', title: 'New Message', body: 'Rose Nails Studio: See you tomorrow at 2pm!', time: '15 min ago', isRead: false, avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=100', actionId: 'conv_1' },
  { id: 'n3', type: 'offer', title: 'Special Offer', body: 'Get 30% off your next massage booking. Limited time only!', time: '1 hour ago', isRead: false, avatar: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=100' },
  { id: 'n4', type: 'booking', title: 'Booking Completed', body: 'Your haircut with Sharp Fade Barber has been completed. Leave a review!', time: '3 hours ago', isRead: true, avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100', actionId: 'bk_3' },
  { id: 'n5', type: 'promotion', title: 'Weekend Special', body: 'Book any service this weekend and get 20% cashback in your wallet', time: '5 hours ago', isRead: true },
  { id: 'n6', type: 'message', title: 'New Message', body: 'Fatima Photography: Your photos are ready!', time: 'Yesterday', isRead: true, avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100', actionId: 'conv_4' },
  { id: 'n7', type: 'update', title: 'App Update', body: 'New version available with improved booking experience and bug fixes', time: '2 days ago', isRead: true },
  { id: 'n8', type: 'offer', title: 'Refer & Earn', body: 'Invite a friend and you both get $10 in your wallet', time: '3 days ago', isRead: true },
];

export const promotions: Promotion[] = [
  { id: 'promo_1', title: '30% Off Massage', subtitle: 'Relax and unwind this week', discount: '30%', image: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=600', expiresAt: 'Aug 31, 2026', code: 'RELAX30', gradient: ['#FF8A00', '#FF5F00'] },
  { id: 'promo_2', title: 'Free Hair Wash', subtitle: 'With any haircut this month', discount: 'FREE', image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=600', expiresAt: 'Aug 31, 2026', code: 'FREEWASH', gradient: ['#0A5BFF', '#102B7B'] },
  { id: 'promo_3', title: '20% Cashback', subtitle: 'On all cleaning services', discount: '20%', image: 'https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg?auto=compress&cs=tinysrgb&w=600', expiresAt: 'Sep 15, 2026', code: 'CLEAN20', gradient: ['#22C55E', '#16A34A'] },
  { id: 'promo_4', title: 'First Booking 50% Off', subtitle: 'New users only', discount: '50%', image: 'https://images.pexels.com/photos/3997388/pexels-photo-3997388.jpeg?auto=compress&cs=tinysrgb&w=600', expiresAt: 'Dec 31, 2026', code: 'WELCOME50', gradient: ['#9B59B6', '#6C3483'] },
];

export const coupons: Coupon[] = [
  { id: 'cpn_1', code: 'WELCOME50', discount: '50%', discountType: 'percent', minOrder: 10, expiresAt: 'Dec 31, 2026', isUsed: false },
  { id: 'cpn_2', code: 'RELAX30', discount: '30%', discountType: 'percent', minOrder: 20, expiresAt: 'Aug 31, 2026', isUsed: false },
  { id: 'cpn_3', code: 'CLEAN20', discount: '20%', discountType: 'percent', minOrder: 35, expiresAt: 'Sep 15, 2026', isUsed: false },
  { id: 'cpn_4', code: 'SAVE10', discount: '$10', discountType: 'fixed', minOrder: 50, expiresAt: 'Oct 31, 2026', isUsed: true },
  { id: 'cpn_5', code: 'FREESTYLE', discount: 'FREE', discountType: 'fixed', minOrder: 15, expiresAt: 'Aug 31, 2026', isUsed: false },
];

export const walletTransactions: WalletTransaction[] = [
  { id: 'wt_1', type: 'credit', title: 'Cashback Reward', subtitle: 'From booking #LNK-2026-001200', amount: 3, currency: 'USD', date: 'Jul 28, 2026', status: 'completed' },
  { id: 'wt_2', type: 'debit', title: 'Booking Payment', subtitle: 'Swedish Massage - Seun Massage', amount: 50, currency: 'USD', date: 'Aug 01, 2026', status: 'completed' },
  { id: 'wt_3', type: 'credit', title: 'Referral Bonus', subtitle: 'Friend referred: Michael C.', amount: 10, currency: 'USD', date: 'Jul 25, 2026', status: 'completed' },
  { id: 'wt_4', type: 'debit', title: 'Booking Payment', subtitle: 'Deep Clean - CleanPro', amount: 70, currency: 'USD', date: 'Jul 15, 2026', status: 'completed' },
  { id: 'wt_5', type: 'credit', title: 'Top Up', subtitle: 'Visa ending 4242', amount: 100, currency: 'USD', date: 'Jul 10, 2026', status: 'completed' },
  { id: 'wt_6', type: 'debit', title: 'Booking Payment', subtitle: 'Full Makeup - Beauty by Linda', amount: 30, currency: 'USD', date: 'Jul 10, 2026', status: 'pending' },
  { id: 'wt_7', type: 'credit', title: 'Cashback Reward', subtitle: 'From booking #LNK-2026-001150', amount: 14, currency: 'USD', date: 'Jul 15, 2026', status: 'completed' },
  { id: 'wt_8', type: 'debit', title: 'Cancelled Booking Refund', subtitle: 'Booking #LNK-2026-001100', amount: 30, currency: 'USD', date: 'Jul 11, 2026', status: 'failed' },
];

export const paymentMethods: PaymentMethod[] = [
  { id: 'pm_1', type: 'visa', label: 'Visa', last4: '4242', isDefault: true },
  { id: 'pm_2', type: 'mastercard', label: 'Mastercard', last4: '5555', isDefault: false },
  { id: 'pm_3', type: 'paypal', label: 'PayPal', isDefault: false },
  { id: 'pm_4', type: 'orange_money', label: 'Orange Money', last4: '7890', isDefault: false },
  { id: 'pm_5', type: 'mtn', label: 'MTN Mobile Money', last4: '1234', isDefault: false },
  { id: 'pm_6', type: 'cash', label: 'Cash', isDefault: false },
  { id: 'pm_7', type: 'wallet', label: 'Linkly Wallet', isDefault: false },
];

export const trendingSearches = ['Nail technician', 'Barber near me', 'Hair stylist', 'Massage therapy', 'House cleaning', 'Electrician', 'Photographer', 'Makeup artist'];
