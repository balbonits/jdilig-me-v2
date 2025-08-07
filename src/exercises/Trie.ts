import { ExerciseMetadata, ExampleCase } from '@interfaces/exercises';

/**
 * Trie-based Autocomplete Exercise Implementation
 * 
 * DESCRIPTION:
 * Trie for inserting words and suggesting completions for a prefix.
 * 
 * EXAMPLE:
 * insert("apple"); insert("app"); suggest("ap") → ["app", "apple"]
 * 
 * CONCEPTS:
 * - Tree data structures
 * - DFS traversal
 * 
 * PERFORMANCE:
 * - Time: O(k) insert/suggest (k word length)
 * - Space: O(total chars)
 * 
 * Multiple implementations included to show different approaches.
 */

// Trie Node
class TrieNode {
  children: Map<string, TrieNode>;
  isWord: boolean;

  constructor() {
    this.children = new Map();
    this.isWord = false;
  }
}

// Main class (Map-based)
export class Trie {
  private root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  insert(word: string): void {
    if (typeof word !== 'string') {
      throw new Error("Input must be a string");
    }
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isWord = true;
  }

  suggest(prefix: string): string[] {
    if (typeof prefix !== 'string') {
      throw new Error("Input must be a string");
    }
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) {
        return [];
      }
      node = node.children.get(char)!;
    }
    const results: string[] = [];
    const dfs = (curr: TrieNode, path: string) => {
      if (curr.isWord) results.push(path);
      for (const [char, child] of curr.children) {
        dfs(child, path + char);
      }
    };
    dfs(node, prefix);
    return results;
  }
}

// Alternative class (array-based for lowercase a-z)
class TrieNodeArray {
  children: (TrieNodeArray | null)[];
  isWord: boolean;

  constructor() {
    this.children = Array(26).fill(null);
    this.isWord = false;
  }
}

export class TrieArray {
  private root: TrieNodeArray;

  constructor() {
    this.root = new TrieNodeArray();
  }

  insert(word: string): void {
    if (typeof word !== 'string') {
      throw new Error("Input must be a string");
    }
    let node = this.root;
    for (const char of word.toLowerCase()) {
      const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
      if (index < 0 || index > 25) throw new Error("Word must contain lowercase letters only");
      if (!node.children[index]) {
        node.children[index] = new TrieNodeArray();
      }
      node = node.children[index]!;
    }
    node.isWord = true;
  }

  suggest(prefix: string): string[] {
    if (typeof prefix !== 'string') {
      throw new Error("Input must be a string");
    }
    let node = this.root;
    for (const char of prefix.toLowerCase()) {
      const index = char.charCodeAt(0) - 'a'.charCodeAt(0);
      if (index < 0 || index > 25 || !node.children[index]) return [];
      node = node.children[index]!;
    }
    const results: string[] = [];
    const dfs = (curr: TrieNodeArray, path: string) => {
      if (curr.isWord) results.push(path);
      for (let k = 0; k < 26; k++) {
        if (curr.children[k]) {
          dfs(curr.children[k]!, path + String.fromCharCode(k + 'a'.charCodeAt(0)));
        }
      }
    };
    dfs(node, prefix);
    return results;
  }
}

// Exercise metadata
export const metadata: ExerciseMetadata = {
  title: "Trie-based Autocomplete",
  description: "Trie for inserting words and suggesting completions for a prefix",
  concepts: ["tree data structures", "DFS traversal"],
  timeComplexity: "O(k) insert/suggest",
  spaceComplexity: "O(total chars)"
};

// Example test cases
export const examples: ExampleCase[] = [
  {
    input: { operations: [["insert", "apple"], ["insert", "app"], ["insert", "application"], ["suggest", "ap"]] },
    output: ["app", "apple", "application"],
    description: "Suggestions for 'ap' prefix"
  },
  {
    input: { operations: [["insert", "hello"], ["suggest", "world"]] },
    output: [],
    description: "No suggestions for unmatched prefix"
  },
  {
    input: { operations: [["suggest", ""]] },
    output: [],
    description: "Empty prefix"
  },
  {
    input: { operations: [["insert", ""], ["suggest", ""]] },
    output: [""],
    description: "Empty word and prefix"
  }
];

// Default export for easy importing
export default { Trie, TrieArray, metadata, examples };