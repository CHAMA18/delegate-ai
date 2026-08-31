'use client';

/**
 * Delegate.ai — Analytics event tracking
 *
 * Wraps Firebase Analytics logEvent with safe SSR / DNT handling.
 * Events are queued and flushed when analytics is ready.
 */

import { logEvent, type Analytics } from 'firebase/analytics';
import { getAnalyticsInstance } from './firebase';

let analyticsInstance: Analytics | null = null;
let initPromise: Promise<Analytics | null> | null = null;

async function ensureAnalytics(): Promise<Analytics | null> {
  if (analyticsInstance) return analyticsInstance;
  if (!initPromise) {
    initPromise = getAnalyticsInstance().then((a) => {
      analyticsInstance = a;
      return a;
    });
  }
  return initPromise;
}

/**
 * Track a custom event. Safe to call during SSR (no-op).
 * @example trackEvent('cta_click', { label: 'start_delegating', location: 'hero' })
 */
export async function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): Promise<void> {
  if (typeof window === 'undefined') return;
  const analytics = await ensureAnalytics();
  if (!analytics) return;
  try {
    logEvent(analytics, eventName, params);
  } catch {
    // Silent fail — analytics is non-critical
  }
}

/**
 * Track a page view. Call on route changes.
 */
export async function trackPageView(path: string): Promise<void> {
  await trackEvent('page_view', {
    page_path: path,
    page_title: typeof document !== 'undefined' ? document.title : '',
  });
}

/**
 * Pre-defined event names — keep consistent across the app.
 */
export const EVENTS = {
  // Auth events
  SIGN_IN_ATTEMPT: 'sign_in_attempt',
  SIGN_IN_SUCCESS: 'sign_in_success',
  SIGN_IN_FAILURE: 'sign_in_failure',
  SIGN_UP_ATTEMPT: 'sign_up_attempt',
  SIGN_UP_SUCCESS: 'sign_up_success',
  SIGN_UP_FAILURE: 'sign_up_failure',
  SIGN_OUT: 'sign_out',
  GOOGLE_OAUTH_CLICK: 'google_oauth_click',

  // Landing page CTAs
  LANDING_CTA_CLICK: 'landing_cta_click',
  DEMO_VIDEO_PLAY: 'demo_video_play',
  DEMO_VIDEO_COMPLETE: 'demo_video_complete',

  // Dashboard events
  DASHBOARD_EXECUTE: 'dashboard_execute',
  DASHBOARD_RUN_COMPLETE: 'dashboard_run_complete',

  // Engagement
  SCROLL_DEPTH: 'scroll_depth',
  SECTION_VIEW: 'section_view',
} as const;
