'use client';

import { Reveal } from './reveal';

/**
 * Problem section — brief §8.1 §3: "3 seconds of empathy."
 * Sticky scroll: a meeting note "fades" while ghost-tasks pile up.
 */
export function ProblemSection() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left — copy */}
          <div className="flex flex-col gap-5">
            <span className="text-eyebrow">The problem</span>
            <h2 className="text-h2 text-[#F5F7FA]">
              Meeting notes die in a doc.
              <br />
              <span className="text-[#6B7689]">Nothing becomes action.</span>
            </h2>
            <p className="text-[17px] text-[#A9B4C4] leading-[1.7]">
              You took great notes. The decisions are clear. And yet — the
              follow-up email never got sent. The CRM stayed stale. The
              calendar never got the block. The note itself rotted in a
              Notion page nobody opens again.
            </p>
            <p className="text-[17px] text-[#A9B4C4] leading-[1.7]">
              Summarizers make this worse, not better. They give you a tidier
              version of the same dead document. What you needed was someone —
              or something — to <span className="text-[#F5F7FA] font-medium">do</span>{' '}
              the work.
            </p>
          </div>

          {/* Right — visual: meeting note decaying into ghost tasks */}
          <Reveal>
            <div className="relative">
              {/* Fading meeting note */}
              <div className="relative p-6 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A1E36] gradient-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-[16px] text-[#6B7689]"
                      style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                    >
                      description
                    </span>
                    <span className="text-[12px] text-[#6B7689] font-mono">
                      Q4-planning-sync.md
                    </span>
                  </div>
                  <span className="text-[10px] text-[#6B7689] font-mono">14d ago</span>
                </div>
                <div className="font-mono text-[12px] text-[#A9B4C4] leading-[1.8] space-y-1">
                  <div className="text-[#F5F7FA] font-semibold">Q4 Planning Sync</div>
                  <div>Priya: ship API docs by EOW</div>
                  <div>Marcus: move Acme → negotiation</div>
                  <div>Action: follow up with Priya</div>
                  <div>Action: schedule sync Thu 2pm</div>
                  <div>Action: update CRM stage</div>
                  <div className="text-[#6B7689]">…</div>
                </div>
                {/* Decay overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#031427] rounded-2xl pointer-events-none" />
              </div>

              {/* Ghost tasks piling up below */}
              <div className="mt-4 flex flex-col gap-1.5">
                {[
                  { t: 'Follow up with Priya', s: 'overdue · 14 days' },
                  { t: 'Schedule sync Thursday 2pm', s: 'never booked' },
                  { t: 'Update CRM deal stage', s: 'still: discovery' },
                ].map((g, i) => (
                  <div
                    key={g.t}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[rgba(248,113,113,0.15)] bg-[rgba(248,113,113,0.03)]"
                    style={{ opacity: 1 - i * 0.18 }}
                  >
                    <span
                      className="material-symbols-outlined text-[14px] text-[#F87171]"
                      style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                    >
                      error
                    </span>
                    <span className="text-[12px] text-[#A9B4C4] flex-grow">{g.t}</span>
                    <span className="text-[10px] text-[#6B7689] font-mono">{g.s}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
