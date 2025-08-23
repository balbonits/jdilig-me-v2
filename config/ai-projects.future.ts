/**
 * AI Projects Configuration - FUTURE RELEASE
 * 
 * This configuration will be used to automatically fetch project showcase
 * configurations from AI-built project repositories.
 * 
 * STATUS: Scaffolded for future implementation
 * TODO: Activate when AI projects have showcase configs in their repos
 */

export interface AIProjectConfig {
  /** Unique identifier for the project */
  name: string;
  
  /** GitHub repository URL */
  githubUrl: string;
  
  /** Path to showcase config in the repository */
  showcaseConfigPath: string;
  
  /** Whether to include this project in builds */
  enabled: boolean;
  
  /** Display order priority (lower = higher priority) */
  priority: number;
  
  /** Optional: Override fetched data */
  overrides?: {
    featured?: boolean;
    category?: string;
  };
}

/**
 * List of AI projects to fetch showcase configs from
 * 
 * FUTURE RELEASE: Add projects here once they have showcase.config.ts files
 */
export const aiProjectsConfig: AIProjectConfig[] = [
  // EXAMPLE - Uncomment when ready to activate
  /*
  {
    name: "gemini-cli-demo",
    githubUrl: "https://github.com/balbonits/gemini-cli-demo",
    showcaseConfigPath: "showcase/showcase.config.ts",
    enabled: false, // Set to true when showcase config is ready
    priority: 1
  },
  {
    name: "claude-code-assistant",
    githubUrl: "https://github.com/username/claude-assistant",
    showcaseConfigPath: "showcase/showcase.config.ts",
    enabled: false,
    priority: 2
  }
  */
];

/**
 * Default configuration for AI projects
 */
export const defaultAIProjectConfig = {
  showcaseConfigPath: "showcase/showcase.config.ts",
  enabled: false,
  priority: 999
};