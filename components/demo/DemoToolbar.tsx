'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Sparkles,
  User,
  Crown,
  AlertTriangle,
  RotateCcw,
  Smartphone,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useHumora } from '../../lib/context/HumoraContext';

export function DemoToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { setDemoState, resetDemoState, subscription, user } = useHumora();
  const [isExpanded, setIsExpanded] = useState(true);

  const routes = [
    { label: 'Splash / Entry', path: '/' },
    { label: 'Home (Beranda)', path: '/home' },
    { label: 'Search (Pencarian)', path: '/search' },
    { label: 'Detail Series', path: '/series/kontrak-jadi-pacar' },
    { label: 'Video Player', path: '/watch/kontrak-jadi-pacar/1' },
    { label: 'Paket Subscription', path: '/subscription' },
    { label: 'Login', path: '/auth/login' },
    { label: 'Register', path: '/auth/register' },
    { label: 'Checkout Demo', path: '/payment' },
    { label: 'Riwayat (History)', path: '/history' },
    { label: 'Notifikasi', path: '/notifications' },
    { label: 'Profil Pengguna', path: '/profile' },
    { label: 'Detail Langganan', path: '/profile/subscription' },
  ];

  const currentRole = !user
    ? 'Tamu (Guest)'
    : subscription.status === 'active'
    ? 'Premium Aktif'
    : subscription.status === 'expired'
    ? 'Premium Expired'
    : 'User Gratis';

  return (
    <aside
      className="hidden xl:flex flex-col fixed left-6 top-8 z-50 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-[#EEE8F0] p-4 text-[#24172B] select-none animate-fade-in"
      aria-label="Demo Controller"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#EEE8F0]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#FFD52E] flex items-center justify-center text-[#21052F]">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black tracking-tight text-[#4B0B7A]">
              HUMORA DEMO CONTROLLER
            </h4>
            <span className="text-[10px] text-[#786F7D] block">
              Panel Pengujian & Screenshot
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-md text-[#786F7D] hover:bg-[#F6F1F8] transition-colors"
          title={isExpanded ? 'Kecilkan' : 'Perluas'}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3 space-y-4">
          {/* Current State Indicator */}
          <div className="bg-[#F6F1F8] rounded-xl p-2.5 flex items-center justify-between text-xs">
            <span className="text-[#786F7D] text-[11px] font-medium">State Aktif:</span>
            <span className="font-bold text-[#4B0B7A] bg-white px-2 py-0.5 rounded-md border border-[#EEE8F0]">
              {currentRole}
            </span>
          </div>

          {/* User State Switchers */}
          <div>
            <label className="text-[11px] font-bold text-[#786F7D] uppercase tracking-wider block mb-1.5">
              Ubah Kondisi Pengguna
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setDemoState('guest')}
                className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  !user
                    ? 'bg-[#4B0B7A] text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-[#24172B]'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>1. Tamu (Guest)</span>
              </button>

              <button
                onClick={() => setDemoState('free')}
                className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  user && subscription.status === 'none'
                    ? 'bg-[#4B0B7A] text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-[#24172B]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFD52E]" />
                <span>2. User Gratis</span>
              </button>

              <button
                onClick={() => setDemoState('premium')}
                className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  subscription.status === 'active'
                    ? 'bg-[#4B0B7A] text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-[#24172B]'
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-[#FFD52E]" />
                <span>3. Premium Aktif</span>
              </button>

              <button
                onClick={() => setDemoState('expired')}
                className={`py-1.5 px-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  subscription.status === 'expired'
                    ? 'bg-[#E58A16] text-white shadow-xs'
                    : 'bg-gray-100 hover:bg-gray-200 text-[#24172B]'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>4. Expired</span>
              </button>
            </div>
          </div>

          {/* Quick Route Navigator */}
          <div>
            <label className="text-[11px] font-bold text-[#786F7D] uppercase tracking-wider block mb-1.5">
              Navigasi Halaman Cepat
            </label>
            <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
              {routes.map((r) => {
                const isActive = pathname === r.path;
                return (
                  <button
                    key={r.path}
                    onClick={() => router.push(r.path)}
                    className={`w-full text-left py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-[#FFF9E0] text-[#4B0B7A] font-bold border-l-2 border-[#4B0B7A]'
                        : 'hover:bg-[#F6F1F8] text-[#786F7D]'
                    }`}
                  >
                    <span>{r.label}</span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {r.path === '/' ? '/' : r.path.split('/')[1]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset Demo Data Button */}
          <button
            onClick={resetDemoState}
            className="w-full py-2 px-3 rounded-xl border border-dashed border-gray-300 text-xs font-semibold text-gray-500 hover:text-red-600 hover:border-red-300 hover:bg-red-50 flex items-center justify-center gap-1.5 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      )}
    </aside>
  );
}
