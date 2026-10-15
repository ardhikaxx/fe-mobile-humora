'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Crown, PlayCircle, Film, Sparkles, ArrowRight } from 'lucide-react';
import { useHumora } from '../../lib/context/HumoraContext';

export function SubscriptionBottomSheet() {
  const router = useRouter();
  const {
    isSubscriptionSheetOpen,
    subscriptionSheetContext,
    closeSubscriptionSheet,
    user,
    setPendingRedirectUrl,
    setActiveEpisodeTarget,
  } = useHumora();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSubscriptionSheetOpen) {
        closeSubscriptionSheet();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSubscriptionSheetOpen, closeSubscriptionSheet]);

  if (!isSubscriptionSheetOpen) return null;

  const handleGoToSubscription = () => {
    closeSubscriptionSheet();

    // If context has series and episode, save target
    if (subscriptionSheetContext?.seriesSlug && subscriptionSheetContext?.episodeNumber) {
      setActiveEpisodeTarget({
        seriesSlug: subscriptionSheetContext.seriesSlug,
        episodeId: subscriptionSheetContext.episodeNumber,
      });
    }

    if (!user) {
      // Save pending redirect to subscription page
      setPendingRedirectUrl('/subscription');
      router.push('/auth/login');
    } else {
      router.push('/subscription');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 backdrop-blur-xs transition-opacity animate-fade-in">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={closeSubscriptionSheet} />

      {/* Sheet Container */}
      <div
        className="relative w-full max-w-md bg-[#FFFDF7] rounded-t-[32px] p-6 shadow-2xl border-t border-[#EEE8F0] z-10 max-h-[92vh] overflow-y-auto no-scrollbar animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag / Touch Handle */}
        <div className="w-12 h-1.5 bg-[#D8D0DE] rounded-full mx-auto mb-4" />

        {/* Close Button */}
        <button
          onClick={closeSubscriptionSheet}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F6F1F8] flex items-center justify-center text-[#786F7D] hover:text-[#24172B] hover:bg-[#E9DEEF] transition-colors"
          aria-label="Tutup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Illustration & Crown */}
        <div className="flex flex-col items-center text-center mt-1">
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#4B0B7A] to-[#7028B8] flex items-center justify-center text-[#FFD52E] shadow-lg shadow-[#4B0B7A]/25">
              <Crown className="w-8 h-8" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#FFD52E] flex items-center justify-center text-[#21052F] shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#7028B8] bg-[#F6F1F8] px-3 py-1 rounded-full mb-1">
            Humora Premium
          </span>

          <h3 className="text-xl sm:text-2xl font-black text-[#24172B] tracking-tight mt-1">
            {subscriptionSheetContext?.reason
              ? 'Masa Langgananmu Telah Habis'
              : 'Ceritanya Belum Selesai!'}
          </h3>

          <p className="text-xs sm:text-sm text-[#786F7D] mt-1.5 max-w-xs leading-relaxed">
            {subscriptionSheetContext?.reason ||
              'Episode ini khusus member Premium. Buka semua episode dan lanjutkan tawa tanpa batas.'}
          </p>
        </div>

        {/* 3 Main Benefits */}
        <div className="mt-5 space-y-2.5 bg-white rounded-2xl p-4 border border-[#EEE8F0]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FFF9E0] text-[#4B0B7A] flex items-center justify-center shrink-0">
              <PlayCircle className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h5 className="text-xs font-bold text-[#24172B]">Akses Semua Episode</h5>
              <p className="text-[11px] text-[#786F7D]">Nonton episode 3 sampai tamat tanpa gembok</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FFF9E0] text-[#4B0B7A] flex items-center justify-center shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h5 className="text-xs font-bold text-[#24172B]">Tanpa Batas Semua Series</h5>
              <p className="text-[11px] text-[#786F7D]">Katalog lengkap serial komedi & romansa</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FFF9E0] text-[#4B0B7A] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-left">
              <h5 className="text-xs font-bold text-[#24172B]">Cerita Baru Tiap Minggu</h5>
              <p className="text-[11px] text-[#786F7D]">Nikmati episode terbaru lebih awal</p>
            </div>
          </div>
        </div>

        {/* Pricing Highlight Pill */}
        <div className="mt-4 flex items-center justify-between px-3 py-2 bg-[#F6F1F8] rounded-xl text-xs">
          <span className="text-[#786F7D] font-medium">Mulai dari</span>
          <div className="flex items-baseline gap-1">
            <span className="text-base font-black text-[#4B0B7A]">Rp19.000</span>
            <span className="text-[11px] text-[#786F7D]">/ 30 hari</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 space-y-2">
          <button
            onClick={handleGoToSubscription}
            className="w-full py-3.5 px-5 rounded-2xl bg-[#4B0B7A] hover:bg-[#38065C] text-white font-bold text-sm shadow-md shadow-[#4B0B7A]/20 flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <span>Lihat Paket Premium</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={closeSubscriptionSheet}
            className="w-full py-2.5 text-center text-xs font-semibold text-[#786F7D] hover:text-[#24172B] transition-colors"
          >
            Nanti saja, lanjut jelajahi
          </button>
        </div>
      </div>
    </div>
  );
}
