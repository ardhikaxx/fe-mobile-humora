'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  QrCode,
  CreditCard,
  Wallet,
  Check,
  Target,
  Loader2,
} from 'lucide-react';
import { AppHeader } from '../../components/layout/AppHeader';
import { ConfirmationModal } from '../../components/ui/ConfirmationModal';
import { useHumora } from '../../lib/context/HumoraContext';
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
  } = useHumora();

  const plan = selectedPlan;

  const [selectedMethod, setSelectedMethod] = useState('qris');
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
  const totalAmount = plan.price;

  const handleConfirmPayment = () => {
    setIsConfirmModalOpen(false);
    setIsProcessing(true);

    const chosenMethod = PAYMENT_METHODS.find((m) => m.id === selectedMethod)?.name || 'QRIS';

    setTimeout(() => {
      activatePremium(plan.id, chosenMethod);
      setIsProcessing(false);
      router.push('/payment/success');
    }, 750);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-12">
      <AppHeader
        title="Checkout"
        showBack
        showProfile={false}
        showNotification={false}
      />

      <div className="px-5 pt-3">
        {/* Account Info Pill */}
        <div className="p-3.5 bg-white rounded-2xl border border-[#EEE8F0] shadow-xs mb-4">
          <span className="text-[10px] text-[#786F7D] uppercase font-bold tracking-wider block mb-0.5">
            Akun Pembeli
          </span>
          <span className="text-xs font-bold text-[#24172B] block">
            {user?.name || 'Tamu Pengguna'}
          </span>
          <span className="text-[11px] text-[#786F7D] block">
            {user?.email || 'user@humora.id'}
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
            <div className="mt-2 text-[11px] text-[#4B0B7A] font-semibold bg-white/70 px-2.5 py-1.5 rounded-lg border border-[#EEE8F0] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#7028B8] shrink-0" />
              <span>Langsung lanjut nonton Episode {activeEpisodeTarget.episodeId} setelah bayar</span>
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
            <span>{formatRupiah(totalAmount)}</span>
          </div>

          <div className="flex items-center justify-between text-[#786F7D]">
            <span>Biaya Layanan</span>
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
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <span>Bayar Sekarang ({formatRupiah(totalAmount)})</span>
          )}
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        title="Konfirmasi Pembayaran"
        description={`Kamu akan mengaktifkan "${plan.name}" seharga ${formatRupiah(
          totalAmount
        )}.`}
        confirmLabel="Konfirmasi Pembayaran"
        cancelLabel="Batal"
        onConfirm={handleConfirmPayment}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
}
