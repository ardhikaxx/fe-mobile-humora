'use client';

import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, X, Frown, Sparkles } from 'lucide-react';
import { AppHeader } from '../../components/layout/AppHeader';
import { BentoSeriesCard, BentoCardVariant } from '../../components/series/BentoSeriesCard';
import { SERIES_LIST } from '../../lib/data/seriesData';

const POPULAR_GENRES = [
  'Semua',
  'Komedi',
  'Romantis',
  'Drama',
  'Slice of Life',
  'Workplace',
  'Misteri',
];

function getBentoCardVariant(index: number, total: number): BentoCardVariant {
  if (index === 0) return 'hero';
  if (total === 2) return 'horizontal';

  const remainingAfterThis = total - 1 - index;
  if (index === 3 && remainingAfterThis !== 1) {
    return 'horizontal';
  }
  if (index === 6 && remainingAfterThis !== 1) {
    return 'horizontal';
  }

  return 'portrait';
}

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Semua');

  const filteredSeries = useMemo(() => {
    return SERIES_LIST.filter((series) => {
      // Genre filter
      const matchesGenre =
        selectedGenre === 'Semua' ||
        series.genres.some((g) => g.toLowerCase() === selectedGenre.toLowerCase());

      // Keyword filter
      if (!keyword.trim()) return matchesGenre;

      const q = keyword.toLowerCase().trim();
      const matchesTitle = series.title.toLowerCase().includes(q);
      const matchesSynopsis = series.synopsis.toLowerCase().includes(q);
      const matchesGenreText = series.genres.some((g) => g.toLowerCase().includes(q));
      const matchesEpisode = series.episodes.some(
        (ep) =>
          ep.title.toLowerCase().includes(q) || ep.description.toLowerCase().includes(q)
      );

      return matchesGenre && (matchesTitle || matchesSynopsis || matchesGenreText || matchesEpisode);
    });
  }, [keyword, selectedGenre]);

  const clearSearch = () => {
    setKeyword('');
    setSelectedGenre('Semua');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFDF7] pb-24">
      {/* Modern Floating Search Bar Header */}
      <AppHeader>
        <div className="flex items-center gap-2.5 w-full px-1">
          <SearchIcon className="w-4.5 h-4.5 text-[#7028B8] stroke-[2.2] shrink-0" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Cari video, judul, atau genre..."
            className="flex-1 bg-transparent text-sm sm:text-base font-medium text-[#24172B] placeholder:text-[#A39CA9] focus:outline-none select-text"
          />
          {keyword && (
            <button
              type="button"
              onClick={() => setKeyword('')}
              className="w-6 h-6 rounded-full bg-[#EEE8F0] hover:bg-[#E2DBE7] flex items-center justify-center text-[#786F7D] hover:text-[#24172B] shrink-0 active:scale-95 transition-all"
              aria-label="Hapus kata kunci"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}
        </div>
      </AppHeader>

      <div className="px-5 pt-3">
        {/* Title */}
        <h2 className="text-xl font-black text-[#24172B] tracking-tight">
          Cari cerita favoritmu
        </h2>
        <p className="text-xs text-[#786F7D] mt-0.5 mb-2">
          Temukan berbagai video penuh canda dan cerita lucu
        </p>

        {/* Popular Genre Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3">
          {POPULAR_GENRES.map((genre) => {
            const isSelected = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`py-1.5 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 active:scale-95 ${
                  isSelected
                    ? 'bg-[#4B0B7A] text-white shadow-xs'
                    : 'bg-white border border-[#EEE8F0] text-[#786F7D] hover:border-[#D8D0DE]'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mt-2 mb-3">
          <span className="text-xs font-bold text-[#24172B]">
            {keyword || selectedGenre !== 'Semua' ? (
              <>
                Ditemukan <span className="text-[#7028B8]">{filteredSeries.length}</span> judul video
              </>
            ) : (
              'Katalog Lengkap'
            )}
          </span>

          {(keyword || selectedGenre !== 'Semua') && (
            <button
              onClick={clearSearch}
              className="text-xs text-[#7028B8] font-semibold hover:underline"
            >
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {/* Results Bento Grid */}
      {filteredSeries.length > 0 ? (
        <div className="px-5 grid grid-cols-2 gap-3 sm:gap-4">
          {filteredSeries.map((series, index) => {
            const variant = getBentoCardVariant(index, filteredSeries.length);
            return (
              <BentoSeriesCard
                key={series.id}
                series={series}
                variant={variant}
              />
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 mt-6">
          <div className="w-16 h-16 rounded-3xl bg-[#FFF9E0] text-[#E58A16] flex items-center justify-center mb-3">
            <Frown className="w-8 h-8" />
          </div>

          <h3 className="text-base font-bold text-[#24172B]">
            Belum ada cerita yang cocok
          </h3>

          <p className="text-xs text-[#786F7D] mt-1 max-w-xs leading-relaxed">
            Tidak menemukan hasil untuk &ldquo;{keyword || selectedGenre}&rdquo;. Coba kata kunci lain atau pilih genre berbeda.
          </p>

          <button
            onClick={clearSearch}
            className="mt-4 px-4 py-2 rounded-xl bg-[#4B0B7A] text-white font-semibold text-xs shadow-xs active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lihat Semua Video</span>
          </button>
        </div>
      )}
    </div>
  );
}
