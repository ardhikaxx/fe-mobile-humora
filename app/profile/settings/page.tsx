'use client';

import React, { useState } from 'react';
import {
  Tv,
  Bell,
  Shield,
  Trash2,
  KeyRound,
  Save,
  Check,
} from 'lucide-react';
import { AppHeader } from '../../../components/layout/AppHeader';
import { useHumora } from '../../../lib/context/HumoraContext';
import { ConfirmationModal } from '../../../components/ui/ConfirmationModal';

export default function SettingsPage() {
  const { showToast, user } = useHumora();

  // Playback & Video Settings
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');

  // Notification Settings
  const [notifNewSeries, setNotifNewSeries] = useState(true);
  const [notifPromo, setNotifPromo] = useState(true);
  const [notifReminder, setNotifReminder] = useState(true);

  // Storage & Cache Settings
  const [cacheSize, setCacheSize] = useState('48.5 MB');

  // Modal States
  const [isClearCacheModalOpen, setIsClearCacheModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleClearCache = () => {
    setCacheSize('0.0 KB');
    setIsClearCacheModalOpen(false);
    showToast('Cache video dan thumbnail berhasil dibersihkan!');
  };

  const handleSaveSettings = () => {
    setIsSaved(true);
    showToast('Seluruh preferensi pengaturan akun berhasil disimpan.');
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      showToast('Mohon isi kata sandi lama dan baru.');
      return;
    }
    setIsPasswordModalOpen(false);
    setOldPassword('');
    setNewPassword('');
    showToast('Kata sandi berhasil diperbarui.');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-24">
      {/* Header Bar */}
      <AppHeader title="Pengaturan Akun" showBack />

      <div className="px-5 pt-3 space-y-5">
        {/* SECTION 1: PEMUTARAN VIDEO */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EEE8F0] shadow-xs">
          <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-[#EEE8F0]">
            <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center text-[#7028B8]">
              <Tv className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#24172B]">Pemutaran Video</h2>
              <p className="text-[11px] text-[#786F7D]">Atur kenyamanan streaming dan kontrol pemutaran</p>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3.5 text-xs">
            {/* Auto Play Next */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[#24172B] block">Putar Otomatis Episode</span>
                <span className="text-[11px] text-[#786F7D]">Lanjut otomatis ke episode berikutnya saat video selesai</span>
              </div>
              <button
                type="button"
                onClick={() => setAutoPlayNext(!autoPlayNext)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                  autoPlayNext ? 'bg-[#7028B8] justify-end' : 'bg-gray-200 justify-start'
                }`}
                aria-label="Toggle putar otomatis"
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Mode Hemat Kuota */}
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[#24172B] block">Mode Hemat Kuota Seluler</span>
                <span className="text-[11px] text-[#786F7D]">Gunakan resolusi standar 480p saat di jaringan seluler</span>
              </div>
              <button
                type="button"
                onClick={() => setDataSaver(!dataSaver)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                  dataSaver ? 'bg-[#7028B8] justify-end' : 'bg-gray-200 justify-start'
                }`}
                aria-label="Toggle hemat kuota"
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Kecepatan Putar Default */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="font-bold text-[#24172B] block">Kecepatan Putar Default</span>
                <span className="text-[11px] text-[#786F7D]">Kecepatan video saat pertama kali dimainkan</span>
              </div>
              <div className="flex items-center gap-1">
                {['1.0x', '1.25x', '1.5x'].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => setPlaybackSpeed(speed)}
                    className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all ${
                      playbackSpeed === speed
                        ? 'bg-[#4B0B7A] text-white'
                        : 'bg-[#F6F1F8] text-[#786F7D] hover:text-[#24172B]'
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: NOTIFIKASI */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EEE8F0] shadow-xs">
          <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-[#EEE8F0]">
            <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center text-[#E58A16]">
              <Bell className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#24172B]">Notifikasi</h2>
              <p className="text-[11px] text-[#786F7D]">Pilih pemberitahuan yang ingin kamu terima</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[#24172B] block">Episode & Series Baru</span>
                <span className="text-[11px] text-[#786F7D]">Dapatkan info rilis series komedi teranyar</span>
              </div>
              <button
                type="button"
                onClick={() => setNotifNewSeries(!notifNewSeries)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                  notifNewSeries ? 'bg-[#7028B8] justify-end' : 'bg-gray-200 justify-start'
                }`}
                aria-label="Toggle notifikasi rilis baru"
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[#24172B] block">Promo & Langganan VIP</span>
                <span className="text-[11px] text-[#786F7D]">Pemberitahuan diskon paket dan event spesial</span>
              </div>
              <button
                type="button"
                onClick={() => setNotifPromo(!notifPromo)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                  notifPromo ? 'bg-[#7028B8] justify-end' : 'bg-gray-200 justify-start'
                }`}
                aria-label="Toggle notifikasi promo"
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[#24172B] block">Pengingat Lanjut Nonton</span>
                <span className="text-[11px] text-[#786F7D]">Ingatkan episode yang belum selesai ditonton</span>
              </div>
              <button
                type="button"
                onClick={() => setNotifReminder(!notifReminder)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors shrink-0 ${
                  notifReminder ? 'bg-[#7028B8] justify-end' : 'bg-gray-200 justify-start'
                }`}
                aria-label="Toggle notifikasi pengingat"
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 3: PENYIMPANAN & CACHE */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EEE8F0] shadow-xs">
          <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-[#EEE8F0]">
            <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center text-[#21865B]">
              <Shield className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#24172B]">Penyimpanan & Cache</h2>
              <p className="text-[11px] text-[#786F7D]">Kelola file cache dan data lokal</p>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-[#24172B] block">Cache Aplikasi</span>
                <span className="text-[11px] text-[#786F7D]">Ukuran file cache lokal: {cacheSize}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsClearCacheModalOpen(true)}
                className="px-3 py-1.5 rounded-xl border border-[#EEE8F0] hover:bg-[#FDF2F4] hover:text-[#D94152] font-bold text-xs text-[#7028B8] transition-all active:scale-95 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Bersihkan</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 4: KEAMANAN AKUN */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EEE8F0] shadow-xs">
          <div className="flex items-center gap-2.5 mb-3.5 pb-2.5 border-b border-[#EEE8F0]">
            <div className="w-8 h-8 rounded-xl bg-[#F6F1F8] flex items-center justify-center text-[#4B0B7A]">
              <KeyRound className="w-4.5 h-4.5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#24172B]">Keamanan Akun</h2>
              <p className="text-[11px] text-[#786F7D]">Kelola kata sandi dan kredensial akun</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            {user ? (
              <div className="flex items-center justify-between py-1">
                <div>
                  <span className="font-bold text-[#24172B] block">Kata Sandi Akun</span>
                  <span className="text-[11px] text-[#786F7D]">Terakhir diubah 30 hari lalu</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="text-xs font-bold text-[#7028B8] hover:underline"
                >
                  Ubah Sandi
                </button>
              </div>
            ) : (
              <p className="text-[#786F7D] text-xs">
                Kamu sedang menggunakan akun Tamu. Masuk untuk mengelola kata sandi dan keamanan akun.
              </p>
            )}
          </div>
        </section>

        {/* Save Settings Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleSaveSettings}
            className={`w-full py-3.5 rounded-2xl font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-2 active:scale-97 ${
              isSaved
                ? 'bg-[#21865B] text-white'
                : 'bg-[#4B0B7A] text-white hover:bg-[#3B0762]'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4.5 h-4.5 stroke-[2.5]" />
                <span>Pengaturan Tersimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-4.5 h-4.5 stroke-[2.2]" />
                <span>Simpan Pengaturan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Confirmation Modal: Clear Cache */}
      <ConfirmationModal
        isOpen={isClearCacheModalOpen}
        title="Bersihkan Cache Streaming?"
        description="Semua data cache video sementara dan thumbnail series lokal akan dibersihkan. Riwayat tontonan dan akunmu tetap aman."
        confirmLabel="Bersihkan"
        cancelLabel="Batal"
        onConfirm={handleClearCache}
        onCancel={() => setIsClearCacheModalOpen(false)}
      />

      {/* Modal Ubah Kata Sandi */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
          <div className="bg-white rounded-3xl p-5 sm:p-6 max-w-sm w-full shadow-xl border border-[#EEE8F0]">
            <h3 className="text-base font-bold text-[#24172B] mb-1">Ubah Kata Sandi</h3>
            <p className="text-xs text-[#786F7D] mb-4">
              Masukkan kata sandi lama dan baru untuk memperbarui kredensial akunmu.
            </p>

            <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#24172B] block mb-1">Kata Sandi Lama</label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEE8F0] focus:outline-none focus:border-[#7028B8] text-sm"
                />
              </div>

              <div>
                <label className="font-semibold text-[#24172B] block mb-1">Kata Sandi Baru</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEE8F0] focus:outline-none focus:border-[#7028B8] text-sm"
                />
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#EEE8F0] text-xs font-semibold text-[#786F7D] hover:bg-[#F6F1F8]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#4B0B7A] text-white text-xs font-bold hover:bg-[#3B0762]"
                >
                  Perbarui
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
