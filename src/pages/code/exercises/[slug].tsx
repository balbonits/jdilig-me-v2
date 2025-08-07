import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';
import { ExerciseData } from '@interfaces/exercises';
import { PageContainer } from '@/components/ui';
import CodeShowcase from '@/components/ui/CodeShowcase';

interface ExercisePageProps {
  exercise: ExerciseData;
}

export default function ExercisePage({ exercise }: ExercisePageProps) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <PageContainer>
        <div>Loading exercise...</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <CodeShowcase exercise={exercise} />
    </PageContainer>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Import exercises data
  const exercisesData = await import('../../../../public/exercises.json');
  const exercises = exercisesData.default as ExerciseData[];

  const paths = exercises.map((exercise) => ({
    params: { slug: exercise.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ExercisePageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  
  // Import exercises data
  const exercisesData = await import('../../../../public/exercises.json');
  const exercises = exercisesData.default as ExerciseData[];

  const exercise = exercises.find((ex) => ex.slug === slug);

  if (!exercise) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      exercise,
    },
    revalidate: 3600, // Revalidate every hour
  };
};