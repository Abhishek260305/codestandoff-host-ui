import dynamic from 'next/dynamic';
import Layout from '../components/Layout/Layout';

// Dynamically import PlaygroundContent with SSR disabled to avoid router issues
const PlaygroundContent = dynamic(() => import('../components/PlaygroundContent'), { ssr: false });

export default function Playground() {
  return (
    <Layout currentRoute="playground">
      <PlaygroundContent />
    </Layout>
  );
}

