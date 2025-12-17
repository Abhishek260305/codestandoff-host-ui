import { useState, useEffect } from 'react';
import type { NextRouter } from 'next/router';

/**
 * Safe router hook that only works on the client side
 * Returns null during SSR and until router is ready
 * 
 * This hook NEVER calls useRouter() during SSR, only after client mount
 * 
 * Usage:
 * const router = useClientRouter();
 * if (!router) return <Loading />; // Handle null case
 * router.push('/path');
 */
export function useClientRouter(): NextRouter | null {
  const [router, setRouter] = useState<NextRouter | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Double-check we're on client - this effect only runs on client anyway
    if (typeof window === 'undefined') {
      return;
    }

    setIsClient(true);
    
    // Only require and use router on client, after mount
    // Using require() here is safe because:
    // 1. useEffect only runs on client (after mount)
    // 2. We check window first
    // 3. We wrap in try-catch
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { useRouter } = require('next/router');
      const routerInstance = useRouter();
      
      if (routerInstance?.isReady) {
        setRouter(routerInstance);
      } else {
        // Wait for router to be ready
        const checkReady = () => {
          if (routerInstance?.isReady) {
            setRouter(routerInstance);
          } else {
            setTimeout(checkReady, 50);
          }
        };
        checkReady();
      }
    } catch (e) {
      // Router not available, will remain null
      // This is expected during SSR, so we don't log it
      if (typeof window !== 'undefined') {
        console.warn('Router not available:', e);
      }
    }
  }, []);

  // Return null if not on client or router not ready
  if (!isClient || !router) {
    return null;
  }

  return router;
}

