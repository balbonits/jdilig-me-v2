#!/usr/bin/env ts-node

/**
 * Project Image Processing Script
 * 
 * Automatically processes images for project showcases:
 * - Resizes to standard dimensions
 * - Optimizes file sizes
 * - Generates multiple formats (WebP, PNG)
 * - Creates responsive variants
 * 
 * Usage:
 *   npm run process-images [project-slug]
 *   npm run process-images all
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

// Image processing configuration
const IMAGE_CONFIG = {
  desktop: {
    width: 1200,
    height: 800,
    quality: 85,
    suffix: 'desktop'
  },
  mobile: {
    width: 375,
    height: 667,
    quality: 85,
    suffix: 'mobile'
  },
  tablet: {
    width: 768,
    height: 1024,
    quality: 85,
    suffix: 'tablet'
  },
  feature: {
    width: 800,
    height: 600,
    quality: 90,
    suffix: 'feature'
  },
  thumbnail: {
    width: 400,
    height: 300,
    quality: 80,
    suffix: 'thumb'
  }
};

// Supported input formats
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp'];

// Output formats to generate
const OUTPUT_FORMATS = ['webp', 'png'];

interface ProcessingOptions {
  projectSlug?: string;
  inputDir?: string;
  outputDir?: string;
  formats?: string[];
  skipOptimization?: boolean;
}

class ImageProcessor {
  private inputDir: string;
  private outputDir: string;
  private options: ProcessingOptions;

  constructor(options: ProcessingOptions = {}) {
    this.options = options;
    this.inputDir = options.inputDir || path.join(process.cwd(), 'projects');
    this.outputDir = options.outputDir || path.join(process.cwd(), 'public', 'images', 'projects');
  }

  /**
   * Check if ImageMagick is installed
   */
  private checkDependencies(): boolean {
    try {
      execSync('magick -version', { stdio: 'ignore' });
      return true;
    } catch {
      console.error('❌ ImageMagick not found. Please install it:');
      console.error('  macOS: brew install imagemagick');
      console.error('  Ubuntu: sudo apt-get install imagemagick');
      console.error('  Windows: Download from https://imagemagick.org/script/download.php');
      return false;
    }
  }

  /**
   * Create directory structure for project
   */
  private ensureDirectories(projectSlug: string): void {
    const projectDir = path.join(this.outputDir, projectSlug);
    
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
      console.log(`📁 Created directory: ${projectDir}`);
    }
  }

  /**
   * Get all image files from input directory
   */
  private getImageFiles(projectPath: string): string[] {
    if (!fs.existsSync(projectPath)) {
      console.error(`❌ Directory not found: ${projectPath}`);
      return [];
    }

    return fs.readdirSync(projectPath)
      .filter(file => SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase()))
      .map(file => path.join(projectPath, file));
  }

  /**
   * Determine image category from filename using naming convention
   * 
   * Naming Convention:
   * - [number]-desktop-[description].ext  → desktop category
   * - [number]-mobile-[description].ext   → mobile category
   * - [number]-tablet-[description].ext   → tablet category
   * - [number]-feature-[description].ext  → feature category
   * 
   * Examples:
   * - 01-desktop-homepage.png
   * - 02-mobile-login.jpg
   * - 03-feature-dashboard.png
   */
  private categorizeImage(filename: string): keyof typeof IMAGE_CONFIG {
    const name = filename.toLowerCase();
    const parts = name.split('-');
    
    if (parts.length >= 2) {
      const categoryPart = parts[1];
      
      if (categoryPart === 'mobile') return 'mobile';
      if (categoryPart === 'tablet') return 'tablet';
      if (categoryPart === 'feature') return 'feature';
      if (categoryPart === 'desktop') return 'desktop';
    }
    
    // Default to desktop if no valid category found
    return 'desktop';
  }

  /**
   * Process a single image with ImageMagick
   */
  private async processImage(
    inputPath: string, 
    outputPath: string, 
    config: typeof IMAGE_CONFIG[keyof typeof IMAGE_CONFIG],
    format: string
  ): Promise<void> {
    const outputFile = outputPath.replace(/\.[^.]+$/, `.${format}`);
    
    try {
      // ImageMagick command for resizing and optimization
      const cmd = [
        'magick',
        `"${inputPath}"`,
        '-resize', `${config.width}x${config.height}^`,
        '-gravity', 'center',
        '-extent', `${config.width}x${config.height}`,
        '-quality', config.quality.toString(),
        '-strip', // Remove metadata
        '-interlace', 'Plane', // Progressive loading
        format === 'webp' ? '-define webp:lossless=false' : '',
        `"${outputFile}"`
      ].filter(Boolean).join(' ');

      execSync(cmd, { stdio: 'pipe' });
      
      const stats = fs.statSync(outputFile);
      const sizeKB = Math.round(stats.size / 1024);
      console.log(`   ✅ ${path.basename(outputFile)} (${config.width}x${config.height}, ${sizeKB}KB)`);
      
    } catch (error) {
      console.error(`   ❌ Failed to process ${inputPath}:`, error);
    }
  }

  /**
   * Generate multiple responsive variants of an image
   */
  private async processImageVariants(inputPath: string, projectSlug: string): Promise<void> {
    const filename = path.basename(inputPath, path.extname(inputPath));
    const category = this.categorizeImage(filename);
    const config = IMAGE_CONFIG[category];
    
    console.log(`📸 Processing: ${path.basename(inputPath)} (${category})`);
    
    // Process for each output format
    for (const format of (this.options.formats || OUTPUT_FORMATS)) {
      const outputPath = path.join(
        this.outputDir, 
        projectSlug, 
        `${filename}-${config.suffix}.${format}`
      );
      
      await this.processImage(inputPath, outputPath, config, format);
    }

    // Generate thumbnail variant for all images
    if (category !== 'thumbnail') {
      const thumbConfig = IMAGE_CONFIG.thumbnail;
      for (const format of (this.options.formats || OUTPUT_FORMATS)) {
        const thumbPath = path.join(
          this.outputDir,
          projectSlug,
          `${filename}-${thumbConfig.suffix}.${format}`
        );
        
        await this.processImage(inputPath, thumbPath, thumbConfig, format);
      }
    }
  }

  /**
   * Process all images for a project
   */
  async processProject(projectSlug: string): Promise<void> {
    console.log(`\n🚀 Processing images for project: ${projectSlug}`);
    
    // New structure: projects/{project-name}/images/
    const inputPath = path.join(this.inputDir, projectSlug, 'images');
    const imageFiles = this.getImageFiles(inputPath);
    
    if (imageFiles.length === 0) {
      console.log(`⚠️  No images found in ${inputPath}`);
      return;
    }
    
    this.ensureDirectories(projectSlug);
    
    for (const imagePath of imageFiles) {
      await this.processImageVariants(imagePath, projectSlug);
    }
    
    console.log(`✅ Processed ${imageFiles.length} images for ${projectSlug}`);
  }

  /**
   * Process all projects
   */
  async processAllProjects(): Promise<void> {
    console.log('\n🚀 Processing images for all projects...');
    
    if (!fs.existsSync(this.inputDir)) {
      console.error(`❌ Input directory not found: ${this.inputDir}`);
      console.log('💡 Create the directory and add your raw images:');
      console.log(`   mkdir -p ${this.inputDir}/[project-slug]`);
      return;
    }
    
    const projectDirs = fs.readdirSync(this.inputDir)
      .filter(item => fs.statSync(path.join(this.inputDir, item)).isDirectory());
    
    if (projectDirs.length === 0) {
      console.log(`⚠️  No project directories found in ${this.inputDir}`);
      return;
    }
    
    for (const projectSlug of projectDirs) {
      await this.processProject(projectSlug);
    }
    
    console.log(`\n🎉 Finished processing ${projectDirs.length} projects!`);
  }

  /**
   * Generate usage instructions
   */
  generateInstructions(): void {
    console.log('\n📋 **Image Processing Setup Instructions**\n');
    console.log('1. Install ImageMagick:');
    console.log('   macOS: brew install imagemagick');
    console.log('   Ubuntu: sudo apt-get install imagemagick');
    console.log('   Windows: Download from https://imagemagick.org/script/download.php\n');
    
    console.log('2. Create project folders with images:');
    console.log('   projects/');
    console.log('   ├── my-project-1/');
    console.log('   │   ├── my-project-1.ts       # Project data');
    console.log('   │   └── images/               # Raw images');
    console.log('   │       ├── 01-desktop-homepage.png');
    console.log('   │       ├── 02-mobile-login.jpg');
    console.log('   │       └── 03-feature-dashboard.png');
    console.log('   └── my-project-2/');
    console.log('       ├── 01-desktop-main.png');
    console.log('       └── 02-mobile-app.png\n');
    
    console.log('3. Run processing:');
    console.log('   npm run process-images my-project-1  # Process single project');
    console.log('   npm run process-images all           # Process all projects\n');
    
    console.log('4. Output will be generated in:');
    console.log('   public/images/projects/[project-slug]/');
    console.log('   ├── 01-desktop-homepage-desktop.webp');
    console.log('   ├── 01-desktop-homepage-desktop.png');
    console.log('   ├── 02-mobile-login-mobile.webp');
    console.log('   └── 03-feature-dashboard-feature.webp\n');
    
    console.log('💡 **Naming Convention (Required):**');
    console.log('   Format: [number]-[category]-[description].[ext]');
    console.log('');
    console.log('   📋 Parts Explained:');
    console.log('   • number:      Display order (01, 02, 03...) - controls screenshot sequence');
    console.log('   • category:    Device type (desktop, mobile, tablet, feature) - sets output size');
    console.log('   • description: What it shows (homepage, login, dashboard) - for identification');
    console.log('   • ext:         File format (png, jpg) - input format you provide');
    console.log('');
    console.log('   📐 Categories & Output Sizes:');
    console.log('   • desktop → 1200×800px (main views, dashboards)');
    console.log('   • mobile  → 375×667px  (mobile app screens)');
    console.log('   • tablet  → 768×1024px (iPad/tablet views)');
    console.log('   • feature → 800×600px  (component demos, details)');
    console.log('');
    console.log('   ✅ Examples:');
    console.log('   • 01-desktop-homepage.png    (1st screenshot, desktop size, homepage content)');
    console.log('   • 02-mobile-login.jpg        (2nd screenshot, mobile size, login screen)');
    console.log('   • 03-feature-dashboard.png   (3rd screenshot, feature size, dashboard demo)');
  }

  /**
   * Main processing function
   */
  async run(): Promise<void> {
    if (!this.checkDependencies()) {
      this.generateInstructions();
      return;
    }

    const arg = process.argv[2];
    
    if (!arg || arg === 'help' || arg === '--help') {
      this.generateInstructions();
      return;
    }
    
    if (arg === 'all') {
      await this.processAllProjects();
    } else {
      await this.processProject(arg);
    }
  }
}

// Run the script
if (require.main === module) {
  const processor = new ImageProcessor();
  processor.run().catch(console.error);
}

export default ImageProcessor;