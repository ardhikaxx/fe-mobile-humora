'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
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
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Nama lengkap wajib diisi');
      return;
    }
    if (!identifier.trim()) {
      setErrorMsg('Email atau Nomor HP wajib diisi');
      return;
    }
    if (!password.trim() || password.length < 6) {
      setErrorMsg('Kata sandi minimal 6 karakter');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Konfirmasi kata sandi tidak cocok');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('Harap setujui syarat dan ketentuan');
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
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-6 select-none">
      {/* Floating Header Bar */}
      <AppHeader
        title="Daftar Akun"
        showBack
        showLogo={false}
        showNotification={false}
        showProfile={false}
      />

      {/* Main Form Content */}
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center py-2">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-5">
          <HumoraLogo type="full" size="md" className="rounded-2xl overflow-hidden shadow-xs border border-[#21052F]/10" />
          <h2 className="text-xl sm:text-2xl font-black text-[#24172B] tracking-tight mt-3">
            Mulai Cerita Baru
          </h2>
          <p className="text-xs text-[#786F7D] mt-0.5">
            Daftar dalam 1 menit & nikmati ratusan episode seru.
          </p>
        </div>

        {/* Error Alert if any */}
        {errorMsg && (
          <div className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {errorMsg}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-3">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-[#24172B] mb-1">
              Nama Lengkap
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#786F7D]">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="cth. Ardhika Pradana"
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#EEE8F0] text-xs sm:text-sm text-[#24172B] focus:outline-none focus:border-[#7028B8] focus:ring-2 focus:ring-[#7028B8]/20 transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Email or Phone */}
          <div>
            <label className="block text-xs font-bold text-[#24172B] mb-1">
              Email atau No. Handphone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#786F7D]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="nama@email.com atau 0812xxxx"
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#EEE8F0] text-xs sm:text-sm text-[#24172B] focus:outline-none focus:border-[#7028B8] focus:ring-2 focus:ring-[#7028B8]/20 transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-[#24172B] mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#786F7D]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#EEE8F0] text-xs sm:text-sm text-[#24172B] focus:outline-none focus:border-[#7028B8] focus:ring-2 focus:ring-[#7028B8]/20 transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-[#24172B] mb-1">
              Ulangi Kata Sandi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[#786F7D]">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ketik ulang kata sandi"
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#EEE8F0] text-xs sm:text-sm text-[#24172B] focus:outline-none focus:border-[#7028B8] focus:ring-2 focus:ring-[#7028B8]/20 transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded text-[#4B0B7A] focus:ring-[#7028B8] accent-[#4B0B7A] mt-0.5"
            />
            <label htmlFor="agreeTerms" className="text-[11px] text-[#786F7D] leading-tight cursor-pointer">
              Saya menyetujui Ketentuan Penggunaan dan Kebijakan Privasi aplikasi HUMORA.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#4B0B7A] hover:bg-[#38065C] active:scale-98 text-white font-bold text-sm shadow-md shadow-[#4B0B7A]/20 flex items-center justify-center gap-2 transition-all mt-3 disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-white" />
            ) : (
              <>
                <span>Buat Akun HUMORA</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer Login Prompt */}
      <div className="text-center text-xs text-[#786F7D] pt-2">
        Sudah memiliki akun?{' '}
        <Link
          href="/auth/login"
          className="font-bold text-[#4B0B7A] hover:underline"
        >
          Masuk di sini
        </Link>
      </div>
    </div>
  );
}
