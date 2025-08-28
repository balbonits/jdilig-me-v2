import { PatternMetadata, PatternExample, PatternUseCase } from '../interfaces/patterns';
import { SolutionMetadata } from '../interfaces/shared';

// Iterator interface
interface Iterator<T> {
  hasNext(): boolean;
  next(): T | null;
  reset(): void;
}

// Iterable interface
interface Iterable<T> {
  createIterator(): Iterator<T>;
}

// Book collection example
class Book {
  constructor(
    public title: string,
    public author: string,
    public year: number,
    public genre: string
  ) {}

  toString(): string {
    return `"${this.title}" by ${this.author} (${this.year})`;
  }
}

class BookCollection implements Iterable<Book> {
  private books: Book[] = [];

  addBook(book: Book): void {
    this.books.push(book);
  }

  removeBook(title: string): boolean {
    const index = this.books.findIndex(book => book.title === title);
    if (index !== -1) {
      this.books.splice(index, 1);
      return true;
    }
    return false;
  }

  getBookCount(): number {
    return this.books.length;
  }

  createIterator(): Iterator<Book> {
    return new BookIterator(this.books);
  }

  createGenreIterator(genre: string): Iterator<Book> {
    return new GenreFilterIterator(this.books, genre);
  }

  createYearIterator(year: number): Iterator<Book> {
    return new YearFilterIterator(this.books, year);
  }

  createReverseIterator(): Iterator<Book> {
    return new ReverseBookIterator(this.books);
  }

  // For demonstration - direct access (not recommended)
  getBooks(): Book[] {
    return [...this.books];
  }
}

// Concrete Iterator
class BookIterator implements Iterator<Book> {
  private index = 0;

  constructor(private books: Book[]) {}

  hasNext(): boolean {
    return this.index < this.books.length;
  }

  next(): Book | null {
    if (this.hasNext()) {
      return this.books[this.index++];
    }
    return null;
  }

  reset(): void {
    this.index = 0;
  }
}

// Filtered Iterator
class GenreFilterIterator implements Iterator<Book> {
  private filteredBooks: Book[];
  private index = 0;

  constructor(books: Book[], private genre: string) {
    this.filteredBooks = books.filter(book => 
      book.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  hasNext(): boolean {
    return this.index < this.filteredBooks.length;
  }

  next(): Book | null {
    if (this.hasNext()) {
      return this.filteredBooks[this.index++];
    }
    return null;
  }

  reset(): void {
    this.index = 0;
  }
}

class YearFilterIterator implements Iterator<Book> {
  private filteredBooks: Book[];
  private index = 0;

  constructor(books: Book[], private year: number) {
    this.filteredBooks = books.filter(book => book.year === year);
  }

  hasNext(): boolean {
    return this.index < this.filteredBooks.length;
  }

  next(): Book | null {
    if (this.hasNext()) {
      return this.filteredBooks[this.index++];
    }
    return null;
  }

  reset(): void {
    this.index = 0;
  }
}

class ReverseBookIterator implements Iterator<Book> {
  private index: number;

  constructor(private books: Book[]) {
    this.index = books.length - 1;
  }

  hasNext(): boolean {
    return this.index >= 0;
  }

  next(): Book | null {
    if (this.hasNext()) {
      return this.books[this.index--];
    }
    return null;
  }

  reset(): void {
    this.index = this.books.length - 1;
  }
}

// Tree traversal example
class TreeNode<T> {
  public children: TreeNode<T>[] = [];

  constructor(public value: T) {}

  addChild(node: TreeNode<T>): void {
    this.children.push(node);
  }

  createPreOrderIterator(): Iterator<T> {
    return new PreOrderIterator<T>(this);
  }

  createPostOrderIterator(): Iterator<T> {
    return new PostOrderIterator<T>(this);
  }

  createLevelOrderIterator(): Iterator<T> {
    return new LevelOrderIterator<T>(this);
  }
}

class PreOrderIterator<T> implements Iterator<T> {
  private stack: TreeNode<T>[];

  constructor(root: TreeNode<T>) {
    this.stack = [root];
  }

  hasNext(): boolean {
    return this.stack.length > 0;
  }

  next(): T | null {
    if (!this.hasNext()) {
      return null;
    }

    const node = this.stack.pop()!;
    
    // Add children in reverse order so leftmost child is processed first
    for (let i = node.children.length - 1; i >= 0; i--) {
      this.stack.push(node.children[i]);
    }

    return node.value;
  }

  reset(): void {
    // Cannot reset without access to original root
    throw new Error('Reset not supported for tree iterator');
  }
}

class PostOrderIterator<T> implements Iterator<T> {
  private stack: { node: TreeNode<T>; visited: boolean }[] = [];
  private current = 0;

  constructor(root: TreeNode<T>) {
    this.buildPostOrderStack(root);
  }

  private buildPostOrderStack(node: TreeNode<T>): void {
    const stack: TreeNode<T>[] = [];
    const visited = new Set<TreeNode<T>>();
    const result: TreeNode<T>[] = [];

    stack.push(node);

    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      
      if (visited.has(current)) {
        result.push(stack.pop()!);
      } else {
        visited.add(current);
        for (let i = current.children.length - 1; i >= 0; i--) {
          stack.push(current.children[i]);
        }
      }
    }

    this.stack = result.map(node => ({ node, visited: false }));
  }

  hasNext(): boolean {
    return this.current < this.stack.length;
  }

  next(): T | null {
    if (this.hasNext()) {
      return this.stack[this.current++].node.value;
    }
    return null;
  }

  reset(): void {
    this.current = 0;
  }
}

class LevelOrderIterator<T> implements Iterator<T> {
  private queue: TreeNode<T>[];

