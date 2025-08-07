import { GetStaticProps } from 'next';
import { UtilityData } from '@interfaces/utilities';
import UtilitiesPage from '@/components/pages/UtilitiesPage';

interface UtilitiesPageProps {
  utilities: UtilityData[];
}

export default function Utilities({ utilities }: UtilitiesPageProps) {
  return <UtilitiesPage utilities={utilities} />;
}

export const getStaticProps: GetStaticProps<UtilitiesPageProps> = async () => {
  // Import utilities data
  const utilitiesData = await import('../../../../public/utilities.json');
  const utilities = utilitiesData.default as UtilityData[];

  return {
    props: {
      utilities,
    },
    revalidate: 3600, // Revalidate every hour
  };
};