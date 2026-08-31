'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Count-up number on scroll into view (brief §9 — implementation checklist).
 * Honors reduced motion (jumps to final value immediately).
 */
export function CountUp({
  to,
  duration = 1800,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: {
  to: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Start with the target value if reduced motion, else 0 — decided via lazy init
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined') return 0;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    return mq.matches ? to : 0;
  });
  const doneRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (doneRef.current) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      doneRef.current = true;
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !doneRef.current) {
          doneRef.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
            setValue(to * eased);
            if (t < 1) {
              requestAnimationFrame(tick);
            } else {
              setValue(to);
            }
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  const formatted =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
