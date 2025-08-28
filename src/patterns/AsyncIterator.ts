import { PatternMetadata, PatternExample, PatternUseCase } from '../interfaces/patterns';
import { SolutionMetadata } from '../interfaces/shared';

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
  data: any;
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
    let data = { message: 'Success', id: request.id };
    
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
  payload: any;
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
export async function collect<T>(asyncIterable: AsyncIterable<T>, limit?: number): Promise<T[]> {
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

export async function filter<T>(
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

export async function map<T, U>(
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

export async function forEach<T>(
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
  return collect(asyncIterable, count);
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

export const solutions: SolutionMetadata[] = [
  {
    name: 'paginated-data',
    title: 'Paginated API Data Iterator',
    description: 'Stream large datasets through automatic pagination',
    isOptimal: true,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    difficulty: 'Hard'
  },
  {
    name: 'file-processing',
    title: 'File Chunk Stream Iterator',
    description: 'Process large files in manageable chunks',
    isOptimal: false,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    difficulty: 'Medium'
  },
  {
    name: 'request-queue',
    title: 'HTTP Request Queue Iterator',
    description: 'Process API requests with priority queuing',
    isOptimal: false,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(n)',
    difficulty: 'Hard'
  },
  {
    name: 'websocket-stream',
    title: 'WebSocket Message Stream',
    description: 'Stream real-time WebSocket messages',
    isOptimal: false,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    difficulty: 'Medium'
  }
];

export const examples: PatternExample[] = [
  {
    title: 'Paginated Data Stream Processing',
    scenario: 'Stream through large dataset using automatic pagination without loading everything into memory',
    inputExample: `const iterator = createPaginatedIterator(5); // 5 items per page

console.log('Streaming first 10 records:');
let count = 0;
for await (const record of iterator) {
  console.log(\`\${record.id}: \${record.name} - \${record.value.toFixed(2)}\`);
  count++;
  if (count >= 10) break;
}

console.log(\`Processed \${count} records using pagination\`);`,
    outputExample: `Streaming first 10 records:
1: Record 1 - 456.78
2: Record 2 - 123.45
3: Record 3 - 789.01
4: Record 4 - 234.56
5: Record 5 - 567.89
6: Record 6 - 890.12
7: Record 7 - 345.67
8: Record 8 - 678.90
9: Record 9 - 123.44
10: Record 10 - 456.77
Processed 10 records using pagination`,
    explanation: 'Data is fetched page by page as iteration progresses. Only the current page is kept in memory, enabling efficient processing of large datasets.'
  },
  {
    title: 'Large File Chunk Processing',
    scenario: 'Process large text content in chunks without blocking the event loop',
    inputExample: `const content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(50);
const fileIterator = createFileIterator(content, 150);

console.log(\`Processing file content (\${content.length} chars) in chunks:\`);

let chunkCount = 0;
let totalChars = 0;

for await (const chunk of fileIterator) {
  console.log(\`Chunk \${chunk.chunkNumber}: \${chunk.data.length} chars (last: \${chunk.isLast})\`);
  chunkCount++;
  totalChars += chunk.data.length;
  
  if (chunkCount >= 3) break; // Process only first 3 chunks for demo
}

console.log(\`Processed \${chunkCount} chunks, \${totalChars} total characters\`);`,
    outputExample: `Processing file content (2900 chars) in chunks:
Chunk 0: 150 chars (last: false)
Chunk 1: 150 chars (last: false)
Chunk 2: 150 chars (last: false)
Processed 3 chunks, 450 total characters`,
    explanation: 'Large file content is processed in manageable chunks with async delays between reads. This prevents blocking the event loop while processing large files.'
  },
  {
    title: 'Real-Time WebSocket Message Stream',
    scenario: 'Process WebSocket messages as they arrive using async iteration',
    inputExample: `const wsIterator = createWebSocketIterator('ws://chat-server');
await wsIterator.connect();

// Add message listener
wsIterator.addMessageListener((msg) => {
  if (msg.type === 'data' && msg.payload.event === 'message') {
    console.log(\`📨 \${msg.payload.data.user}: \${msg.payload.data.message}\`);
  }
});

console.log('Listening for WebSocket messages...');
let messageCount = 0;

for await (const message of wsIterator) {
  console.log(\`Message \${++messageCount}: \${message.type} at \${message.timestamp.toLocaleTimeString()}\`);
  
  if (messageCount >= 5) {
    wsIterator.disconnect();
    break;
  }
}

console.log('WebSocket stream ended');`,
    outputExample: `Listening for WebSocket messages...
📨 User42: Hello at 2:30:15 PM
Message 1: data at 2:30:15 PM
Message 2: data at 2:30:16 PM
📨 User17: Hello at 2:30:17 PM
Message 3: data at 2:30:17 PM
Message 4: data at 2:30:18 PM
Message 5: data at 2:30:19 PM
WebSocket stream ended`,
    explanation: 'WebSocket messages are streamed through async iterator as they arrive. The iterator queues messages and processes them asynchronously without blocking.'
  }
];

export { 
  AsyncDataSource, PaginatedAsyncIterator, FileAsyncIterator, 
  RequestQueueAsyncIterator, WebSocketAsyncIterator,
  collect, filter, map, forEach, take
};