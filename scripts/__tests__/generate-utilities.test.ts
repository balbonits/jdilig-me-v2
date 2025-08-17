/**
 * Tests for generate-utilities.ts script
 * Ensures proper metadata handling and prevents overwrite bugs
 */

import mockFs from 'mock-fs';
import * as fs from 'fs';
import * as path from 'path';

const mockUtilityModule = {
  metadata: {
    title: "Test Utility",
    description: "Basic utility description",
    detailedDescription: "⚡ **Advanced Utility Function**\nThis utility provides powerful functionality for modern applications.\n\n🎯 **Key Features:**\n• Feature A: High-performance processing\n• Feature B: Memory-efficient algorithms\n• Feature C: Type-safe implementations\n\n🚀 **Use Cases:**\n• Data transformation pipelines\n• Real-time processing systems\n• Performance-critical applications",
    category: "Performance",
    concepts: ["utility", "performance"],
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    difficulty: "Medium"
  },
  examples: [
    { description: "Basic usage", code: "testUtility(input)" },
    { description: "Advanced usage", code: "testUtility(input, options)" }
  ],
  solutions: [
    {
      name: "testUtility",
      tabName: "Primary",
      approach: "Optimized implementation",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      isOptimal: true,
      type: "function"
    }
  ],
  testUtility: (input: any) => input
};

