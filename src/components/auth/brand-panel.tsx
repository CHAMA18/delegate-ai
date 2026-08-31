'use client';

import { useEffect, useState } from 'react';
import { LogoMark } from '@/components/delegate/logo';

/**
 * Auth brand panel — left side of the split-screen auth layout.
 *
 * Design goals (from research brief):
 * - Premium editorial-meets-tech aesthetic
 * - Live "action cascade" visual as the brand storytelling moment
 * - Social proof + testimonial pull-quote
 * - Quiet, confident, never shouting
 *
 * Layout: vertical stack — logo top, kinetic headline middle, action mockup bottom, testimonial.
 */

const ACTIONS = [
  { id: 1, icon: 'mail', label: 'Email drafted', detail: 'To: sarah@acme.corp', tint: '#c4abff' },
  { id: 2, icon: 'event', label: 'Event scheduled', detail: 'Thu 2pm · 30m', tint: '#89ceff' },
  { id: 3, icon: 'task_alt', label: 'CRM updated', detail: 'Acme → Negotiation', tint: '#34D399' },
];

export function AuthBrandPanel({ mode }: { mode: 'login' | 'signup' }) {
  const [visibleActions, setVisibleActions] = useState<number>(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisibleActions(3);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    ACTIONS.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleActions(i + 1), 800 + i * 1100));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[44%] xl:w-[42%] bg-[#0A1E36] border-r border-[rgba(255,255,255,0.06)] flex-col p-12 xl:p-16 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="aurora-blob animate-aurora"
          style={{ width: 480, height: 480, top: -120, left: -80, background: '#8B5CF6', opacity: 0.25 }}
        />
        <div
          className="aurora-blob animate-aurora"
          style={{ width: 360, height: 360, bottom: -80, right: -60, background: '#3B82F6', opacity: 0.2, animationDelay: '8s' }}
        />
        <div className="absolute inset-0 dot-grid opacity-40" />
      </div>

      <div className="relative flex flex-col h-full">
        {/* Logo top */}
        <a href="/" className="flex items-center gap-2.5 w-fit group">
          <LogoMark className="h-9 w-9 transition-transform group-hover:scale-110" />
          <span className="font-semibold text-[17px] tracking-[-0.02em] text-[#F5F7FA]">
            Delegate<span className="ai-gradient-text">.ai</span>
          </span>
        </a>

        {/* Middle — kinetic headline */}
        <div className="flex-grow flex flex-col justify-center max-w-lg">
          <span className="text-eyebrow mb-4">
            {mode === 'login' ? 'Welcome back' : 'Start delegating'}
          </span>
          <h1 className="text-[44px] xl:text-[52px] font-semibold tracking-[-0.03em] leading-[1.05] text-[#F5F7FA] mb-5">
            Your meeting notes,
            <br />
            <span className="text-serif italic text-[#A9B4C4] mr-2 text-[0.88em]">already</span>
            <span className="ai-gradient-text-wide">in motion.</span>
          </h1>
          <p className="text-[16px] text-[#A9B4C4] leading-[1.65] max-w-md">
            Delegate.ai reads your transcripts and ships the follow-up —
            emails drafted, events booked, CRM updated — across Google
            Workspace, autonomously.
          </p>

          {/* Live action cascade mini-mockup */}
          <div className="mt-10 relative">
            {/* Origin node — transcript */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#031427]/60 mb-3">
              <span
                className="material-symbols-outlined text-[16px] text-[#A9B4C4]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                description
              </span>
              <span className="text-[12px] text-[#A9B4C4] font-mono">meeting_transcript.md</span>
              <span className="text-[10px] text-[#6B7689] font-mono">2.4 KB</span>
            </div>

            {/* Connector line */}
            <div className="ml-5 w-px h-6 bg-gradient-to-b from-[rgba(139,92,246,0.5)] to-transparent" />

            {/* Actions fly out */}
            <div className="flex flex-col gap-2 ml-5 relative">
              {ACTIONS.map((a, i) => {
                const isVisible = i < visibleActions;
                return (
                  <div
                    key={a.id}
                    className="flex items-center gap-3 p-2.5 rounded-lg border bg-[#031427]/60 transition-all duration-500"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateX(0)' : 'translateX(-12px)',
                      borderColor: isVisible ? 'rgba(139,92,246,0.25)' : 'rgba(255,255,255,0.04)',
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center border"
                      style={{
                        borderColor: `${a.tint}40`,
                        backgroundColor: `${a.tint}15`,
                      }}
                    >
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ color: a.tint, fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                      >
                        {a.icon}
                      </span>
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-[12px] text-[#F5F7FA] font-medium">{a.label}</div>
                      <div className="text-[10px] text-[#6B7689] font-mono">{a.detail}</div>
                    </div>
                    <span
                      className="material-symbols-outlined text-[14px] text-[#34D399]"
                      style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                    >
                      check_circle
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <figure className="relative max-w-md">
          <div className="absolute -left-2 -top-2 text-[40px] text-[#8B5CF6]/40 font-serif leading-none pointer-events-none">
            &ldquo;
          </div>
          <blockquote className="relative text-[14px] text-[#A9B4C4] leading-[1.6] italic font-serif">
            We went from 14 hours of weekly meeting follow-up to under 90 minutes. Delegate.ai isn&apos;t a summarizer — it&apos;s a teammate that never sleeps.
          </blockquote>
          <figcaption className="flex items-center gap-2 mt-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center text-[10px] font-bold text-white">
              MK
            </div>
            <div>
              <div className="text-[12px] font-medium text-[#F5F7FA]">Maya Krishnan</div>
              <div className="text-[10px] text-[#6B7689] font-mono">VP Operations · Vertex Labs</div>
            </div>
          </figcaption>
        </figure>
      </div>
    </aside>
  );
}
