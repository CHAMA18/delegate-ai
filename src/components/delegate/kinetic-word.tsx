'use client';

import { useEffect, useState } from 'react';

/**
 * Kinetic word-swap (brief §8.2 — signature interaction #2).
 * Rotates the operative noun: executed → shipped → done.
 *
 * Mounted flag set in effect to avoid SSR/CSR style mismatch on the
 * `minWidth` style attribute. Reduced motion is respected.
 */
export function KineticWord({
  words,
  interval = 2400,
  className = '',
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [idx, setIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const t = setInterval(() => {
      setIdx((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span
      className={`relative inline-block align-baseline ${className}`}
      style={{ minWidth: mounted ? '6ch' : undefined }}
    >
      {words.map((w, i) => (
        <span
          key={w}
          aria-hidden={i !== idx}
          className="ai-gradient-text-wide inline-block transition-all duration-500"
          style={{
            position: i === idx ? 'relative' : 'absolute',
            left: 0,
            top: 0,
            opacity: i === idx ? 1 : 0,
            transform:
              i === idx
                ? 'translateY(0) rotateX(0)'
                : `translateY(${i < idx ? '-12px' : '12px'}) rotateX(40deg)`,
            pointerEvents: i === idx ? 'auto' : 'none',
          }}
        >
          {w}
        </span>
      ))}
      <span className="sr-only">{words[idx]}</span>
    </span>
  );
}
