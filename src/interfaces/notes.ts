export interface NoteData {
  id: string;
  slug: string;
  title: string;
  description: string;
  detailedDescription: string;
  category: 'cheat-sheet' | 'interview-prep' | 'reference' | 'quick-lookup';
  tags: string[];
  content: string;
  lastUpdated: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  searchKeywords?: string[];
}