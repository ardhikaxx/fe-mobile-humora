'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Play, CheckCircle2, Heart } from 'lucide-react';
import { Episode, Series } from '../../lib/types';
import { useHumora } from '../../lib/context/HumoraContext';
import { formatLikes } from '../../lib/utils/formatters';

interface EpisodeCardProps {
  series: Series;
  episode: Episode;
  isCurrent?: boolean;
}

export function EpisodeCard({ series, episode, isCurrent = false }: EpisodeCardProps) {
  const router = useRouter();
  const { canAccessEpisode, openSubscriptionSheet, history } = useHumora();

  const access = canAccessEpisode(episode);
  const isLocked = !access.allowed;

  // Find progress in history if any
  const historyItem = history.find(
    (h) => h.seriesSlug === series.slug && h.episodeId === episode.id
  );

  const handleClick = () => {
    if (isLocked) {
      openSubscriptionSheet({
        seriesSlug: series.slug,
        episodeNumber: episode.number,
        reason: access.reason === 'expired' ? 'Langgananmu telah kedaluwarsa.' : undefined,
      });
      return;
    }

    router.push(`/watch/${series.slug}/${episode.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className={`group flex items-start gap-3 p-3 rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
        isCurrent
          ? 'bg-[#F6F1F8] border-[#7028B8] ring-1 ring-[#7028B8]/30 shadow-xs'
          : 'bg-white border-[#EEE8F0] hover:border-[#D8D0DE] hover:shadow-xs'
      }`}
    >
      {/* Thumbnail Container (16:9) */}
      <div className="relative aspect-16/9 w-28 sm:w-32 rounded-xl overflow-hidden shrink-0 bg-[#21052F]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={episode.thumbnail}
          alt={episode.title}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            isLocked ? 'filter brightness-65 saturate-70' : ''
          }`}
          loading="lazy"
        />

        {/* Lock Overlay or Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isLocked ? (
            <div className="w-8 h-8 rounded-full bg-[#21052F]/85 border border-[#FFD52E]/50 flex items-center justify-center text-[#FFD52E] shadow-sm">
              <Lock className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#FFD52E] text-[#21052F] flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-sm">
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            </div>
          )}
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[10px] font-semibold text-white">
          {episode.duration}
        </div>

        {/* Completed Checkmark */}
        {historyItem?.completed && (
          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#21865B] text-white flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-3 h-3" />
          </div>
        )}

        {/* Progress bar if partially watched */}
        {historyItem && !historyItem.completed && historyItem.percent > 0 && (
          <div className="absolute bottom-0 inset-x-0 h-1 bg-white/30">
            <div
              className="h-full bg-[#FFD52E]"
              style={{ width: `${historyItem.percent}%` }}
            />
          </div>
        )}
      </div>

      {/* Episode Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#7028B8]">
                Video {episode.number}
              </span>
              {episode.likesCount !== undefined && (
                <span className="text-[10px] font-bold text-[#D94152] flex items-center gap-0.5">
                  <Heart className="w-2.5 h-2.5 fill-[#D94152]" />
                  <span>{formatLikes(episode.likesCount)}</span>
                </span>
              )}
            </div>

            {/* Access Badges */}
            {episode.accessType === 'free' ? (
              <span className="bg-[#EAF8F1] text-[#21865B] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#21865B]/20">
                GRATIS
              </span>
            ) : isLocked ? (
              <span className="bg-[#FFF9E0] text-[#7028B8] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#FFD52E] flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-[#4B0B7A]" />
                PREMIUM
              </span>
            ) : (
              <span className="bg-[#F6F1F8] text-[#7028B8] text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-[#7028B8]/30">
                TERBUKA
              </span>
            )}
          </div>

          <h4
            className={`text-xs sm:text-sm font-bold line-clamp-1 leading-snug group-hover:text-[#7028B8] transition-colors ${
              isCurrent ? 'text-[#7028B8]' : 'text-[#24172B]'
            }`}
          >
            {episode.title}
          </h4>

          <p className="text-[11px] sm:text-xs text-[#786F7D] line-clamp-2 mt-1 leading-relaxed">
            {episode.description}
          </p>
        </div>
      </div>
    </div>
  );
}
