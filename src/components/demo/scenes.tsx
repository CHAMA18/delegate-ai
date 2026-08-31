'use client';

/**
 * Delegate.ai — 90-second demo video scenes.
 *
 * Each scene renders for a time range within the 90s timeline.
 * Scenes use absolute positioning over the 16:9 frame and fade in/out
 * via opacity transitions driven by the player's currentTime.
 *
 * Timeline (90s total):
 *   00:00–00:08  Hook        "Meeting notes die in a doc."
 *   00:08–00:18  Reveal      "Meet Delegate.ai" + kinetic headline
 *   00:18–00:32  Setup       Paste transcript, click Execute
 *   00:32–00:48  Agent wakes Thought + Plan logs appear
 *   00:48–01:05  Email draft Action card + Gmail typing
 *   01:05–01:15  Calendar    Calendar event created
 *   01:15–01:25  CRM         CRM record updated
 *   01:25–01:35  Result      Stats count-up
 *   01:35–01:40  CTA         "Your next meeting could ship itself"
 *
 * NOTE: total is 90s for the demo experience.
 */

export interface SceneProps {
  /** Current playback time in seconds (0..90) */
  t: number;
  /** Whether the player is currently playing (vs paused) */
  playing: boolean;
  /** Whether reduced-motion is requested — scenes should render final state */
  reducedMotion: boolean;
}

/* ============================================================
   Scene 1 — HOOK (0-8s)
   "Meeting notes die in a doc. Nothing becomes action."
   ============================================================ */
