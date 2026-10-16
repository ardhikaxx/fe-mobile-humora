'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  UserProfile,
  SubscriptionState,
  WatchHistoryItem,
  NotificationItemData,
  TransactionRecord,
  Episode,
  Series,
  SubscriptionPlan,
} from '../types';
import { SUBSCRIPTION_PLANS } from '../data/subscriptionPlans';
import { INITIAL_NOTIFICATIONS } from '../data/notificationsData';
import { SERIES_LIST } from '../data/seriesData';

interface HumoraContextType {
  isHydrated: boolean;
  user: UserProfile | null;
  subscription: SubscriptionState;
  history: WatchHistoryItem[];
  notifications: NotificationItemData[];
  transactions: TransactionRecord[];
  selectedPlan: SubscriptionPlan | null;
  pendingRedirectUrl: string | null;
  activeEpisodeTarget: { seriesSlug: string; episodeId: number } | null;
  toastMessage: string | null;
  isSubscriptionSheetOpen: boolean;
  subscriptionSheetContext: { seriesSlug?: string; episodeNumber?: number; reason?: string } | null;

  // Actions
  login: (identifier: string, name?: string) => Promise<boolean>;
  register: (name: string, identifier: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  selectPlan: (planId: 'monthly' | 'quarterly' | 'annual') => void;
  setPendingRedirectUrl: (url: string | null) => void;
  setActiveEpisodeTarget: (target: { seriesSlug: string; episodeId: number } | null) => void;
  activatePremium: (planId: 'monthly' | 'quarterly' | 'annual', paymentMethod: string, promoCode?: string) => void;
  expirePremium: () => void;
  setDemoState: (mode: 'guest' | 'free' | 'premium' | 'expired') => void;
  resetDemoState: () => void;
  canAccessEpisode: (episode: Episode) => { allowed: boolean; reason?: 'needs_premium' | 'expired' };
  updateWatchProgress: (
    series: Series,
    episode: Episode,
    currentSeconds: number,
    totalSeconds: number
  ) => void;
  deleteHistoryItem: (seriesSlug: string, episodeId: number) => void;
  clearHistory: () => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  showToast: (message: string) => void;
  openSubscriptionSheet: (context?: { seriesSlug?: string; episodeNumber?: number; reason?: string }) => void;
  closeSubscriptionSheet: () => void;
}

const STORAGE_KEY = 'humora_state_v1';

const DEMO_USER: UserProfile = {
  id: 'usr-humora-88',
  name: 'Ardhika Pradana',
  email: 'ardhika@humora.id',
  phone: '0812-8899-7766',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  joinedDate: '12 Januari 2026',
  bio: 'Penikmat sketsa komedi garis keras 😂',
  gender: 'Laki-laki',
};

const DEFAULT_SUBSCRIPTION: SubscriptionState = {
  status: 'none',
  planId: null,
  planName: 'Akun Gratis',
  startDate: null,
  endDate: null,
  paymentMethod: null,
  autoRenew: false,
};

const DEFAULT_HISTORY: WatchHistoryItem[] = [
  {
    seriesSlug: 'tipe-penumpang-taxi-online',
    seriesTitle: 'Tipe Penumpang Taxi Online',
    seriesThumbnail: '/images/thumbnails/tipe-penumpang-taxi-online.jpg',
    seriesPoster: '/images/thumbnails/tipe-penumpang-taxi-online.jpg',
    episodeId: 1,
    episodeNumber: 1,
    episodeTitle: 'Tipe Bawel',
    progressSeconds: 85,
    totalSeconds: 134,
    percent: 63,
    lastWatchedAt: '2026-02-15T08:30:00.000Z',
    completed: false,
  },
  {
    seriesSlug: 'cara-deketin-cewek',
    seriesTitle: 'Cara Deketin Cewek',
    seriesThumbnail: '/images/thumbnails/cara-deketin-cewek.jpg',
    seriesPoster: '/images/thumbnails/cara-deketin-cewek.jpg',
    episodeId: 1,
    episodeNumber: 1,
    episodeTitle: 'Pake Hadiah',
    progressSeconds: 58,
    totalSeconds: 130,
    percent: 45,
    lastWatchedAt: '2026-02-15T06:15:00.000Z',
    completed: false,
  },
  {
    seriesSlug: 'tipe-penumpang-taxi-online',
    seriesTitle: 'Tipe Penumpang Taxi Online',
    seriesThumbnail: '/images/thumbnails/tipe-penumpang-taxi-online.jpg',
    seriesPoster: '/images/thumbnails/tipe-penumpang-taxi-online.jpg',
    episodeId: 2,
    episodeNumber: 2,
    episodeTitle: 'Tipe Sensi',
    progressSeconds: 118,
    totalSeconds: 118,
    percent: 100,
    lastWatchedAt: '2026-02-14T20:45:00.000Z',
    completed: true,
  },
  {
    seriesSlug: 'cara-deketin-cewek',
    seriesTitle: 'Cara Deketin Cewek',
    seriesThumbnail: '/images/thumbnails/cara-deketin-cewek.jpg',
    seriesPoster: '/images/thumbnails/cara-deketin-cewek.jpg',
    episodeId: 2,
    episodeNumber: 2,
    episodeTitle: 'Pake Rayuan Maut',
    progressSeconds: 115,
    totalSeconds: 115,
    percent: 100,
    lastWatchedAt: '2026-02-14T19:20:00.000Z',
    completed: true,
  },
];

const HumoraContext = createContext<HumoraContextType | undefined>(undefined);

export function HumoraProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionState>(DEFAULT_SUBSCRIPTION);
  const [history, setHistory] = useState<WatchHistoryItem[]>(DEFAULT_HISTORY);
  const [notifications, setNotifications] = useState<NotificationItemData[]>(INITIAL_NOTIFICATIONS);
  const [transactions, setTransactions] = useState<TransactionRecord[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<'monthly' | 'quarterly' | 'annual'>('quarterly');
  const [pendingRedirectUrl, setPendingRedirectUrl] = useState<string | null>(null);
  const [activeEpisodeTarget, setActiveEpisodeTarget] = useState<{ seriesSlug: string; episodeId: number } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSubscriptionSheetOpen, setIsSubscriptionSheetOpen] = useState(false);
  const [subscriptionSheetContext, setSubscriptionSheetContext] = useState<{
    seriesSlug?: string;
    episodeNumber?: number;
    reason?: string;
  } | null>(null);

