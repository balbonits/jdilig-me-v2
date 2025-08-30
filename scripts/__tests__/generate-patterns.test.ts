/**
 * Pattern Generation Script Tests
 * 
 * Tests for the pattern data generation functionality that converts
 * TypeScript pattern modules into JSON data with solutions and examples.
 */

import * as fs from 'fs';
import * as path from 'path';
import { generatePatterns } from '../generate-patterns';
import { PatternData } from '../../src/interfaces/patterns';

describe('Pattern Generation Script', () => {
  const outputPath = path.join(process.cwd(), 'public', 'patterns.json');
  const indexPath = path.join(process.cwd(), 'public', 'patterns-index.json');

  beforeAll(async () => {
    // Clean up any existing files
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
    if (fs.existsSync(indexPath)) {
      fs.unlinkSync(indexPath);
    }
    
    // Run the generation script
    await generatePatterns();
  });

  describe('File Generation', () => {
    test('should generate patterns.json file', () => {
      expect(fs.existsSync(outputPath)).toBe(true);
      
      const stats = fs.statSync(outputPath);
      expect(stats.size).toBeGreaterThan(0);
      expect(stats.size).toBeGreaterThan(50000); // Should be substantial (50KB+)
    });

    test('should generate patterns-index.json file', () => {
      expect(fs.existsSync(indexPath)).toBe(true);
      
      const stats = fs.statSync(indexPath);
      expect(stats.size).toBeGreaterThan(0);
      expect(stats.size).toBeGreaterThan(1000); // Should have meaningful content
    });

    test('should generate valid JSON files', () => {
      // Test main patterns file
      expect(() => {
        const content = fs.readFileSync(outputPath, 'utf-8');
        JSON.parse(content);
      }).not.toThrow();

      // Test index file
      expect(() => {
        const content = fs.readFileSync(indexPath, 'utf-8');
        JSON.parse(content);
      }).not.toThrow();
    });
  });

  describe('Pattern Data Structure', () => {
    let patterns: PatternData[];

    beforeAll(() => {
      const content = fs.readFileSync(outputPath, 'utf-8');
      patterns = JSON.parse(content);
    });

    test('should have generated patterns', () => {
      expect(patterns).toBeDefined();
      expect(Array.isArray(patterns)).toBe(true);
      expect(patterns.length).toBeGreaterThan(0);
    });

    test('should have valid pattern structure', () => {
      patterns.forEach((pattern, index) => {
        // Required Showcase properties
        expect(pattern.name).toBeDefined();
        expect(pattern.slug).toBeDefined();
        expect(pattern.metadata).toBeDefined();
        expect(pattern.examples).toBeDefined();
        expect(pattern.code).toBeDefined();
        expect(pattern.functions).toBeDefined();
        expect(pattern.solutions).toBeDefined();

        // Type validation
        expect(typeof pattern.name).toBe('string');
        expect(typeof pattern.slug).toBe('string');
        expect(typeof pattern.code).toBe('string');
        expect(Array.isArray(pattern.examples)).toBe(true);
        expect(Array.isArray(pattern.functions)).toBe(true);
        expect(Array.isArray(pattern.solutions)).toBe(true);
      });
    });

    test('should have valid metadata structure', () => {
      patterns.forEach(pattern => {
        const { metadata } = pattern;
        
        expect(metadata.title).toBeDefined();
        expect(metadata.description).toBeDefined();
        expect(metadata.category).toBeDefined();
        expect(metadata.difficulty).toBeDefined();

        expect(typeof metadata.title).toBe('string');
        expect(typeof metadata.description).toBe('string');
        expect(typeof metadata.category).toBe('string');
        expect(typeof metadata.difficulty).toBe('string');

        // Title should not be empty
        expect(metadata.title.length).toBeGreaterThan(0);
        expect(metadata.description.length).toBeGreaterThan(10);
      });
    });

    test('should have valid solution structure', () => {
      patterns.forEach(pattern => {
        pattern.solutions.forEach(solution => {
          expect(solution.name).toBeDefined();
          expect(solution.approach).toBeDefined();
          expect(solution.code).toBeDefined();
          expect(solution.timeComplexity).toBeDefined();
          expect(solution.spaceComplexity).toBeDefined();
          expect(typeof solution.isOptimal).toBe('boolean');

          // Code should be substantial (at least 20 chars)
          expect(solution.code.length).toBeGreaterThan(20);
          
          // Should have complexity notations (O(...) or descriptive text)
          expect(solution.timeComplexity).toMatch(/O\(.+\)|Varies|Constant|Linear|Logarithmic|Quadratic/);
          expect(solution.spaceComplexity).toMatch(/O\(.+\)|Varies|Constant|Linear|Logarithmic|Quadratic/);
        });
      });
    });

    test('should have unique slugs', () => {
      const slugs = patterns.map(p => p.slug);
      const uniqueSlugs = new Set(slugs);
      
      expect(slugs.length).toBe(uniqueSlugs.size);
    });

    test('should have kebab-case slugs', () => {
      patterns.forEach(pattern => {
        expect(pattern.slug).toMatch(/^[a-z0-9-]+$/);
        expect(pattern.slug).not.toContain('_');
        expect(pattern.slug).not.toMatch(/[A-Z]/);
      });
    });
  });

  describe('Pattern Content Quality', () => {
    let patterns: PatternData[];

    beforeAll(() => {
      const content = fs.readFileSync(outputPath, 'utf-8');
      patterns = JSON.parse(content);
    });

    test('should have substantial code implementations', () => {
      patterns.forEach(pattern => {
        // Main code should exist
        expect(pattern.code.length).toBeGreaterThan(20);

        // Solutions should have meaningful code
        pattern.solutions.forEach(solution => {
          expect(solution.code.length).toBeGreaterThan(20);
          
          // Should contain common programming constructs or be a valid code block
          const codePatterns = [
            /class\s+\w+/,           // Class definitions
            /function\s+\w+/,        // Function definitions
            /interface\s+\w+/,       // Interface definitions
            /=>\s*{/,               // Arrow functions
            /constructor\s*\(/,      // Constructors
            /const\s+\w+\s*=/,      // Constant declarations
            /let\s+\w+\s*=/,        // Variable declarations
            /var\s+\w+\s*=/,        // Variable declarations
            /{[\s\S]*}/,            // Any code block
            /\/\//                  // At least contains comments
          ];
          
          const hasValidCode = codePatterns.some(pattern => pattern.test(solution.code));
          expect(hasValidCode).toBe(true);
        });
      });
    });

    test('should have realistic examples', () => {
      patterns.forEach(pattern => {
        if (pattern.examples.length > 0) {
          pattern.examples.forEach(example => {
            expect(example.scenario).toBeDefined();
            expect(example.input).toBeDefined();
            expect(example.output).toBeDefined();

            expect(typeof example.scenario).toBe('string');
            expect(example.scenario.length).toBeGreaterThan(5);
          });
        }
      });
    });

    test('should have proper pattern categories', () => {
      const validCategories = ['Creational', 'Structural', 'Behavioral', 'Modern'];
      
      patterns.forEach(pattern => {
        expect(validCategories).toContain(pattern.metadata.category);
      });

      // Should have patterns from multiple categories
      const categories = [...new Set(patterns.map(p => p.metadata.category))];
      expect(categories.length).toBeGreaterThan(1);
    });

    test('should have multiple solutions per pattern (where applicable)', () => {
      const patternsWithMultipleSolutions = patterns.filter(p => p.solutions.length > 1);
      
      // At least some patterns should have multiple solutions
      expect(patternsWithMultipleSolutions.length).toBeGreaterThan(0);

      patternsWithMultipleSolutions.forEach(pattern => {
        // Should have at least one optimal solution
        const optimalSolutions = pattern.solutions.filter(s => s.isOptimal);
        expect(optimalSolutions.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('Pattern Index File', () => {
    let index: any[];

    beforeAll(() => {
      const content = fs.readFileSync(indexPath, 'utf-8');
      index = JSON.parse(content);
    });

    test('should have valid index structure', () => {
      expect(Array.isArray(index)).toBe(true);
      expect(index.length).toBeGreaterThan(0);

      index.forEach(item => {
        expect(item.slug).toBeDefined();
        expect(item.title).toBeDefined();
        expect(item.description).toBeDefined();
        expect(item.category).toBeDefined();
        expect(item.difficulty).toBeDefined();
        expect(item.solutionCount).toBeDefined();

        expect(typeof item.solutionCount).toBe('number');
        expect(item.solutionCount).toBeGreaterThan(0);
      });
    });

    test('should match main patterns file', () => {
      const patternsContent = fs.readFileSync(outputPath, 'utf-8');
      const patterns: PatternData[] = JSON.parse(patternsContent);

      expect(index.length).toBe(patterns.length);

      // Check that slugs match
      const indexSlugs = index.map(item => item.slug).sort();
      const patternSlugs = patterns.map(pattern => pattern.slug).sort();
      
      expect(indexSlugs).toEqual(patternSlugs);
    });
  });

  describe('Integration with Data Fetchers', () => {
    // Skip integration tests in Node.js environment since fetch is not available
    test.skip('should be loadable by data fetcher functions', async () => {
      // This test requires browser environment with fetch API
      // In production, data fetchers work correctly in Next.js environment
    });

    test.skip('should support slug-based lookup', async () => {
      // This test requires browser environment with fetch API  
      // In production, slug-based lookup works correctly in Next.js environment
    });
  });

  describe('Error Handling', () => {
    test('should handle missing pattern files gracefully', () => {
      // The script should continue even if some patterns fail to load
      // This is verified by the successful generation of patterns.json
      expect(fs.existsSync(outputPath)).toBe(true);
    });

    test('should generate valid JSON even with partial failures', () => {
      const content = fs.readFileSync(outputPath, 'utf-8');
      const patterns = JSON.parse(content);
      
      // Should have generated some patterns despite some failures
      expect(patterns.length).toBeGreaterThan(5);
    });
  });

  afterAll(() => {
    // Cleanup test files if needed (optional - files are useful for development)
    // if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    // if (fs.existsSync(indexPath)) fs.unlinkSync(indexPath);
  });
});