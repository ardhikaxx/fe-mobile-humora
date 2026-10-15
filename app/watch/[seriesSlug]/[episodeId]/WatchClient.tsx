'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Lock,
  Share2,
} from 'lucide-react';
import { SERIES_LIST } from '../../../../lib/data/seriesData';
import { VideoPlayer } from '../../../../components/video/VideoPlayer';
import { SeriesCard } from '../../../../components/series/SeriesCard';
import { useHumora } from '../../../../lib/context/HumoraContext';

interface WatchClientProps {
  seriesSlug: string;
  episodeId: string;
}

export default function WatchClient({ seriesSlug, episodeId }: WatchClientProps) {
  const router = useRouter();
  const { canAccessEpisode, openSubscriptionSheet, showToast } = useHumora();

  const series = SERIES_LIST.find((s) => s.slug === seriesSlug) || SERIES_LIST[0];
  const episodeNum = parseInt(episodeId, 10) || 1;
  const currentEpisode =
    series.episodes.find((ep) => ep.id === episodeNum || ep.number === episodeNum) ||
    series.episodes[0];

  // Access verification on mount
  useEffect(() => {
    const access = canAccessEpisode(currentEpisode);
    if (!access.allowed) {
      openSubscriptionSheet({
        seriesSlug: series.slug,
        episodeNumber: currentEpisode.number,
        reason: access.reason === 'expired' ? 'Langgananmu telah kedaluwarsa.' : undefined,
      });
    }
  }, [canAccessEpisode, currentEpisode, openSubscriptionSheet, series.slug]);

  // Find previous and next episode
  const currentIndex = series.episodes.findIndex((ep) => ep.id === currentEpisode.id);
  const prevEpisode = currentIndex > 0 ? series.episodes[currentIndex - 1] : null;
  const nextEpisode =
    currentIndex < series.episodes.length - 1 ? series.episodes[currentIndex + 1] : null;

  const handleNextEpisode = () => {
    if (!nextEpisode) return;
    const access = canAccessEpisode(nextEpisode);
    if (!access.allowed) {
      openSubscriptionSheet({
        seriesSlug: series.slug,
        episodeNumber: nextEpisode.number,
        reason: access.reason === 'expired' ? 'Langgananmu telah kedaluwarsa.' : undefined,
      });
      return;
    }
    router.push(`/watch/${series.slug}/${nextEpisode.id}`);
  };

  const handlePrevEpisode = () => {
    if (!prevEpisode) return;
    router.push(`/watch/${series.slug}/${prevEpisode.id}`);
  };

  const handleSelectEpisode = (epId: number) => {
    const ep = series.episodes.find((e) => e.id === epId);
    if (!ep) return;
    const access = canAccessEpisode(ep);
    if (!access.allowed) {
      openSubscriptionSheet({
        seriesSlug: series.slug,
        episodeNumber: ep.number,
        reason: access.reason === 'expired' ? 'Langgananmu telah kedaluwarsa.' : undefined,
      });
      return;
    }
    router.push(`/watch/${series.slug}/${ep.id}`);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: `${series.title} - Ep ${currentEpisode.number}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      showToast('Tautan episode disalin ke clipboard!');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-14">
      {/* 16:9 Professional Video Player at Top */}
      <VideoPlayer
        series={series}
        episode={currentEpisode}
        onBack={() => router.push(`/series/${series.slug}`)}
        onNextEpisode={handleNextEpisode}
        hasNextEpisode={!!nextEpisode}
      />

      {/* Episode Info Area */}
      <div className="px-5 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#7028B8]">
                {series.title}
              </span>
              <span className="text-[#786F7D] text-xs">•</span>
              <span className="text-xs text-[#786F7D]">
                Episode {currentEpisode.number} dari {series.episodeCount}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-[#24172B] tracking-tight leading-snug">
              {currentEpisode.title}
            </h2>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-[#F6F1F8] flex items-center justify-center text-[#4B0B7A] hover:bg-[#E9DEEF] active:scale-95 transition-all shrink-0 mt-1"
            aria-label="Bagikan"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Access Status Pill */}
        <div className="flex items-center gap-2 mt-2">
          {currentEpisode.accessType === 'free' ? (
            <span className="bg-[#EAF8F1] text-[#21865B] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#21865B]/20">
              GRATIS (Free Preview)
            </span>
          ) : (
            <span className="bg-[#FFF9E0] text-[#7028B8] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#FFD52E] flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-[#4B0B7A]" />
              PREMIUM ACCESS
            </span>
          )}
          <span className="text-xs text-[#786F7D] font-medium">
            Durasi {currentEpisode.duration}
          </span>
        </div>

        {/* Episode Description */}
        <p className="text-xs sm:text-sm text-[#786F7D] leading-relaxed mt-3 bg-white p-3.5 rounded-2xl border border-[#EEE8F0]">
          {currentEpisode.description}
        </p>

        {/* Prev / Next Episode Nav Buttons */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={handlePrevEpisode}
            disabled={!prevEpisode}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
              prevEpisode
                ? 'bg-white border border-[#EEE8F0] text-[#24172B] hover:bg-[#F6F1F8] active:scale-98'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Episode Sebelumnya</span>
          </button>

          <button
            onClick={handleNextEpisode}
            disabled={!nextEpisode}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all ${
              nextEpisode
                ? 'bg-[#4B0B7A] text-white hover:bg-[#38065C] active:scale-98 shadow-sm'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
            }`}
          >
            <span>Episode Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* "Episode Lainnya" Horizontal Carousel */}
        <div className="mt-7">
          <h3 className="text-sm font-bold text-[#24172B] mb-2.5">
            Semua Episode Series Ini
          </h3>

          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-2">
            {series.episodes.map((ep) => {
              const isActive = ep.id === currentEpisode.id;
              const access = canAccessEpisode(ep);
              const isLocked = !access.allowed;

              return (
                <div
                  key={ep.id}
                  onClick={() => handleSelectEpisode(ep.id)}
                  className={`shrink-0 w-36 rounded-xl p-2 border transition-all cursor-pointer select-none active:scale-97 ${
                    isActive
                      ? 'bg-[#F6F1F8] border-[#7028B8] ring-2 ring-[#7028B8]/20'
                      : 'bg-white border-[#EEE8F0] hover:border-gray-300'
                  }`}
                >
                  <div className="relative aspect-16/9 w-full rounded-lg overflow-hidden bg-[#21052F] mb-1.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ep.thumbnail}
                      alt={ep.title}
                      className={`w-full h-full object-cover ${
                        isLocked ? 'filter brightness-70' : ''
                      }`}
                    />
                    {isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-[#FFD52E]">
                          <Lock className="w-3 h-3" />
                        </div>
                      </div>
                    )}
                    <span className="absolute bottom-1 right-1 text-[9px] font-semibold text-white bg-black/60 px-1 rounded">
                      {ep.duration}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-[#7028B8] block">
                    Ep {ep.number}
                  </span>
                  <span className="text-xs font-semibold text-[#24172B] line-clamp-1 leading-snug">
                    {ep.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommendations at bottom */}
        <div className="mt-8">
          <h3 className="text-sm font-bold text-[#24172B] mb-3">
            Rekomendasi Series Lainnya
          </h3>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {SERIES_LIST.filter((s) => s.slug !== series.slug).map((s) => (
              <SeriesCard key={s.id} series={s} width="w-[140px]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
