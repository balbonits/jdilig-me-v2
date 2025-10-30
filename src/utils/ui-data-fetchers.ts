import fs from 'fs/promises';
import path from 'path';
import { NoteData } from '@/interfaces/notes';
import { UIComponentData } from '@/interfaces/ui-components';

// Use the generated JSON files for UI notes
export async function getUINotesData(): Promise<NoteData[]> {
  try {
    const notesPath = path.join(process.cwd(), 'public', 'ui-notes.json');
    const notesJson = await fs.readFile(notesPath, 'utf-8');
    return JSON.parse(notesJson);
  } catch (error) {
    console.error('Error fetching UI notes data:', error);
    return [];
  }
}

export async function getUINoteSlugs(): Promise<string[]> {
  try {
    const notes = await getUINotesData();
    return notes.map(note => note.slug);
  } catch (error) {
    console.error('Error getting UI note slugs:', error);
    return [];
  }
}

export async function getUINoteBySlug(slug: string): Promise<NoteData | null> {
  try {
    const notes = await getUINotesData();
    return notes.find(note => note.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching UI note ${slug}:`, error);
    return null;
  }
}

// UI Components Data Fetchers
export async function getUIComponentsData(): Promise<UIComponentData[]> {
  try {
    // Load pre-generated JSON file
    const componentsPath = path.join(process.cwd(), 'public', 'ui-components.json');
    const componentsJson = await fs.readFile(componentsPath, 'utf-8');
    return JSON.parse(componentsJson);
  } catch (error) {
    console.error('Error fetching UI components:', error);
    return [];
  }
}

export async function getUIComponentSlugs(): Promise<string[]> {
  try {
    const components = await getUIComponentsData();
    return components.map(c => c.slug);
  } catch (error) {
    console.error('Error getting component slugs:', error);
    return [];
  }
}

export async function getUIComponentBySlug(slug: string): Promise<UIComponentData | null> {
  try {
    const components = await getUIComponentsData();
    return components.find(c => c.slug === slug) || null;
  } catch (error) {
    console.error(`Error fetching component ${slug}:`, error);
    return null;
  }
}

// Client-side fetching functions
export async function fetchUIComponents(): Promise<UIComponentData[]> {
  if (typeof window === 'undefined') {
    // Server-side: use file system
    return getUIComponentsData();
  }

  // Client-side: fetch from public JSON
  const response = await fetch('/ui-components.json');
  if (!response.ok) {
    throw new Error(`Failed to fetch UI components: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function fetchUIComponentBySlug(slug: string): Promise<UIComponentData | undefined> {
  const components = await fetchUIComponents();
  return components.find(component => component.slug === slug);
}

export async function searchUIComponents(keyword: string): Promise<UIComponentData[]> {
  const components = await fetchUIComponents();
  const searchTerm = keyword.toLowerCase();

  return components.filter(component => {
    return (
      component.title.toLowerCase().includes(searchTerm) ||
      component.description.toLowerCase().includes(searchTerm) ||
      component.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      component.searchKeywords?.some(kw => kw.toLowerCase().includes(searchTerm)) ||
      false
    );
  });
}

export async function getRelatedUIComponents(
  currentSlug: string,
  maxRelated = 3
): Promise<UIComponentData[]> {
  const components = await fetchUIComponents();
  const currentComponent = components.find(comp => comp.slug === currentSlug);

  if (!currentComponent) {
    return [];
  }

  // Find components with matching tags
  const relatedComponents = components
    .filter(comp => comp.slug !== currentSlug)
    .map(comp => {
      // Calculate relevance score based on tag overlap
      const tagOverlap = comp.tags.filter(tag =>
        currentComponent.tags.includes(tag)
      ).length;

      return { component: comp, score: tagOverlap };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxRelated)
    .map(item => item.component);

  return relatedComponents;
}

