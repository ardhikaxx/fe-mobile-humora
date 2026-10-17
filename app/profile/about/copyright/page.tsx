'use client';

import React from 'react';
import {
  ShieldAlert,
  Film,
  Music,
  Award,
  Sparkles,
  Clock,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';
import Link from 'next/link';
import { AppHeader } from '../../../../components/layout/AppHeader';

export default function CopyrightPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-24">
      {/* Header Bar */}
      <AppHeader title="Hak Cipta & Lisensi" showBack />

      <div className="px-5 pt-3 space-y-4">
        {/* Intro Card */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs">
          <div className="flex items-center gap-2.5 text-[#7028B8] mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-[11px] font-bold">Terakhir Diperbarui: 15 Januari 2026</span>
          </div>
          <h2 className="text-base font-extrabold text-[#24172B] tracking-tight">
            Perlindungan Hak Cipta & Lisensi Konten
          </h2>
          <p className="text-xs text-[#786F7D] mt-1.5 leading-relaxed">
            Seluruh materi visual, audio, naskah komedi, dan merek dagang di dalam platform HUMORA dilindungi oleh Undang-Undang Republik Indonesia No. 28 Tahun 2014 tentang Hak Cipta serta perjanjian lisensi internasional.
          </p>
        </div>

        {/* Section 1: Merek Dagang & Maskot */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-[#E58A16]">
            <div className="w-8 h-8 rounded-xl bg-[#FFF9E0] flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#24172B]">1. Merek Dagang & Identitas Brand</h3>
          </div>
          <ul className="text-xs text-[#786F7D] space-y-2 list-disc pl-5 leading-relaxed">
            <li>Nama <strong className="text-[#24172B]">HUMORA</strong>, logo komersial, slogan <em>&ldquo;Scroll. laugh. repeat.&rdquo;</em>, dan karakter maskot <strong>Si Humo</strong> (The Laughing Play Button) adalah hak milik eksklusif PT Humora Digital Kreatif Indonesia.</li>
            <li>Dilarang keras menyalin, meniru, atau menggunakan aset visual HUMORA untuk keperluan promosi komersial pihak ketiga tanpa izin resmi tertulis.</li>
          </ul>
        </div>

        {/* Section 2: Konten Video & Kreator */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-[#21865B]">
            <div className="w-8 h-8 rounded-xl bg-[#EAF8F1] flex items-center justify-center shrink-0">
              <Film className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#24172B]">2. Karya Orisinal & Lisensi Kreator</h3>
          </div>
          <ul className="text-xs text-[#786F7D] space-y-2 list-disc pl-5 leading-relaxed">
            <li>100% video seri sketsa komedi yang tayang di HUMORA diproduksi secara orisinal oleh studio internal atau berlisensi resmi dari kreator independen Indonesia.</li>
            <li>Para kreator menerima royalti dan bagi hasil resmi yang adil dari setiap tontonan dan langganan paket VIP.</li>
            <li>Pengguna diberikan lisensi terbatas, non-eksklusif, dan tidak dapat dipindahtangankan hanya untuk menonton secara personal melalui aplikasi.</li>
          </ul>
        </div>

        {/* Section 3: Musik & Efek Suara */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-[#7028B8]">
            <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center shrink-0">
              <Music className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#24172B]">3. Musik Latar & Efek Suara</h3>
          </div>
          <ul className="text-xs text-[#786F7D] space-y-2 list-disc pl-5 leading-relaxed">
            <li>Seluruh musik latar belakang, jingle, dan efek suara (sound effects) yang menyertai video telah memiliki lisensi sinkronisasi komersial resmi.</li>
            <li>Pengguna dilarang mengekstrak track audio untuk digunakan kembali di luar aplikasi HUMORA.</li>
          </ul>
        </div>

        {/* Section 4: Larangan Pembajakan */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-[#D94152]">
            <div className="w-8 h-8 rounded-xl bg-[#FDF2F2] flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#24172B]">4. Penegakan Anti-Pembajakan</h3>
          </div>
          <p className="text-xs text-[#786F7D] leading-relaxed">
            HUMORA menerapkan sistem proteksi digital (DRM) untuk mencegah pembajakan konten. Setiap tindakan pengunduhan tanpa hak, perekaman layar, dan pendistribusian ulang merupakan pelanggaran hukum berat yang dapat diproses secara perdata maupun pidana.
          </p>
        </div>

        {/* Section 5: Pelaporan & Kontak Hak Cipta */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-[#4B0B7A]">
            <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center shrink-0">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#24172B]">5. Saluran Pelaporan Pelanggaran</h3>
          </div>
          <p className="text-xs text-[#786F7D] leading-relaxed">
            Jika Anda adalah pemegang hak cipta yang meyakini ada konten di HUMORA yang melanggar hak kekayaan intelektual Anda, silakan ajukan laporan pemberitahuan ke <span className="font-semibold text-[#24172B]">legal@humora.id</span> dengan menyertakan bukti kepemilikan yang sah.
          </p>
        </div>
      </div>
    </div>
  );
}
