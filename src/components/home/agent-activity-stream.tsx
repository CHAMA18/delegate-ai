'use client';

import { useEffect, useState } from 'react';

/**
 * Agent activity stream — live-updating feed of agent actions.
 * Shows the most recent 5-6 actions the agent shipped today.
 * "Live" pulse indicator at top, action rows with bucket icons + timestamps.
 */

interface ActivityItem {
  id: number;
  icon: string;
  tint: string;
  bg: string;
  title: string;
  detail: string;
  time: string;
  status: 'shipped' | 'pending' | 'review';
}

const INITIAL_ACTIVITY: ActivityItem[] = [
  {
    id: 1,
    icon: 'mail',
    tint: '#c4abff',
    bg: 'rgba(139,92,246,0.1)',
    title: 'Email drafted to Sarah Chen',
    detail: 'Re: Q3 strategy deck · 187 words',
    time: '2m ago',
    status: 'shipped',
  },
  {
    id: 2,
    icon: 'event',
    tint: '#89ceff',
    bg: 'rgba(59,130,246,0.1)',
    title: 'Calendar event created',
    detail: 'Sync with Priya · Thu 2pm',
    time: '3m ago',
    status: 'shipped',
  },
  {
    id: 3,
    icon: 'table_chart',
    tint: '#34D399',
    bg: 'rgba(52,211,153,0.1)',
    title: 'CRM record updated',
    detail: 'Acme Corp · Discovery → Negotiation',
    time: '3m ago',
    status: 'shipped',
  },
  {
    id: 4,
    icon: 'description',
    tint: '#A9B4C4',
    bg: 'rgba(255,255,255,0.05)',
    title: 'Meeting brief generated',
    detail: 'Q3 Planning Sync · shared with #growth',
    time: '4m ago',
    status: 'shipped',
  },
  {
    id: 5,
    icon: 'task_alt',
    tint: '#FBBF24',
    bg: 'rgba(251,191,36,0.1)',
    title: 'Pending: Schedule team retro',
    detail: 'Awaiting your approval',
    time: 'now',
    status: 'review',
  },
];

export function AgentActivityStream() {
  const [activity, setActivity] = useState(INITIAL_ACTIVITY);
  const [liveCount, setLiveCount] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    // Simulate "live" pulse — increment a counter every 8s
    const interval = setInterval(() => {
      setLiveCount((c) => c + 1);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col gap-3 p-5 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#0A1E36]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[18px] text-[#c4abff]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
          >
            smart_toy
          </span>
          <h2 className="text-[16px] font-semibold text-[#F5F7FA]">Agent activity</h2>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[rgba(52,211,153,0.25)] bg-[rgba(52,211,153,0.05)] text-[10px] text-[#34D399] font-mono uppercase tracking-[0.08em]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
          Live
        </span>
      </div>

      {/* Activity items */}
      <div className="flex flex-col gap-1.5">
        {activity.map((item, i) => (
          <div
            key={item.id}
            className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#102544] transition-colors relative"
          >
            {/* Timeline dot + connector */}
            {i < activity.length - 1 && (
              <div className="absolute left-[22px] top-12 bottom-[-12px] w-px bg-[rgba(255,255,255,0.06)]" />
            )}

            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 relative z-10"
              style={{ backgroundColor: item.bg, border: `1px solid ${item.tint}30` }}
            >
              <span
                className="material-symbols-outlined text-[16px]"
                style={{ color: item.tint, fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                {item.status === 'shipped' ? item.icon : item.status === 'review' ? 'pending_actions' : 'schedule'}
              </span>
            </div>

            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[12px] font-medium text-[#F5F7FA] truncate">
                  {item.title}
                </span>
                <span className="text-[10px] text-[#6B7689] font-mono ml-auto flex-shrink-0">
                  {item.time}
                </span>
              </div>
              <div className="text-[11px] text-[#6B7689] truncate font-mono">
                {item.detail}
              </div>
            </div>

            {/* Status icon */}
            {item.status === 'shipped' ? (
              <span
                className="material-symbols-outlined text-[14px] text-[#34D399] mt-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                check_circle
              </span>
            ) : item.status === 'review' ? (
              <button className="px-2 py-1 rounded-md text-[10px] font-semibold bg-[rgba(139,92,246,0.15)] text-[#c4abff] hover:bg-[rgba(139,92,246,0.25)] transition-colors flex-shrink-0 mt-0.5">
                Review
              </button>
            ) : null}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="pt-3 mt-1 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-[11px] text-[#6B7689] font-mono">
        <span>4 shipped today · 1 pending</span>
        <button className="text-[#c4abff] hover:text-[#F5F7FA] transition-colors inline-flex items-center gap-1">
          View full log
          <span
            className="material-symbols-outlined text-[12px]"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
          >
            arrow_forward
          </span>
        </button>
      </div>
    </section>
  );
}
