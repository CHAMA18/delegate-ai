'use client';

/**
 * Delegate.ai logo mark — inline SVG for animation support.
 * Two interlocking chevrons ("The Relay") + dotted transfer trail.
 */
export function LogoMark({
  className = 'h-8 w-8',
}: {
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Delegate.ai">
      <defs>
        <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c4abff" />
          <stop offset="50%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="64" height="64" rx="14" fill="#0A1E36" />
      <g opacity="0.7">
        <circle cx="22" cy="32" r="1" fill="url(#navLogoGrad)" />
        <circle cx="26" cy="32" r="0.9" fill="url(#navLogoGrad)" />
        <circle cx="30" cy="32" r="0.7" fill="url(#navLogoGrad)" />
      </g>
      <path
        d="M 12 18 L 12 46 L 22 46 L 22 37 L 31 32 L 22 27 L 22 18 Z"
        fill="url(#navLogoGrad)"
      />
      <path
        d="M 35 18 L 35 27 L 44 32 L 35 37 L 35 46 L 54 32 Z"
        fill="none"
        stroke="url(#navLogoGrad)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoWordmark({
  className = '',
  showIcon = true,
}: {
  className?: string;
  showIcon?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {showIcon && <LogoMark className="h-8 w-8" />}
      <span className="font-semibold text-[17px] tracking-[-0.02em] text-[#F5F7FA]">
        Delegate
        <span className="ai-gradient-text">.ai</span>
      </span>
    </span>
  );
}
