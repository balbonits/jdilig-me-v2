export interface ExampleCase {
  input: any;
  output: any;
  description: string;
}

export interface ExerciseMetadata {
  title: string;
  description: string;
  concepts: string[];
  timeComplexity: string;
  spaceComplexity: string;
}

export interface ExerciseData {
  name: string;
  slug: string;
  metadata: ExerciseMetadata;
  examples: ExampleCase[];
  code: string;
  functions: string[];
}