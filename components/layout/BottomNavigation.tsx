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
    <nav className="fixed bottom-5 inset-x-0 z-40 flex justify-center pointer-events-none px-4 select-none safe-pb">
      {/* Sederhana tapi Modern: Clean Frosted White Capsule Pill */}
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-[#EEE8F0] shadow-[0_10px_30px_rgba(33,5,47,0.08)] rounded-full p-1.5 flex items-center justify-between w-full max-w-[356px] transition-all">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`flex items-center gap-1.5 rounded-full transition-all duration-200 active:scale-95 ${
                active
                  ? 'bg-[#21052F] text-white px-3.5 py-2 font-bold shadow-xs'
                  : 'text-[#786F7D] hover:text-[#24172B] hover:bg-[#F6F1F8] px-2.5 py-2'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform ${
                  active ? 'text-[#FFD52E] stroke-[2.4]' : 'stroke-[1.9]'
                }`}
              />
              <span
                className={`text-xs tracking-tight transition-all ${
                  active
                    ? 'font-bold text-white'
                    : 'font-medium text-[#786F7D]'
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
