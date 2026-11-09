import { useRouter } from 'next/router';

/**
 * Custom hook for screenshot mode functionality
 * 
 * Usage: Add ?screenshot=true to any URL to enable screenshot mode
 * Example: http://localhost:3000?screenshot=true
 * 
 * Features:
 * - Hides share links and external URLs
 * - Can be extended for other screenshot-specific hiding
 * - SSR-safe: prevents hydration mismatches
 */
export function useScreenshotMode() {
  const router = useRouter();
  // router.query is empty until the router is ready, so the server and first client render agree.
  const isScreenshotMode = router.isReady && router.query.screenshot === 'true';
  
  return {
    isScreenshotMode,
    hideShareLinks: isScreenshotMode,
    hideExternalLinks: isScreenshotMode,
  };
}