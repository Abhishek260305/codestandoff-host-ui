import { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setCurrentRoute } from '../store/slices/appSlice';

type Route = 'dashboard' | 'training' | '1v1' | 'playground' | 'signup' | null;

// Client-side only wrapper component
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="text-gray-900 dark:text-white">Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}

// Remote component loaders - using Module Federation runtime API
// This approach avoids webpack build-time resolution issues
const DashboardRemote = () => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadRemote = async () => {
      try {
        // Wait for Module Federation to initialize
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Use dynamic import - Module Federation runtime will intercept
        // The build error is expected and can be ignored
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
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="text-red-500">Dashboard not available</div>
    </div>
  );
  if (!Component) return (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="text-gray-900 dark:text-white">Loading Dashboard...</div>
    </div>
  );
  return <Component />;
};

const TrainingRemote = () => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadRemote = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        const mod = await import('training-ui/Training' as any);
        setComponent(() => mod.default || mod);
      } catch (err: any) {
        console.error('Failed to load Training:', err);
        setError(true);
      }
    };
    
    loadRemote();
  }, []);
  
  if (error) return (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="text-red-500">Training not available</div>
    </div>
  );
  if (!Component) return (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="text-gray-900 dark:text-white">Loading Training...</div>
    </div>
  );
  return <Component />;
};

const OneVOneRemote = () => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadRemote = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        const mod = await import('onevone-ui/OneVOne' as any);
        setComponent(() => mod.default || mod);
      } catch (err: any) {
        console.error('Failed to load 1v1:', err);
        setError(true);
      }
    };
    
    loadRemote();
  }, []);
  
  if (error) return (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="text-red-500">1v1 not available</div>
    </div>
  );
  if (!Component) return (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="text-gray-900 dark:text-white">Loading 1v1...</div>
    </div>
  );
  return <Component />;
};

const PlaygroundRemote = () => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadRemote = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        const mod = await import('playground-ui/Playground' as any);
        setComponent(() => mod.default || mod);
      } catch (err: any) {
        console.error('Failed to load Playground:', err);
        setError(true);
      }
    };
    
    loadRemote();
  }, []);
  
  if (error) return (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="text-red-500">Playground not available</div>
    </div>
  );
  if (!Component) return (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="text-gray-900 dark:text-white">Loading Playground...</div>
    </div>
  );
  return <Component />;
};

const SignupRemote = () => {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadRemote = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        const mod = await import('signup-builder-ui/Signup' as any);
        setComponent(() => mod.default || mod);
      } catch (err: any) {
        console.error('Failed to load Signup:', err);
        setError(true);
      }
    };
    
    loadRemote();
  }, []);
  
  if (error) return (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="text-red-500">Signup not available</div>
    </div>
  );
  if (!Component) return (
    <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="text-gray-900 dark:text-white">Loading Signup...</div>
    </div>
  );
  return <Component />;
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const dispatch = useAppDispatch();
  const currentRoute = useAppSelector((state) => state.app.currentRoute);

  useEffect(() => {
    setIsClient(true);
    // Set document title
    if (typeof window !== 'undefined') {
      document.title = 'CodeStandoff 2.0';
    }
  }, []);

  // Return a simple loading state during SSR - this prevents any SSR errors
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="text-gray-900 dark:text-white">Loading...</div>
      </div>
    );
  }

  // Render the selected remote component
  const renderRemote = () => {
    switch (currentRoute) {
      case 'dashboard':
        return (
          <div className="h-full">
            <ClientOnly>
              <DashboardRemote />
            </ClientOnly>
          </div>
        );
      case 'training':
        return (
          <div className="h-full">
            <ClientOnly>
              <TrainingRemote />
            </ClientOnly>
          </div>
        );
      case '1v1':
        return (
          <div className="h-full">
            <ClientOnly>
              <OneVOneRemote />
            </ClientOnly>
          </div>
        );
      case 'playground':
        return (
          <div className="h-full">
            <ClientOnly>
              <PlaygroundRemote />
            </ClientOnly>
          </div>
        );
      case 'signup':
        return (
          <div className="h-full">
            <ClientOnly>
              <SignupRemote />
            </ClientOnly>
          </div>
        );
      default:
        return (
          <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome to CodeStandoff 2.0
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Select a module from the sidebar to get started
              </p>
            </div>
          </div>
        );
    }
  };

  const handleRouteChange = (route: Route) => {
    dispatch(setCurrentRoute(route));
  };

  return (
    <Layout currentRoute={currentRoute} onRouteChange={handleRouteChange}>
      {renderRemote()}
    </Layout>
  );
}
