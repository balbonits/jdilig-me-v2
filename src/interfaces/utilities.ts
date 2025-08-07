export interface UtilityExample {
  description: string;
  code: string;
}

export interface UtilityMetadata {
  title: string;
  category: string;
}

export interface UtilityData {
  name: string;
  slug: string;
  metadata: UtilityMetadata;
  examples: UtilityExample[];
  code: string;
  functions: string[];
}