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
} from 'lucide-react';
import { AppHeader } from '../../components/layout/AppHeader';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { HumoraLogo } from '../../components/brand/HumoraLogo';
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
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[#EEE8F0] bg-[#F6F1F8] shrink-0 flex items-center justify-center">
                {user.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-7 h-7 text-[#7028B8]" />
                )}
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

            <Link
              href="/profile/edit"
              className="text-xs font-bold text-[#7028B8] hover:text-[#4B0B7A] bg-[#F6F1F8] hover:bg-[#EEE8F0] px-3 py-1.5 rounded-full transition-colors flex items-center gap-1 active:scale-95"
            >
              <span>Ubah</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>
        ) : (
          /* Guest State Banner */
          <div className="p-5 bg-gradient-to-br from-[#4B0B7A] to-[#21052F] rounded-3xl text-white shadow-md mb-4 flex flex-col items-center text-center">
            <HumoraLogo type="icon" size="md" className="rounded-2xl overflow-hidden shadow-md mb-2.5" />

            <h3 className="text-base font-black tracking-tight">
              Masuk ke Akun HUMORA
            </h3>

            <p className="text-xs text-[#D8D0DE] mt-1 max-w-xs leading-relaxed">
              Simpan tontonan favoritmu dan nikmati akses video premium tanpa batas.
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
              /* State 1: Premium Active */
              <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#21052F] to-[#4B0B7A] text-white shadow-md border border-[#7028B8]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 bg-[#FFD52E] text-[#21052F] px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                    <Crown className="w-3 h-3 fill-current" />
                    <span>PREMIUM AKTIF</span>
                  </div>
                  <span className="text-[11px] text-[#FFD52E] font-bold">
                    Sisa {daysRemaining} Hari
                  </span>
                </div>

                <h4 className="text-base font-black text-white mt-1">
                  {subscription.planName}
                </h4>

                <p className="text-xs text-[#D8D0DE] mt-0.5">
                  Berlaku hingga {formatDateIndo(subscription.endDate || '')}
                </p>

                <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between">
                  <span className="text-xs text-white/80 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD52E]" />
                    Semua episode terbuka
                  </span>

                  <Link
                    href="/profile/subscription"
                    className="text-xs font-bold text-[#FFD52E] hover:underline flex items-center"
                  >
                    <span>Detail</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : subscription.status === 'expired' ? (
              /* State 2: Premium Expired Warning */
              <div className="p-4 sm:p-5 rounded-3xl bg-[#FFF5E8] border-2 border-[#E58A16] text-[#24172B] shadow-xs">
                <div className="flex items-center gap-2 text-[#E58A16] mb-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    Masa Premium Telah Berakhir
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#24172B]">
                  Aksesmu telah kedaluwarsa pada {formatDateIndo(subscription.endDate || '')}
                </h4>

                <p className="text-xs text-[#786F7D] mt-1 leading-relaxed">
                  Episode 3 dan seterusnya terkunci kembali. Perpanjang sekarang agar tontonanmu tidak terhenti.
                </p>

                <div className="mt-3.5 flex items-center gap-2">
                  <Link
                    href="/subscription"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#E58A16] hover:bg-[#D47E10] active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>Perpanjang Premium</span>
                  </Link>

                  <Link
                    href="/profile/subscription"
                    className="py-2.5 px-3 rounded-xl border border-gray-300 bg-white text-xs font-semibold text-[#786F7D] hover:bg-gray-50 transition-all"
                  >
                    Riwayat
                  </Link>
                </div>
              </div>
            ) : (
              /* State 3: Free User (Belum Berlangganan) */
              <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#EEE8F0] shadow-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-extrabold text-[#786F7D] uppercase tracking-wider bg-[#F6F1F8] px-2.5 py-0.5 rounded-full">
                    Akun Gratis
                  </span>
                  <span className="text-[11px] text-[#21865B] font-bold">
                    Free Tier
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#24172B] mt-1">
                  Kamu dapat menonton 2 episode pertama
                </h4>

                <p className="text-xs text-[#786F7D] mt-1 leading-relaxed">
                  Buka episode 3 hingga tamat di seluruh series dengan berlangganan HUMORA Premium mulai Rp19.000.
                </p>

                <Link
                  href="/subscription"
                  className="mt-3.5 w-full py-3 px-4 rounded-xl bg-[#4B0B7A] hover:bg-[#38065C] active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Crown className="w-3.5 h-3.5 text-[#FFD52E]" />
                  <span>Aktifkan Premium Sekarang</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* PROFILE MENU NAVIGATION */}
        <div className="bg-white rounded-3xl border border-[#EEE8F0] overflow-hidden shadow-xs divide-y divide-[#EEE8F0]">
          {/* Edit Profil */}
          {user && (
            <Link
              href="/profile/edit"
              className="flex items-center justify-between p-3.5 sm:p-4 hover:bg-[#F6F1F8] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#FFF9E0] flex items-center justify-center text-[#4B0B7A]">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#24172B] block">
                    Edit Profil
                  </span>
                  <span className="text-[11px] text-[#786F7D]">
                    Ubah nama, foto profil, bio & nomor HP
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#A39CA9]" />
            </Link>
          )}

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
                  Versi v1.0.0
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
