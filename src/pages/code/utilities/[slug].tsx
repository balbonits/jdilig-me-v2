import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { UtilityData } from '@interfaces/utilities';
import { PageContainer } from '@/components/ui';
import UtilityShowcase from '@/components/ui/UtilityShowcase';

interface UtilityPageProps {
  utility: UtilityData;
}

export default function UtilityPage({ utility }: UtilityPageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <PageContainer>
        <div>Loading utility...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <UtilityShowcase utility={utility} />
    </PageContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Import utilities data
  const utilitiesData = await import('../../../../public/utilities.json');
  const utilities = utilitiesData.default as UtilityData[];

  const paths = utilities.map((utility) => ({
    params: { slug: utility.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<UtilityPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  
  // Import utilities data
  const utilitiesData = await import('../../../../public/utilities.json');
  const utilities = utilitiesData.default as UtilityData[];

  const utility = utilities.find((util) => util.slug === slug);

  if (!utility) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      utility,
    },
    revalidate: 3600, // Revalidate every hour
  };
};