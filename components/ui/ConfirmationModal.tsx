'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  isOpen,
  title,
  description,
  confirmLabel = 'Ya, Lanjutkan',
  cancelLabel = 'Batal',
  isDestructive = false,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-[#EEE8F0] relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
              isDestructive ? 'bg-red-50 text-red-600' : 'bg-purple-50 text-[#7028B8]'
            }`}
          >
            <AlertTriangle className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-[#24172B] mb-2">{title}</h3>
          <p className="text-sm text-[#786F7D] leading-relaxed mb-6">{description}</p>

          <div className="flex w-full gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-white transition-all shadow-sm ${
                isDestructive
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-[#4B0B7A] hover:bg-[#39085E] active:scale-95'
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
