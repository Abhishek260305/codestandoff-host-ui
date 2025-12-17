import { useEffect, useState, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  onUnauthenticated?: () => void;
}

/**
 * ProtectedRoute component that ensures user is authenticated before rendering children
 * If authentication fails, redirects to signup page
 */
export default function ProtectedRoute({ children, onUnauthenticated }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8080/query", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies
          body: JSON.stringify({
            query: `
              query Me {
                me {
                  id
                  email
                  firstName
                  lastName
                }
              }
            `,
          }),
        });

        const result = await response.json();

        if (result.data?.me) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          // Clear localStorage
          localStorage.removeItem('user');
          localStorage.removeItem('user_data');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('auth_refresh_token');
          localStorage.removeItem('auth_expires_at');
          
          if (onUnauthenticated) {
            onUnauthenticated();
          } else {
            window.location.href = "http://localhost:3005";
          }
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
        // Clear localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('user_data');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_refresh_token');
        localStorage.removeItem('auth_expires_at');
        
        if (onUnauthenticated) {
          onUnauthenticated();
        } else {
          window.location.href = "http://localhost:3005";
        }
      }
    };

    checkAuth();
  }, [onUnauthenticated]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // If not authenticated, show nothing (redirect is happening)
  return null;
}


