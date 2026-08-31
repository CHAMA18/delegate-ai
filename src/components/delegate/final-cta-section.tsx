'use client';

import { Reveal } from './reveal';
import { Spotlight } from './spotlight';

/**
 * Final CTA section (brief §8.1 §11) — quiet, confident close.
 */
export function FinalCtaSection() {
  return (
    <section id="cta" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <Spotlight className="relative rounded-3xl border border-[rgba(255,255,255,0.08)] bg-gradient-to-br from-[#0A1E36] via-[#102544] to-[#0A1E36] p-10 md:p-16 overflow-hidden">
            {/* Background grid + aurora */}
            <div className="absolute inset-0 line-grid opacity-60 pointer-events-none" />
            <div
              className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[400px] pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle, rgba(139,92,246,0.35), transparent 65%)',
                filter: 'blur(60px)',
              }}
            />

            <div className="relative flex flex-col items-center text-center gap-5">
              <span className="text-eyebrow">Your next meeting</span>
              <h2 className="text-h2 text-[#F5F7FA] max-w-2xl">
                Your next meeting could{' '}
                <span className="text-serif italic text-[#c4abff]">ship itself</span>.
              </h2>
              <p className="text-[17px] text-[#A9B4C4] max-w-lg leading-[1.6]">
                Deploy your first agent in under five minutes. No credit card,
                no sales call — just execution.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-3">
                <a href="/dashboard" className="btn-primary group">
                  Start delegating
                  <span
                    className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5"
                    style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                  >
                    arrow_forward
                  </span>
                </a>
                <a href="#" className="btn-secondary">
                  Talk to the team
                </a>
              </div>
              <p className="text-[11px] text-[#6B7689] font-mono mt-3">
                Free tier · No credit card · Cancel anytime
              </p>
            </div>
          </Spotlight>
        </Reveal>
      </div>
    </section>
  );
}
