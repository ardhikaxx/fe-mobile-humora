'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Lock,
  Share2,
  Heart,
  Bookmark,
  Check,
  Play,
  Flame,
  ArrowRight,
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

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(1420);
  const [isSaved, setIsSaved] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

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

  const handleToggleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      showToast('Video disukai! Terima kasih atas apresiasimu.');
    } else {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
    }
  };

  const handleToggleSave = () => {
    setIsSaved(!isSaved);
    showToast(!isSaved ? 'Disimpan ke Daftar Tontonan nanti.' : 'Dihapus dari Daftar Tontonan.');
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: `${series.title} - Video ${currentEpisode.number}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
      }
      showToast('Tautan video berhasil disalin ke clipboard!');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-20">
      {/* 1. CINEMATIC 16:9 VIDEO PLAYER AT TOP */}
      <div className="w-full bg-black sticky top-0 z-30 shadow-md">
        <VideoPlayer
          series={series}
          episode={currentEpisode}
          onBack={() => router.push(`/series/${series.slug}`)}
          onNextEpisode={handleNextEpisode}
          hasNextEpisode={!!nextEpisode}
        />
      </div>

      {/* 2. MAIN VIDEO INFO SECTION */}
      <div className="px-4 sm:px-5 pt-3.5 space-y-4">
        {/* Title & Metadata Card */}
        <div>
          {/* Series Link Badge */}
          <Link
            href={`/series/${series.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7028B8] hover:text-[#4B0B7A] bg-[#F6F1F8] hover:bg-[#EEE8F0] px-2.5 py-1 rounded-full transition-colors mb-1.5"
          >
            <span>{series.title}</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>

          {/* Video Title */}
          <h1 className="text-lg sm:text-xl font-black text-[#24172B] tracking-tight leading-snug">
            Video {currentEpisode.number}: {currentEpisode.title}
          </h1>

          {/* Sub Metadata Row & Access Badge */}
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-[#786F7D]">
            <span>Video {currentEpisode.number} dari {series.videoCount || series.episodes.length}</span>
            <span>•</span>
            <span>{currentEpisode.duration}</span>
            <span>•</span>
            <span className="font-semibold text-[#24172B] flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#E58A16] fill-[#E58A16]" />
              <span>{series.rating} Rating</span>
            </span>

            {/* Access Pill */}
            {currentEpisode.accessType === 'free' ? (
              <span className="ml-auto bg-[#EAF8F1] text-[#21865B] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#21865B]/20">
                GRATIS
              </span>
            ) : (
              <span className="ml-auto bg-[#FFF9E0] text-[#7028B8] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-[#FFD52E] flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-[#FFD52E] fill-[#FFD52E]" />
                <span>PREMIUM</span>
              </span>
            )}
          </div>
        </div>

        {/* 3. MODERN QUICK ACTIONS BAR */}
        <div className="flex items-center justify-between gap-2 py-1 border-y border-[#EEE8F0]">
          {/* Suka / Like */}
          <button
            type="button"
            onClick={handleToggleLike}
            className={`flex-1 py-2 px-2.5 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all active:scale-95 ${
              isLiked
                ? 'bg-[#FEECEF] text-[#D94152]'
                : 'bg-white hover:bg-[#F6F1F8] text-[#24172B] border border-[#EEE8F0]'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                isLiked ? 'text-[#D94152] fill-[#D94152]' : 'text-[#786F7D]'
              }`}
            />
            <span>{likeCount}</span>
          </button>

          {/* Simpan / Bookmark */}
          <button
            type="button"
            onClick={handleToggleSave}
            className={`flex-1 py-2 px-2.5 rounded-2xl flex items-center justify-center gap-1.5 text-xs font-bold transition-all active:scale-95 ${
              isSaved
                ? 'bg-[#FFF9E0] text-[#7028B8] border border-[#FFD52E]'
                : 'bg-white hover:bg-[#F6F1F8] text-[#24172B] border border-[#EEE8F0]'
            }`}
          >
            <Bookmark
              className={`w-4 h-4 ${
                isSaved ? 'text-[#7028B8] fill-[#7028B8]' : 'text-[#786F7D]'
              }`}
            />
            <span>{isSaved ? 'Tersimpan' : 'Simpan'}</span>
          </button>

          {/* Bagikan / Share */}
          <button
            type="button"
            onClick={handleShare}
            className="flex-1 py-2 px-2.5 rounded-2xl bg-white hover:bg-[#F6F1F8] border border-[#EEE8F0] text-[#24172B] flex items-center justify-center gap-1.5 text-xs font-bold transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4 text-[#786F7D]" />
            <span>Bagikan</span>
          </button>
        </div>

        {/* 4. CLEAN COLLAPSIBLE SYNOPSIS CARD */}
        <div className="bg-[#FAF8FC] rounded-2xl p-3.5 border border-[#EEE8F0]/80">
          <p
            className={`text-xs text-[#24172B]/85 leading-relaxed font-medium ${
              !isDescExpanded ? 'line-clamp-2' : ''
            }`}
          >
            {currentEpisode.description}
          </p>

          <button
            type="button"
            onClick={() => setIsDescExpanded(!isDescExpanded)}
            className="text-[11px] font-bold text-[#7028B8] hover:underline mt-1 block"
          >
            {isDescExpanded ? 'Sembunyikan' : 'Lihat selengkapnya'}
          </button>
        </div>

        {/* 5. NEXT VIDEO QUICK BANNER (IF AVAILABLE) */}
        {nextEpisode && (
          <div
            onClick={handleNextEpisode}
            className="p-3 bg-gradient-to-r from-[#21052F] to-[#4B0B7A] text-white rounded-2xl shadow-sm flex items-center justify-between cursor-pointer hover:opacity-95 active:scale-98 transition-all"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#FFD52E] text-[#21052F] flex items-center justify-center shrink-0">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#FFD52E] tracking-wider block">
                  Lanjut Otomatis
                </span>
                <span className="text-xs font-bold text-white truncate block">
                  Video {nextEpisode.number}: {nextEpisode.title}
                </span>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-white/80 shrink-0 ml-2" />
          </div>
        )}

        {/* 6. DAFTAR VIDEO DALAM JUDUL INI (MODERN PLAYLIST) */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-sm font-black text-[#24172B] tracking-tight">
                Daftar Video
              </h2>
              <p className="text-[11px] text-[#786F7D]">
                Total {series.episodes.length} video dalam judul ini
              </p>
            </div>

            <span className="text-[11px] font-bold text-[#7028B8] bg-[#F6F1F8] px-2.5 py-0.5 rounded-full">
              {series.genres[0] || 'Komedi'}
            </span>
          </div>

          {/* Sleek Vertical Video Cards List */}
          <div className="space-y-2.5">
            {series.episodes.map((ep) => {
              const isCurrent = ep.id === currentEpisode.id;
              const access = canAccessEpisode(ep);
              const isLocked = !access.allowed;

              return (
                <div
                  key={ep.id}
                  onClick={() => handleSelectEpisode(ep.id)}
                  className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 active:scale-98 ${
                    isCurrent
                      ? 'bg-[#F6F1F8] border-[#7028B8] ring-1 ring-[#7028B8]/30 shadow-xs'
                      : 'bg-white border-[#EEE8F0] hover:bg-[#FAF8FC]'
                  }`}
                >
                  {/* Thumbnail with duration badge */}
                  <div className="relative aspect-16/9 w-28 sm:w-32 rounded-xl overflow-hidden bg-black shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ep.thumbnail}
                      alt={ep.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Duration badge */}
                    <span className="absolute bottom-1 right-1 text-[9px] font-bold text-white bg-black/70 backdrop-blur-xs px-1.5 py-0.5 rounded-md">
                      {ep.duration}
                    </span>

                    {/* Playing animated equalizer overlay OR VIP Lock */}
                    {isCurrent ? (
                      <div className="absolute inset-0 bg-[#21052F]/40 backdrop-blur-[1px] flex items-center justify-center">
                        <div className="flex items-end gap-1 h-4">
                          <span className="w-1 bg-[#FFD52E] rounded-full animate-pulse h-3" />
                          <span className="w-1 bg-[#FFD52E] rounded-full animate-pulse delay-75 h-4" />
                          <span className="w-1 bg-[#FFD52E] rounded-full animate-pulse delay-150 h-2" />
                        </div>
                      </div>
                    ) : isLocked ? (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-[#21052F]/90 text-[#FFD52E] border border-[#FFD52E]/30 flex items-center justify-center">
                          <Lock className="w-3 h-3" />
                        </div>
                      </div>
                    ) : null}
                  </div>

                  {/* Video Meta Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-bold text-[#7028B8] uppercase tracking-wider">
                        Video {ep.number}
                      </span>

                      {isCurrent ? (
                        <span className="text-[9px] font-black text-[#21052F] bg-[#FFD52E] px-1.5 py-0.2 rounded-md">
                          DIPUTAR
                        </span>
                      ) : ep.accessType === 'free' ? (
                        <span className="text-[9px] font-bold text-[#21865B] bg-[#EAF8F1] px-1.5 py-0.2 rounded-md">
                          GRATIS
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-[#7028B8] bg-[#FFF9E0] px-1.5 py-0.2 rounded-md flex items-center gap-0.5">
                          <Lock className="w-2.5 h-2.5" />
                          <span>VIP</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-[#24172B] truncate leading-tight">
                      {ep.title}
                    </h3>

                    <p className="text-[11px] text-[#786F7D] line-clamp-1 mt-0.5">
                      {ep.description}
                    </p>
                  </div>

                  {/* Play arrow indicator */}
                  <div className="shrink-0 text-[#786F7D] pr-1">
                    {isCurrent ? (
                      <div className="w-7 h-7 rounded-full bg-[#7028B8] text-white flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[#A39CA9]" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 7. REKOMENDASI JUDUL LAINNYA */}
        <div className="pt-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-black text-[#24172B] tracking-tight">
              Rekomendasi Judul Lainnya
            </h2>
            <Link
              href="/home"
              className="text-xs font-bold text-[#7028B8] hover:underline flex items-center gap-0.5"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-3">
            {SERIES_LIST.filter((s) => s.slug !== series.slug).map((s) => (
              <SeriesCard key={s.id} series={s} width="w-[140px]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
