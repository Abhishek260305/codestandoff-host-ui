import dynamic from 'next/dynamic';
import Layout from '../components/Layout/Layout';

// Dynamically import DashboardContent with SSR disabled to avoid router issues
const DashboardContent = dynamic(() => import('../components/DashboardContent'), { ssr: false });

export default function Dashboard() {
  return (
    <Layout currentRoute="dashboard">
      <DashboardContent />
    </Layout>
  );
}

