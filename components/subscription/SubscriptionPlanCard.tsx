'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { SubscriptionPlan } from '../../lib/types';
import { formatRupiah } from '../../lib/utils/formatters';

interface SubscriptionPlanCardProps {
  plan: SubscriptionPlan;
  isSelected: boolean;
  onSelect: (plan: SubscriptionPlan) => void;
}

export function SubscriptionPlanCard({
  plan,
  isSelected,
  onSelect,
}: SubscriptionPlanCardProps) {
  return (
    <div
      onClick={() => onSelect(plan)}
      className={`relative w-full rounded-2xl p-4 sm:p-5 transition-all duration-200 cursor-pointer select-none border-2 ${
        isSelected
          ? 'bg-[#F6F1F8] border-[#7028B8] shadow-md shadow-[#7028B8]/10'
          : 'bg-white border-[#EEE8F0] hover:border-[#D8D0DE]'
      }`}
    >
      {/* Badge Pill on top right if present */}
      {plan.badge && (
        <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#FFD52E] text-[#21052F] text-[10px] font-black uppercase tracking-wider shadow-xs">
          {plan.badge}
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        {/* Left Info */}
        <div className="flex items-start gap-3">
          {/* Custom Radio / Checkbox Indicator */}
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all mt-0.5 shrink-0 ${
              isSelected
                ? 'bg-[#4B0B7A] border-[#4B0B7A] text-white'
                : 'border-gray-300 bg-white'
            }`}
          >
            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-bold text-[#24172B]">
              {plan.name}
            </h4>
            <span className="text-xs text-[#786F7D] font-medium block mt-0.5">
              Durasi {plan.periodLabel}
            </span>
            <p className="text-[11px] text-[#786F7D] mt-1 line-clamp-1">
              {plan.description}
            </p>
          </div>
        </div>

        {/* Right Pricing */}
        <div className="text-right shrink-0">
          {plan.originalPrice && (
            <span className="text-[11px] text-[#A39CA9] line-through block">
              {formatRupiah(plan.originalPrice)}
            </span>
          )}
          <span className="text-base sm:text-lg font-black text-[#4B0B7A]">
            {formatRupiah(plan.price)}
          </span>
          {plan.perMonthPrice && plan.durationDays > 30 && (
            <span className="text-[10px] text-[#21865B] font-bold block mt-0.5">
              ~{formatRupiah(plan.perMonthPrice)}/bln
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
