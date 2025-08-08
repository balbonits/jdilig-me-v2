// Test file to validate our advanced TypeScript types
import {
  ExerciseCategory,
  ComplexityRating,
  CodePosition,
  TestResult,
  BenchmarkData,
  TimestampedData,
  AuditableMetadata,
  HttpMethod,
  APIVersion,
  StatusCode,
  ExerciseSlug,
  APIEndpoint,
  EventName,
  ReadonlyMetadata,
  OptionalFields,
  NonNullable,
  ArrayElement,
  ReturnType,
  APIResponse,
  ExerciseResult,
  NestedArray,
  TreeNode,
  ExerciseId,
  UserId,
  Score,
  BaseMetadata,
  ExerciseInput
} from './interfaces/shared';

console.log('🧪 Testing TypeScript Advanced Types...\n');

// =============================================================================
// 1. TESTING ENUMS
// =============================================================================
console.log('1. Testing Enums:');

const category: ExerciseCategory = ExerciseCategory.ALGORITHMS;
const complexity: ComplexityRating = ComplexityRating.MEDIUM;

console.log(`   Category: ${category}`); // algorithms
console.log(`   Complexity: ${complexity}`); // 2
console.log(`   All categories:`, Object.values(ExerciseCategory));

// =============================================================================
// 2. TESTING TUPLES
// =============================================================================
console.log('\n2. Testing Tuples:');

const position: CodePosition = [42, 15]; // line 42, column 15
const testResult: TestResult = [true, 'Test passed', 125.5]; // passed, message, time
const benchmark: BenchmarkData = ['QuickSort', 45.2, 2.1]; // name, time, memory

console.log(`   Position: [${position[0]}, ${position[1]}]`);
console.log(`   Test: ${testResult[0] ? 'PASS' : 'FAIL'} - ${testResult[1]} (${testResult[2]}ms)`);
console.log(`   Benchmark: ${benchmark[0]} took ${benchmark[1]}ms using ${benchmark[2]}MB`);

// =============================================================================
// 3. TESTING INTERSECTION TYPES
// =============================================================================
console.log('\n3. Testing Intersection Types:');

const timestampedData: TimestampedData = {
  input: [1, 2, 3], // ExerciseInput
  timestamp: Date.now() // Additional property
};

const auditableMetadata: AuditableMetadata = {
  title: 'Test Exercise',
  description: 'A test exercise',
  concepts: ['testing'],
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  difficulty: 'Easy',
  createdAt: new Date(),
  updatedAt: new Date(),
  version: '1.0.0'
};

console.log(`   Timestamped data has ${(timestampedData.input as number[]).length} items at ${timestampedData.timestamp}`);
console.log(`   Auditable metadata: ${auditableMetadata.title} v${auditableMetadata.version}`);

// =============================================================================
// 4. TESTING LITERAL TYPES
// =============================================================================
console.log('\n4. Testing Literal Types:');

const method: HttpMethod = 'GET';
const version: APIVersion = 'v2';
const status: StatusCode = 200;

console.log(`   HTTP: ${method} request to API ${version} returned ${status}`);

// =============================================================================
// 5. TESTING TEMPLATE LITERAL TYPES
// =============================================================================
console.log('\n5. Testing Template Literal Types:');

type QuickSortSlug = ExerciseSlug<'quicksort'>; // "exercise-quicksort"
type ExercisesEndpoint = APIEndpoint<'exercises'>; // "/api/v1/exercises" | "/api/v2/exercises" | "/api/v3/exercises"
type ClickEvent = EventName<'click'>; // "onClick"

const slug: QuickSortSlug = 'exercise-quicksort';
const endpoint: ExercisesEndpoint = '/api/v2/exercises';
const eventName: ClickEvent = 'onClick';

console.log(`   Exercise slug: ${slug}`);
console.log(`   API endpoint: ${endpoint}`);
console.log(`   Event name: ${eventName}`);

// =============================================================================
// 6. TESTING MAPPED TYPES
// =============================================================================
console.log('\n6. Testing Mapped Types:');

const readonlyMeta: ReadonlyMetadata = {
  title: 'Readonly Test',
  description: 'Cannot be modified',
  concepts: ['immutability'],
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  difficulty: 'Easy'
};

