'use client';

import React from 'react';
import {
  Film,
  Heart,
  ShieldCheck,
  Zap,
  ChevronRight,
} from 'lucide-react';
import { AppHeader } from '../../../components/layout/AppHeader';
import { HumoraLogo } from '../../../components/brand/HumoraLogo';
import { useHumora } from '../../../lib/context/HumoraContext';

export default function AboutPage() {
  const { showToast } = useHumora();

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-24">
      {/* Header Bar */}
      <AppHeader title="Tentang HUMORA" showBack />

      <div className="px-5 pt-3 space-y-5">
        {/* BRAND HERO CARD */}
        <div className="p-6 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs flex flex-col items-center text-center">
          <div className="mb-3">
            <HumoraLogo type="full" size="lg" className="rounded-2xl overflow-hidden shadow-xs border border-[#21052F]/10" />
          </div>

          <span className="inline-block bg-[#FFF9E0] text-[#7028B8] border border-[#FFD52E] text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider mb-2">
            Versi 1.0.0
          </span>

          <p className="text-xs text-[#7028B8] font-bold tracking-wide italic">
            &ldquo;Scroll. laugh. repeat.&rdquo;
          </p>

          <p className="text-xs text-[#786F7D] mt-3 leading-relaxed max-w-xs">
            HUMORA adalah platform streaming digital karya anak bangsa yang didedikasikan untuk menghadirkan video sketsa komedi pendek berkualitas tinggi, dekat dengan keseharian, dan siap menghibur di sela-sela rutinitasmu.
          </p>
        </div>

        {/* MASCOT INTRO CARD */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-[#FFFDF2] to-[#FFF6CD] border border-[#FFD52E]/40 shadow-xs flex items-center gap-4">
          <HumoraLogo type="icon" size="md" className="rounded-2xl overflow-hidden shadow-xs border border-[#21052F]/10 shrink-0" />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#E58A16]">Maskot Resmi</span>
            <h3 className="text-xs font-black text-[#21052F] tracking-tight">Si Humo — The Laughing Play Button</h3>
            <p className="text-[11px] text-[#786F7D] mt-0.5 leading-snug">Simbol keceriaan dan tawa instan di setiap klik tombol putar.</p>
          </div>
        </div>

        {/* METRICS & STATS */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="bg-white p-3.5 rounded-2xl border border-[#EEE8F0] text-center shadow-xs">
            <span className="text-lg font-black text-[#4B0B7A] block">6+</span>
            <span className="text-[10px] font-semibold text-[#786F7D]">Koleksi Video</span>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-[#EEE8F0] text-center shadow-xs">
            <span className="text-lg font-black text-[#E58A16] block">24+</span>
            <span className="text-[10px] font-semibold text-[#786F7D]">Video Tayang</span>
          </div>
          <div className="bg-white p-3.5 rounded-2xl border border-[#EEE8F0] text-center shadow-xs">
            <span className="text-lg font-black text-[#21865B] block">100%</span>
            <span className="text-[10px] font-semibold text-[#786F7D]">Karya Kreator RI</span>
          </div>
        </div>

        {/* CORE VALUES / KEUNGGULAN */}
        <div className="bg-white rounded-3xl p-5 border border-[#EEE8F0] shadow-xs">
          <h2 className="text-sm font-bold text-[#24172B] mb-3">
            Mengapa Memilih HUMORA?
          </h2>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FFF9E0] text-[#E58A16] flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#24172B] block">Format Cepat & Ringkas</span>
                <p className="text-[11px] text-[#786F7D] mt-0.5 leading-relaxed">
                  Durasi -+2 menit per video dirancang pas untuk dinikmati saat rehat kerja, perjalanan komuter, atau waktu santai.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] text-[#7028B8] flex items-center justify-center shrink-0 mt-0.5">
                <Film className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#24172B] block">Cerita Dekat & Relatable</span>
                <p className="text-[11px] text-[#786F7D] mt-0.5 leading-relaxed">
                  Dari drama kos-kosan, romansa kantor, hingga lika-liku kehidupan sehari-hari khas Indonesia yang mengocok perut.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#EAF8F1] text-[#21865B] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#24172B] block">Bebas Iklan Pop-up</span>
                <p className="text-[11px] text-[#786F7D] mt-0.5 leading-relaxed">
                  Streaming tanpa interupsi banner iklan yang mengganggu agar fokus menikmati gelak tawa dari awal sampai tamat.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LEGAL & POLICIES */}
        <div className="bg-white rounded-3xl p-2 border border-[#EEE8F0] shadow-xs divide-y divide-[#EEE8F0]">
          <button
            type="button"
            onClick={() => showToast('Syarat & Ketentuan: Seluruh konten dilindungi hak cipta HUMORA.')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#F6F1F8] rounded-2xl transition-colors text-left"
          >
            <span className="text-xs font-bold text-[#24172B]">Syarat & Ketentuan Layanan</span>
            <ChevronRight className="w-4 h-4 text-[#A39CA9]" />
          </button>

          <button
            type="button"
            onClick={() => showToast('Kebijakan Privasi: Data akun dan riwayat lokal tersimpan aman.')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#F6F1F8] rounded-2xl transition-colors text-left"
          >
            <span className="text-xs font-bold text-[#24172B]">Kebijakan Privasi</span>
            <ChevronRight className="w-4 h-4 text-[#A39CA9]" />
          </button>

          <button
            type="button"
            onClick={() => showToast('Lisensi: Semua video dan audio berlisensi resmi orisinal.')}
            className="w-full flex items-center justify-between p-3.5 hover:bg-[#F6F1F8] rounded-2xl transition-colors text-left"
          >
            <span className="text-xs font-bold text-[#24172B]">Hak Cipta & Lisensi Konten</span>
            <ChevronRight className="w-4 h-4 text-[#A39CA9]" />
          </button>
        </div>

        {/* FOOTER INFO */}
        <div className="text-center pt-2 pb-4 text-[11px] text-[#A39CA9] flex flex-col items-center gap-1">
          <p>© 2026 PT Humora Digital Kreatif Indonesia.</p>
          <p className="flex items-center gap-1 text-[10px]">
            Dibuat dengan <Heart className="w-3 h-3 text-[#D94152] fill-current" /> untuk hiburan Indonesia
          </p>
        </div>
      </div>
    </div>
  );
}
