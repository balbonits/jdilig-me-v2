import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

/**
 * IsValidEmail Utility Implementation
 * 
 * DESCRIPTION:
 * Validates email addresses using different validation strategies from basic regex
 * to comprehensive RFC-compliant validation. Essential for form validation and user input.
 * 
 * ENHANCED METADATA:
 * - Difficulty: Easy to Medium (regex patterns and validation logic)
 * - Solution Type: function (validation utility with regex patterns)
 * - Time Complexity: O(n) where n is email length
 * - Space Complexity: O(1) constant space usage
 * - Concepts: Regular expressions, String validation, RFC standards, Input validation
 * - Category: Data validation utility
 * 
 * EXAMPLE:
 * isValidEmail('user@example.com') → true
 * 
 * CONCEPTS:
 * - Regular expression patterns
 * - String manipulation and validation
 * - RFC 5322 email standards
 * - Input sanitization
 * 
 * PERFORMANCE:
 * - Time: O(n) where n is email string length
 * - Space: O(1) constant space
 * 
 * Multiple implementations included to show different validation approaches.
 */

// Basic email validation (most common use case)
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  if (email.length === 0 || email.length > 320) return false; // RFC limit
  
  // Basic regex pattern that covers most real-world cases
  const basicPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return basicPattern.test(email.trim());
}

// Comprehensive email validation
export function isValidEmailComprehensive(email: string): boolean {
  if (typeof email !== 'string') return false;
  if (email.length === 0 || email.length > 320) return false;
  
  const trimmedEmail = email.trim();
  
  // Check for basic structure
  const atCount = (trimmedEmail.match(/@/g) || []).length;
  if (atCount !== 1) return false;
  
  const [localPart, domainPart] = trimmedEmail.split('@');
  
  // Validate local part (before @)
  if (!localPart || localPart.length === 0 || localPart.length > 64) return false;
  if (localPart.startsWith('.') || localPart.endsWith('.')) return false;
  if (localPart.includes('..')) return false;
  
  // Validate domain part (after @)
  if (!domainPart || domainPart.length === 0 || domainPart.length > 255) return false;
  if (domainPart.startsWith('.') || domainPart.endsWith('.')) return false;
  if (domainPart.startsWith('-') || domainPart.endsWith('-')) return false;
  
  // More comprehensive pattern
  const comprehensivePattern = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
  return comprehensivePattern.test(trimmedEmail);
}

// Strict RFC 5322 compliant validation (simplified)
export function isValidEmailRFC(email: string): boolean {
  if (typeof email !== 'string') return false;
  if (email.length === 0 || email.length > 320) return false;
  
  // Simplified RFC 5322 pattern (actual RFC is extremely complex)
  const rfcPattern = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
  return rfcPattern.test(email.trim());
}

// Simple email validation (very permissive)
export function isValidEmailSimple(email: string): boolean {
  if (typeof email !== 'string') return false;
  if (email.length === 0) return false;
  
  // Very basic pattern for quick validation
  const simplePattern = /^.+@.+\..+$/;
  return simplePattern.test(email.trim());
}

// Email validation with detailed error information
export interface EmailValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateEmailDetailed(email: string): EmailValidationResult {
  const errors: string[] = [];
  
  if (typeof email !== 'string') {
    errors.push('Email must be a string');
    return { isValid: false, errors };
  }
  
  if (email.length === 0) {
    errors.push('Email cannot be empty');
    return { isValid: false, errors };
  }
  
  if (email.length > 320) {
    errors.push('Email is too long (max 320 characters)');
  }
  
  const trimmedEmail = email.trim();
  
  if (trimmedEmail !== email) {
    errors.push('Email contains leading or trailing whitespace');
  }
  
  const atCount = (trimmedEmail.match(/@/g) || []).length;
  if (atCount === 0) {
    errors.push('Email must contain @ symbol');
  } else if (atCount > 1) {
    errors.push('Email contains multiple @ symbols');
  }
  
  if (atCount === 1) {
    const [localPart, domainPart] = trimmedEmail.split('@');
    
    if (!localPart) {
      errors.push('Email missing local part (before @)');
    } else {
      if (localPart.length > 64) {
        errors.push('Local part is too long (max 64 characters)');
      }
      if (localPart.startsWith('.') || localPart.endsWith('.')) {
        errors.push('Local part cannot start or end with a dot');
      }
      if (localPart.includes('..')) {
        errors.push('Local part cannot contain consecutive dots');
      }
    }
    
    if (!domainPart) {
      errors.push('Email missing domain part (after @)');
    } else {
      if (domainPart.length > 255) {
        errors.push('Domain part is too long (max 255 characters)');
      }
      if (!domainPart.includes('.')) {
        errors.push('Domain must contain at least one dot');
      }
      if (domainPart.startsWith('.') || domainPart.endsWith('.')) {
        errors.push('Domain cannot start or end with a dot');
      }
      if (domainPart.startsWith('-') || domainPart.endsWith('-')) {
        errors.push('Domain cannot start or end with a hyphen');
      }
    }
  }
  
