'use client';

import { useState, useEffect } from 'react';
import { cn, getShortenedUrlSafe } from '@/utils';
import { generateShareUrls, getPageSEO } from '@/lib/seo';
import { getCanonicalUrl } from '@/config/site';
import { useScreenshotMode } from '@/hooks/useScreenshotMode';
import styles from './style.module.css';

interface ShareData {
  title: string;
  text: string;
  url: string;
}

export default function FloatingShare() {
  const { hideShareLinks } = useScreenshotMode();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<string>('');

  // Get current page URL and generate appropriate share text
  const currentUrl = typeof window !== 'undefined' ? window.location.href : getCanonicalUrl();

  // Generate shortened URL when component mounts or URL changes
  useEffect(() => {
    const generateShortenedUrl = async () => {
      const shortened = await getShortenedUrlSafe(currentUrl);
      setShortenedUrl(shortened);
    };

    generateShortenedUrl();
  }, [currentUrl]);
  
  // Get page SEO data using utility functions
  const getPageData = () => {
    if (typeof window === 'undefined') {
      return getPageSEO('/');
    }
    return getPageSEO(window.location.pathname);
  };

  const pageData = getPageData();
  const shareUrl = shortenedUrl || currentUrl;
  const shareText = `${pageData.description} ${shareUrl}`;

  const shareData: ShareData = {
    title: pageData.title || 'John Dilig - Web Developer Portfolio',
    text: shareText,
    url: shareUrl
  };

  // Generate share URLs using utility function
  const shareUrls = generateShareUrls(shareData.url, shareData.title, shareData.text);

  const handleLinkedInShare = () => {
    window.open(shareUrls.linkedin, '_blank', 'width=600,height=600');
  };

  const handleTwitterShare = () => {
    window.open(shareUrls.twitter, '_blank', 'width=600,height=400');
  };

  const handleFacebookShare = () => {
    window.open(shareUrls.facebook, '_blank', 'width=600,height=600');
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = shareData.url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  // Hide entire component in screenshot mode (after all hooks)
  if (hideShareLinks) {
    return null;
  }

  return (
    <div className={styles.floatingShare}>
      <button
        className={cn(styles.mainButton, { [styles.expanded]: isExpanded })}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label="Share this portfolio"
        aria-expanded={isExpanded}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isExpanded && (
        <div className={styles.shareOptions}>
          <button
            className={styles.shareButton}
            onClick={handleLinkedInShare}
            aria-label="Share on LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                fill="currentColor"
              />
            </svg>
          </button>

          <button
            className={styles.shareButton}
            onClick={handleTwitterShare}
            aria-label="Share on X (Twitter)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                fill="currentColor"
              />
            </svg>
          </button>

          <button
            className={styles.shareButton}
            onClick={handleFacebookShare}
            aria-label="Share on Facebook"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                fill="currentColor"
              />
            </svg>
          </button>

          <button
            className={cn(styles.shareButton, { [styles.copySuccess]: copySuccess })}
            onClick={handleCopyToClipboard}
            aria-label="Copy link to clipboard"
          >
            {copySuccess ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  );
}