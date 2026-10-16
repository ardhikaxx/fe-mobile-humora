'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Bell,
  Sparkles,
  Film,
  Tag,
  CreditCard,
  CheckCheck,
} from 'lucide-react';
import { AppHeader } from '../../components/layout/AppHeader';
import { useHumora } from '../../lib/context/HumoraContext';
import { NotificationItemData } from '../../lib/types';

export default function NotificationsPage() {
  const router = useRouter();
  const {
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useHumora();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications =
    activeFilter === 'all'
      ? notifications
      : notifications.filter((n) => !n.read);

  const handleNotificationClick = (item: NotificationItemData) => {
    markNotificationAsRead(item.id);
    if (item.linkUrl) {
      router.push(item.linkUrl);
    }
  };

  const getCategoryIcon = (category: NotificationItemData['category']) => {
    switch (category) {
      case 'episode_baru':
        return <Film className="w-4 h-4 text-[#7028B8]" />;
      case 'series_baru':
        return <Sparkles className="w-4 h-4 text-[#E58A16]" />;
      case 'promo':
        return <Tag className="w-4 h-4 text-[#21865B]" />;
      case 'langganan':
        return <CreditCard className="w-4 h-4 text-[#4B0B7A]" />;
      default:
        return <Bell className="w-4 h-4 text-[#7028B8]" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-24">
      <AppHeader
        title="Notifikasi"
        showBack
        rightAction={
          unreadCount > 0 ? (
            <button
              onClick={markAllNotificationsAsRead}
              className="text-xs font-semibold text-[#7028B8] hover:underline flex items-center gap-1 p-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Tandai dibaca</span>
            </button>
          ) : undefined
        }
      />

      <div className="px-5 pt-3">
        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setActiveFilter('all')}
            className={`py-1.5 px-3.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#4B0B7A] text-white shadow-xs'
                : 'bg-white border border-[#EEE8F0] text-[#786F7D]'
            }`}
          >
            Semua ({notifications.length})
          </button>

          <button
            onClick={() => setActiveFilter('unread')}
            className={`py-1.5 px-3.5 rounded-full text-xs font-semibold transition-all ${
              activeFilter === 'unread'
                ? 'bg-[#4B0B7A] text-white shadow-xs'
                : 'bg-white border border-[#EEE8F0] text-[#786F7D]'
            }`}
          >
            Belum Dibaca ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-2.5">
            {filteredNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none active:scale-99 ${
                  !item.read
                    ? 'bg-white border-[#7028B8]/30 shadow-xs ring-1 ring-[#7028B8]/15'
                    : 'bg-white/80 border-[#EEE8F0] hover:border-[#D8D0DE]'
                }`}
              >
                {/* Thumbnail or Category Icon */}
                <div className="relative shrink-0">
                  {item.thumbnail ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-11 h-11 rounded-xl object-cover border border-[#EEE8F0]"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-[#F6F1F8] flex items-center justify-center">
                      {getCategoryIcon(item.category)}
                    </div>
                  )}

                  {!item.read && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D94152] ring-2 ring-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4
                      className={`text-xs sm:text-sm font-bold truncate ${
                        !item.read ? 'text-[#24172B]' : 'text-[#5A5160]'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-[#A39CA9] shrink-0 font-medium">
                      {item.time}
                    </span>
                  </div>

                  <p className="text-xs text-[#786F7D] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 mt-10">
            <div className="w-16 h-16 rounded-3xl bg-[#F6F1F8] text-[#7028B8] flex items-center justify-center mb-3">
              <Bell className="w-8 h-8" />
            </div>

            <h3 className="text-base font-bold text-[#24172B]">
              Belum ada notifikasi baru
            </h3>

            <p className="text-xs text-[#786F7D] mt-1 max-w-xs leading-relaxed">
              Semua info penting mengenai rilis video terbaru dan promo akan muncul di sini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
