'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Play, Crown, Sparkles, ChevronRight, Flame } from 'lucide-react';
import { AppHeader } from '../../components/layout/AppHeader';
import { SeriesCard } from '../../components/series/SeriesCard';
import { ContinueWatchingCard } from '../../components/series/ContinueWatchingCard';
import { SERIES_LIST } from '../../lib/data/seriesData';
import { useHumora } from '../../lib/context/HumoraContext';

export default function HomePage() {
  const router = useRouter();
  const { subscription, history } = useHumora();

  const latestSeries = SERIES_LIST.find((s) => s.isNew) || SERIES_LIST[0];
  const popularSeries = SERIES_LIST.filter((s) => s.isPopular);
  const newSeries = SERIES_LIST.filter((s) => s.isNew);
  const recommendedSeries = SERIES_LIST.slice(2, 7);

  // In-progress items from history
  const continueWatchingItems = history.filter((h) => !h.completed);

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-24">
      {/* Mobile App Header */}
      <AppHeader />

      {/* Premium Promo Card (Displayed if user does not have active subscription) */}
      {subscription.status !== 'active' && (
        <section className="px-5 mt-3 mb-2">
          <Link
            href="/subscription"
            className="group relative block rounded-3xl overflow-hidden bg-gradient-to-r from-[#21052F] via-[#350A4E] to-[#21052F] p-3.5 sm:p-4 border border-[#FFD52E]/30 shadow-[0_4px_20px_rgba(33,5,47,0.15)] hover:border-[#FFD52E]/60 transition-all duration-300 active:scale-[0.99]"
          >
            {/* Ambient Glowing Orbs */}
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#FFD52E]/15 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FFD52E]/25 transition-all duration-500" />
            <div className="absolute -left-6 -bottom-6 w-28 h-28 bg-[#7028B8]/30 rounded-full blur-xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between gap-3">
              {/* Left Side: Crown Badge & Copy */}
              <div className="flex items-center gap-3 min-w-0">
                {/* 3D Gold Crown Aura Icon */}
                <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#FFE866] via-[#FFD52E] to-[#E58A16] p-[1.5px] shadow-[0_4px_14px_rgba(255,213,46,0.35)] shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-[14px] bg-[#21052F]/15 flex items-center justify-center backdrop-blur-2xs">
                    <Crown className="w-5.5 h-5.5 text-[#21052F] fill-[#21052F] stroke-[1.5] drop-shadow-xs" />
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-[#FFD52E] fill-[#FFD52E] drop-shadow-xs animate-pulse" />
                </div>

                {/* Text Content */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="bg-gradient-to-r from-[#FFD52E] to-[#FFA800] text-[#21052F] text-[9px] font-black px-2 py-0.5 rounded-full tracking-wider uppercase shadow-xs flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 fill-current" />
                      PROMO SPESIAL
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-[15px] font-black text-white tracking-tight leading-tight truncate">
                    Buka Semua Video Komedi
                  </h4>

                  <p className="text-[11px] sm:text-xs text-[#E4DDE9] mt-0.5 truncate">
                    Mulai <span className="text-[#FFD52E] font-extrabold">Rp19rb</span> • Nonton bebas tanpa batas
                  </p>
                </div>
              </div>

              {/* Right Side: Sleek CTA Pill Button */}
              <div className="shrink-0">
                <div className="bg-gradient-to-r from-[#FFD52E] to-[#FFCA00] group-hover:from-[#FFE055] group-hover:to-[#FFB700] text-[#21052F] font-black text-xs px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-[0_2px_12px_rgba(255,213,46,0.35)] flex items-center gap-1 transition-all group-hover:translate-x-0.5">
                  <span>Lihat VIP</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* HERO SECTION: Latest Series */}
      <section className={`px-5 ${subscription.status !== 'active' ? 'my-2' : 'mt-3 mb-2'}`}>
        <div className="relative w-full aspect-16/10 rounded-3xl overflow-hidden shadow-md bg-[#21052F] border border-[#EEE8F0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={latestSeries.thumbnail || latestSeries.cover || latestSeries.poster || ''}
            alt={latestSeries.title}
            className="w-full h-full object-cover"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0325] via-[#1A0325]/40 to-black/20" />

          {/* Hero Content */}
          <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-[#FFD52E] text-[#21052F] text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 fill-current" />
                TERBARU
              </span>
              <span className="bg-white/20 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                2 Video Gratis
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight drop-shadow-sm">
              {latestSeries.title}
            </h3>

            <p className="text-xs text-white/80 line-clamp-2 mt-1 leading-relaxed max-w-sm">
              {latestSeries.synopsis}
            </p>

            <div className="flex items-center gap-2.5 mt-3">
              <button
                onClick={() => router.push(`/watch/${latestSeries.slug}/1`)}
                className="py-2.5 px-4 rounded-xl bg-[#FFD52E] hover:bg-[#FFE57F] active:scale-95 text-[#21052F] font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Tonton Sekarang</span>
              </button>

              <button
                onClick={() => router.push(`/series/${latestSeries.slug}`)}
                className="py-2.5 px-3.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md active:scale-95 text-white font-semibold text-xs transition-all"
              >
                Detail
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: CONTINUE WATCHING (if any items) */}
      {continueWatchingItems.length > 0 && (
        <section className="mt-5">
          <div className="px-5 flex items-center justify-between mb-2.5">
            <h3 className="text-sm sm:text-base font-bold text-[#24172B]">
              Lanjutkan Menonton
            </h3>
            <Link
              href="/history"
              className="text-xs font-semibold text-[#7028B8] hover:underline flex items-center"
            >
              <span>Riwayat</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-1">
            {continueWatchingItems.map((item) => (
              <ContinueWatchingCard
                key={`${item.seriesSlug}-${item.episodeId}`}
                item={item}
              />
            ))}
          </div>
        </section>
      )}

      {/* SECTION: POPULAR SERIES */}
      <section className="mt-6">
        <div className="px-5 flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-bold text-[#24172B]">Video Populer</h3>
            <Flame className="w-4 h-4 text-[#E58A16] fill-[#E58A16]/20" />
          </div>
          <Link
            href="/search"
            className="text-xs font-semibold text-[#7028B8] hover:underline flex items-center"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-2">
          {popularSeries.map((s) => (
            <SeriesCard key={s.id} series={s} badgeType="likes" />
          ))}
        </div>
      </section>

      {/* SECTION: NEW ON HUMORA */}
      <section className="mt-6">
        <div className="px-5 flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <h3 className="text-base font-bold text-[#24172B]">Terbaru di HUMORA</h3>
            <Sparkles className="w-3.5 h-3.5 text-[#FFD52E]" />
          </div>
          <Link
            href="/search"
            className="text-xs font-semibold text-[#7028B8] hover:underline flex items-center"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-2">
          {newSeries.map((s) => (
            <SeriesCard key={s.id} series={s} badgeType="new" />
          ))}
        </div>
      </section>

      {/* SECTION: FREE FOR YOU (Gratis untuk Kamu) */}
      <section className="mt-6">
        <div className="px-5 flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-[#24172B]">Gratis untuk Kamu</h3>
            <p className="text-[11px] text-[#786F7D]">Tonton 2 video pertama tanpa langganan</p>
          </div>
          <Link
            href="/search"
            className="text-xs font-semibold text-[#7028B8] hover:underline flex items-center"
          >
            <span>Semua</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-2">
          {SERIES_LIST.slice(3, 8).map((s) => (
            <SeriesCard key={s.id} series={s} badgeType="free" />
          ))}
        </div>
      </section>

      {/* SECTION: RECOMMENDATIONS */}
      <section className="mt-6">
        <div className="px-5 flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-[#24172B]">Rekomendasi Buat Kamu</h3>
          <Link
            href="/search"
            className="text-xs font-semibold text-[#7028B8] hover:underline flex items-center"
          >
            <span>Jelajahi</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="flex gap-3 px-5 overflow-x-auto no-scrollbar pb-2">
          {recommendedSeries.map((s) => (
            <SeriesCard key={s.id} series={s} />
          ))}
        </div>
      </section>
    </div>
  );
}
