'use client';

/**
 * Delegate.ai — Analytics event tracking (lazy-loaded)
 *
 * Wraps Firebase Analytics logEvent with safe SSR / DNT handling.
 * Events are queued and flushed when analytics is ready.
 */

import { firebaseConfig_exported as firebaseConfig } from './firebase';

let analyticsInstance: any = null;
let initPromise: Promise<any | null> | null = null;

async function ensureAnalytics(): Promise<any | null> {
  if (typeof window === 'undefined') return null;
  if (analyticsInstance) return analyticsInstance;
  if (!initPromise) {
    initPromise = (async () => {
      const { isSupported } = await import('firebase/analytics');
      const supported = await isSupported();
      if (!supported) return null;

      // Respect Do Not Track
      const dnt = navigator.doNotTrack || (window as unknown as { doNotTrack?: string }).doNotTrack;
      if (dnt === '1' || dnt === 'yes') return null;

      const { initializeApp, getApps, getApp } = await import('firebase/app');
      const { getAnalytics } = await import('firebase/analytics');
      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      analyticsInstance = getAnalytics(app);
      return analyticsInstance;
    })();
  }
  return initPromise;
}

export async function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): Promise<void> {
  if (typeof window === 'undefined') return;
  const analytics = await ensureAnalytics();
  if (!analytics) return;
  try {
    const { logEvent } = await import('firebase/analytics');
    logEvent(analytics, eventName, params);
  } catch {
    // Silent fail — analytics is non-critical
  }
}

export async function trackPageView(path: string): Promise<void> {
  await trackEvent('page_view', {
    page_path: path,
    page_title: typeof document !== 'undefined' ? document.title : '',
  });
}

export const EVENTS = {
  SIGN_IN_ATTEMPT: 'sign_in_attempt',
  SIGN_IN_SUCCESS: 'sign_in_success',
  SIGN_IN_FAILURE: 'sign_in_failure',
  SIGN_UP_ATTEMPT: 'sign_up_attempt',
  SIGN_UP_SUCCESS: 'sign_up_success',
  SIGN_UP_FAILURE: 'sign_up_failure',
  SIGN_OUT: 'sign_out',
  GOOGLE_OAUTH_CLICK: 'google_oauth_click',
  LANDING_CTA_CLICK: 'landing_cta_click',
  DEMO_VIDEO_PLAY: 'demo_video_play',
  DEMO_VIDEO_COMPLETE: 'demo_video_complete',
  DASHBOARD_EXECUTE: 'dashboard_execute',
  DASHBOARD_RUN_COMPLETE: 'dashboard_run_complete',
  SCROLL_DEPTH: 'scroll_depth',
  SECTION_VIEW: 'section_view',
} as const;