  constructor(root: TreeNode<T>) {
    this.queue = [root];
  }

  hasNext(): boolean {
    return this.queue.length > 0;
  }

  next(): T | null {
    if (!this.hasNext()) {
      return null;
    }

    const node = this.queue.shift()!;
    
    // Add all children to queue
    for (const child of node.children) {
      this.queue.push(child);
    }

    return node.value;
  }

  reset(): void {
    throw new Error('Reset not supported for level order iterator');
  }
}

// Range iterator example
class NumberRange implements Iterable<number> {
  constructor(
    private start: number,
    private end: number,
    private step: number = 1
  ) {}

  createIterator(): Iterator<number> {
    return new RangeIterator(this.start, this.end, this.step);
  }

  createReverseIterator(): Iterator<number> {
    return new ReverseRangeIterator(this.start, this.end, this.step);
  }

  createEvenIterator(): Iterator<number> {
    return new EvenRangeIterator(this.start, this.end, this.step);
  }
}

class RangeIterator implements Iterator<number> {
  private current: number;

  constructor(
    private start: number,
    private end: number,
    private step: number
  ) {
    this.current = start;
  }

  hasNext(): boolean {
    return this.step > 0 ? this.current <= this.end : this.current >= this.end;
  }

  next(): number | null {
    if (this.hasNext()) {
      const value = this.current;
      this.current += this.step;
      return value;
    }
    return null;
  }

  reset(): void {
    this.current = this.start;
  }
}

class ReverseRangeIterator implements Iterator<number> {
  private current: number;

  constructor(
    private start: number,
    private end: number,
    private step: number
  ) {
    this.current = end;
  }

  hasNext(): boolean {
    return this.current >= this.start;
  }

  next(): number | null {
    if (this.hasNext()) {
      const value = this.current;
      this.current -= Math.abs(this.step);
      return value;
    }
    return null;
  }

  reset(): void {
    this.current = this.end;
  }
}

class EvenRangeIterator implements Iterator<number> {
  private current: number;

  constructor(
    private start: number,
    private end: number,
    private step: number
  ) {
    this.current = start % 2 === 0 ? start : start + 1;
  }

  hasNext(): boolean {
    return this.current <= this.end;
  }

  next(): number | null {
    if (this.hasNext()) {
      const value = this.current;
      this.current += 2;
      return value;
    }
    return null;
  }

