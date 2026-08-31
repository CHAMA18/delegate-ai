'use client';

import { useEffect, useRef } from 'react';

/**
 * Reveal-on-scroll wrapper using IntersectionObserver.
 * Adds `.is-visible` when 15% in view. CSS handles the animation.
 */
export function Reveal({
  children,
  className = '',
  stagger = false,
  delay = 0,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      el.classList.add('is-visible');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => {
              el.classList.add('is-visible');
            }, delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag
      ref={ref as never}
      className={`${stagger ? 'reveal-stagger' : 'reveal'} ${className}`}
    >
      {children}
    </Tag>
  );
}
