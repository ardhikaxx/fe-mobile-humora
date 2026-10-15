'use client';

import React, { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';
import { Toast } from '../ui/Toast';
import { SubscriptionBottomSheet } from '../subscription/SubscriptionBottomSheet';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen w-full bg-[#FFFDF7] flex justify-center font-sans text-[#24172B] antialiased">
      {/* Dynamic Global Toast */}
      <Toast />

      {/* Episode Lock Subscription Bottom Sheet */}
      <SubscriptionBottomSheet />

      {/* Clean responsive page container without phone frame or bezel */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-[#FFFDF7] relative shadow-none sm:border-x sm:border-[#EEE8F0]">
        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative">
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center p-8 text-[#4B0B7A]">
                <Loader2 className="w-8 h-8 text-[#4B0B7A] animate-spin" />
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
