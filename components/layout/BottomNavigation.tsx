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
    <nav className="sticky bottom-0 z-30 w-full bg-[#FFFDF7]/95 backdrop-blur-md border-t border-[#EEE8F0] px-3 pt-2 pb-3 safe-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 py-1 group transition-all duration-150 ${
                item.isActive ? 'text-[#4B0B7A]' : 'text-[#786F7D] hover:text-[#24172B]'
              }`}
            >
              <div
                className={`relative px-4 py-1 rounded-full transition-all duration-200 ${
                  item.isActive ? 'bg-[#FFD52E]' : 'bg-transparent group-hover:bg-[#F6F1F8]'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    item.isActive ? 'stroke-[2.5] scale-110 text-[#21052F]' : 'stroke-[1.8]'
                  }`}
                />
              </div>
              <span
                className={`text-[11px] mt-0.5 tracking-tight font-medium transition-all ${
                  item.isActive ? 'font-bold text-[#21052F]' : 'text-[#786F7D]'
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
