'use client';

import React from 'react';
import { useHumora } from '../../lib/context/HumoraContext';

export function Toast() {
  const { toastMessage } = useHumora();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 max-w-[90%] pointer-events-none animate-fade-in">
      <div className="bg-[#21052F] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full shadow-lg border border-white/10 flex items-center gap-2 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#FFD52E] animate-pulse"></span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