  return { isValid: errors.length === 0, errors };
}

// Utility metadata
export const metadata: UtilityMetadata = {
  title: "IsValidEmail Function",
  description: "Comprehensive email validation with multiple validation strategies from basic to RFC-compliant patterns",
  category: "Validation",
  concepts: ["regular expressions", "string validation", "RFC standards", "input validation"],
  timeComplexity: "O(n) where n is email length",
  spaceComplexity: "O(1) constant space",
  difficulty: "Easy"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "isValidEmail",
    tabName: "Basic",
    approach: "Standard email validation for most use cases",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "isValidEmailComprehensive",
    tabName: "Comprehensive",
    approach: "Thorough validation with multiple checks",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "isValidEmailRFC",
    tabName: "RFC",
    approach: "RFC 5322 compliant validation (simplified)",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    isOptimal: false,
    type: "function"
  },
  {
    name: "validateEmailDetailed",
    tabName: "Detailed",
    approach: "Validation with detailed error reporting",
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)",
    isOptimal: false,
    type: "function"
  }
];

// Example use cases
export const examples: UtilityExample[] = [
  {
    input: "'user@example.com'",
    output: "true",
    description: "Basic email validation",
    code: `// Valid emails
isValidEmail('user@example.com');           // true
isValidEmail('test.email@domain.org');      // true
isValidEmail('user+tag@example.co.uk');     // true

// Invalid emails
isValidEmail('');                           // false
isValidEmail('user@');                      // false
isValidEmail('@domain.com');                // false
isValidEmail('user.domain.com');            // false
isValidEmail('user@domain');                // false`
  },
  {
    input: "form input",
    output: "validation result",
    description: "Form validation with email checking",
    code: `interface LoginForm {
  email: string;
  password: string;
}

function validateLoginForm(form: LoginForm): string[] {
  const errors: string[] = [];
  
  if (!isValidEmail(form.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (form.password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }
  
  return errors;
}

const form = { email: 'invalid-email', password: '123' };
const errors = validateLoginForm(form);
// ['Please enter a valid email address', 'Password must be at least 8 characters']`
  },
  {
    input: "'user@invalid'",
    output: "detailed errors",
    description: "Detailed email validation with error reporting",
    code: `const result = validateEmailDetailed('user@invalid');
console.log(result);
// {
//   isValid: false,
//   errors: ['Domain must contain at least one dot']
// }

const result2 = validateEmailDetailed('  user@example.com  ');
console.log(result2);
// {
//   isValid: false,
//   errors: ['Email contains leading or trailing whitespace']
// }

// Use in user interfaces
function displayEmailErrors(email: string) {
  const validation = validateEmailDetailed(email);
  if (!validation.isValid) {
    return validation.errors.join(', ');
  }
  return 'Email is valid';
}`
  },
  {
    input: "email array",
    output: "filtered valid emails",
    description: "Filter valid emails from a list",
    code: `const emailList = [
  'user@example.com',
  'invalid-email',
  'test@domain.org',
  'another@invalid',
  'valid@company.co.uk'
];

// Filter valid emails
const validEmails = emailList.filter(isValidEmail);
console.log(validEmails);
// ['user@example.com', 'test@domain.org', 'valid@company.co.uk']

// Count valid vs invalid
const validCount = emailList.filter(isValidEmail).length;
const invalidCount = emailList.length - validCount;
console.log(\`Valid: \${validCount}, Invalid: \${invalidCount}\`);
// 'Valid: 3, Invalid: 2'

// Group by validity
const grouped = emailList.reduce((acc, email) => {
  const key = isValidEmail(email) ? 'valid' : 'invalid';
  acc[key] = acc[key] || [];
  acc[key].push(email);
  return acc;
}, {} as Record<string, string[]>);`
  }
];

// Default export for easy importing
const utilityModule = {
  isValidEmail,
  isValidEmailComprehensive,
  isValidEmailRFC,
  isValidEmailSimple,
  validateEmailDetailed,
  metadata,
  solutions,
  examples
};

export default utilityModule;