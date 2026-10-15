'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Bell, User } from 'lucide-react';
import { HumoraLogo } from '../brand/HumoraLogo';
import { useHumora } from '../../lib/context/HumoraContext';

interface AppHeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
  rightAction?: React.ReactNode;
}

export function AppHeader({
  title,
  showBack = false,
  onBack,
  showLogo = true,
  rightAction,
}: AppHeaderProps) {
  const router = useRouter();
  const { user, notifications } = useHumora();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#EEE8F0]/80 px-5 py-3.5 flex items-center justify-between min-h-[58px]">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#24172B] hover:bg-[#F6F1F8] active:scale-95 transition-all"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : null}

        {showLogo && !title ? (
          <Link href="/home" className="hover:opacity-95 transition-opacity">
            <HumoraLogo size="sm" />
          </Link>
        ) : null}

        {title && (
          <h1 className="text-base sm:text-lg font-bold text-[#24172B] tracking-tight truncate max-w-[220px]">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        {rightAction ? (
          rightAction
        ) : (
          <>
            {/* Notification Bell */}
            <Link
              href="/notifications"
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#24172B] hover:bg-[#F6F1F8] active:scale-95 transition-all"
              aria-label="Notifikasi"
            >
              <Bell className="w-5 h-5 text-[#4B0B7A]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D94152] ring-2 ring-[#FFFDF7]"></span>
              )}
            </Link>

            {/* Profile Avatar / Quick Link */}
            <Link
              href="/profile"
              className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#FFD52E] flex items-center justify-center bg-[#F6F1F8] hover:ring-2 hover:ring-[#7028B8]/30 transition-all active:scale-95"
              aria-label="Profil"
            >
              {user?.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-4 h-4 text-[#4B0B7A]" />
              )}
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
