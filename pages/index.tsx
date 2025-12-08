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

// Remote component loader
function RemoteComponent({ 
  remoteName, 
  componentName 
}: { 
  remoteName: string; 
  componentName: string;
}) {
  const [Component, setComponent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import(remoteName)
        .then((mod) => {
          setComponent(() => mod.default);
        })
        .catch((err) => {
          console.error(`Failed to load ${componentName}:`, err);
          setError(true);
        });
    }
  }, [remoteName, componentName]);

  if (error) {
    return <div className="p-4 text-red-500">{componentName} not available</div>;
  }

  if (!Component) {
    return <div className="p-4">Loading {componentName}...</div>;
  }

  return <Component />;
}

export default function Home() {
  useEffect(() => {
    // Set document title
    if (typeof window !== 'undefined') {
      document.title = 'CodeStandoff 2.0';
    }
  }, []);

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
                <RemoteComponent remoteName="dashboard-ui/Dashboard" componentName="Dashboard" />
              </ClientOnly>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Training</h3>
              <ClientOnly>
                <RemoteComponent remoteName="training-ui/Training" componentName="Training" />
              </ClientOnly>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">1v1</h3>
              <ClientOnly>
                <RemoteComponent remoteName="onevone-ui/OneVOne" componentName="1v1" />
              </ClientOnly>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Playground</h3>
              <ClientOnly>
                <RemoteComponent remoteName="playground-ui/Playground" componentName="Playground" />
              </ClientOnly>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <ClientOnly>
                <RemoteComponent remoteName="signup-builder-ui/Signup" componentName="Signup" />
              </ClientOnly>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
