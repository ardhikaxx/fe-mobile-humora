'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Crown,
  Clock,
  Bell,
  Settings,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { AppHeader } from '../../components/layout/AppHeader';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { useHumora } from '../../lib/context/HumoraContext';
import { formatDateIndo, getDaysRemaining } from '../../lib/utils/formatters';

export default function ProfilePage() {
  const router = useRouter();
  const { user, subscription, logout, showToast, setDemoState, resetDemoState } = useHumora();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const daysRemaining = getDaysRemaining(subscription.endDate);

  const handleLogoutConfirm = () => {
    logout();
    setIsLogoutModalOpen(false);
    router.push('/home');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-24">
      <AppHeader
        title="Profil Saya"
        showProfile={false}
        showNotification={false}
        rightAction={
          <Link
            href="/profile/settings"
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#24172B] hover:bg-[#F6F1F8] active:scale-95 transition-all"
            aria-label="Pengaturan Akun"
          >
            <Settings className="w-4.5 h-4.5 text-[#4B0B7A]" />
          </Link>
        }
      />

      <div className="px-5 pt-3">
        {/* User Info Header Card */}
        {user ? (
          <div className="p-4 bg-white rounded-3xl border border-[#EEE8F0] shadow-xs flex items-center justify-between mb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#EEE8F0] bg-[#F6F1F8] shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-base font-bold text-[#24172B] tracking-tight">
                  {user.name}
                </h3>
                <p className="text-xs text-[#786F7D] mt-0.5">{user.email}</p>
                <span className="text-[10px] text-[#A39CA9] block mt-0.5">
                  Member sejak {user.joinedDate}
                </span>
              </div>
            </div>

            <button
              onClick={() => showToast('Edit profil dapat dilakukan pada versi lengkap.')}
              className="text-xs font-bold text-[#7028B8] hover:underline"
            >
              Ubah
            </button>
          </div>
        ) : (
          /* Guest State Banner */
          <div className="p-5 bg-gradient-to-br from-[#4B0B7A] to-[#21052F] rounded-3xl text-white shadow-md mb-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#FFD52E] mb-2.5">
              <User className="w-6 h-6" />
            </div>

            <h3 className="text-base font-black tracking-tight">
              Masuk ke Akun HUMORA
            </h3>

            <p className="text-xs text-[#D8D0DE] mt-1 max-w-xs leading-relaxed">
              Simpan tontonan favoritmu dan nikmati akses episode premium tanpa batas.
            </p>

            <div className="flex w-full gap-2.5 mt-4">
              <Link
                href="/auth/login"
                className="flex-1 py-2.5 rounded-xl bg-[#FFD52E] text-[#21052F] font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition-all shadow-xs"
              >
                <span>Masuk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/auth/register"
                className="flex-1 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs flex items-center justify-center transition-all"
              >
                Daftar Baru
              </Link>
            </div>
          </div>
        )}

        {/* SUBSCRIPTION STATUS CARD */}
        {user && (
          <div className="mb-5">
            {subscription.status === 'active' ? (
              /* State 1: Black Card VIP Exclusive (Active) */
              <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#160621] via-[#0D0213] to-[#250838] text-white shadow-xl border border-[#FFD52E]/30 p-5 sm:p-6 select-none transition-all group">
                {/* Background Ambient Glow & Watermark */}
                <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-gradient-to-br from-[#FFD52E]/15 to-[#7028B8]/20 blur-2xl pointer-events-none" />
                <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-purple-600/10 blur-xl pointer-events-none" />

                {/* Top Card Row */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {/* Metallic Smart Chip Simulation */}
                    <div className="w-9 h-7 rounded-md bg-gradient-to-br from-[#FFE89E] via-[#D8A72B] to-[#9E7309] p-0.5 shadow-sm border border-[#FFF6D4]/50 shrink-0">
                      <div className="w-full h-full border border-black/25 rounded-xs flex items-center justify-center bg-black/10">
                        <Sparkles className="w-3.5 h-3.5 text-[#543800]" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] font-black tracking-widest text-[#FFD52E] uppercase block leading-none">
                        HUMORA VIP
                      </span>
                      <span className="text-[9px] text-white/50 tracking-wider font-mono uppercase mt-0.5 block">
                        BLACK PASS
                      </span>
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-[#FFD52E]/15 backdrop-blur-md border border-[#FFD52E]/40 text-[#FFD52E] text-[10px] font-black tracking-wider uppercase flex items-center gap-1.5 shadow-xs">
                    <Crown className="w-3 h-3 fill-current text-[#FFD52E]" />
                    <span>PREMIUM AKTIF</span>
                  </div>
                </div>

                {/* VIP Membership Serial Number */}
                <div className="relative z-10 my-4">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block font-medium">
                    Nomor Anggota Eksklusif
                  </span>
                  <div className="font-mono text-sm sm:text-base font-bold tracking-[0.22em] text-white/90 mt-0.5 drop-shadow-xs">
                    HMRA • 8820 • 2026 • VIP
                  </div>
                </div>

                {/* 3 VIP Privileges Pills */}
                <div className="relative z-10 flex items-center gap-1.5 flex-wrap my-3">
                  <span className="bg-white/10 backdrop-blur-xs text-white/90 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#FFD52E]" />
                    Bebas Iklan
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white/90 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#FFD52E]" />
                    Akses Semua Episode
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white/90 text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#FFD52E]" />
                    Kualitas Full HD
                  </span>
                </div>

                {/* Cardholder Info & Expiry Footer */}
                <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-white/50 block font-medium">
                      Pemegang Kartu
                    </span>
                    <span className="font-extrabold text-white tracking-wide text-xs sm:text-sm">
                      {user.name}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] uppercase tracking-wider text-white/50 block font-medium">
                      Masa Berlaku
                    </span>
                    <span className="font-extrabold text-[#FFD52E] tracking-wide text-xs">
                      Sisa {daysRemaining} Hari
                    </span>
                  </div>
                </div>

                {/* Link to Subscription Detail */}
                <div className="relative z-10 mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-white/70 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#21865B]" />
                    Paket: <strong className="text-white font-bold">{subscription.planName}</strong>
                  </span>

                  <Link
                    href="/profile/subscription"
                    className="text-xs font-bold text-[#FFD52E] hover:underline flex items-center gap-0.5 transition-all"
                  >
                    <span>Detail Langganan</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : subscription.status === 'expired' ? (
              /* State 2: Black Card Expired State */
              <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#1E1107] via-[#120803] to-[#2B1505] text-white shadow-lg border border-[#E58A16]/50 p-5 select-none">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-[#E58A16]">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-black uppercase tracking-wider">
                      Masa VIP Telah Berakhir
                    </span>
                  </div>
                  <span className="text-[10px] text-[#E58A16] font-bold bg-[#E58A16]/15 px-2 py-0.5 rounded-full border border-[#E58A16]/30">
                    Expired
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mt-1">
                  Aksesmu telah kedaluwarsa pada {formatDateIndo(subscription.endDate || '')}
                </h4>

                <p className="text-xs text-white/75 mt-1 leading-relaxed">
                  Semua episode terkunci kembali. Perpanjang Black Card VIP sekarang agar tontonanmu tidak terhenti.
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href="/subscription"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E58A16] to-[#D47E10] hover:brightness-110 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
                  >
                    <Crown className="w-3.5 h-3.5 text-white fill-current" />
                    <span>Aktifkan Ulang VIP</span>
                  </Link>

                  <Link
                    href="/profile/subscription"
                    className="py-2.5 px-3.5 rounded-xl border border-white/20 bg-white/10 text-xs font-semibold text-white/90 hover:bg-white/20 transition-all"
                  >
                    Riwayat
                  </Link>
                </div>
              </div>
            ) : (
              /* State 3: Invitation to Black Card VIP (Free User) */
              <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#180A22] via-[#0E0314] to-[#250838] text-white shadow-xl border border-[#FFD52E]/30 p-5 sm:p-6 select-none group">
                {/* Background Ambient Glow */}
                <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-gradient-to-br from-[#FFD52E]/15 to-[#7028B8]/20 blur-2xl pointer-events-none" />

                {/* Top Card Row */}
                <div className="relative z-10 flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-6 rounded-md bg-gradient-to-br from-[#FFE89E] via-[#D8A72B] to-[#9E7309] p-0.5 shadow-sm border border-[#FFF6D4]/50 shrink-0">
                      <div className="w-full h-full border border-black/25 rounded-xs flex items-center justify-center bg-black/10">
                        <Sparkles className="w-3.5 h-3.5 text-[#543800]" />
                      </div>
                    </div>
                    <span className="text-[11px] font-black tracking-widest text-[#FFD52E] uppercase">
                      HUMORA BLACK VIP
                    </span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-xs text-white/80 text-[10px] font-bold border border-white/10 uppercase">
                    Eksklusif
                  </span>
                </div>

                {/* Card Title & Perks */}
                <div className="relative z-10">
                  <h4 className="text-base font-black text-white tracking-tight">
                    Upgrade ke Black Card VIP
                  </h4>
                  <p className="text-xs text-white/75 mt-1 leading-relaxed">
                    Buka semua episode dari awal hingga tamat tanpa iklan di seluruh serial HUMORA.
                  </p>
                </div>

                {/* Perks Pills */}
                <div className="relative z-10 flex items-center gap-1.5 flex-wrap my-3.5">
                  <span className="bg-white/10 backdrop-blur-xs text-white/90 text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1">
                    👑 Akses Semua Episode
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white/90 text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1">
                    🚫 Tanpa Iklan
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white/90 text-[10px] font-bold px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1">
                    ⚡ Kualitas Full HD
                  </span>
                </div>

                {/* Gold CTA Button */}
                <Link
                  href="/subscription"
                  className="relative z-10 mt-1 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#FFD52E] via-[#FFE57F] to-[#FFD52E] hover:brightness-105 active:scale-98 text-[#21052F] font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
                >
                  <Crown className="w-3.5 h-3.5 fill-current text-[#21052F]" />
                  <span>Dapatkan Kartu VIP Mulai Rp19.000</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </Link>
              </div>
            )}
          </div>
        )}

        {/* PROFILE MENU NAVIGATION */}
        <div className="bg-white rounded-3xl border border-[#EEE8F0] overflow-hidden shadow-xs divide-y divide-[#EEE8F0]">
          {/* Riwayat Tontonan */}
          <Link
            href="/history"
            className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-[#F6F1F8] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center text-[#4B0B7A]">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#24172B] block">
                  Riwayat Tontonan
                </span>
                <span className="text-[11px] text-[#786F7D]">
                  Lihat series yang sedang atau telah ditonton
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A39CA9]" />
          </Link>

          {/* Paket Langganan */}
          <Link
            href="/subscription"
            className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-[#F6F1F8] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FFF9E0] flex items-center justify-center text-[#E58A16]">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#24172B] block">
                  Paket Langganan
                </span>
                <span className="text-[11px] text-[#786F7D]">
                  Pilihan paket bulanan hingga tahunan
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A39CA9]" />
          </Link>

          {/* Notifikasi */}
          <Link
            href="/notifications"
            className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-[#F6F1F8] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center text-[#7028B8]">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#24172B] block">
                  Pusat Notifikasi
                </span>
                <span className="text-[11px] text-[#786F7D]">
                  Pemberitahuan episode dan promo
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A39CA9]" />
          </Link>

          {/* Pengaturan Akun */}
          <Link
            href="/profile/settings"
            className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-[#F6F1F8] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center text-[#786F7D]">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#24172B] block">
                  Pengaturan Akun
                </span>
                <span className="text-[11px] text-[#786F7D]">
                  Kualitas video, bahasa & privasi
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A39CA9]" />
          </Link>

          {/* Bantuan & FAQ */}
          <Link
            href="/profile/help"
            className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-[#F6F1F8] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center text-[#786F7D]">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#24172B] block">
                  Pusat Bantuan
                </span>
                <span className="text-[11px] text-[#786F7D]">
                  Panduan penggunaan & kendala streaming
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A39CA9]" />
          </Link>

          {/* Tentang HUMORA */}
          <Link
            href="/profile/about"
            className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-[#F6F1F8] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center text-[#786F7D]">
                <Info className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-[#24172B] block">
                  Tentang HUMORA
                </span>
                <span className="text-[11px] text-[#786F7D]">
                  Versi prototype v1.0.0
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-[#A39CA9]" />
          </Link>

          {/* Logout button (only if user logged in) */}
          {user && (
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="w-full flex items-center justify-between p-3.5 sm:p-4 hover:bg-red-50 transition-colors text-left text-red-600"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                  <LogOut className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold block">
                    Keluar dari Akun
                  </span>
                  <span className="text-[11px] text-red-400">
                    Kembali ke mode tamu
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-red-300" />
            </button>
          )}
        </div>

        {/* Simulasi Fitur Demo Langsung di Dalam Aplikasi */}
        <div className="mt-5 p-4 bg-white rounded-3xl border border-[#EEE8F0] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#786F7D]">
              Demo Simulator Fitur
            </span>
            <span className="text-[10px] font-bold text-[#4B0B7A] bg-[#F6F1F8] px-2.5 py-0.5 rounded-full border border-[#EEE8F0]">
              {!user ? 'Tamu (Guest)' : subscription.status === 'active' ? 'Premium Aktif' : subscription.status === 'expired' ? 'Expired' : 'User Gratis'}
            </span>
          </div>

          <p className="text-xs text-[#786F7D] mb-3 leading-relaxed">
            Pilih status akun demo untuk menguji perbedaan tampilan beranda, hak akses episode, penawaran langganan, dan masa aktif:
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <button
              onClick={() => setDemoState('guest')}
              className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                !user
                  ? 'bg-[#4B0B7A] text-white border-[#4B0B7A] shadow-xs'
                  : 'bg-[#F6F1F8] text-[#24172B] border-[#EEE8F0] hover:bg-[#E9DEEF]'
              }`}
            >
              1. Tamu (Guest)
            </button>

            <button
              onClick={() => setDemoState('free')}
              className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                user && subscription.status === 'none'
                  ? 'bg-[#4B0B7A] text-white border-[#4B0B7A] shadow-xs'
                  : 'bg-[#F6F1F8] text-[#24172B] border-[#EEE8F0] hover:bg-[#E9DEEF]'
              }`}
            >
              2. User Gratis
            </button>

            <button
              onClick={() => setDemoState('premium')}
              className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                subscription.status === 'active'
                  ? 'bg-[#4B0B7A] text-white border-[#4B0B7A] shadow-xs'
                  : 'bg-[#F6F1F8] text-[#24172B] border-[#EEE8F0] hover:bg-[#E9DEEF]'
              }`}
            >
              3. Premium Aktif
            </button>

            <button
              onClick={() => setDemoState('expired')}
              className={`py-2 px-2.5 rounded-xl border text-center transition-all ${
                subscription.status === 'expired'
                  ? 'bg-[#E58A16] text-white border-[#E58A16] shadow-xs'
                  : 'bg-[#F6F1F8] text-[#24172B] border-[#EEE8F0] hover:bg-[#E9DEEF]'
              }`}
            >
              4. Expired
            </button>
          </div>

          <button
            onClick={resetDemoState}
            className="mt-3 w-full py-2.5 rounded-xl border border-dashed border-gray-300 text-xs font-semibold text-gray-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 transition-all flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Semua Data Demo ke Awal</span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        title="Keluar dari Akun?"
        description="Kamu akan keluar dari akun ini. Data riwayat lokal tetap tersimpan di perangkat ini."
        confirmLabel="Keluar"
        cancelLabel="Batal"
        isDestructive
        onConfirm={handleLogoutConfirm}
        onCancel={() => setIsLogoutModalOpen(false)}
      />
    </div>
  );
}
