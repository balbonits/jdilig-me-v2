import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * 🗄️ LRU Cache - High-Performance Data Management
 * 
 * DESCRIPTION:
 * ⚡ **The Smart Storage Solution**
 * LRU (Least Recently Used) Cache is a fundamental data structure that combines the speed of hash maps with intelligent eviction policies. Essential for building high-performance systems that need fast data access with bounded memory usage!
 * 
 * 🧠 **The Eviction Strategy:**
 * • **Recently Used = Keep:** Items accessed recently stay in cache
 * • **Least Used = Evict:** Oldest unused items get removed when capacity is full
 * • **Access Updates Order:** Both get() and put() mark items as "recently used"
 * • **Constant Time:** All operations must be O(1) for real-world performance
 * 
 * ⚡ **Two Implementation Approaches:**
 * • **Map-Based:** Leverages JavaScript Map's insertion order (simpler code)
 * • **Hash + DLL:** Traditional approach with hash map + doubly-linked list (more control)
 * 
 * 🚀 **Real-World Applications:**
 * • **CPU Caches:** Hardware uses LRU for memory management
 * • **Database Buffers:** Keep frequently accessed pages in memory
 * • **Web Browsers:** Cache recently visited pages and resources
 * • **CDN Systems:** Distribute and cache popular content efficiently
 * • **Operating Systems:** Page replacement in virtual memory
 * 
 * 💡 **Learning Value:**
 * • Data structure combination (hash map + linked list)
 * • Time vs space complexity trade-offs
 * • Cache eviction policies and their impacts
 * • Real-world system design principles
 * 
 * PERFORMANCE:
 * - Time: O(1) for both get and put operations
 * - Space: O(capacity) bounded memory usage
 * 
 * Two implementations show Map-based vs traditional hash+DLL approaches.
 */

// Main class (Map-based)
export class LRUCache {
  private capacity: number;
  private cache: Map<number, number>;

  constructor(capacity: number) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("Capacity must be a positive integer");
    }
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key: number): number {
    if (typeof key !== 'number') {
      throw new Error("Key must be a number");
    }
    if (!this.cache.has(key)) {
      return -1;
    }
    const value = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key: number, value: number): void {
    if (typeof key !== 'number' || typeof value !== 'number') {
      throw new Error("Key and value must be numbers");
    }
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      const lruKey = this.cache.keys().next().value;
      if (lruKey !== undefined) {
        this.cache.delete(lruKey);
      }
    }
  }
}

// Alternative class (Map + DLL for strict O(1))
class ListNode {
  key: number;
  value: number;
  prev: ListNode | null = null;
  next: ListNode | null = null;

  constructor(key = 0, value = 0) {
    this.key = key;
    this.value = value;
  }
}

export class LRUCacheDLL {
  private capacity: number;
  private cache: Map<number, ListNode>;
  private head: ListNode;
  private tail: ListNode;

  constructor(capacity: number) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("Capacity must be a positive integer");
    }
    this.capacity = capacity;
    this.cache = new Map();
    this.head = new ListNode();
    this.tail = new ListNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    if (typeof key !== 'number') {
      throw new Error("Key must be a number");
    }
    if (!this.cache.has(key)) return -1;
    const node = this.cache.get(key)!;
    this.moveToTail(node);
    return node.value;
  }

  put(key: number, value: number): void {
    if (typeof key !== 'number' || typeof value !== 'number') {
      throw new Error("Key and value must be numbers");
    }
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      node.value = value;
      this.moveToTail(node);
      return;
    }
    const node = new ListNode(key, value);
    this.cache.set(key, node);
    this.addToTail(node);
    if (this.cache.size > this.capacity) {
      const lru = this.head.next!;
      this.removeNode(lru);
      this.cache.delete(lru.key);
    }
  }

  private addToTail(node: ListNode): void {
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev!.next = node;
    this.tail.prev = node;
  }

  private removeNode(node: ListNode): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private moveToTail(node: ListNode): void {
    this.removeNode(node);
    this.addToTail(node);
  }
}

// Exercise metadata
export const metadata: ExerciseMetadata = {
  title: "LRU Cache",
  description: "Implements a Least Recently Used (LRU) cache with get and put",
  detailedDescription: "⚡ **The Smart Storage Solution**\nLRU (Least Recently Used) Cache is a fundamental data structure that combines the speed of hash maps with intelligent eviction policies. Essential for building high-performance systems that need fast data access with bounded memory usage!\n\n🧠 **The Eviction Strategy:**\n• **Recently Used = Keep:** Items accessed recently stay in cache\n• **Least Used = Evict:** Oldest unused items get removed when capacity is full\n• **Access Updates Order:** Both get() and put() mark items as \"recently used\"\n• **Constant Time:** All operations must be O(1) for real-world performance\n\n⚡ **Two Implementation Approaches:**\n• **Map-Based:** Leverages JavaScript Map's insertion order (simpler code)\n• **Hash + DLL:** Traditional approach with hash map + doubly-linked list (more control)\n\n🚀 **Real-World Applications:**\n• **CPU Caches:** Hardware uses LRU for memory management\n• **Database Buffers:** Keep frequently accessed pages in memory\n• **Web Browsers:** Cache recently visited pages and resources\n• **CDN Systems:** Distribute and cache popular content efficiently\n• **Operating Systems:** Page replacement in virtual memory\n\n💡 **Learning Value:**\n• Data structure combination (hash map + linked list)\n• Time vs space complexity trade-offs\n• Cache eviction policies and their impacts\n• Real-world system design principles",
  concepts: ["hash maps", "doubly linked lists"],
  timeComplexity: "O(1) for get/put",
  spaceComplexity: "O(capacity)",
  difficulty: "Hard"
};

export const solutions: SolutionMetadata[] = [
  {
    name: "LRUCache",
    tabName: "Map-based",
    approach: "JavaScript Map for LRU ordering",
    timeComplexity: "O(1)",
    spaceComplexity: "O(capacity)",
    isOptimal: true,
    type: "class"
  },
  {
    name: "LRUCacheDLL",
    tabName: "Doubly Linked List",
    approach: "Hash map + custom doubly linked list",
    timeComplexity: "O(1)",
    spaceComplexity: "O(capacity)",
    isOptimal: true,
    type: "class"
  }
];

// Example test cases
export const examples: ExampleCase[] = [
  {
    input: {
      operations: [
        ["LRUCache", 2],
        ["put", 1, 1],
        ["put", 2, 2],
        ["get", 1],
        ["put", 3, 3],
        ["get", 2],
        ["put", 4, 4],
        ["get", 1],
        ["get", 3],
        ["get", 4]
      ]
    },
    output: [null, null, null, 1, null, -1, null, -1, 3, 4],
    description: "Standard LRU operations with evictions"
  },
  {
    input: {
      operations: [
        ["LRUCache", 1],
        ["put", 1, 1],
        ["get", 1],
        ["put", 2, 2],
        ["get", 1]
      ]
    },
    output: [null, null, 1, null, -1],
    description: "Capacity 1, eviction on second put"
  },
  {
    input: {
      operations: [
        ["LRUCache", 0]
      ]
    },
    output: new Error("Capacity must be a positive integer"),
    description: "Invalid capacity"
  },
  {
    input: {
      operations: [
        ["LRUCache", 2],
        ["put", 1, 1],
        ["get", 2]
      ]
    },
    output: [null, null, -1],
    description: "Get missing key"
  }
];

// Default export for easy importing
const exerciseModule = {
  LRUCache,
  LRUCacheDLL,
  metadata,
  solutions,
  examples
};

export default exerciseModule;