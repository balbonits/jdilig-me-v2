import { GetStaticProps } from 'next';
import { UtilityData } from '@/interfaces/utilities';
import UtilitiesPage from '@/components/pages/UtilitiesPage';
import SEOHead from '@/components/SEOHead';
import { loadUtilitiesData } from '@/utils/data-fetchers';


interface UtilitiesPageProps {
  utilities: UtilityData[];
}

export default function Utilities({ utilities }: UtilitiesPageProps) {
  return (
    <>
      <SEOHead pathname="/code/utilities" />
      <UtilitiesPage utilities={utilities} />
    </>
  );
}

export const getStaticProps: GetStaticProps<UtilitiesPageProps> = async () => {
  // Temporarily use full data to debug
  const utilities = await loadUtilitiesData();
  return {
    props: {
      utilities,
    },
    revalidate: 3600,
  };
};