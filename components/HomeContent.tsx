"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useClientRouter } from '../hooks/useClientRouter';

export default function HomeContent() {
  const router = useClientRouter();
  const { checkAuth } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !router) return;
    
    const verifyAndRedirect = async () => {
      const isAuth = await checkAuth();
      if (!isAuth) {
        return; // Redirect will happen in checkAuth
      }
      
      // If authenticated and on root, redirect to dashboard
      if (router.pathname === '/') {
        router.push('/dashboard');
      }
    };

    verifyAndRedirect();
  }, [isClient, router, checkAuth]);

  return (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-200">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to CodeStandoff 2.0
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Redirecting to dashboard...
        </p>
      </div>
    </div>
  );
}

