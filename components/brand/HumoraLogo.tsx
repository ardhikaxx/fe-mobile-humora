'use client';

import React from 'react';

export interface HumoraLogoProps {
  /**
   * 'full': Logo panjang dengan tulisan (logo-humora-komersial.png, rasio 2:1)
   * 'icon': Logo maskot saja (logo-humora.png, rasio 1:1)
   */
  type?: 'full' | 'icon';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'white';
  showTagline?: boolean;
  className?: string;
  alt?: string;
  circle?: boolean;
}

export function HumoraLogo({
  type = 'full',
  size = 'md',
  className = '',
  alt = 'HUMORA Logo',
  circle = false,
}: HumoraLogoProps) {
  const isIcon = type === 'icon';
  const isCircle = circle || className.includes('rounded-full');

  // Sizing definitions based on aspect ratio
  // 'full' has 2:1 aspect ratio (5016x2508)
  // 'icon' has 1:1 aspect ratio (2508x2508)
  const dimensions = isIcon
    ? {
        xs: { width: 28, height: 28 },
        sm: { width: 36, height: 36 },
        md: { width: 48, height: 48 },
        lg: { width: 68, height: 68 },
        xl: { width: 96, height: 96 },
      }[size]
    : {
        xs: { width: 76, height: 38 },
        sm: { width: 96, height: 48 },
        md: { width: 140, height: 70 },
        lg: { width: 196, height: 98 },
        xl: { width: 260, height: 130 },
      }[size];

  const src = isIcon ? '/icons/logo-humora.png' : '/icons/logo-humora-komersial.png';

  return (
    <div
      className={`inline-flex items-center justify-center select-none shrink-0 ${isCircle ? 'rounded-full overflow-hidden' : ''} ${className}`}
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={dimensions.width}
        height={dimensions.height}
        className={`w-full h-full ${isCircle ? 'object-cover' : 'object-contain'} pointer-events-none transition-transform hover:scale-102 active:scale-98`}
        loading="eager"
      />
    </div>
  );
}
