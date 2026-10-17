'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Play } from 'lucide-react';
import { Series } from '../../lib/types';
import { formatLikes } from '../../lib/utils/formatters';

interface SeriesCardProps {
  series: Series;
  width?: string;
  badgeType?: 'free' | 'premium' | 'new' | 'likes';
}

export function SeriesCard({
  series,
  width = 'w-[155px] sm:w-[170px]',
  badgeType,
}: SeriesCardProps) {
  const [imageError, setImageError] = useState(false);

  const isNew = badgeType === 'new' || series.isNew;
  const isPremium = badgeType === 'premium';

  return (
    <Link
      href={`/series/${series.slug}`}
      className={`group relative ${width} aspect-[3/4] rounded-[24px] overflow-hidden bg-[#21052F] border border-[#EEE8F0] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between p-3.5 select-none shrink-0 active:scale-[0.98]`}
    >
      {/* Background Thumbnail Image (Single thumbnail, no poster) */}
      {!imageError && (series.thumbnail || series.poster) ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={series.thumbnail || series.poster}
          alt={series.title}
          onError={() => setImageError(true)}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-out"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#4B0B7A] to-[#21052F] flex flex-col items-center justify-center p-3 text-center text-white">
          <Play className="w-6 h-6 fill-current text-[#FFD52E] mb-1" />
          <span className="text-xs font-bold line-clamp-2">{series.title}</span>
        </div>
      )}

      {/* Ambient Gradient Overlays for Clear Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

      {/* Top Badges Row */}
      <div className="relative z-10 flex items-center justify-between w-full">
        {isNew ? (
          <span className="bg-[#FFD52E] text-[#21052F] text-[10px] font-black px-2.5 py-1 rounded-lg shadow-xs tracking-wide">
            BARU
          </span>
        ) : isPremium ? (
          <span className="bg-[#7028B8] text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-xs tracking-wide">
            VIP
          </span>
        ) : (
          <span className="bg-[#21865B] text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-xs tracking-wide">
            GRATIS
          </span>
        )}

        <div className="bg-black/60 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10 shadow-xs">
          <Heart className="w-2.5 h-2.5 text-[#D94152] fill-[#D94152]" />
          <span>{formatLikes(series.likesCount || 12000)}</span>
        </div>
      </div>

      {/* Bottom Content Info */}
      <div className="relative z-10 mt-auto flex flex-col">
        <span className="text-[11px] font-extrabold text-[#FFD52E] uppercase tracking-wider mb-1 leading-none">
          {series.genres[0]}
        </span>

        <h4 className="text-sm sm:text-base font-black text-white line-clamp-1 leading-snug group-hover:text-[#FFD52E] transition-colors">
          {series.title}
        </h4>

        <span className="text-xs text-white/80 font-medium mt-0.5">
          {series.videoCount || series.episodeCount} Video
        </span>
      </div>
    </Link>
  );
}
