'use client';

import React from 'react';
import {
  ShieldCheck,
  Lock,
  Database,
  EyeOff,
  UserCheck,
  Clock,
  HelpCircle,
} from 'lucide-react';
import Link from 'next/link';
import { AppHeader } from '../../../../components/layout/AppHeader';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-24">
      {/* Header Bar */}
      <AppHeader title="Kebijakan Privasi" showBack />

      <div className="px-5 pt-3 space-y-4">
        {/* Intro Card */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs">
          <div className="flex items-center gap-2.5 text-[#21865B] mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-[11px] font-bold">Terakhir Diperbarui: 15 Januari 2026</span>
          </div>
          <h2 className="text-base font-extrabold text-[#24172B] tracking-tight">
            Komitmen Privasi HUMORA
          </h2>
          <p className="text-xs text-[#786F7D] mt-1.5 leading-relaxed">
            Privasi Anda adalah prioritas utama kami di HUMORA. Dokumen ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat menggunakan aplikasi streaming kami.
          </p>
        </div>

        {/* Section 1: Informasi yang Dikumpulkan */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-[#7028B8]">
            <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center shrink-0">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#24172B]">1. Informasi yang Kami Kumpulkan</h3>
          </div>
          <ul className="text-xs text-[#786F7D] space-y-2 list-disc pl-5 leading-relaxed">
            <li><strong className="text-[#24172B]">Data Akun:</strong> Nama lengkap, alamat email, nomor telepon, dan preferensi profil saat mendaftar.</li>
            <li><strong className="text-[#24172B]">Aktivitas Streaming:</strong> Riwayat episode yang ditonton, durasi tontonan, judul favorit, dan interaksi suka (like).</li>
            <li><strong className="text-[#24172B]">Informasi Transaksi:</strong> Riwayat pembelian paket VIP (kami tidak menyimpan detail kartu kredit/PIN rahasia perbankan Anda).</li>
            <li><strong className="text-[#24172B]">Data Perangkat:</strong> Jenis perangkat, sistem operasi, resolusi layar, dan alamat IP untuk optimasi resolusi video.</li>
          </ul>
        </div>

        {/* Section 2: Pemanfaatan Data */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-[#21865B]">
            <div className="w-8 h-8 rounded-xl bg-[#EAF8F1] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#24172B]">2. Penggunaan Informasi</h3>
          </div>
          <p className="text-xs text-[#786F7D] leading-relaxed">
            Data Anda kami gunakan semata-mata untuk:
          </p>
          <ul className="text-xs text-[#786F7D] space-y-2 list-disc pl-5 leading-relaxed">
            <li>Menyajikan pemutaran video yang lancar dan melanjutkan episode dari detik terakhir yang ditonton.</li>
            <li>Memvalidasi status langganan VIP dan membuka akses episode premium.</li>
            <li>Mengirimkan notifikasi rilis episode terbaru dari kreator sketsa komedi favorit Anda.</li>
            <li>Mendeteksi serta mencegah aktivitas penyalahgunaan akun atau kecurangan sistem.</li>
          </ul>
        </div>

        {/* Section 3: Perlindungan & Keamanan Data */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-[#E58A16]">
            <div className="w-8 h-8 rounded-xl bg-[#FFF9E0] flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#24172B]">3. Keamanan & Kerahasiaan Data</h3>
          </div>
          <ul className="text-xs text-[#786F7D] space-y-2 list-disc pl-5 leading-relaxed">
            <li>Kami menerapkan standar enkripsi SSL/TLS tingkat industri untuk melindungi lalu lintas data.</li>
            <li><strong className="text-[#24172B]">Tidak Dijual:</strong> HUMORA menjamin tidak akan pernah menjual, menyewakan, atau memperdagangkan data pribadi pengguna kepada pihak ketiga mana pun.</li>
            <li>Data riwayat lokal disimpan secara aman di browser/perangkat Anda dan dapat dihapus kapan saja melalui menu Profil.</li>
          </ul>
        </div>

        {/* Section 4: Hak Pengguna */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-[#4B0B7A]">
            <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center shrink-0">
              <UserCheck className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#24172B]">4. Hak Kendali Pengguna</h3>
          </div>
          <ul className="text-xs text-[#786F7D] space-y-2 list-disc pl-5 leading-relaxed">
            <li>Mengubah data profil (nama, email, nomor HP) melalui halaman Edit Profil.</li>
            <li>Menghapus riwayat tontonan lokal sewaktu-waktu melalui menu Riwayat Tontonan.</li>
            <li>Mengatur izin notifikasi aplikasi melalui menu Pengaturan Akun.</li>
          </ul>
        </div>

        {/* Section 5: Bantuan & Kontak */}
        <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs space-y-2.5">
          <div className="flex items-center gap-2.5 text-[#7028B8]">
            <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-[#24172B]">5. Pertanyaan Privasi</h3>
          </div>
          <p className="text-xs text-[#786F7D] leading-relaxed">
            Untuk pertanyaan atau permohonan terkait data pribadi Anda, hubungi Petugas Perlindungan Data kami melalui email <span className="font-semibold text-[#24172B]">privacy@humora.id</span> atau kunjungi{' '}
            <Link href="/profile/help" className="text-[#7028B8] font-bold hover:underline">
              Pusat Bantuan
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
