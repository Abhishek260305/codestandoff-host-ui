import { useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<boolean>;
  logout: () => void;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const clearLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('user_data');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_refresh_token');
    localStorage.removeItem('auth_expires_at');
  };

  const checkAuth = useCallback(async (): Promise<boolean> => {
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
        setUser(result.data.me);
        setIsAuthenticated(true);
        // Store user in localStorage for client-side state
        localStorage.setItem('user', JSON.stringify(result.data.me));
        return true;
      } else {
        // No valid authentication
        setUser(null);
        setIsAuthenticated(false);
        clearLocalStorage();
        return false;
      }
    } catch (error) {
      // Authentication check failed
      console.error("Authentication check failed:", error);
      setUser(null);
      setIsAuthenticated(false);
      clearLocalStorage();
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // Call logout mutation
      await fetch("http://localhost:8080/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          query: `
            mutation Logout {
              logout
            }
          `,
        }),
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear state regardless of API call success
      setUser(null);
      setIsAuthenticated(false);
      clearLocalStorage();
      window.location.href = "http://localhost:3005";
    }
  }, []);

  // Check authentication on mount
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      const isAuth = await checkAuth();
      if (!isAuth) {
        window.location.href = "http://localhost:3005";
      }
      setIsLoading(false);
    };

    initAuth();
  }, [checkAuth]);

  return {
    user,
    isAuthenticated,
    isLoading,
    checkAuth,
    logout,
  };
}

