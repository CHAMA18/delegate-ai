'use client';

import { useState } from 'react';
import { Reveal } from './reveal';

/**
 * FAQ section (brief §8.1 §12 — optional but valuable).
 * Accordion with real search-phrased questions.
 */
export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is Delegate.ai an AI agent or just another summarizer?',
      a: 'It\'s a true agent. Summarizers condense your notes into a tidier document. Delegate.ai reads the transcript, identifies every commitment — explicit and implied — and executes them in Google Workspace: drafts and sends emails, books calendar events, updates CRM records, generates docs. The output is shipped work, not a summary.',
    },
    {
      q: 'How does it differ from ChatGPT or Claude with Workspace access?',
      a: 'Chatbots are conversational — you prompt, they respond. Delegate.ai is autonomous: it ingests the transcript on its own, plans the full action set, and ships them. You don\'t have to ask. It also has long-term memory across meetings, multi-step action chains (e.g. "draft email → wait for approval → schedule follow-up → update CRM"), and a full audit trail. Chatbots have none of that.',
    },
    {
      q: 'Can I review actions before they ship?',
      a: 'Yes — and you should, especially at first. Set approval thresholds by risk: low-risk actions (calendar blocks, doc drafts) ship autonomously; high-risk ones (sending external emails, updating CRM stages) require your tap. The agent learns from your approvals and tightens its autonomy over time.',
    },
    {
      q: 'Is my meeting data secure?',
      a: 'Yes. SOC 2 Type II certified, GDPR compliant, and your data is encrypted at rest (AES-256) and in transit (TLS 1.3). We never train foundation models on your data. Meeting transcripts are processed in your region and retained only as long as your audit window requires — default 90 days, configurable down to 7.',
    },
    {
      q: 'What if it makes a mistake?',
      a: 'Every action is logged and reversible from the audit trail. You can undo any action with one click, and the agent flags low-confidence actions for your review before shipping. We also surface a "diff view" — exactly what would change in Gmail / Calendar / CRM — for every action, so you\'re never surprised.',
    },
    {
      q: 'Does it work with non-Google tools?',
      a: 'Today, Delegate.ai is Google Workspace-native. Slack and Linear integrations ship actions as messages / tickets. Notion, HubSpot, and Salesforce are on the near-term roadmap. If you need non-Google stacks today, use n8n or Zapier — we\'re not trying to be everything.',
    },
  ];

  return (
    <section className="relative py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="text-center flex flex-col gap-3 mb-14">
          <span className="text-eyebrow">FAQ</span>
          <h2 className="text-h2 text-[#F5F7FA]">The honest questions</h2>
        </Reveal>

        <Reveal className="flex flex-col gap-2">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0A1E36] overflow-hidden transition-colors hover:border-[rgba(139,92,246,0.25)]"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-[15px] md:text-[16px] font-medium text-[#F5F7FA]">
                    {f.q}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[20px] text-[#6B7689] transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                  >
                    add
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 md:px-6 pb-5 text-[14px] text-[#A9B4C4] leading-[1.7]">
                      {f.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
