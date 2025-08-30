#!/usr/bin/env ts-node

/**
 * Pattern Data Generator
 * 
 * Generates comprehensive JSON data for all design patterns by processing
 * TypeScript pattern modules and extracting metadata, solutions, examples, and use cases.
 */

import * as fs from 'fs';
import * as path from 'path';
import { PatternData } from '../src/interfaces/patterns';

// Pattern slug mappings
const PATTERN_MAPPINGS: Record<string, string> = {
  'abstract-factory': 'AbstractFactory',
  'adapter': 'Adapter', 
  'async-iterator': 'AsyncIterator',
  'bridge': 'Bridge',
  'builder': 'Builder',
  'chain-of-responsibility': 'ChainOfResponsibility',
  'command': 'Command',
  'composite': 'Composite',
  'decorator': 'Decorator',
  'facade': 'Facade',
  'factory': 'Factory',
  'flyweight': 'Flyweight',
  'iterator': 'Iterator',
  'mediator': 'Mediator',
  'memento': 'Memento',
  'mixin': 'Mixin',
  'module': 'Module',
  'observer': 'Observer',
  'prototype': 'Prototype',
  'proxy': 'Proxy',
  'proxy-observables': 'ProxyObservables',
  'revealing-module': 'RevealingModule',
  'singleton': 'Singleton',
  'state': 'State',
  'strategy': 'Strategy',
  'template-method': 'TemplateMethod',
  'visitor': 'Visitor'
};

/**
 * Converts PascalCase pattern name to kebab-case slug
 */
function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Shortens tab names if they're too long for UI containers
 */
function shortenTabName(tabName: string, maxLength: number = 14): string {
  if (tabName.length <= maxLength) return tabName;
  
  // Common abbreviations - more aggressive
  const abbreviations: Record<string, string> = {
    'Application': 'App',
    'Management': 'Mgmt',
    'Integration': 'Int',
    'Interface': 'IFace',
    'Implementation': 'Impl',
    'System': 'Sys',
    'Processing': 'Proc',
    'Authentication': 'Auth',
    'Authorization': 'Auth',
    'Configuration': 'Config',
    'Template': 'Tmpl',
    'Iterator': 'Iter',
    'Factory': 'Factory',
    'Pattern': '',
    'Method': '',
    'Function': 'Func',
    'Database': 'DB',
    'Abstraction': 'Abstr',
    'Complete': '',
    'Advanced': 'Adv',
    'Document': 'Doc',
    'Component': 'Comp',
    'Components': 'Comps',
    'Generator': 'Gen',
    'Manager': 'Mgr',
    'Controller': 'Ctrl',
    'Rendering': 'Render',
    'Delivery': 'Del',
    'Middleware': 'MW',
    'Commands': 'Cmds',
    'Operations': 'Ops',
    'Properties': 'Props',
    'Strategy': 'Strat',
    'Character': 'Char',
    'Coordination': 'Coord',
    'Paginated': 'Paged',
    'Request': 'Req',
    'Response': 'Res',
    'Queue': 'Q',
    'Stream': 'Strm',
    'Message': 'Msg',
    'WebSocket': 'WS',
    'Graphics': 'GFX',
    'Editor': 'Edit',
    'State': 'State',
    'Multi': 'Multi',
    'Product': 'Prod',
    'Tracking': 'Track',
    'Validation': 'Valid',
    'Snapshot': 'Snap',
    'Settings': 'Set',
    'Private': 'Priv',
    'Shopping': 'Shop',
    'Cart': 'Cart',
    'Logging': 'Log'
  };
  
  let shortened = tabName;
  
  // Apply abbreviations
  for (const [full, abbrev] of Object.entries(abbreviations)) {
    shortened = shortened.replace(new RegExp(`\\b${full}\\b`, 'g'), abbrev);
  }
  
  // Remove extra spaces and clean up
  shortened = shortened.replace(/\s+/g, ' ').trim();
  
  // If still too long, be more aggressive
  if (shortened.length > maxLength) {
    const words = shortened.split(' ');
    
    if (words.length === 1) {
      // Single long word, just truncate
      shortened = shortened.substring(0, maxLength - 1) + '…';
    } else if (words.length === 2) {
      // Two words, try to keep both but truncate first if needed
      if (words[1].length <= 6) {
        // Keep second word intact if short
        shortened = words[0].substring(0, maxLength - words[1].length - 2) + '… ' + words[1];
      } else {
        // Both words are long, truncate
        shortened = words[0].substring(0, 6) + ' ' + words[1];
        if (shortened.length > maxLength) {
          shortened = shortened.substring(0, maxLength - 1) + '…';
        }
      }
    } else {
      // Multiple words, keep most important
      // Prioritize: first word + last word, or keep pattern-specific words
      const importantWords = ['Factory', 'Iter', 'Bridge', 'Proxy', 'State', 'Strat', 'Tmpl'];
      const hasImportant = words.find(w => importantWords.includes(w));
      
      if (hasImportant) {
        shortened = words[0] + ' ' + hasImportant;
      } else {
        shortened = words[0] + ' ' + words[words.length - 1];
      }
      
      if (shortened.length > maxLength) {
        shortened = shortened.substring(0, maxLength - 1) + '…';
      }
    }
  }
  
  return shortened;
}

