import { GetStaticProps } from 'next';
import { ExerciseData } from '@/interfaces/exercises';
import ExercisesPage from '@/components/pages/ExercisesPage';
import SEOHead from '@/components/SEOHead';


interface ExercisesPageProps {
  exercises: ExerciseData[];
}

export default function Exercises({ exercises }: ExercisesPageProps) {
  return (
    <>
      <SEOHead pathname="/code/exercises" />
      <ExercisesPage exercises={exercises} />
    </>
  );
}

export const getStaticProps: GetStaticProps<ExercisesPageProps> = async () => {
  // Import exercises data
  const exercisesData = await import('../../../../public/exercises.json');
  const exercises = exercisesData.default as ExerciseData[];

  return {
    props: {
      exercises,
    },
    revalidate: 3600, // Revalidate every hour
  };
};