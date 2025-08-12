import AboutPage from '@/components/pages/AboutPage';
import SEOHead from '@/components/SEOHead';

export default function About() {
  return (
    <>
      <SEOHead pathname="/about" />
      <AboutPage />
    </>
  );
}