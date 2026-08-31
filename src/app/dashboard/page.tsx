'use client';

import { useState, useCallback } from 'react';
import { DashboardSidebar } from '@/components/dashboard/sidebar';
import { DashboardTopbar } from '@/components/dashboard/topbar';
import { MeetingContextPanel } from '@/components/dashboard/meeting-context-panel';
import { AgentPanel } from '@/components/dashboard/agent-panel';

export default function DashboardPage() {
  const [transcript, setTranscript] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [runId, setRunId] = useState(0); // bump to retrigger simulation

  const handleExecute = useCallback(() => {
    if (!transcript.trim() || isExecuting) return;
    setRunId((n) => n + 1); // remount AgentPanel for a fresh run
    setIsExecuting(true);
  }, [transcript, isExecuting]);

  const handleComplete = useCallback(() => {
    setIsExecuting(false);
  }, []);

  const handleNewAction = useCallback(() => {
    setTranscript('');
    setIsExecuting(false);
    setRunId((n) => n + 1);
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.focus();
      textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#031427] text-[#F5F7FA] overflow-hidden flex">
      <DashboardSidebar activeId="dashboard" onNewAction={handleNewAction} />
      <DashboardTopbar />

      {/* Main content area */}
      <div className="flex-1 md:ml-64 flex flex-col h-screen">
        <main className="flex-1 mt-0 md:mt-16 p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 overflow-hidden">
          <MeetingContextPanel
            transcript={transcript}
            onTranscriptChange={setTranscript}
            onExecute={handleExecute}
            isExecuting={isExecuting}
          />
          <AgentPanel
            key={runId}
            isExecuting={isExecuting}
            onComplete={handleComplete}
          />
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
          The agent dashboard requires a larger viewport. Please open on a
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
