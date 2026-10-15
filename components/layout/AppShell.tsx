'use client';

import React, { Suspense } from 'react';
import { StatusBarMock } from './StatusBarMock';
import { BottomNavigation } from './BottomNavigation';
import { Toast } from '../ui/Toast';
import { SubscriptionBottomSheet } from '../subscription/SubscriptionBottomSheet';
import { DemoToolbar } from '../demo/DemoToolbar';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen w-full bg-[#F3EFE9] flex items-center justify-center sm:py-8 sm:px-4 relative font-sans text-[#24172B]">
      {/* External Desktop Demo Toolbar (Strictly outside smartphone viewport) */}
      <Suspense fallback={null}>
        <DemoToolbar />
      </Suspense>

      {/* SMARTPHONE VIRTUAL FRAME / MOBILE VIEWPORT CONTAINER */}
      <div className="w-full sm:max-w-[414px] sm:h-[880px] sm:max-h-[92vh] sm:rounded-[48px] sm:border-[10px] sm:border-[#1E1226] sm:shadow-[0_25px_60px_-15px_rgba(33,5,47,0.28)] flex flex-col relative bg-[#FFFDF7] overflow-hidden min-h-screen sm:min-h-0">
        
        {/* Mock Status Bar for Desktop Screenshot Preview */}
        <StatusBarMock />

        {/* Dynamic Global Toast */}
        <Toast />

        {/* Episode Lock Subscription Bottom Sheet */}
        <SubscriptionBottomSheet />

        {/* Scrollable Screen Content Area */}
        <main className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden no-scrollbar relative">
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center p-8 text-[#4B0B7A]">
                <div className="w-8 h-8 border-3 border-[#4B0B7A] border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            {children}
          </Suspense>
        </main>

        {/* Persistent Bottom Navigation */}
        <Suspense fallback={null}>
          <BottomNavigation />
        </Suspense>
      </div>
    </div>
  );
}
