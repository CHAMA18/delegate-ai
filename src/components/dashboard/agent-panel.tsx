'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Right panel — ADK Agent Active.
 * Glassmorphism panel with animated gradient progress bar, execution timeline,
 * live email draft composition, and pending actions list.
 *
 * The agent runs a simulation in stages when triggered:
 *   thought → plan → email-draft → calendar-event → crm-update → complete
 * Each stage emits a log entry; the email draft composes character-by-character;
 * pending actions transition pending → executing → complete.
 */

type LogType = 'thought' | 'plan' | 'action' | 'success';
type Bucket = 'gmail' | 'calendar' | 'tasks';
type ActionStatus = 'pending' | 'executing' | 'complete';

interface LogEntry {
  id: number;
  type: LogType;
  timestamp: string;
  title: string;
  body?: string;
  bucket?: Bucket;
  status?: ActionStatus;
}

interface PendingAction {
  id: number;
  bucket: Bucket;
  label: string;
  detail: string;
  status: ActionStatus;
}

const BUCKET_META: Record<Bucket, { label: string; icon: string; tint: string }> = {
  gmail: { label: 'Gmail', icon: 'mail', tint: '#c4abff' },
  calendar: { label: 'Calendar', icon: 'calendar_month', tint: '#89ceff' },
  tasks: { label: 'Tasks', icon: 'table_chart', tint: '#34D399' },
};

const EMAIL_DRAFT = `Hi Sarah,

Following up on today's discovery call — thanks again for your time.

Attaching the updated strategy deck we discussed, plus our SOC 2 Type II report for your security review.

Would Tuesday at 2pm PT work for a 30-minute follow-up to walk through the deck? Happy to bring our solutions engineer for any technical questions.

Looking forward to next steps.

Best,
Maya`;

interface SimulationStage {
  delay: number;
  action: () => void;
}

