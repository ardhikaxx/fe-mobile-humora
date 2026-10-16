'use client';

import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Mail,
  PlayCircle,
  CreditCard,
  UserCheck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { AppHeader } from '../../../components/layout/AppHeader';
import { useHumora } from '../../../lib/context/HumoraContext';

interface FAQItem {
  id: string;
  category: 'langganan' | 'video' | 'akun' | 'umum';
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'langganan',
    question: 'Apakah 2 video pertama benar-benar gratis selamanya?',
    answer:
      'Ya! Seluruh judul video di HUMORA dapat ditonton secara gratis pada Video 1 dan Video 2 tanpa perlu registrasi akun maupun membayar. Video 3 dan seterusnya dapat diakses dengan berlangganan paket Premium.',
  },
  {
    id: 'faq-2',
    category: 'langganan',
    question: 'Bagaimana cara berlangganan Paket Premium HUMORA?',
    answer:
      'Kamu cukup membuka tab "Langganan", pilih paket yang kamu inginkan (Bulanan, 3 Bulan, atau Tahunan), lalu selesaikan pembayaran simulasi via QRIS, GoPay, OVO, atau Transfer Bank. Akses seluruh video premium akan langsung aktif seketika.',
  },
  {
    id: 'faq-3',
    category: 'langganan',
    question: 'Apakah langganan akan diperpanjang otomatis (auto-renewal)?',
    answer:
      'Tidak ada tagihan otomatis tanpa persetujuanmu. Langganan HUMORA berbasis durasi tetap (misal 30 hari). Kamu dapat memperpanjang secara mandiri kapan saja sebelum atau setelah masa aktif berakhir.',
  },
  {
    id: 'faq-4',
    category: 'video',
    question: 'Video buffering atau macet saat diputar, apa solusinya?',
    answer:
      'Coba buka menu Pengaturan Akun, lalu aktifkan "Mode Hemat Kuota Seluler" (480p) atau ubah kualitas video ke 720p. Kamu juga dapat menggunakan tombol "Bersihkan Cache" untuk menyegarkan penyimpanan sementara browser.',
  },
  {
    id: 'faq-5',
    category: 'akun',
    question: 'Apakah 1 akun bisa digunakan di beberapa perangkat sekaligus?',
    answer:
      'Satu akun HUMORA Premium dapat digunakan hingga 2 perangkat aktif secara bersamaan, sehingga kamu bisa menonton dari smartphone maupun laptop dengan nyaman.',
  },
  {
    id: 'faq-6',
    category: 'akun',
    question: 'Bagaimana cara mengganti kata sandi atau email akun?',
    answer:
      'Buka halaman Profil > Pengaturan Akun > Keamanan & Akun, lalu pilih "Ubah Sandi". Untuk perubahan alamat email, hubungi tim support kami melalui email support@humora.id.',
  },
  {
    id: 'faq-7',
    category: 'umum',
    question: 'Seberapa sering video baru dirilis di HUMORA?',
    answer:
      'Kami merilis video baru setiap minggunya, serta judul koleksi sketsa komedi orisinal terbaru setiap bulan yang dikerjakan langsung oleh sineas dan komika lokal Indonesia.',
  },
];

