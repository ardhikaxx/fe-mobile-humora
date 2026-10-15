'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Play,
  Trash2,
  Clock,
  CheckCircle2,
  Lock,
  Sparkles,
} from 'lucide-react';
import { AppHeader } from '../../components/layout/AppHeader';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { useHumora } from '../../lib/context/HumoraContext';
import { SERIES_LIST } from '../../lib/data/seriesData';
import { formatDateIndo } from '../../lib/utils/formatters';
import { WatchHistoryItem } from '../../lib/types';

export default function HistoryPage() {
  const router = useRouter();
  const {
    history,
    deleteHistoryItem,
    clearHistory,
    canAccessEpisode,
    openSubscriptionSheet,
  } = useHumora();

  const [activeTab, setActiveTab] = useState<'continue' | 'completed'>('continue');
  const [itemToDelete, setItemToDelete] = useState<WatchHistoryItem | null>(null);
  const [isClearAllModalOpen, setIsClearAllModalOpen] = useState(false);

  const continueItems = history.filter((h) => !h.completed);
  const completedItems = history.filter((h) => h.completed);

  const displayedItems = activeTab === 'continue' ? continueItems : completedItems;

  const handleItemClick = (item: WatchHistoryItem) => {
    const series = SERIES_LIST.find((s) => s.slug === item.seriesSlug);
    const episode = series?.episodes.find((e) => e.id === item.episodeId);

    if (episode) {
      const access = canAccessEpisode(episode);
      if (!access.allowed) {
        openSubscriptionSheet({
          seriesSlug: item.seriesSlug,
          episodeNumber: item.episodeNumber,
          reason: access.reason === 'expired' ? 'Langgananmu telah kedaluwarsa.' : undefined,
        });
        return;
      }
    }

    router.push(`/watch/${item.seriesSlug}/${item.episodeId}`);
  };

  const confirmDeleteSingle = () => {
    if (itemToDelete) {
      deleteHistoryItem(itemToDelete.seriesSlug, itemToDelete.episodeId);
      setItemToDelete(null);
    }
  };

  const confirmClearAll = () => {
    clearHistory();
    setIsClearAllModalOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-12">
      <AppHeader
        title="Riwayat Tontonan"
        rightAction={
          history.length > 0 ? (
            <button
              onClick={() => setIsClearAllModalOpen(true)}
              className="text-xs font-semibold text-red-600 hover:text-red-700 p-1"
            >
              Hapus Semua
            </button>
          ) : undefined
        }
      />

      <div className="px-5 pt-3">
        {/* Segmented Tab Controls: Lanjutkan vs Selesai */}
        <div className="grid grid-cols-2 p-1 bg-[#F6F1F8] rounded-2xl mb-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('continue')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'continue'
                ? 'bg-white text-[#4B0B7A] shadow-xs'
                : 'text-[#786F7D] hover:text-[#24172B]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Lanjutkan ({continueItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'completed'
                ? 'bg-white text-[#4B0B7A] shadow-xs'
                : 'text-[#786F7D] hover:text-[#24172B]'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Selesai ({completedItems.length})</span>
          </button>
        </div>

        {/* History List or Empty State */}
        {displayedItems.length > 0 ? (
          <div className="space-y-3">
            {displayedItems.map((item) => {
              const series = SERIES_LIST.find((s) => s.slug === item.seriesSlug);
              const episode = series?.episodes.find((e) => e.id === item.episodeId);
              const access = episode ? canAccessEpisode(episode) : { allowed: true };
              const isLocked = !access.allowed;

              return (
                <div
                  key={`${item.seriesSlug}-${item.episodeId}`}
                  className="bg-white rounded-2xl p-3 border border-[#EEE8F0] shadow-xs hover:border-[#D8D0DE] transition-all flex items-center gap-3 select-none"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => handleItemClick(item)}
                    className="relative aspect-16/9 w-28 sm:w-32 rounded-xl overflow-hidden bg-[#21052F] shrink-0 cursor-pointer group"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.seriesPoster}
                      alt={item.episodeTitle}
                      className={`w-full h-full object-cover transition-transform group-hover:scale-105 ${
                        isLocked ? 'filter brightness-65' : ''
                      }`}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      {isLocked ? (
                        <div className="w-7 h-7 rounded-full bg-black/70 flex items-center justify-center text-[#FFD52E]">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-[#FFD52E] text-[#21052F] flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      )}
                    </div>

                    {/* Progress bar at bottom */}
                    <div className="absolute bottom-0 inset-x-0 h-1 bg-white/30">
                      <div
                        className="h-full bg-[#FFD52E]"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Info details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#7028B8]">
                        Ep {item.episodeNumber}
                      </span>
                      <span className="text-[10px] text-[#A39CA9]">
                        {formatDateIndo(item.lastWatchedAt)}
                      </span>
                    </div>

                    <h4
                      onClick={() => handleItemClick(item)}
                      className="text-xs sm:text-sm font-bold text-[#24172B] truncate cursor-pointer hover:text-[#7028B8] transition-colors"
                    >
                      {item.seriesTitle}
                    </h4>

                    <p className="text-[11px] text-[#786F7D] truncate mt-0.5">
                      {item.episodeTitle}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] font-semibold text-[#786F7D]">
                        Progres: {item.percent}%
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setItemToDelete(item);
                        }}
                        className="p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="Hapus dari riwayat"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 mt-8">
            <div className="w-16 h-16 rounded-3xl bg-[#F6F1F8] text-[#7028B8] flex items-center justify-center mb-3">
              <Clock className="w-8 h-8" />
            </div>

            <h3 className="text-base font-bold text-[#24172B]">
              {activeTab === 'continue'
                ? 'Belum ada tontonan yang sedang berjalan'
                : 'Belum ada episode yang selesai ditonton'}
            </h3>

            <p className="text-xs text-[#786F7D] mt-1 max-w-xs leading-relaxed">
              Mulai tonton serial seru HUMORA, dan riwayat tontonanmu akan otomatis tersimpan di sini.
            </p>

            <Link
              href="/home"
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#4B0B7A] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD52E]" />
              <span>Jelajahi Series Sekarang</span>
            </Link>
          </div>
        )}
      </div>

      {/* Delete Single Item Modal */}
      <ConfirmationModal
        isOpen={!!itemToDelete}
        title="Hapus dari Riwayat?"
        description={`Episode "${itemToDelete?.episodeTitle}" dari ${itemToDelete?.seriesTitle} akan dihapus dari daftar riwayat tontonanmu.`}
        confirmLabel="Hapus"
        cancelLabel="Batal"
        isDestructive
        onConfirm={confirmDeleteSingle}
        onCancel={() => setItemToDelete(null)}
      />

      {/* Clear All Modal */}
      <ConfirmationModal
        isOpen={isClearAllModalOpen}
        title="Bersihkan Seluruh Riwayat?"
        description="Semua riwayat dan progres tontonan akan dihapus secara permanen dari perangkat ini."
        confirmLabel="Hapus Semua"
        cancelLabel="Batal"
        isDestructive
        onConfirm={confirmClearAll}
        onCancel={() => setIsClearAllModalOpen(false)}
      />
    </div>
  );
}
