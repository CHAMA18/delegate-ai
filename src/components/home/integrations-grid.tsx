'use client';

/**
 * Integrations status grid — shows connected Workspace apps.
 * Each card: app icon, connection status, last sync time.
 */

interface Integration {
  id: string;
  name: string;
  icon: string;
  tint: string;
  bg: string;
  connected: boolean;
  lastSync: string;
  actionCount: number;
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'gmail',
    name: 'Gmail',
    icon: 'mail',
    tint: '#c4abff',
    bg: 'rgba(139,92,246,0.1)',
    connected: true,
    lastSync: '2m ago',
    actionCount: 847,
  },
  {
    id: 'calendar',
    name: 'Calendar',
    icon: 'event',
    tint: '#89ceff',
    bg: 'rgba(59,130,246,0.1)',
    connected: true,
    lastSync: '2m ago',
    actionCount: 312,
  },
  {
    id: 'drive',
    name: 'Drive',
    icon: 'description',
    tint: '#A9B4C4',
    bg: 'rgba(255,255,255,0.05)',
    connected: true,
    lastSync: '18m ago',
    actionCount: 89,
  },
  {
    id: 'crm',
    name: 'CRM',
    icon: 'table_chart',
    tint: '#34D399',
    bg: 'rgba(52,211,153,0.1)',
    connected: true,
    lastSync: '3m ago',
    actionCount: 36,
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: 'tag',
    tint: '#FBBF24',
    bg: 'rgba(251,191,36,0.1)',
    connected: false,
    lastSync: '—',
    actionCount: 0,
  },
];

export function IntegrationsGrid() {
  return (
    <section className="flex flex-col gap-3 p-5 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#0A1E36]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[18px] text-[#89ceff]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
          >
            account_tree
          </span>
          <h2 className="text-[16px] font-semibold text-[#F5F7FA]">Connected apps</h2>
          <span className="text-[11px] text-[#6B7689] font-mono">
            · {INTEGRATIONS.filter((i) => i.connected).length}/{INTEGRATIONS.length}
          </span>
        </div>
        <button className="text-[12px] text-[#c4abff] hover:text-[#F5F7FA] inline-flex items-center gap-1 transition-colors">
          Manage
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {INTEGRATIONS.map((int) => (
          <div
            key={int.id}
            className={`group p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
              int.connected
                ? 'border-[rgba(255,255,255,0.06)] bg-[#031427]/60 hover:border-[rgba(139,92,246,0.25)] hover:bg-[#102544]'
                : 'border-dashed border-[rgba(255,255,255,0.08)] bg-transparent hover:border-[rgba(139,92,246,0.3)] hover:bg-[#102544]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: int.bg, border: `1px solid ${int.tint}30` }}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{
                    color: int.connected ? int.tint : '#6B7689',
                    fontVariationSettings: "'FILL' 1, 'wght' 400",
                  }}
                >
                  {int.icon}
                </span>
              </div>
              {int.connected ? (
                <span
                  className="material-symbols-outlined text-[14px] text-[#34D399]"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                >
                  check_circle
                </span>
              ) : (
                <span
                  className="material-symbols-outlined text-[14px] text-[#6B7689] group-hover:text-[#c4abff] transition-colors"
                  style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
                >
                  add_circle
                </span>
              )}
            </div>
            <div className="text-[12px] font-medium text-[#F5F7FA] mb-0.5">{int.name}</div>
            <div className="text-[10px] text-[#6B7689] font-mono">
              {int.connected ? `${int.actionCount} actions` : 'Not connected'}
            </div>
            {int.connected && (
              <div className="text-[10px] text-[#34D399] font-mono mt-1 inline-flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#34D399] animate-pulse" />
                synced {int.lastSync}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
