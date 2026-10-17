'use client';

import React from 'react';
import Link from 'next/link';
import {
  Crown,
  Calendar,
  CreditCard,
  AlertTriangle,
  Receipt,
  CheckCircle2,
} from 'lucide-react';
import { AppHeader } from '../../../components/layout/AppHeader';
import { useHumora } from '../../../lib/context/HumoraContext';
import { formatDateIndo, formatRupiah, getDaysRemaining } from '../../../lib/utils/formatters';

export default function SubscriptionDetailPage() {
  const { subscription, transactions } = useHumora();

  const daysRemaining = getDaysRemaining(subscription.endDate);
  const isActuallyActive = subscription.status === 'active';

  // Format plan details with live values or fallback to standard 3-month package
  const planName = isActuallyActive && subscription.planName ? subscription.planName : 'Paket 3 Bulan';
  const paymentMethod = isActuallyActive && subscription.paymentMethod ? subscription.paymentMethod : 'GoPay / QRIS';
  const displayDays = isActuallyActive && daysRemaining > 0 ? daysRemaining : 90;
  const startDateStr = isActuallyActive && subscription.startDate ? formatDateIndo(subscription.startDate) : '17 Oktober 2026';
  const endDateStr = isActuallyActive && subscription.endDate ? formatDateIndo(subscription.endDate) : '15 Januari 2027';

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-28">
      {/* Floating Header */}
      <AppHeader title="Detail Langganan" showBack />

      <div className="px-5 pt-1 space-y-4">
        {/* HERO STATUS CARD */}
        {subscription.status === 'expired' ? (
          <div className="p-5 sm:p-6 rounded-[28px] bg-[#FFF5E8] border-2 border-[#E58A16] text-[#24172B] shadow-xs">
            <div className="flex items-center gap-2 text-[#E58A16] mb-2">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span className="text-xs font-black uppercase tracking-wider">
                Masa Aktif Telah Berakhir
              </span>
            </div>

            <h3 className="text-base font-bold text-[#24172B]">
              {subscription.planName}
            </h3>
            <p className="text-xs text-[#786F7D] mt-1">
              Berakhir pada {formatDateIndo(subscription.endDate || '')}. Perpanjang untuk kembali menikmati video premium.
            </p>

            <Link
              href="/subscription"
              className="mt-4 w-full py-3 px-4 rounded-xl bg-[#E58A16] hover:bg-[#D47E10] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all"
            >
              <Crown className="w-4 h-4" />
              <span>Perpanjang Langganan Sekarang</span>
            </Link>
          </div>
        ) : (
          <div className="p-5 sm:p-6 rounded-[28px] bg-gradient-to-br from-[#300742] via-[#38094E] to-[#20042D] text-white shadow-md relative overflow-hidden">
            {/* Top Badge & Sisa Hari */}
            <div className="flex items-center justify-between mb-3.5">
              <div className="bg-[#FFD52E] text-[#21052F] text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
                <Crown className="w-3.5 h-3.5 fill-[#21052F]" />
                <span>PREMIUM AKTIF</span>
              </div>
              <span className="text-xs sm:text-[13px] text-[#FFD52E] font-bold">
                Sisa {displayDays} Hari
              </span>
            </div>

            {/* Plan Name & Payment Method */}
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-3.5">
              {planName}
            </h3>
            <p className="text-xs sm:text-[13px] text-[#D8D0DE] mt-1 font-medium">
              Metode Pembayaran: {paymentMethod}
            </p>

            {/* Divider Line */}
            <div className="my-4 border-t border-white/10" />

            {/* Dates Information */}
            <div className="space-y-2.5 text-xs sm:text-[13px]">
              <div className="flex items-center justify-between text-[#D8D0DE]">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D8D0DE]/80" />
                  <span>Tanggal Mulai</span>
                </span>
                <span className="font-bold text-white">
                  {startDateStr}
                </span>
              </div>

              <div className="flex items-center justify-between text-[#D8D0DE]">
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#D8D0DE]/80" />
                  <span>Masa Berlaku Hingga</span>
                </span>
                <span className="font-bold text-[#FFD52E]">
                  {endDateStr}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* KEISTIMEWAAN AKSES PREMIUM CARD */}
        <div className="p-5 sm:p-6 bg-white rounded-[28px] border border-[#EEE8F0] shadow-xs">
          <h4 className="text-xs sm:text-[13px] font-black text-[#21052F] uppercase tracking-wider mb-3.5">
            KEISTIMEWAAN AKSES PREMIUM
          </h4>
          <div className="space-y-3 text-xs sm:text-[13px] text-[#786F7D] font-medium">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>Bebas nonton seluruh video terkunci</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>Akses lebih awal untuk video terbaru</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
              <span>Streaming dengan kualitas audio visual HD</span>
            </div>
          </div>
        </div>

        {/* RIWAYAT TRANSAKSI SECTION */}
        <div className="pt-1">
          <div className="flex items-center gap-2 mb-3">
            <Receipt className="w-4.5 h-4.5 text-[#7028B8]" />
            <h4 className="text-sm sm:text-base font-black text-[#21052F] tracking-tight">
              Riwayat Transaksi
            </h4>
          </div>

          {transactions.length > 0 ? (
            <div className="space-y-2.5">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-4 bg-white rounded-2xl border border-[#EEE8F0] shadow-xs flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#24172B]">
                        {tx.planName}
                      </span>
                      <span className="text-[10px] text-[#21865B] bg-[#EAF8F1] px-1.5 py-0.2 rounded font-bold">
                        SUKSES
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#786F7D] mt-0.5">
                      <span>{formatDateIndo(tx.createdAt)}</span>
                      <span>•</span>
                      <span>{tx.paymentMethod}</span>
                    </div>

                    <span className="text-[10px] font-mono text-[#A39CA9] block mt-0.5">
                      ID: {tx.id}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs sm:text-sm font-black text-[#4B0B7A] block">
                      {formatRupiah(tx.total)}
                    </span>
                    {tx.discount > 0 && (
                      <span className="text-[10px] text-[#21865B] font-semibold block">
                        Diskon {formatRupiah(tx.discount)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 sm:p-10 bg-white rounded-[28px] border border-[#EEE8F0] text-center flex flex-col items-center justify-center shadow-xs">
              <CreditCard className="w-10 h-10 text-[#C4BED0] stroke-[1.5] mb-2.5" />
              <p className="text-xs sm:text-[13px] text-[#786F7D]">
                Belum ada catatan transaksi di sesi ini.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
