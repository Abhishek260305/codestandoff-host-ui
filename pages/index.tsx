import dynamic from 'next/dynamic';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../hooks/useAuth';

// Dynamically import HomeContent with SSR disabled to avoid router issues
const HomeContent = dynamic(() => import('../components/HomeContent'), { ssr: false });

export default function Home() {
  const { isLoading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black transition-colors duration-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <Layout currentRoute={null}>
      <HomeContent />
    </Layout>
  );
}
