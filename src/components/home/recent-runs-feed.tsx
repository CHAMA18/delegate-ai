'use client';

import { useState } from 'react';

/**
 * Recent runs feed — left column of overview dashboard.
 * Shows the last 5-6 agent runs with status, transcript excerpt, action count.
 * Click to expand or replay.
 */

type RunStatus = 'complete' | 'executing' | 'failed' | 'queued';

interface Run {
  id: string;
  title: string;
  excerpt: string;
  timestamp: string;
  duration: string;
  actions: number;
  status: RunStatus;
  bucket: 'gmail' | 'calendar' | 'tasks' | 'docs' | 'mixed';
}

const RUNS: Run[] = [
  {
    id: 'run-1',
    title: 'Q3 Planning Sync',
    excerpt: 'Priya: ship API docs by EOW. Marcus: move Acme → negotiation...',
    timestamp: '2m ago',
    duration: '13.4s',
    actions: 3,
    status: 'complete',
    bucket: 'mixed',
  },
  {
    id: 'run-2',
    title: 'Discovery Call · Acme Corp',
    excerpt: 'Sarah needs SOC 2 docs by Friday. David wants API sandbox access...',
    timestamp: '18m ago',
    duration: '8.2s',
    actions: 4,
    status: 'complete',
    bucket: 'gmail',
  },
  {
    id: 'run-3',
    title: 'Eng Standup',
    excerpt: 'Anya: blocked on Stripe API docs. Ben: dashboard redesign shipped...',
    timestamp: '1h ago',
    duration: '11.7s',
    actions: 3,
    status: 'complete',
    bucket: 'tasks',
  },
  {
    id: 'run-4',
    title: 'Customer Sync · Lumen Health',
    excerpt: 'Reviewing Q2 retention metrics, action items for ops team...',
    timestamp: '3h ago',
    duration: '—',
    actions: 0,
    status: 'executing',
    bucket: 'mixed',
  },
  {
    id: 'run-5',
    title: 'Board Prep · September',
    excerpt: 'Investor update draft, key wins, key risks, ask for additional...',
    timestamp: 'Yesterday',
    duration: '15.1s',
    actions: 5,
    status: 'complete',
    bucket: 'docs',
  },
];

const BUCKET_META: Record<Run['bucket'], { icon: string; tint: string }> = {
  gmail: { icon: 'mail', tint: '#c4abff' },
  calendar: { icon: 'event', tint: '#89ceff' },
  tasks: { icon: 'task_alt', tint: '#34D399' },
  docs: { icon: 'description', tint: '#A9B4C4' },
  mixed: { icon: 'hub', tint: '#c4abff' },
};

const STATUS_META: Record<RunStatus, { label: string; class: string; dot: string }> = {
  complete: {
    label: 'Shipped',
    class: 'bg-[rgba(52,211,153,0.1)] text-[#34D399] border-[rgba(52,211,153,0.2)]',
    dot: 'bg-[#34D399]',
  },
  executing: {
    label: 'Executing',
    class: 'bg-[rgba(139,92,246,0.1)] text-[#c4abff] border-[rgba(139,92,246,0.25)]',
    dot: 'bg-[#8B5CF6] animate-pulse',
  },
  failed: {
    label: 'Failed',
    class: 'bg-[rgba(248,113,113,0.1)] text-[#F87171] border-[rgba(248,113,113,0.2)]',
    dot: 'bg-[#F87171]',
  },
  queued: {
    label: 'Queued',
    class: 'bg-[rgba(251,191,36,0.1)] text-[#FBBF24] border-[rgba(251,191,36,0.2)]',
    dot: 'bg-[#FBBF24]',
  },
};

export function RecentRunsFeed() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="flex flex-col gap-3 p-5 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#0A1E36]">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[18px] text-[#c4abff]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
          >
            history
          </span>
          <h2 className="text-[16px] font-semibold text-[#F5F7FA]">Recent runs</h2>
          <span className="text-[11px] text-[#6B7689] font-mono">·  {RUNS.length} this week</span>
        </div>
        <button className="text-[12px] text-[#A9B4C4] hover:text-[#F5F7FA] inline-flex items-center gap-1 transition-colors">
          View all
          <span
            className="material-symbols-outlined text-[14px]"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
          >
            arrow_forward
          </span>
        </button>
      </div>

      {/* Runs list */}
      <div className="flex flex-col gap-1.5">
        {RUNS.map((run) => {
          const bucket = BUCKET_META[run.bucket];
          const status = STATUS_META[run.status];
          const isExpanded = expandedId === run.id;

          return (
            <div
              key={run.id}
              className={`group rounded-xl border transition-all duration-200 cursor-pointer ${
                isExpanded
                  ? 'border-[rgba(139,92,246,0.3)] bg-[#102544]'
                  : 'border-[rgba(255,255,255,0.04)] bg-[#031427]/60 hover:border-[rgba(139,92,246,0.2)] hover:bg-[#102544]/60'
              }`}
              onClick={() => setExpandedId(isExpanded ? null : run.id)}
            >
              <div className="flex items-center gap-3 p-3">
                {/* Bucket icon */}
                <div
                  className="w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0"
                  style={{
                    borderColor: `${bucket.tint}30`,
                    backgroundColor: `${bucket.tint}10`,
                  }}
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ color: bucket.tint, fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                  >
                    {bucket.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[13px] font-medium text-[#F5F7FA] truncate">
                      {run.title}
                    </span>
                    <span className="text-[10px] text-[#6B7689] font-mono flex-shrink-0">
                      {run.timestamp}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#6B7689] truncate font-mono">
                    {run.excerpt}
                  </div>
                </div>

                {/* Status pill */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] uppercase font-bold tracking-[0.05em] font-mono flex-shrink-0 ${status.class}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-3 pb-3 pt-1 border-t border-[rgba(255,255,255,0.06)] flex flex-col gap-2">
                  <div className="flex items-center gap-4 text-[11px] text-[#6B7689] font-mono pt-2">
                    <span className="inline-flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                      >
                        bolt
                      </span>
                      {run.actions} actions
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                      >
                        schedule
                      </span>
                      {run.duration}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                      >
                        {bucket.icon}
                      </span>
                      {run.bucket}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button className="px-3 py-1 rounded-md text-[11px] font-medium bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white inline-flex items-center gap-1 hover:opacity-90 transition-opacity">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                      >
                        replay
                      </span>
                      Replay run
                    </button>
                    <button className="px-3 py-1 rounded-md text-[11px] font-medium border border-[rgba(255,255,255,0.1)] text-[#A9B4C4] hover:text-[#F5F7FA] hover:border-[rgba(139,92,246,0.3)] transition-colors inline-flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                      >
                        open_in_new
                      </span>
                      Open audit trail
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
