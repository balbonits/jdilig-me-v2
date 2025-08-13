#!/usr/bin/env ts-node

/**
 * Project Generation Script
 * 
 * Processes individual project JSON files into a consolidated projects.json
 * Similar to how exercises and utilities are processed
 * 
 * Usage:
 *   npm run generate:projects
 */

import * as fs from 'fs';
import * as path from 'path';
import { ProjectData } from '@/interfaces/projects';

// Configuration
const PROJECTS_DIR = path.join(process.cwd(), 'projects');
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'projects.json');
const OUTPUT_INDEX_FILE = path.join(process.cwd(), 'public', 'projects-index.json');

interface ProjectSummary {
  slug: string;
  title: string;
  description: string;
  category: string;
  status: string;
  featured: boolean;
  links: { type: string; url: string; label: string }[];
}

class ProjectGenerator {
  private projects: ProjectData[] = [];
  private summaries: ProjectSummary[] = [];

  /**
   * Load and validate a single project JSON file
   */
  private loadProject(filePath: string): ProjectData | null {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const project = JSON.parse(content) as ProjectData;
      
      // Basic validation
      if (!project.slug || !project.metadata?.title) {
        console.error(`❌ Invalid project structure in ${path.basename(filePath)}`);
        return null;
      }
      
      // Ensure required fields have defaults
      project.screenshots = project.screenshots || [];
      project.metrics = project.metrics || [];
      project.lessons = project.lessons || [];
      project.challenges = project.challenges || [];
      project.futureImprovements = project.futureImprovements || [];
      
      return project;
    } catch (error) {
      console.error(`❌ Error loading ${path.basename(filePath)}:`, error);
      return null;
    }
  }

  /**
   * Create project summary for index
   */
  private createSummary(project: ProjectData): ProjectSummary {
    return {
      slug: project.slug,
      title: project.metadata.title,
      description: project.metadata.description,
      category: project.metadata.category,
      status: project.metadata.status,
      featured: project.metadata.featured,
      links: project.links
    };
  }

  /**
   * Process all project files
   */
  private processProjects(): void {
    if (!fs.existsSync(PROJECTS_DIR)) {
      console.error(`❌ Projects directory not found: ${PROJECTS_DIR}`);
      console.log('💡 Create it with: mkdir projects');
      return;
    }

    const files = fs.readdirSync(PROJECTS_DIR)
      .filter(file => file.endsWith('.json'))
      .sort();

    if (files.length === 0) {
      console.log('⚠️  No project JSON files found in projects/');
      return;
    }

    console.log(`🔍 Found ${files.length} project files`);

    for (const file of files) {
      const filePath = path.join(PROJECTS_DIR, file);
      console.log(`Processing ${file}...`);
      
      const project = this.loadProject(filePath);
      if (project) {
        this.projects.push(project);
        this.summaries.push(this.createSummary(project));
        console.log(`✓ Processed ${file}`);
      }
    }
  }

  /**
   * Sort projects by featured status and title
   */
  private sortProjects(): void {
    this.projects.sort((a, b) => {
      // Featured projects first
      if (a.metadata.featured !== b.metadata.featured) {
        return a.metadata.featured ? -1 : 1;
      }
      // Then by title
      return a.metadata.title.localeCompare(b.metadata.title);
    });

    this.summaries.sort((a, b) => {
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }
      return a.title.localeCompare(b.title);
    });
  }

  /**
   * Write consolidated JSON files
   */
  private writeOutputFiles(): void {
    // Ensure public directory exists
    const publicDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Write full projects data
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(this.projects, null, 2));
    const fullSize = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1);
    console.log(`📄 Generated ${OUTPUT_FILE} (${fullSize} KB)`);

    // Write projects index/summary
    fs.writeFileSync(OUTPUT_INDEX_FILE, JSON.stringify(this.summaries, null, 2));
    const indexSize = (fs.statSync(OUTPUT_INDEX_FILE).size / 1024).toFixed(1);
    console.log(`📄 Generated ${OUTPUT_INDEX_FILE} (${indexSize} KB)`);
  }

  /**
   * Generate project template
   */
  generateTemplate(slug: string): void {
    const templatePath = path.join(PROJECTS_DIR, `${slug}.json`);
    
    if (fs.existsSync(templatePath)) {
      console.error(`❌ Project ${slug} already exists`);
      return;
    }

    // Ensure projects directory exists
    if (!fs.existsSync(PROJECTS_DIR)) {
      fs.mkdirSync(PROJECTS_DIR, { recursive: true });
    }

    const template: ProjectData = {
      slug,
      metadata: {
        title: slug.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        name: slug,
        description: "Brief description of what this project does and its main value proposition.",
        detailedDescription: "More comprehensive description explaining the project's purpose, target users, key features, and what makes it unique or noteworthy.",
        category: "Full-Stack Development", // or Mobile Development, Data Science, etc.
        status: "completed", // or in-progress, planned, archived
        startDate: "2024-01",
        endDate: "2024-03",
        duration: "3 months",
        role: "Full-Stack Developer",
        team: "Solo project", // optional
        difficulty: "Medium", // Beginner, Easy, Medium, Hard, Expert
        featured: false
      },
      techStack: [
        {
          category: "Frontend Framework",
          items: ["React", "TypeScript", "Next.js"]
        },
        {
          category: "Styling & Design",
          items: ["Tailwind CSS", "CSS Modules"]
        },
        {
          category: "Backend & Database",
          items: ["Node.js", "PostgreSQL"]
        }
      ],
      features: [
        {
          title: "Feature Name",
          description: "What this feature does and how it helps users",
          impact: "Quantifiable impact or benefit (optional)"
        }
      ],
      metrics: [
        {
          label: "Performance",
          value: "95/100",
          description: "Lighthouse score"
        }
      ],
      highlights: [
        {
          title: "Technical Achievement",
          description: "Description of complex implementation or problem solved",
          code: "// Optional code example\nconst example = 'code snippet';",
          achievements: [
            "Specific accomplishment 1",
            "Specific accomplishment 2"
          ]
        }
      ],
      screenshots: [
        {
          src: `/images/projects/${slug}/01-desktop-homepage-desktop.webp`,
          alt: "Description for screen readers",
          caption: "Homepage Overview",
          category: "desktop"
        }
      ],
      links: [
        {
          type: "live",
          url: "https://example.com",
          label: "Live Demo"
        },
        {
          type: "github",
          url: "https://github.com/username/repo",
          label: "Source Code"
        }
      ],
      lessons: [
        "Key lesson learned during development",
        "Another important insight gained"
      ],
      challenges: [
        "Major challenge overcome",
        "Technical problem solved"
      ],
      futureImprovements: [
        "Planned enhancement",
        "Feature to add next"
      ]
    };

    fs.writeFileSync(templatePath, JSON.stringify(template, null, 2));
    console.log(`✅ Created project template: ${templatePath}`);
    console.log(`📝 Next steps:`);
    console.log(`   1. Edit ${templatePath} with your project details`);
    console.log(`   2. Add images to raw-images/${slug}/`);
    console.log(`   3. Run: npm run process-images ${slug}`);
    console.log(`   4. Run: npm run generate:projects`);
  }

  /**
   * Main generation function
   */
  run(): void {
    const command = process.argv[2];
    
    if (command === 'create' || command === 'new') {
      const slug = process.argv[3];
      if (!slug) {
        console.error('❌ Please provide a project slug');
        console.log('Usage: npm run generate:projects create my-project-slug');
        return;
      }
      this.generateTemplate(slug);
      return;
    }

    console.log('🚀 Generating projects JSON...\n');
    
    this.processProjects();
    
    if (this.projects.length === 0) {
      console.log('⚠️  No valid projects found');
      return;
    }
    
    this.sortProjects();
    this.writeOutputFiles();
    
    const featuredCount = this.projects.filter(p => p.metadata.featured).length;
    console.log(`\n✅ Generated projects.json with ${this.projects.length} projects`);
    console.log(`📌 Featured: ${featuredCount} projects`);
    console.log(`🗂️  Categories: ${[...new Set(this.projects.map(p => p.metadata.category))].join(', ')}`);
  }
}

// Run the script
if (require.main === module) {
  const generator = new ProjectGenerator();
  generator.run();
}

export default ProjectGenerator;