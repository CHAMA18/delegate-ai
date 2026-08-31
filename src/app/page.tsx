'use client';

import { useEffect, useRef, useState } from 'react';

/* ============================================================
   Delegate.ai logo mark (inline SVG so we can animate colors)
   ============================================================ */
function DelegateLogo({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Delegate.ai logo"
    >
      <defs>
        <linearGradient id="navLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4abff" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="64" height="64" rx="14" fill="#0b1c30" />
      <g opacity="0.65">
        <circle cx="22" cy="32" r="1" fill="url(#navLogoGradient)" />
        <circle cx="26" cy="32" r="0.9" fill="url(#navLogoGradient)" />
        <circle cx="30" cy="32" r="0.7" fill="url(#navLogoGradient)" />
      </g>
      <path
        d="M 12 18 L 12 46 L 22 46 L 22 37 L 31 32 L 22 27 L 22 18 Z"
        fill="url(#navLogoGradient)"
      />
      <path
        d="M 35 18 L 35 27 L 44 32 L 35 37 L 35 46 L 54 32 Z"
        fill="none"
        stroke="url(#navLogoGradient)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ============================================================
   Material Symbols icon helper
   ============================================================ */
function Icon({
  name,
  className = 'text-xl',
  fill = false,
}: {
  name: string;
  className?: string;
  fill?: boolean;
}) {
  return (
    <span
      className={`material-symbols-outlined ${fill ? 'fill' : ''} ${className}`}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

/* ============================================================
   Scroll-reveal hook
   ============================================================ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );
    els.forEach((el) => io.observe(el));
    // Fallback: ensure everything becomes visible after 4s even if observer
    // never fires for some reason (e.g., reduced-motion environments).
    const fallback = setTimeout(() => {
      els.forEach((el) => el.classList.add('is-visible'));
    }, 4000);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, []);
}

/* ============================================================
   Mock dashboard panel (replaces placeholder image with a
   polished, self-contained UI simulation)
   ============================================================ */
function ProductMockup() {
  const [activeRow, setActiveRow] = useState(0);
  useEffect(() => {
    const t = setInterval(() => {
      setActiveRow((r) => (r + 1) % 4);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  const tasks = [
    {
      icon: 'mail',
      title: 'Draft follow-up email to Acme Corp',
      status: 'Completed',
      tone: 'violet',
      time: '0.8s',
    },
    {
      icon: 'event',
      title: 'Schedule quarterly review for Friday',
      status: 'Scheduled',
      tone: 'blue',
      time: '1.2s',
    },
    {
      icon: 'task_alt',
      title: 'Update CRM: deal stage → Negotiation',
      status: 'Synced',
      tone: 'violet',
      time: '0.4s',
    },
    {
      icon: 'description',
      title: 'Generate meeting brief from transcript',
      status: 'Drafted',
      tone: 'blue',
      time: '2.1s',
    },
  ];

  return (
    <div className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-xl overflow-hidden glass-panel border border-[#45464d] shadow-2xl">
      {/* top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#26364a] bg-[#0b1c30]/80">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="ml-3 flex items-center gap-2 text-xs text-[#c6c6cd] font-mono">
          <Icon name="lock" className="text-sm" />
          delegate.ai/agent/live
        </div>
        <div className="ml-auto flex items-center gap-2 text-xs text-[#89ceff]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f] animate-pulse" />
          Agent active
        </div>
      </div>

      {/* body */}
      <div className="grid grid-cols-12 h-[calc(100%-44px)]">
        {/* sidebar */}
        <div className="hidden md:flex col-span-3 border-r border-[#26364a] bg-[#0b1c30]/60 p-4 flex-col gap-2">
          {[
            { label: 'Inbox', count: '12', icon: 'inbox' },
            { label: 'Calendar', count: '4', icon: 'calendar_month' },
            { label: 'CRM Sync', count: '7', icon: 'sync' },
            { label: 'Drafts', count: '3', icon: 'edit_note' },
          ].map((it, i) => (
            <div
              key={it.label}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                i === 0
                  ? 'bg-[#1b2b3f] text-[#d3e4fe]'
                  : 'text-[#c6c6cd] hover:bg-[#1b2b3f]/60'
              }`}
            >
              <Icon name={it.icon} className="text-base" />
              <span>{it.label}</span>
              <span className="ml-auto text-xs text-[#909097] font-mono">
                {it.count}
              </span>
            </div>
          ))}
          <div className="mt-auto p-3 rounded-md border border-[#45464d] bg-gradient-to-br from-[#1b2b3f] to-[#0b1c30]">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="bolt" className="text-[#c4abff] text-base" />
              <span className="text-xs text-[#d3e4fe] font-semibold">
                Today's run
              </span>
            </div>
            <div className="text-2xl text-[#d3e4fe] font-bold">26 actions</div>
            <div className="text-xs text-[#89ceff] mt-0.5">
              +18% vs yesterday
            </div>
          </div>
        </div>

        {/* main panel */}
        <div className="col-span-12 md:col-span-9 p-4 md:p-6 flex flex-col gap-3 overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[#909097] text-xs font-mono mb-1">
                /agent/runs/today
              </div>
              <div className="text-[#d3e4fe] text-lg font-semibold">
                Autonomous execution log
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#45464d] bg-[#0b1c30] text-xs text-[#c6c6cd]">
              <Icon name="filter_list" className="text-sm" />
              Last 24h
            </div>
          </div>

          {/* task rows */}
          <div className="flex flex-col gap-2">
            {tasks.map((task, i) => (
              <div
                key={task.title}
                className={`flex items-center gap-3 px-3 md:px-4 py-2.5 rounded-md border transition-all duration-500 ${
                  activeRow === i
                    ? 'border-[#8B5CF6]/40 bg-gradient-to-r from-[#8B5CF6]/10 to-transparent shadow-[0_0_24px_-6px_rgba(139,92,246,0.4)]'
                    : 'border-[#26364a] bg-[#0b1c30]/60'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-md flex items-center justify-center border ${
                    task.tone === 'violet'
                      ? 'border-[#8B5CF6]/40 bg-[#8B5CF6]/10 text-[#c4abff]'
                      : 'border-[#3B82F6]/40 bg-[#3B82F6]/10 text-[#89ceff]'
                  }`}
                >
                  <Icon name={task.icon} className="text-base" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="text-sm text-[#d3e4fe] truncate">
                    {task.title}
                  </div>
                  <div className="text-xs text-[#909097] font-mono">
                    {task.status} · {task.time}
                  </div>
                </div>
                <div
                  className={`hidden md:flex items-center gap-1 text-xs ${
                    activeRow === i ? 'text-[#89ceff]' : 'text-[#909097]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeRow === i ? 'bg-[#27c93f]' : 'bg-[#45464d]'
                    }`}
                  />
                  live
                </div>
                <Icon
                  name="check_circle"
                  className={`text-base ${
                    activeRow === i ? 'text-[#27c93f]' : 'text-[#45464d]'
                  }`}
                  fill={activeRow === i}
                />
              </div>
            ))}
          </div>

          {/* bottom waveform */}
          <div className="mt-auto flex items-end gap-1 h-12 px-1">
            {Array.from({ length: 40 }).map((_, i) => {
              // Round to 2 decimals to avoid SSR/CSR floating-point precision mismatch
              const h = (20 + Math.abs(Math.sin(i * 0.5 + activeRow * 0.8)) * 70).toFixed(2);
              return (
                <div
                  key={i}
                  className="flex-grow rounded-t-sm bg-gradient-to-t from-[#8B5CF6]/20 via-[#6366F1]/40 to-[#3B82F6]/60 transition-all duration-700"
                  style={{ height: `${h}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Page
   ============================================================ */
export default function Home() {
  useScrollReveal();
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#031427] text-[#d3e4fe] font-[family-name:var(--font-inter)] antialiased overflow-x-hidden">
      {/* ============= NAV ============= */}
      <header
        ref={headerRef}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-panel-strong border-b border-[#26364a]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto w-full h-16 px-4 md:px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <DelegateLogo className="h-8 w-8 transition-transform group-hover:scale-110" />
            <span className="font-semibold text-lg tracking-tight text-[#d3e4fe]">
              Delegate
              <span className="ai-gradient-text">.ai</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-[#c6c6cd]">
            <a
              href="#how"
              className="hover:text-[#d3e4fe] transition-colors relative"
            >
              How it works
            </a>
            <a
              href="#features"
              className="hover:text-[#d3e4fe] transition-colors relative"
            >
              Features
            </a>
            <a
              href="#stats"
              className="hover:text-[#d3e4fe] transition-colors relative"
            >
              Results
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden sm:inline-flex px-4 py-2 rounded-full border border-[#45464d] text-[#d3e4fe] hover:bg-[#1b2b3f] hover:border-[#8B5CF6]/50 transition-all text-sm font-medium">
              Login
            </button>
            <button className="ai-glow-btn px-4 md:px-5 py-2 rounded-full text-[#d3e4fe] text-sm font-semibold transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-1">
              <span className="hidden sm:inline">Start free</span>
              <span className="sm:hidden">Start</span>
              <Icon name="arrow_forward" className="text-base" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-16 px-4 md:px-6 max-w-7xl mx-auto w-full flex flex-col gap-16 md:gap-24 relative">
        {/* ===== Aurora background blobs ===== */}
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[600px] -z-10">
          <div
            className="aurora-blob w-[500px] h-[500px] bg-[#8B5CF6]"
            style={{ top: 0, left: '-100px' }}
          />
          <div
            className="aurora-blob w-[400px] h-[400px] bg-[#3B82F6]"
            style={{
              top: '100px',
              right: '-50px',
              animationDelay: '4s',
            }}
          />
          <div
            className="aurora-blob w-[300px] h-[300px] bg-[#6366F1]"
            style={{
              top: '200px',
              left: '300px',
              animationDelay: '8s',
            }}
          />
        </div>

        {/* ============= HERO ============= */}
        <section className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto mt-8 md:mt-12 reveal">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/5 text-xs text-[#c4abff] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4abff] animate-pulse" />
            Now in private beta · Powered by Gemini 2.5
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[#d3e4fe] leading-[1.05] tracking-tight">
            Stop summarizing.
            <br />
            <span className="ai-gradient-text-wide">
              Start executing.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#c6c6cd] max-w-2xl font-normal leading-relaxed">
            Delegate.ai turns meeting notes into real-world actions across
            Google Workspace — autonomously. No prompts. No reminders. Just
            work, done.
          </p>

          <div className="mt-2 flex flex-col sm:flex-row items-center gap-3">
            <button className="ai-glow-btn px-7 py-3 rounded-full text-[#d3e4fe] text-base font-semibold transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-2">
              Deploy my first agent
              <Icon name="arrow_forward" className="text-base" />
            </button>
            <button className="px-6 py-3 rounded-full border border-[#45464d] text-[#d3e4fe] hover:bg-[#1b2b3f] hover:border-[#8B5CF6]/50 transition-all text-base font-medium inline-flex items-center gap-2">
              <Icon name="play_circle" className="text-base" fill />
              Watch 90s demo
            </button>
          </div>

          <div className="mt-3 text-xs text-[#909097] font-mono flex items-center gap-2">
            <Icon name="verified_user" className="text-sm" />
            SOC 2 Type II · GDPR · No credit card required
          </div>
        </section>

        {/* ============= PRODUCT MOCKUP ============= */}
        <section className="w-full reveal relative group">
          {/* glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#571bc1] via-[#6366F1] to-[#001a29] rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-1000" />
          <ProductMockup />
        </section>

        {/* ============= SOCIAL PROOF ============= */}
        <section className="reveal flex flex-col items-center gap-4">
          <p className="text-xs text-[#909097] font-mono uppercase tracking-[0.2em]">
            Trusted by execution-first teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
            {['NORTHWIND', 'Acme Corp', 'Vertex Labs', 'Lumen Health', 'Helios', 'Cobalt'].map(
              (brand) => (
                <span
                  key={brand}
                  className="text-lg md:text-xl font-semibold text-[#c6c6cd] tracking-tight hover:text-[#d3e4fe] transition-colors"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {brand}
                </span>
              )
            )}
          </div>
        </section>

        {/* ============= HOW IT WORKS ============= */}
        <section id="how" className="py-8 flex flex-col gap-8 md:gap-12 reveal">
          <div className="text-center flex flex-col gap-2">
            <span className="text-xs text-[#c4abff] font-mono uppercase tracking-[0.2em]">
              The pipeline
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#d3e4fe] tracking-tight">
              Three steps from transcript to done
            </h2>
            <p className="text-base text-[#c6c6cd] max-w-xl mx-auto">
              No prompts to engineer. No flows to draw. Delegate.ai handles
              the entire pipeline end-to-end.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Step 1 */}
            <div className="relative bg-[#0b1c30] border border-[#45464d] rounded-xl p-6 flex flex-col gap-3 overflow-hidden group hover:border-[#8B5CF6]/60 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-[#26364a] group-hover:bg-gradient-to-r group-hover:from-[#8B5CF6] group-hover:to-[#6366F1] transition-all duration-300" />
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-[#1b2b3f] flex items-center justify-center border border-[#45464d] text-[#c4abff] group-hover:border-[#8B5CF6]/60 transition-colors">
                  <Icon name="record_voice_over" className="text-2xl" />
                </div>
                <span className="text-xs text-[#909097] font-mono">01</span>
              </div>
              <h3 className="text-xl font-semibold text-[#d3e4fe]">
                Ingest transcript
              </h3>
              <p className="text-sm text-[#c6c6cd] leading-relaxed">
                Seamlessly pull raw meeting dialogue from your recording tools — Meet, Zoom, Otter, Granola, or any uploaded file. No manual prep.
              </p>
              <div className="mt-auto pt-3 flex flex-wrap gap-1.5">
                {['Meet', 'Zoom', 'Otter', '+6'].map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] rounded font-mono border border-[#45464d] text-[#909097]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative bg-[#0b1c30] border border-[#45464d] rounded-xl p-6 flex flex-col gap-3 overflow-hidden group hover:border-[#6366F1]/60 transition-all duration-300 hover:-translate-y-1 md:scale-[1.02]">
              <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-[#6366F1]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-0.5 bg-[#26364a] group-hover:bg-gradient-to-r group-hover:from-[#6366F1] group-hover:to-[#3B82F6] transition-all duration-300" />
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-[#1b2b3f] flex items-center justify-center border border-[#45464d] text-[#c4abff] group-hover:border-[#6366F1]/60 transition-colors">
                  <Icon name="psychology" className="text-2xl" />
                </div>
                <span className="text-xs text-[#909097] font-mono">02</span>
              </div>
              <h3 className="text-xl font-semibold text-[#d3e4fe]">
                Multimodal analysis
              </h3>
              <p className="text-sm text-[#c6c6cd] leading-relaxed">
                Gemini understands context, intent, and urgency across text, voice, and shared visuals — surfacing every actionable commitment buried in the conversation.
              </p>
              <div className="mt-auto pt-3 flex flex-wrap gap-1.5">
                {['Gemini 2.5', 'Multimodal', 'Intent', 'Priority'].map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] rounded font-mono border border-[#45464d] text-[#909097]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative bg-[#0b1c30] border border-[#45464d] rounded-xl p-6 flex flex-col gap-3 overflow-hidden group hover:border-[#3B82F6]/60 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-[#26364a] group-hover:bg-gradient-to-r group-hover:from-[#3B82F6] group-hover:to-[#89ceff] transition-all duration-300" />
              <div className="flex items-center justify-between mb-2">
                <div className="w-12 h-12 rounded-xl bg-[#1b2b3f] flex items-center justify-center border border-[#45464d] text-[#89ceff] group-hover:border-[#3B82F6]/60 transition-colors">
                  <Icon name="bolt" className="text-2xl" fill />
                </div>
                <span className="text-xs text-[#909097] font-mono">03</span>
              </div>
              <h3 className="text-xl font-semibold text-[#d3e4fe]">
                Autonomous execution
              </h3>
              <p className="text-sm text-[#c6c6cd] leading-relaxed">
                Drafts emails, schedules events, assigns tickets, and updates CRM records — without a human in the loop. You stay in control; we ship the action.
              </p>
              <div className="mt-auto pt-3 flex flex-wrap gap-1.5">
                {['Gmail', 'Calendar', 'Drive', 'CRM'].map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] rounded font-mono border border-[#45464d] text-[#909097]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============= STATS ============= */}
        <section id="stats" className="reveal">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 rounded-2xl border border-[#26364a] bg-gradient-to-br from-[#0b1c30] to-[#102034] p-6 md:p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#8B5CF6]/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-[#3B82F6]/10 blur-3xl" />

            {[
              { stat: '4.2h', label: 'Saved per user per week', tone: 'violet' },
              { stat: '97%', label: 'Action recall accuracy', tone: 'blue' },
              { stat: '12s', label: 'Avg time to first action', tone: 'violet' },
              { stat: '1M+', label: 'Actions shipped autonomously', tone: 'blue' },
            ].map((s) => (
              <div
                key={s.label}
                className="relative flex flex-col gap-1 text-center md:text-left"
              >
                <div
                  className={`text-3xl md:text-5xl font-bold tracking-tight ${
                    s.tone === 'violet'
                      ? 'text-[#c4abff]'
                      : 'text-[#89ceff]'
                  }`}
                >
                  {s.stat}
                </div>
                <div className="text-xs md:text-sm text-[#c6c6cd] leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============= FEATURES ============= */}
        <section id="features" className="reveal flex flex-col gap-8 md:gap-12">
          <div className="text-center flex flex-col gap-2">
            <span className="text-xs text-[#c4abff] font-mono uppercase tracking-[0.2em]">
              Built for execution
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-[#d3e4fe] tracking-tight">
              The agent platform that actually ships
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: 'shield_lock',
                title: 'Human-in-the-loop by default',
                body: 'Set approval thresholds. Delegate.ai asks before high-stakes actions — and learns from your decisions over time.',
                tone: 'violet',
              },
              {
                icon: 'hub',
                title: 'Native Workspace integration',
                body: 'First-class Gmail, Calendar, Drive, Contacts, and CRM connectors. No Zapier glue, no brittle webhooks.',
                tone: 'blue',
              },
              {
                icon: 'memory',
                title: 'Long-term context memory',
                body: 'Your agent remembers prior conversations, decisions, and stakeholder preferences — across every meeting.',
                tone: 'violet',
              },
              {
                icon: 'target',
                title: 'Priority-aware routing',
                body: 'Urgent commitments ship in seconds. Strategic initiatives get batched for review. You decide the threshold.',
                tone: 'blue',
              },
              {
                icon: 'monitoring',
                title: 'Full audit trail',
                body: 'Every action is logged, replayable, and reversible. Compliance teams love it. So will your future self.',
                tone: 'violet',
              },
              {
                icon: 'deployed_code',
                title: 'Deploy in minutes',
                body: 'Connect Workspace, pick your scopes, deploy. No prompt engineering, no model selection, no infra.',
                tone: 'blue',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group bg-[#0b1c30] border border-[#45464d] rounded-xl p-5 hover:border-[#8B5CF6]/40 hover:bg-[#102034] transition-all duration-300 hover:-translate-y-0.5"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 border ${
                    f.tone === 'violet'
                      ? 'border-[#8B5CF6]/40 bg-[#8B5CF6]/10 text-[#c4abff]'
                      : 'border-[#3B82F6]/40 bg-[#3B82F6]/10 text-[#89ceff]'
                  }`}
                >
                  <Icon name={f.icon} className="text-xl" />
                </div>
                <h3 className="text-base font-semibold text-[#d3e4fe] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#c6c6cd] leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============= TESTIMONIAL ============= */}
        <section className="reveal">
          <figure className="relative max-w-3xl mx-auto rounded-2xl border border-[#26364a] bg-gradient-to-br from-[#0b1c30] via-[#102034] to-[#0b1c30] p-8 md:p-10 overflow-hidden">
            <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#8B5CF6]/15 blur-3xl" />
            <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-[#3B82F6]/15 blur-3xl" />

            <Icon
              name="format_quote"
              className="text-5xl text-[#8B5CF6]/60 mb-4"
              fill
            />
            <blockquote className="relative text-lg md:text-2xl text-[#d3e4fe] font-medium leading-snug tracking-tight">
              We went from 14 hours of weekly meeting follow-up to under 90
              minutes. Delegate.ai isn&apos;t a summarizer — it&apos;s a
              teammate that never sleeps.
            </blockquote>
            <figcaption className="relative mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center text-[#0b1c30] font-bold text-sm">
                MK
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-[#d3e4fe]">
                  Maya Krishnan
                </div>
                <div className="text-xs text-[#909097]">
                  VP Operations · Vertex Labs
                </div>
              </div>
            </figcaption>
          </figure>
        </section>

        {/* ============= FINAL CTA ============= */}
        <section className="reveal">
          <div className="relative rounded-2xl overflow-hidden border border-[#26364a] bg-gradient-to-br from-[#0b1c30] via-[#102034] to-[#0b1c30] p-8 md:p-16 text-center">
            {/* background grid */}
            <div className="absolute inset-0 grid-bg opacity-60" />
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px]">
              <div className="aurora-blob w-[400px] h-[400px] bg-[#8B5CF6] opacity-30" />
            </div>

            <div className="relative flex flex-col items-center gap-5">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#d3e4fe] max-w-2xl">
                Your next meeting could{' '}
                <span className="ai-gradient-text-wide">ship itself</span>.
              </h2>
              <p className="text-base md:text-lg text-[#c6c6cd] max-w-xl">
                Deploy your first agent in under five minutes. No credit card, no sales call — just execution.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
                <button className="ai-glow-btn px-8 py-3 rounded-full text-[#d3e4fe] text-base font-semibold transition-transform hover:scale-105 active:scale-95 inline-flex items-center gap-2">
                  Deploy my first agent
                  <Icon name="arrow_forward" className="text-base" />
                </button>
                <button className="px-6 py-3 rounded-full border border-[#45464d] text-[#d3e4fe] hover:bg-[#1b2b3f] hover:border-[#8B5CF6]/50 transition-all text-base font-medium">
                  Talk to the team
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============= FOOTER ============= */}
      <footer className="border-t border-[#26364a] bg-[#000f21] mt-auto">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <DelegateLogo className="h-7 w-7" />
            <span className="font-semibold text-[#d3e4fe]">
              Delegate<span className="ai-gradient-text">.ai</span>
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#c6c6cd]">
            <a href="#" className="hover:text-[#d3e4fe] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#d3e4fe] transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-[#d3e4fe] transition-colors">
              Security
            </a>
            <a href="#" className="hover:text-[#d3e4fe] transition-colors">
              Docs
            </a>
            <a href="#" className="hover:text-[#d3e4fe] transition-colors">
              Status
            </a>
          </nav>

          <p className="text-xs text-[#909097] font-mono flex items-center gap-1">
            Powered by Gemini
            <Icon name="magic_button" className="text-sm text-[#c4abff]" fill />
            &amp; Google Cloud
          </p>
        </div>
      </footer>
    </div>
  );
}
