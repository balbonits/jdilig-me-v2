// URL shortening utility using TinyURL for permanent links

export interface ShortenedUrl {
  original: string;
  shortened: string;
  error?: string;
}

// In-memory cache for shortened URLs to avoid repeated API calls
const urlCache = new Map<string, string>();

export async function shortenUrl(originalUrl: string): Promise<ShortenedUrl> {
  // Check cache first
  if (urlCache.has(originalUrl)) {
    return {
      original: originalUrl,
      shortened: urlCache.get(originalUrl)!
    };
  }

  try {
    // TinyURL API - creates permanent links with no expiration
    const tinyUrlApi = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(originalUrl)}`;
    
    const response = await fetch(tinyUrlApi, {
      method: 'GET',
      headers: {
        'Accept': 'text/plain',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const shortenedUrl = await response.text();
    
    // TinyURL returns "Error" if the URL is invalid
    if (shortenedUrl.startsWith('Error') || shortenedUrl === originalUrl) {
      throw new Error('Failed to shorten URL');
    }

    // Cache the result
    urlCache.set(originalUrl, shortenedUrl);

    return {
      original: originalUrl,
      shortened: shortenedUrl
    };
  } catch (error) {
    console.warn('URL shortening failed:', error);
    
    // Fallback to original URL if shortening fails
    return {
      original: originalUrl,
      shortened: originalUrl,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Utility to get shortened URL with fallback to original
export async function getShortenedUrlSafe(url: string): Promise<string> {
  const result = await shortenUrl(url);
  return result.shortened;
}