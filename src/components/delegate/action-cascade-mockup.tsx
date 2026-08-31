'use client';

import { useEffect, useState, useRef } from 'react';

/**
 * Action Cascade mockup (brief §8.2 — signature interaction #1).
 *
 * Visual metaphor: a meeting-note card sits on the left; on loop,
 * parsed action cards peel off and fly into labeled Google Workspace
 * buckets (Calendar / Gmail / Docs / Tasks) on the right. Each card
 * lands with a soft spring + a ✓ status pill fades in. A live ticker
 * logs each action.
 *
 * Loops ~8s. Pause on hover.
 */

type Bucket = 'calendar' | 'gmail' | 'docs' | 'tasks';

interface ActionCard {
  id: number;
  bucket: Bucket;
  title: string;
  detail: string;
  time: string;
}

const BUCKET_META: Record<
  Bucket,
  { label: string; icon: string; tint: string; bg: string; ring: string }
> = {
  calendar: {
    label: 'Calendar',
    icon: 'event',
    tint: 'text-[#89ceff]',
    bg: 'bg-[#3B82F6]/10',
    ring: 'border-[#3B82F6]/30',
  },
  gmail: {
    label: 'Gmail',
    icon: 'mail',
    tint: 'text-[#c4abff]',
    bg: 'bg-[#8B5CF6]/10',
    ring: 'border-[#8B5CF6]/30',
  },
  docs: {
    label: 'Docs',
    icon: 'description',
    tint: 'text-[#A9B4C4]',
    bg: 'bg-white/5',
    ring: 'border-white/10',
  },
  tasks: {
    label: 'Tasks',
    icon: 'task_alt',
    tint: 'text-[#34D399]',
    bg: 'bg-[#34D399]/10',
    ring: 'border-[#34D399]/30',
  },
};

const SCRIPT: Omit<ActionCard, 'id'>[] = [
  {
    bucket: 'gmail',
    title: 'Follow-up email → Priya',
    detail: 'Re: Q4 expansion scope',
    time: '0.8s',
  },
  {
    bucket: 'calendar',
    title: 'Sync with Priya',
    detail: 'Thu 2:00pm · 30m',
    time: '1.2s',
  },
  {
    bucket: 'tasks',
    title: 'Update CRM deal stage',
    detail: 'Acme Corp → Negotiation',
    time: '0.4s',
  },
  {
    bucket: 'docs',
    title: 'Generate meeting brief',
    detail: 'Shared with #growth-team',
    time: '2.1s',
  },
  {
    bucket: 'gmail',
    title: 'Send agenda to 4 attendees',
    detail: 'Tomorrow 10am sync',
    time: '0.6s',
  },
  {
    bucket: 'calendar',
    title: 'Block deep-work Friday',
    detail: '9am–12pm · Focus',
    time: '0.9s',
  },
];

const MEETING_NOTE_LINES = [
  'Q4 planning sync — 10:14 AM',
  '',
  'Priya: we should ship the API docs by',
  'EOW. I’ll loop in engineering tomorrow.',
  '',
  'Marcus: CRM is still showing Acme in',
  '“discovery” — let’s move them to',
  '“negotiation”. Also, block Friday for',
  'deep work on the pricing model.',
  '',
  'Action: send follow-up to Priya re: scope',
  'Action: schedule 30m sync Thursday 2pm',
  'Action: update CRM stage',
];