export function AgentPanel({
  isExecuting,
  onComplete,
}: {
  isExecuting: boolean;
  onComplete: () => void;
}) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [pendingActions, setPendingActions] = useState<PendingAction[]>([]);
  const [emailDraft, setEmailDraft] = useState('');
  const [progress, setProgress] = useState(0);
  const [activeBucket, setActiveBucket] = useState<Bucket | null>(null);
  const logIdRef = useRef(0);
  const actionIdRef = useRef(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Auto-scroll timeline to bottom on new entries
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollTop = timelineRef.current.scrollHeight;
    }
  }, [logs, pendingActions, emailDraft]);

  // Reset when not executing
  useEffect(() => {
    if (!isExecuting) {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    }
  }, [isExecuting]);

  // Run simulation when isExecuting flips true
  useEffect(() => {
    if (!isExecuting) return;

    const now = new Date();
    const fmt = (d: Date) =>
      `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;

    const schedule = (delay: number, fn: () => void) => {
      const t = setTimeout(fn, delay);
      timeoutsRef.current.push(t);
    };

    const addLog = (entry: Omit<LogEntry, 'id' | 'timestamp'>) => {
      setLogs((prev) => [
        ...prev,
        { ...entry, id: logIdRef.current++, timestamp: fmt(new Date(Date.now())) },
      ]);
    };

    const updateProgress = (target: number, duration = 800) => {
      const start = performance.now();
      const startProgress = progress;
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setProgress(startProgress + (target - startProgress) * eased);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    // Stage 1 — Thought (0.5s)
    schedule(500, () => {
      updateProgress(15);
      addLog({
        type: 'thought',
        title: 'Analyzing transcript',
        body:
          'Identified 3 actions: email Sarah with strategy deck, schedule 30m sync with Priya, update CRM deal stage for Acme.',
      });
    });

    // Stage 2 — Plan (1.8s)
    schedule(1800, () => {
      updateProgress(30);
      addLog({
        type: 'plan',
        title: 'Formulating execution graph',
        body:
          'Generated 3-action plan. Drafting email content first (highest dependency), then calendar block, then CRM update.',
      });
    });

    // Stage 3 — Initialize pending actions (2.8s)
    schedule(2800, () => {
      updateProgress(40);
      setPendingActions([
        { id: actionIdRef.current++, bucket: 'gmail', label: 'Draft Email to Sarah', detail: 'Re: Q3 strategy deck', status: 'pending' },
        { id: actionIdRef.current++, bucket: 'calendar', label: 'Schedule Sync with Priya', detail: 'Thu 2pm · 30m', status: 'pending' },
        { id: actionIdRef.current++, bucket: 'tasks', label: 'Update CRM: Acme → Negotiation', detail: 'Deal stage change', status: 'pending' },
      ]);
    });

    // Stage 4 — Email draft starts (3.5s)
    schedule(3500, () => {
      updateProgress(50);
      setActiveBucket('gmail');
      addLog({
        type: 'action',
        title: 'Action: Draft Email to Sarah',
        body: 'Composing follow-up with strategy deck context.',
        bucket: 'gmail',
        status: 'executing',
      });
      setPendingActions((prev) =>
        prev.map((a) => (a.bucket === 'gmail' ? { ...a, status: 'executing' } : a))
      );
    });

    // Stage 5 — Type out email (3.8s → 7s)
    schedule(3800, () => {
      let i = 0;
      const typingInterval = setInterval(() => {
        i += Math.floor(Math.random() * 4) + 2;
        setEmailDraft(EMAIL_DRAFT.slice(0, i));
        if (i >= EMAIL_DRAFT.length) {
          clearInterval(typingInterval);
          updateProgress(70);
        }
      }, 60);
      timeoutsRef.current.push(typingInterval as never);
    });

    // Stage 6 — Email complete (7.5s)
    schedule(7500, () => {
      updateProgress(72);
      setEmailDraft(EMAIL_DRAFT);
      addLog({
        type: 'success',
        title: 'Email draft ready for review',
        body: 'Subject: "Q3 Strategy Deck & SOC 2 Report — Following Up" · 187 words · 0.8s',
        bucket: 'gmail',
        status: 'complete',
      });
      setPendingActions((prev) =>
        prev.map((a) => (a.bucket === 'gmail' ? { ...a, status: 'complete' } : a))
      );
    });

    // Stage 7 — Calendar event (8.5s)
    schedule(8500, () => {
      updateProgress(82);
      setActiveBucket('calendar');
      addLog({
        type: 'action',
        title: 'Action: Schedule Sync with Priya',
        body: 'Checking availability… proposing Thursday 2:00pm–2:30pm PT.',
        bucket: 'calendar',
        status: 'executing',
      });
      setPendingActions((prev) =>
        prev.map((a) => (a.bucket === 'calendar' ? { ...a, status: 'executing' } : a))
      );
    });

    // Stage 8 — Calendar complete (10s)
    schedule(10000, () => {
      updateProgress(88);
      addLog({
        type: 'success',
        title: 'Calendar event created',
        body: 'Thu 2:00pm–2:30pm · Invite sent to priya@vertexlabs.io · 1.2s',
        bucket: 'calendar',
        status: 'complete',
      });
      setPendingActions((prev) =>
        prev.map((a) => (a.bucket === 'calendar' ? { ...a, status: 'complete' } : a))
      );
    });

    // Stage 9 — CRM update (10.8s)
    schedule(10800, () => {
      updateProgress(94);
      setActiveBucket('tasks');
      addLog({
        type: 'action',
        title: 'Action: Update CRM Deal Stage',
        body: 'Acme Corp: Discovery → Negotiation. Logging activity to deal record.',
        bucket: 'tasks',
        status: 'executing',
      });
      setPendingActions((prev) =>
        prev.map((a) => (a.bucket === 'tasks' ? { ...a, status: 'executing' } : a))
      );
    });

    // Stage 10 — Complete (12s)
    schedule(12000, () => {
      updateProgress(100, 1200);
      addLog({
        type: 'success',
        title: 'CRM record updated',
        body: 'Deal stage: Negotiation · Activity logged · 0.4s',
        bucket: 'tasks',
        status: 'complete',
      });
      setPendingActions((prev) =>
        prev.map((a) => (a.bucket === 'tasks' ? { ...a, status: 'complete' } : a))
      );
      setActiveBucket(null);
    });

    // Stage 11 — Final summary (13s)
    schedule(13500, () => {
      addLog({
        type: 'success',
        title: 'Run complete · 3 actions shipped',
        body: 'Total time: 13.4s · All actions logged · Reversible from audit trail.',
      });
      onComplete();
    });

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [isExecuting]);

  // Empty state
  const isEmpty = logs.length === 0 && !isExecuting;

  return (
    <section className="flex-1 flex flex-col gap-3 glass-panel rounded-2xl p-5 relative overflow-hidden min-h-0" style={{ background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
      {/* Animated AI progress bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #3b82f6, #8B5CF6, #c4abff, #3b82f6)',
            backgroundSize: '200% 100%',
            animation: isExecuting ? 'gradient-shift 2s linear infinite' : 'none',
            opacity: isExecuting || progress > 0 ? 1 : 0.3,
          }}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between z-10 pt-1">
        <div className="flex items-center gap-2.5">
          <span
            className={`material-symbols-outlined text-[22px] ${isExecuting ? 'text-[#c4abff]' : 'text-[#6B7689]'}`}
            style={{ fontVariationSettings: isExecuting ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400" }}
          >
            memory
          </span>
          <div className="flex flex-col">
            <h2 className="text-[18px] font-semibold text-[#F5F7FA] tracking-[-0.01em] flex items-center gap-2">
              ADK Agent
              {isExecuting && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-[rgba(139,92,246,0.4)] bg-[rgba(139,92,246,0.1)] text-[10px] text-[#c4abff] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
                  EXECUTING
                </span>
              )}
            </h2>
            <span className="text-[11px] text-[#6B7689] font-mono">
              Gemini 2.5 Pro · autonomous mode
            </span>
          </div>
        </div>

        {/* Progress percentage */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[20px] font-semibold text-[#F5F7FA] tabular-nums tracking-[-0.02em]">
              {Math.round(progress)}%
            </div>
            <div className="text-[10px] text-[#6B7689] font-mono">
              {progress === 0 ? 'idle' : progress >= 100 ? 'complete' : 'in progress'}
            </div>
          </div>
        </div>
      </div>

      {/* Body — Execution Timeline / Empty State */}
      <div
        ref={timelineRef}
        className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0"
      >
        {isEmpty ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-3 pt-2">
            {/* Log entries */}
            {logs.map((log) => (
              <LogItem key={log.id} log={log} />
            ))}

            {/* Live email draft preview — shown while email is composing */}
            {emailDraft && (
              <DraftPreview
                text={emailDraft}
                isComplete={
                  pendingActions.find((a) => a.bucket === 'gmail')?.status === 'complete'
                }
              />
            )}

            {/* Pending actions list */}
            {pendingActions.length > 0 && (
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="material-symbols-outlined text-[14px] text-[#6B7689]"
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                  >
                    checklist
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-[#6B7689] font-mono">
                    Execution queue
                  </span>
                  <span className="text-[11px] text-[#6B7689] font-mono ml-auto">
                    {pendingActions.filter((a) => a.status === 'complete').length}/{pendingActions.length}
                  </span>
                </div>
                {pendingActions.map((action) => (
                  <PendingActionRow key={action.id} action={action} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes gradient-shift {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </section>
  );
}

/* ============================================================
   Sub-components
   ============================================================ */

function EmptyState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center gap-3 py-12">
      <div className="relative">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent 70%)',
          }}
        >
          <span
            className="material-symbols-outlined text-[32px] text-[#6B7689]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
          >
            smart_toy
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1 max-w-xs">
        <h3 className="text-[15px] font-semibold text-[#F5F7FA]">Agent ready</h3>
        <p className="text-[12px] text-[#6B7689] font-mono leading-[1.6]">
          Paste a transcript and click <span className="text-[#c4abff]">Execute Meeting</span> to watch the agent ship actions in real time.
        </p>
      </div>
      <div className="flex items-center gap-2 mt-2 text-[10px] text-[#6B7689] font-mono">
        <span className="inline-flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-[#34D399]" /> idle
        </span>
        <span>·</span>
        <span>0 actions queued</span>
        <span>·</span>
        <span>0ms avg latency</span>
      </div>
    </div>
  );
}

function LogItem({ log }: { log: LogEntry }) {
  const meta = LOG_META[log.type];

  return (
    <div className="relative pl-5 pb-1">
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-1.5 w-2 h-2 rounded-full ${meta.dotClass}`}
        style={meta.dotStyle}
      />
      {/* Connecting line */}
      <div className="absolute left-[3px] top-3 bottom-0 w-px bg-[rgba(255,255,255,0.06)]" />

      <div className="flex items-start gap-3">
        <span className="text-[11px] text-[#6B7689] font-mono mt-1 tabular-nums">
          {log.timestamp}
        </span>
        <div
          className={`flex-1 rounded-lg p-3 border ${meta.cardClass}`}
          style={meta.cardStyle}
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span
                className={`material-symbols-outlined text-[15px] ${meta.iconTint}`}
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                {meta.icon}
              </span>
              <span className={`text-[13px] font-semibold ${meta.titleTint}`}>
                {log.title}
              </span>
            </div>
            {log.bucket && log.status && (
              <StatusPill status={log.status} bucket={log.bucket} />
            )}
          </div>
          {log.body && (
            <p className="text-[13px] text-[#A9B4C4] leading-[1.55]">{log.body}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status, bucket }: { status: ActionStatus; bucket: Bucket }) {
  if (status === 'executing') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold font-mono tracking-[0.05em] bg-[rgba(139,92,246,0.2)] text-[#c4abff]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
        Executing
      </span>
    );
  }
  if (status === 'complete') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold font-mono tracking-[0.05em] bg-[rgba(52,211,153,0.15)] text-[#34D399]">
        <span
          className="material-symbols-outlined text-[11px]"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
        >
          check
        </span>
        Shipped
      </span>
    );
  }
  return null;
}

