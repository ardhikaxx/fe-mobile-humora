'use client';

import React from 'react';
import {
  FileText,
  ShieldCheck,
  UserCheck,
  CreditCard,
  AlertOctagon,
  Clock,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';
import { AppHeader } from '../../../../components/layout/AppHeader';

export default function TermsPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-24">
      {/* Header Bar */}
      <AppHeader title="Syarat & Ketentuan" showBack />

      <div className="px-5 pt-3 space-y-4">
        {/* Intro Card */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs">
          <div className="flex items-center gap-2.5 text-[#E58A16] mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-[11px] font-bold">Terakhir Diperbarui: 15 Januari 2026</span>
          </div>
          <h2 className="text-base font-extrabold text-[#24172B] tracking-tight">
            Ketentuan Layanan HUMORA
          </h2>
          <p className="text-xs text-[#786F7D] mt-1.5 leading-relaxed">
            Selamat datang di HUMORA. Syarat dan Ketentuan berikut mengatur penggunaan Anda atas aplikasi, platform streaming, dan seluruh konten video sketsa komedi pendek yang disediakan oleh PT Humora Digital Kreatif Indonesia.
          </p>
        </div>

        {/* Section 1: Akun & Registrasi */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-[#7028B8]">
            <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#24172B]">1. Akun & Pendaftaran Pengguna</h3>
          </div>
          <ul className="text-xs text-[#786F7D] space-y-2 list-disc pl-5 leading-relaxed">
            <li>Pengguna dapat menjelajahi video gratis dalam mode Tamu tanpa mendaftar.</li>
            <li>Untuk menyimpan riwayat tontonan, favorit, dan berlangganan paket VIP, pengguna diwajibkan mendaftarkan akun dengan email atau nomor telepon aktif.</li>
            <li>Pengguna bertanggung jawab penuh atas keamanan kredensial akun dan aktivitas apa pun yang terjadi di bawah akun tersebut.</li>
          </ul>
        </div>

        {/* Section 2: Akses Konten & Lisensi Pengguna */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-[#21865B]">
            <div className="w-8 h-8 rounded-xl bg-[#EAF8F1] flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#24172B]">2. Akses Konten & Hak Streaming</h3>
          </div>
          <ul className="text-xs text-[#786F7D] space-y-2 list-disc pl-5 leading-relaxed">
            <li>Seluruh video di HUMORA dilisensikan hanya untuk pemutaran pribadi non-komersial.</li>
            <li>Episode bertanda <strong className="text-[#24172B]">GRATIS</strong> dapat ditonton tanpa biaya oleh seluruh pengguna.</li>
            <li>Episode lanjutan bertanda <strong className="text-[#24172B]">VIP</strong> memerlukan langganan HUMORA Premium yang aktif untuk dapat diputar.</li>
            <li>HUMORA berhak menambah, memperbarui, atau merotasi katalog judul video sewaktu-waktu demi penyegaran konten hiburan.</li>
          </ul>
        </div>

        {/* Section 3: Larangan & Batasan Penggunaan */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-[#D94152]">
            <div className="w-8 h-8 rounded-xl bg-[#FDF2F2] flex items-center justify-center shrink-0">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#24172B]">3. Larangan Keras Penggunaan</h3>
          </div>
          <p className="text-xs text-[#786F7D] leading-relaxed">
            Pengguna dilarang keras melakukan hal-hal berikut:
          </p>
          <ul className="text-xs text-[#786F7D] space-y-2 list-disc pl-5 leading-relaxed">
            <li>Merekam layar (screen record), mengunduh secara ilegal (ripping), atau menduplikasi materi video.</li>
            <li>Mengunggah ulang (re-upload) klip utuh atau sebagian ke media sosial lain untuk kepentingan komersial tanpa izin tertulis.</li>
            <li>Merekayasa balik (reverse engineering) atau memanipulasi sistem pembayaran dan pembatasan akses episode.</li>
          </ul>
        </div>

        {/* Section 4: Langganan VIP & Pembayaran */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-[#E58A16]">
            <div className="w-8 h-8 rounded-xl bg-[#FFF9E0] flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#24172B]">4. Langganan VIP & Pembayaran</h3>
          </div>
          <ul className="text-xs text-[#786F7D] space-y-2 list-disc pl-5 leading-relaxed">
            <li>Pembayaran langganan diproses melalui gateway pembayaran resmi (QRIS, E-Wallet, dan Virtual Account).</li>
            <li>Langganan aktif memberikan akses tuntas ke seluruh episode terkunci selama periode paket yang dipilih.</li>
            <li>Biaya langganan yang sudah dibayarkan tidak dapat dikembalikan (non-refundable), kecuali terjadi kegagalan teknis sistem yang dapat diverifikasi oleh tim bantuan kami.</li>
          </ul>
        </div>

        {/* Section 5: Bantuan & Kontak */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-[#4B0B7A]">
            <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#24172B]">5. Kontak Bantuan & Pengaduan</h3>
          </div>
          <p className="text-xs text-[#786F7D] leading-relaxed">
            Jika memiliki pertanyaan terkait syarat dan ketentuan ini, hubungi kami melalui{' '}
            <Link href="/profile/help" className="text-[#7028B8] font-bold hover:underline">
              Pusat Bantuan
            </Link>{' '}
            atau email ke <span className="font-semibold text-[#24172B]">support@humora.id</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
