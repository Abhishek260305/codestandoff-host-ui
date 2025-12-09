import { useEffect, useState } from 'react';

// Client-side only wrapper component
function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className="p-4">Loading...</div>;
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
  
  if (error) return <div className="p-4 text-red-500">Dashboard not available</div>;
  if (!Component) return <div className="p-4">Loading Dashboard...</div>;
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
  
  if (error) return <div className="p-4 text-red-500">Training not available</div>;
  if (!Component) return <div className="p-4">Loading Training...</div>;
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
  
  if (error) return <div className="p-4 text-red-500">1v1 not available</div>;
  if (!Component) return <div className="p-4">Loading 1v1...</div>;
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
  
  if (error) return <div className="p-4 text-red-500">Playground not available</div>;
  if (!Component) return <div className="p-4">Loading Playground...</div>;
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
  
  if (error) return <div className="p-4 text-red-500">Signup not available</div>;
  if (!Component) return <div className="p-4">Loading Signup...</div>;
  return <Component />;
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-primary-600">
                  CodeStandoff 2.0
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="http://localhost:3001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </a>
                <a
                  href="http://localhost:3002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Training
                </a>
                <a
                  href="http://localhost:3003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  1v1
                </a>
                <a
                  href="http://localhost:3004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Playground
                </a>
                <a
                  href="http://localhost:3005"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to CodeStandoff 2.0
            </h2>
            <p className="text-xl text-gray-600">
              Competitive coding platform built with Micro Frontend Architecture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
              <ClientOnly>
                <DashboardRemote />
              </ClientOnly>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Training</h3>
              <ClientOnly>
                <TrainingRemote />
              </ClientOnly>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">1v1</h3>
              <ClientOnly>
                <OneVOneRemote />
              </ClientOnly>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Playground</h3>
              <ClientOnly>
                <PlaygroundRemote />
              </ClientOnly>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <ClientOnly>
                <SignupRemote />
              </ClientOnly>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
