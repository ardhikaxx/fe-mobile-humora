'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Clock, User, Sparkles } from 'lucide-react';
import { useHumora } from '../../lib/context/HumoraContext';

export function BottomNavigation() {
  const pathname = usePathname();
  const { notifications, subscription } = useHumora();

  // Hide bottom navigation on full-focus routes: watch player, auth, payment
  if (
    pathname.startsWith('/watch/') ||
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/payment') ||
    pathname === '/'
  ) {
    return null;
  }

  const unreadNotifs = notifications.filter((n) => !n.read).length;

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
      icon: Compass,
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
      badge: subscription.status === 'active' ? 'PRO' : unreadNotifs > 0 ? `${unreadNotifs}` : undefined,
    },
  ];

  return (
    <nav className="fixed bottom-5 inset-x-0 z-40 flex justify-center pointer-events-none px-4 select-none safe-pb">
      {/* Outer Floating Capsule Pill with Ambient Glow & Sheen */}
      <div className="relative pointer-events-auto w-full max-w-[384px]">
        
        {/* Soft Ambient Colorful Glow behind the capsule */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#4B0B7A]/50 via-[#7028B8]/30 to-[#FFD52E]/30 blur-xl opacity-75 -z-10" />

        {/* Main Frosted Glass Capsule */}
        <div className="relative bg-gradient-to-b from-[#2A093D]/95 via-[#21052F]/95 to-[#160322]/98 backdrop-blur-2xl rounded-full p-2 border border-white/20 shadow-[0_18px_42px_rgba(20,2,28,0.45)] flex items-center justify-between gap-1 overflow-hidden">
          
          {/* Subtle Top-Edge Specular Highlight Line */}
          <div className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = item.isActive;

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={`relative flex items-center justify-center gap-1.5 py-2 px-3 rounded-full transition-all duration-300 active:scale-90 ${
                  active
                    ? 'flex-1 bg-gradient-to-r from-[#FFD52E] via-[#FFD838] to-[#FFC200] text-[#21052F] shadow-lg shadow-[#FFD52E]/30 font-black'
                    : 'flex-1 text-[#D8D0DE]/75 hover:text-white hover:bg-white/10 font-semibold'
                }`}
              >
                {/* Icon with active scale & stroke */}
                <div className="relative flex items-center justify-center shrink-0">
                  <Icon
                    className={`transition-transform duration-200 ${
                      active
                        ? 'w-[18px] h-[18px] stroke-[2.8] text-[#21052F] scale-105'
                        : 'w-[18px] h-[18px] stroke-[2] text-current'
                    }`}
                  />

                  {/* Badge pill or active sparkle */}
                  {active && item.label === 'Beranda' && (
                    <Sparkles className="absolute -top-1.5 -right-2 w-2.5 h-2.5 text-[#21052F] animate-pulse" />
                  )}

                  {!active && item.badge && (
                    <span className="absolute -top-1.5 -right-2 px-1 py-0.2 bg-[#FFD52E] text-[#21052F] text-[8px] font-black rounded-full ring-1 ring-[#21052F]">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Text Label */}
                <span
                  className={`text-[11px] tracking-tight whitespace-nowrap transition-all duration-200 ${
                    active ? 'font-black opacity-100 text-[#21052F]' : 'font-semibold text-xs opacity-85'
                  }`}
                >
                  {item.label}
                </span>

                {/* Micro Active Underline Glow */}
                {active && (
                  <span className="absolute -bottom-0.5 w-4 h-1 bg-[#21052F]/40 rounded-full blur-[0.5px]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
