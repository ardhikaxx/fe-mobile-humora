'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Play,
  Star,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SERIES_LIST } from '../../../lib/data/seriesData';
import { EpisodeCard } from '../../../components/series/EpisodeCard';
import { useHumora } from '../../../lib/context/HumoraContext';

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
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-28">
      {/* Top Banner / Backdrop with Floating Back Button */}
      <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-[#21052F] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={series.cover}
          alt={series.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFDF7] via-[#21052F]/40 to-black/50" />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 active:scale-95 transition-all"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Badges on Banner */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20">
          <span className="bg-[#21865B] text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
            2 Episode Gratis
          </span>
        </div>
      </div>

      {/* Series Metadata Container */}
      <div className="px-5 -mt-8 relative z-20">
        {/* Genre Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          {series.genres.map((g) => (
            <span
              key={g}
              className="text-[11px] font-bold text-[#4B0B7A] bg-[#F6F1F8] border border-[#EEE8F0] px-2.5 py-0.5 rounded-full"
            >
              {g}
            </span>
          ))}
          <span className="text-[11px] font-semibold text-[#786F7D] bg-white border border-[#EEE8F0] px-2 py-0.5 rounded-full">
            {series.year}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-[#24172B] tracking-tight leading-tight">
          {series.title}
        </h1>

        {/* Series Info Row */}
        <div className="flex items-center gap-3 text-xs text-[#786F7D] mt-2">
          <div className="flex items-center gap-1 font-bold text-[#24172B]">
            <Star className="w-3.5 h-3.5 text-[#FFD52E] fill-[#FFD52E]" />
            <span>{series.rating.toFixed(1)}</span>
          </div>
          <span>•</span>
          <span className="font-medium">{series.episodeCount} Episode</span>
          <span>•</span>
          <span className="text-[#21865B] font-bold">Free Preview</span>
        </div>

        {/* CTA Button: Mulai Menonton / Lanjutkan Menonton */}
        <div className="mt-4">
          <button
            onClick={handleStartWatch}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#4B0B7A] hover:bg-[#38065C] active:scale-98 text-white font-bold text-sm shadow-md shadow-[#4B0B7A]/25 flex items-center justify-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>
              {latestWatch
                ? `Lanjutkan Ep ${latestWatch.episodeNumber}: ${latestWatch.episodeTitle}`
                : 'Mulai Menonton (Ep 1)'}
            </span>
          </button>
        </div>

        {/* Synopsis with Expandable Toggle */}
        <div className="mt-4 bg-white rounded-2xl p-4 border border-[#EEE8F0]">
          <h4 className="text-xs font-bold text-[#24172B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD52E]" />
            Sinopsis Cerita
          </h4>
          <p
            className={`text-xs sm:text-sm text-[#786F7D] leading-relaxed ${
              isSynopsisExpanded ? '' : 'line-clamp-3'
            }`}
          >
            {series.synopsis}
          </p>
          <button
            onClick={() => setIsSynopsisExpanded(!isSynopsisExpanded)}
            className="mt-1.5 text-xs font-bold text-[#7028B8] flex items-center gap-0.5 hover:underline"
          >
            <span>{isSynopsisExpanded ? 'Tutup' : 'Selengkapnya'}</span>
            {isSynopsisExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Episode List Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-[#24172B]">
              Daftar Episode ({series.episodes.length})
            </h3>
            <span className="text-xs text-[#786F7D]">Ep 1 & 2 Gratis</span>
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
