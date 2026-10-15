'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, Bell, User, Crown } from 'lucide-react';
import { HumoraLogo } from '../brand/HumoraLogo';
import { useHumora } from '../../lib/context/HumoraContext';

interface AppHeaderProps {
  title?: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  showLogo?: boolean;
  rightAction?: React.ReactNode;
  showProfile?: boolean;
  showNotification?: boolean;
  children?: React.ReactNode;
  withTopSpacer?: boolean;
}

export function AppHeader({
  title,
  showBack = false,
  onBack,
  showLogo = true,
  rightAction,
  showProfile,
  showNotification,
  children,
  withTopSpacer,
}: AppHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, subscription, notifications } = useHumora();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const isHome = pathname === '/home';
  const isSearch = pathname === '/search';
  const isProfile = pathname === '/profile' || pathname?.startsWith('/profile');
  const isHistory = pathname === '/history';
  const isSeriesDetail = pathname?.startsWith('/series/');
  const isSubscription = pathname === '/subscription' || pathname?.startsWith('/subscription');
  const isPayment = pathname === '/payment' || pathname?.startsWith('/payment');
  const isNotifications = pathname === '/notifications' || pathname?.startsWith('/notifications');
  const displayName = user?.name ? user.name.split(' ')[0] : 'Tamu';
  const isPremium = subscription?.status === 'active';

  const isSubPageOrSpecial = isSearch || isProfile || isHistory || isSeriesDetail || isSubscription || isPayment || isNotifications;

  const shouldShowProfile = showProfile !== undefined ? showProfile : !isSubPageOrSpecial;
  const shouldShowNotification = showNotification !== undefined ? showNotification : !isSubPageOrSpecial;
  const shouldHaveTopSpacer = withTopSpacer !== undefined ? withTopSpacer : !isSeriesDetail;

  return (
    <>
      {/* Top spacer to ensure page content starts naturally below the floating header */}
      {shouldHaveTopSpacer && (
        <div className="w-full h-16 sm:h-[68px] shrink-0 pointer-events-none" aria-hidden="true" />
      )}

      {/* Modern Floating Capsule Header Bar */}
      <header className="fixed top-2.5 sm:top-3 inset-x-0 z-40 flex justify-center pointer-events-none px-3 pt-[calc(env(safe-area-inset-top,0px))]">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-[#EEE8F0] shadow-[0_2px_8px_rgba(0,0,0,0.04)] rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between w-[95%] max-w-[410px] min-h-[54px] sm:min-h-[56px] transition-all">
          {children ? (
            <div className="flex items-center gap-2.5 w-full">
              {showBack && (
                <button
                  onClick={handleBack}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#24172B] hover:bg-[#F6F1F8] active:scale-95 transition-all shrink-0 select-none"
                  aria-label="Kembali"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5] -ml-0.5 text-[#24172B]" />
                </button>
              )}
              <div className="flex-1 flex items-center min-w-0">
                {children}
              </div>
              {rightAction && (
                <div className="shrink-0 flex items-center">
                  {rightAction}
                </div>
              )}
            </div>
          ) : (
            <>
          {/* LEFT SIDE */}
          {isHome ? (
            /* Layout Beranda: Foto profil di sebelah paling kiri diikuti dengan Hai, Nama pengguna & status sub-header */
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <Link
                href="/profile"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#EEE8F0] shadow-xs flex items-center justify-center bg-[#F6F1F8] shrink-0 hover:ring-2 hover:ring-[#7028B8]/30 transition-all active:scale-95"
                aria-label="Profil Saya"
              >
                {user?.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-[#4B0B7A]" />
                )}
              </Link>

              <div className="flex flex-col min-w-0 justify-center">
                <Link
                  href="/profile"
                  className="text-xs sm:text-sm font-bold text-[#24172B] tracking-tight truncate max-w-[170px] sm:max-w-[210px] leading-tight hover:text-[#4B0B7A] transition-colors"
                >
                  Hai, {displayName}
                </Link>

                {isPremium ? (
                  <Link
                    href="/profile/subscription"
                    className="text-[10px] sm:text-[11px] font-bold text-[#7028B8] flex items-center gap-1 leading-tight mt-0.5 hover:opacity-85 transition-opacity"
                  >
                    <Crown className="w-2.5 h-2.5 text-[#FFB800] fill-[#FFB800]" />
                    <span>Humora Premium</span>
                  </Link>
                ) : (
                  <Link
                    href="/subscription"
                    className="text-[10px] sm:text-[11px] font-bold text-[#7028B8] hover:text-[#4B0B7A] flex items-center gap-0.5 leading-tight mt-0.5 group/vip transition-colors"
                  >
                    <span>Upgrade ke VIP</span>
                    <ChevronRight className="w-3 h-3 stroke-[2.5] text-[#7028B8] group-hover/vip:translate-x-0.5 transition-transform" />
                  </Link>
                )}
              </div>
            </div>
          ) : (
            /* Layout Halaman Lain: Back button, Logo, atau Judul */
            <div className="flex items-center gap-2.5 min-w-0">
              {showBack && (
                <button
                  onClick={handleBack}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#24172B] hover:bg-[#F6F1F8] active:scale-95 transition-all shrink-0"
                  aria-label="Kembali"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5] -ml-0.5 text-[#24172B]" />
                </button>
              )}

              {showLogo && !title && (
                <Link href="/home" className="hover:opacity-95 transition-opacity shrink-0 flex items-center">
                  <HumoraLogo size="sm" />
                </Link>
              )}

              {title && (
                typeof title === 'string' ? (
                  <h1 className="text-sm sm:text-base font-bold text-[#24172B] tracking-tight truncate max-w-[210px] sm:max-w-[240px]">
                    {title}
                  </h1>
                ) : (
                  title
                )
              )}
            </div>
          )}

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 shrink-0">
            {rightAction ? (
              rightAction
            ) : isHome ? (
              /* Di beranda, di seberang kanan khusus icon bell notifikasi */
              shouldShowNotification ? (
                <Link
                  href="/notifications"
                  className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[#24172B] hover:bg-[#F6F1F8] active:scale-95 transition-all"
                  aria-label="Notifikasi"
                >
                  <Bell className="w-5 h-5 text-[#4B0B7A]" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D94152] ring-2 ring-white"></span>
                  )}
                </Link>
              ) : null
            ) : (
              /* Di halaman lain: Bell + Avatar Quick Link (hanya tampil bila diizinkan) */
              <>
                {shouldShowNotification && (
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
                )}

                {shouldShowProfile && (
                  <Link
                    href="/profile"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#EEE8F0] flex items-center justify-center bg-[#F6F1F8] hover:ring-2 hover:ring-[#7028B8]/30 transition-all active:scale-95"
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
                )}
              </>
            )}
          </div>
            </>
          )}
        </div>
      </header>
    </>
  );
}