export default function HelpCenterPage() {
  const { showToast } = useHumora();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      const matchesCategory =
        selectedCategory === 'semua' || faq.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-24">
      {/* Header Bar */}
      <AppHeader title="Pusat Bantuan" showBack />

      <div className="px-5 pt-3 space-y-5">
        {/* HERO SEARCH BANNER */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#4B0B7A] to-[#21052F] text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FFD52E] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Layanan Bantuan 24/7
            </span>
            <h1 className="text-xl font-black text-white tracking-tight">
              Ada yang bisa kami bantu?
            </h1>
            <p className="text-xs text-[#D8D0DE] mt-1 mb-4 leading-relaxed">
              Temukan jawaban cepat seputar langganan, streaming, dan akun HUMORA.
            </p>

            {/* Search Input Box */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-white/50">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kendala (contoh: langganan, video)..."
                className="w-full pl-10 pr-4 py-3 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 text-xs sm:text-sm text-white placeholder:text-white/60 focus:outline-none focus:bg-white/25 focus:border-[#FFD52E] transition-all"
              />
            </div>
          </div>
        </div>

        {/* QUICK CATEGORY PILLS */}
        <div>
          <h2 className="text-xs font-bold text-[#786F7D] uppercase tracking-wider mb-2.5">
            Kategori Kendala
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'semua', label: 'Semua Topik', icon: HelpCircle },
              { id: 'langganan', label: 'Langganan & VIP', icon: CreditCard },
              { id: 'video', label: 'Streaming Video', icon: PlayCircle },
              { id: 'akun', label: 'Akun & Profil', icon: UserCheck },
            ].map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center gap-2.5 active:scale-97 ${
                    isSelected
                      ? 'bg-[#4B0B7A] text-white border-[#4B0B7A] shadow-xs'
                      : 'bg-white border-[#EEE8F0] text-[#24172B] hover:border-[#D8D0DE]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#FFD52E]' : 'text-[#7028B8]'}`} />
                  <span className="text-xs font-bold tracking-tight">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ ACCORDION LIST */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EEE8F0] shadow-xs">
          <h2 className="text-sm font-bold text-[#24172B] mb-3">
            Pertanyaan Sering Diajukan (FAQ)
          </h2>

          {filteredFaqs.length > 0 ? (
            <div className="divide-y divide-[#EEE8F0]">
              {filteredFaqs.map((faq) => {
                const isOpen = expandedFaqId === faq.id;
                return (
                  <div key={faq.id} className="py-3.5 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-start justify-between gap-3 text-left group"
                    >
                      <span className="text-xs sm:text-sm font-bold text-[#24172B] group-hover:text-[#7028B8] transition-colors leading-snug">
                        {faq.question}
                      </span>
                      <div className="w-6 h-6 rounded-full bg-[#F6F1F8] flex items-center justify-center shrink-0 mt-0.5 text-[#7028B8]">
                        {isOpen ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="mt-2.5 text-xs text-[#786F7D] leading-relaxed bg-[#F6F1F8]/60 p-3.5 rounded-2xl animate-fade-in border border-[#EEE8F0]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <HelpCircle className="w-8 h-8 text-[#A39CA9] mx-auto mb-2" />
              <p className="text-xs font-bold text-[#24172B]">Tidak ada pertanyaan ditemukan</p>
              <p className="text-[11px] text-[#786F7D] mt-0.5">
                Coba gunakan kata kunci pencarian yang lain.
              </p>
            </div>
          )}
        </div>

        {/* CONTACT SUPPORT CHANNELS */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EEE8F0] shadow-xs">
          <h2 className="text-sm font-bold text-[#24172B] mb-1">
            Masih butuh bantuan?
          </h2>
          <p className="text-xs text-[#786F7D] mb-3.5">
            Tim layanan pelanggan HUMORA siap mendampingimu setiap hari (08.00 - 22.00 WIB).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* WhatsApp Support */}
            <button
              type="button"
              onClick={() => showToast('Membuka WhatsApp Bantuan HUMORA...')}
              className="p-3.5 rounded-2xl bg-[#EAF8F1] border border-[#21865B]/20 text-[#21865B] flex items-center justify-between active:scale-97 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#21865B] shadow-xs">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#21865B] block">WhatsApp Support</span>
                  <span className="text-[11px] text-[#21865B]/80">+62 812-9988-7766</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#21865B]/70" />
            </button>

            {/* Email Support */}
            <button
              type="button"
              onClick={() => showToast('Membuka aplikasi email...')}
              className="p-3.5 rounded-2xl bg-[#F6F1F8] border border-[#EEE8F0] text-[#7028B8] flex items-center justify-between active:scale-97 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#7028B8] shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#4B0B7A] block">Email Resmi</span>
                  <span className="text-[11px] text-[#786F7D]">support@humora.id</span>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#786F7D]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
