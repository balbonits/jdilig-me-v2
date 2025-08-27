interface VersionInfo {
  version: string;
  buildTime?: string;
  commit?: string;
  branch?: string;
}

/**
 * Get version information for the application
 */
export async function getVersionInfo(): Promise<VersionInfo> {
  try {
    // In production, try to fetch the generated version.json
    if (typeof window !== 'undefined') {
      const response = await fetch('/version.json');
      if (response.ok) {
        return await response.json();
      }
    }
    
    // Fallback: read from package.json (server-side)
    if (typeof window === 'undefined') {
      const { version } = await import('../../package.json');
      return {
        version,
        buildTime: new Date().toISOString(),
        commit: process.env.VERCEL_GIT_COMMIT_SHA || 'unknown',
        branch: process.env.VERCEL_GIT_COMMIT_REF || 'unknown'
      };
    }
    
    // Final fallback
    return { version: '1.0.0' };
  } catch (error) {
    console.warn('Could not load version info:', error);
    return { version: '1.0.0' };
  }
}

/**
 * Get just the version string (for server-side use)
 */
export async function getVersion(): Promise<string> {
  try {
    const { version } = await import('../../package.json');
    return version;
  } catch {
    return '1.0.0';
  }
}