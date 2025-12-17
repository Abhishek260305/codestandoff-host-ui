import dynamic from 'next/dynamic';
import Layout from '../components/Layout/Layout';

// Dynamically import OneVOneContent with SSR disabled to avoid router issues
const OneVOneContent = dynamic(() => import('../components/OneVOneContent'), { ssr: false });

export default function OneVOne() {
  return (
    <Layout currentRoute="1v1">
      <OneVOneContent />
    </Layout>
  );
}

