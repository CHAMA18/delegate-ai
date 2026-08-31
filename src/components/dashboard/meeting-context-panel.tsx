'use client';

import { useState } from 'react';

/**
 * Left panel — Meeting Context input.
 * Textarea with preset templates + Execute Meeting button.
 */

interface Preset {
  id: string;
  label: string;
  icon: string;
  transcript: string;
}

const PRESETS: Preset[] = [
  {
    id: 'q3-sync',
    label: 'Q3 Sync',
    icon: 'groups',
    transcript: `Q3 Planning Sync — 10:14 AM

Priya: we should ship the API docs by EOW. I'll loop in engineering tomorrow. Also need to follow up with Sarah at Acme on the contract — she asked for an updated strategy deck.

Marcus: CRM is still showing Acme in "discovery" — let's move them to "negotiation". Also, block Friday for deep work on the pricing model.

Action: send follow-up email to Sarah with the strategy deck attached.
Action: schedule 30m sync with Priya on Thursday 2pm.
Action: update CRM deal stage for Acme → negotiation.`,
  },
  {
    id: 'customer-call',
    label: 'Customer Call',
    icon: 'call',
    transcript: `Discovery Call with Acme Corp — 2:32 PM

Attendees: Maya (us), Sarah Chen (Acme), David Park (Acme)

Sarah: We're evaluating Delegate.ai against three other tools. Main concern is security review — we need SOC 2 docs by Friday. Also need a 30-day pilot setup.

David: Engineering wants API access. Can we get sandbox credentials?

Maya: I'll send the SOC 2 Type II report today, schedule the pilot kickoff for Monday, and loop in our solutions engineer for the API sandbox.

Action: send SOC 2 report to Sarah and David.
Action: schedule pilot kickoff for Monday 10am with 4 attendees.
Action: create CRM contact for David Park, CTO at Acme.`,
  },
  {
    id: 'standup',
    label: 'Standup',
    icon: 'coffee',
    transcript: `Eng Standup — 9:00 AM

Anya: finished the auth refactor yesterday. Today working on the webhook retry logic. Blocked on the Stripe API docs — need them reviewed.

Ben: shipped the dashboard redesign. Got feedback from design — needs tweaks to the chart colors. Will send out for review by EOD.

Carlos: still on the bug bash. Found 3 criticals in the action queue. Will file tickets and ping on Slack.

Action: send Ben design feedback to Maya for review.
Action: create Linear tickets for the 3 critical bugs Carlos found.
Action: schedule design review for tomorrow at 11am.`,
  },
];

export function MeetingContextPanel({
  transcript,
  onTranscriptChange,
  onExecute,
  isExecuting,
}: {
  transcript: string;
  onTranscriptChange: (v: string) => void;
  onExecute: () => void;
  isExecuting: boolean;
}) {
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const loadPreset = (preset: Preset) => {
    onTranscriptChange(preset.transcript);
    setActivePreset(preset.id);
  };

  const charCount = transcript.length;
  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;

  return (
    <section className="flex-1 flex flex-col gap-3 bg-[#0A1E36] rounded-2xl border border-[rgba(255,255,255,0.06)] p-5 min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-[22px] font-semibold text-[#F5F7FA] tracking-[-0.02em]">
            Meeting Context
          </h2>
          <p className="text-[12px] text-[#6B7689] font-mono">
            Paste transcript, notes, or sync recording
          </p>
        </div>
        <span
          className={`px-2.5 py-1 rounded-md text-[11px] font-mono uppercase tracking-[0.08em] ${
            transcript.trim().length > 0
              ? 'bg-[rgba(52,211,153,0.1)] text-[#34D399] border border-[rgba(52,211,153,0.25)]'
              : 'bg-[#102544] text-[#6B7689]'
          }`}
        >
          {transcript.trim().length > 0 ? 'Ready' : 'Input Required'}
        </span>
      </div>

      {/* Preset chips */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] uppercase tracking-[0.1em] text-[#6B7689] font-mono mr-1">
          Try:
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => loadPreset(p)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all ${
              activePreset === p.id
                ? 'border-[rgba(139,92,246,0.4)] bg-[rgba(139,92,246,0.1)] text-[#c4abff]'
                : 'border-[rgba(255,255,255,0.08)] bg-[#031427]/60 text-[#A9B4C4] hover:border-[rgba(139,92,246,0.3)] hover:text-[#F5F7FA]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[13px]"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
            >
              {p.icon}
            </span>
            {p.label}
          </button>
        ))}
        <button
          onClick={() => {
            onTranscriptChange('');
            setActivePreset(null);
          }}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-[#6B7689] hover:text-[#F87171] transition-colors ml-1"
        >
          <span
            className="material-symbols-outlined text-[13px]"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
          >
            delete
          </span>
          Clear
        </button>
      </div>

      {/* Textarea */}
      <div className="flex-1 flex flex-col min-h-0">
        <textarea
          value={transcript}
          onChange={(e) => {
            onTranscriptChange(e.target.value);
            setActivePreset(null);
          }}
          placeholder={`e.g., "Discussed Q3 roadmap with Sarah. Need to schedule a follow-up next Tuesday and send her the updated strategy deck..."`}
          className="flex-1 w-full bg-[#031427] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 text-[14px] text-[#F5F7FA] font-mono leading-[1.7] resize-none placeholder:text-[#6B7689]/70 focus:border-[rgba(139,92,246,0.4)] focus:ring-2 focus:ring-[rgba(139,92,246,0.15)] outline-none transition-all min-h-[200px]"
          spellCheck={false}
        />

        {/* Footer: char/word count + Execute */}
        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 text-[11px] text-[#6B7689] font-mono">
            <span>
              <span className="text-[#A9B4C4]">{wordCount}</span> words
            </span>
            <span>
              <span className="text-[#A9B4C4]">{charCount.toLocaleString()}</span> chars
            </span>
            <span className="hidden lg:inline">
              ~{Math.max(1, Math.ceil(wordCount / 200))} min read
            </span>
          </div>

          <button
            onClick={onExecute}
            disabled={isExecuting || transcript.trim().length === 0}
            className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-semibold transition-all ${
              isExecuting
                ? 'bg-[#102544] text-[#6B7689] cursor-not-allowed'
                : transcript.trim().length === 0
                  ? 'bg-[#102544] text-[#6B7689] cursor-not-allowed'
                  : 'btn-primary hover:scale-[1.02]'
            }`}
          >
            {isExecuting ? (
              <>
                <span
                  className="material-symbols-outlined text-[18px] animate-spin"
                  style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                >
                  progress_activity
                </span>
                Executing…
              </>
            ) : (
              <>
                <span
                  className="material-symbols-outlined text-[18px] transition-transform group-hover:scale-110"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                >
                  auto_awesome
                </span>
                Execute Meeting
                <span
                  className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5"
                  style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                >
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