  // Load from localStorage safely on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setTimeout(() => {
          if (parsed.user !== undefined) setUser(parsed.user);
          if (parsed.subscription) setSubscription(parsed.subscription);
          if (parsed.history && Array.isArray(parsed.history)) {
            const validHistory = parsed.history
              .map((h: WatchHistoryItem) => {
                const matchedSeries = SERIES_LIST.find((s) => s.slug === h.seriesSlug);
                if (!matchedSeries) return null;
                const matchedEpisode = matchedSeries.episodes.find(
                  (e) => e.id === h.episodeId || e.number === h.episodeNumber
                );
                const thumbImg =
                  matchedEpisode?.thumbnail || matchedSeries.thumbnail || `/images/thumbnails/${matchedSeries.slug}.jpg`;
                return {
                  ...h,
                  seriesTitle: matchedSeries.title,
                  seriesThumbnail: thumbImg,
                  seriesPoster: thumbImg,
                  episodeTitle: matchedEpisode ? matchedEpisode.title : h.episodeTitle,
                };
              })
              .filter((h: WatchHistoryItem | null): h is WatchHistoryItem => h !== null);

            setHistory(validHistory.length > 0 ? validHistory : DEFAULT_HISTORY);
          }
          if (parsed.notifications) setNotifications(parsed.notifications);
          if (parsed.transactions) setTransactions(parsed.transactions);
          if (parsed.selectedPlanId) setSelectedPlanId(parsed.selectedPlanId);
          setIsHydrated(true);
        }, 0);
        return;
      }
    } catch {
      // ignore parsing error
    }
    setTimeout(() => {
      setIsHydrated(true);
    }, 0);
  }, []);

  // Save to localStorage when state updates
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const stateToSave = {
        user,
        subscription,
        history,
        notifications,
        transactions,
        selectedPlanId,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // localstorage full or blocked
    }
  }, [isHydrated, user, subscription, history, notifications, transactions, selectedPlanId]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  }, []);

  const selectPlan = useCallback((planId: 'monthly' | 'quarterly' | 'annual') => {
    setSelectedPlanId(planId);
  }, []);

  const selectedPlan = useMemo(() => {
    return SUBSCRIPTION_PLANS.find((p) => p.id === selectedPlanId) || SUBSCRIPTION_PLANS[1];
  }, [selectedPlanId]);

  const canAccessEpisode = useCallback(
    (episode: Episode): { allowed: boolean; reason?: 'needs_premium' | 'expired' } => {
      if (episode.accessType === 'free') {
        return { allowed: true };
      }
      if (subscription.status === 'active') {
        return { allowed: true };
      }
      if (subscription.status === 'expired') {
        return { allowed: false, reason: 'expired' };
      }
      return { allowed: false, reason: 'needs_premium' };
    },
    [subscription.status]
  );

  const openSubscriptionSheet = useCallback(
    (context?: { seriesSlug?: string; episodeNumber?: number; reason?: string }) => {
      setSubscriptionSheetContext(context || null);
      setIsSubscriptionSheetOpen(true);
    },
    []
  );

  const closeSubscriptionSheet = useCallback(() => {
    setIsSubscriptionSheetOpen(false);
  }, []);

  const login = useCallback(
    async (identifier: string, name?: string): Promise<boolean> => {
      const isEmail = identifier.includes('@');
      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        name: name || (isEmail ? identifier.split('@')[0] : 'Penggemar Humora'),
        email: isEmail ? identifier : 'user@humora.id',
        phone: !isEmail ? identifier : '0812-3456-7890',
        avatarUrl: DEMO_USER.avatarUrl,
        joinedDate: 'Hari ini',
      };
      setUser(newUser);
      showToast(`Selamat datang kembali, ${newUser.name}!`);
      return true;
    },
    [showToast]
  );

  const register = useCallback(
    async (name: string, identifier: string): Promise<boolean> => {
      const isEmail = identifier.includes('@');
      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        name: name.trim() || 'Pengguna Baru',
        email: isEmail ? identifier : `${name.toLowerCase().replace(/\s+/g, '')}@humora.id`,
        phone: !isEmail ? identifier : '0812-7766-5544',
        avatarUrl: DEMO_USER.avatarUrl,
        joinedDate: 'Hari ini',
      };
      setUser(newUser);
      showToast(`Akun berhasil dibuat! Halo, ${newUser.name}`);
      return true;
    },
    [showToast]
  );

  const logout = useCallback(() => {
    setUser(null);
    showToast('Kamu telah keluar dari akun.');
  }, [showToast]);

  const updateProfile = useCallback(
    (updated: Partial<UserProfile>) => {
      setUser((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          ...updated,
        };
      });
      showToast('Profil berhasil diperbarui!');
    },
    [showToast]
  );

  const activatePremium = useCallback(
    (planId: 'monthly' | 'quarterly' | 'annual', paymentMethod: string, promoCode?: string) => {
      const plan = SUBSCRIPTION_PLANS.find((p) => p.id === planId) || SUBSCRIPTION_PLANS[0];
      const now = new Date();
      const end = new Date(now.getTime() + plan.durationDays * 24 * 60 * 60 * 1000);

      const newSub: SubscriptionState = {
        status: 'active',
        planId: plan.id,
        planName: plan.name,
        startDate: now.toISOString(),
        endDate: end.toISOString(),
        paymentMethod,
        autoRenew: false,
      };

      const discountAmount = promoCode ? Math.round(plan.price * 0.2) : 0;
      const totalAmount = plan.price - discountAmount;

      const newTx: TransactionRecord = {
        id: `TX-HUMORA-${Math.floor(100000 + Math.random() * 900000)}`,
        planId: plan.id,
        planName: plan.name,
        amount: plan.price,
        discount: discountAmount,
        total: totalAmount,
        paymentMethod,
        status: 'success',
        createdAt: now.toISOString(),
        expiryDate: end.toISOString(),
      };

      setSubscription(newSub);
      setTransactions((prev) => [newTx, ...prev]);

      // Add celebratory notification
      const premiumNotif: NotificationItemData = {
        id: `notif-${Date.now()}`,
        title: 'Paket Premium Humora Aktif!',
        description: `Selamat! Akses ${plan.name} aktif sampai ${end.toLocaleDateString('id-ID')}. Tonton semua video sekarang.`,
        category: 'langganan',
        time: 'Baru saja',
        read: false,
        linkUrl: '/profile/subscription',
      };
      setNotifications((prev) => [premiumNotif, ...prev]);
      showToast('Pembayaran sukses! Status Premium Aktif.');
    },
    [showToast]
  );

  const expirePremium = useCallback(() => {
    const pastDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    setSubscription({
      status: 'expired',
      planId: 'monthly',
      planName: 'Paket Bulanan (Kedaluwarsa)',
      startDate: new Date(pastDate.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      endDate: pastDate.toISOString(),
      paymentMethod: 'QRIS',
      autoRenew: false,
    });
    showToast('Status langganan diset menjadi Kedaluwarsa (Expired).');
  }, [showToast]);

  const setDemoState = useCallback(
    (mode: 'guest' | 'free' | 'premium' | 'expired') => {
      switch (mode) {
        case 'guest':
          setUser(null);
          setSubscription(DEFAULT_SUBSCRIPTION);
          showToast('Mode: Tamu (Guest / Belum Login)');
          break;
        case 'free':
          setUser(DEMO_USER);
          setSubscription(DEFAULT_SUBSCRIPTION);
          showToast('Mode: Pengguna Terdaftar (Gratis)');
          break;
        case 'premium': {
          setUser(DEMO_USER);
          const now = new Date();
          const end = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
          setSubscription({
            status: 'active',
            planId: 'quarterly',
            planName: 'Paket 3 Bulan',
            startDate: now.toISOString(),
            endDate: end.toISOString(),
            paymentMethod: 'GoPay / QRIS',
            autoRenew: true,
          });
          showToast('Mode: Pengguna Premium Aktif (3 Bulan)');
          break;
        }
        case 'expired': {
          setUser(DEMO_USER);
          expirePremium();
          break;
        }
      }
    },
    [expirePremium, showToast]
  );

  const resetDemoState = useCallback(() => {
    setUser(null);
    setSubscription(DEFAULT_SUBSCRIPTION);
    setHistory(DEFAULT_HISTORY);
    setNotifications(INITIAL_NOTIFICATIONS);
    setTransactions([]);
    setSelectedPlanId('quarterly');
    setPendingRedirectUrl(null);
    setActiveEpisodeTarget(null);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Data demo berhasil direset ke kondisi awal.');
  }, [showToast]);

  const updateWatchProgress = useCallback(
    (series: Series, episode: Episode, currentSeconds: number, totalSeconds: number) => {
      if (totalSeconds <= 0) return;
      const percent = Math.min(100, Math.round((currentSeconds / totalSeconds) * 100));
      const completed = percent >= 92;

      setHistory((prev) => {
        const filtered = prev.filter(
          (item) => !(item.seriesSlug === series.slug && item.episodeId === episode.id)
        );
        const newItem: WatchHistoryItem = {
          seriesSlug: series.slug,
          seriesTitle: series.title,
          seriesThumbnail: episode.thumbnail || series.thumbnail,
          seriesPoster: episode.thumbnail || series.thumbnail,
          episodeId: episode.id,
          episodeNumber: episode.number,
          episodeTitle: episode.title,
          progressSeconds: Math.floor(currentSeconds),
          totalSeconds: Math.floor(totalSeconds),
          percent,
          lastWatchedAt: new Date().toISOString(),
          completed,
        };
        return [newItem, ...filtered];
      });
    },
    []
  );

  const deleteHistoryItem = useCallback((seriesSlug: string, episodeId: number) => {
    setHistory((prev) =>
      prev.filter((item) => !(item.seriesSlug === seriesSlug && item.episodeId === episodeId))
    );
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    showToast('Seluruh riwayat tontonan telah dibersihkan.');
  }, [showToast]);

  const markNotificationAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Semua notifikasi ditandai sudah dibaca.');
  }, [showToast]);

  const value = {
    isHydrated,
    user,
    subscription,
    history,
    notifications,
    transactions,
    selectedPlan,
    pendingRedirectUrl,
    activeEpisodeTarget,
    toastMessage,
    isSubscriptionSheetOpen,
    subscriptionSheetContext,
    login,
    register,
    logout,
    updateProfile,
    selectPlan,
    setPendingRedirectUrl,
    setActiveEpisodeTarget,
    activatePremium,
    expirePremium,
    setDemoState,
    resetDemoState,
    canAccessEpisode,
    updateWatchProgress,
    deleteHistoryItem,
    clearHistory,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    showToast,
    openSubscriptionSheet,
    closeSubscriptionSheet,
  };

  return <HumoraContext.Provider value={value}>{children}</HumoraContext.Provider>;
}

export function useHumora() {
  const context = useContext(HumoraContext);
  if (!context) {
    throw new Error('useHumora must be used within a HumoraProvider');
  }
  return context;
}
