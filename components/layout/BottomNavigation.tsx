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
      label: 'Home',
      href: '/home',
      icon: Home,
      isActive: pathname === '/home' || pathname.startsWith('/series/'),
    },
    {
      label: 'Search',
      href: '/search',
      icon: Search,
      isActive: pathname === '/search',
    },
    {
      label: 'History',
      href: '/history',
      icon: Clock,
      isActive: pathname === '/history',
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: User,
      isActive: pathname.startsWith('/profile'),
    },
  ];

  return (
    <nav className="fixed bottom-5 inset-x-0 z-40 flex justify-center pointer-events-none px-4 select-none safe-pb">
      {/* Floating Capsule Pill Container */}
      <div className="pointer-events-auto bg-[#21052F]/95 backdrop-blur-2xl border border-white/15 shadow-[0_12px_36px_rgba(33,5,47,0.35)] rounded-full p-1.5 flex items-center justify-around w-full max-w-[360px] transition-all">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`flex items-center gap-1.5 rounded-full transition-all duration-300 active:scale-92 ${
                item.isActive
                  ? 'bg-[#FFD52E] text-[#21052F] px-4 py-2 font-black shadow-md shadow-black/20'
                  : 'text-white/70 hover:text-white px-3 py-2 hover:bg-white/10'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  item.isActive ? 'stroke-[2.6] scale-105' : 'stroke-[1.8]'
                }`}
              />
              {item.isActive && (
                <span className="text-xs font-black tracking-tight animate-fade-in whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
