'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  CheckCircle2,
  Crown,
  Play,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useHumora } from '../../../lib/context/HumoraContext';
import { formatDateIndo } from '../../../lib/utils/formatters';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const {
    subscription,
    activeEpisodeTarget,
    setActiveEpisodeTarget,
  } = useHumora();

  const handleStartWatching = () => {
    if (activeEpisodeTarget) {
      const { seriesSlug, episodeId } = activeEpisodeTarget;
      setActiveEpisodeTarget(null);
      router.push(`/watch/${seriesSlug}/${episodeId}`);
    } else {
      router.push('/home');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] p-6 justify-between text-center select-none animate-fade-in">
      <div className="my-auto flex flex-col items-center max-w-sm mx-auto">
        {/* Celebratory Icon with Confetti Vibes */}
        <div className="relative mb-5">
          <div className="w-20 h-20 rounded-3xl bg-[#EAF8F1] text-[#21865B] flex items-center justify-center shadow-lg shadow-[#21865B]/15 border-2 border-[#21865B]/20">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#FFD52E] flex items-center justify-center text-[#21052F] shadow-sm animate-bounce">
            <Crown className="w-4 h-4 fill-current" />
          </div>
        </div>

        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#21865B] bg-[#EAF8F1] px-3 py-1 rounded-full mb-1.5">
          Pembayaran Simulasi Berhasil
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-[#24172B] tracking-tight">
          Premium Sudah Aktif!
        </h2>

        <p className="text-xs sm:text-sm text-[#786F7D] mt-1.5 max-w-xs leading-relaxed">
          Semua episode terkunci kini telah terbuka! Nikmati serial komedi dan romansa favoritmu tanpa batas.
        </p>

        {/* Transaction Summary Card */}
        <div className="w-full mt-6 bg-white rounded-2xl p-4 border border-[#EEE8F0] shadow-xs text-left space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-[#EEE8F0]">
            <span className="text-xs text-[#786F7D]">Paket Langganan</span>
            <span className="text-xs font-bold text-[#4B0B7A]">
              {subscription.planName}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#786F7D] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Mulai Aktif
            </span>
            <span className="font-semibold text-[#24172B]">
              {formatDateIndo(subscription.startDate)}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-[#786F7D] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Berlaku Sampai
            </span>
            <span className="font-bold text-[#21865B]">
              {formatDateIndo(subscription.endDate)}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pt-1 border-t border-[#EEE8F0]">
            <span className="text-[#786F7D]">Status Akses</span>
            <span className="font-bold text-[#7028B8] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FFD52E]" />
              SEMUA EPISODE TERBUKA
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full max-w-sm mx-auto space-y-2.5 pt-4">
        <button
          onClick={handleStartWatching}
          className="w-full py-4 px-6 rounded-2xl bg-[#4B0B7A] hover:bg-[#38065C] active:scale-98 text-white font-bold text-sm sm:text-base shadow-lg shadow-[#4B0B7A]/20 flex items-center justify-center gap-2 transition-all"
        >
          {activeEpisodeTarget ? (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Lanjut Nonton Episode {activeEpisodeTarget.episodeId}</span>
            </>
          ) : (
            <>
              <span>Mulai Menonton Sekarang</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <button
          onClick={() => router.push('/home')}
          className="w-full py-2.5 text-xs font-bold text-[#786F7D] hover:text-[#24172B] transition-colors"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}
