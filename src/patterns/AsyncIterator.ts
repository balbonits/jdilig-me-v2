import { PatternMetadata, PatternExample, PatternUseCase } from '../interfaces/patterns';
import { Solution } from '../interfaces/shared';

// Async Data Source Example
interface DataRecord {
  id: number;
  name: string;
  value: number;
  timestamp: Date;
}

class AsyncDataSource {
  private data: DataRecord[] = [];
  private delay: number;

  constructor(delay: number = 100) {
    this.delay = delay;
    
    // Generate sample data
    for (let i = 1; i <= 100; i++) {
      this.data.push({
        id: i,
        name: `Record ${i}`,
        value: Math.random() * 1000,
        timestamp: new Date(Date.now() - (100 - i) * 60000) // Past timestamps
      });
    }
  }

  // Simulate async data fetching
  async fetchPage(page: number, pageSize: number): Promise<{ data: DataRecord[]; hasMore: boolean }> {
    await this.simulateDelay();
    
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const pageData = this.data.slice(startIndex, endIndex);
    
    return {
      data: pageData,
      hasMore: endIndex < this.data.length
    };
  }

  async fetchById(id: number): Promise<DataRecord | null> {
    await this.simulateDelay();
    return this.data.find(record => record.id === id) || null;
  }

  async searchByName(query: string): Promise<DataRecord[]> {
    await this.simulateDelay();
    return this.data.filter(record => 
      record.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  private async simulateDelay(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, this.delay));
  }

  getTotalCount(): number {
    return this.data.length;
  }
}

// Async Iterator for paginated data
class PaginatedAsyncIterator implements AsyncIterableIterator<DataRecord> {
  private currentPage = 0;
  private currentPageData: DataRecord[] = [];
  private currentIndex = 0;
  private hasMorePages = true;

  constructor(
    private dataSource: AsyncDataSource,
    private pageSize: number = 10
  ) {}

  [Symbol.asyncIterator](): AsyncIterableIterator<DataRecord> {
    return this;
  }

  async next(): Promise<IteratorResult<DataRecord>> {
    // If we've consumed all items in current page, fetch next page
    if (this.currentIndex >= this.currentPageData.length && this.hasMorePages) {
      await this.fetchNextPage();
    }

    // If no more data available
    if (this.currentIndex >= this.currentPageData.length) {
      return { done: true, value: undefined };
    }

    // Return next item from current page
    const value = this.currentPageData[this.currentIndex];
    this.currentIndex++;
    return { done: false, value };
  }

  private async fetchNextPage(): Promise<void> {
    const result = await this.dataSource.fetchPage(this.currentPage, this.pageSize);
    
    // If this is a new page, reset index and append data
    if (this.currentPageData.length === this.currentIndex) {
      this.currentPageData = result.data;
      this.currentIndex = 0;
    } else {
      // Append to existing data
      this.currentPageData.push(...result.data);
    }
    
    this.hasMorePages = result.hasMore;
    this.currentPage++;
  }

  // Reset iterator
  reset(): void {
    this.currentPage = 0;
    this.currentPageData = [];
    this.currentIndex = 0;
    this.hasMorePages = true;
  }
}

// File Reader Async Iterator
interface FileChunk {
  data: string;
  chunkNumber: number;
  isLast: boolean;
}

class FileAsyncIterator implements AsyncIterableIterator<FileChunk> {
  private chunkNumber = 0;

  constructor(
    private content: string,
    private chunkSize: number = 100
  ) {}

  [Symbol.asyncIterator](): AsyncIterableIterator<FileChunk> {
    return this;
  }

  async next(): Promise<IteratorResult<FileChunk>> {
    const startIndex = this.chunkNumber * this.chunkSize;
    
    if (startIndex >= this.content.length) {
      return { done: true, value: undefined };
    }

    const endIndex = Math.min(startIndex + this.chunkSize, this.content.length);
    const data = this.content.slice(startIndex, endIndex);
    const isLast = endIndex >= this.content.length;

    // Simulate async file reading delay
    await new Promise(resolve => setTimeout(resolve, 50));

    const chunk: FileChunk = {
      data,
      chunkNumber: this.chunkNumber,
      isLast
    };

    this.chunkNumber++;
    return { done: false, value: chunk };
  }

  reset(): void {
    this.chunkNumber = 0;
  }
}

// HTTP Request Queue Async Iterator
interface ApiRequest {
  id: string;
  url: string;
  method: string;
  priority: number;
}

interface ApiResponse {
  request: ApiRequest;
  status: number;
  data: unknown;
  processingTime: number;
}

