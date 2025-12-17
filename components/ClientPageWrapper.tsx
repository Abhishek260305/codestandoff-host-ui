"use client";

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

interface ClientPageWrapperProps {
  children: ReactNode;
  onUnauthenticated?: () => void;
}

/**
 * Wrapper that ensures router and auth checks only happen on client
 * This prevents "NextRouter was not mounted" errors during SSR
 */
export default function ClientPageWrapper({ children, onUnauthenticated }: ClientPageWrapperProps) {
  const [isClient, setIsClient] = useState(false);
  const [router, setRouter] = useState<ReturnType<typeof useRouter> | null>(null);
  const { isLoading: authLoading, checkAuth } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only get router on client
  useEffect(() => {
    if (!isClient || typeof window === 'undefined') return;
    
    try {
      const { useRouter: getRouter } = require('next/router');
      const routerInstance = getRouter();
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
      // Router not available yet
    }
  }, [isClient]);

  // Auth check - only on client with ready router
  useEffect(() => {
    if (!isClient || !router || typeof window === 'undefined') return;
    if (authLoading) return;
    
    const verifyAuth = async () => {
      const isAuth = await checkAuth();
      if (!isAuth && onUnauthenticated) {
        onUnauthenticated();
      } else if (!isAuth) {
        // Default: redirect to home
        if (router.isReady) {
          router.push('/');
        } else {
          window.location.href = '/';
        }
      }
    };
    
    verifyAuth();
  }, [isClient, router, authLoading, checkAuth, onUnauthenticated]);

  // Show loading while waiting for client-side initialization
  if (!isClient || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

