'use client';

import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { getFirebase } from '@/lib/firebase';

/**
 * Subscribe to Firebase auth state.
 * Lazy-loads Firebase on the client only.
 */
export function useAuth(): { user: User | null; loading: boolean } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    getFirebase()
      .then(({ auth, onAuthStateChanged }) => {
        unsubscribe = onAuthStateChanged(
          auth,
          (u: User | null) => {
            setUser(u);
            setLoading(false);
          },
          () => {
            setLoading(false);
          }
        );
      })
      .catch(() => {
        setLoading(false);
      });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { user, loading };
}
