'use client';

import { useCallback, useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardTopbar } from '@/components/dashboard/topbar';
import { WelcomeBanner } from '@/components/home/welcome-banner';
import { StatCardsRow } from '@/components/home/stat-cards-row';
import { RecentRunsFeed } from '@/components/home/recent-runs-feed';
import { AgentActivityStream } from '@/components/home/agent-activity-stream';
import { IntegrationsGrid } from '@/components/home/integrations-grid';
import { UpcomingActions } from '@/components/home/upcoming-actions';
import { Reveal } from '@/components/delegate/reveal';
import { useAuth } from '@/hooks/use-auth';

/**
 * Post-authentication overview dashboard — the first thing users see
 * after logging in. Brief: high-signal overview with stats, recent runs,
 * live agent activity, integration status, and upcoming actions.
 */
export default function HomePage() {
  const { user, loading } = useAuth();
  const [, setRunId] = useState(0);

  const handleNewAction = useCallback(() => {
    setRunId((n) => n + 1);
    window.location.href = '/dashboard';
  }, []);

  // Auth guard — redirect to /login if not signed in
  if (loading) {
    return (
      <div className="min-h-screen bg-[#031427] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <span
            className="material-symbols-outlined text-[32px] text-[#c4abff] animate-spin"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
          >
            progress_activity
          </span>
          <span className="text-[12px] text-[#6B7689] font-mono">Loading workspace…</span>
        </div>
      </div>
    );
  }

  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.assign('/login');
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-[#031427] text-[#F5F7FA] overflow-hidden flex">
      <DashboardSidebar activeId="home" onNewAction={handleNewAction} />
      <DashboardTopbar />

      {/* Main content area */}
      <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-y-auto">
        <main className="flex-1 mt-16 p-6 md:p-8 max-w-7xl mx-auto w-full flex flex-col gap-6">
          {/* Welcome banner */}
          <Reveal>
            <WelcomeBanner userName={user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'there'} />
          </Reveal>

          {/* Stat cards row */}
          <Reveal delay={80}>
            <StatCardsRow />
          </Reveal>

          {/* Integrations grid */}
          <Reveal delay={160}>
            <IntegrationsGrid />
          </Reveal>

          {/* Two-column: recent runs + activity stream */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Reveal delay={240}>
              <RecentRunsFeed />
            </Reveal>
            <Reveal delay={320}>
              <AgentActivityStream />
            </Reveal>
          </div>

          {/* Upcoming actions */}
          <Reveal delay={400}>
            <UpcomingActions />
          </Reveal>

          {/* Footer space */}
          <div className="h-4" />
        </main>
      </div>

      {/* Mobile fallback notice */}
      <div className="md:hidden fixed inset-0 z-[100] bg-[#031427] flex flex-col items-center justify-center p-8 text-center gap-4">
        <span
          className="material-symbols-outlined text-[48px] text-[#c4abff]"
          style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
        >
          desktop_windows
        </span>
        <h2 className="text-[20px] font-semibold text-[#F5F7FA]">
          Delegate.ai works best on desktop
        </h2>
        <p className="text-[14px] text-[#A9B4C4] max-w-sm">
          The overview dashboard requires a larger viewport. Please open on a
          desktop or expand your browser window to at least 768px wide.
        </p>
        <a
          href="/"
          className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-[#c4abff] font-mono"
        >
          <span
            className="material-symbols-outlined text-[16px]"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
          >
            arrow_back
          </span>
          Back to landing
        </a>
      </div>
    </div>
  );
}
