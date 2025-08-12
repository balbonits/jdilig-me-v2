import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

export function slugify(text: string, separator: string = '-'): string {
  if (typeof text !== 'string') return '';
  
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, separator) // Replace spaces and underscores with separator
    .replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), ''); // Remove leading/trailing separators
}

export function slugifyAdvanced(text: string, options: {
  separator?: string;
  lowercase?: boolean;
  strict?: boolean;
  maxLength?: number;
} = {}): string {
  const { separator = '-', lowercase = true, strict = false, maxLength } = options;
  
  if (typeof text !== 'string') return '';
  
  let result = text.trim();
  
  if (lowercase) {
    result = result.toLowerCase();
  }
  
  if (strict) {
    result = result.replace(/[^a-zA-Z0-9\s-_]/g, '');
  } else {
    result = result.replace(/[^\w\s-]/g, '');
  }
  
  result = result.replace(/[\s_-]+/g, separator);
  result = result.replace(new RegExp(`^${separator}+|${separator}+$`, 'g'), '');
  
  if (maxLength && result.length > maxLength) {
    result = result.substring(0, maxLength);
    result = result.replace(new RegExp(`${separator}+$`), '');
  }
  
  return result;
}

export const metadata: UtilityMetadata = {
  title: "Slugify Function",
  description: "Converts strings to URL-friendly slugs by removing special characters and replacing spaces",
  category: "String Manipulation",
  concepts: ["string manipulation", "regular expressions", "URL formatting", "text processing"],
  timeComplexity: "O(n) where n is string length",
  spaceComplexity: "O(n) for result string",
  difficulty: "Easy"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "slugify",
    tabName: "Basic",
    approach: "Simple slug generation with character replacement",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "slugifyAdvanced",
    tabName: "Advanced",
    approach: "Configurable slug generation with options",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    isOptimal: true,
    type: "function"
  }
];

export const examples: UtilityExample[] = [
  {
    input: "'Hello World!'",
    output: "'hello-world'",
    description: "Basic slug generation",
    code: `slugify('Hello World!'); // 'hello-world'
slugify('My Blog Post Title'); // 'my-blog-post-title'`
  }
];

const utilityModule = { slugify, slugifyAdvanced, metadata, solutions, examples };
export default utilityModule;