/**
 * Load and process a single pattern module
 */
async function processPattern(slug: string, moduleName: string): Promise<PatternData | null> {
  try {
    console.log(`Processing ${moduleName}...`);
    
    // Dynamic import of the pattern module
    const module = await import(`../src/patterns/${moduleName}.ts`);
    
    // Extract exports
    const { metadata, solutions, examples } = module;
    
    if (!metadata || !solutions) {
      console.warn(`⚠️  ${moduleName} missing required exports (metadata, solutions)`);
      return null;
    }

    // Process solutions and shorten tab names
    const processedSolutions = (solutions || []).map((solution: any) => ({
      ...solution,
      tabName: shortenTabName(solution.tabName || solution.name)
    }));

    // Create pattern data
    const patternData: PatternData = {
      name: moduleName,
      slug,
      metadata: {
        ...metadata,
        title: metadata.title || moduleName.replace(/([a-z])([A-Z])/g, '$1 $2')
      },
      solutions: processedSolutions,
      examples: examples || [],
      code: processedSolutions?.[0]?.code || '// See pattern module for full code',
      functions: processedSolutions?.map((s: any) => s.name) || []
    };

    console.log(`✓ Processed ${moduleName}`);
    return patternData;
    
  } catch (error) {
    console.error(`❌ Error processing ${moduleName}:`, error);
    return null;
  }
}

/**
 * Main pattern generation function
 */
async function generatePatterns() {
  console.log('🚀 Generating patterns JSON...');
  console.log('');
  
  const patterns: PatternData[] = [];
  
  // Process all patterns
  for (const [slug, moduleName] of Object.entries(PATTERN_MAPPINGS)) {
    const patternData = await processPattern(slug, moduleName);
    if (patternData) {
      patterns.push(patternData);
    }
  }

  // Generate main patterns.json
  const outputPath = path.join(process.cwd(), 'public', 'patterns.json');
  const jsonContent = JSON.stringify(patterns, null, 2);
  
  fs.writeFileSync(outputPath, jsonContent, 'utf-8');
  
  const fileStats = fs.statSync(outputPath);
  const fileSize = `${(fileStats.size / 1024).toFixed(1)} KB`;
  console.log('');
  console.log(`✅ Generated patterns.json with ${patterns.length} patterns`);
  console.log(`📄 Output: ${outputPath} (${fileSize})`);
  
  // Generate pattern index (lightweight version)
  const patternsIndex = patterns.map(pattern => ({
    slug: pattern.slug,
    title: pattern.metadata.title,
    description: pattern.metadata.description,
    category: pattern.metadata.category,
    difficulty: pattern.metadata.difficulty,
    solutionCount: pattern.solutions.length
  }));
  
  const indexPath = path.join(process.cwd(), 'public', 'patterns-index.json');
  fs.writeFileSync(indexPath, JSON.stringify(patternsIndex, null, 2), 'utf-8');
  
  const indexStats = fs.statSync(indexPath);
  const indexSize = `${(indexStats.size / 1024).toFixed(1)} KB`;
  console.log(`📄 Generated ${indexPath} (${indexSize})`);
  
  // Summary
  const categories = [...new Set(patterns.map(p => p.metadata.category))];
  console.log(`📌 Categories: ${categories.join(', ')}`);
  console.log(`🔧 Total solutions: ${patterns.reduce((sum, p) => sum + p.solutions.length, 0)}`);
}

// Execute if called directly
if (require.main === module) {
  generatePatterns().catch(error => {
    console.error('Failed to generate patterns:', error);
    process.exit(1);
  });
}

export { generatePatterns };