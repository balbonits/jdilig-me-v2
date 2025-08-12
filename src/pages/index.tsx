import HomePage from '@/components/pages/HomePage';
import SEOHead from '@/components/SEOHead';

export default function Home() {
  return (
    <>
      <SEOHead pathname="/" />
      <HomePage />
    </>
  );
}