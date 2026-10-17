'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Play,
  Heart,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Film,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { AppHeader } from '../../../components/layout/AppHeader';
import { SERIES_LIST } from '../../../lib/data/seriesData';
import { EpisodeCard } from '../../../components/series/EpisodeCard';
import { useHumora } from '../../../lib/context/HumoraContext';
import { formatLikes } from '../../../lib/utils/formatters';

interface SeriesDetailClientProps {
  slug: string;
}

export default function SeriesDetailClient({ slug }: SeriesDetailClientProps) {
  const router = useRouter();
  const { history, openSubscriptionSheet, canAccessEpisode } = useHumora();
  const [isSynopsisExpanded, setIsSynopsisExpanded] = useState(false);

  const series = SERIES_LIST.find((s) => s.slug === slug) || SERIES_LIST[0];

  // Check last watched episode for this series in history
  const seriesHistory = history.filter((h) => h.seriesSlug === series.slug);
  const latestWatch = seriesHistory.length > 0 ? seriesHistory[0] : null;

  // Determine starting episode
  const startEpisodeNumber = latestWatch ? latestWatch.episodeNumber : 1;
  const startEpisode =
    series.episodes.find((ep) => ep.number === startEpisodeNumber) || series.episodes[0];

  const handleStartWatch = () => {
    const access = canAccessEpisode(startEpisode);
    if (!access.allowed) {
      openSubscriptionSheet({
        seriesSlug: series.slug,
        episodeNumber: startEpisode.number,
        reason: access.reason === 'expired' ? 'Langgananmu telah kedaluwarsa.' : undefined,
      });
      return;
    }
    router.push(`/watch/${series.slug}/${startEpisode.id}`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-24">
      {/* Floating Header Bar */}
      <AppHeader
        title={series.title}
        showBack
        withTopSpacer={false}
        showProfile={false}
        showNotification={false}
      />

      {/* Top Banner / Backdrop (Full Behind Floating Header) */}
      <div className="relative w-full aspect-16/11 sm:aspect-16/9 min-h-[300px] sm:min-h-[360px] bg-[#21052F] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={series.thumbnail || series.cover || series.poster || ''}
          alt={series.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF7] via-[#21052F]/25 to-black/60" />
      </div>

      {/* Series Metadata Container */}
      <div className="px-5 -mt-10 relative z-20">
        {/* Genre Tags & Promo Tag */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          <span className="text-[11px] font-black text-[#156942] bg-[#EAF8F1] border border-[#21865B]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#21865B]" />
            <span>2 Video Gratis</span>
          </span>

          {series.genres.map((g) => (
            <span
              key={g}
              className="text-[11px] font-bold text-[#4B0B7A] bg-[#F6F1F8] border border-[#EEE8F0] px-2.5 py-0.5 rounded-full shadow-2xs"
            >
              {g}
            </span>
          ))}

          <span className="text-[11px] font-semibold text-[#786F7D] bg-white border border-[#EEE8F0] px-2 py-0.5 rounded-full shadow-2xs">
            {series.year}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-[#24172B] tracking-tight leading-tight">
          {series.title}
        </h1>

        {/* Series Info Row */}
        <div className="flex items-center gap-2 flex-wrap mt-2.5">
          <div className="flex items-center gap-1.5 font-bold text-xs text-[#D94152] bg-[#FEECEF] px-2.5 py-1 rounded-full border border-[#D94152]/20">
            <Heart className="w-3.5 h-3.5 fill-[#D94152]" />
            <span>{formatLikes(series.likesCount || 14200)} Suka</span>
          </div>

          <div className="flex items-center gap-1.5 font-semibold text-xs text-[#24172B] bg-white px-2.5 py-1 rounded-full border border-[#EEE8F0] shadow-2xs">
            <Film className="w-3.5 h-3.5 text-[#7028B8]" />
            <span>{series.videoCount || series.episodes.length} Video</span>
          </div>

          <div className="flex items-center gap-1 font-bold text-xs text-[#156942] bg-[#EAF8F1] px-2.5 py-1 rounded-full border border-[#21865B]/25">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#21865B]" />
            <span>Episode 1 & 2 Gratis</span>
          </div>
        </div>

        {/* CTA Button: Mulai Menonton / Lanjutkan Menonton */}
        <div className="mt-4">
          <button
            onClick={handleStartWatch}
            className="group w-full p-3 sm:p-3.5 rounded-2xl bg-[#21052F] hover:bg-[#350A4E] active:scale-[0.99] text-white font-bold shadow-md shadow-[#21052F]/15 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#FFD52E] text-[#21052F] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="text-[10px] font-black text-[#FFD52E] uppercase tracking-wider">
                  {latestWatch ? 'Lanjutkan Menonton' : 'Mulai Tonton Sekarang'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white truncate">
                  {latestWatch
                    ? `Video ${latestWatch.episodeNumber}: ${latestWatch.episodeTitle}`
                    : `Video 1: ${startEpisode.title}`}
                </span>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-1 text-xs font-bold text-white/80 group-hover:text-white transition-colors pl-2">
              <span className="hidden sm:inline">Putar</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
            </div>
          </button>
        </div>

        {/* Synopsis with Expandable Toggle */}
        <div className="mt-4 bg-white rounded-2xl p-4 border border-[#EEE8F0] shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="text-xs font-bold text-[#24172B] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E58A16]" />
              Sinopsis Cerita
            </h4>
          </div>
          <p
            className={`text-xs sm:text-sm text-[#5F5666] leading-relaxed ${
              isSynopsisExpanded ? '' : 'line-clamp-3'
            }`}
          >
            {series.synopsis}
          </p>
          <button
            onClick={() => setIsSynopsisExpanded(!isSynopsisExpanded)}
            className="mt-2 text-xs font-bold text-[#7028B8] hover:text-[#4B0B7A] flex items-center gap-1 transition-colors"
          >
            <span>{isSynopsisExpanded ? 'Tutup Ringkasan' : 'Baca Selengkapnya'}</span>
            {isSynopsisExpanded ? (
              <ChevronUp className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
            )}
          </button>
        </div>

        {/* Video List Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#24172B]">
                Daftar Video
              </h3>
              <span className="text-xs font-bold text-[#7028B8] bg-[#F6F1F8] px-2 py-0.5 rounded-full">
                {series.episodes.length}
              </span>
            </div>
            <span className="text-xs font-bold text-[#156942] bg-[#EAF8F1] px-2.5 py-1 rounded-full border border-[#21865B]/25 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#21865B]" />
              Video 1 & 2 Gratis
            </span>
          </div>

          <div className="space-y-2.5">
            {series.episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                series={series}
                episode={episode}
                isCurrent={latestWatch?.episodeId === episode.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
