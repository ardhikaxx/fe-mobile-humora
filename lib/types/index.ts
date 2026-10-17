export type AccessType = 'free' | 'premium';

export interface Episode {
  id: number;
  number: number;
  title: string;
  description: string;
  duration: string;
  durationSeconds: number;
  accessType: AccessType;
  thumbnail: string;
  videoSource?: string;
  releaseDate?: string;
  likesCount: number; // e.g. 4250 (4.2rb suka)
}

export interface Series {
  id: string;
  slug: string;
  title: string;
  synopsis: string;
  genres: string[];
  thumbnail: string; // Unified single thumbnail (no poster needed)
  poster?: string; // Optional fallback
  cover?: string; // Optional fallback
  likesCount: number; // e.g. 14200 (14.2rb suka)
  year: number;
  videoCount?: number;
  episodeCount: number;
  featured?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  videos?: Episode[];
  episodes: Episode[];
}

export type SubscriptionStatus = 'none' | 'active' | 'expired';

export interface SubscriptionPlan {
  id: 'monthly' | 'quarterly' | 'annual';
  name: string;
  durationDays: number;
  price: number;
  originalPrice?: number;
  periodLabel: string;
  badge?: string;
  description: string;
  perMonthPrice?: number;
  isPopular?: boolean;
  features: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  joinedDate: string;
  bio?: string;
  gender?: string;
}

export interface SubscriptionState {
  status: SubscriptionStatus;
  planId: 'monthly' | 'quarterly' | 'annual' | null;
  planName: string;
  startDate: string | null;
  endDate: string | null;
  paymentMethod: string | null;
  autoRenew: boolean;
}

export interface WatchHistoryItem {
  seriesSlug: string;
  seriesTitle: string;
  seriesThumbnail?: string;
  seriesPoster: string;
  episodeId: number;
  episodeNumber: number;
  episodeTitle: string;
  progressSeconds: number;
  totalSeconds: number;
  percent: number;
  lastWatchedAt: string;
  completed: boolean;
}

export interface NotificationItemData {
  id: string;
  title: string;
  description: string;
  category: 'series_baru' | 'episode_baru' | 'promo' | 'langganan';
  time: string;
  read: boolean;
  linkUrl: string;
  thumbnail?: string;
}

export interface TransactionRecord {
  id: string;
  planId: string;
  planName: string;
  amount: number;
  discount: number;
  total: number;
  paymentMethod: string;
  status: 'success' | 'pending' | 'failed';
  createdAt: string;
  expiryDate: string;
}
