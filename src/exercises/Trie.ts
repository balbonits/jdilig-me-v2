import { ExerciseMetadata, ExampleCase, SolutionMetadata } from '@/interfaces/exercises';

/**
 * 🌲 Trie Data Structure - The Autocomplete Powerhouse
 * 
 * DESCRIPTION:
 * 🔍 **The Search Optimization Champion**
 * The Trie (prefix tree) is a specialized tree data structure that revolutionizes text searching and autocomplete functionality! Store thousands of words efficiently and provide instant prefix-based suggestions.
 * 
 * 🧠 **The Tree Strategy:**
 * • **Prefix Sharing:** Common prefixes share the same path from root
 * • **Character Nodes:** Each node represents a character, edges form words
 * • **Word Boundaries:** Special markers indicate complete words vs partial paths
 * • **Traversal Magic:** DFS from prefix node finds all possible completions
 * 
 * ⚡ **Two Implementation Approaches:**
 * • **Map-Based:** Flexible storage for any character set (Unicode support)
 * • **Array-Based:** Optimized for lowercase a-z with direct indexing
 * 
 * 🚀 **Real-World Applications:**
 * • **Search Engines:** Autocomplete suggestions and spell checking
 * • **Code Editors:** Variable/function name completion and IntelliSense
 * • **Mobile Keyboards:** Predictive text and word suggestions
 * • **DNS Resolution:** Efficient domain name lookup and routing
 * • **IP Routing:** Network packet routing through prefix matching
 * • **Lexical Analysis:** Tokenization in compilers and parsers
 * 
 * 💡 **Learning Value:**
 * • Tree-based data structure design and traversal
 * • Space vs time optimization trade-offs
 * • Depth-first search algorithms and recursion
 * • Prefix matching and string processing algorithms
 * 
 * PERFORMANCE:
 * - Time: O(k) for insert/search (k = word length, independent of dictionary size!)
 * - Space: O(total characters across all words)
 * 
 * Two implementations show Map flexibility vs Array optimization approaches.
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
  detailedDescription: "🔍 **The Search Optimization Champion**\nThe Trie (prefix tree) is a specialized tree data structure that revolutionizes text searching and autocomplete functionality! Store thousands of words efficiently and provide instant prefix-based suggestions.\n\n🧠 **The Tree Strategy:**\n• **Prefix Sharing:** Common prefixes share the same path from root\n• **Character Nodes:** Each node represents a character, edges form words\n• **Word Boundaries:** Special markers indicate complete words vs partial paths\n• **Traversal Magic:** DFS from prefix node finds all possible completions\n\n⚡ **Two Implementation Approaches:**\n• **Map-Based:** Flexible storage for any character set (Unicode support)\n• **Array-Based:** Optimized for lowercase a-z with direct indexing\n\n🚀 **Real-World Applications:**\n• **Search Engines:** Autocomplete suggestions and spell checking\n• **Code Editors:** Variable/function name completion and IntelliSense\n• **Mobile Keyboards:** Predictive text and word suggestions\n• **DNS Resolution:** Efficient domain name lookup and routing\n• **IP Routing:** Network packet routing through prefix matching\n• **Lexical Analysis:** Tokenization in compilers and parsers\n\n💡 **Learning Value:**\n• Tree-based data structure design and traversal\n• Space vs time optimization trade-offs\n• Depth-first search algorithms and recursion\n• Prefix matching and string processing algorithms",
  concepts: ["tree data structures", "DFS traversal"],
  timeComplexity: "O(k) insert/suggest",
  spaceComplexity: "O(total chars)",
  difficulty: "Expert"
}

export const solutions: SolutionMetadata[] = [
  {
    name: "Trie",
    tabName: "Map-based",
    approach: "Map for flexible character storage",
    timeComplexity: "O(k)",
    spaceComplexity: "O(total chars)",
    isOptimal: true,
    type: "class"
  },
  {
    name: "TrieArray",
    tabName: "Array-based",
    approach: "Fixed array for lowercase a-z only",
    timeComplexity: "O(k)",
    spaceComplexity: "O(total chars)",
    isOptimal: true,
    type: "class"
  }
];

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
const exerciseModule = { Trie, TrieArray, metadata, solutions, examples };
export default exerciseModule;