import { useState, useEffect } from 'react';
import { useRouter as useNextRouter, NextRouter } from 'next/router';

/**
 * Safe wrapper around Next.js useRouter that handles SSR and router mounting
 * Returns null until router is ready on the client
 * 
 * Usage:
 * const router = useSafeRouter();
 * if (!router) return <Loading />; // or null
 * router.push('/path');
 */
export function useSafeRouter(): NextRouter | null {
  const [isClient, setIsClient] = useState(false);
  
  // Always call the hook (required by React rules)
  // It may throw during SSR, but we'll handle that
  const nextRouter = useNextRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return null if not on client or router not ready
  if (!isClient || !nextRouter?.isReady) {
    return null;
  }

  return nextRouter;
}

