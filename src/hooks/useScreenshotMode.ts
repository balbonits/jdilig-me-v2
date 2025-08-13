import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

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
  const [isScreenshotMode, setIsScreenshotMode] = useState(false);
  
  useEffect(() => {
    // Only run on client side after hydration
    const screenshot = router.query.screenshot;
    setIsScreenshotMode(screenshot === 'true');
  }, [router.query.screenshot]);
  
  return {
    isScreenshotMode,
    hideShareLinks: isScreenshotMode,
    hideExternalLinks: isScreenshotMode,
  };
}