'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Clock, User } from 'lucide-react';

export function BottomNavigation() {
  const pathname = usePathname();

  // Hide bottom navigation on full-focus routes: watch player, auth, payment
  if (
    pathname.startsWith('/watch/') ||
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/payment') ||
    pathname === '/'
  ) {
    return null;
  }

  const navItems = [
    {
      label: 'Beranda',
      href: '/home',
      icon: Home,
      isActive: pathname === '/home' || pathname.startsWith('/series/'),
    },
    {
      label: 'Cari',
      href: '/search',
      icon: Search,
      isActive: pathname === '/search',
    },
    {
      label: 'Riwayat',
      href: '/history',
      icon: Clock,
      isActive: pathname === '/history',
    },
    {
      label: 'Profil',
      href: '/profile',
      icon: User,
      isActive: pathname.startsWith('/profile'),
    },
  ];

  return (
    <nav className="fixed bottom-2.5 sm:bottom-3 inset-x-0 z-40 flex justify-center pointer-events-none px-3 select-none pb-[calc(env(safe-area-inset-bottom,0px))]">
      {/* Sederhana, Modern, Lebih Besar & Nyaman Disentuh dengan Background Kuning Tema Humora */}
      <div className="pointer-events-auto bg-[#FFD52E] border border-[#21052F]/15 shadow-[0_12px_32px_rgba(33,5,47,0.18),0_2px_8px_rgba(0,0,0,0.06)] rounded-full p-2 flex items-center justify-between w-[95%] max-w-[410px] transition-all">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`flex items-center gap-1.5 sm:gap-2 rounded-full whitespace-nowrap transition-all duration-200 active:scale-95 ${
                active
                  ? 'bg-[#21052F] text-white px-3.5 sm:px-4 py-2.5 font-bold shadow-[0_4px_12px_rgba(33,5,47,0.25)]'
                  : 'text-[#21052F]/80 hover:text-[#21052F] hover:bg-black/5 px-2.5 sm:px-3 py-2.5'
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 transition-transform ${
                  active ? 'text-[#FFD52E] stroke-[2.4]' : 'text-[#21052F]/80 stroke-[2]'
                }`}
              />
              <span
                className={`text-xs sm:text-[13px] tracking-tight transition-all ${
                  active
                    ? 'font-bold text-white'
                    : 'font-bold text-[#21052F]/80'
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
