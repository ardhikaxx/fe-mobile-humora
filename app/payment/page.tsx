'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  QrCode,
  CreditCard,
  Wallet,
  ShieldCheck,
  Tag,
  Check,
  AlertCircle,
} from 'lucide-react';
import { AppHeader } from '../../components/layout/AppHeader';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { useHumora } from '../../lib/context/HumoraContext';
import { DEMO_PROMO_CODES } from '../../lib/data/subscriptionPlans';
import { formatRupiah } from '../../lib/utils/formatters';

interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  icon: React.ElementType;
  description: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'qris',
    name: 'QRIS Instant',
    type: 'Instant Pay',
    icon: QrCode,
    description: 'BCA, Mandiri, GoPay, OVO, ShopeePay, Dana',
  },
  {
    id: 'ewallet',
    name: 'E-Wallet (GoPay / OVO)',
    type: 'Dompet Digital',
    icon: Wallet,
    description: 'Terhubung langsung ke akun dompet digitalmu',
  },
  {
    id: 'va_bank',
    name: 'Virtual Account Bank',
    type: 'Transfer Bank',
    icon: CreditCard,
    description: 'BCA, Mandiri, BNI, BRI Virtual Account',
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const {
    selectedPlan,
    activatePremium,
    user,
    activeEpisodeTarget,
    showToast,
  } = useHumora();

  const plan = selectedPlan;

  const [selectedMethod, setSelectedMethod] = useState('qris');
  const [promoInput, setPromoInput] = useState('HUMORAHEMAT');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('HUMORAHEMAT');
  const [promoError, setPromoError] = useState('');
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!plan) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-sm text-[#786F7D] mb-4">Belum ada paket yang dipilih.</p>
        <button
          onClick={() => router.push('/subscription')}
          className="py-2.5 px-4 rounded-xl bg-[#4B0B7A] text-white text-xs font-bold"
        >
          Pilih Paket Sekarang
        </button>
      </div>
    );
  }

  // Calculate pricing
  const originalAmount = plan.price;
  const promoData = appliedPromo ? DEMO_PROMO_CODES[appliedPromo] : null;
  const discountAmount = promoData
    ? Math.round(originalAmount * (promoData.discountPercent / 100))
    : 0;
  const totalAmount = originalAmount - discountAmount;

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoInput.trim().toUpperCase();
    if (!code) {
      setAppliedPromo(null);
      return;
    }

    if (DEMO_PROMO_CODES[code]) {
      setAppliedPromo(code);
      showToast(`Promo ${code} berhasil dipasang! Diskon ${DEMO_PROMO_CODES[code].discountPercent}%`);
    } else {
      setPromoError('Kode promo tidak valid. Coba: HUMORAHEMAT atau TAWALAGI');
    }
  };

  const handleConfirmPayment = () => {
    setIsConfirmModalOpen(false);
    setIsProcessing(true);

    const chosenMethod = PAYMENT_METHODS.find((m) => m.id === selectedMethod)?.name || 'QRIS';

    setTimeout(() => {
      activatePremium(plan.id, chosenMethod, appliedPromo || undefined);
      setIsProcessing(false);
      router.push('/payment/success');
    }, 750);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-12">
      <AppHeader title="Checkout Simulasi" showBack />

      <div className="px-5 pt-3">
        {/* Account Info Pill */}
        <div className="p-3 bg-white rounded-2xl border border-[#EEE8F0] shadow-xs flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] text-[#786F7D] uppercase font-bold tracking-wider block">
              Akun Pembeli
            </span>
            <span className="text-xs font-bold text-[#24172B]">
              {user?.name || 'Tamu Pengguna'}
            </span>
            <span className="text-[11px] text-[#786F7D] block">
              {user?.email || 'user@humora.id'}
            </span>
          </div>

          <span className="text-[10px] font-bold text-[#21865B] bg-[#EAF8F1] px-2.5 py-1 rounded-full border border-[#21865B]/20">
            Terverifikasi
          </span>
        </div>

        {/* Plan Summary Card */}
        <div className="p-4 bg-[#F6F1F8] rounded-2xl border border-[#EEE8F0] mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-[#4B0B7A]">
              Paket yang Dipilih
            </span>
            <button
              onClick={() => router.push('/subscription')}
              className="text-[11px] font-bold text-[#7028B8] hover:underline"
            >
              Ubah
            </button>
          </div>

          <h3 className="text-base font-black text-[#24172B]">{plan.name}</h3>
          <p className="text-xs text-[#786F7D] mt-0.5">
            Akses tak terbatas selama {plan.periodLabel}
          </p>

          {activeEpisodeTarget && (
            <div className="mt-2 text-[11px] text-[#4B0B7A] font-semibold bg-white/70 px-2.5 py-1 rounded-lg border border-[#EEE8F0]">
              🎯 Langsung lanjut nonton Episode {activeEpisodeTarget.episodeId} setelah bayar
            </div>
          )}
        </div>

        {/* Promo Code Input */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-[#24172B] mb-1.5">
            Punya Kode Promo?
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[#786F7D]">
                <Tag className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                placeholder="cth. HUMORAHEMAT"
                className="w-full pl-9 pr-3 py-2.5 bg-white rounded-xl border border-[#EEE8F0] text-xs font-bold uppercase text-[#24172B] focus:outline-none focus:border-[#7028B8]"
              />
            </div>
            <button
              type="button"
              onClick={handleApplyPromo}
              className="px-4 py-2.5 rounded-xl bg-[#21052F] text-white text-xs font-bold active:scale-95 transition-all"
            >
              Pasang
            </button>
          </div>

          {promoError && (
            <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{promoError}</span>
            </p>
          )}

          {appliedPromo && promoData && (
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#21865B] bg-[#EAF8F1] px-2.5 py-1 rounded-lg">
              <span>{promoData.description} (-{promoData.discountPercent}%)</span>
              <button
                onClick={() => {
                  setAppliedPromo(null);
                  setPromoInput('');
                }}
                className="font-bold underline text-red-600 ml-2"
              >
                Hapus
              </button>
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div className="mb-5">
          <label className="block text-xs font-bold text-[#24172B] mb-2">
            Pilih Metode Pembayaran
          </label>

          <div className="space-y-2">
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;

              return (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all cursor-pointer select-none active:scale-99 ${
                    isSelected
                      ? 'bg-white border-[#7028B8] shadow-sm'
                      : 'bg-white border-[#EEE8F0] hover:border-[#D8D0DE]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#4B0B7A] text-[#FFD52E]'
                          : 'bg-[#F6F1F8] text-[#7028B8]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#24172B]">
                        {method.name}
                      </h4>
                      <p className="text-[11px] text-[#786F7D]">
                        {method.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-[#4B0B7A] bg-[#4B0B7A] text-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="p-4 bg-white rounded-2xl border border-[#EEE8F0] space-y-2 text-xs shadow-xs mb-5">
          <div className="flex items-center justify-between text-[#786F7D]">
            <span>Harga Paket ({plan.periodLabel})</span>
            <span>{formatRupiah(originalAmount)}</span>
          </div>

          {discountAmount > 0 && (
            <div className="flex items-center justify-between text-[#21865B] font-semibold">
              <span>Diskon Promo ({appliedPromo})</span>
              <span>-{formatRupiah(discountAmount)}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-[#786F7D]">
            <span>Biaya Layanan Simulasi</span>
            <span className="text-[#21865B] font-bold">GRATIS</span>
          </div>

          <div className="border-t border-[#EEE8F0] pt-2 flex items-center justify-between font-black text-sm text-[#24172B]">
            <span>Total Pembayaran</span>
            <span className="text-base text-[#4B0B7A]">
              {formatRupiah(totalAmount)}
            </span>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={() => setIsConfirmModalOpen(true)}
          disabled={isProcessing}
          className="w-full py-4 px-6 rounded-2xl bg-[#4B0B7A] hover:bg-[#38065C] active:scale-98 text-white font-bold text-sm sm:text-base shadow-md shadow-[#4B0B7A]/20 flex items-center justify-center gap-2 transition-all disabled:opacity-70"
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <span>Bayar Sekarang ({formatRupiah(totalAmount)})</span>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#786F7D] mt-3">
          <ShieldCheck className="w-3.5 h-3.5 text-[#21865B]" />
          <span>Simulasi instan tanpa kartu kredit nyata</span>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        title="Konfirmasi Pembayaran Demo"
        description={`Kamu akan mengaktifkan "${plan.name}" seharga ${formatRupiah(
          totalAmount
        )} secara simulasi. Tidak ada uang riil yang ditarik.`}
        confirmLabel="Konfirmasi Pembayaran"
        cancelLabel="Batal"
        onConfirm={handleConfirmPayment}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
}
