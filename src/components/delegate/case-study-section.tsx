'use client';

import { Reveal } from './reveal';

/**
 * Case study section (brief §8.1 §8).
 * One hero customer story leading with a specific metric.
 */
export function CaseStudySection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <figure className="relative rounded-2xl border border-[rgba(255,255,255,0.08)] bg-gradient-to-br from-[#0A1E36] via-[#102544] to-[#0A1E36] p-8 md:p-14 overflow-hidden">
            {/* Ambient blobs */}
            <div
              className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-25 blur-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(139,92,246,0.8), transparent 70%)',
              }}
            />
            <div
              className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(59,130,246,0.8), transparent 70%)',
              }}
            />

            <div className="relative grid grid-cols-1 md:grid-cols-5 gap-10 items-center">
              {/* Left: big number */}
              <div className="md:col-span-2 flex flex-col">
                <span className="text-eyebrow mb-2">Vertex Labs · 6 months</span>
                <div className="ai-gradient-text-wide text-[64px] md:text-[80px] font-semibold leading-none tracking-[-0.04em]">
                  6h → 4m
                </div>
                <p className="text-[13px] text-[#A9B4C4] mt-3 leading-[1.6]">
                  Weekly follow-up admin time, per user, across a 40-person
                  ops team.
                </p>
              </div>

              {/* Right: quote */}
              <div className="md:col-span-3">
                <span
                  className="material-symbols-outlined text-[40px] text-[#8B5CF6]/60 mb-3 block"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                >
                  format_quote
                </span>
                <blockquote className="text-[20px] md:text-[26px] text-[#F5F7FA] font-medium leading-[1.4] tracking-[-0.01em] mb-6">
                  We went from 14 hours of weekly meeting follow-up to under 90
                  minutes. Delegate.ai isn&apos;t a summarizer — it&apos;s a
                  teammate that never sleeps.
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center text-[#031427] font-bold text-[13px]">
                    MK
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-[#F5F7FA]">
                      Maya Krishnan
                    </div>
                    <div className="text-[12px] text-[#6B7689] font-mono">
                      VP Operations · Vertex Labs
                    </div>
                  </div>
                </figcaption>
              </div>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
