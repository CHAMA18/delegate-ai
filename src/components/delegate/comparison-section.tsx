'use client';

import { Reveal } from './reveal';

/**
 * Comparison section (brief §8.1 §7) — honest "Delegate vs …" table.
 */
export function ComparisonSection() {
  const rows = [
    { feature: 'Reads meeting transcripts', delegate: true, notes: true, chat: false },
    { feature: 'Drafts emails autonomously', delegate: true, notes: false, chat: 'partial' },
    { feature: 'Books calendar events', delegate: true, notes: false, chat: false },
    { feature: 'Updates CRM records', delegate: true, notes: false, chat: false },
    { feature: 'Long-term context memory', delegate: true, notes: false, chat: 'partial' },
    { feature: 'Multi-step action chains', delegate: true, notes: false, chat: false },
    { feature: 'Full audit trail + reversibility', delegate: true, notes: 'partial', chat: false },
    { feature: 'Works without prompting', delegate: true, notes: true, chat: false },
  ];

  const cell = (v: boolean | string) => {
    if (v === true)
      return (
        <span
          className="material-symbols-outlined text-[18px] text-[#34D399]"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
        >
          check_circle
        </span>
      );
    if (v === 'partial')
      return (
        <span
          className="material-symbols-outlined text-[18px] text-[#FBBF24]"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
        >
          change_circle
        </span>
      );
    return (
      <span
        className="material-symbols-outlined text-[18px] text-[#6B7689]"
        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
      >
        cancel
      </span>
    );
  };

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center flex flex-col gap-3 mb-14">
          <span className="text-eyebrow">Honest comparison</span>
          <h2 className="text-h2 text-[#F5F7FA]">Delegate vs. the alternatives</h2>
          <p className="text-[17px] text-[#A9B4C4] max-w-xl mx-auto leading-[1.6]">
            You&apos;re comparing tools. Here&apos;s where each one wins.
          </p>
        </Reveal>

        <Reveal>
          <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A1E36] overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-12 gap-2 px-5 md:px-7 py-4 border-b border-[rgba(255,255,255,0.08)] bg-[#031427]/60">
              <div className="col-span-6 text-[12px] uppercase tracking-[0.1em] text-[#6B7689] font-mono flex items-center">
                Capability
              </div>
              <div className="col-span-2 text-center text-[13px] font-semibold text-[#c4abff]">
                Delegate.ai
              </div>
              <div className="col-span-2 text-center text-[13px] font-medium text-[#A9B4C4]">
                Notes app
              </div>
              <div className="col-span-2 text-center text-[13px] font-medium text-[#A9B4C4]">
                Chatbot
              </div>
            </div>

            {/* Body rows */}
            {rows.map((r, i) => (
              <div
                key={r.feature}
                className={`grid grid-cols-12 gap-2 px-5 md:px-7 py-3.5 items-center text-[13px] ${
                  i % 2 === 0 ? 'bg-transparent' : 'bg-[#031427]/30'
                }`}
              >
                <div className="col-span-6 text-[#F5F7FA]">{r.feature}</div>
                <div className="col-span-2 flex justify-center">
                  {cell(r.delegate)}
                </div>
                <div className="col-span-2 flex justify-center">
                  {cell(r.notes)}
                </div>
                <div className="col-span-2 flex justify-center">
                  {cell(r.chat)}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-[12px] text-[#6B7689]">
            <div className="flex items-start gap-2">
              <span className="text-[#34D399]">●</span>
              <span>
                <span className="text-[#A9B4C4]">Delegate.ai</span> — connected,
                multi-step, autonomous, audited.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#FBBF24]">●</span>
              <span>
                <span className="text-[#A9B4C4]">Notes apps</span> (Notion,
                Obsidian) — great capture, zero execution.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#6B7689]">●</span>
              <span>
                <span className="text-[#A9B4C4]">Chatbots</span> (ChatGPT,
                Claude) — generative, but not connected to your Workspace.
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
