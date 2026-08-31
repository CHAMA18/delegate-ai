/**
 * Delegate.ai — Firebase initialization
 *
 * Initializes Firebase app, Analytics, and Auth with the oceanskies-35d10
 * project config. Exports singleton instances for use across the app.
 *
 * Usage:
 *   import { auth, analytics, logEvent } from '@/lib/firebase';
 *
 * Analytics is lazy-loaded (only initialized in the browser, not SSR) and
 * respects Do Not Track / reduced-data preferences.
 */

import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';
import {
  getAuth,
  GoogleAuthProvider,
  type Auth,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB5lKLI5aozIOvzFplW4e6Z2ghAsvfrmrY',
  authDomain: 'oceanskies-35d10.firebaseapp.com',
  databaseURL: 'https://oceanskies-35d10.firebaseio.com',
  projectId: 'oceanskies-35d10',
  storageBucket: 'oceanskies-35d10.firebasestorage.app',
  messagingSenderId: '418936930377',
  appId: '1:418936930377:web:4586103acc22643427bf98',
  measurementId: 'G-398WW7BPZ5',
};

// Avoid double-init during HMR / SSR re-renders
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Auth — safe on both server and client (only operations require client)
export const auth: Auth = getAuth(app);

// Google OAuth provider for the "Continue with Google" buttons
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Analytics — lazy-init, browser-only, respects DNT
let analytics: Analytics | null = null;

export async function getAnalyticsInstance(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return null;
  if (analytics) return analytics;

  const supported = await isSupported();
  if (!supported) return null;

  // Respect Do Not Track
  const dnt = navigator.doNotTrack || (window as unknown as { doNotTrack?: string }).doNotTrack;
  if (dnt === '1' || dnt === 'yes') return null;

  analytics = getAnalytics(app);
  return analytics;
}

// Initialize analytics on first client render (fire-and-forget)
if (typeof window !== 'undefined') {
  getAnalyticsInstance().catch(() => {
    // Silent fail — analytics is non-critical
  });
}

export { app };
export default app;
