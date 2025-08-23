/**
 * GitHub Fetcher Utilities - FUTURE RELEASE
 * 
 * Utilities for fetching files and images from GitHub repositories
 * and copying them to our local public folder.
 * 
 * STATUS: Scaffolded for future implementation
 */

import fs from 'fs/promises';
import path from 'path';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';

/**
 * Extracts owner and repo name from GitHub URL
 */
export function parseGitHubUrl(url: string): { owner: string; repo: string } {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) {
    throw new Error(`Invalid GitHub URL: ${url}`);
  }
  return { owner: match[1], repo: match[2] };
}

/**
 * Fetches a text file from GitHub
 */
export async function fetchGitHubFile(
  repoUrl: string, 
  filePath: string
): Promise<string> {
  const { owner, repo } = parseGitHubUrl(repoUrl);
  
  // Use raw.githubusercontent.com for direct file access
  const rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${filePath}`;
  
  console.log(`  📥 Fetching: ${filePath}`);
  
  const response = await fetch(rawUrl);
  
  if (!response.ok) {
    // Try 'master' branch if 'main' fails
    const masterUrl = `https://raw.githubusercontent.com/${owner}/${repo}/master/${filePath}`;
    const masterResponse = await fetch(masterUrl);
    
    if (!masterResponse.ok) {
      throw new Error(`Failed to fetch ${filePath} from ${repoUrl}`);
    }
    
    return masterResponse.text();
  }
  
  return response.text();
}

/**
 * Downloads an image from GitHub and saves it locally
 */
export async function downloadGitHubImage(
  repoUrl: string,
  imagePath: string,
  outputPath: string
): Promise<void> {
  const { owner, repo } = parseGitHubUrl(repoUrl);
  
  // Try main branch first, then master
  const urls = [
    `https://raw.githubusercontent.com/${owner}/${repo}/main/${imagePath}`,
    `https://raw.githubusercontent.com/${owner}/${repo}/master/${imagePath}`
  ];
  
  let downloaded = false;
  
  for (const url of urls) {
    try {
      const response = await fetch(url);
      
      if (response.ok) {
        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        await fs.mkdir(outputDir, { recursive: true });
        
        // Download and save the image
        const buffer = await response.arrayBuffer();
        await fs.writeFile(outputPath, Buffer.from(buffer));
        
        console.log(`  ✓ Downloaded: ${path.basename(imagePath)}`);
        downloaded = true;
        break;
      }
    } catch (error) {
      // Try next URL
      continue;
    }
  }
  
  if (!downloaded) {
    throw new Error(`Failed to download ${imagePath} from ${repoUrl}`);
  }
}

/**
 * Copies all project images from GitHub to local public folder
 */
export async function copyProjectImages(
  projectSlug: string,
  repoUrl: string,
  screenshots: Array<{ src: string; alt: string; caption: string; category: string }>
): Promise<Array<{ src: string; alt: string; caption: string; category: string }>> {
  const localScreenshots = [];
  
  console.log(`  🖼️  Copying images for ${projectSlug}...`);
  
  for (const screenshot of screenshots) {
    try {
      // Extract image path from GitHub URL
      const match = screenshot.src.match(/showcase\/images\/(.+)$/);
      if (!match) {
        console.warn(`  ⚠️  Skipping invalid image URL: ${screenshot.src}`);
        continue;
      }
      
      const imageName = match[1];
      const localPath = `/images/projects/${projectSlug}/${imageName}`;
      const outputPath = path.join(process.cwd(), 'public', localPath);
      
      // Download image from GitHub to local
      await downloadGitHubImage(
        repoUrl,
        `showcase/images/${imageName}`,
        outputPath
      );
      
      // Update screenshot with local path
      localScreenshots.push({
        ...screenshot,
        src: localPath // Now using our domain
      });
      
    } catch (error) {
      console.error(`  ✗ Failed to copy image: ${error}`);
      // Keep original URL as fallback
      localScreenshots.push(screenshot);
    }
  }
  
  return localScreenshots;
}

/**
 * Cleans up old project images before fetching new ones
 */
export async function cleanProjectImages(projectSlug: string): Promise<void> {
  const projectImagesDir = path.join(
    process.cwd(), 
    'public', 
    'images', 
    'projects', 
    projectSlug
  );
  
  try {
    // Remove old images directory
    await fs.rm(projectImagesDir, { recursive: true, force: true });
    console.log(`  🧹 Cleaned old images for ${projectSlug}`);
  } catch (error) {
    // Directory might not exist, that's ok
  }
}

/**
 * Validates that all required images exist locally
 */
export async function validateLocalImages(
  screenshots: Array<{ src: string }>
): Promise<boolean> {
  for (const screenshot of screenshots) {
    if (screenshot.src.startsWith('/')) {
      // Local path
      const fullPath = path.join(process.cwd(), 'public', screenshot.src);
      try {
        await fs.access(fullPath);
      } catch {
        console.warn(`  ⚠️  Missing local image: ${screenshot.src}`);
        return false;
      }
    }
  }
  return true;
}