  reset(): void {
    this.current = this.start % 2 === 0 ? this.start : this.start + 1;
  }
}

// Utility functions
export function forEach<T>(iterator: Iterator<T>, callback: (item: T) => void): void {
  while (iterator.hasNext()) {
    const item = iterator.next();
    if (item !== null) {
      callback(item);
    }
  }
}

export function collect<T>(iterator: Iterator<T>): T[] {
  const result: T[] = [];
  forEach(iterator, item => result.push(item));
  return result;
}

export function filter<T>(iterator: Iterator<T>, predicate: (item: T) => boolean): T[] {
  const result: T[] = [];
  forEach(iterator, item => {
    if (predicate(item)) {
      result.push(item);
    }
  });
  return result;
}

// Factory functions
export function createBookLibrary() {
  const library = new BookCollection();
  
  library.addBook(new Book('1984', 'George Orwell', 1949, 'Dystopian'));
  library.addBook(new Book('Brave New World', 'Aldous Huxley', 1932, 'Dystopian'));
  library.addBook(new Book('The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy'));
  library.addBook(new Book('Dune', 'Frank Herbert', 1965, 'Science Fiction'));
  library.addBook(new Book('Foundation', 'Isaac Asimov', 1951, 'Science Fiction'));
  library.addBook(new Book('Neuromancer', 'William Gibson', 1984, 'Cyberpunk'));

  return library;
}

export function createFileSystemTree() {
  const root = new TreeNode('root/');
  const src = new TreeNode('src/');
  const lib = new TreeNode('lib/');
  const test = new TreeNode('test/');

  src.addChild(new TreeNode('index.js'));
  src.addChild(new TreeNode('utils.js'));
  
  lib.addChild(new TreeNode('helper.js'));
  lib.addChild(new TreeNode('config.js'));
  
  test.addChild(new TreeNode('index.test.js'));
  test.addChild(new TreeNode('utils.test.js'));

  root.addChild(src);
  root.addChild(lib);
  root.addChild(test);
  root.addChild(new TreeNode('package.json'));
  root.addChild(new TreeNode('README.md'));

  return root;
}

export function createNumberRanges() {
  return {
    standard: new NumberRange(1, 10),
    step2: new NumberRange(0, 20, 2),
    negative: new NumberRange(5, -5, -1)
  };
}

export const metadata: PatternMetadata = {
  title: 'Iterator Pattern',
  category: 'Behavioral',
  difficulty: 'Medium',
  description: 'Access elements sequentially without exposing underlying structure',
  detailedDescription: `
    ## 🔄 Iterator Pattern

    The **Iterator Pattern** provides a way to access elements of a collection sequentially without exposing the underlying representation. It separates the traversal logic from the collection structure.

    ### Core Concepts

    🔹 **Iterator Interface** - Defines methods for traversing elements (hasNext, next, reset)  
    🔹 **Concrete Iterator** - Implements traversal logic for specific collections  
    🔹 **Iterable Interface** - Collection that can create iterators  
    🔹 **External Iteration** - Client controls iteration process

    ### Real-World Applications

    **Data Structures** - Arrays, lists, trees, graphs with different traversal strategies  
    **File Systems** - Directory traversal with various filtering and ordering options  
    **Database Results** - Process query results without loading all data into memory  
    **Streaming Data** - Process large datasets one element at a time

    ### Traversal Strategies

    **Linear Collections** - Forward, reverse, filtered iteration  
    **Tree Structures** - Pre-order, post-order, level-order traversal  
    **Custom Logic** - Skip elements, transform values, conditional processing  
    **Lazy Evaluation** - Generate elements on-demand without storing entire collection

    ### Implementation Benefits

    ✅ **Encapsulation** - Internal structure hidden from client code  
    ✅ **Multiple traversals** - Different iterators can traverse same collection  
    ✅ **Uniform interface** - Same iteration pattern across different data structures  
    ✅ **Memory efficiency** - Process large collections without loading everything
  `,
  useCases: [
    PatternUseCase.DATA_PROCESSING,
    PatternUseCase.COLLECTION_TRAVERSAL,
    PatternUseCase.STREAM_PROCESSING
  ],
  advantages: [
    'Hides internal structure of collections',
    'Supports multiple simultaneous traversals',
    'Provides uniform interface across different data structures',
    'Enables lazy evaluation and memory-efficient processing'
  ],
  disadvantages: [
    'Can be overkill for simple collections',
    'May have performance overhead compared to direct access',
    'Iterator invalidation issues if collection is modified',
    'More complex than direct collection access'
  ],
  relatedPatterns: ['Composite', 'Factory Method', 'Memento']
};

export const solutions: SolutionMetadata[] = [
  {
    name: 'book-collection',
    title: 'Filtered Book Library Iterator',
    description: 'Multiple iteration strategies for book collections',
    isOptimal: true,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Medium'
  },
  {
    name: 'tree-traversal',
    title: 'Tree Structure Traversal',
    description: 'Pre-order, post-order, and level-order tree iteration',
    isOptimal: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    difficulty: 'Hard'
  },
  {
    name: 'number-range',
    title: 'Numeric Range Generator',
    description: 'Generate number sequences with custom steps and filters',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    difficulty: 'Easy'
  }
];

export const examples: PatternExample[] = [
  {
    title: 'Filtered Book Collection Traversal',
    scenario: 'Iterate through book library with different filtering strategies without exposing internal structure',
    inputExample: `const library = createBookLibrary();

console.log('All books:');
forEach(library.createIterator(), book => 
  console.log(book.toString())
);

console.log('\\nDystopian books:');
forEach(library.createGenreIterator('Dystopian'), book => 
  console.log(book.toString())
);

console.log('\\nReverse order:');
const reverseBooks = collect(library.createReverseIterator());
console.log(reverseBooks.slice(0, 3).map(b => b.title).join(', '));`,
    outputExample: `All books:
"1984" by George Orwell (1949)
"Brave New World" by Aldous Huxley (1932)
"The Hobbit" by J.R.R. Tolkien (1937)
...

Dystopian books:
"1984" by George Orwell (1949)
"Brave New World" by Aldous Huxley (1932)

Reverse order:
Neuromancer, Foundation, Dune`,
    explanation: 'Different iterators provide various ways to traverse the same book collection. The collection\'s internal structure remains hidden while enabling flexible access patterns.'
  },
  {
    title: 'Multi-Strategy Tree Traversal',
    scenario: 'Traverse file system tree using different algorithms without exposing tree structure',
    inputExample: `const tree = createFileSystemTree();

console.log('Pre-order traversal:');
const preOrder = collect(tree.createPreOrderIterator());
console.log(preOrder.slice(0, 5).join(' → '));

console.log('\\nLevel-order traversal:');
const levelOrder = collect(tree.createLevelOrderIterator());
console.log(levelOrder.slice(0, 5).join(' → '));`,
    outputExample: `Pre-order traversal:
root/ → src/ → index.js → utils.js → lib/

Level-order traversal:
root/ → src/ → lib/ → test/ → package.json`,
    explanation: 'Same tree structure can be traversed using different algorithms. Each iterator encapsulates its traversal strategy while providing a uniform interface.'
  },
  {
    title: 'Custom Range Generation',
    scenario: 'Generate numeric sequences with different patterns using iterator interface',
    inputExample: `const ranges = createNumberRanges();

console.log('Standard range (1-10):');
console.log(collect(ranges.standard.createIterator()).join(', '));

console.log('\\nEven numbers (0-20, step 2):');
console.log(collect(ranges.step2.createEvenIterator()).join(', '));

console.log('\\nReverse range (5 to -5):');
console.log(collect(ranges.negative.createReverseIterator()).join(', '));`,
    outputExample: `Standard range (1-10):
1, 2, 3, 4, 5, 6, 7, 8, 9, 10

Even numbers (0-20, step 2):
0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20

Reverse range (5 to -5):
-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5`,
    explanation: 'Range iterators generate numbers on-demand without storing entire sequences. Different iterators provide forward, reverse, and filtered access to the same logical range.'
  }
];

export { 
  Iterator, Iterable, Book, BookCollection, BookIterator, 
  GenreFilterIterator, YearFilterIterator, ReverseBookIterator,
  TreeNode, PreOrderIterator, PostOrderIterator, LevelOrderIterator,
  NumberRange, RangeIterator, ReverseRangeIterator, EvenRangeIterator,
  forEach, collect, filter
};