'use client';

import { useEffect, useState } from 'react';
import { CountUp } from '@/components/delegate/count-up';

/**
 * Stat cards row — top of overview dashboard.
 * Brief: count-up animation on scroll-in, mix of action/time/accuracy/streak metrics.
 * Each card has icon, big number, label, delta vs last week, sparkline.
 */

interface Stat {
  id: string;
  icon: string;
  iconTint: string;
  iconBg: string;
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  delta: number;
  sparkData: number[];
  sparkColor: string;
}

const STATS: Stat[] = [
  {
    id: 'actions',
    icon: 'bolt',
    iconTint: 'text-[#c4abff]',
    iconBg: 'bg-[rgba(139,92,246,0.1)] border-[rgba(139,92,246,0.25)]',
    value: 1284,
    suffix: '',
    label: 'Actions shipped',
    delta: 18.4,
    sparkData: [12, 18, 14, 22, 19, 28, 24, 31, 27, 34, 30, 38],
    sparkColor: '#8B5CF6',
  },
  {
    id: 'hours',
    icon: 'schedule',
    iconTint: 'text-[#89ceff]',
    iconBg: 'bg-[rgba(59,130,246,0.1)] border-[rgba(59,130,246,0.25)]',
    value: 42.2,
    decimals: 1,
    suffix: 'h',
    label: 'Hours saved this month',
    delta: 12.1,
    sparkData: [2.1, 3.4, 2.8, 4.2, 3.9, 5.1, 4.8, 5.6, 5.2, 6.1, 5.8, 6.4],
    sparkColor: '#3B82F6',
  },
  {
    id: 'accuracy',
    icon: 'target',
    iconTint: 'text-[#34D399]',
    iconBg: 'bg-[rgba(52,211,153,0.1)] border-[rgba(52,211,153,0.25)]',
    value: 97.2,
    decimals: 1,
    suffix: '%',
    label: 'Action recall accuracy',
    delta: 2.3,
    sparkData: [94, 94.5, 95, 95.8, 96, 96.4, 96.9, 97.2],
    sparkColor: '#34D399',
  },
  {
    id: 'streak',
    icon: 'local_fire_department',
    iconTint: 'text-[#FBBF24]',
    iconBg: 'bg-[rgba(251,191,36,0.1)] border-[rgba(251,191,36,0.25)]',
    value: 24,
    suffix: '',
    label: 'Day execution streak',
    delta: 4,
    sparkData: [1, 1, 1, 1, 1, 1, 1, 2, 3, 5, 8, 13, 21, 24],
    sparkColor: '#FBBF24',
  },
];

export function StatCardsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat, i) => (
        <StatCard key={stat.id} stat={stat} delay={i * 80} />
      ))}
    </div>
  );
}

function StatCard({ stat, delay }: { stat: Stat; delay: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      setVisible(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), delay + 100);
    return () => clearTimeout(t);
  }, [delay]);

  const deltaPositive = stat.delta >= 0;

  return (
    <div className="group relative p-5 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#0A1E36] hover:border-[rgba(139,92,246,0.25)] hover:bg-[#102544] transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `linear-gradient(90deg, transparent, ${stat.sparkColor}, transparent)`,
        }}
      />

      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${stat.iconBg} ${stat.iconTint}`}>
          <span
            className="material-symbols-outlined text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
          >
            {stat.icon}
          </span>
        </div>
        <span
          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${
            deltaPositive
              ? 'bg-[rgba(52,211,153,0.1)] text-[#34D399]'
              : 'bg-[rgba(248,113,113,0.1)] text-[#F87171]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[10px]"
            style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
          >
            {deltaPositive ? 'trending_up' : 'trending_down'}
          </span>
          {Math.abs(stat.delta)}%
        </span>
      </div>

      <div className="flex flex-col gap-0.5 mb-3">
        <div
          className="text-[32px] font-semibold tracking-[-0.03em] leading-none tabular-nums"
          style={{ color: stat.sparkColor }}
        >
          {visible ? (
            <CountUp to={stat.value} decimals={stat.decimals || 0} suffix={stat.suffix} prefix={stat.prefix} />
          ) : (
            <span>0{stat.suffix}</span>
          )}
        </div>
        <div className="text-[12px] text-[#A9B4C4]">{stat.label}</div>
      </div>

      {/* Sparkline */}
      <Sparkline data={stat.sparkData} color={stat.sparkColor} visible={visible} />
    </div>
  );
}

function Sparkline({ data, color, visible }: { data: number[]; color: string; visible: boolean }) {
  const w = 100;
  const h = 28;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const lastX = w;
  const lastY = h - ((data[data.length - 1] - min) / range) * (h - 4) - 2;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-7" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`spark-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Area fill */}
      <polygon
        points={`0,${h} ${points} ${w},${h}`}
        fill={`url(#spark-${color.replace('#', '')})`}
        opacity={visible ? 1 : 0}
        style={{ transition: 'opacity 600ms ease-out' }}
      />
      {/* Line */}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={visible ? 1 : 0}
        style={{ transition: 'opacity 600ms ease-out' }}
      />
      {/* Last point dot */}
      <circle
        cx={lastX}
        cy={lastY}
        r="2"
        fill={color}
        opacity={visible ? 1 : 0}
        style={{ transition: 'opacity 600ms ease-out' }}
      />
    </svg>
  );
}
