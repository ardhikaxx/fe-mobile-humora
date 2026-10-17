'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Maximize2,
  Volume2,
  VolumeX,
  SkipForward,
  ChevronLeft,
  Sparkles,
} from 'lucide-react';
import { Episode, Series } from '../../lib/types';
import { formatSecondsToTime } from '../../lib/utils/formatters';
import { useHumora } from '../../lib/context/HumoraContext';

interface VideoPlayerProps {
  series: Series;
  episode: Episode;
  onBack: () => void;
  onNextEpisode?: () => void;
  hasNextEpisode?: boolean;
}

export function VideoPlayer({
  series,
  episode,
  onBack,
  onNextEpisode,
  hasNextEpisode = false,
}: VideoPlayerProps) {
  const { updateWatchProgress, history } = useHumora();

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initial progress from history if previously watched
  const prevProgress = history.find(
    (h) => h.seriesSlug === series.slug && h.episodeId === episode.id
  );

  const initialTime = prevProgress && !prevProgress.completed ? prevProgress.progressSeconds : 0;

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [duration, setDuration] = useState(episode.durationSeconds || 130);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [useFallbackSimulation, setUseFallbackSimulation] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-hide controls after 3 seconds of inactivity while playing
  const triggerShowControls = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  }, [isPlaying]);

  // Simulation timer if real video stream is not available or blocked
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (useFallbackSimulation && isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [useFallbackSimulation, isPlaying, duration]);

  // Safe handler when playback completes
  useEffect(() => {
    if (currentTime >= duration && isPlaying) {
      setIsPlaying(false);
      if (hasNextEpisode && onNextEpisode) {
        const navTimer = setTimeout(() => {
          onNextEpisode();
        }, 400);
        return () => clearTimeout(navTimer);
      }
    }
  }, [currentTime, duration, isPlaying, hasNextEpisode, onNextEpisode]);

  // Sync watch progress to global context
  useEffect(() => {
    if (currentTime > 0) {
      updateWatchProgress(series, episode, currentTime, duration);
    }
  }, [currentTime, duration, episode, series, updateWatchProgress]);

  const togglePlay = () => {
    if (!useFallbackSimulation && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {
          setUseFallbackSimulation(true);
        });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying((prev) => !prev);
    }
    triggerShowControls();
  };

  const handleSkip = (seconds: number) => {
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    setCurrentTime(newTime);
    if (!useFallbackSimulation && videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    triggerShowControls();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    setCurrentTime(targetTime);
    if (!useFallbackSimulation && videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
    triggerShowControls();
  };

  const toggleMute = () => {
    if (!useFallbackSimulation && videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
    triggerShowControls();
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
    triggerShowControls();
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={triggerShowControls}
      onClick={triggerShowControls}
      className="relative aspect-16/9 w-full bg-[#0D0214] overflow-hidden select-none group"
    >
      {/* 1. REAL VIDEO ELEMENT OR HIGH-DEFINITION POSTER STREAM */}
      {!useFallbackSimulation ? (
        <video
          ref={videoRef}
          src={episode.videoSource || 'https://vjs.zencdn.net/v/oceans.mp4'}
          poster={episode.thumbnail}
          playsInline
          autoPlay
          muted={isMuted}
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
            }
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration || episode.durationSeconds || 130);
              if (initialTime > 0) {
                videoRef.current.currentTime = initialTime;
              }
            }
          }}
          onError={() => {
            setUseFallbackSimulation(true);
          }}
          onEnded={() => {
            setIsPlaying(false);
            if (hasNextEpisode && onNextEpisode) {
              onNextEpisode();
            }
          }}
          className="w-full h-full object-cover"
        />
      ) : (
        /* HD Poster Display - Clean, 100% Brightness & Crystal Clear */
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={episode.thumbnail}
            alt={episode.title}
            className="w-full h-full object-cover transition-transform duration-700"
          />
        </div>
      )}

      {/* 2. PERSISTENT SLENDER PROGRESS BAR WHEN CONTROLS ARE HIDDEN (LIKE YOUTUBE / NETFLIX) */}
      {!showControls && (
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 pointer-events-none transition-opacity">
          <div
            className="h-full bg-[#FFD52E] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      )}

      {/* 3. OVERLAY CONTROLS - REFINED, UNOBTRUSIVE & MODERN */}
      <div
        className={`absolute inset-0 flex flex-col justify-between transition-opacity duration-300 ${
          showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Soft Vignette Gradient for Top Bar (Leaves center video crystal clear) */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/80 via-black/35 to-transparent pointer-events-none" />

        {/* Soft Vignette Gradient for Bottom Bar */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

        {/* TOP BAR: Clean Minimalist Navigation & Video Header */}
        <div className="relative z-10 flex items-center justify-between px-3.5 pt-3 sm:px-4 sm:pt-3.5 text-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBack();
              }}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 active:scale-95 transition-all shrink-0"
              aria-label="Kembali"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5] text-white -ml-0.5" />
            </button>

            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold text-white truncate drop-shadow-md">
                {episode.title}
              </h3>
              <p className="text-[11px] text-white/75 truncate drop-shadow-sm">
                {series.title} • Video {episode.number}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex text-[10px] font-bold text-[#FFD52E] bg-black/40 backdrop-blur-md border border-white/10 px-2 py-1 rounded-full items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Full HD 1080p</span>
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 active:scale-95 transition-all"
              aria-label={isMuted ? 'Nyalakan Suara' : 'Bisukan'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* CENTER CONTROLS: Floating Translucent Round Buttons */}
        <div className="relative z-10 flex items-center justify-center gap-6 sm:gap-8 text-white my-auto">
          {/* Rewind 10s */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSkip(-10);
            }}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 active:scale-90 transition-all shadow-md group/rewind"
            aria-label="Mundur 10 detik"
          >
            <RotateCcw className="w-5 h-5 text-white group-hover/rewind:text-[#FFD52E] transition-colors" />
          </button>

          {/* Big Signature Yellow Play / Pause Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FFD52E] text-[#21052F] flex items-center justify-center shadow-xl shadow-[#FFD52E]/25 hover:scale-105 active:scale-95 transition-all"
            aria-label={isPlaying ? 'Jeda' : 'Putar'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </button>

          {/* Forward 10s */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSkip(10);
            }}
            className="w-11 h-11 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 hover:bg-black/60 active:scale-90 transition-all shadow-md group/forward"
            aria-label="Maju 10 detik"
          >
            <RotateCw className="w-5 h-5 text-white group-hover/forward:text-[#FFD52E] transition-colors" />
          </button>
        </div>

        {/* BOTTOM CONTROLS: Modern Clean Scrubber Bar & Timestamp Row */}
        <div
          className="relative z-10 flex flex-col gap-1.5 px-3.5 pb-3 sm:px-4 sm:pb-3.5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Interactive Scrubber Slider */}
          <div className="relative flex items-center">
            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1.5 bg-white/25 rounded-lg appearance-none cursor-pointer accent-[#FFD52E] hover:h-2 transition-all focus:outline-none"
            />
          </div>

          {/* Bottom Timestamps & Next Action */}
          <div className="flex items-center justify-between text-xs text-white/90 font-semibold pt-0.5">
            <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs tracking-tight">
              <span>{formatSecondsToTime(currentTime)}</span>
              <span className="text-white/50">/</span>
              <span className="text-white/70">{formatSecondsToTime(duration)}</span>
            </div>

            <div className="flex items-center gap-3">
              {hasNextEpisode && (
                <button
                  onClick={onNextEpisode}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#FFD52E] hover:text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 active:scale-95 transition-all"
                >
                  <span>Video Selanjutnya</span>
                  <SkipForward className="w-3.5 h-3.5 fill-current" />
                </button>
              )}

              <button
                onClick={toggleFullscreen}
                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 active:scale-90 transition-all"
                aria-label="Layar penuh"
              >
                <Maximize2 className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
