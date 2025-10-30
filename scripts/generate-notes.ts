#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { NoteData } from '../src/interfaces/notes';

const CODE_NOTES_DIR = path.join(__dirname, '../notes/code');
const UI_NOTES_DIR = path.join(__dirname, '../notes/ui');
const UI_COMPONENTS_DIR = path.join(__dirname, '../ui-components');
const OUTPUT_DIR = path.join(__dirname, '../public');

interface NoteFrontmatter {
  id: string;
  slug: string;
  title: string;
  description: string;
  detailedDescription?: string;
  category: 'cheat-sheet' | 'interview-prep' | 'reference' | 'quick-lookup' | 'ui-fundamentals' | 'ui-patterns';
  tags: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  lastUpdated: string;
  searchKeywords?: string[];
  type?: 'code' | 'ui'; // New field to distinguish note types
}

function parseFrontmatter(fileContent: string, defaultType: 'code' | 'ui' = 'code'): { frontmatter: NoteFrontmatter; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    // If no frontmatter, return the entire content and create minimal frontmatter
    return {
      frontmatter: {} as NoteFrontmatter,
      content: fileContent.trim()
    };
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

  // Set default type if not specified
  if (!frontmatter.type) {
    frontmatter.type = defaultType;
  }

  return {
    frontmatter: frontmatter as NoteFrontmatter,
    content
  };
}

async function processNotesDirectory(
  directory: string,
  noteType: 'code' | 'ui' | 'ui-component',
  filePattern: RegExp = /\.md$/
): Promise<NoteData[]> {
  const notes: NoteData[] = [];

  if (!fs.existsSync(directory)) {
    console.warn(`Directory does not exist: ${directory}`);
    return notes;
  }

  // For UI components in subdirectories (ui-components/)
  if (noteType === 'ui-component') {
    const subdirs = fs.readdirSync(directory)
      .filter(item => {
        const itemPath = path.join(directory, item);
        return fs.statSync(itemPath).isDirectory();
      });

    for (const subdir of subdirs) {
      const subdirPath = path.join(directory, subdir);
      const mdFile = path.join(subdirPath, `${subdir}.md`);

      if (fs.existsSync(mdFile)) {
        try {
          console.log(`Processing UI component: ${subdir}...`);

          const fileContent = fs.readFileSync(mdFile, 'utf-8');
          const { frontmatter, content } = parseFrontmatter(fileContent, 'ui');

          // Create NoteData object with UI-specific defaults
          const noteData: NoteData = {
            id: frontmatter.id || `ui-${subdir}`,
            slug: frontmatter.slug || subdir,
            title: frontmatter.title || subdir.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            description: frontmatter.description || `UI component documentation for ${subdir}`,
            detailedDescription: frontmatter.detailedDescription || frontmatter.description || `UI component documentation for ${subdir}`,
            category: frontmatter.category || 'ui-patterns',
            tags: frontmatter.tags || ['ui', 'component'],
            content: content,
            lastUpdated: frontmatter.lastUpdated || new Date().toISOString(),
            difficulty: frontmatter.difficulty,
            searchKeywords: frontmatter.searchKeywords
          } as NoteData;

          notes.push(noteData);
          console.log(`✓ Processed UI component: ${subdir}`);
        } catch (error) {
          console.error(`Error processing UI component ${subdir}:`, error);
        }
      }
    }
  } else {
    // For regular markdown files (code notes and UI notes)
    const markdownFiles = fs.readdirSync(directory)
      .filter(file => filePattern.test(file))
      .sort();

    for (const file of markdownFiles) {
      const filePath = path.join(directory, file);
      const fileName = path.basename(file, '.md');

      try {
        const typeLabel = noteType === 'ui' ? 'UI note' : 'code note';
        console.log(`Processing ${typeLabel}: ${fileName}...`);

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { frontmatter, content } = parseFrontmatter(fileContent, noteType);

        // Use filename as fallback for missing required fields
        const id = frontmatter.id || fileName;
        const slug = frontmatter.slug || fileName;
        const title = frontmatter.title || fileName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const description = frontmatter.description || `Documentation for ${title}`;

        if (!id || !slug || !title) {
          console.warn(`Skipping ${fileName}: unable to determine required fields (id, slug, title)`);
          continue;
        }

        // Create NoteData object
        const noteData: NoteData = {
          id,
          slug,
          title,
          description,
          detailedDescription: frontmatter.detailedDescription || description,
          category: frontmatter.category || (noteType === 'ui' ? 'ui-fundamentals' : 'reference'),
          tags: frontmatter.tags || [],
          content: content,
          lastUpdated: frontmatter.lastUpdated || new Date().toISOString(),
          difficulty: frontmatter.difficulty,
          searchKeywords: frontmatter.searchKeywords
        } as NoteData;

        notes.push(noteData);
        console.log(`✓ Processed ${typeLabel}: ${fileName}`);

      } catch (error) {
        console.error(`Error processing ${fileName}:`, error);
      }
    }
  }

  return notes;
}