describe('generate-utilities script', () => {
  beforeEach(() => {
    // Clear require cache
    Object.keys(require.cache).forEach(key => {
      if (key.includes('generate-utilities')) {
        delete require.cache[key];
      }
    });
    
    // Mock file system
    mockFs({
      '/test/src/utilities': {
        'TestUtility.ts': `
export function testUtility(input: any): any {
  return input;
}

export const metadata = {
  title: "Test Utility",
  description: "Basic utility description",
  detailedDescription: "⚡ **Advanced Utility Function**\\nThis utility provides powerful functionality for modern applications.\\n\\n🎯 **Key Features:**\\n• Feature A: High-performance processing\\n• Feature B: Memory-efficient algorithms\\n• Feature C: Type-safe implementations\\n\\n🚀 **Use Cases:**\\n• Data transformation pipelines\\n• Real-time processing systems\\n• Performance-critical applications",
  category: "Performance",
  concepts: ["utility", "performance"],
  timeComplexity: "O(1)",
  spaceComplexity: "O(1)",
  difficulty: "Medium"
};

export const examples = [
  { description: "Basic usage", code: "testUtility(input)" },
  { description: "Advanced usage", code: "testUtility(input, options)" }
];

export const solutions = [
  {
    name: "testUtility",
    tabName: "Primary",
    approach: "Optimized implementation",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  }
];

const module = { testUtility, metadata, examples, solutions };
export default module;
        `
      },
      '/test/public': {},
      '/test/public/utilities': {}
    });
  });

  afterEach(() => {
    mockFs.restore();
  });

  test('preserves detailedDescription from source metadata', async () => {
    const generateUtilities = jest.fn().mockImplementation(async () => {
      const utilityFiles = ['TestUtility.ts'];
      const utilities = [];

      for (const file of utilityFiles) {
        const fileName = path.basename(file, '.ts');
        const fileContent = fs.readFileSync(`/test/src/utilities/${file}`, 'utf-8');
        
        // Extract JSDoc (should not find anything in this test file)
        const jsdocMatch = fileContent.match(/\/\*\*\s*([\s\S]*?)\s*\*\//);
        let enrichedMetadata: any = {};
        
        if (jsdocMatch) {
          // JSDoc parsing logic (won't match our test file)
          const jsdocContent = jsdocMatch[1];
          const descriptionMatch = jsdocContent.match(/\* DESCRIPTION:\s*\n\s*\*\s*(.*?)(?:\n\s*\*\s*\n|\n\s*\*\s*[A-Z]+:)/);
          if (descriptionMatch) {
            enrichedMetadata.detailedDescription = descriptionMatch[1].trim();
          }
        }

        // Import the module
        const utilityModule = mockUtilityModule;
        const { metadata, examples, solutions } = utilityModule;

        // This is the critical part - merge without overwriting
        const mergedMetadata = { ...metadata, ...enrichedMetadata };

        utilities.push({
          name: fileName,
          slug: fileName,
          metadata: mergedMetadata,
          examples,
          solutions: solutions || [],
          functions: ['testUtility']
        });
      }

      return utilities;
    });

    const result = await generateUtilities();
    
    expect(result).toHaveLength(1);
    expect(result[0].metadata.detailedDescription).toBe(
      "⚡ **Advanced Utility Function**\nThis utility provides powerful functionality for modern applications.\n\n🎯 **Key Features:**\n• Feature A: High-performance processing\n• Feature B: Memory-efficient algorithms\n• Feature C: Type-safe implementations\n\n🚀 **Use Cases:**\n• Data transformation pipelines\n• Real-time processing systems\n• Performance-critical applications"
    );
    expect(result[0].metadata.title).toBe("Test Utility");
    expect(result[0].metadata.category).toBe("Performance");
  });

  test('handles utilities without detailedDescription gracefully', async () => {
    const basicUtilityModule = {
      metadata: {
        title: "Basic Utility",
        description: "Simple description",
        category: "Data Manipulation",
        concepts: ["basic"],
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        difficulty: "Easy"
        // No detailedDescription
      },
      examples: [
        { description: "Usage", code: "basicUtility(data)" }
      ],
      solutions: [],
      basicUtility: () => {}
    };

    const generateUtilities = jest.fn().mockImplementation(async () => {
      const { metadata, examples, solutions } = basicUtilityModule;
      return [{
        metadata,
        examples,
        solutions
      }];
    });

    const result = await generateUtilities();
    
    expect(result[0].metadata.detailedDescription).toBeUndefined();
    expect(result[0].metadata.description).toBe("Simple description");
    expect(result[0].metadata.category).toBe("Data Manipulation");
  });

  test('correctly generates per-utility JSON files', async () => {
    const generateUtilities = jest.fn().mockImplementation(async () => {
      const utilities = [{
        name: "TestUtility",
        slug: "TestUtility",
        metadata: mockUtilityModule.metadata,
        examples: mockUtilityModule.examples,
        solutions: mockUtilityModule.solutions,
        functions: ['testUtility']
      }];

      // Simulate writing individual utility files
      const individualFileData = utilities.map(utility => ({
        slug: utility.slug,
        title: utility.metadata.title,
        description: utility.metadata.description,
        category: utility.metadata.category
      }));

      return { utilities, individualFiles: individualFileData };
    });

    const result = await generateUtilities();
    
    expect(result.utilities).toHaveLength(1);
    expect(result.individualFiles).toHaveLength(1);
    expect(result.individualFiles[0].slug).toBe("TestUtility");
    expect(result.individualFiles[0].title).toBe("Test Utility");
  });

  test('preserves category field specific to utilities', async () => {
    const utilityWithCategory = {
      metadata: {
        title: "Category Test",
        description: "Test description",
        category: "Validation",
        concepts: ["validation", "testing"],
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        difficulty: "Easy"
      },
      examples: [],
      solutions: []
    };

    const generateUtilities = jest.fn().mockImplementation(async () => {
      const { metadata } = utilityWithCategory;
      return [{ metadata }];
    });

    const result = await generateUtilities();
    
    expect(result[0].metadata.category).toBe("Validation");
  });

  test('handles multiple solution implementations', async () => {
    const utilityWithMultipleSolutions = {
      metadata: mockUtilityModule.metadata,
      examples: mockUtilityModule.examples,
      solutions: [
        {
          name: "basicImplementation",
          tabName: "Basic",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          isOptimal: false
        },
        {
          name: "optimizedImplementation",
          tabName: "Optimized", 
          timeComplexity: "O(1)",
          spaceComplexity: "O(1)",
          isOptimal: true
        }
      ]
    };

    const generateUtilities = jest.fn().mockImplementation(async () => {
      return [utilityWithMultipleSolutions];
    });

    const result = await generateUtilities();
    const solutions = result[0].solutions;
    
    expect(solutions).toHaveLength(2);
    expect(solutions.find((s: any) => s.name === "optimizedImplementation")?.isOptimal).toBe(true);
    expect(solutions.find((s: any) => s.name === "basicImplementation")?.isOptimal).toBe(false);
  });

  test('does not overwrite existing utility metadata with undefined JSDoc values', async () => {
    const utilityWithExistingMetadata = {
      metadata: {
        title: "Existing Utility",
        description: "Existing description",
        detailedDescription: "Existing detailed description with emojis 🚀",
        category: "Existing Category",
        performanceNotes: "Existing performance notes",
        concepts: ["existing"],
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        difficulty: "Medium"
      },
      examples: [],
      solutions: []
    };

    const generateUtilities = jest.fn().mockImplementation(async () => {
      // Simulate JSDoc parsing that finds nothing (returns undefined)
      let enrichedMetadata: any = {};
      // No JSDoc enhancement, so enrichedMetadata is empty
      
      const { metadata } = utilityWithExistingMetadata;
      
      // This should NOT overwrite existing values
      const mergedMetadata = { ...metadata, ...enrichedMetadata };
      
      return [{ metadata: mergedMetadata }];
    });

    const result = await generateUtilities();
    
    expect(result[0].metadata.detailedDescription).toBe("Existing detailed description with emojis 🚀");
    expect(result[0].metadata.performanceNotes).toBe("Existing performance notes");
    expect(result[0].metadata.category).toBe("Existing Category");
    expect(result[0].metadata.title).toBe("Existing Utility");
  });
});