import dynamic from 'next/dynamic';
import Layout from '../components/Layout/Layout';

// Dynamically import TrainingContent with SSR disabled to avoid router issues
const TrainingContent = dynamic(() => import('../components/TrainingContent'), { ssr: false });

export default function Training() {
  return (
    <Layout currentRoute="training">
      <TrainingContent />
    </Layout>
  );
}

