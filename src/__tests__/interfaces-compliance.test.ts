/**
 * Interface Compliance Tests
 * 
 * These tests ensure that all exercises and utilities properly implement
 * the required interface fields, especially detailedDescription.
 * 
 * This prevents runtime errors and ensures TypeScript type safety.
 */

import { describe, test, expect } from '@jest/globals';

// Import all utility modules
import ArrayDeduper from '../exercises/ArrayDeduper';
import AnagramCheck from '../exercises/AnagramCheck';
import BinarySearch from '../exercises/BinarySearch';
import FibonacciSeq from '../exercises/FibonacciSeq';
import FizzBuzz from '../exercises/FizzBuzz';
import FactorialCalc from '../exercises/FactorialCalc';
import LRUCache from '../exercises/LRUCache';
import LongestCommonSubstring from '../exercises/LongestCommonSubstring';
import MergeSort from '../exercises/MergeSort';
import Palindrome from '../exercises/Palindrome';
import QuickSort from '../exercises/QuickSort';
import ReverseString from '../exercises/ReverseString';
import SlidingWindowMax from '../exercises/SlidingWindowMax';
import Trie from '../exercises/Trie';

import Curry from '../utilities/Curry';
import Debounce from '../utilities/Debounce';
import DeepClone from '../utilities/DeepClone';
import DeepEqual from '../utilities/DeepEqual';
import GroupBy from '../utilities/GroupBy';
import IsEmpty from '../utilities/IsEmpty';
import IsValidEmail from '../utilities/IsValidEmail';
import IsValidURL from '../utilities/IsValidURL';
import Memoize from '../utilities/Memoize';
import Omit from '../utilities/Omit';
import Pick from '../utilities/Pick';
import Retry from '../utilities/Retry';
import Slugify from '../utilities/Slugify';
import Throttle from '../utilities/Throttle';

describe('Interface Compliance Tests', () => {
  describe('Exercise Metadata Compliance', () => {
    const exercises = [
      { name: 'ArrayDeduper', module: ArrayDeduper },
      { name: 'AnagramCheck', module: AnagramCheck },
      { name: 'BinarySearch', module: BinarySearch },
      { name: 'FibonacciSeq', module: FibonacciSeq },
      { name: 'FizzBuzz', module: FizzBuzz },
      { name: 'FactorialCalc', module: FactorialCalc },
      { name: 'LRUCache', module: LRUCache },
      { name: 'LongestCommonSubstring', module: LongestCommonSubstring },
      { name: 'MergeSort', module: MergeSort },
      { name: 'Palindrome', module: Palindrome },
      { name: 'QuickSort', module: QuickSort },
      { name: 'ReverseString', module: ReverseString },
      { name: 'SlidingWindowMax', module: SlidingWindowMax },
      { name: 'Trie', module: Trie },
    ];

    exercises.forEach(({ name, module }) => {
      test(`${name} has required metadata fields`, () => {
        expect(module.metadata).toBeDefined();
        expect(module.metadata.title).toBeDefined();
        expect(module.metadata.description).toBeDefined();
        expect(module.metadata.detailedDescription).toBeDefined();
        expect(module.metadata.concepts).toBeDefined();
        expect(module.metadata.timeComplexity).toBeDefined();
        expect(module.metadata.spaceComplexity).toBeDefined();
        expect(module.metadata.difficulty).toBeDefined();

        // Ensure detailedDescription is not empty and has rich content
        expect(module.metadata.detailedDescription.length).toBeGreaterThan(50);
        expect(module.metadata.detailedDescription).toMatch(/[🎯⚡🧠🚀💡]/); // Contains emojis
        expect(module.metadata.detailedDescription).toMatch(/\n/); // Contains line breaks
      });

      test(`${name} has valid solutions array`, () => {
        expect(module.solutions).toBeDefined();
        expect(Array.isArray(module.solutions)).toBe(true);
        expect(module.solutions.length).toBeGreaterThan(0);
      });

      test(`${name} has valid examples array`, () => {
        expect(module.examples).toBeDefined();
        expect(Array.isArray(module.examples)).toBe(true);
        expect(module.examples.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Utility Metadata Compliance', () => {
    const utilities = [
      { name: 'Curry', module: Curry },
      { name: 'Debounce', module: Debounce },
      { name: 'DeepClone', module: DeepClone },
      { name: 'DeepEqual', module: DeepEqual },
      { name: 'GroupBy', module: GroupBy },
      { name: 'IsEmpty', module: IsEmpty },
      { name: 'IsValidEmail', module: IsValidEmail },
      { name: 'IsValidURL', module: IsValidURL },
      { name: 'Memoize', module: Memoize },
      { name: 'Omit', module: Omit },
      { name: 'Pick', module: Pick },
      { name: 'Retry', module: Retry },
      { name: 'Slugify', module: Slugify },
      { name: 'Throttle', module: Throttle },
    ];

    utilities.forEach(({ name, module }) => {
      test(`${name} has required metadata fields`, () => {
        expect(module.metadata).toBeDefined();
        expect(module.metadata.title).toBeDefined();
        expect(module.metadata.description).toBeDefined();
        expect(module.metadata.category).toBeDefined();
        expect(module.metadata.concepts).toBeDefined();
        expect(module.metadata.timeComplexity).toBeDefined();
        expect(module.metadata.spaceComplexity).toBeDefined();
        expect(module.metadata.difficulty).toBeDefined();

        // detailedDescription is optional but if present should have rich content
        if (module.metadata.detailedDescription) {
          expect(module.metadata.detailedDescription.length).toBeGreaterThan(50);
          expect(module.metadata.detailedDescription).toMatch(/[🎯⚡🧠🚀💡]/); // Contains emojis
          expect(module.metadata.detailedDescription).toMatch(/\n/); // Contains line breaks
        }
      });

      test(`${name} has valid solutions array`, () => {
        expect(module.solutions).toBeDefined();
        expect(Array.isArray(module.solutions)).toBe(true);
        expect(module.solutions.length).toBeGreaterThan(0);
      });

      test(`${name} has valid examples array`, () => {
        expect(module.examples).toBeDefined();
        expect(Array.isArray(module.examples)).toBe(true);
        expect(module.examples.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Enhanced Description Content Quality', () => {
    test('All enhanced descriptions follow consistent format', () => {
      // Test a sampling of modules for consistent format
      const sampleModules = [
        { metadata: ArrayDeduper.metadata },
        { metadata: DeepClone.metadata },
        { metadata: Memoize.metadata },
      ];

      sampleModules.forEach(({ metadata }) => {
        if (metadata.detailedDescription) {
          // Should have structured sections with bullet points
          expect(metadata.detailedDescription).toMatch(/•.*:/); // Bullet points with labels
          expect(metadata.detailedDescription).toMatch(/🚀.*Applications:/); // Real-world applications section
          expect(metadata.detailedDescription).toMatch(/💡.*Learning Value:/); // Learning value section
        }
      });
    });
  });
});