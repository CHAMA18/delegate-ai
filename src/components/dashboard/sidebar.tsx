'use client';

import { LogoMark } from '@/components/delegate/logo';
import { MagneticButton } from '@/components/delegate/magnetic-button';

/**
 * Dashboard sidebar — fixed 256px left nav.
 * Brief: hairline borders, surface elevation tokens, single violet accent for active state.
 */
const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: 'home', href: '/home' },
  { id: 'dashboard', label: 'Workspace', icon: 'dashboard', href: '/dashboard' },
  { id: 'history', label: 'History', icon: 'history', href: '#' },
  { id: 'integrations', label: 'Connected Apps', icon: 'account_tree', href: '#' },
  { id: 'settings', label: 'Settings', icon: 'settings', href: '#' },
];

export function DashboardSidebar({
  activeId = 'dashboard',
  onNewAction,
}: {
  activeId?: string;
  onNewAction?: () => void;
}) {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-[#0A1E36] border-r border-[rgba(255,255,255,0.06)] flex-col py-6 px-4 z-50">
      {/* Brand */}
      <div className="flex items-center gap-2.5 mb-10 px-2">
        <LogoMark className="h-9 w-9" />
        <div className="flex flex-col">
          <span className="font-semibold text-[16px] tracking-[-0.02em] text-[#F5F7FA] leading-tight">
            Delegate<span className="ai-gradient-text">.ai</span>
          </span>
          <span className="text-[11px] text-[#6B7689] font-mono leading-tight mt-0.5">
            Meeting Action Agent
          </span>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-[0.16em] text-[#6B7689] font-mono px-3 mb-2">
          Workspace
        </span>
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          return (
            <a
              key={item.id}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 relative ${
                isActive
                  ? 'bg-[#102544] text-[#F5F7FA]'
                  : 'text-[#A9B4C4] hover:bg-[#102544]/60 hover:text-[#F5F7FA]'
              }`}
            >
              {/* Active indicator: gradient left bar */}
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                  style={{
                    background: 'linear-gradient(180deg, #8B5CF6, #3B82F6)',
                  }}
                />
              )}
              <span
                className={`material-symbols-outlined text-[20px] transition-colors ${
                  isActive ? 'text-[#c4abff]' : 'text-[#6B7689] group-hover:text-[#A9B4C4]'
                }`}
                style={{ fontVariationSettings: isActive ? "'FILL' 1, 'wght' 400" : "'FILL' 0, 'wght' 400" }}
              >
                {item.icon}
              </span>
              {item.label}
              {item.id === 'history' && (
                <span className="ml-auto text-[10px] text-[#6B7689] font-mono">24</span>
              )}
              {item.id === 'integrations' && (
                <span className="ml-auto text-[10px] text-[#6B7689] font-mono">5</span>
              )}
            </a>
          );
        })}
      </nav>

      {/* Status card — agent usage this month */}
      <div className="mb-4 p-3 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[#031427]/60">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase tracking-[0.12em] text-[#6B7689] font-mono">
            This month
          </span>
          <span className="text-[10px] text-[#89ceff] font-mono">Team plan</span>
        </div>
        <div className="text-[20px] font-semibold text-[#F5F7FA] mb-1.5 tracking-[-0.02em]">
          1,284 <span className="text-[12px] text-[#6B7689] font-normal">/ 5,000 actions</span>
        </div>
        <div className="h-1 rounded-full bg-[#102544] overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: '25.7%',
              background: 'linear-gradient(90deg, #8B5CF6, #3B82F6)',
            }}
          />
        </div>
      </div>

      {/* New Action button */}
      <MagneticButton
        onClick={onNewAction}
        className="btn-primary w-full justify-center"
        strength={0.18}
      >
        <span
          className="material-symbols-outlined text-[18px]"
          style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
        >
          add
        </span>
        <span className="text-[15px] font-semibold">New Action</span>
      </MagneticButton>
    </aside>
  );
}
