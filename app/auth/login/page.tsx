'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Eye,
  EyeOff,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  KeyRound,
} from 'lucide-react';
import { HumoraLogo } from '../../../components/brand/HumoraLogo';
import { AppHeader } from '../../../components/layout/AppHeader';
import { useHumora } from '../../../lib/context/HumoraContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, pendingRedirectUrl, setPendingRedirectUrl, showToast } = useHumora();

  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotInput, setForgotInput] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim()) {
      setErrorMsg(
        authMethod === 'email'
          ? 'Silakan masukkan alamat email kamu.'
          : 'Silakan masukkan nomor handphone kamu.'
      );
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Silakan masukkan kata sandi akun kamu.');
      return;
    }

    setIsLoading(true);

    // Simulate authenticating for 500ms
    setTimeout(async () => {
      await login(identifier);
      setIsLoading(false);

      // Redirect to pending destination or home
      const destination = pendingRedirectUrl || '/home';
      setPendingRedirectUrl(null);
      router.push(destination);
    }, 550);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotInput.trim()) {
      showToast('Masukkan email atau no. HP terlebih dahulu.');
      return;
    }
    setIsForgotModalOpen(false);
    showToast('Petunjuk pemulihan kata sandi telah dikirim.');
    setForgotInput('');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] min-h-screen pb-10">
      {/* Floating Header Bar */}
      <AppHeader
        title="Masuk Akun"
        showBack
        showLogo={false}
        showNotification={false}
        showProfile={false}
      />

      {/* Main Content Area */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto flex-1 flex flex-col justify-center px-5 py-4">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <HumoraLogo
            type="full"
            size="md"
            className="rounded-2xl overflow-hidden shadow-xs border border-[#21052F]/10 mb-3.5"
          />
          <h2 className="text-xl sm:text-2xl font-black text-[#24172B] tracking-tight">
            Selamat Datang Kembali!
          </h2>
          <p className="text-xs sm:text-[13px] text-[#786F7D] mt-1 max-w-xs leading-relaxed">
            Masuk untuk melanjutkan keseruan cerita komedi favoritmu.
          </p>
        </div>

        {/* Modern Card Form */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EEE8F0] shadow-xs">
          {/* Method Switcher Tabs (Email vs Phone) */}
          <div className="flex p-1 bg-[#F6F1F8] rounded-xl mb-4.5 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setAuthMethod('email');
                setIdentifier('');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'email'
                  ? 'bg-white text-[#21052F] shadow-xs font-bold'
                  : 'text-[#786F7D] hover:text-[#24172B]'
              }`}
            >
              <Mail className="w-3.5 h-3.5 text-[#7028B8]" />
              <span>Email</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMethod('phone');
                setIdentifier('');
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMethod === 'phone'
                  ? 'bg-white text-[#21052F] shadow-xs font-bold'
                  : 'text-[#786F7D] hover:text-[#24172B]'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#7028B8]" />
              <span>Nomor HP</span>
            </button>
          </div>

          {/* Error Alert */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-3.5">
            {/* Identifier Input */}
            <div>
              <label className="block text-xs font-bold text-[#24172B] mb-1.5">
                {authMethod === 'email' ? 'Alamat Email' : 'Nomor Handphone'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#786F7D]">
                  {authMethod === 'email' ? (
                    <Mail className="w-4 h-4" />
                  ) : (
                    <Phone className="w-4 h-4" />
                  )}
                </div>
                <input
                  type={authMethod === 'email' ? 'email' : 'tel'}
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder={
                    authMethod === 'email' ? 'nama@email.com' : '0812xxxxxxxx'
                  }
                  className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-[#EEE8F0] text-xs sm:text-sm text-[#24172B] placeholder-[#9E95A4] focus:outline-none focus:border-[#7028B8] focus:ring-3 focus:ring-[#7028B8]/15 transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#24172B]">
                  Kata Sandi
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-[11px] font-bold text-[#7028B8] hover:text-[#4B0B7A] transition-colors"
                >
                  Lupa sandi?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#786F7D]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Masukkan kata sandi..."
                  className="w-full pl-10 pr-10 py-3 bg-white rounded-xl border border-[#EEE8F0] text-xs sm:text-sm text-[#24172B] placeholder-[#9E95A4] focus:outline-none focus:border-[#7028B8] focus:ring-3 focus:ring-[#7028B8]/15 transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-[#786F7D] hover:text-[#24172B] transition-colors"
                  aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2 pt-0.5">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#21052F] focus:ring-0 accent-[#21052F] cursor-pointer"
              />
              <label htmlFor="rememberMe" className="text-xs text-[#786F7D] font-medium cursor-pointer select-none">
                Ingat saya di perangkat ini
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#21052F] hover:bg-[#350A4E] active:scale-[0.98] text-[#FFD52E] font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-4.5 h-4.5 animate-spin text-[#FFD52E]" />
              ) : (
                <>
                  <span>Masuk Sekarang</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Register Prompt */}
        <div className="text-center text-xs text-[#786F7D] mt-5">
          Belum memiliki akun HUMORA?{' '}
          <Link
            href="/auth/register"
            className="font-bold text-[#21052F] hover:text-[#7028B8] underline underline-offset-4 transition-colors"
          >
            Daftar Sekarang
          </Link>
        </div>
      </div>

      {/* Modal Lupa Sandi */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-xs sm:max-w-sm w-full text-center shadow-xl border border-[#EEE8F0]">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9E0] text-[#D47E0E] flex items-center justify-center mx-auto mb-3.5 shadow-xs">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#24172B]">Pemulihan Kata Sandi</h3>
            <p className="text-xs text-[#786F7D] mt-1.5 leading-relaxed">
              Masukkan email atau nomor HP akun kamu untuk menerima tautan pemulihan sandi.
            </p>

            <form onSubmit={handleForgotSubmit} className="mt-4 space-y-3">
              <input
                type="text"
                value={forgotInput}
                onChange={(e) => setForgotInput(e.target.value)}
                placeholder="nama@email.com atau 0812xxxx"
                className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-[#EEE8F0] text-xs text-[#24172B] focus:outline-none focus:border-[#7028B8] transition-all"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsForgotModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-[#EEE8F0] hover:bg-[#F6F1F8] text-[#786F7D] font-bold text-xs transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#21052F] hover:bg-[#350A4E] text-[#FFD52E] font-bold text-xs transition-colors shadow-xs"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
