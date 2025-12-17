"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useClientRouter } from '../hooks/useClientRouter';
import ProtectedRoute from './ProtectedRoute';

// Client-side only wrapper component
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-200">
        <div className="text-gray-900 dark:text-white">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}

const DashboardRemote = () => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadRemote = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        const mod = await import('dashboard-ui/Dashboard' as any);
        setComponent(() => mod.default || mod);
      } catch (err: any) {
        console.error('Failed to load Dashboard:', err);
        setError(true);
      }
    };
    
    loadRemote();
  }, []);
  
  if (error) return (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-200">
      <div className="text-red-500">Dashboard not available</div>
    </div>
  );
  if (!Component) return (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-200">
      <div className="text-gray-900 dark:text-white">Loading Dashboard...</div>
    </div>
  );
  return <Component />;
};

export default function DashboardContent() {
  const router = useClientRouter();
  const { isLoading: authLoading, checkAuth } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !router || authLoading) return;
    
    const verifyAuth = async () => {
      const isAuth = await checkAuth();
      if (!isAuth) {
        if (router) {
          router.push('/');
        } else if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      }
    };
    verifyAuth();
  }, [isClient, router, authLoading, checkAuth]);

  if (authLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="h-full">
        <ClientOnly>
          <DashboardRemote />
        </ClientOnly>
      </div>
    </ProtectedRoute>
  );
}

