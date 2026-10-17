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
  Sparkles,
  Globe,
  Loader2,
} from 'lucide-react';
import { HumoraLogo } from '../../../components/brand/HumoraLogo';
import { AppHeader } from '../../../components/layout/AppHeader';
import { useHumora } from '../../../lib/context/HumoraContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, pendingRedirectUrl, setPendingRedirectUrl, showToast } = useHumora();

  const [authMethod, setAuthMethod] = useState<'email' | 'phone'>('email');
  const [identifier, setIdentifier] = useState('ardhika@humora.id');
  const [password, setPassword] = useState('humora2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim()) {
      setErrorMsg(authMethod === 'email' ? 'Email wajib diisi' : 'Nomor HP wajib diisi');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Kata sandi wajib diisi');
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

  const handleQuickDemoFill = () => {
    if (authMethod === 'email') {
      setIdentifier('ardhika@humora.id');
      setPassword('humora2026');
    } else {
      setIdentifier('081288997766');
      setPassword('123456');
    }
    setErrorMsg('');
  };

  const handleGoogleDemo = () => {
    setIsLoading(true);
    setTimeout(async () => {
      await login('ardhika.google@gmail.com', 'Ardhika Google');
      setIsLoading(false);
      const destination = pendingRedirectUrl || '/home';
      setPendingRedirectUrl(null);
      router.push(destination);
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-6 select-none">
      {/* Floating Header Bar */}
      <AppHeader
        title="Masuk Akun"
        showBack
        rightAction={
          <Link href="/home" className="text-xs font-bold text-[#7028B8] hover:underline px-2 py-1">
            Lewati
          </Link>
        }
      />

      {/* Main Form Content */}
      <div className="w-full max-w-sm mx-auto flex-1 flex flex-col justify-center py-2">
        {/* Brand Logo & Welcome Title */}
        <div className="flex flex-col items-center text-center mb-6">
          <HumoraLogo type="full" size="md" className="rounded-2xl overflow-hidden shadow-xs border border-[#21052F]/10" />
          <h2 className="text-xl sm:text-2xl font-black text-[#24172B] tracking-tight mt-3">
            Selamat datang kembali!
          </h2>
          <p className="text-xs sm:text-sm text-[#786F7D] mt-1">
            Masuk untuk melanjutkan cerita favoritmu.
          </p>
        </div>

        {/* Quick Demo Fill Pill */}
        <div className="mb-4 flex justify-center">
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="text-[11px] font-bold text-[#4B0B7A] bg-[#FFF9E0] hover:bg-[#FFE57F] border border-[#FFD52E] px-3 py-1 rounded-full flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Sparkles className="w-3 h-3 text-[#E58A16]" />
            <span>Isi Cepat Akun Demo</span>
          </button>
        </div>

        {/* Method Switcher Tabs (Email vs Phone) */}
        <div className="grid grid-cols-2 p-1 bg-[#F6F1F8] rounded-xl mb-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => {
              setAuthMethod('email');
              setIdentifier('ardhika@humora.id');
            }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authMethod === 'email'
                ? 'bg-white text-[#4B0B7A] shadow-xs'
                : 'text-[#786F7D] hover:text-[#24172B]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMethod('phone');
              setIdentifier('081288997766');
            }}
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              authMethod === 'phone'
                ? 'bg-white text-[#4B0B7A] shadow-xs'
                : 'text-[#786F7D] hover:text-[#24172B]'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Nomor HP</span>
          </button>
        </div>

        {/* Error Alert if any */}
        {errorMsg && (
          <div className="mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-3.5">
          {/* Identifier Input */}
          <div>
            <label className="block text-xs font-bold text-[#24172B] mb-1">
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
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={
                  authMethod === 'email' ? 'contoh@email.com' : '0812xxxxxxx'
                }
                className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-[#EEE8F0] text-xs sm:text-sm text-[#24172B] focus:outline-none focus:border-[#7028B8] focus:ring-2 focus:ring-[#7028B8]/20 transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-[#24172B]">
                Kata Sandi
              </label>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-[11px] font-semibold text-[#7028B8] hover:underline"
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full pl-10 pr-10 py-3 bg-white rounded-xl border border-[#EEE8F0] text-xs sm:text-sm text-[#24172B] focus:outline-none focus:border-[#7028B8] focus:ring-2 focus:ring-[#7028B8]/20 transition-all shadow-xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-[#786F7D] hover:text-[#24172B]"
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
              className="w-4 h-4 rounded text-[#4B0B7A] focus:ring-[#7028B8] accent-[#4B0B7A]"
            />
            <label htmlFor="rememberMe" className="text-xs text-[#786F7D] font-medium cursor-pointer">
              Ingat saya di perangkat ini
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#4B0B7A] hover:bg-[#38065C] active:scale-98 text-white font-bold text-sm shadow-md shadow-[#4B0B7A]/20 flex items-center justify-center gap-2 transition-all mt-4 disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-white" />
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-[#EEE8F0]" />
          <span className="px-3 text-[11px] text-[#A39CA9] uppercase font-bold">
            atau masuk dengan
          </span>
          <div className="flex-1 border-t border-[#EEE8F0]" />
        </div>

        {/* Demo Google Button */}
        <button
          type="button"
          onClick={handleGoogleDemo}
          className="w-full py-3 px-4 rounded-xl border border-[#EEE8F0] bg-white hover:bg-[#F6F1F8] active:scale-98 text-xs font-bold text-[#24172B] flex items-center justify-center gap-2 transition-all shadow-xs"
        >
          <Globe className="w-4 h-4 text-[#4285F4]" />
          <span>Masuk Cepat Akun Demo (Google)</span>
        </button>
      </div>

      {/* Footer Register Prompt */}
      <div className="text-center text-xs text-[#786F7D] pt-2">
        Belum punya akun HUMORA?{' '}
        <Link
          href="/auth/register"
          className="font-bold text-[#4B0B7A] hover:underline"
        >
          Daftar Sekarang
        </Link>
      </div>

      {/* Modal Lupa Sandi Demo */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center shadow-xl border border-[#EEE8F0]">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9E0] text-[#E58A16] flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#24172B]">Pemulihan Sandi Demo</h3>
            <p className="text-xs text-[#786F7D] mt-2 leading-relaxed">
              Karena ini aplikasi prototype, kamu bisa langsung masuk menggunakan akun demo apapun tanpa khawatir lupa kata sandi.
            </p>
            <button
              onClick={() => {
                setIsForgotModalOpen(false);
                showToast('Gunakan kredensial cepat yang telah disediakan.');
              }}
              className="mt-4 w-full py-2.5 rounded-xl bg-[#4B0B7A] text-white font-bold text-xs"
            >
              Mengerti & Kembali
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
