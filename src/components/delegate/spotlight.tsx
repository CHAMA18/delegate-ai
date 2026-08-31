'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';

/**
 * Cursor-following spotlight (brief §8.2 — signature interaction #3).
 * Tracks pointer via CSS vars --mx / --my. Respects reduced motion.
 *
 * Two-pass render: SSR + first paint output the disabled state, then
 * a mounted flag flips on the second paint. This avoids hydration
 * mismatch while preserving the runtime behavior.
 */
export function Spotlight({
  children,
  className = '',
  radius = 600,
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;
    setEnabled(true);

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty('--mx', `${x}px`);
        el.style.setProperty('--my', `${y}px`);
      });
    };
    el.addEventListener('mousemove', onMove);
    return () => {
      el.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`spotlight ${enabled ? 'spotlight-enabled' : ''} ${className}`}
      style={
        enabled
          ? ({ ['--spotlight-radius' as string]: `${radius}px` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
