import type { UtilityMetadata, UtilityExample } from '@/interfaces/utilities';
import type { SolutionMetadata } from '@/interfaces/shared';

/**
 * Retry Utility Implementation
 * 
 * DESCRIPTION:
 * Automatically retries failed operations with configurable backoff strategies.
 * Essential for handling network requests, API calls, and unreliable operations.
 * 
 * ENHANCED METADATA:
 * - Difficulty: Medium (async patterns and error handling)
 * - Solution Type: function (async operation wrapper with retry logic)
 * - Time Complexity: O(n) where n is number of retry attempts
 * - Space Complexity: O(1) for operation state
 * - Concepts: Async/await, Error handling, Exponential backoff, Promises
 * - Category: Reliability and error handling utility
 * 
 * EXAMPLE:
 * retry(apiCall, { attempts: 3, delay: 1000 }) → Retries failed API calls
 * 
 * CONCEPTS:
 * - Async/await patterns
 * - Error handling strategies
 * - Exponential backoff algorithms
 * - Promise-based operations
 * - Reliability patterns
 * 
 * PERFORMANCE:
 * - Time: O(n) where n is retry attempts
 * - Space: O(1) for operation state
 * 
 * Multiple implementations included to show different retry strategies.
 */

export interface RetryOptions {
  attempts?: number;
  delay?: number;
  exponentialBackoff?: boolean;
  maxDelay?: number;
  shouldRetry?: (error: Error, attempt: number) => boolean;
  onRetry?: (error: Error, attempt: number) => void;
}

// Basic retry implementation
export async function retry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    attempts = 3,
    delay = 1000,
    exponentialBackoff = false,
    maxDelay = 30000,
    shouldRetry = () => true,
    onRetry
  } = options;

  if (typeof operation !== 'function') throw new Error("Operation must be a function");
  if (!Number.isInteger(attempts) || attempts < 1) throw new Error("Attempts must be a positive integer");
  if (!Number.isInteger(delay) || delay < 0) throw new Error("Delay must be a non-negative integer");

  let lastError: Error;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      if (attempt === attempts || !shouldRetry(lastError, attempt)) {
        throw lastError;
      }

      onRetry?.(lastError, attempt);

      const currentDelay = exponentialBackoff 
        ? Math.min(delay * Math.pow(2, attempt - 1), maxDelay)
        : delay;

      await sleep(currentDelay);
    }
  }

  throw lastError!;
}

// Retry with jitter to prevent thundering herd
export async function retryWithJitter<T>(
  operation: () => Promise<T>,
  options: RetryOptions & { jitter?: boolean } = {}
): Promise<T> {
  const { jitter = true, ...retryOptions } = options;
  
  return retry(operation, {
    ...retryOptions,
    delay: jitter && retryOptions.delay 
      ? retryOptions.delay + Math.random() * 1000 
      : retryOptions.delay
  });
}

// Retry with circuit breaker pattern
export class RetryWithCircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';

  constructor(
    private failureThreshold = 5,
    private recoveryTimeout = 60000
  ) {}

  async execute<T>(
    operation: () => Promise<T>,
    options: RetryOptions = {}
  ): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime < this.recoveryTimeout) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }

    try {
      const result = await retry(operation, {
        ...options,
        shouldRetry: (error, attempt) => {
          if (this.state === 'HALF_OPEN' && attempt === 1) {
            return false; // Fail fast in half-open state
          }
          return options.shouldRetry?.(error, attempt) ?? true;
        }
      });

      // Success resets the circuit breaker
      this.failures = 0;
      this.state = 'CLOSED';
      return result;

    } catch (error) {
      this.failures++;
      this.lastFailureTime = Date.now();

      if (this.failures >= this.failureThreshold) {
        this.state = 'OPEN';
      }

      throw error;
    }
  }
}

