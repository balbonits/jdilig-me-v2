/**
 * @jest-environment jsdom
 */

import type { 
  Showcase, 
  BaseMetadata, 
  Solution,
  ExerciseInput,
  ExerciseOutput,
  UtilityInput,
  UtilityOutput 
} from './shared';
import type { ExerciseData, ExampleCase, ExerciseMetadata } from './exercises';
import type { UtilityData, UtilityExample, UtilityMetadata } from './utilities';

describe('Showcase Interface System', () => {
  describe('Showcase base interface', () => {
    it('should define all required properties for showcase data', () => {
      const mockSolution: Solution = {
        name: 'testSolution',
        tabName: 'Test',
        code: 'function test() { return true; }',
        approach: 'Simple approach',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        isOptimal: true,
        type: 'function'
      };

      const mockMetadata: BaseMetadata = {
        title: 'Test Showcase',
        description: 'A test showcase item',
        concepts: ['testing', 'typescript'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        difficulty: 'Easy'
      };

      const mockExample = {
        description: 'Test example',
        code: 'console.log("test");'
      };

      const showcaseData: Showcase<BaseMetadata, typeof mockExample> = {
        name: 'TestShowcase',
        slug: 'test-showcase',
        metadata: mockMetadata,
        examples: [mockExample],
        code: 'const test = () => "hello";',
        functions: ['test'],
        solutions: [mockSolution]
      };

      expect(showcaseData.name).toBe('TestShowcase');
      expect(showcaseData.slug).toBe('test-showcase');
      expect(showcaseData.metadata.title).toBe('Test Showcase');
      expect(showcaseData.examples).toHaveLength(1);
      expect(showcaseData.functions).toContain('test');
      expect(showcaseData.solutions).toHaveLength(1);
    });
  });

  describe('ExerciseData interface', () => {
    it('should extend Showcase with exercise-specific types', () => {
      const mockExampleCase: ExampleCase = {
        input: [1, 2, 3] as ExerciseInput,
        output: 6 as ExerciseOutput,
        description: 'Sum array elements'
      };

      const mockExerciseMetadata: ExerciseMetadata = {
        title: 'Array Sum',
        description: 'Calculate sum of array elements',
        concepts: ['arrays', 'iteration'],
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        difficulty: 'Easy'
      };

      const mockSolution: Solution = {
        name: 'arraySum',
        tabName: 'Basic',
        code: 'function arraySum(arr) { return arr.reduce((a, b) => a + b, 0); }',
        approach: 'Reduce method',
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(1)',
        isOptimal: true,
        type: 'function'
      };

      const exerciseData: ExerciseData = {
        name: 'ArraySum',
        slug: 'array-sum',
        metadata: mockExerciseMetadata,
        examples: [mockExampleCase],
        code: 'function arraySum(arr) { return arr.reduce((a, b) => a + b, 0); }',
        functions: ['arraySum'],
        solutions: [mockSolution]
      };

      // Test that it satisfies both ExerciseData and Showcase interfaces
      expect(exerciseData.name).toBe('ArraySum');
      expect(exerciseData.metadata.title).toBe('Array Sum');
      expect(exerciseData.examples[0].input).toEqual([1, 2, 3]);
      expect(exerciseData.examples[0].output).toBe(6);
      expect(exerciseData.functions).toContain('arraySum');
    });
  });

  describe('UtilityData interface', () => {
    it('should extend Showcase with utility-specific types', () => {
      const mockUtilityExample: UtilityExample = {
        input: '(fn, 300)' as UtilityInput,
        output: 'debounced function' as UtilityOutput,
        description: 'Basic debounce usage',
        code: 'const debouncedFn = debounce(myFunction, 300);'
      };

      const mockUtilityMetadata: UtilityMetadata = {
        title: 'Debounce Function',
        description: 'Delays function execution until wait time elapses',
        category: 'Performance',
        concepts: ['closures', 'performance'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        difficulty: 'Easy'
      };

      const mockSolution: Solution = {
        name: 'debounce',
        tabName: 'Standard',
        code: 'function debounce(fn, wait) { /* implementation */ }',
        approach: 'Timeout-based approach',
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        isOptimal: true,
        type: 'function'
      };

      const utilityData: UtilityData = {
        name: 'Debounce',
        slug: 'debounce',
        metadata: mockUtilityMetadata,
        examples: [mockUtilityExample],
        code: 'function debounce(fn, wait) { /* implementation */ }',
        functions: ['debounce'],
        solutions: [mockSolution]
      };

      // Test that it satisfies both UtilityData and Showcase interfaces
      expect(utilityData.name).toBe('Debounce');
      expect(utilityData.metadata.title).toBe('Debounce Function');
      expect(utilityData.metadata.category).toBe('Performance');
      expect(utilityData.examples[0].input).toBe('(fn, 300)');
      expect(utilityData.examples[0].output).toBe('debounced function');
      expect(utilityData.functions).toContain('debounce');
    });
  });

  describe('Interface compatibility', () => {
    it('should allow both ExerciseData and UtilityData to be used as Showcase', () => {
      const processShowcase = <T, E>(showcase: Showcase<T, E>) => {
        return {
          name: showcase.name,
          slug: showcase.slug,
          functionCount: showcase.functions.length,
          exampleCount: showcase.examples.length
        };
      };

      const mockExercise: ExerciseData = {
        name: 'TestExercise',
        slug: 'test-exercise',
        metadata: {
          title: 'Test Exercise',
          description: 'A test exercise',
          concepts: ['testing'],
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          difficulty: 'Easy'
        },
        examples: [{
          input: 'test',
          output: 'result',
          description: 'test case'
        }],
        code: 'function test() {}',
        functions: ['test'],
        solutions: []
      };

      const mockUtility: UtilityData = {
        name: 'TestUtility',
        slug: 'test-utility',
        metadata: {
          title: 'Test Utility',
          description: 'A test utility',
          category: 'Testing',
          concepts: ['testing'],
          timeComplexity: 'O(1)',
          spaceComplexity: 'O(1)',
          difficulty: 'Easy'
        },
        examples: [{
          description: 'test case',
          code: 'test();'
        }],
        code: 'function test() {}',
        functions: ['test'],
        solutions: []
      };

      // Both should work with the same function
      const exerciseResult = processShowcase(mockExercise);
      const utilityResult = processShowcase(mockUtility);

      expect(exerciseResult.name).toBe('TestExercise');
      expect(exerciseResult.functionCount).toBe(1);
      expect(utilityResult.name).toBe('TestUtility');
      expect(utilityResult.functionCount).toBe(1);
    });
  });

  describe('Type safety', () => {
    it('should enforce correct metadata and example types', () => {
      // This test ensures TypeScript compilation catches type mismatches
      
      // Exercise should require ExampleCase with input/output
      const exerciseExample: ExampleCase = {
        input: 'test',
        output: 'result',
        description: 'test case'
      };

      // Utility should allow UtilityExample with optional input/output
      const utilityExample: UtilityExample = {
        description: 'test case',
        code: 'test();'
        // input and output are optional
      };

      expect(exerciseExample.input).toBeDefined();
      expect(exerciseExample.output).toBeDefined();
      expect(utilityExample.input).toBeUndefined();
      expect(utilityExample.output).toBeUndefined();
    });

    it('should enforce utility metadata has category field', () => {
      const utilityMetadata: UtilityMetadata = {
        title: 'Test Utility',
        description: 'A test utility',
        category: 'Testing', // Required for utilities
        concepts: ['testing'],
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        difficulty: 'Easy'
      };

      expect(utilityMetadata.category).toBe('Testing');
    });
  });
});