export function ActionCascadeMockup() {
  const [activeCards, setActiveCards] = useState<ActionCard[]>([]);
  const [ticker, setTicker] = useState<string[]>([]);
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);
  const idRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      // Static state for reduced motion
      setTypedLines(MEETING_NOTE_LINES);
      setActiveCards(
        SCRIPT.slice(0, 4).map((c, i) => ({ ...c, id: i }))
      );
      return;
    }

    let lineIdx = 0;
    let cardIdx = 0;
    let phase: 'typing' | 'spawning' = 'typing';
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (paused) {
        timeoutId = setTimeout(tick, 200);
        return;
      }

      if (phase === 'typing') {
        if (lineIdx < MEETING_NOTE_LINES.length) {
          setTypedLines((prev) => [...prev, MEETING_NOTE_LINES[lineIdx]]);
          lineIdx++;
          timeoutId = setTimeout(tick, 180);
        } else {
          phase = 'spawning';
          timeoutId = setTimeout(tick, 600);
        }
      } else {
        if (cardIdx < SCRIPT.length) {
          const card: ActionCard = { ...SCRIPT[cardIdx], id: idRef.current++ };
          setActiveCards((prev) => [...prev, card]);
          setTicker((prev) =>
            [`✓ ${card.title} — ${card.detail}`, ...prev].slice(0, 4)
          );
          cardIdx++;
          timeoutId = setTimeout(tick, 1300);
        } else {
          // reset cycle
          timeoutId = setTimeout(() => {
            setTypedLines([]);
            setActiveCards([]);
            lineIdx = 0;
            cardIdx = 0;
            phase = 'typing';
            tick();
          }, 3200);
        }
      }
    };

    timeoutId = setTimeout(tick, 600);
    return () => clearTimeout(timeoutId);
  }, [paused]);

  return (
    <div
      className="relative w-full rounded-[20px] overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#0A1E36] shadow-elevated"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ aspectRatio: '16 / 10' }}
    >
      {/* Top bar — window chrome */}
      <div className="absolute top-0 left-0 right-0 h-10 flex items-center gap-2 px-4 border-b border-[rgba(255,255,255,0.06)] bg-[#031427]/60 backdrop-blur-md z-10">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
        </div>
        <div className="ml-3 flex items-center gap-1.5 text-[11px] text-[#A9B4C4] font-mono">
          <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
            lock
          </span>
          delegate.ai/agent/live
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-[11px] text-[#89ceff] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f] animate-pulse" />
          agent active
        </div>
      </div>

      {/* Body */}
      <div className="absolute top-10 left-0 right-0 bottom-0 grid grid-cols-12 gap-0">
        {/* Left: Meeting note */}
        <div className="col-span-12 md:col-span-5 border-r border-[rgba(255,255,255,0.06)] p-4 md:p-5 flex flex-col gap-3 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.12em] text-[#6B7689] font-mono">
              meeting_transcript.md
            </span>
            <span className="text-[10px] text-[#6B7689] font-mono">2.4 KB</span>
          </div>
          <div className="font-mono text-[12px] leading-[1.7] text-[#A9B4C4] flex-grow">
            {typedLines.map((line, i) => (
              <div
                key={i}
                className={
                  typeof line === 'string' && line.startsWith('Action:')
                    ? 'text-[#c4abff] font-semibold'
                    : typeof line === 'string' && line.startsWith('Q4')
                      ? 'text-[#F5F7FA] font-semibold mb-1'
                      : ''
                }
              >
                {line || '\u00A0'}
              </div>
            ))}
            {!paused && (
              <span className="inline-block w-1.5 h-3.5 bg-[#c4abff] ml-0.5 animate-pulse align-middle" />
            )}
          </div>

          {/* Bottom: parsing status */}
          <div className="mt-auto pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-2">
            <span className="material-symbols-outlined text-[14px] text-[#8B5CF6]" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
              psychology
            </span>
            <span className="text-[11px] text-[#A9B4C4] font-mono">
              {typedLines.length < MEETING_NOTE_LINES.length
                ? 'parsing transcript…'
                : activeCards.length < SCRIPT.length
                  ? `${activeCards.length}/${SCRIPT.length} actions extracted`
                  : 'run complete · 6 actions shipped'}
            </span>
          </div>
        </div>

        {/* Right: action cards flying to buckets */}
        <div className="hidden md:flex col-span-7 flex-col gap-2 p-4 md:p-5 overflow-hidden relative">
          {/* Bucket headers row */}
          <div className="grid grid-cols-4 gap-2 mb-1">
            {(Object.keys(BUCKET_META) as Bucket[]).map((b) => (
              <div
                key={b}
                className="flex items-center justify-center gap-1.5 py-1.5 rounded-md border border-[rgba(255,255,255,0.06)] bg-[#031427]/40"
              >
                <span
                  className={`material-symbols-outlined text-[12px] ${BUCKET_META[b].tint}`}
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                >
                  {BUCKET_META[b].icon}
                </span>
                <span className="text-[10px] uppercase tracking-[0.1em] text-[#6B7689] font-mono">
                  {BUCKET_META[b].label}
                </span>
              </div>
            ))}
          </div>

          {/* Cards stack */}
          <div className="flex-grow flex flex-col gap-2 overflow-hidden">
            {activeCards.length === 0 ? (
              <div className="flex-grow flex items-center justify-center text-[11px] text-[#6B7689] font-mono">
                <span className="inline-flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#6B7689] animate-pulse" />
                  waiting for transcript…
                </span>
              </div>
            ) : (
              activeCards.map((card) => {
                const meta = BUCKET_META[card.bucket];
                return (
                  <div
                    key={card.id}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg border bg-[#031427]/40 transition-all"
                    style={{
                      borderColor: 'rgba(255,255,255,0.06)',
                      animation: 'card-fly-in 500ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    }}
                  >
                    <div
                      className={`w-7 h-7 rounded-md flex items-center justify-center border ${meta.bg} ${meta.ring} ${meta.tint}`}
                    >
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                      >
                        {meta.icon}
                      </span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-[12px] text-[#F5F7FA] truncate font-medium">
                        {card.title}
                      </div>
                      <div className="text-[10px] text-[#6B7689] font-mono truncate">
                        {card.detail} · {card.time}
                      </div>
                    </div>
                    <span
                      className="material-symbols-outlined text-[14px] text-[#34D399]"
                      style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                    >
                      check_circle
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Live ticker */}
          <div className="mt-2 p-2 rounded-md border border-[rgba(255,255,255,0.06)] bg-[#031427]/60">
            <div className="text-[9px] uppercase tracking-[0.12em] text-[#6B7689] font-mono mb-1">
              activity log
            </div>
            <div className="text-[10px] text-[#A9B4C4] font-mono leading-[1.6] h-[44px] overflow-hidden">
              {ticker.length === 0 ? (
                <span className="text-[#6B7689]">—</span>
              ) : (
                ticker.map((line, i) => (
                  <div
                    key={i}
                    style={{ opacity: 1 - i * 0.22 }}
                    className="truncate"
                  >
                    {line}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes card-fly-in {
          from {
            opacity: 0;
            transform: translateX(40px) scale(0.94);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