export function SceneHook({ t, reducedMotion }: SceneProps) {
  const fadeIn = reducedMotion || t > 0.3 ? 1 : 0;
  const noteOpacity = reducedMotion ? 0.4 : t > 4 ? Math.max(0.25, 1 - (t - 4) * 0.18) : 1;
  const ghostsVisible = reducedMotion ? 3 : t > 2 ? Math.min(3, Math.floor((t - 2) / 1.2)) : 0;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
      <div className="w-full max-w-md" style={{ opacity: fadeIn, transition: 'opacity 600ms ease-out' }}>
        {/* Fading meeting note */}
        <div
          className="relative p-5 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#0A1E36] mb-4"
          style={{ opacity: noteOpacity }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[14px] text-[#6B7689]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                description
              </span>
              <span className="text-[11px] text-[#6B7689] font-mono">Q4-planning-sync.md</span>
            </div>
            <span className="text-[10px] text-[#6B7689] font-mono">14d ago</span>
          </div>
          <div className="font-mono text-[11px] text-[#A9B4C4] leading-[1.7] space-y-0.5">
            <div className="text-[#F5F7FA] font-semibold">Q4 Planning Sync</div>
            <div>Priya: ship API docs by EOW</div>
            <div>Marcus: move Acme → negotiation</div>
            <div className="text-[#c4abff]">Action: follow up with Priya</div>
            <div className="text-[#c4abff]">Action: schedule sync Thu 2pm</div>
          </div>
        </div>

        {/* Ghost tasks piling up */}
        <div className="flex flex-col gap-1.5">
          {['Follow up with Priya', 'Schedule sync Thursday 2pm', 'Update CRM deal stage'].map((g, i) => (
            <div
              key={g}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[rgba(248,113,113,0.15)] bg-[rgba(248,113,113,0.03)]"
              style={{
                opacity: i < ghostsVisible ? 1 - i * 0.15 : 0,
                transform: i < ghostsVisible ? 'translateY(0)' : 'translateY(-8px)',
                transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <span
                className="material-symbols-outlined text-[12px] text-[#F87171]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                error
              </span>
              <span className="text-[11px] text-[#A9B4C4] flex-grow">{g}</span>
              <span className="text-[9px] text-[#6B7689] font-mono">
                {i === 0 ? 'overdue · 14d' : i === 1 ? 'never booked' : 'still: discovery'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Caption */}
      <Caption text="Meeting notes die in a doc. Nothing becomes action." t={t} start={1} duration={6} reducedMotion={reducedMotion} />
    </div>
  );
}

/* ============================================================
   Scene 2 — REVEAL (8-18s)
   "Meet Delegate.ai" + kinetic headline
   ============================================================ */
export function SceneReveal({ t, reducedMotion }: SceneProps) {
  const localT = Math.max(0, t - 8); // 0..10 within scene
  const logoScale = reducedMotion ? 1 : 0.6 + Math.min(0.4, localT * 0.2);
  const logoOpacity = reducedMotion ? 1 : Math.min(1, localT * 1.5);
  const headlineOpacity = reducedMotion ? 1 : Math.min(1, Math.max(0, (localT - 1) * 1.5));
  const subOpacity = reducedMotion ? 1 : Math.min(1, Math.max(0, (localT - 3) * 1.5));

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
      {/* Ambient blobs */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.25), transparent 65%)',
          filter: 'blur(40px)',
          opacity: headlineOpacity,
        }}
      />

      {/* Logo */}
      <div
        className="relative mb-6"
        style={{ transform: `scale(${logoScale})`, opacity: logoOpacity, transition: 'opacity 400ms ease-out' }}
      >
        <LogoMarkLarge />
      </div>

      {/* Headline */}
      <h1
        className="text-[44px] font-semibold tracking-[-0.03em] text-[#F5F7FA] text-center leading-[1.05] max-w-2xl mb-4"
        style={{ opacity: headlineOpacity, transition: 'opacity 600ms ease-out' }}
      >
        Your meeting notes,
        <br />
        <span className="text-serif italic text-[#A9B4C4] mr-2 text-[0.88em]">already</span>
        <span className="ai-gradient-text-wide">in motion.</span>
      </h1>

      {/* Subtitle */}
      <p
        className="text-[16px] text-[#A9B4C4] text-center max-w-md leading-[1.6]"
        style={{ opacity: subOpacity, transition: 'opacity 600ms ease-out' }}
      >
        Delegate.ai reads your transcripts and ships the follow-up — emails drafted, events booked, CRM updated — autonomously.
      </p>

      <Caption text="Meet Delegate.ai — your meeting action agent" t={t} start={9} duration={8} reducedMotion={reducedMotion} />
    </div>
  );
}

/* ============================================================
   Scene 3 — SETUP (18-32s)
   Paste transcript, click Execute
   ============================================================ */
const SAMPLE_TRANSCRIPT = `Q3 Planning Sync — 10:14 AM

Priya: we should ship the API docs by EOW.
I'll loop in engineering tomorrow. Also need
to follow up with Sarah at Acme on the contract.

Marcus: CRM is still showing Acme in "discovery" —
let's move them to "negotiation". Also, block Friday
for deep work on the pricing model.

Action: send follow-up email to Sarah
Action: schedule 30m sync with Priya Thursday 2pm
Action: update CRM deal stage for Acme`;

export function SceneSetup({ t, reducedMotion }: SceneProps) {
  const localT = Math.max(0, t - 18); // 0..14
  const panelOpacity = reducedMotion ? 1 : Math.min(1, localT * 2);
  const typedChars = reducedMotion ? SAMPLE_TRANSCRIPT.length : Math.min(SAMPLE_TRANSCRIPT.length, Math.floor(localT * 18));
  const showExecute = reducedMotion || typedChars >= SAMPLE_TRANSCRIPT.length * 0.8;
  const executeClicked = reducedMotion || localT > 12;

  return (
    <div className="absolute inset-0 flex items-center justify-center p-12">
      <div
        className="w-full max-w-2xl grid grid-cols-2 gap-4"
        style={{ opacity: panelOpacity, transition: 'opacity 500ms ease-out' }}
      >
        {/* Meeting Context panel */}
        <div className="bg-[#0A1E36] rounded-2xl border border-[rgba(255,255,255,0.06)] p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#F5F7FA]">Meeting Context</span>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[rgba(52,211,153,0.1)] text-[#34D399]">
              READY
            </span>
          </div>
          <div className="bg-[#031427] rounded-lg p-2.5 font-mono text-[10px] text-[#F5F7FA] leading-[1.6] h-44 overflow-hidden whitespace-pre-wrap">
            {SAMPLE_TRANSCRIPT.slice(0, typedChars)}
            {typedChars < SAMPLE_TRANSCRIPT.length && (
              <span className="inline-block w-1 h-3 bg-[#c4abff] ml-0.5 animate-pulse align-middle" />
            )}
          </div>
          <button
            className={`text-[11px] font-semibold py-2 rounded-lg flex items-center justify-center gap-1 transition-all ${
              executeClicked
                ? 'bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white scale-95'
                : showExecute
                  ? 'bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6] text-white'
                  : 'bg-[#102544] text-[#6B7689]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[12px]"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
            >
              auto_awesome
            </span>
            Execute Meeting
          </button>
        </div>

        {/* Right side — agent panel empty */}
        <div className="bg-[#0A1E36]/60 rounded-2xl border border-[rgba(139,92,246,0.15)] p-4 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[12px] text-[#6B7689]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                smart_toy
              </span>
              <span className="text-[11px] font-semibold text-[#F5F7FA]">ADK Agent</span>
            </div>
            <span className="text-[9px] text-[#6B7689] font-mono">idle</span>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-xl bg-[#102544] flex items-center justify-center mb-2">
              <span
                className="material-symbols-outlined text-[18px] text-[#6B7689]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                smart_toy
              </span>
            </div>
            <span className="text-[10px] text-[#6B7689] font-mono">Agent ready</span>
          </div>
        </div>
      </div>

      <Caption text="Paste your transcript. Click Execute. That's it." t={t} start={19} duration={12} reducedMotion={reducedMotion} />
    </div>
  );
}

/* ============================================================
   Scene 4 — AGENT WAKES (32-48s)
   Thought + Plan logs appear
   ============================================================ */
export function SceneAgentWakes({ t, reducedMotion }: SceneProps) {
  const localT = Math.max(0, t - 32); // 0..16
  const progress = reducedMotion ? 30 : Math.min(30, localT * 2);
  const showThought = reducedMotion || localT > 0.5;
  const showPlan = reducedMotion || localT > 4;
  const thoughtOpacity = reducedMotion ? 1 : Math.min(1, Math.max(0, (localT - 0.5) * 2));
  const planOpacity = reducedMotion ? 1 : Math.min(1, Math.max(0, (localT - 4) * 2));

  return (
    <div className="absolute inset-0 flex items-center justify-center p-12">
      <div className="w-full max-w-2xl bg-[#0A1E36]/60 rounded-2xl border border-[rgba(139,92,246,0.2)] p-4 flex flex-col gap-3 overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-[#102544] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #3b82f6, #8B5CF6, #c4abff)',
            }}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-[14px] text-[#c4abff]"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
            >
              memory
            </span>
            <span className="text-[12px] font-semibold text-[#F5F7FA]">ADK Agent Active</span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-[rgba(139,92,246,0.4)] bg-[rgba(139,92,246,0.1)] text-[9px] text-[#c4abff] font-mono">
              <span className="w-1 h-1 rounded-full bg-[#8B5CF6] animate-pulse" />
              EXECUTING
            </span>
          </div>
          <span className="text-[14px] font-semibold text-[#F5F7FA] tabular-nums">{Math.round(progress)}%</span>
        </div>

        {/* Thought log */}
        {showThought && (
          <div className="flex items-start gap-2 pl-2" style={{ opacity: thoughtOpacity, transition: 'opacity 500ms ease-out' }}>
            <span className="text-[10px] text-[#6B7689] font-mono mt-1 tabular-nums">10:42:01</span>
            <div className="flex-grow bg-[#102544] border border-[rgba(255,255,255,0.06)] rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1 text-[#A9B4C4]">
                <span
                  className="material-symbols-outlined text-[12px]"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                >
                  psychology
                </span>
                <span className="text-[11px] font-semibold">Thought</span>
              </div>
              <p className="text-[11px] text-[#F5F7FA] leading-[1.5]">
                Analyzing transcript. Identified 3 actions: Email Sarah, Schedule Follow-up, Update CRM.
              </p>
            </div>
          </div>
        )}

        {/* Plan log */}
        {showPlan && (
          <div className="flex items-start gap-2 pl-2" style={{ opacity: planOpacity, transition: 'opacity 500ms ease-out' }}>
            <span className="text-[10px] text-[#6B7689] font-mono mt-1 tabular-nums">10:42:05</span>
            <div className="flex-grow bg-[#102544] border border-[rgba(59,130,246,0.15)] rounded-lg p-2.5">
              <div className="flex items-center gap-1.5 mb-1 text-[#89ceff]">
                <span
                  className="material-symbols-outlined text-[12px]"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                >
                  account_tree
                </span>
                <span className="text-[11px] font-semibold">Plan</span>
              </div>
              <p className="text-[11px] text-[#F5F7FA] leading-[1.5]">
                Formulating execution graph. 3-action plan generated. Drafting email content first.
              </p>
            </div>
          </div>
        )}
      </div>

      <Caption text="Gemini 2.5 Pro reads the transcript, identifies every commitment, plans the execution." t={t} start={33} duration={14} reducedMotion={reducedMotion} />
    </div>
  );
}

/* ============================================================
   Scene 5 — EMAIL DRAFT (48-65s)
   Action card + Gmail-style window types out
   ============================================================ */
const EMAIL_BODY = `Hi Sarah,

Following up on today's discovery call — thanks again for your time.

Attaching the updated strategy deck we discussed, plus our SOC 2 Type II report for your security review.

Would Tuesday at 2pm PT work for a 30-minute follow-up to walk through the deck?

Looking forward to next steps.

Best,
Maya`;

export function SceneEmailDraft({ t, reducedMotion }: SceneProps) {
  const localT = Math.max(0, t - 48); // 0..17
  const progress = reducedMotion ? 72 : 50 + Math.min(22, localT * 1.3);
  const typedChars = reducedMotion ? EMAIL_BODY.length : Math.min(EMAIL_BODY.length, Math.floor(localT * 18));
  const emailComplete = reducedMotion || typedChars >= EMAIL_BODY.length;

  return (
    <div className="absolute inset-0 flex items-center justify-center p-10">
      <div className="w-full max-w-2xl flex flex-col gap-3">
        {/* Progress + header */}
        <div className="bg-[#0A1E36]/60 rounded-2xl border border-[rgba(139,92,246,0.2)] p-3 overflow-hidden">
          <div className="h-1 bg-[#102544] rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #3b82f6, #8B5CF6, #c4abff)',
              }}
            />
          </div>
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] text-[#6B7689] font-mono">10:42:12</span>
            <span className="text-[14px] font-semibold text-[#F5F7FA] tabular-nums">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Email draft window */}
        <div className="bg-[#031427] rounded-2xl border border-[rgba(139,92,246,0.3)] overflow-hidden shadow-[0_8px_32px_-8px_rgba(139,92,246,0.4)]">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-[rgba(255,255,255,0.06)] bg-[#0A1E36]/60">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-[#ff5f56]/60" />
              <span className="w-2 h-2 rounded-full bg-[#ffbd2e]/60" />
              <span className="w-2 h-2 rounded-full bg-[#27c93f]/60" />
            </div>
            <span className="text-[10px] text-[#6B7689] font-mono ml-1">mail.google.com — Draft</span>
            <span
              className={`ml-auto px-2 py-0.5 rounded text-[9px] uppercase font-bold font-mono ${
                emailComplete
                  ? 'bg-[rgba(52,211,153,0.15)] text-[#34D399]'
                  : 'bg-[rgba(139,92,246,0.2)] text-[#c4abff]'
              }`}
            >
              {emailComplete ? '✓ Shipped' : 'composing'}
            </span>
          </div>

          {/* To: line */}
          <div className="px-3 py-2 border-b border-[rgba(255,255,255,0.04)] flex items-center gap-2">
            <span className="text-[10px] uppercase text-[#6B7689] font-mono">To:</span>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center text-[7px] font-bold text-white">
                SC
              </div>
              <span className="text-[11px] text-[#A9B4C4] font-mono">sarah@acme.corp</span>
            </div>
            <span className="ml-auto text-[10px] text-[#6B7689] font-mono">Draft · unsent</span>
          </div>

          {/* Body */}
          <div className="p-3 font-mono text-[11px] text-[#F5F7FA] leading-[1.7] whitespace-pre-wrap min-h-[180px]">
            {EMAIL_BODY.slice(0, typedChars)}
            {!emailComplete && (
              <span className="inline-block w-1.5 h-3 bg-[#c4abff] ml-0.5 animate-pulse align-middle" />
            )}
          </div>

          {/* Attachment */}
          <div className="px-3 py-2 border-t border-[rgba(255,255,255,0.04)] flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[12px] text-[#6B7689]"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
            >
              attach_file
            </span>
            <span className="text-[10px] text-[#A9B4C4] font-mono">Q3-strategy-deck.pdf</span>
            <span className="text-[9px] text-[#6B7689] font-mono">· 2.4MB</span>
          </div>
        </div>
      </div>

      <Caption text="Email drafted autonomously — character by character, in real time." t={t} start={49} duration={15} reducedMotion={reducedMotion} />
    </div>
  );
}

/* ============================================================
   Scene 6 — CALENDAR (65-75s)
   Calendar event created
   ============================================================ */
export function SceneCalendar({ t, reducedMotion }: SceneProps) {
  const localT = Math.max(0, t - 65); // 0..10
  const progress = reducedMotion ? 88 : 72 + Math.min(16, localT * 1.6);
  const showCalendar = reducedMotion || localT > 1;
  const calOpacity = reducedMotion ? 1 : Math.min(1, Math.max(0, (localT - 1) * 2));
  const calComplete = reducedMotion || localT > 6;

  return (
    <div className="absolute inset-0 flex items-center justify-center p-10">
      <div className="w-full max-w-2xl flex flex-col gap-3">
        {/* Progress */}
        <div className="bg-[#0A1E36]/60 rounded-2xl border border-[rgba(139,92,246,0.2)] p-3">
          <div className="h-1 bg-[#102544] rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #3b82f6, #8B5CF6, #c4abff)',
              }}
            />
          </div>
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] text-[#6B7689] font-mono">10:42:18</span>
            <span className="text-[14px] font-semibold text-[#F5F7FA] tabular-nums">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Calendar event card */}
        {showCalendar && (
          <div
            className="bg-[#031427] rounded-2xl border border-[rgba(59,130,246,0.3)] p-4 flex items-center gap-4"
            style={{ opacity: calOpacity, transition: 'opacity 500ms ease-out' }}
          >
            <div className="w-12 h-12 rounded-xl border border-[rgba(59,130,246,0.4)] bg-[rgba(59,130,246,0.1)] flex items-center justify-center">
              <span
                className="material-symbols-outlined text-[22px] text-[#89ceff]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                calendar_month
              </span>
            </div>
            <div className="flex-grow">
              <div className="text-[14px] font-semibold text-[#F5F7FA] mb-0.5">Sync with Priya</div>
              <div className="text-[11px] text-[#A9B4C4] font-mono">Thursday 2:00pm – 2:30pm PT</div>
            </div>
            {calComplete ? (
              <span className="px-2 py-1 rounded text-[9px] uppercase font-bold font-mono bg-[rgba(52,211,153,0.15)] text-[#34D399] inline-flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[11px]"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                >
                  check
                </span>
                Shipped
              </span>
            ) : (
              <span className="px-2 py-1 rounded text-[9px] uppercase font-bold font-mono bg-[rgba(139,92,246,0.2)] text-[#c4abff] inline-flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#8B5CF6] animate-pulse" />
                Creating
              </span>
            )}
          </div>
        )}

        {/* Invitee */}
        {calComplete && (
          <div className="ml-16 flex items-center gap-2 text-[11px] text-[#6B7689] font-mono">
            <span
              className="material-symbols-outlined text-[12px] text-[#34D399]"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
            >
              check_circle
            </span>
            Invite sent to priya@vertexlabs.io · 1.2s
          </div>
        )}
      </div>

      <Caption text="Calendar events booked — invitees notified automatically." t={t} start={66} duration={8} reducedMotion={reducedMotion} />
    </div>
  );
}

/* ============================================================
   Scene 7 — CRM (75-85s)
   CRM record updated
   ============================================================ */
export function SceneCrm({ t, reducedMotion }: SceneProps) {
  const localT = Math.max(0, t - 75); // 0..10
  const progress = reducedMotion ? 100 : 88 + Math.min(12, localT * 1.2);
  const showCrm = reducedMotion || localT > 0.5;
  const crmOpacity = reducedMotion ? 1 : Math.min(1, Math.max(0, (localT - 0.5) * 2));
  const crmComplete = reducedMotion || localT > 5;

  return (
    <div className="absolute inset-0 flex items-center justify-center p-10">
      <div className="w-full max-w-2xl flex flex-col gap-3">
        {/* Progress */}
        <div className="bg-[#0A1E36]/60 rounded-2xl border border-[rgba(139,92,246,0.2)] p-3">
          <div className="h-1 bg-[#102544] rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #3b82f6, #8B5CF6, #c4abff)',
              }}
            />
          </div>
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] text-[#6B7689] font-mono">10:42:24</span>
            <span className="text-[14px] font-semibold text-[#F5F7FA] tabular-nums">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* CRM record card */}
        {showCrm && (
          <div
            className="bg-[#031427] rounded-2xl border border-[rgba(52,211,153,0.25)] p-4"
            style={{ opacity: crmOpacity, transition: 'opacity 500ms ease-out' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg border border-[rgba(255,255,255,0.06)] bg-[#0A1E36] flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[16px] text-[#A9B4C4]"
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                  >
                    table_chart
                  </span>
                </div>
                <div>
                  <div className="text-[12px] font-semibold text-[#F5F7FA]">Acme Corp</div>
                  <div className="text-[10px] text-[#6B7689] font-mono">Deal record · $84,000</div>
                </div>
              </div>
              {crmComplete ? (
                <span className="px-2 py-1 rounded text-[9px] uppercase font-bold font-mono bg-[rgba(52,211,153,0.15)] text-[#34D399]">
                  ✓ Updated
                </span>
              ) : (
                <span className="px-2 py-1 rounded text-[9px] uppercase font-bold font-mono bg-[rgba(139,92,246,0.2)] text-[#c4abff] inline-flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-[#8B5CF6] animate-pulse" />
                  Updating
                </span>
              )}
            </div>

            {/* Stage change diff */}
            <div className="bg-[#0A1E36] rounded-lg p-3 flex items-center gap-3">
              <span className="text-[10px] uppercase text-[#6B7689] font-mono">Deal stage</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[rgba(248,113,113,0.1)] text-[#F87171] line-through">
                  Discovery
                </span>
                <span
                  className="material-symbols-outlined text-[12px] text-[#6B7689]"
                  style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                >
                  arrow_forward
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[rgba(52,211,153,0.15)] text-[#34D399]">
                  Negotiation
                </span>
              </div>
            </div>

            {crmComplete && (
              <div className="mt-2 flex items-center gap-2 text-[10px] text-[#6B7689] font-mono">
                <span
                  className="material-symbols-outlined text-[11px] text-[#34D399]"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                >
                  check_circle
                </span>
                Activity logged · 0.4s
              </div>
            )}
          </div>
        )}
      </div>

      <Caption text="CRM records updated — every change logged, every action reversible." t={t} start={76} duration={8} reducedMotion={reducedMotion} />
    </div>
  );
}

/* ============================================================
   Scene 8 — RESULT (85-95s)
   "3 actions shipped" + stats count-up
   ============================================================ */
export function SceneResult({ t, reducedMotion }: SceneProps) {
  const localT = Math.max(0, t - 85); // 0..10
  const headerOpacity = reducedMotion ? 1 : Math.min(1, localT * 1.5);
  const statsOpacity = reducedMotion ? 1 : Math.min(1, Math.max(0, (localT - 1.5) * 2));
  const stat1Val = reducedMotion ? 3 : Math.min(3, Math.floor(localT * 1.5));
  const stat2Val = reducedMotion ? 13.4 : Math.min(13.4, Math.max(0, (localT - 0.5) * 4));
  const stat3Val = reducedMotion ? 97 : Math.min(97, Math.max(0, (localT - 1) * 60));

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
      {/* Header */}
      <div className="text-center mb-8" style={{ opacity: headerOpacity, transition: 'opacity 500ms ease-out' }}>
        <span className="text-eyebrow mb-2 inline-block">Run complete</span>
        <h2 className="text-[36px] font-semibold tracking-[-0.02em] text-[#F5F7FA]">
          <span className="ai-gradient-text-wide">3 actions</span> shipped in 13.4 seconds
        </h2>
      </div>

      {/* Stats grid */}
      <div
        className="grid grid-cols-3 gap-6 max-w-xl w-full"
        style={{ opacity: statsOpacity, transition: 'opacity 500ms ease-out' }}
      >
        <div className="text-center">
          <div className="text-[40px] font-semibold text-[#c4abff] tracking-[-0.03em] leading-none tabular-nums">
            {stat1Val}
          </div>
          <div className="text-[11px] text-[#A9B4C4] mt-1">actions shipped</div>
        </div>
        <div className="text-center">
          <div className="text-[40px] font-semibold text-[#89ceff] tracking-[-0.03em] leading-none tabular-nums">
            {stat2Val.toFixed(1)}s
          </div>
          <div className="text-[11px] text-[#A9B4C4] mt-1">total runtime</div>
        </div>
        <div className="text-center">
          <div className="text-[40px] font-semibold text-[#34D399] tracking-[-0.03em] leading-none tabular-nums">
            {Math.round(stat3Val)}%
          </div>
          <div className="text-[11px] text-[#A9B4C4] mt-1">accuracy</div>
        </div>
      </div>

      <Caption text="All actions logged. All reversible. Full audit trail." t={t} start={86} duration={9} reducedMotion={reducedMotion} />
    </div>
  );
}

/* ============================================================
   Scene 9 — CTA (95-100s)
   "Your next meeting could ship itself."
   ============================================================ */
export function SceneCTA({ t, reducedMotion }: SceneProps) {
  const localT = Math.max(0, t - 95); // 0..5
  const opacity = reducedMotion ? 1 : Math.min(1, localT * 1.5);
  const ctaPulse = reducedMotion ? 1 : 1 + Math.sin(localT * 4) * 0.02;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
      {/* Aurora */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.3), transparent 65%)',
          filter: 'blur(60px)',
          opacity,
        }}
      />

      <div className="relative text-center flex flex-col gap-5" style={{ opacity, transition: 'opacity 500ms ease-out' }}>
        <span className="text-eyebrow">Your next meeting</span>
        <h2 className="text-[40px] font-semibold tracking-[-0.03em] text-[#F5F7FA] max-w-xl leading-[1.1]">
          Your next meeting could{' '}
          <span className="text-serif italic text-[#c4abff]">ship itself</span>.
        </h2>
        <div className="mt-2">
          <div
            className="btn-primary inline-flex items-center gap-2"
            style={{ transform: `scale(${ctaPulse})` }}
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
            >
              auto_awesome
            </span>
            Start delegating
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
            >
              arrow_forward
            </span>
          </div>
        </div>
        <p className="text-[11px] text-[#6B7689] font-mono mt-1">
          Free tier · No credit card · Cancel anytime
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   Shared sub-components
   ============================================================ */
function Caption({ text, t, start, duration, reducedMotion }: { text: string; t: number; start: number; duration: number; reducedMotion: boolean }) {
  const localT = t - start;
  const visible = reducedMotion || (localT >= 0 && localT <= duration + 0.5);
  const opacity = reducedMotion ? 1 : Math.min(1, Math.max(0, (localT - 0.3) * 3)) * Math.min(1, Math.max(0, (duration - localT + 0.5) * 2));

  if (!visible) return null;

  return (
    <div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-md text-center"
      style={{ opacity, transition: 'opacity 400ms ease-out' }}
    >
      <p className="text-[13px] text-[#F5F7FA] font-medium leading-[1.4] bg-[rgba(3,20,39,0.85)] backdrop-blur-md px-4 py-2 rounded-full border border-[rgba(255,255,255,0.08)]">
        {text}
      </p>
    </div>
  );
}

function LogoMarkLarge() {
  return (
    <svg viewBox="0 0 96 96" className="h-20 w-20" role="img" aria-label="Delegate.ai">
      <defs>
        <linearGradient id="demoLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4abff" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <filter id="demoLogoGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect x="0" y="0" width="96" height="96" rx="22" fill="#0A1E36" />
      <g opacity="0.7">
        <circle cx="34" cy="48" r="1.5" fill="url(#demoLogoGrad)" />
        <circle cx="40" cy="48" r="1.3" fill="url(#demoLogoGrad)" />
        <circle cx="46" cy="48" r="1.1" fill="url(#demoLogoGrad)" />
      </g>
      <g filter="url(#demoLogoGlow)">
        <path
          d="M 18 28 L 18 68 L 32 68 L 32 56 L 46 48 L 32 40 L 32 28 Z"
          fill="url(#demoLogoGrad)"
        />
      </g>
      <path
        d="M 52 28 L 52 40 L 66 48 L 52 56 L 52 68 L 80 48 Z"
        fill="none"
        stroke="url(#demoLogoGrad)"
        strokeWidth="3.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ============================================================
   Chapter definitions — drives the chapter markers in the player UI
   ============================================================ */
export interface Chapter {
  start: number;
  end: number;
  label: string;
}

export const CHAPTERS: Chapter[] = [
  { start: 0, end: 8, label: 'The problem' },
  { start: 8, end: 18, label: 'Meet Delegate.ai' },
  { start: 18, end: 32, label: 'Paste & execute' },
  { start: 32, end: 48, label: 'Agent analyzes' },
  { start: 48, end: 65, label: 'Email drafted' },
  { start: 65, end: 75, label: 'Calendar booked' },
  { start: 75, end: 85, label: 'CRM updated' },
  { start: 85, end: 95, label: '3 actions shipped' },
  { start: 95, end: 100, label: 'Your move' },
];

export const TOTAL_DURATION = 100; // 100s total (95s content + 5s CTA hold)
