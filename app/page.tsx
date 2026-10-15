'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, Play, Smile, Gift, Zap } from 'lucide-react';
import { HumoraLogo } from '../components/brand/HumoraLogo';

export default function EntryPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<'splash' | 'entry'>('splash');

  // Auto transition from splash to entry screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase('entry');
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleSkipToEntry = () => {
    setPhase('entry');
  };

  const handleExplore = () => {
    router.push('/home');
  };

  return (
    <div
      onClick={phase === 'splash' ? handleSkipToEntry : undefined}
      className="relative flex-1 flex flex-col justify-between items-center p-6 bg-[#FFD52E] text-[#21052F] select-none min-h-full overflow-hidden"
    >
      {/* Playful Floating Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-right sparkle */}
        <div className="absolute top-8 right-6 w-8 h-8 text-[#4B0B7A]/30">
          <Sparkles className="w-full h-full animate-pulse" />
        </div>
        {/* Top-left mini star */}
        <div className="absolute top-16 left-8 w-4 h-4 rounded-full bg-[#4B0B7A]/20" />
        {/* Mid-right small play button bubble */}
        <div className="absolute top-1/3 -right-3 w-14 h-14 rounded-full bg-white/30 backdrop-blur-xs flex items-center justify-center text-[#4B0B7A]">
          <Play className="w-6 h-6 fill-current ml-1" />
        </div>
        {/* Mid-left curved stroke line */}
        <div className="absolute top-2/5 -left-4 w-16 h-16 rounded-full border-4 border-[#4B0B7A]/25 border-dashed" />
        {/* Bottom-left smile */}
        <div className="absolute bottom-24 left-8 text-[#4B0B7A]/30">
          <Smile className="w-8 h-8" />
        </div>
        {/* Bottom-right sparkle */}
        <div className="absolute bottom-36 right-10 w-6 h-6 text-[#4B0B7A]/35">
          <Sparkles className="w-full h-full" />
        </div>
      </div>

      {/* PHASE 1: SPLASH SCREEN */}
      {phase === 'splash' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in z-10 w-full cursor-pointer">
          <div className="transform transition-transform scale-110 sm:scale-125 mb-4 animate-pulse-glow">
            <HumoraLogo size="lg" showTagline />
          </div>

          <p className="text-xs text-[#21052F]/70 font-semibold mt-6 tracking-wide">
            Sentuh layar untuk melanjutkan
          </p>
        </div>
      )}

      {/* PHASE 2: ENTRY / ONBOARDING SCREEN */}
      {phase === 'entry' && (
        <div className="flex-1 flex flex-col justify-between items-center w-full max-w-xs text-center z-10 animate-fade-in py-6">
          {/* Top Brand Logo */}
          <div className="mt-4">
            <HumoraLogo size="lg" showTagline />
          </div>

          {/* Middle Value Proposition Card */}
          <div className="my-auto flex flex-col items-center">
            <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-[#4B0B7A]/10 border-2 border-[#21052F] flex items-center justify-center text-[#4B0B7A] mb-5 transform -rotate-3 hover:rotate-0 transition-transform">
              <Play className="w-10 h-10 fill-[#FFD52E] text-[#21052F] stroke-[2.5] ml-1" />
            </div>

            <h2 className="text-2xl font-black text-[#21052F] tracking-tight leading-tight">
              Cerita Seru, <br /> Tawa Tanpa Henti.
            </h2>

            <p className="text-xs sm:text-sm text-[#21052F]/80 mt-2.5 max-w-[260px] leading-relaxed font-medium">
              Streaming series komedi dan drama pendek Indonesia dengan episode praktis yang bikin nagih.
            </p>

            {/* Quick highlight tags */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-[11px] font-bold bg-white/70 px-2.5 py-1 rounded-full border border-[#21052F]/15 flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5 text-[#4B0B7A]" />
                <span>Gratis 2 Episode</span>
              </span>
              <span className="text-[11px] font-bold bg-white/70 px-2.5 py-1 rounded-full border border-[#21052F]/15 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#4B0B7A]" />
                <span>Tanpa Wajib Login</span>
              </span>
            </div>
          </div>

          {/* Bottom Action Area */}
          <div className="w-full space-y-3 mt-4">
            <button
              onClick={handleExplore}
              className="w-full py-4 px-6 rounded-2xl bg-[#21052F] hover:bg-[#340847] active:scale-97 text-white font-bold text-sm sm:text-base shadow-xl shadow-[#21052F]/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Jelajahi HUMORA</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="text-xs font-semibold text-[#21052F]/80 pt-1">
              Sudah punya akun?{' '}
              <Link
                href="/auth/login"
                className="font-bold underline text-[#4B0B7A] hover:text-black transition-colors"
              >
                Masuk di sini
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
