'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, Play, Sparkles, Flame, Crown, ChevronRight } from 'lucide-react';
import { Series } from '../../lib/types';

export type BentoCardVariant = 'hero' | 'horizontal' | 'portrait';

interface BentoSeriesCardProps {
  series: Series;
  variant: BentoCardVariant;
}

export function BentoSeriesCard({ series, variant }: BentoSeriesCardProps) {
  const [imageError, setImageError] = useState(false);

  // 1. HERO BENTO CARD (Cinematic full-width banner)
  if (variant === 'hero') {
    const bgImage = !imageError ? (series.cover || series.poster) : null;

    return (
      <Link
        href={`/series/${series.slug}`}
        className="group relative col-span-2 rounded-3xl overflow-hidden bg-[#21052F] border border-[#EEE8F0] shadow-sm hover:shadow-md transition-all duration-300 min-h-[230px] sm:min-h-[260px] flex flex-col justify-between p-4 sm:p-5 select-none active:scale-[0.99]"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#14021D] via-[#14021D]/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14021D]/80 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges Row */}
        <div className="relative z-10 flex items-center justify-between w-full">
          <div className="flex items-center gap-1.5 flex-wrap">
            {series.isPopular ? (
              <span className="bg-[#FFD52E] text-[#21052F] text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Flame className="w-3 h-3 fill-current text-[#E58A16]" />
                POPULER
              </span>
            ) : series.isNew ? (
              <span className="bg-[#FFD52E] text-[#21052F] text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Sparkles className="w-3 h-3" />
                BARU
              </span>
            ) : (
              <span className="bg-[#FFD52E] text-[#21052F] text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <Crown className="w-3 h-3 fill-current" />
                SOROTAN
              </span>
            )}

            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-white/20">
              2 EP GRATIS
            </span>
          </div>

          <div className="bg-black/50 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/15">
            <Star className="w-3 h-3 text-[#FFD52E] fill-[#FFD52E]" />
            <span>{series.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Bottom Hero Info */}
        <div className="relative z-10 mt-auto pt-8 flex flex-col">
          <div className="flex items-center gap-1.5 mb-1.5">
            {series.genres.slice(0, 2).map((genre) => (
              <span
                key={genre}
                className="text-[10px] font-semibold text-white/80 bg-white/15 backdrop-blur-xs px-2 py-0.5 rounded-md"
              >
                {genre}
              </span>
            ))}
          </div>

          <h3 className="text-base sm:text-xl font-black text-white tracking-tight line-clamp-1 group-hover:text-[#FFD52E] transition-colors">
            {series.title}
          </h3>

          <p className="text-xs text-white/80 line-clamp-2 mt-1 leading-relaxed max-w-md">
            {series.synopsis}
          </p>

          <div className="mt-3 flex items-center justify-between border-t border-white/15 pt-2.5">
            <span className="text-[11px] font-medium text-white/70">
              {series.episodeCount} Episode • {series.year}
            </span>

            <span className="bg-[#FFD52E] group-hover:bg-white text-[#21052F] px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 shadow-xs transition-all">
              <Play className="w-3 h-3 fill-current" />
              <span>Nonton</span>
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // 2. HORIZONTAL BENTO CARD (Split poster & summary banner)
  if (variant === 'horizontal') {
    return (
      <Link
        href={`/series/${series.slug}`}
        className="group relative col-span-2 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs hover:shadow-md transition-all duration-300 p-3 sm:p-3.5 flex gap-3 sm:gap-4 select-none active:scale-[0.99]"
      >
        {/* Left Poster Thumbnail */}
        <div className="relative w-24 sm:w-28 aspect-3/4 rounded-2xl overflow-hidden bg-[#21052F] shrink-0 border border-[#EEE8F0]">
          {!imageError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={series.poster}
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

          {/* Rating Badge on Thumbnail */}
          <div className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <Star className="w-2.5 h-2.5 text-[#FFD52E] fill-[#FFD52E]" />
            <span>{series.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap mb-1">
              <span className="text-[10px] font-bold text-[#7028B8] bg-[#F6F1F8] px-2 py-0.5 rounded-md">
                {series.genres[0]}
              </span>
              {series.isNew && (
                <span className="text-[10px] font-bold text-[#E58A16] bg-[#FFF9E0] px-1.5 py-0.5 rounded-md">
                  Baru
                </span>
              )}
            </div>

            <h4 className="text-sm sm:text-base font-bold text-[#24172B] line-clamp-1 group-hover:text-[#7028B8] transition-colors leading-snug">
              {series.title}
            </h4>

            <p className="text-xs text-[#786F7D] line-clamp-2 mt-1 leading-relaxed">
              {series.synopsis}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#F6F1F8] mt-2">
            <span className="text-[11px] font-semibold text-[#786F7D]">
              {series.episodeCount} Episode
            </span>

            <span className="text-xs font-bold text-[#7028B8] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              <span>Detail</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  // 3. PORTRAIT BENTO CARD (Compact card for 1 column)
  return (
    <Link
      href={`/series/${series.slug}`}
      className="group relative col-span-1 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs hover:shadow-md transition-all duration-300 p-2.5 flex flex-col select-none active:scale-[0.98]"
    >
      {/* Poster with 3:4 aspect ratio */}
      <div className="relative aspect-3/4 w-full rounded-2xl overflow-hidden bg-[#21052F] border border-[#EEE8F0]">
        {!imageError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={series.poster}
            alt={series.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-b from-[#4B0B7A] to-[#21052F] text-center text-white">
            <Play className="w-5 h-5 fill-current text-[#FFD52E] mb-1" />
            <span className="text-xs font-bold line-clamp-2 leading-tight">
              {series.title}
            </span>
          </div>
        )}

        {/* Ambient Bottom Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex items-center gap-1">
          {series.isNew ? (
            <span className="bg-[#FFD52E] text-[#21052F] text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
              BARU
            </span>
          ) : (
            <span className="bg-[#21865B] text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-xs">
              GRATIS
            </span>
          )}
        </div>

        {/* Rating on Bottom Left */}
        <div className="absolute bottom-1.5 left-2 flex items-center gap-0.5 text-white text-[11px] font-bold">
          <Star className="w-3 h-3 text-[#FFD52E] fill-[#FFD52E]" />
          <span>{series.rating.toFixed(1)}</span>
        </div>

        {/* Episode Count on Bottom Right */}
        <div className="absolute bottom-1.5 right-2 text-[10px] font-semibold text-white/90 bg-black/40 backdrop-blur-xs px-1.5 py-0.5 rounded">
          {series.episodeCount} Ep
        </div>
      </div>

      {/* Series Title & Genre */}
      <div className="mt-2.5 px-1 pb-1 flex flex-col">
        <h4 className="text-xs sm:text-[13px] font-bold text-[#24172B] line-clamp-1 group-hover:text-[#7028B8] transition-colors leading-snug">
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