class RequestQueueAsyncIterator implements AsyncIterableIterator<ApiResponse> {
  private queue: ApiRequest[] = [];
  private processing = false;

  constructor() {}

  [Symbol.asyncIterator](): AsyncIterableIterator<ApiResponse> {
    return this;
  }

  addRequest(request: ApiRequest): void {
    this.queue.push(request);
    // Sort by priority (higher numbers first)
    this.queue.sort((a, b) => b.priority - a.priority);
  }

  async next(): Promise<IteratorResult<ApiResponse>> {
    // Wait for a request to be added if queue is empty
    while (this.queue.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const request = this.queue.shift()!;
    const response = await this.processRequest(request);
    
    return { done: false, value: response };
  }

  private async processRequest(request: ApiRequest): Promise<ApiResponse> {
    const startTime = Date.now();
    
    // Simulate API call with variable delay based on method
    const baseDelay = request.method === 'GET' ? 200 : 500;
    const randomDelay = Math.random() * 300;
    await new Promise(resolve => setTimeout(resolve, baseDelay + randomDelay));

    const processingTime = Date.now() - startTime;
    
    // Simulate different response scenarios
    let status = 200;
    let data: { message?: string; id?: string; error?: string } = { message: 'Success', id: request.id };
    
    if (Math.random() < 0.1) { // 10% error rate
      status = 500;
      data = { error: 'Internal Server Error' };
    }

    return {
      request,
      status,
      data,
      processingTime
    };
  }

  getQueueSize(): number {
    return this.queue.length;
  }

  clearQueue(): void {
    this.queue = [];
  }
}

// WebSocket Message Stream Async Iterator
interface WebSocketMessage {
  type: 'data' | 'error' | 'close';
  payload: unknown;
  timestamp: Date;
}

class WebSocketAsyncIterator implements AsyncIterableIterator<WebSocketMessage> {
  private messageQueue: WebSocketMessage[] = [];
  private isConnected = false;
  private messageListeners: Array<(message: WebSocketMessage) => void> = [];

  constructor(private url: string) {}

  [Symbol.asyncIterator](): AsyncIterableIterator<WebSocketMessage> {
    return this;
  }

  async connect(): Promise<void> {
    this.isConnected = true;
    
    // Simulate WebSocket connection
    this.simulateMessages();
  }

  async next(): Promise<IteratorResult<WebSocketMessage>> {
    // Wait for messages if none available
    while (this.messageQueue.length === 0 && this.isConnected) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    if (this.messageQueue.length === 0 && !this.isConnected) {
      return { done: true, value: undefined };
    }

    const message = this.messageQueue.shift()!;
    
    // Notify listeners
    this.messageListeners.forEach(listener => {
      try {
        listener(message);
      } catch (error) {
        console.error('Message listener error:', error);
      }
    });

    return { done: false, value: message };
  }

  addMessageListener(listener: (message: WebSocketMessage) => void): void {
    this.messageListeners.push(listener);
  }

  removeMessageListener(listener: (message: WebSocketMessage) => void): void {
    const index = this.messageListeners.indexOf(listener);
    if (index !== -1) {
      this.messageListeners.splice(index, 1);
    }
  }

  disconnect(): void {
    this.isConnected = false;
    
    // Add close message
    this.messageQueue.push({
      type: 'close',
      payload: { reason: 'Connection closed' },
      timestamp: new Date()
    });
  }

  private simulateMessages(): void {
    if (!this.isConnected) return;

    // Generate random messages
    const messageTypes = ['user_join', 'user_leave', 'message', 'typing'];
    const randomType = messageTypes[Math.floor(Math.random() * messageTypes.length)];
    
    const message: WebSocketMessage = {
      type: 'data',
      payload: {
        event: randomType,
        data: {
          user: `User${Math.floor(Math.random() * 100)}`,
          message: randomType === 'message' ? `Hello at ${new Date().toLocaleTimeString()}` : undefined
        }
      },
      timestamp: new Date()
    };

    this.messageQueue.push(message);

    // Schedule next message
    const delay = 500 + Math.random() * 2000; // Random delay between 0.5-2.5 seconds
    setTimeout(() => this.simulateMessages(), delay);
  }

