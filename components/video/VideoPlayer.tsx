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
  ArrowLeft,
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
  const [duration, setDuration] = useState(episode.durationSeconds || 600);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [useFallbackSimulation, setUseFallbackSimulation] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto hide controls after 3.5s
  const triggerShowControls = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3500);
  }, [isPlaying]);

  // Fallback simulation timer if real video fails or doesn't play
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (useFallbackSimulation && isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
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

  // Sync progress with HumoraContext periodically
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

  return (
    <div
      ref={containerRef}
      onMouseMove={triggerShowControls}
      onClick={triggerShowControls}
      className="relative aspect-16/9 w-full bg-[#15031F] overflow-hidden select-none group"
    >
      {/* Real HTML5 Video element with fallback error handling */}
      {!useFallbackSimulation ? (
        <video
          ref={videoRef}
          src={episode.videoSource || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'}
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
              setDuration(videoRef.current.duration || episode.durationSeconds);
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
        /* Fallback Simulation Canvas / Poster Player */
        <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={episode.thumbnail}
            alt={episode.title}
            className={`w-full h-full object-cover ${
              isPlaying ? 'scale-105 filter brightness-85' : 'filter brightness-65'
            } transition-all duration-700`}
          />
          {/* Ambient animated glow */}
          <div className="absolute inset-0 bg-radial from-transparent to-[#21052F]/70 pointer-events-none" />

          {/* Visual Simulation Badge */}
          <div className="absolute top-12 left-4 px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[10px] text-[#FFD52E] font-medium flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Simulasi Streaming HD</span>
          </div>
        </div>
      )}

      {/* OVERLAY CONTROLS */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/70 flex flex-col justify-between p-3.5 sm:p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top Bar: Floating Capsule Pill */}
        <div className="flex justify-center w-full">
          <div className="bg-black/50 backdrop-blur-md border border-white/15 shadow-lg rounded-full px-3 py-1.5 flex items-center justify-between w-full max-w-[390px] text-white">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBack();
              }}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all shrink-0"
              aria-label="Kembali"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>

            <div className="text-center px-2 truncate max-w-[190px] sm:max-w-[250px]">
              <h4 className="text-xs font-bold text-white truncate drop-shadow-sm">
                {series.title}
              </h4>
              <span className="text-[10px] text-white/80 truncate block">
                Ep {episode.number}: {episode.title}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all shrink-0"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Center Playback Controls */}
        <div className="flex items-center justify-center gap-6 text-white my-auto">
          {/* Rewind 10s */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSkip(-10);
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-black/35 hover:bg-black/55 active:scale-90 transition-transform"
            aria-label="Mundur 10 detik"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          {/* Big Play/Pause Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-14 h-14 rounded-full bg-[#FFD52E] text-[#21052F] flex items-center justify-center shadow-lg active:scale-95 transition-transform"
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
            className="w-10 h-10 rounded-full flex items-center justify-center bg-black/35 hover:bg-black/55 active:scale-90 transition-transform"
            aria-label="Maju 10 detik"
          >
            <RotateCw className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Scrubber & Timers */}
        <div className="flex flex-col gap-1.5" onClick={(e) => e.stopPropagation()}>
          {/* Slider input */}
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#FFD52E] hover:h-2 transition-all"
          />

          <div className="flex items-center justify-between text-[11px] text-white/90 font-medium">
            <div className="flex items-center gap-1.5">
              <span>{formatSecondsToTime(currentTime)}</span>
              <span>/</span>
              <span>{formatSecondsToTime(duration)}</span>
            </div>

            <div className="flex items-center gap-3">
              {hasNextEpisode && (
                <button
                  onClick={onNextEpisode}
                  className="flex items-center gap-1 text-[11px] font-bold text-[#FFD52E] hover:underline"
                >
                  <span>Ep Selanjutnya</span>
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={toggleFullscreen}
                className="p-1 hover:text-[#FFD52E] transition-colors"
                aria-label="Layar penuh"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