// This would cause a TypeScript error (uncomment to test):
// readonlyMeta.title = 'Modified'; // ❌ Error: Cannot assign to 'title' because it is a read-only property

type OptionalTitle = OptionalFields<BaseMetadata, 'title'>;
const optionalTitleMeta: OptionalTitle = {
  // title is now optional
  description: 'Description is still required',
  concepts: ['optional'],
  timeComplexity: 'O(1)',
  spaceComplexity: 'O(1)',
  difficulty: 'Easy'
};

console.log(`   Readonly metadata: ${readonlyMeta.title}`);
console.log(`   Optional title metadata: ${optionalTitleMeta.description}`);

// =============================================================================
// 7. TESTING CONDITIONAL TYPES
// =============================================================================
console.log('\n7. Testing Conditional Types:');

type StringArray = string[];
type ElementType = ArrayElement<StringArray>; // string

const numbers = [1, 2, 3, 4, 5];
type NumberFromArray = ArrayElement<typeof numbers>; // number

function testFunction(): boolean { return true; }
type FunctionReturn = ReturnType<typeof testFunction>; // boolean

console.log(`   Array element type extracted correctly`);
console.log(`   Function return type extracted correctly`);

// =============================================================================
// 8. TESTING DISCRIMINATED UNIONS
// =============================================================================
console.log('\n8. Testing Discriminated Unions:');

const successResponse: APIResponse<string[]> = {
  success: true,
  data: ['item1', 'item2', 'item3']
};

const errorResponse: APIResponse = {
  success: false,
  error: 'Something went wrong'
};

const exerciseSuccess: ExerciseResult = {
  type: 'success',
  output: [1, 2, 3],
  executionTime: 45.2
};

const exerciseError: ExerciseResult = {
  type: 'error',
  message: 'Runtime error occurred',
  line: 15
};

function handleResponse(response: APIResponse) {
  if (response.success) {
    console.log(`   ✅ Success: Got ${Array.isArray(response.data) ? response.data.length : 1} items`);
  } else {
    console.log(`   ❌ Error: ${response.error}`);
  }
}

function handleExerciseResult(result: ExerciseResult) {
  switch (result.type) {
    case 'success':
      console.log(`   ✅ Exercise completed in ${result.executionTime}ms`);
      break;
    case 'error':
      console.log(`   ❌ Exercise failed: ${result.message}${result.line ? ` (line ${result.line})` : ''}`);
      break;
    case 'timeout':
      console.log(`   ⏱️ Exercise timed out after ${result.duration}ms`);
      break;
  }
}

handleResponse(successResponse);
handleResponse(errorResponse);
handleExerciseResult(exerciseSuccess);
handleExerciseResult(exerciseError);

// =============================================================================
// 9. TESTING RECURSIVE TYPES
// =============================================================================
console.log('\n9. Testing Recursive Types:');

const nestedNumbers: NestedArray<number> = [1, [2, 3], [[4, 5], 6]];
const tree: TreeNode<string> = {
  value: 'root',
  children: [
    { value: 'child1' },
    { 
      value: 'child2', 
      children: [
        { value: 'grandchild1' },
        { value: 'grandchild2' }
      ]
    }
  ]
};

console.log(`   Nested array: ${JSON.stringify(nestedNumbers)}`);
console.log(`   Tree root: ${tree.value} with ${tree.children?.length || 0} children`);

// =============================================================================
// 10. TESTING BRANDED TYPES
// =============================================================================
console.log('\n10. Testing Branded Types:');

const exerciseId = 'ex_12345' as ExerciseId;
const userId = 'user_67890' as UserId;
const score = 85 as Score;

console.log(`   Exercise ID: ${exerciseId}`);
console.log(`   User ID: ${userId}`);
console.log(`   Score: ${score}%`);

// This would cause a TypeScript error (uncomment to test):
// const invalidAssignment: ExerciseId = userId; // ❌ Error: Type 'UserId' is not assignable to type 'ExerciseId'

console.log('\n🎉 All TypeScript advanced types are working correctly!');

export {}; // Make this a module