// Simple retry for synchronous operations
export function retrySync<T>(
  operation: () => T,
  attempts: number = 3,
  shouldRetry: (error: Error, attempt: number) => boolean = () => true
): T {
  if (typeof operation !== 'function') throw new Error("Operation must be a function");
  if (!Number.isInteger(attempts) || attempts < 1) throw new Error("Attempts must be a positive integer");

  let lastError: Error;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return operation();
    } catch (error) {
      lastError = error as Error;

      if (attempt === attempts || !shouldRetry(lastError, attempt)) {
        throw lastError;
      }
    }
  }

  throw lastError!;
}

// Helper function for delay
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Utility metadata
export const metadata: UtilityMetadata = {
  title: "Retry Function",
  description: "Automatically retries failed operations with configurable backoff strategies, essential for handling unreliable network operations",
  category: "Reliability",
  concepts: ["async/await", "error handling", "exponential backoff", "promises"],
  timeComplexity: "O(n) where n is retry attempts",
  spaceComplexity: "O(1) for operation state",
  difficulty: "Medium"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "retry",
    tabName: "Basic",
    approach: "Configurable retry with exponential backoff support",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "retryWithJitter",
    tabName: "Jitter",
    approach: "Retry with jitter to prevent thundering herd problem",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  },
  {
    name: "RetryWithCircuitBreaker",
    tabName: "Circuit Breaker",
    approach: "Retry with circuit breaker pattern for system protection",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    isOptimal: false,
    type: "class"
  },
  {
    name: "retrySync",
    tabName: "Synchronous",
    approach: "Simple retry for synchronous operations",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    isOptimal: true,
    type: "function"
  }
];

// Example use cases
export const examples: UtilityExample[] = [
  {
    input: "fetch('/api/data')",
    output: "response data",
    description: "Basic API retry with exponential backoff",
    code: `const fetchData = async () => {
  const response = await fetch('/api/data');
  if (!response.ok) throw new Error('Network error');
  return response.json();
};

const data = await retry(fetchData, {
  attempts: 3,
  delay: 1000,
  exponentialBackoff: true,
  maxDelay: 10000
});

// Retries: 1s, 2s, 4s delays on failure`
  },
  {
    input: "unreliableOperation()",
    output: "success result",
    description: "Conditional retry with custom logic",
    code: `const processPayment = async (amount: number) => {
  // Simulate payment processing
  if (Math.random() < 0.7) throw new Error('Payment gateway timeout');
  return { transactionId: Date.now(), amount };
};

const payment = await retry(() => processPayment(100), {
  attempts: 5,
  delay: 2000,
  shouldRetry: (error, attempt) => {
    // Only retry on timeout errors
    return error.message.includes('timeout');
  },
  onRetry: (error, attempt) => {
    console.log(\`Payment attempt \${attempt} failed: \${error.message}\`);
  }
});`
  },
  {
    input: "service.call()",
    output: "protected result",
    description: "Circuit breaker pattern for system protection",
    code: `const circuitBreaker = new RetryWithCircuitBreaker(3, 30000);

const callExternalService = async () => {
  const response = await fetch('/external-api');
  if (!response.ok) throw new Error('Service unavailable');
  return response.json();
};

try {
  const result = await circuitBreaker.execute(callExternalService, {
    attempts: 2,
    delay: 1000
  });
} catch (error) {
  // Circuit breaker may be OPEN after repeated failures
  console.log('Service call failed or circuit breaker is open');
}`
  },
  {
    input: "parseJSON(data)",
    output: "parsed object",
    description: "Synchronous operation retry",
    code: `const parseWithRetry = (jsonString: string) => {
  // Simulate flaky parsing operation
  if (Math.random() < 0.3) throw new Error('Parse error');
  return JSON.parse(jsonString);
};

const result = retrySync(
  () => parseWithRetry('{"key": "value"}'),
  3,
  (error, attempt) => error.message === 'Parse error'
);

// Retries immediately without delays for sync operations`
  }
];

// Default export for easy importing
const utilityModule = {
  retry,
  retryWithJitter,
  RetryWithCircuitBreaker,
  retrySync,
  metadata,
  solutions,
  examples
};

export default utilityModule;