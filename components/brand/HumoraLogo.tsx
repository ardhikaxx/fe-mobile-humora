import React from 'react';

interface HumoraLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light' | 'white';
  showTagline?: boolean;
  className?: string;
}

export function HumoraLogo({
  size = 'md',
  variant = 'dark',
  showTagline = false,
  className = '',
}: HumoraLogoProps) {
  // Dimensions based on size
  const iconSize = size === 'sm' ? 26 : size === 'md' ? 36 : 64;
  const fontSize = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-2xl' : 'text-4xl';
  const taglineSize = size === 'sm' ? 'text-[9px]' : size === 'md' ? 'text-xs' : 'text-sm';

  const textColor =
    variant === 'light' || variant === 'white' ? 'text-white' : 'text-[#24172B]';
  const taglineColor =
    variant === 'light' || variant === 'white' ? 'text-white/80' : 'text-[#7028B8]';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className="flex items-center gap-2">
        {/* Playful Laughing Play Button Icon */}
        <div
          style={{ width: iconSize, height: iconSize }}
          className="relative flex items-center justify-center shrink-0 drop-shadow-sm transition-transform hover:scale-105 active:scale-95"
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Play Button Outer Body with Rounded Corners */}
            <path
              d="M26 15C19.3726 15 14 20.3726 14 27V73C14 79.6274 19.3726 85 26 85C29.2136 85 32.2905 83.7107 34.5445 81.4234L76.5445 58.4234C82.4851 55.1672 82.4851 44.8328 76.5445 41.5766L34.5445 18.5766C32.2905 16.2893 29.2136 15 26 15Z"
              fill={variant === 'white' ? '#FFFFFF' : '#FFD52E'}
              stroke="#21052F"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Laughing Left Eye (cheerful arc) */}
            <path
              d="M32 39C32 39 36 34 40 39"
              stroke="#21052F"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Laughing Right Eye (cheerful arc) */}
            <path
              d="M48 39C48 39 52 34 56 39"
              stroke="#21052F"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Open Laughing Smile with Tongue */}
            <path
              d="M34 51C34 60 54 60 54 51H34Z"
              fill="#D94152"
              stroke="#21052F"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Tongue Highlight */}
            <ellipse cx="44" cy="54" rx="4.5" ry="3.5" fill="#FFA5B5" />
            {/* Sparkle / Star detail */}
            <path
              d="M84 20L86 24L90 26L86 28L84 32L82 28L78 26L82 24L84 20Z"
              fill="#FFD52E"
            />
          </svg>
        </div>

        {/* Brand Text */}
        <div className="flex flex-col">
          <span
            className={`font-black tracking-tight leading-none ${fontSize} ${textColor}`}
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
              letterSpacing: '-0.03em',
            }}
          >
            HUMORA
          </span>
        </div>
      </div>

      {showTagline && (
        <span
          className={`font-semibold tracking-wide mt-1 ${taglineSize} ${taglineColor}`}
        >
          Scroll. laugh. repeat.
        </span>
      )}
    </div>
  );
}
