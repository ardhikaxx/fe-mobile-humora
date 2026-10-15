import React from 'react';
import { Wifi, BatteryMedium } from 'lucide-react';

export function StatusBarMock() {
  return (
    <div className="hidden sm:flex items-center justify-between px-6 pt-3 pb-2 w-full text-xs font-semibold text-[#24172B] select-none bg-transparent shrink-0 z-20">
      <span>09:41</span>
      
      {/* Sleek Dynamic Island Pill */}
      <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-[#1A1A1A] mr-6"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#0D3820]"></div>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="flex items-end gap-0.5 h-3">
          <span className="w-0.5 h-1 bg-[#24172B] rounded-xs"></span>
          <span className="w-0.5 h-1.5 bg-[#24172B] rounded-xs"></span>
          <span className="w-0.5 h-2 bg-[#24172B] rounded-xs"></span>
          <span className="w-0.5 h-2.5 bg-[#24172B] rounded-xs"></span>
        </div>
        <Wifi className="w-3.5 h-3.5" />
        <BatteryMedium className="w-4 h-4" />
      </div>
    </div>
  );
}
