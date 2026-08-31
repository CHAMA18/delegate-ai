/**
 * Delegate.ai — Firebase initialization (lazy-loaded)
 *
 * Firebase is loaded dynamically on the client only when needed, to keep
 * the initial bundle size small and avoid OOM during `next build` on
 * Render's free tier (512MB limit).
 *
 * Usage:
 *   const { auth, googleProvider } = await getFirebase();
 */

import type { FirebaseApp } from 'firebase/app';
import type { Auth, GoogleAuthProvider as GoogleAuthProviderType } from 'firebase/auth';

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

interface FirebaseInstances {
  app: FirebaseApp;
  auth: Auth;
  googleProvider: GoogleAuthProviderType;
}

let instancesPromise: Promise<FirebaseInstances> | null = null;

export async function getFirebase(): Promise<FirebaseInstances> {
  if (instancesPromise) return instancesPromise;

  instancesPromise = (async () => {
    const [{ initializeApp, getApps, getApp }, { getAuth, GoogleAuthProvider }] = await Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
    ]);

    const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });

    return { app, auth, googleProvider };
  })();

  return instancesPromise;
}

export const firebaseConfig_exported = firebaseConfig;
