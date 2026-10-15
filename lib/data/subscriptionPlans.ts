import { SubscriptionPlan } from '../types';

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'monthly',
    name: 'Paket Bulanan',
    durationDays: 30,
    price: 19000,
    originalPrice: 25000,
    periodLabel: '30 Hari',
    description: 'Pilihan pas untuk eksplorasi dan tonton santai sebulan penuh.',
    perMonthPrice: 19000,
    features: [
      'Akses semua episode terkunci',
      'Nonton tanpa jeda iklan cerita',
      'Kualitas streaming HD jernih',
      'Download episode untuk ditonton offline',
      'Dukungan nonton di HP & Tablet',
    ],
  },
  {
    id: 'quarterly',
    name: 'Paket 3 Bulan',
    durationDays: 90,
    price: 49000,
    originalPrice: 75000,
    periodLabel: '90 Hari',
    badge: 'Favorit Pengguna',
    isPopular: true,
    description: 'Paling diminati! Hemat 35% untuk marathon series favoritmu.',
    perMonthPrice: 16333,
    features: [
      'Semua keuntungan Paket Bulanan',
      'Hemat lebih besar dibanding bulanan',
      'Akses lebih awal untuk episode baru',
      'Bebas unduh hingga 50 episode',
      'Prioritas rekomendasi tontonan',
    ],
  },
  {
    id: 'annual',
    name: 'Paket Tahunan',
    durationDays: 365,
    price: 179000,
    originalPrice: 299000,
    periodLabel: '365 Hari',
    badge: 'Paling Hemat',
    description: 'Tawa tanpa henti setahun penuh dengan penghematan maksimal.',
    perMonthPrice: 14916,
    features: [
      'Semua keuntungan Paket 3 Bulan',
      'Biaya paling hemat hanya Rp14rb-an/bulan',
      'Akses eksklusif konten behind-the-scenes',
      'Badge anggota VIP di profil',
      'Unduh tanpa batas',
    ],
  },
];

export const DEMO_PROMO_CODES: Record<string, { discountPercent: number; description: string }> = {
  HUMORAHEMAT: {
    discountPercent: 20,
    description: 'Diskon Spesial Humora 20%',
  },
  TAWALAGI: {
    discountPercent: 15,
    description: 'Voucher Tawa Lagi 15%',
  },
  SERIESSERU: {
    discountPercent: 10,
    description: 'Diskon Penggemar Series 10%',
  },
};
