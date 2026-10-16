'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Play, ChevronRight, Flame, Sparkles } from 'lucide-react';
import { Series } from '../../lib/types';

export type BentoCardVariant = 'hero' | 'horizontal' | 'portrait';

interface BentoSeriesCardProps {
  series: Series;
  variant: BentoCardVariant;
}

export function BentoSeriesCard({ series, variant }: BentoSeriesCardProps) {
  const [imageError, setImageError] = useState(false);

  // 1. HERO BENTO CARD (Widescreen cinematic spotlight tile)
  if (variant === 'hero') {
    const bgImage = !imageError ? (series.thumbnail || series.cover || series.poster) : null;

    return (
      <Link
        href={`/series/${series.slug}`}
        className="group relative col-span-2 rounded-[24px] sm:rounded-3xl overflow-hidden bg-[#21052F] border border-[#EEE8F0] shadow-xs hover:shadow-md transition-all duration-300 min-h-[210px] sm:min-h-[240px] flex flex-col justify-between p-4 sm:p-5 select-none active:scale-[0.99]"
      >
        {/* Background Image with Zoom Effect */}
        {bgImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bgImage}
            alt={series.title}
            onError={() => setImageError(true)}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#4B0B7A] via-[#2D0A47] to-[#14021D]" />
        )}

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Top Meta Row */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center gap-1.5">
            {series.isPopular ? (
              <span className="bg-[#FFD52E] text-[#21052F] text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                <Flame className="w-3 h-3 fill-current text-[#E58A16]" />
                POPULER
              </span>
            ) : series.isNew ? (
              <span className="bg-[#FFD52E] text-[#21052F] text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3" />
                BARU
              </span>
            ) : (
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-white/20">
                2 VIDEO GRATIS
              </span>
            )}
          </div>

          <div className="bg-black/40 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/15">
            <Star className="w-3 h-3 text-[#FFD52E] fill-[#FFD52E]" />
            <span>{series.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Bottom Hero Info */}
        <div className="relative z-10 mt-auto pt-6 flex items-end justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-bold text-[#FFD52E] uppercase tracking-wider">
                {series.genres[0]}
              </span>
              <span className="text-white/40 text-[10px]">•</span>
              <span className="text-[11px] font-medium text-white/80">
                {series.videoCount || series.episodeCount} Video
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-white tracking-tight line-clamp-1 group-hover:text-[#FFD52E] transition-colors">
              {series.title}
            </h3>

            <p className="text-xs text-white/75 line-clamp-1 mt-0.5 leading-relaxed">
              {series.synopsis}
            </p>
          </div>

          {/* Minimalist Circular Play Button */}
          <div className="w-10 h-10 rounded-full bg-white/95 text-[#21052F] flex items-center justify-center shadow-md group-hover:scale-105 group-hover:bg-[#FFD52E] transition-all shrink-0">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>
      </Link>
    );
  }

  // 2. HORIZONTAL BENTO CARD (Airy split card with poster & summary)
  if (variant === 'horizontal') {
    return (
      <Link
        href={`/series/${series.slug}`}
        className="group relative col-span-2 rounded-[22px] bg-white border border-[#EEE8F0] shadow-xs hover:shadow-md transition-all duration-300 p-3 sm:p-3.5 flex items-center gap-3.5 select-none active:scale-[0.99]"
      >
        {/* Left Thumbnail */}
        <div className="relative w-20 sm:w-24 aspect-[3/4] rounded-2xl overflow-hidden bg-[#21052F] shrink-0 border border-[#EEE8F0]">
          {!imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={series.thumbnail || series.poster || ''}
              alt={series.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#4B0B7A] to-[#21052F] text-white">
              <Play className="w-5 h-5 fill-current text-[#FFD52E]" />
            </div>
          )}

          {/* Rating Pill */}
          <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <Star className="w-2.5 h-2.5 text-[#FFD52E] fill-[#FFD52E]" />
            <span>{series.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-bold text-[#7028B8] bg-[#F6F1F8] px-2 py-0.5 rounded-full">
                {series.genres[0]}
              </span>
              <span className="text-[11px] text-[#786F7D] font-medium">
                {series.videoCount || series.episodeCount} Video
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-extrabold text-[#24172B] line-clamp-1 group-hover:text-[#7028B8] transition-colors leading-snug">
              {series.title}
            </h4>

            <p className="text-xs text-[#786F7D] line-clamp-2 mt-1 leading-relaxed">
              {series.synopsis}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#F6F1F8] mt-2">
            <span className="text-[11px] font-semibold text-[#21865B]">
              2 Video Gratis
            </span>

            <span className="text-xs font-bold text-[#7028B8] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              <span>Nonton</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // 3. PORTRAIT BENTO CARD (Full-bleed edge-to-edge thumbnail tile)
  return (
    <Link
      href={`/series/${series.slug}`}
      className="group relative col-span-1 rounded-[22px] overflow-hidden aspect-[3/4] bg-[#21052F] border border-[#EEE8F0] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between p-3 select-none active:scale-[0.98]"
    >
      {/* Background Thumbnail Image */}
      {!imageError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={series.thumbnail || series.poster || ''}
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

      {/* Ambient Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

      {/* Top Badges */}
      <div className="relative z-10 flex items-center justify-between w-full">
        {series.isNew ? (
          <span className="bg-[#FFD52E] text-[#21052F] text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
            BARU
          </span>
        ) : (
          <span className="bg-[#21865B] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-xs">
            GRATIS
          </span>
        )}

        <div className="bg-black/50 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 border border-white/10">
          <Star className="w-2.5 h-2.5 text-[#FFD52E] fill-[#FFD52E]" />
          <span>{series.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Bottom Content Info */}
      <div className="relative z-10 mt-auto flex flex-col">
        <span className="text-[10px] font-bold text-[#FFD52E] uppercase tracking-wider leading-none mb-1">
          {series.genres[0]}
        </span>

        <h4 className="text-xs sm:text-[13px] font-black text-white line-clamp-1 leading-snug group-hover:text-[#FFD52E] transition-colors">
          {series.title}
        </h4>

        <span className="text-[10px] text-white/70 font-medium mt-0.5">
          {series.videoCount || series.episodeCount} Video
        </span>
      </div>
    </Link>
  );
}