  getQueueSize(): number {
    return this.messageQueue.length;
  }
}

// Utility functions for async iteration
export async function collectAsync<T>(asyncIterable: AsyncIterable<T>, limit?: number): Promise<T[]> {
  const results: T[] = [];
  let count = 0;
  
  for await (const item of asyncIterable) {
    results.push(item);
    count++;
    
    if (limit && count >= limit) {
      break;
    }
  }
  
  return results;
}

export async function filterAsync<T>(
  asyncIterable: AsyncIterable<T>,
  predicate: (item: T) => boolean | Promise<boolean>
): Promise<T[]> {
  const results: T[] = [];
  
  for await (const item of asyncIterable) {
    const shouldInclude = await predicate(item);
    if (shouldInclude) {
      results.push(item);
    }
  }
  
  return results;
}

export async function mapAsync<T, U>(
  asyncIterable: AsyncIterable<T>,
  mapper: (item: T) => U | Promise<U>
): Promise<U[]> {
  const results: U[] = [];
  
  for await (const item of asyncIterable) {
    const mapped = await mapper(item);
    results.push(mapped);
  }
  
  return results;
}

export async function forEachAsync<T>(
  asyncIterable: AsyncIterable<T>,
  callback: (item: T, index: number) => void | Promise<void>
): Promise<void> {
  let index = 0;
  
  for await (const item of asyncIterable) {
    await callback(item, index);
    index++;
  }
}

export async function take<T>(asyncIterable: AsyncIterable<T>, count: number): Promise<T[]> {
  return collectAsync(asyncIterable, count);
}

// Factory functions
export function createPaginatedIterator(pageSize: number = 10) {
  const dataSource = new AsyncDataSource(50); // 50ms delay
  return new PaginatedAsyncIterator(dataSource, pageSize);
}

export function createFileIterator(content: string, chunkSize: number = 100) {
  return new FileAsyncIterator(content, chunkSize);
}

export function createRequestQueue() {
  return new RequestQueueAsyncIterator();
}

export function createWebSocketIterator(url: string = 'ws://localhost:8080') {
  return new WebSocketAsyncIterator(url);
}

export const metadata: PatternMetadata = {
  title: 'Async Iterator Pattern',
  category: 'Modern',
  difficulty: 'Hard',
  description: 'Process asynchronous data streams using modern iteration protocols',
  concepts: ["design patterns","software architecture","code organization","object-oriented programming"],
    timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  detailedDescription: `
    ## ⚡ Async Iterator Pattern

    The **Async Iterator Pattern** provides a standardized way to iterate over asynchronous data sources using JavaScript's native async iteration protocol. It enables processing streams of data that arrive over time.

    ### Core Concepts

    🔹 **AsyncIterableIterator Interface** - Implements \`Symbol.asyncIterator\` method  
    🔹 **Async/Await Integration** - Works seamlessly with \`for await...of\` loops  
    🔹 **Lazy Evaluation** - Data is fetched/processed only when needed  
    🔹 **Stream Processing** - Handle continuous data flows efficiently

    ### Real-World Applications

    **API Pagination** - Iterate through large datasets without loading everything into memory  
    **File Processing** - Read large files in chunks without blocking the event loop  
    **WebSocket Streams** - Process real-time messages as they arrive  
    **Database Cursors** - Stream database results for large queries

    ### Modern JavaScript Features

    **for await...of** - Native syntax for async iteration  
    **Symbol.asyncIterator** - Well-known symbol for async iteration protocol  
    **AsyncGenerator Functions** - Function* async syntax for creating iterators  
    **Stream APIs** - Integration with Node.js streams and Web Streams

    ### Memory Efficiency

    **Streaming Data** - Process large datasets without loading into memory  
    **Backpressure Handling** - Control flow to prevent overwhelming consumers  
    **Lazy Loading** - Fetch data only when iteration demands it  
    **Garbage Collection** - Items can be collected after processing

    ### Implementation Benefits

    ✅ **Memory efficient** - Stream processing without loading entire datasets  
    ✅ **Non-blocking** - Async operations don't block event loop  
    ✅ **Composable** - Can be chained with async utility functions  
    ✅ **Native integration** - Works with modern JavaScript iteration syntax
  `,
  useCases: [
    PatternUseCase.DATA_PROCESSING,
    PatternUseCase.STREAM_PROCESSING,
    PatternUseCase.API_INTEGRATION
  ],
  realWorldApplications: ["Software frameworks","Application architecture","Library development","System design"],
    advantages: [
    'Memory efficient streaming of large datasets',
    'Non-blocking asynchronous data processing',
    'Native JavaScript integration with for-await-of',
    'Composable with functional programming utilities'
  ],
  disadvantages: [
    'More complex than synchronous iteration',
    'Error handling across async boundaries',
    'Debugging async iteration can be challenging',
    'Requires understanding of async/await patterns'
  ],
  relatedPatterns: ['Iterator', 'Observer', 'Generator']
};

export const solutions: Solution[] = [
  {
    name: 'paginated-data',
    tabName: 'Paginated API Data Iterator',
    approach: 'Stream large datasets through automatic pagination',
    isOptimal: true,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    type: 'class',
    code: `// Async Iterator for paginated data
class PaginatedAsyncIterator implements AsyncIterableIterator<DataRecord> {
  private currentPage = 0;
  private currentPageData: DataRecord[] = [];
  private currentIndex = 0;
  private hasMorePages = true;

  constructor(
    private dataSource: AsyncDataSource,
    private pageSize: number = 10
  ) {}

  [Symbol.asyncIterator](): AsyncIterableIterator<DataRecord> {
    return this;
  }

  async next(): Promise<IteratorResult<DataRecord>> {
    // If we've consumed all items in current page, fetch next page
    if (this.currentIndex >= this.currentPageData.length && this.hasMorePages) {
      await this.fetchNextPage();
    }

    // If no more data available
    if (this.currentIndex >= this.currentPageData.length) {
      return { done: true, value: undefined };
    }

    // Return next item from current page
    const value = this.currentPageData[this.currentIndex];
    this.currentIndex++;
    return { done: false, value };
  }

  private async fetchNextPage(): Promise<void> {
    const result = await this.dataSource.fetchPage(this.currentPage, this.pageSize);
    
    // If this is a new page, reset index and append data
    if (this.currentPageData.length === this.currentIndex) {
      this.currentPageData = result.data;
      this.currentIndex = 0;
    } else {
      // Append to existing data
      this.currentPageData.push(...result.data);
    }
    
    this.hasMorePages = result.hasMore;
    this.currentPage++;
  }
}

// Usage
const dataSource = new AsyncDataSource(50);
const iterator = new PaginatedAsyncIterator(dataSource, 5);

// Stream through data without loading everything into memory
for await (const record of iterator) {
  console.log(\`\${record.id}: \${record.name} - \${record.value.toFixed(2)}\`);
  if (record.id >= 10) break; // Process first 10 records
}`
  },
  {
    name: 'file-processing',
    tabName: 'File Chunk Stream Iterator',
    approach: 'Process large files in manageable chunks',
    isOptimal: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    type: 'class',
    code: `// File Reader Async Iterator
interface FileChunk {
  data: string;
  chunkNumber: number;
  isLast: boolean;
}

class FileAsyncIterator implements AsyncIterableIterator<FileChunk> {
  private chunkNumber = 0;

  constructor(
    private content: string,
    private chunkSize: number = 100
  ) {}

  [Symbol.asyncIterator](): AsyncIterableIterator<FileChunk> {
    return this;
  }

  async next(): Promise<IteratorResult<FileChunk>> {
    const startIndex = this.chunkNumber * this.chunkSize;
    
    if (startIndex >= this.content.length) {
      return { done: true, value: undefined };
    }

    const endIndex = Math.min(startIndex + this.chunkSize, this.content.length);
    const data = this.content.slice(startIndex, endIndex);
    const isLast = endIndex >= this.content.length;

    // Simulate async file reading delay
    await new Promise(resolve => setTimeout(resolve, 50));

    const chunk: FileChunk = {
      data,
      chunkNumber: this.chunkNumber,
      isLast
    };

    this.chunkNumber++;
    return { done: false, value: chunk };
  }
}

// Usage
const content = 'Lorem ipsum dolor sit amet...'.repeat(100);
const fileIterator = new FileAsyncIterator(content, 150);

let totalChars = 0;
for await (const chunk of fileIterator) {
  console.log(\`Chunk \${chunk.chunkNumber}: \${chunk.data.length} chars\`);
  totalChars += chunk.data.length;
  
  // Process chunk without blocking event loop
  await processChunk(chunk.data);
}`
  },
  {
    name: 'request-queue',
    tabName: 'HTTP Request Queue Iterator',
    approach: 'Process API requests with priority queuing',
    isOptimal: false,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(n)',
    type: 'class',
    code: `// HTTP Request Queue Async Iterator
interface ApiRequest {
  id: string;
  url: string;
  method: string;
  priority: number;
}

class RequestQueueAsyncIterator implements AsyncIterableIterator<ApiResponse> {
  private queue: ApiRequest[] = [];

  [Symbol.asyncIterator](): AsyncIterableIterator<ApiResponse> {
    return this;
  }

  addRequest(request: ApiRequest): void {
    this.queue.push(request);
    // Sort by priority (higher numbers first)
    this.queue.sort((a, b) => b.priority - a.priority);
  }

  async next(): Promise<IteratorResult<ApiResponse>> {
    // Wait for a request to be added if queue is empty
    while (this.queue.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    const request = this.queue.shift()!;
    const response = await this.processRequest(request);
    
    return { done: false, value: response };
  }

  private async processRequest(request: ApiRequest): Promise<ApiResponse> {
    const startTime = Date.now();
    
    // Simulate API call with variable delay
    const baseDelay = request.method === 'GET' ? 200 : 500;
    const randomDelay = Math.random() * 300;
    await new Promise(resolve => setTimeout(resolve, baseDelay + randomDelay));

    const processingTime = Date.now() - startTime;
    
    return {
      request,
      status: 200,
      data: { message: 'Success', id: request.id },
      processingTime
    };
  }
}

// Usage
const queue = new RequestQueueAsyncIterator();

// Add requests with different priorities
queue.addRequest({ id: '1', url: '/api/data', method: 'GET', priority: 1 });
queue.addRequest({ id: '2', url: '/api/urgent', method: 'POST', priority: 10 });

// Process requests in priority order
for await (const response of queue) {
  console.log(\`Processed request \${response.request.id} in \${response.processingTime}ms\`);
  if (response.request.id === '2') break;
}`
  },
  {
    name: 'websocket-stream',
    tabName: 'WebSocket Message Stream',
    approach: 'Stream real-time WebSocket messages',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    type: 'class',
    code: `// WebSocket Message Stream Async Iterator
interface WebSocketMessage {
  type: 'data' | 'error' | 'close';
  payload: unknown;
  timestamp: Date;
}

class WebSocketAsyncIterator implements AsyncIterableIterator<WebSocketMessage> {
  private messageQueue: WebSocketMessage[] = [];
  private isConnected = false;

  constructor(private url: string) {}

  [Symbol.asyncIterator](): AsyncIterableIterator<WebSocketMessage> {
    return this;
  }

  async connect(): Promise<void> {
    this.isConnected = true;
    this.simulateMessages();
  }

  async next(): Promise<IteratorResult<WebSocketMessage>> {
    // Wait for messages if none available
    while (this.messageQueue.length === 0 && this.isConnected) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    if (this.messageQueue.length === 0 && !this.isConnected) {
      return { done: true, value: undefined };
    }

    const message = this.messageQueue.shift()!;
    return { done: false, value: message };
  }

  disconnect(): void {
    this.isConnected = false;
    
    this.messageQueue.push({
      type: 'close',
      payload: { reason: 'Connection closed' },
      timestamp: new Date()
    });
  }

  private simulateMessages(): void {
    if (!this.isConnected) return;

    const message: WebSocketMessage = {
      type: 'data',
      payload: {
        event: 'message',
        data: {
          user: \`User\${Math.floor(Math.random() * 100)}\`,
          message: \`Hello at \${new Date().toLocaleTimeString()}\`
        }
      },
      timestamp: new Date()
    };

    this.messageQueue.push(message);
    
    // Schedule next message
    setTimeout(() => this.simulateMessages(), 1000 + Math.random() * 2000);
  }
}

// Usage
const wsIterator = new WebSocketAsyncIterator('ws://chat-server');
await wsIterator.connect();

// Stream messages as they arrive
for await (const message of wsIterator) {
  console.log(\`Message: \${message.type} at \${message.timestamp.toLocaleTimeString()}\`);
  
  if (message.type === 'close') break;
}`
  }
];

export const examples: PatternExample[] = [
  {
    input: "createPaginatedIterator(5)",
    output: "Stream of DataRecord objects with automatic pagination",
    description: 'Stream through large dataset using automatic pagination without loading everything into memory',
    scenario: 'Paginated Data Stream Processing'
  },
  {
    input: "createFileIterator(content, 150)",
    output: "Stream of FileChunk objects with data and metadata",
    description: 'Process large text content in chunks without blocking the event loop',
    scenario: 'Large File Chunk Processing'
  },
  {
    input: "createWebSocketIterator('ws://chat-server')",
    output: "Stream of WebSocketMessage objects as they arrive",
    description: 'Process WebSocket messages as they arrive using async iteration',
    scenario: 'Real-Time WebSocket Message Stream'
  }
];

export { 
  AsyncDataSource, PaginatedAsyncIterator, FileAsyncIterator, 
  RequestQueueAsyncIterator, WebSocketAsyncIterator
};

const asyncIteratorModule = {
  metadata,
  solutions, 
  examples
};

export default asyncIteratorModule;