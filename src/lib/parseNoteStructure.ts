
export interface NoteTab {
  id: string;
  title: string;
  content: string;
}

export interface NoteSubSection {
  id: string;
  title: string;
  content: string;
  tabs: NoteTab[];
}

export interface NoteSection {
  id: string;
  title: string;
  content: string;
  subSections: NoteSubSection[];
}

export interface ParsedNoteStructure {
  title: string;
  intro: string;
  sections: NoteSection[];
}

/**
 * Parse markdown content into hierarchical structure
 * Level 1: # (page title)
 * Level 2: ## (main sections)
 * Level 3: ### (sub-sections)
 * Level 4: #### (tabs)
 */
export function parseNoteStructure(markdown: string): ParsedNoteStructure {
  const lines = markdown.split('\n');
  const structure: ParsedNoteStructure = {
    title: '',
    intro: '',
    sections: []
  };
  
  let currentSection: NoteSection | null = null;
  let currentSubSection: NoteSubSection | null = null;
  let currentTab: NoteTab | null = null;
  let currentContent: string[] = [];
  const introContent: string[] = [];
  let inFrontmatter = false;
  
  const createId = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };
  
  const saveCurrentContent = () => {
    const content = currentContent.join('\n').trim();
    
    if (currentTab && currentSubSection) {
      currentTab.content = content;
    } else if (currentSubSection && currentSection) {
      if (!currentSubSection.content) {
        currentSubSection.content = content;
      }
    } else if (currentSection) {
      if (!currentSection.content) {
        currentSection.content = content;
      }
    } else if (!structure.title) {
      introContent.push(content);
    }
    
    currentContent = [];
  };
  
  for (const line of lines) {
    // Handle frontmatter
    if (line === '---') {
      if (!inFrontmatter && currentContent.length === 0) {
        inFrontmatter = true;
        continue;
      } else if (inFrontmatter) {
        inFrontmatter = false;
        continue;
      }
    }
    
    if (inFrontmatter) {
      continue;
    }
    
    // Level 1: Page Title
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      saveCurrentContent();
      structure.title = line.replace(/^#\s+/, '');
      structure.intro = introContent.join('\n').trim();
      continue;
    }
    
    // Level 2: Main Section
    if (line.startsWith('## ') && !line.startsWith('### ')) {
      saveCurrentContent();
      
      const title = line.replace(/^##\s+/, '');
      currentSection = {
        id: createId(title),
        title,
        content: '',
        subSections: []
      };
      currentSubSection = null;
      currentTab = null;
      structure.sections.push(currentSection);
      continue;
    }
    
    // Level 3: Sub-Section
    if (line.startsWith('### ') && !line.startsWith('#### ')) {
      saveCurrentContent();
      
      const title = line.replace(/^###\s+/, '');
      currentSubSection = {
        id: createId(title),
        title,
        content: '',
        tabs: []
      };
      currentTab = null;
      
      if (currentSection) {
        currentSection.subSections.push(currentSubSection);
      }
      continue;
    }
    
    // Level 4: Tab
    if (line.startsWith('#### ')) {
      saveCurrentContent();
      
      const title = line.replace(/^####\s+/, '');
      currentTab = {
        id: createId(title),
        title,
        content: ''
      };
      
      if (currentSubSection) {
        currentSubSection.tabs.push(currentTab);
      }
      continue;
    }
    
    // Regular content
    currentContent.push(line);
  }
  
  // Save any remaining content
  saveCurrentContent();
  
  return structure;
}

