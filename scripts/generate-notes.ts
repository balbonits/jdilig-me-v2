#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { NoteData } from '../src/interfaces/notes';

const NOTES_MARKDOWN_DIR = path.join(__dirname, '../src/notes/markdown');
const OUTPUT_DIR = path.join(__dirname, '../public');

interface NoteFrontmatter {
  id: string;
  slug: string;
  title: string;
  description: string;
  detailedDescription?: string;
  category: 'cheat-sheet' | 'interview-prep' | 'reference' | 'quick-lookup';
  tags: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: string;
  searchKeywords?: string[];
}

function parseFrontmatter(fileContent: string): { frontmatter: NoteFrontmatter; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('No frontmatter found in markdown file');
  }
  
  const frontmatterContent = match[1];
  const content = match[2].trim();
  
  // Parse YAML-like frontmatter
  const frontmatter: Partial<NoteFrontmatter> = {};
  const lines = frontmatterContent.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;
    
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex === -1) continue;
    
    const key = trimmedLine.substring(0, colonIndex).trim();
    let value = trimmedLine.substring(colonIndex + 1).trim();
    
    // Handle arrays (tags, searchKeywords)
    if (value.startsWith('[') && value.endsWith(']')) {
      const arrayContent = value.slice(1, -1);
      frontmatter[key as keyof NoteFrontmatter] = arrayContent
        .split(',')
        .map(item => item.trim().replace(/^['"]|['"]$/g, '')) as any;
    } else {
      // Remove quotes if present
      value = value.replace(/^['"]|['"]$/g, '');
      (frontmatter as any)[key] = value;
    }
  }
  
  return { 
    frontmatter: frontmatter as NoteFrontmatter, 
    content 
  };
}

async function generateNotesJSON() {
  // Ensure public directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Get all markdown files
  const markdownFiles = fs.readdirSync(NOTES_MARKDOWN_DIR)
    .filter(file => file.endsWith('.md'))
    .sort();

  const notes: NoteData[] = [];

  for (const file of markdownFiles) {
    const filePath = path.join(NOTES_MARKDOWN_DIR, file);
    const fileName = path.basename(file, '.md');
    
    try {
      console.log(`Processing ${fileName}...`);
      
      // Read the markdown file
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      
      // Parse frontmatter and content
      const { frontmatter, content } = parseFrontmatter(fileContent);
      
      if (!frontmatter.id || !frontmatter.slug || !frontmatter.title) {
        console.warn(`Skipping ${fileName}: missing required frontmatter (id, slug, title)`);
        continue;
      }
      
      // Create NoteData object
      const noteData: NoteData = {
        id: frontmatter.id,
        slug: frontmatter.slug,
        title: frontmatter.title,
        description: frontmatter.description,
        detailedDescription: frontmatter.detailedDescription || frontmatter.description,
        category: frontmatter.category,
        tags: frontmatter.tags || [],
        content: content,
        lastUpdated: frontmatter.lastUpdated,
        difficulty: frontmatter.difficulty,
        searchKeywords: frontmatter.searchKeywords
      };
      
      notes.push(noteData);
      console.log(`✓ Processed ${fileName}`);
      
    } catch (error) {
      console.error(`Error processing ${fileName}:`, error);
    }
  }

  // Write notes.json (minified for production)
  const outputPath = path.join(OUTPUT_DIR, 'notes.json');
  const minifiedJSON = JSON.stringify(notes);
  fs.writeFileSync(outputPath, minifiedJSON);
  
  const fileSizeKB = (Buffer.byteLength(minifiedJSON, 'utf8') / 1024).toFixed(1);
  console.log(`\n✅ Generated notes.json with ${notes.length} notes`);
  console.log(`📄 Output: ${outputPath} (${fileSizeKB} KB minified)`);
  
  // Validate generated data
  const uniqueSlugs = new Set(notes.map(note => note.slug));
  if (uniqueSlugs.size !== notes.length) {
    console.warn('⚠️ Warning: Duplicate slugs found in notes data');
  }
  
  const categories = [...new Set(notes.map(note => note.category))];
  console.log(`📊 Categories: ${categories.join(', ')}`);
  
  const tags = [...new Set(notes.flatMap(note => note.tags))];
  console.log(`🏷️ Unique tags: ${tags.length}`);
  
  return notes;
}

// Run if called directly
if (require.main === module) {
  generateNotesJSON()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Failed to generate notes JSON:', error);
      process.exit(1);
    });
}

export { generateNotesJSON };