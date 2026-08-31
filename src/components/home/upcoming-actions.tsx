'use client';

/**
 * Upcoming actions — scheduled / pending agent actions for the day.
 * Mini timeline with timestamps + action type icons.
 */

interface UpcomingAction {
  id: string;
  time: string;
  title: string;
  detail: string;
  icon: string;
  tint: string;
  bg: string;
  kind: 'scheduled' | 'pending' | 'review';
}

const ACTIONS: UpcomingAction[] = [
  {
    id: '1',
    time: '14:00',
    title: 'Sync with Priya',
    detail: 'Calendar · 30m · auto-joined by agent',
    icon: 'event',
    tint: '#89ceff',
    bg: 'rgba(59,130,246,0.1)',
    kind: 'scheduled',
  },
  {
    id: '2',
    time: '15:30',
    title: 'Send agenda to 4 attendees',
    detail: 'Gmail · drafted, awaiting send',
    icon: 'mail',
    tint: '#c4abff',
    bg: 'rgba(139,92,246,0.1)',
    kind: 'pending',
  },
  {
    id: '3',
    time: '17:00',
    title: 'CRM sync · Lumen Health',
    detail: 'Tasks · 3 records to update',
    icon: 'table_chart',
    tint: '#34D399',
    bg: 'rgba(52,211,153,0.1)',
    kind: 'scheduled',
  },
  {
    id: '4',
    time: 'EOD',
    title: 'Generate weekly summary',
    detail: 'Docs · review and share with #growth',
    icon: 'description',
    tint: '#A9B4C4',
    bg: 'rgba(255,255,255,0.05)',
    kind: 'review',
  },
];

export function UpcomingActions() {
  return (
    <section className="flex flex-col gap-3 p-5 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#0A1E36]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[18px] text-[#FBBF24]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
          >
            upcoming
          </span>
          <h2 className="text-[16px] font-semibold text-[#F5F7FA]">Upcoming today</h2>
        </div>
        <span className="text-[11px] text-[#6B7689] font-mono">{ACTIONS.length} actions</span>
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-1">
        {ACTIONS.map((action, i) => (
          <div
            key={action.id}
            className="group flex items-center gap-3 p-2 rounded-lg hover:bg-[#102544] transition-colors relative"
          >
            {/* Connector */}
            {i < ACTIONS.length - 1 && (
              <div className="absolute left-[18px] top-10 bottom-[-8px] w-px bg-[rgba(255,255,255,0.06)]" />
            )}

            {/* Time */}
            <div className="w-12 text-right">
              <span className="text-[11px] font-mono text-[#A9B4C4] tabular-nums">{action.time}</span>
            </div>

            {/* Dot */}
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 relative z-10"
              style={{ backgroundColor: action.bg, border: `1px solid ${action.tint}30` }}
            >
              <span
                className="material-symbols-outlined text-[15px]"
                style={{ color: action.tint, fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                {action.icon}
              </span>
            </div>

            {/* Content */}
            <div className="flex-grow min-w-0">
              <div className="text-[12px] font-medium text-[#F5F7FA] truncate">{action.title}</div>
              <div className="text-[10px] text-[#6B7689] font-mono truncate">{action.detail}</div>
            </div>

            {/* Kind badge */}
            <span
              className={`px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-[0.05em] font-mono flex-shrink-0 ${
                action.kind === 'scheduled'
                  ? 'bg-[rgba(59,130,246,0.1)] text-[#89ceff]'
                  : action.kind === 'pending'
                    ? 'bg-[rgba(139,92,246,0.1)] text-[#c4abff]'
                    : 'bg-[rgba(251,191,36,0.1)] text-[#FBBF24]'
              }`}
            >
              {action.kind}
            </span>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <button className="mt-1 w-full py-2 rounded-lg border border-dashed border-[rgba(255,255,255,0.08)] text-[11px] text-[#6B7689] hover:text-[#c4abff] hover:border-[rgba(139,92,246,0.3)] transition-colors font-mono inline-flex items-center justify-center gap-1">
        <span
          className="material-symbols-outlined text-[13px]"
          style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
        >
          add
        </span>
        Schedule new action
      </button>
    </section>
  );
}
