import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

/**
 * IsValidURL Utility Implementation
 * 
 * DESCRIPTION:
 * Validates URLs using different validation strategies from basic regex to native URL API.
 * Supports various protocols and validation levels for different use cases.
 * 
 * ENHANCED METADATA:
 * - Difficulty: Easy to Medium (URL parsing and validation logic)
 * - Solution Type: function (validation utility with URL API)
 * - Time Complexity: O(n) where n is URL length
 * - Space Complexity: O(1) constant space usage
 * - Concepts: URL parsing, Regular expressions, Web standards, Input validation
 * - Category: Data validation utility
 * 
 * EXAMPLE:
 * isValidURL('https://example.com') → true
 * 
 * CONCEPTS:
 * - URL parsing and validation
 * - Web standards (RFC 3986)
 * - Protocol validation
 * - Input sanitization
 * 
 * PERFORMANCE:
 * - Time: O(n) where n is URL string length
 * - Space: O(1) constant space
 * 
 * Multiple implementations included to show different validation approaches.
 */

// Basic URL validation using native URL constructor
export function isValidURL(url: string): boolean {
  if (typeof url !== 'string') return false;
  if (url.length === 0 || url.length > 2083) return false; // IE limit
  
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:', 'ftp:', 'ftps:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

// Strict HTTPS-only URL validation
export function isValidHTTPSURL(url: string): boolean {
  if (typeof url !== 'string') return false;
  if (url.length === 0) return false;
  
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' && urlObj.hostname.length > 0;
  } catch {
    return false;
  }
}

// URL validation with specific protocol support
export function isValidURLWithProtocols(url: string, allowedProtocols: string[] = ['http:', 'https:']): boolean {
  if (typeof url !== 'string') return false;
  if (url.length === 0) return false;
  
  try {
    const urlObj = new URL(url);
    return allowedProtocols.includes(urlObj.protocol);
  } catch {
    return false;
  }
}

// Regex-based URL validation (for environments without URL constructor)
export function isValidURLRegex(url: string): boolean {
  if (typeof url !== 'string') return false;
  if (url.length === 0 || url.length > 2083) return false;
  
  // Comprehensive URL regex pattern
  const urlPattern = /^(https?|ftp):\/\/(?:[-\w.])+(?:\:[0-9]+)?(?:\/(?:[\w\/_.])*)?(?:\?(?:[\w&=%.])*)?(?:\#(?:[\w.])*)?$/i;
  return urlPattern.test(url);
}

// URL validation with detailed information
export interface URLValidationResult {
  isValid: boolean;
  protocol?: string;
  hostname?: string;
  port?: string;
  pathname?: string;
  search?: string;
  hash?: string;
  errors: string[];
}

export function validateURLDetailed(url: string): URLValidationResult {
  const errors: string[] = [];
  
  if (typeof url !== 'string') {
    errors.push('URL must be a string');
    return { isValid: false, errors };
  }
  
  if (url.length === 0) {
    errors.push('URL cannot be empty');
    return { isValid: false, errors };
  }
  
  if (url.length > 2083) {
    errors.push('URL is too long (max 2083 characters)');
  }
  
  try {
    const urlObj = new URL(url);
    
    const result: URLValidationResult = {
      isValid: true,
      protocol: urlObj.protocol,
      hostname: urlObj.hostname,
      port: urlObj.port,
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash,
      errors: []
    };
    
    // Validate protocol
    const allowedProtocols = ['http:', 'https:', 'ftp:', 'ftps:'];
    if (!allowedProtocols.includes(urlObj.protocol)) {
      errors.push(`Protocol '${urlObj.protocol}' is not allowed`);
    }
    
    // Validate hostname
    if (!urlObj.hostname) {
      errors.push('URL must have a hostname');
    } else if (urlObj.hostname.length > 253) {
      errors.push('Hostname is too long (max 253 characters)');
    }
    
    // Validate port
    if (urlObj.port) {
      const portNum = parseInt(urlObj.port, 10);
      if (portNum < 1 || portNum > 65535) {
        errors.push('Port must be between 1 and 65535');
      }
    }
    
    result.isValid = errors.length === 0;
    result.errors = errors;
    return result;
    
  } catch (error) {
    errors.push(`Invalid URL format: ${(error as Error).message}`);
    return { isValid: false, errors };
  }
}

// Simple URL validation for web URLs only
export function isValidWebURL(url: string): boolean {
  if (typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol) && 
           urlObj.hostname.includes('.') &&
           urlObj.hostname.length > 0;
  } catch {
    return false;
  }
}

// URL validation that accepts relative URLs when base is provided
export function isValidURLOrRelative(url: string, base?: string): boolean {
  if (typeof url !== 'string') return false;
  if (url.length === 0) return false;
  
  try {
    // Try as absolute URL first
    const urlObj = new URL(url);
    return ['http:', 'https:', 'ftp:', 'ftps:'].includes(urlObj.protocol);
  } catch {
    // Try as relative URL with base
    if (base) {
      try {
        new URL(url, base);
        return true;
      } catch {
        return false;
      }
    }
    return false;
  }
}

