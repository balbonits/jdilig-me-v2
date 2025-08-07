import { useState, useEffect } from 'react';
import { ExerciseData } from '@interfaces/exercises';
import { UtilityData } from '@interfaces/utilities';
import { LoadingState } from '@/types';

export interface CodeDataResult {
  exercises: ExerciseData[];
  utilities: UtilityData[];
  exercisesState: LoadingState;
  utilitiesState: LoadingState;
  error?: string;
}

export function useCodeData(): CodeDataResult {
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const [utilities, setUtilities] = useState<UtilityData[]>([]);
  const [exercisesState, setExercisesState] = useState<LoadingState>('idle');
  const [utilitiesState, setUtilitiesState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchExercises() {
      setExercisesState('loading');
      try {
        const response = await fetch('/exercises.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch exercises: ${response.status}`);
        }
        const data = await response.json() as ExerciseData[];
        setExercises(data);
        setExercisesState('success');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        setExercisesState('error');
      }
    }

    async function fetchUtilities() {
      setUtilitiesState('loading');
      try {
        const response = await fetch('/utilities.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch utilities: ${response.status}`);
        }
        const data = await response.json() as UtilityData[];
        setUtilities(data);
        setUtilitiesState('success');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        setUtilitiesState('error');
      }
    }

    fetchExercises();
    fetchUtilities();
  }, []);

  return {
    exercises,
    utilities,
    exercisesState,
    utilitiesState,
    error
  };
}