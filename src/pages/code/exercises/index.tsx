import { GetStaticProps } from 'next';
import { ExerciseData } from '@/interfaces/exercises';
import ExercisesPage from '@/components/pages/ExercisesPage';
import SEOHead from '@/components/SEOHead';
import { loadExercisesData } from '@/utils/data-fetchers';


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
  // Temporarily use full data to debug  
  const exercises = await loadExercisesData();
  return {
    props: {
      exercises,
    },
    revalidate: 3600,
  };
};