function DraftPreview({ text, isComplete }: { text: string; isComplete?: boolean }) {
  return (
    <div className="ml-5 rounded-lg border border-[rgba(139,92,246,0.3)] bg-[#031427] overflow-hidden shadow-[0_8px_32px_-8px_rgba(139,92,246,0.4)]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-[rgba(255,255,255,0.06)] bg-[#0A1E36]/60">
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-[#ff5f56]/60" />
          <span className="w-2 h-2 rounded-full bg-[#ffbd2e]/60" />
          <span className="w-2 h-2 rounded-full bg-[#27c93f]/60" />
        </div>
        <span className="text-[10px] text-[#6B7689] font-mono ml-1">
          mail.google.com — Draft
        </span>
        <span className="ml-auto text-[10px] text-[#6B7689] font-mono">
          {text.length} chars
        </span>
      </div>

      {/* Email metadata */}
      <div className="px-3 py-2 border-b border-[rgba(255,255,255,0.04)] flex items-center gap-2">
        <span className="text-[10px] uppercase text-[#6B7689] font-mono">To:</span>
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center text-[9px] font-bold text-white">
            SC
          </div>
          <span className="text-[12px] text-[#A9B4C4] font-mono">sarah@acme.corp</span>
        </div>
        <span className="ml-auto text-[10px] text-[#6B7689] font-mono">Draft · unsent</span>
      </div>

      {/* Email body */}
      <div className="p-3 font-mono text-[12px] text-[#F5F7FA] leading-[1.7] whitespace-pre-wrap min-h-[120px] relative">
        {text}
        {!isComplete && (
          <span className="inline-block w-1.5 h-3 bg-[#c4abff] ml-0.5 animate-pulse align-middle" />
        )}
      </div>

      {/* Footer */}
      <div className="px-3 py-2 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[14px] text-[#6B7689]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
          >
            attach_file
          </span>
          <span className="text-[11px] text-[#A9B4C4] font-mono">
            Q3-strategy-deck.pdf
          </span>
          <span className="text-[10px] text-[#6B7689] font-mono">· 2.4MB</span>
        </div>
        {isComplete ? (
          <button className="text-[11px] text-[#c4abff] font-mono hover:text-[#F5F7FA] transition-colors">
            Review & send →
          </button>
        ) : (
          <span className="text-[11px] text-[#c4abff] font-mono inline-flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#8B5CF6] animate-pulse" />
            composing…
          </span>
        )}
      </div>
    </div>
  );
}

function PendingActionRow({ action }: { action: PendingAction }) {
  const meta = BUCKET_META[action.bucket];
  const isComplete = action.status === 'complete';
  const isExecuting = action.status === 'executing';

  return (
    <div
      className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all duration-300 ${
        isExecuting
          ? 'border-[rgba(139,92,246,0.4)] bg-[rgba(139,92,246,0.05)] shadow-[0_0_24px_-8px_rgba(139,92,246,0.4)]'
          : isComplete
            ? 'border-[rgba(52,211,153,0.2)] bg-[rgba(52,211,153,0.03)]'
            : 'border-dashed border-[rgba(255,255,255,0.08)] bg-[#031427]/40'
      }`}
    >
      <div
        className={`w-7 h-7 rounded-md flex items-center justify-center border transition-colors ${
          isExecuting
            ? 'border-[rgba(139,92,246,0.4)] bg-[rgba(139,92,246,0.1)]'
            : isComplete
              ? 'border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.1)]'
              : 'border-[rgba(255,255,255,0.06)] bg-[#0A1E36]'
        }`}
      >
        <span
          className="material-symbols-outlined text-[14px]"
          style={{
            color: isComplete ? '#34D399' : meta.tint,
            fontVariationSettings: "'FILL' 1, 'wght' 400",
          }}
        >
          {isComplete ? 'check_circle' : meta.icon}
        </span>
      </div>
      <div className="flex-grow min-w-0">
        <div
          className={`text-[12px] truncate transition-colors ${
            isComplete ? 'text-[#6B7689] line-through' : 'text-[#F5F7FA]'
          }`}
        >
          {action.label}
        </div>
        <div className="text-[10px] text-[#6B7689] font-mono truncate">
          {action.detail}
        </div>
      </div>
      {isExecuting && (
        <span
          className="material-symbols-outlined text-[16px] text-[#c4abff] animate-spin"
          style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
        >
          progress_activity
        </span>
      )}
      {isComplete && (
        <span className="text-[10px] text-[#34D399] font-mono uppercase tracking-[0.05em]">
          ✓
        </span>
      )}
    </div>
  );
}

/* ============================================================
   Log type metadata
   ============================================================ */

const LOG_META: Record<
  LogType,
  {
    icon: string;
    iconTint: string;
    titleTint: string;
    cardClass: string;
    cardStyle?: React.CSSProperties;
    dotClass: string;
    dotStyle?: React.CSSProperties;
  }
> = {
  thought: {
    icon: 'psychology',
    iconTint: 'text-[#A9B4C4]',
    titleTint: 'text-[#A9B4C4]',
    cardClass: 'bg-[#102544] border-[rgba(255,255,255,0.06)]',
    dotClass: 'bg-[#6B7689]',
  },
  plan: {
    icon: 'account_tree',
    iconTint: 'text-[#89ceff]',
    titleTint: 'text-[#89ceff]',
    cardClass: 'bg-[#102544] border-[rgba(59,130,246,0.15)]',
    dotClass: 'bg-[#3B82F6]',
  },
  action: {
    icon: 'bolt',
    iconTint: 'text-[#c4abff]',
    titleTint: 'text-[#F5F7FA]',
    cardClass: 'bg-[#0A1E36] border-[rgba(139,92,246,0.3)]',
    cardStyle: {
      boxShadow: '0 8px 32px -8px rgba(139,92,246,0.4)',
    },
    dotClass: 'bg-[#8B5CF6]',
    dotStyle: {
      boxShadow: '0 0 12px rgba(139,92,246,0.8)',
    },
  },
  success: {
    icon: 'check_circle',
    iconTint: 'text-[#34D399]',
    titleTint: 'text-[#F5F7FA]',
    cardClass: 'bg-[rgba(52,211,153,0.05)] border-[rgba(52,211,153,0.2)]',
    dotClass: 'bg-[#34D399]',
  },
};
