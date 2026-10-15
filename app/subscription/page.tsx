'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Crown,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Info,
} from 'lucide-react';
import { AppHeader } from '../../components/layout/AppHeader';
import { SUBSCRIPTION_PLANS } from '../../lib/data/subscriptionPlans';
import { SubscriptionPlanCard } from '../../components/subscription/SubscriptionPlanCard';
import { useHumora } from '../../lib/context/HumoraContext';
import { formatRupiah } from '../../lib/utils/formatters';

export default function SubscriptionPage() {
  const router = useRouter();
  const { user, selectPlan, selectedPlan, setPendingRedirectUrl } = useHumora();

  const [activePlan, setActivePlan] = useState(selectedPlan || SUBSCRIPTION_PLANS[1]);

  const handleSelect = (plan: typeof activePlan) => {
    setActivePlan(plan);
    selectPlan(plan.id);
  };

  const handleContinue = () => {
    selectPlan(activePlan.id);

    if (!user) {
      // Save checkout as destination after login
      setPendingRedirectUrl('/payment');
      router.push('/auth/login');
    } else {
      router.push('/payment');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-24">
      {/* App Header with Back button */}
      <AppHeader title="Paket Premium" showBack />

      <div className="px-5 pt-3">
        {/* Banner Title */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9E0] text-[#7028B8] text-xs font-bold mb-2 border border-[#FFD52E]">
            <Crown className="w-3.5 h-3.5 text-[#4B0B7A]" />
            <span>HUMORA PREMIUM ACCESS</span>
          </div>
          <h2 className="text-2xl font-black text-[#24172B] tracking-tight">
            Pilih Paket Premium
          </h2>
          <p className="text-xs sm:text-sm text-[#786F7D] mt-1 max-w-xs mx-auto leading-relaxed">
            Nikmati setiap episode tanpa jeda cerita. Tawa tanpa batas sepuasnya.
          </p>
        </div>

        {/* Plan Cards Stack */}
        <div className="space-y-3">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <SubscriptionPlanCard
              key={plan.id}
              plan={plan}
              isSelected={activePlan.id === plan.id}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {/* Plan Features Checklist */}
        <div className="mt-6 bg-white rounded-2xl p-4 sm:p-5 border border-[#EEE8F0] shadow-xs">
          <h4 className="text-xs font-bold text-[#24172B] uppercase tracking-wider mb-3">
            Keuntungan {activePlan.name}
          </h4>
          <div className="space-y-2">
            {activePlan.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs text-[#24172B]">
                <CheckCircle2 className="w-4 h-4 text-[#21865B] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Prototype Disclaimer Notice */}
        <div className="mt-4 p-3 rounded-xl bg-[#F6F1F8] border border-[#EEE8F0] flex items-start gap-2.5 text-[11px] text-[#786F7D]">
          <Info className="w-4 h-4 text-[#7028B8] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Seluruh transaksi dan nominal pada aplikasi ini adalah demonstrasi prototype UI/UX. Tidak ada transaksi perbankan nyata yang diproses.
          </p>
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs text-[#786F7D]">Total Pembayaran</span>
            <span className="text-lg font-black text-[#4B0B7A]">
              {formatRupiah(activePlan.price)}
            </span>
          </div>

          <button
            onClick={handleContinue}
            className="w-full py-4 px-6 rounded-2xl bg-[#4B0B7A] hover:bg-[#38065C] active:scale-98 text-white font-bold text-sm sm:text-base shadow-md shadow-[#4B0B7A]/20 flex items-center justify-center gap-2 transition-all"
          >
            <span>Lanjutkan Pembayaran</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#786F7D] mt-2.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#21865B]" />
            <span>Garansi akses terbuka instan dalam simulasi demo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
