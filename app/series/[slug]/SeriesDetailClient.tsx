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
        withTopSpacer={true}
        showProfile={false}
        showNotification={false}
      />

      {/* Main Content */}
      <div className="px-4 sm:px-5 pt-1 space-y-4">
        {/* Cinematic Video Showcase Card (Full 16:9 - Crystal Clear Framing) */}
        <div
          onClick={handleStartWatch}
          className="group relative w-full aspect-16/9 rounded-3xl overflow-hidden shadow-md bg-[#21052F] border border-[#EEE8F0] cursor-pointer select-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={series.thumbnail || series.cover || series.poster || '/images/thumbnails/cara-deketin-cewek.jpg'}
            alt={series.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
          />

          {/* Gentle Bottom Vignette for Badges */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Centered Golden Play Button Disc */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#FFD52E] text-[#21052F] flex items-center justify-center shadow-lg group-hover:scale-110 group-active:scale-95 transition-all duration-300">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-current ml-1" />
            </div>
          </div>

          {/* Bottom Badges on Showcase */}
          <div className="absolute bottom-3 inset-x-3.5 flex items-center justify-between pointer-events-none">
            <span className="bg-[#21865B] text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-xs flex items-center gap-1 backdrop-blur-xs">
              <Sparkles className="w-3 h-3 text-[#FFD52E] fill-[#FFD52E]" />
              2 Video Gratis
            </span>

            <span className="bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
              {startEpisode.duration}
            </span>
          </div>
        </div>

        {/* Series Info & Metadata */}
        <div>
          {/* Release Year & Genre Text (Simple, Uncluttered, Non-Badge) */}
          <p className="text-xs text-[#786F7D] font-medium mb-1">
            {series.year} • {series.genres.join(', ')}
          </p>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-[#24172B] tracking-tight leading-tight">
            {series.title}
          </h1>

          {/* Clean Metric Chips (Only 3 Clean Chips - No Clutter) */}
          <div className="flex items-center gap-2 flex-wrap mt-2.5">
            <div className="flex items-center gap-1.5 font-bold text-xs text-[#D94152] bg-[#FEECEF] px-3 py-1 rounded-full border border-[#D94152]/20">
              <Heart className="w-3.5 h-3.5 fill-[#D94152]" />
              <span>{formatLikes(series.likesCount || 14200)} Suka</span>
            </div>

            <div className="flex items-center gap-1.5 font-semibold text-xs text-[#24172B] bg-white px-3 py-1 rounded-full border border-[#EEE8F0] shadow-xs">
              <Film className="w-3.5 h-3.5 text-[#7028B8]" />
              <span>{series.videoCount || series.episodes.length} Video</span>
            </div>

            <div className="flex items-center gap-1 font-bold text-xs text-[#156942] bg-[#EAF8F1] px-3 py-1 rounded-full border border-[#21865B]/25">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#21865B]" />
              <span>Gratis Episode 1 & 2</span>
            </div>
          </div>
        </div>

        {/* CTA Button: Mulai / Lanjutkan Menonton */}
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

        {/* Synopsis with Expandable Toggle */}
        <div className="bg-white rounded-2xl p-4 border border-[#EEE8F0] shadow-xs">
          <h4 className="text-xs font-bold text-[#24172B] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E58A16]" />
            Sinopsis Cerita
          </h4>
          <p
            className={`text-xs sm:text-[13px] text-[#5F5666] leading-relaxed ${
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
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#24172B]">
                Daftar Video
              </h3>
              <span className="text-xs font-bold text-[#7028B8] bg-[#F6F1F8] px-2 py-0.5 rounded-full">
                {series.episodes.length}
              </span>
            </div>
            <span className="text-xs font-semibold text-[#786F7D]">
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
