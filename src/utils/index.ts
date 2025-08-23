// Client-side utility functions only
export { cn, classNames } from './classnames';
export { shortenUrl, getShortenedUrlSafe } from './urlShortener';

// Note: data-fetchers are not exported here to avoid server-side fs imports on client
// Import data-fetchers directly when needed in SSG/SSR contexts
