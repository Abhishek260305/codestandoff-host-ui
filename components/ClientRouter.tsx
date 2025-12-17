"use client";

import { ReactNode, useEffect, useState } from 'react';

// Dynamically import useRouter only on client
let useRouter: any = null;
if (typeof window !== 'undefined') {
  try {
    useRouter = require('next/router').useRouter;
  } catch (e) {
    // Router not available
  }
}

interface ClientRouterProps {
  children: (router: any) => ReactNode;
  fallback?: ReactNode;
}

/**
 * Wrapper component that ensures router is only used on the client
 * and only after it's ready
 */
export default function ClientRouter({ children, fallback = null }: ClientRouterProps) {
  const [isClient, setIsClient] = useState(false);
  const [router, setRouter] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Only get router on client
    if (typeof window !== 'undefined' && useRouter) {
      try {
        const routerInstance = useRouter();
        if (routerInstance?.isReady) {
          setRouter(routerInstance);
        } else {
          // Wait for router to be ready
          const checkReady = setInterval(() => {
            if (routerInstance?.isReady) {
              setRouter(routerInstance);
              clearInterval(checkReady);
            }
          }, 50);
          
          return () => clearInterval(checkReady);
        }
      } catch (e) {
        // Router not available, will use fallback
      }
    }
  }, []);

  // Don't render children until we're on the client and router is ready
  if (!isClient || !router) {
    return <>{fallback}</>;
  }

  return <>{children(router)}</>;
}

