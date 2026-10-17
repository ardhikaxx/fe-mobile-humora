'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { HumoraLogo } from '../../../components/brand/HumoraLogo';
import { AppHeader } from '../../../components/layout/AppHeader';
import { useHumora } from '../../../lib/context/HumoraContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register, pendingRedirectUrl, setPendingRedirectUrl } = useHumora();

  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Nama lengkap wajib diisi.');
      return;
    }
    if (!identifier.trim()) {
      setErrorMsg('Email atau Nomor HP wajib diisi.');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Harap setujui syarat dan ketentuan layanan.');
      return;
    }

    setIsLoading(true);

    setTimeout(async () => {
      await register(name, identifier);
      setIsLoading(false);

      const destination = pendingRedirectUrl || '/home';
      setPendingRedirectUrl(null);
      router.push(destination);
    }, 550);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] min-h-screen pb-10">
      {/* Floating Header Bar */}
      <AppHeader
        title="Daftar Akun"
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
            Mulai Cerita Barumu
          </h2>
          <p className="text-xs sm:text-[13px] text-[#786F7D] mt-1 max-w-xs leading-relaxed">
            Daftar dalam 1 menit dan nikmati ratusan episode seru tanpa batas.
          </p>
        </div>

        {/* Modern Card Form */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EEE8F0] shadow-xs">
          {/* Error Alert */}
          {errorMsg && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleRegister} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#24172B] mb-1.5">
                Nama Lengkap
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#786F7D]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="cth. Ardhika Pradana"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] focus:bg-white rounded-xl border border-[#EEE8F0] text-xs sm:text-sm text-[#24172B] placeholder-[#9E95A4] focus:outline-none focus:border-[#7028B8] focus:ring-3 focus:ring-[#7028B8]/15 transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Email or Phone */}
            <div>
              <label className="block text-xs font-bold text-[#24172B] mb-1.5">
                Email atau No. Handphone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#786F7D]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="nama@email.com atau 0812xxxx"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] focus:bg-white rounded-xl border border-[#EEE8F0] text-xs sm:text-sm text-[#24172B] placeholder-[#9E95A4] focus:outline-none focus:border-[#7028B8] focus:ring-3 focus:ring-[#7028B8]/15 transition-all shadow-xs"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#24172B] mb-1.5">
                Kata Sandi
              </label>
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
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-10 pr-10 py-3 bg-[#FAF8F5] focus:bg-white rounded-xl border border-[#EEE8F0] text-xs sm:text-sm text-[#24172B] placeholder-[#9E95A4] focus:outline-none focus:border-[#7028B8] focus:ring-3 focus:ring-[#7028B8]/15 transition-all shadow-xs"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-[#24172B] mb-1.5">
                Ulangi Kata Sandi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#786F7D]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="Ketik ulang kata sandi..."
                  className="w-full pl-10 pr-10 py-3 bg-[#FAF8F5] focus:bg-white rounded-xl border border-[#EEE8F0] text-xs sm:text-sm text-[#24172B] placeholder-[#9E95A4] focus:outline-none focus:border-[#7028B8] focus:ring-3 focus:ring-[#7028B8]/15 transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-[#786F7D] hover:text-[#24172B] transition-colors"
                  aria-label={showConfirmPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms Agreement Checkbox */}
            <div className="flex items-start gap-2.5 pt-1 select-none">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded text-[#21052F] focus:ring-0 accent-[#21052F] cursor-pointer mt-0.5 shrink-0"
              />
              <label htmlFor="agreeTerms" className="text-[11px] text-[#786F7D] leading-relaxed cursor-pointer">
                Saya menyetujui{' '}
                <Link
                  href="/profile/about/terms"
                  className="font-bold text-[#21052F] hover:text-[#7028B8] underline underline-offset-2"
                >
                  Ketentuan Penggunaan
                </Link>{' '}
                dan{' '}
                <Link
                  href="/profile/about/privacy"
                  className="font-bold text-[#21052F] hover:text-[#7028B8] underline underline-offset-2"
                >
                  Kebijakan Privasi
                </Link>{' '}
                HUMORA.
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
                  <span>Buat Akun HUMORA</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Login Prompt */}
        <div className="text-center text-xs text-[#786F7D] mt-5">
          Sudah memiliki akun HUMORA?{' '}
          <Link
            href="/auth/login"
            className="font-bold text-[#21052F] hover:text-[#7028B8] underline underline-offset-4 transition-colors"
          >
            Masuk di sini
          </Link>
        </div>
      </div>
    </div>
  );
}
