'use client';

import { Reveal } from './reveal';
import { Spotlight } from './spotlight';

/**
 * Feature bento grid (brief §8.1 §6 / §2.4).
 * Asymmetric, Ramp-style. Big tile = "Works across Google Workspace".
 */
export function BentoSection() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center flex flex-col gap-3 mb-14">
          <span className="text-eyebrow">The platform</span>
          <h2 className="text-h2 text-[#F5F7FA]">
            Built for the work that follows the meeting
          </h2>
        </Reveal>

        <Spotlight className="rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
            {/* HERO TILE — Works across Google Workspace (col-span 4, row-span 2) */}
            <Reveal
              className="md:col-span-4 md:row-span-2"
              delay={0}
            >
              <div className="relative h-full p-7 md:p-9 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A1E36] overflow-hidden group hover:border-[rgba(139,92,246,0.4)] transition-all duration-300">
                {/* Ambient gradient */}
                <div
                  className="absolute -top-32 -right-32 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(139,92,246,0.6), transparent 70%)',
                  }}
                />

                <div className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="material-symbols-outlined text-[20px] text-[#c4abff]"
                      style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                    >
                      hub
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.12em] text-[#c4abff] font-mono">
                      Native integration
                    </span>
                  </div>
                  <h3 className="text-[28px] md:text-[32px] font-semibold tracking-[-0.02em] text-[#F5F7FA] mb-3">
                    Works where you already work
                  </h3>
                  <p className="text-[15px] text-[#A9B4C4] leading-[1.7] mb-6 max-w-md">
                    First-class Gmail, Calendar, Drive, Contacts, and CRM
                    connectors. Not Zapier glue. Not brittle webhooks. Just
                    the agent, inside the apps you live in.
                  </p>

                  {/* Workspace apps grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {[
                      { icon: 'mail', label: 'Gmail' },
                      { icon: 'event', label: 'Calendar' },
                      { icon: 'description', label: 'Docs' },
                      { icon: 'task_alt', label: 'Tasks' },
                      { icon: 'table_chart', label: 'Sheets' },
                    ].map((app) => (
                      <div
                        key={app.label}
                        className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#031427]/60 hover:border-[rgba(139,92,246,0.3)] hover:bg-[#102544] transition-all"
                      >
                        <span
                          className="material-symbols-outlined text-[22px] text-[#A9B4C4] group-hover:text-[#F5F7FA] transition-colors"
                          style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                        >
                          {app.icon}
                        </span>
                        <span className="text-[11px] text-[#6B7689] font-mono">
                          {app.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* TILE 2 — Human in the loop */}
            <Reveal className="md:col-span-2" delay={80}>
              <div className="h-full p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A1E36] hover:border-[rgba(139,92,246,0.4)] transition-all duration-300 hover:-translate-y-1">
                <span
                  className="material-symbols-outlined text-[22px] text-[#89ceff] mb-3 block"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                >
                  shield_lock
                </span>
                <h3 className="text-[17px] font-semibold text-[#F5F7FA] mb-1.5">
                  Human-in-the-loop
                </h3>
                <p className="text-[13px] text-[#A9B4C4] leading-[1.6]">
                  Set approval thresholds. The agent asks before high-stakes
                  actions, and learns from your decisions.
                </p>
              </div>
            </Reveal>

            {/* TILE 3 — Long-term memory */}
            <Reveal className="md:col-span-2" delay={160}>
              <div className="h-full p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A1E36] hover:border-[rgba(139,92,246,0.4)] transition-all duration-300 hover:-translate-y-1">
                <span
                  className="material-symbols-outlined text-[22px] text-[#c4abff] mb-3 block"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                >
                  memory
                </span>
                <h3 className="text-[17px] font-semibold text-[#F5F7FA] mb-1.5">
                  Long-term memory
                </h3>
                <p className="text-[13px] text-[#A9B4C4] leading-[1.6]">
                  Remembers prior decisions, stakeholders, and preferences —
                  across every meeting, forever.
                </p>
              </div>
            </Reveal>

            {/* TILE 4 — Priority routing */}
            <Reveal className="md:col-span-3" delay={240}>
              <div className="h-full p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A1E36] hover:border-[rgba(139,92,246,0.4)] transition-all duration-300 hover:-translate-y-1">
                <span
                  className="material-symbols-outlined text-[22px] text-[#89ceff] mb-3 block"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                >
                  target
                </span>
                <h3 className="text-[17px] font-semibold text-[#F5F7FA] mb-1.5">
                  Priority-aware routing
                </h3>
                <p className="text-[13px] text-[#A9B4C4] leading-[1.6]">
                  Urgent commitments ship in seconds. Strategic work batches
                  for review. You decide the threshold.
                </p>
              </div>
            </Reveal>

            {/* TILE 5 — Audit trail */}
            <Reveal className="md:col-span-3" delay={320}>
              <div className="h-full p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A1E36] hover:border-[rgba(139,92,246,0.4)] transition-all duration-300 hover:-translate-y-1">
                <span
                  className="material-symbols-outlined text-[22px] text-[#c4abff] mb-3 block"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                >
                  monitoring
                </span>
                <h3 className="text-[17px] font-semibold text-[#F5F7FA] mb-1.5">
                  Full audit trail
                </h3>
                <p className="text-[13px] text-[#A9B4C4] leading-[1.6]">
                  Every action logged, replayable, reversible. Compliance
                  teams love it. So will your future self.
                </p>
              </div>
            </Reveal>
          </div>
        </Spotlight>
      </div>
    </section>
  );
}