async function generateNotesJSON() {
  // Ensure public directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('🔍 Processing Code Notes...');
  const codeNotes = await processNotesDirectory(CODE_NOTES_DIR, 'code');

  console.log('\n🎨 Processing UI Notes...');
  const uiNotes = await processNotesDirectory(UI_NOTES_DIR, 'ui');

  console.log('\n🧩 Processing UI Components...');
  const uiComponents = await processNotesDirectory(UI_COMPONENTS_DIR, 'ui-component');

  // Combine all notes
  const allNotes = [...codeNotes, ...uiNotes, ...uiComponents];

  // Generate separate JSON files for each category
  // 1. All notes combined
  const allNotesPath = path.join(OUTPUT_DIR, 'notes.json');
  fs.writeFileSync(allNotesPath, JSON.stringify(allNotes));

  // 2. Code notes only
  const codeNotesPath = path.join(OUTPUT_DIR, 'code-notes.json');
  fs.writeFileSync(codeNotesPath, JSON.stringify(codeNotes));

  // 3. UI notes (markdown + components combined)
  const allUiNotes = [...uiNotes, ...uiComponents];
  const uiNotesPath = path.join(OUTPUT_DIR, 'ui-notes.json');
  fs.writeFileSync(uiNotesPath, JSON.stringify(allUiNotes));

  // Statistics
  const allNotesSize = (Buffer.byteLength(JSON.stringify(allNotes), 'utf8') / 1024).toFixed(1);
  const codeNotesSize = (Buffer.byteLength(JSON.stringify(codeNotes), 'utf8') / 1024).toFixed(1);
  const uiNotesSize = (Buffer.byteLength(JSON.stringify(allUiNotes), 'utf8') / 1024).toFixed(1);

  console.log('\n📊 Generation Summary:');
  console.log(`✅ Generated notes.json with ${allNotes.length} total notes (${allNotesSize} KB)`);
  console.log(`   📝 Code notes: ${codeNotes.length} notes (${codeNotesSize} KB)`);
  console.log(`   🎨 UI notes: ${uiNotes.length} markdown + ${uiComponents.length} components = ${allUiNotes.length} total (${uiNotesSize} KB)`);

  // Validate generated data
  const uniqueSlugs = new Set(allNotes.map(note => note.slug));
  if (uniqueSlugs.size !== allNotes.length) {
    console.warn('⚠️ Warning: Duplicate slugs found in notes data');
    const duplicates = allNotes.filter((note, index, self) =>
      self.findIndex(n => n.slug === note.slug) !== index
    );
    duplicates.forEach(dup => console.warn(`  - Duplicate slug: ${dup.slug}`));
  }

  const categories = [...new Set(allNotes.map(note => note.category))];
  console.log(`\n📂 Categories: ${categories.join(', ')}`);

  const tags = [...new Set(allNotes.flatMap(note => note.tags))];
  console.log(`🏷️ Unique tags: ${tags.length}`);

  return allNotes;
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