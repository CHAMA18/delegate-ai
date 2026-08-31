'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  SceneHook,
  SceneReveal,
  SceneSetup,
  SceneAgentWakes,
  SceneEmailDraft,
  SceneCalendar,
  SceneCrm,
  SceneResult,
  SceneCTA,
  CHAPTERS,
  TOTAL_DURATION,
} from './scenes';

/**
 * Delegate.ai — 90-second demo video player.
 *
 * Drives a 100s timeline (90s content + 10s CTA) of scripted scenes.
 * Renders a 16:9 frame with video-player controls (progress bar, chapters,
 * play/pause, speed, mute, fullscreen). Autoplays when scrolled into view,
 * pauses when scrolled out, loops by default, respects reduced motion.
 */

const SPEEDS = [0.5, 1, 1.5, 2];

export function DemoVideoPlayer() {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [muted, setMuted] = useState(true); // cosmetic — no audio
  const [showControls, setShowControls] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [started, setStarted] = useState(false); // first user interaction
  const [fullscreen, setFullscreen] = useState(false);

  const frameRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Detect reduced motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Timeline tick loop
  useEffect(() => {
    if (!playing) return;

    const tick = (now: number) => {
      if (!lastTickRef.current) lastTickRef.current = now;
      const dt = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;

      setT((prevT) => {
        const newT = prevT + dt * speed;
        if (newT >= TOTAL_DURATION) {
          // Loop
          return 0;
        }
        return newT;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    lastTickRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTickRef.current = 0;
    };
  }, [playing, speed]);

  // Autoplay on scroll into view (IntersectionObserver)
  useEffect(() => {
    if (reducedMotion) return;
    const el = frameRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.5) {
            setPlaying(true);
            setStarted(true);
          } else if (entry.intersectionRatio < 0.15) {
            setPlaying(false);
          }
        });
      },
      { threshold: [0, 0.15, 0.5, 0.75, 1] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  const handlePlayPause = useCallback(() => {
    setPlaying((p) => !p);
    setStarted(true);
  }, []);

  const handleSeek = useCallback((time: number) => {
    setT(Math.max(0, Math.min(TOTAL_DURATION, time)));
  }, []);

  const handleChapterClick = useCallback((start: number) => {
    setT(start);
    setPlaying(true);
    setStarted(true);
  }, []);

  const handleFullscreen = useCallback(() => {
    const el = frameRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().then(() => setFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setFullscreen(false)).catch(() => {});
    }
  }, []);

  // Auto-hide controls after inactivity (but keep progress bar visible at reduced opacity)
  const showControlsTemporarily = useCallback(() => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 3500);
  }, [playing]);

  useEffect(() => {
    if (!playing) {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    } else {
      showControlsTemporarily();
    }
  }, [playing, showControlsTemporarily]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const currentChapter = CHAPTERS.find((c) => t >= c.start && t < c.end);

  return (
    <div
      ref={frameRef}
      className="relative w-full rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#031427] shadow-elevated"
      style={{ aspectRatio: '16 / 9' }}
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      {/* Ambient glow */}
      <div
        className="absolute -inset-2 -z-10 rounded-3xl opacity-30 blur-3xl pointer-events-none"
        style={{
          background: 'linear-gradient(110deg, rgba(139,92,246,0.5), rgba(59,130,246,0.4))',
        }}
      />

      {/* Demo badge (top-right) */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
        <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-[0.12em] font-bold font-mono bg-[rgba(3,20,39,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.1)] text-[#c4abff]">
          ● Live Demo
        </span>
      </div>

      {/* Chapter label (top-left) */}
      {currentChapter && (
        <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.12em] font-mono text-[#6B7689]">
            Ch. {CHAPTERS.indexOf(currentChapter) + 1}
          </span>
          <span className="text-[12px] font-medium text-[#F5F7FA]">
            {currentChapter.label}
          </span>
        </div>
      )}

      {/* Scene rendering */}
      <SceneRouter t={t} playing={playing} reducedMotion={reducedMotion} />

      {/* Click-to-play overlay (before first interaction) */}
      {!started && (
        <button
          onClick={handlePlayPause}
          className="absolute inset-0 z-40 flex items-center justify-center bg-[rgba(3,20,39,0.5)] backdrop-blur-sm cursor-pointer group"
          aria-label="Play demo"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center shadow-[0_8px_32px_-4px_rgba(139,92,246,0.6)] group-hover:scale-105 transition-transform">
            <span
              className="material-symbols-outlined text-[36px] text-white ml-1"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
            >
              play_arrow
            </span>
          </div>
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center">
            <p className="text-[15px] font-semibold text-[#F5F7FA] mb-1">
              Watch the 90-second demo
            </p>
            <p className="text-[12px] text-[#A9B4C4]">See Delegate.ai ship 3 actions in real time</p>
          </div>
        </button>
      )}

      {/* Video controls — progress bar always visible, action row fades on inactivity */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,20,39,0.95)] via-[rgba(3,20,39,0.7)] to-transparent pointer-events-none" />

        <div className="relative px-4 pb-3 pt-8">
          {/* Progress bar with chapter markers — always visible */}
          <div className="relative mb-2 group/progress">
            {/* Chapter markers */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 pointer-events-none">
              {CHAPTERS.slice(1).map((c) => (
                <div
                  key={c.start}
                  className="absolute w-px h-2 bg-[rgba(255,255,255,0.2)]"
                  style={{ left: `${(c.start / TOTAL_DURATION) * 100}%` }}
                />
              ))}
            </div>

            {/* Track */}
            <div
              className="relative h-1 bg-[rgba(255,255,255,0.1)] rounded-full cursor-pointer group/track hover:h-1.5 transition-all"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct = (e.clientX - rect.left) / rect.width;
                handleSeek(pct * TOTAL_DURATION);
              }}
            >
              {/* Buffered (cosmetic, lags slightly) */}
              <div
                className="absolute h-full bg-[rgba(255,255,255,0.15)] rounded-full"
                style={{ width: `${Math.min(100, (t / TOTAL_DURATION) * 100 + 5)}%` }}
              />
              {/* Played */}
              <div
                className="absolute h-full rounded-full"
                style={{
                  width: `${(t / TOTAL_DURATION) * 100}%`,
                  background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
                }}
              />
              {/* Scrubber dot */}
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover/track:opacity-100 transition-opacity"
                style={{
                  left: `calc(${(t / TOTAL_DURATION) * 100}% - 6px)`,
                  background: 'linear-gradient(135deg, #c4abff, #3B82F6)',
                }}
              />
            </div>
          </div>

          {/* Bottom row: controls — always visible, dims to 60% during playback, full on hover */}
          <div
            className={`flex items-center gap-3 text-[#F5F7FA] transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-60'
            }`}
          >
            {/* Play/pause */}
            <button
              onClick={handlePlayPause}
              className="hover:scale-110 transition-transform"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              <span
                className="material-symbols-outlined text-[22px] text-[#F5F7FA]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                {playing ? 'pause' : 'play_arrow'}
              </span>
            </button>

            {/* Skip back 10s */}
            <button
              onClick={() => handleSeek(Math.max(0, t - 10))}
              className="hover:scale-110 transition-transform"
              aria-label="Skip back 10 seconds"
            >
              <span
                className="material-symbols-outlined text-[18px] text-[#A9B4C4]"
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
              >
                replay_10
              </span>
            </button>

            {/* Time */}
            <div className="text-[11px] font-mono tabular-nums text-[#A9B4C4]">
              {formatTime(t)} <span className="text-[#6B7689]">/ {formatTime(TOTAL_DURATION)}</span>
            </div>

            {/* Chapter pill */}
            {currentChapter && (
              <button
                onClick={() => {
                  const idx = CHAPTERS.indexOf(currentChapter);
                  if (idx < CHAPTERS.length - 1) handleChapterClick(CHAPTERS[idx + 1].start);
                }}
                className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-[10px] font-mono text-[#A9B4C4] hover:text-[#F5F7FA] hover:border-[rgba(139,92,246,0.4)] transition-all"
              >
                {currentChapter.label}
                <span
                  className="material-symbols-outlined text-[12px]"
                  style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                >
                  skip_next
                </span>
              </button>
            )}

            {/* Spacer */}
            <div className="flex-grow" />

            {/* Speed selector */}
            <div className="relative group/speed">
              <button className="text-[11px] font-mono text-[#A9B4C4] hover:text-[#F5F7FA] px-2 py-1 rounded hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                {speed}×
              </button>
              <div className="absolute bottom-full right-0 mb-1 hidden group-hover/speed:flex flex-col gap-0.5 p-1 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[rgba(3,20,39,0.95)] backdrop-blur-md">
                {SPEEDS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`text-[11px] font-mono px-3 py-1 rounded text-right transition-colors ${
                      s === speed ? 'text-[#c4abff] bg-[rgba(139,92,246,0.15)]' : 'text-[#A9B4C4] hover:text-[#F5F7FA] hover:bg-[rgba(255,255,255,0.05)]'
                    }`}
                  >
                    {s}×
                  </button>
                ))}
              </div>
            </div>

            {/* Mute (cosmetic — no audio in this demo) */}
            <button
              onClick={() => setMuted((m) => !m)}
              className="hover:scale-110 transition-transform"
              aria-label={muted ? 'Unmute' : 'Mute'}
            >
              <span
                className="material-symbols-outlined text-[18px] text-[#A9B4C4]"
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
              >
                {muted ? 'volume_off' : 'volume_up'}
              </span>
            </button>

            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              className="hover:scale-110 transition-transform"
              aria-label="Fullscreen"
            >
              <span
                className="material-symbols-outlined text-[18px] text-[#A9B4C4]"
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
              >
                {fullscreen ? 'fullscreen_exit' : 'fullscreen'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Finished state — replay button overlay */}
      {t >= TOTAL_DURATION - 0.5 && !playing && started && (
        <button
          onClick={() => {
            setT(0);
            setPlaying(true);
          }}
          className="absolute inset-0 z-40 flex items-center justify-center bg-[rgba(3,20,39,0.7)] backdrop-blur-sm cursor-pointer group"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center shadow-[0_8px_32px_-4px_rgba(139,92,246,0.6)] group-hover:scale-105 transition-transform">
              <span
                className="material-symbols-outlined text-[28px] text-white"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                replay
              </span>
            </div>
            <p className="text-[13px] text-[#A9B4C4] font-mono">Replay demo</p>
          </div>
        </button>
      )}
    </div>
  );
}

/* ============================================================
   Scene router — renders the correct scene based on current time
   ============================================================ */
function SceneRouter({ t, playing, reducedMotion }: { t: number; playing: boolean; reducedMotion: boolean }) {
  const props = { t, playing, reducedMotion };

  // For reduced motion: skip to final CTA scene
  if (reducedMotion && t < 95) {
    return <SceneCTA t={95} playing={false} reducedMotion />;
  }

  if (t < 8) return <SceneHook {...props} />;
  if (t < 18) return <SceneReveal {...props} />;
  if (t < 32) return <SceneSetup {...props} />;
  if (t < 48) return <SceneAgentWakes {...props} />;
  if (t < 65) return <SceneEmailDraft {...props} />;
  if (t < 75) return <SceneCalendar {...props} />;
  if (t < 85) return <SceneCrm {...props} />;
  if (t < 95) return <SceneResult {...props} />;
  return <SceneCTA {...props} />;
}
