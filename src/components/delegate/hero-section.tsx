'use client';

import { Reveal } from './reveal';
import { CountUp } from './count-up';

/**
 * Hero section — kinetic headline, action-cascade mockup, magnetic CTA.
 * Brief §3.1 canonical structure + §8.2 signature interactions.
 */
export function HeroSection({ children }: { children?: React.ReactNode }) {
  return (
    <section className="relative pt-12 md:pt-20 pb-16">
      {/* Ambient background — aurora blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="aurora-blob animate-aurora"
          style={{
            width: 520,
            height: 520,
            top: -120,
            left: '-10%',
            background: '#8B5CF6',
            opacity: 0.28,
          }}
        />
        <div
          className="aurora-blob animate-aurora"
          style={{
            width: 420,
            height: 420,
            top: 80,
            right: '-5%',
            background: '#3B82F6',
            opacity: 0.22,
            animationDelay: '6s',
          }}
        />
        <div className="absolute inset-0 dot-grid opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-7 max-w-3xl mx-auto">
          {/* Eyebrow badge */}
          <div className="reveal is-visible inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(139,92,246,0.3)] bg-[rgba(139,92,246,0.05)] text-[11px] text-[#c4abff] font-mono uppercase tracking-[0.1em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4abff] animate-pulse" />
            Now in private beta
            <span className="text-[#6B7689]">·</span>
            <span className="text-[#A9B4C4]">Powered by Gemini 2.5 Pro</span>
          </div>

          {/* Headline — kinetic word swap */}
          <h1 className="text-hero text-[#F5F7FA] max-w-4xl">
            Your meeting notes,
            <br />
            <span className="text-serif text-[0.92em] font-normal text-[#A9B4C4] italic mr-2">
              already
            </span>
            {children}
          </h1>

          {/* Subhead */}
          <p className="text-[18px] md:text-[19px] text-[#A9B4C4] max-w-2xl leading-[1.6] font-normal">
            Delegate.ai reads your transcripts and ships the follow-up — emails
            drafted, events booked, CRM updated, docs generated — across Google
            Workspace, autonomously.
          </p>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <a href="/dashboard" className="btn-primary group">
              Start delegating
              <span
                className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-0.5"
                style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
              >
                arrow_forward
              </span>
            </a>
            <a href="#demo" className="btn-secondary group">
              <span
                className="material-symbols-outlined text-[18px] text-[#c4abff]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                play_circle
              </span>
              Watch 90s demo
            </a>
          </div>

          {/* Trust line */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[12px] text-[#6B7689] font-mono mt-2">
            <span className="inline-flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[13px] text-[#34D399]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                verified
              </span>
              SOC 2 Type II
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[13px] text-[#34D399]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                verified
              </span>
              GDPR
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[13px] text-[#6B7689]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                credit_card_off
              </span>
              No credit card
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Trust strip — monochrome logos + count-up stats (brief §3.4).
 */
export function TrustStrip() {
  const brands = ['Northwind', 'Acme', 'Vertex', 'Lumen', 'Helios', 'Cobalt', 'Strata', 'Meridian'];
  return (
    <section className="relative py-14 border-y border-[rgba(255,255,255,0.06)] bg-[#0A1E36]/30">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-[11px] uppercase tracking-[0.16em] text-[#6B7689] font-mono mb-8">
          Trusted by execution-first teams
        </p>

        {/* Logo marquee */}
        <div className="relative overflow-hidden mb-12">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#031427] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#031427] to-transparent z-10 pointer-events-none" />
          <div className="marquee-track gap-12 items-center">
            {[...brands, ...brands].map((b, i) => (
              <span
                key={`${b}-${i}`}
                className="text-[18px] md:text-[22px] font-semibold tracking-[-0.02em] text-[#A9B4C4] whitespace-nowrap opacity-60 hover:opacity-100 hover:text-[#F5F7FA] transition-all"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { stat: 4.2, decimals: 1, suffix: 'h', label: 'Saved per user per week' },
            { stat: 97, decimals: 0, suffix: '%', label: 'Action recall accuracy' },
            { stat: 12, decimals: 0, suffix: 's', label: 'Avg time to first action' },
            { stat: 1042836, decimals: 0, suffix: '+', label: 'Actions shipped autonomously' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="flex flex-col gap-1 text-center md:text-left">
                <div
                  className="text-[36px] md:text-[44px] font-semibold tracking-[-0.03em] leading-none"
                  style={{
                    color: i % 2 === 0 ? '#c4abff' : '#89ceff',
                  }}
                >
                  {s.stat >= 100000 ? (
                    <>
                      <CountUp to={1} suffix="M+" />
                    </>
                  ) : (
                    <CountUp
                      to={s.stat}
                      decimals={s.decimals}
                      suffix={s.suffix}
                    />
                  )}
                </div>
                <div className="text-[12px] md:text-[13px] text-[#A9B4C4] leading-snug">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
