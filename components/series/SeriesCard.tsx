'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Sparkles, Play } from 'lucide-react';
import { Series } from '../../lib/types';

interface SeriesCardProps {
  series: Series;
  width?: string;
  badgeType?: 'free' | 'premium' | 'new' | 'rating';
}

export function SeriesCard({
  series,
  width = 'w-[148px] sm:w-[160px]',
  badgeType,
}: SeriesCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/series/${series.slug}`}
      className={`group flex flex-col shrink-0 ${width} select-none transition-all duration-200 active:scale-97`}
    >
      {/* Poster Image Container (2:3 aspect ratio) */}
      <div className="relative aspect-2/3 w-full rounded-2xl overflow-hidden bg-[#21052F] shadow-sm group-hover:shadow-md transition-all duration-200 border border-[#EEE8F0]">
        {!imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={series.poster}
            alt={series.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-b from-[#4B0B7A] to-[#21052F] text-center text-white">
            <div className="w-9 h-9 rounded-full bg-[#FFD52E] flex items-center justify-center mb-2 text-[#21052F]">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <span className="text-xs font-bold line-clamp-2 leading-tight">
              {series.title}
            </span>
          </div>
        )}

        {/* Gradient Overlay at Bottom */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          {badgeType === 'new' || series.isNew ? (
            <span className="bg-[#FFD52E] text-[#21052F] text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" />
              BARU
            </span>
          ) : badgeType === 'free' ? (
            <span className="bg-[#21865B] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs">
              2 EP GRATIS
            </span>
          ) : null}
        </div>

        {/* Rating on bottom left of poster */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white text-[11px] font-bold">
          <Star className="w-3 h-3 text-[#FFD52E] fill-[#FFD52E]" />
          <span>{series.rating.toFixed(1)}</span>
        </div>

        {/* Episode count on bottom right */}
        <div className="absolute bottom-2 right-2 text-[10px] font-semibold text-white/90 bg-black/40 backdrop-blur-xs px-1.5 py-0.5 rounded">
          {series.episodeCount} Ep
        </div>
      </div>

      {/* Series Title and Genre Info */}
      <div className="mt-2 flex flex-col">
        <h4 className="text-[13px] font-bold text-[#24172B] line-clamp-2 leading-snug group-hover:text-[#7028B8] transition-colors">
          {series.title}
        </h4>
        <div className="flex items-center gap-1 text-[11px] text-[#786F7D] mt-0.5 truncate">
          <span>{series.genres[0]}</span>
          {series.genres[1] && (
            <>
              <span>•</span>
              <span className="truncate">{series.genres[1]}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
