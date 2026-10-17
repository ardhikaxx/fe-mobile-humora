'use client';

import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { WatchHistoryItem } from '../../lib/types';
import { formatSecondsToTime } from '../../lib/utils/formatters';
import { SERIES_LIST } from '../../lib/data/seriesData';

interface ContinueWatchingCardProps {
  item: WatchHistoryItem;
}

export function ContinueWatchingCard({ item }: ContinueWatchingCardProps) {
  const remainingSeconds = Math.max(0, item.totalSeconds - item.progressSeconds);
  const series = SERIES_LIST.find((s) => s.slug === item.seriesSlug);
  const episode = series?.episodes.find((e) => e.id === item.episodeId);
  const imageSrc = episode?.thumbnail || series?.thumbnail || item.seriesThumbnail || item.seriesPoster || '/images/thumbnails/cara-deketin-cewek.jpg';

  return (
    <Link
      href={`/watch/${item.seriesSlug}/${item.episodeId}`}
      className="group flex flex-col shrink-0 w-[240px] sm:w-[260px] bg-white rounded-2xl p-2.5 border border-[#EEE8F0] shadow-xs hover:shadow-md transition-all duration-200 select-none active:scale-98"
    >
      {/* Thumbnail with 16:9 aspect ratio */}
      <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-[#21052F]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={item.episodeTitle}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Dim overlay with centered play icon */}
        <div className="absolute inset-0 bg-black/35 flex items-center justify-center group-hover:bg-black/20 transition-colors">
          <div className="w-10 h-10 rounded-full bg-[#FFD52E] text-[#21052F] flex items-center justify-center shadow-md transform transition-transform group-hover:scale-110">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>

        {/* Remaining time pill */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[10px] font-semibold text-white">
          Sisa {formatSecondsToTime(remainingSeconds)}
        </div>

        {/* Progress bar at bottom of thumbnail */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/30">
          <div
            className="h-full bg-[#FFD52E]"
            style={{ width: `${item.percent}%` }}
          />
        </div>
      </div>

      {/* Info */}
      <div className="mt-2 px-0.5">
        <h4 className="text-xs font-bold text-[#24172B] truncate group-hover:text-[#7028B8] transition-colors">
          {item.seriesTitle}
        </h4>
        <p className="text-[11px] text-[#786F7D] truncate mt-0.5">
          Video {item.episodeNumber}: {item.episodeTitle}
        </p>
      </div>
    </Link>
  );
}
