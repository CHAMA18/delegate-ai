'use client';

import { Reveal } from './reveal';

/**
 * How it works — brief §8.1 §5: sticky-scroll narrative, 3 steps.
 * Capture → Plan → Approve & Execute.
 *
 * Implementation: sticky left column + scrolling right visual.
 */
export function HowItWorksSection() {
  const steps = [
    {
      n: '01',
      icon: 'fiber_manual_record',
      title: 'Capture',
      copy:
        'Connect Delegate.ai to Meet, Zoom, Otter, Granola, or upload any transcript. No prep, no prompting, no templates. The agent listens alongside you.',
      tags: ['Meet', 'Zoom', 'Otter', 'Granola', '+6 more'],
    },
    {
      n: '02',
      icon: 'psychology',
      title: 'Plan',
      copy:
        'Gemini 2.5 Pro reads the full transcript — not just the explicit action items, but the implied commitments, the urgency, and the stakeholders. It drafts a plan: which actions, in which Workspace app, to whom.',
      tags: ['Gemini 2.5 Pro', 'Multimodal', 'Intent', 'Priority'],
    },
    {
      n: '03',
      icon: 'rocket_launch',
      title: 'Approve & execute',
      copy:
        'You approve — or set thresholds so Delegate ships autonomously for low-risk actions. Gmail drafts send, Calendar events book, CRM records update, Docs generate — all logged, all reversible.',
      tags: ['Gmail', 'Calendar', 'Drive', 'CRM', 'Full audit trail'],
    },
  ];

  return (
    <section id="how" className="relative py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center flex flex-col gap-3 mb-16">
          <span className="text-eyebrow">How it works</span>
          <h2 className="text-h2 text-[#F5F7FA]">Three steps. From transcript to done.</h2>
          <p className="text-[17px] text-[#A9B4C4] max-w-xl mx-auto leading-[1.6]">
            No prompts to engineer. No flows to draw. No glue code.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 100}>
              <div className="group relative h-full p-7 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A1E36] hover:border-[rgba(139,92,246,0.4)] hover:bg-[#102544] transition-all duration-300 hover:-translate-y-1">
                {/* Step number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#031427] flex items-center justify-center text-[#c4abff] group-hover:border-[rgba(139,92,246,0.4)] transition-colors">
                    <span
                      className="material-symbols-outlined text-[22px]"
                      style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                    >
                      {step.icon}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#6B7689] font-mono tracking-[0.1em]">
                    {step.n}
                  </span>
                </div>

                <h3 className="text-[22px] font-semibold text-[#F5F7FA] mb-2 tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p className="text-[14px] text-[#A9B4C4] leading-[1.7] mb-5">
                  {step.copy}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-[rgba(255,255,255,0.06)]">
                  {step.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] rounded font-mono border border-[rgba(255,255,255,0.08)] text-[#6B7689]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Connecting arrow on desktop */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-[rgba(255,255,255,0.1)] bg-[#031427] items-center justify-center z-10">
                    <span
                      className="material-symbols-outlined text-[12px] text-[#6B7689]"
                      style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                    >
                      arrow_forward
                    </span>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
