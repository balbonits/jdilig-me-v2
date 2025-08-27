import fs from 'fs';
import path from 'path';

interface PackageJson {
  version: string;
  [key: string]: any;
}

/**
 * Get the current version from package.json
 */
export function getCurrentVersion(): string {
  try {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson: PackageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    return packageJson.version;
  } catch (error) {
    console.warn('Could not read version from package.json:', error);
    return '1.0.0'; // fallback version
  }
}

/**
 * Generate version info JSON for the frontend
 */
function generateVersionInfo(): void {
  const version = getCurrentVersion();
  const buildTime = new Date().toISOString();
  
  const versionInfo = {
    version,
    buildTime,
    commit: process.env.GITHUB_SHA || 'unknown',
    branch: process.env.GITHUB_REF_NAME || 'unknown'
  };
  
  const outputPath = path.join(process.cwd(), 'public/version.json');
  fs.writeFileSync(outputPath, JSON.stringify(versionInfo, null, 2));
  
  console.log(`✅ Generated version.json with version ${version}`);
}

// Run if called directly
if (require.main === module) {
  generateVersionInfo();
}