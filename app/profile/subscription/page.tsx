'use client';

import React from 'react';
import Link from 'next/link';
import {
  Crown,
  Calendar,
  CreditCard,
  ShieldCheck,
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

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-24">
      <AppHeader title="Detail Langganan" showBack />

      <div className="px-5 pt-3">
        {/* Status Card */}
        <div className="mb-5">
          {subscription.status === 'active' ? (
            <div className="p-5 rounded-3xl bg-gradient-to-tr from-[#21052F] to-[#4B0B7A] text-white shadow-md border border-[#7028B8]">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-[#FFD52E] text-[#21052F] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Crown className="w-3 h-3 fill-current" />
                  PREMIUM AKTIF
                </span>
                <span className="text-xs text-[#FFD52E] font-bold">
                  Sisa {daysRemaining} Hari
                </span>
              </div>

              <h3 className="text-xl font-black text-white">{subscription.planName}</h3>
              <p className="text-xs text-[#D8D0DE] mt-0.5">
                Metode Pembayaran: {subscription.paymentMethod || 'QRIS Instant'}
              </p>

              <div className="mt-4 pt-4 border-t border-white/15 space-y-2 text-xs">
                <div className="flex items-center justify-between text-white/80">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Tanggal Mulai
                  </span>
                  <span className="font-semibold text-white">
                    {formatDateIndo(subscription.startDate)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-white/80">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Masa Berlaku Hingga
                  </span>
                  <span className="font-bold text-[#FFD52E]">
                    {formatDateIndo(subscription.endDate)}
                  </span>
                </div>
              </div>
            </div>
          ) : subscription.status === 'expired' ? (
            <div className="p-5 rounded-3xl bg-[#FFF5E8] border-2 border-[#E58A16] text-[#24172B] shadow-xs">
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
                Berakhir pada {formatDateIndo(subscription.endDate || '')}. Perpanjang untuk kembali menikmati episode premium.
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
            <div className="p-5 rounded-3xl bg-white border border-[#EEE8F0] text-center shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF9E0] text-[#7028B8] flex items-center justify-center mx-auto mb-2">
                <Crown className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#24172B]">Belum Berlangganan</h3>
              <p className="text-xs text-[#786F7D] mt-1 max-w-xs mx-auto">
                Saat ini kamu berada pada akses Akun Gratis (hanya 2 episode pertama).
              </p>

              <Link
                href="/subscription"
                className="mt-4 inline-flex py-2.5 px-5 rounded-xl bg-[#4B0B7A] text-white font-bold text-xs"
              >
                Pilih Paket Premium
              </Link>
            </div>
          )}
        </div>

        {/* Benefits reminder */}
        <div className="p-4 bg-white rounded-2xl border border-[#EEE8F0] shadow-xs mb-5">
          <h4 className="text-xs font-bold text-[#24172B] uppercase tracking-wider mb-2.5">
            Keistimewaan Akses Premium
          </h4>
          <div className="space-y-2 text-xs text-[#786F7D]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#21865B]" />
              <span>Bebas nonton seluruh episode terkunci</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#21865B]" />
              <span>Akses lebih awal untuk serial terbaru</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#21865B]" />
              <span>Streaming dengan kualitas audio visual HD</span>
            </div>
          </div>
        </div>

        {/* Transaction History Section */}
        <div>
          <h4 className="text-sm font-bold text-[#24172B] mb-2.5 flex items-center gap-1.5">
            <Receipt className="w-4 h-4 text-[#7028B8]" />
            Riwayat Transaksi Simulasi
          </h4>

          {transactions.length > 0 ? (
            <div className="space-y-2.5">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3.5 bg-white rounded-2xl border border-[#EEE8F0] shadow-xs flex items-center justify-between"
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
            <div className="p-6 bg-white rounded-2xl border border-[#EEE8F0] text-center text-xs text-[#786F7D]">
              <CreditCard className="w-8 h-8 mx-auto text-[#D8D0DE] mb-2" />
              <p>Belum ada catatan transaksi di sesi ini.</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-[#786F7D]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#21865B]" />
          <span>Riwayat simulasi disimpan di penyimpanan lokal browser</span>
        </div>
      </div>
    </div>
  );
}
