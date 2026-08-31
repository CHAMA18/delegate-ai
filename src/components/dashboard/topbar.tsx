'use client';

import { useState } from 'react';
import { getFirebase } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';
import { trackEvent, EVENTS } from '@/lib/analytics';

/**
 * Dashboard top app bar — fixed below sidebar offset.
 * Search, AI assistant toggle, notifications, user avatar.
 */
export function DashboardTopbar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'there';
  const initials =
    user?.displayName
      ?.split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() ||
    user?.email?.slice(0, 2).toUpperCase() ||
    'MK';

  const handleSignOut = async () => {
    trackEvent(EVENTS.SIGN_OUT);
    try {
      const { auth } = await getFirebase();
      const { signOut } = await import('firebase/auth');
      await signOut(auth);
    } catch {
      // Silent — redirect anyway
    }
    window.location.assign('/');
  };

  return (
    <header className="fixed top-0 right-0 w-[calc(100%-256px)] h-16 z-40 hidden md:flex items-center justify-between px-6 glass-nav">
      {/* Left: Breadcrumb / Search */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="flex items-center gap-2 text-[13px] font-mono text-[#6B7689]">
          <span>workspace</span>
          <span className="text-[#45464d]">/</span>
          <span className="text-[#A9B4C4]">dashboard</span>
        </div>

        {/* Search */}
        <div
          className={`flex items-center gap-2 flex-1 max-w-md ml-4 px-3 py-1.5 rounded-lg border bg-[#031427]/60 transition-all duration-200 ${
            searchFocused
              ? 'border-[rgba(139,92,246,0.5)] bg-[#0A1E36]'
              : 'border-[rgba(255,255,255,0.06)]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[18px] text-[#6B7689]"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
          >
            search
          </span>
          <input
            type="text"
            placeholder="Search actions, meetings, contacts…"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent flex-1 text-[13px] text-[#F5F7FA] placeholder:text-[#6B7689] outline-none font-mono"
          />
          <kbd className="text-[10px] text-[#6B7689] font-mono px-1.5 py-0.5 rounded border border-[rgba(255,255,255,0.08)]">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Agent status pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(139,92,246,0.25)] bg-[rgba(139,92,246,0.05)] mr-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
          <span className="text-[11px] text-[#A9B4C4] font-mono">Agent online</span>
        </div>

        {/* AI assistant */}
        <button
          aria-label="AI Assistant"
          className="text-[#A9B4C4] hover:bg-[#102544] hover:text-[#F5F7FA] rounded-full p-2 transition-colors relative group"
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
          >
            smart_toy
          </span>
          <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] group-hover:scale-110 transition-transform" />
        </button>

        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="text-[#A9B4C4] hover:bg-[#102544] hover:text-[#F5F7FA] rounded-full p-2 transition-colors relative"
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
          >
            notifications
          </span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8B5CF6]">
            <span className="absolute inset-0 rounded-full bg-[#8B5CF6] animate-ping opacity-75" />
          </span>
        </button>

        {/* Separator */}
        <div className="w-px h-6 bg-[rgba(255,255,255,0.08)] mx-1" />

        {/* User avatar — dropdown with sign-out */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-[#102544] transition-colors group"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#3B82F6] flex items-center justify-center text-[12px] font-bold text-white">
              {initials}
            </div>
            <div className="hidden lg:flex flex-col text-left leading-tight">
              <span className="text-[12px] font-medium text-[#F5F7FA]">
                {displayName.length > 12 ? displayName.slice(0, 12) + '…' : displayName}
              </span>
              <span className="text-[10px] text-[#6B7689] font-mono truncate max-w-[120px]">
                {user?.email || 'Vertex Labs'}
              </span>
            </div>
            <span
              className="material-symbols-outlined text-[16px] text-[#6B7689] group-hover:text-[#A9B4C4] transition-colors"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
            >
              {menuOpen ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0A1E36] backdrop-blur-xl shadow-elevated z-50 overflow-hidden">
                <div className="p-3 border-b border-[rgba(255,255,255,0.06)]">
                  <div className="text-[13px] font-medium text-[#F5F7FA] truncate">
                    {user?.displayName || displayName}
                  </div>
                  <div className="text-[11px] text-[#6B7689] font-mono truncate">
                    {user?.email}
                  </div>
                </div>
                <div className="p-1.5">
                  <button className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px] text-[#A9B4C4] hover:bg-[#102544] hover:text-[#F5F7FA] transition-colors">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                    >
                      person
                    </span>
                    Profile
                  </button>
                  <button className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px] text-[#A9B4C4] hover:bg-[#102544] hover:text-[#F5F7FA] transition-colors">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                    >
                      settings
                    </span>
                    Settings
                  </button>
                </div>
                <div className="p-1.5 border-t border-[rgba(255,255,255,0.06)]">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-[13px] text-[#F87171] hover:bg-[rgba(248,113,113,0.1)] transition-colors"
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                    >
                      logout
                    </span>
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
