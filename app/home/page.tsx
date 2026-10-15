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
  const { user, subscription, history } = useHumora();

  const featuredSeries = SERIES_LIST.find((s) => s.featured) || SERIES_LIST[0];
  const popularSeries = SERIES_LIST.filter((s) => s.isPopular);
  const newSeries = SERIES_LIST.filter((s) => s.isNew);
  const recommendedSeries = SERIES_LIST.slice(2, 7);

  // In-progress items from history
  const continueWatchingItems = history.filter((h) => !h.completed);

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-10">
      {/* Mobile App Header */}
      <AppHeader />

      {/* Greeting Banner */}
      <section className="px-5 pt-4 pb-2">
        <h2 className="text-xl sm:text-2xl font-black text-[#24172B] tracking-tight">
          Hai{user?.name ? `, ${user.name.split(' ')[0]}` : ''}! Siap ketawa hari ini?
        </h2>
        <p className="text-xs sm:text-sm text-[#786F7D] mt-0.5">
          Temukan cerita pendek yang bikin kamu ingin lanjut terus.
        </p>
      </section>

      {/* Premium Promo Card (Displayed if user does not have active subscription) */}
      {subscription.status !== 'active' && (
        <section className="px-5 my-3">
          <div className="relative rounded-2xl bg-[#21052F] p-4 text-white overflow-hidden shadow-md flex items-center justify-between border border-[#4B0B7A]">
            {/* Sparkle decorative background element */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#FFD52E]/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center gap-3.5 z-10">
              <div className="w-11 h-11 rounded-2xl bg-[#FFD52E] flex items-center justify-center text-[#21052F] shrink-0 shadow-sm">
                <Crown className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    Buka Semua Episode
                  </h4>
                  <span className="bg-[#FFD52E] text-[#21052F] text-[9px] font-black px-1.5 py-0.2 rounded">
                    PROMO
                  </span>
                </div>
                <p className="text-xs text-[#D8D0DE] mt-0.5">
                  Mulai Rp19rb untuk tonton semua cerita
                </p>
              </div>
            </div>

            <Link
              href="/subscription"
              className="z-10 bg-[#FFD52E] hover:bg-[#FFE57F] active:scale-95 text-[#21052F] font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm shrink-0"
            >
              Lihat Premium
            </Link>
          </div>
        </section>
      )}

      {/* HERO SECTION: Spotlight Series */}
      <section className="px-5 my-2">
        <div className="relative w-full aspect-16/10 rounded-3xl overflow-hidden shadow-md bg-[#21052F] border border-[#EEE8F0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featuredSeries.cover}
            alt={featuredSeries.title}
            className="w-full h-full object-cover"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0325] via-[#1A0325]/40 to-black/20" />

          {/* Hero Content */}
          <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="bg-[#FFD52E] text-[#21052F] text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                <Flame className="w-3 h-3 fill-current" />
                UNGGULAN
              </span>
              <span className="bg-white/20 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                2 Episode Gratis
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight drop-shadow-sm">
              {featuredSeries.title}
            </h3>

            <p className="text-xs text-white/80 line-clamp-2 mt-1 leading-relaxed max-w-sm">
              {featuredSeries.synopsis}
            </p>

            <div className="flex items-center gap-2.5 mt-3">
              <button
                onClick={() => router.push(`/watch/${featuredSeries.slug}/1`)}
                className="py-2.5 px-4 rounded-xl bg-[#FFD52E] hover:bg-[#FFE57F] active:scale-95 text-[#21052F] font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Tonton Sekarang</span>
              </button>

              <button
                onClick={() => router.push(`/series/${featuredSeries.slug}`)}
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
            <h3 className="text-base font-bold text-[#24172B]">Series Populer</h3>
            <span className="text-xs text-[#E58A16]">🔥</span>
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
            <SeriesCard key={s.id} series={s} badgeType="rating" />
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
            <p className="text-[11px] text-[#786F7D]">Tonton 2 episode pertama tanpa langganan</p>
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
