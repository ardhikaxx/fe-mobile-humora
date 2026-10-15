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
    <>
      {/* Top spacer to ensure page content starts naturally below the floating header */}
      <div className="w-full h-16 sm:h-[68px] shrink-0 pointer-events-none" aria-hidden="true" />

      {/* Modern Floating Capsule Header Bar */}
      <header className="fixed top-2.5 sm:top-3 inset-x-0 z-40 flex justify-center pointer-events-none px-3 select-none pt-[calc(env(safe-area-inset-top,0px))]">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-[#EEE8F0] shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-full px-3.5 sm:px-4 py-2 flex items-center justify-between w-[95%] max-w-[410px] min-h-[52px] transition-all">
          <div className="flex items-center gap-2.5 min-w-0">
            {showBack && (
              <button
                onClick={handleBack}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#24172B] hover:bg-[#F6F1F8] active:scale-95 transition-all shrink-0"
                aria-label="Kembali"
              >
                <ArrowLeft className="w-4.5 h-4.5 stroke-[2.3]" />
              </button>
            )}

            {showLogo && !title && (
              <Link href="/home" className="hover:opacity-95 transition-opacity shrink-0 flex items-center">
                <HumoraLogo size="sm" />
              </Link>
            )}

            {title && (
              <h1 className="text-xs sm:text-sm font-bold text-[#24172B] tracking-tight truncate max-w-[210px] sm:max-w-[240px]">
                {title}
              </h1>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {rightAction ? (
              rightAction
            ) : (
              <>
                {/* Notification Bell */}
                <Link
                  href="/notifications"
                  className="relative w-8 h-8 rounded-full flex items-center justify-center text-[#24172B] hover:bg-[#F6F1F8] active:scale-95 transition-all"
                  aria-label="Notifikasi"
                >
                  <Bell className="w-4.5 h-4.5 text-[#4B0B7A]" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D94152] ring-2 ring-white"></span>
                  )}
                </Link>

                {/* Profile Avatar / Quick Link */}
                <Link
                  href="/profile"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-[#FFD52E] flex items-center justify-center bg-[#F6F1F8] hover:ring-2 hover:ring-[#7028B8]/30 transition-all active:scale-95"
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
        </div>
      </header>
    </>
  );
}