// Check if URL is localhost/development URL
export function isLocalURL(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    return hostname === 'localhost' || 
           hostname === '127.0.0.1' || 
           hostname === '::1' ||
           hostname.endsWith('.local') ||
           hostname.startsWith('192.168.') ||
           hostname.startsWith('10.') ||
           (hostname.startsWith('172.') && 
            parseInt(hostname.split('.')[1], 10) >= 16 && 
            parseInt(hostname.split('.')[1], 10) <= 31);
  } catch {
    return false;
  }
}

// Utility metadata
export const metadata: UtilityMetadata = {
  title: "IsValidURL Function",
  description: "Comprehensive URL validation with multiple strategies including native URL API and regex patterns",
  category: "Validation",
  concepts: ["URL parsing", "regular expressions", "web standards", "input validation"],
  timeComplexity: "O(n) where n is URL length",
  spaceComplexity: "O(1) constant space",
  difficulty: "Easy"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "isValidURL",
    tabName: "Basic",
    approach: "Native URL constructor with protocol validation",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "isValidHTTPSURL",
    tabName: "HTTPS",
    approach: "Strict HTTPS-only URL validation",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "isValidURLRegex",
    tabName: "Regex",
    approach: "Regex-based validation for legacy environments",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    isOptimal: false,
    type: "function"
  },
  {
    name: "validateURLDetailed",
    tabName: "Detailed",
    approach: "Comprehensive validation with detailed error reporting",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    isOptimal: false,
    type: "function"
  }
];

// Example use cases
export const examples: UtilityExample[] = [
  {
    input: "'https://example.com'",
    output: "true",
    description: "Basic URL validation",
    code: `// Valid URLs
isValidURL('https://example.com');              // true
isValidURL('http://subdomain.example.org');     // true
isValidURL('ftp://files.example.com');          // true
isValidURL('https://example.com/path?q=test');  // true

// Invalid URLs
isValidURL('');                                 // false
isValidURL('not-a-url');                        // false
isValidURL('javascript:alert(1)');              // false
isValidURL('file:///etc/passwd');               // false`
  },
  {
    input: "form validation",
    output: "validation result",
    description: "Form URL validation with HTTPS requirement",
    code: `interface WebsiteForm {
  name: string;
  website: string;
}

function validateWebsiteForm(form: WebsiteForm): string[] {
  const errors: string[] = [];
  
  if (!form.name.trim()) {
    errors.push('Name is required');
  }
  
  if (!form.website.trim()) {
    errors.push('Website URL is required');
  } else if (!isValidHTTPSURL(form.website)) {
    errors.push('Website must be a valid HTTPS URL');
  }
  
  return errors;
}

const form = { name: 'Company', website: 'http://insecure.com' };
const errors = validateWebsiteForm(form);
// ['Website must be a valid HTTPS URL']`
  },
  {
    input: "'invalid-url'",
    output: "detailed validation",
    description: "Detailed URL validation with error reporting",
    code: `const result = validateURLDetailed('invalid-url');
console.log(result);
// {
//   isValid: false,
//   errors: ['Invalid URL format: Invalid URL']
// }

const result2 = validateURLDetailed('javascript://evil.com');
console.log(result2);
// {
//   isValid: false,
//   protocol: 'javascript:',
//   hostname: 'evil.com',
//   errors: ["Protocol 'javascript:' is not allowed"]
// }

// Use for detailed feedback
function getURLFeedback(url: string): string {
  const validation = validateURLDetailed(url);
  if (validation.isValid) {
    return \`Valid \${validation.protocol} URL\`;
  }
  return validation.errors.join('; ');
}`
  },
  {
    input: "development URLs",
    output: "environment detection",
    description: "Development vs production URL handling",
    code: `const urls = [
  'https://production.com',
  'http://localhost:3000',
  'https://127.0.0.1:8080',
  'http://192.168.1.100',
  'https://staging.local'
];

// Separate development from production URLs
const productionUrls = urls.filter(url => 
  isValidURL(url) && !isLocalURL(url)
);
const developmentUrls = urls.filter(url => 
  isValidURL(url) && isLocalURL(url)
);

console.log('Production:', productionUrls);
// ['https://production.com']

console.log('Development:', developmentUrls);
// ['http://localhost:3000', 'https://127.0.0.1:8080', 'http://192.168.1.100', 'https://staging.local']

// Conditional validation based on environment
function validateURLForEnvironment(url: string, isDevelopment: boolean): boolean {
  if (!isValidURL(url)) return false;
  
  if (isDevelopment) {
    return true; // Allow any valid URL in development
  }
  
  return isValidHTTPSURL(url) && !isLocalURL(url);
}`
  }
];

// Default export for easy importing
const utilityModule = {
  isValidURL,
  isValidHTTPSURL,
  isValidURLWithProtocols,
  isValidURLRegex,
  validateURLDetailed,
  isValidWebURL,
  isValidURLOrRelative,
  isLocalURL,
  metadata,
  solutions,
  examples
};

export default utilityModule;