'use client';

import { MagneticButton } from '@/components/delegate/magnetic-button';

/**
 * Welcome banner — personalized greeting at top of overview.
 * Shows current time-of-day greeting, user name, quick action CTA,
 * and a subtle ambient background.
 */
export function WelcomeBanner({ userName = 'Maya' }: { userName?: string }) {
  const hour = typeof window !== 'undefined' ? new Date().getHours() : 12;
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <section className="relative p-6 md:p-7 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-gradient-to-br from-[#0A1E36] via-[#102544] to-[#0A1E36] overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="aurora-blob animate-aurora"
          style={{
            width: 320,
            height: 320,
            top: -100,
            right: -60,
            background: '#8B5CF6',
            opacity: 0.18,
          }}
        />
        <div
          className="aurora-blob animate-aurora"
          style={{
            width: 240,
            height: 240,
            bottom: -80,
            left: 100,
            background: '#3B82F6',
            opacity: 0.15,
            animationDelay: '6s',
          }}
        />
        <div className="absolute inset-0 dot-grid opacity-30" />
      </div>

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex flex-col gap-1.5">
          <span className="text-eyebrow">
            {greeting}, {userName}
          </span>
          <h1 className="text-[24px] md:text-[28px] font-semibold tracking-[-0.02em] text-[#F5F7FA] leading-tight">
            Your agent shipped <span className="ai-gradient-text">3 actions</span> while you were away.
          </h1>
          <p className="text-[13px] text-[#A9B4C4] max-w-xl">
            2 emails drafted · 1 calendar event created · 0 actions need your review.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <MagneticButton
            onClick={() => (window.location.href = '/dashboard')}
            className="btn-primary"
            strength={0.18}
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
            >
              auto_awesome
            </span>
            New run
          </MagneticButton>
          <button className="btn-secondary text-[13px]">
            <span
              className="material-symbols-outlined text-[16px] text-[#c4abff]"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
            >
              review
            </span>
            Review queue
            <span className="px-1.5 py-0.5 rounded-full bg-[rgba(248,113,113,0.15)] text-[#F87171] text-[10px] font-mono font-bold">
              1
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
