// SEO utilities library for meta tags, structured data, and social sharing

import { siteConfig, pageConfigs, getCanonicalUrl } from '@/config/site';

export interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  canonical?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  author?: string;
  type?: 'website' | 'article' | 'profile';
}

export interface MetaTag {
  name?: string;
  property?: string;
  content: string;
}

/**
 * Generate all meta tags for SEO and social sharing
 */
export function generateMetaTags(props: SEOProps = {}): MetaTag[] {
  const {
    title = siteConfig.seo.defaultTitle,
    description = siteConfig.seo.defaultDescription,
    path = '/',
    image = siteConfig.seo.ogImage,
    noIndex = false,
    noFollow = false,
    canonical,
    publishedTime,
    modifiedTime,
    tags = [],
    author = siteConfig.author.name,
    type = 'website'
  } = props;

  const canonicalUrl = canonical || getCanonicalUrl(path);
  const fullTitle = title === siteConfig.seo.defaultTitle ? title : `${title} | ${siteConfig.author.name}`;

  const metaTags: MetaTag[] = [
    // Basic SEO meta tags
    { name: 'description', content: description },
    { name: 'keywords', content: siteConfig.keywords.join(', ') },
    { name: 'author', content: author },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'language', content: siteConfig.language },
    { name: 'theme-color', content: siteConfig.seo.themeColor },
    { name: 'msapplication-TileColor', content: siteConfig.seo.themeColor },
    { name: 'application-name', content: siteConfig.siteName },
    { name: 'apple-mobile-web-app-title', content: siteConfig.siteName },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    { name: 'format-detection', content: 'telephone=no' },
    
    // Open Graph meta tags (Facebook, LinkedIn, WhatsApp, etc.)
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:type', content: type },
    { property: 'og:image', content: image },
    { property: 'og:image:alt', content: siteConfig.seo.ogImageAlt },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:site_name', content: siteConfig.siteName },
    { property: 'og:locale', content: siteConfig.locale },
    
    // Twitter Card meta tags
    { name: 'twitter:card', content: siteConfig.seo.twitterCard },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image },
    { name: 'twitter:image:alt', content: siteConfig.seo.ogImageAlt },
    { name: 'twitter:site', content: siteConfig.social.twitterHandle },
    { name: 'twitter:creator', content: siteConfig.social.twitterHandle },
    
    // Additional social media meta tags
    { name: 'telegram:channel', content: siteConfig.social.twitterHandle },
    { name: 'pinterest-rich-pin', content: 'true' },
    
    // Security and privacy meta tags
    { name: 'referrer', content: 'strict-origin-when-cross-origin' },
    { name: 'robots', content: noIndex || noFollow ? `${noIndex ? 'noindex' : 'index'}, ${noFollow ? 'nofollow' : 'follow'}` : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
    { name: 'googlebot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
    { name: 'bingbot', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
    
    // Cache control meta tags
    { name: 'cache-control', content: 'no-cache, no-store, must-revalidate' },
    { name: 'pragma', content: 'no-cache' },
    { name: 'expires', content: '0' },
  ];

  // Add robots meta tag if needed
  if (noIndex || noFollow) {
    const robotsContent = [
      noIndex ? 'noindex' : 'index',
      noFollow ? 'nofollow' : 'follow'
    ].join(', ');
    metaTags.push({ name: 'robots', content: robotsContent });
  }

  // Add article-specific meta tags
  if (type === 'article') {
    metaTags.push({ property: 'article:author', content: author });
    
    if (publishedTime) {
      metaTags.push({ property: 'article:published_time', content: publishedTime });
    }
    
    if (modifiedTime) {
      metaTags.push({ property: 'article:modified_time', content: modifiedTime });
    }
    
    // Add article tags
    tags.forEach(tag => {
      metaTags.push({ property: 'article:tag', content: tag });
    });
  }

  return metaTags;
}

/**
 * Generate JSON-LD structured data for search engines
 */
export function generateStructuredData(props: SEOProps = {}) {
  const {
    title = siteConfig.seo.defaultTitle,
    description = siteConfig.seo.defaultDescription,
    path = '/',
    image = siteConfig.seo.ogImage,
    type = 'website',
    publishedTime,
    modifiedTime
  } = props;

  const canonicalUrl = getCanonicalUrl(path);

  // Person schema for the author/developer
  const personSchema = {
    '@type': 'Person',
    '@id': `${siteConfig.baseUrl}#person`,
    name: siteConfig.author.name,
    url: siteConfig.baseUrl,
    email: siteConfig.author.email,
    jobTitle: 'Web Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    },
    sameAs: [
      siteConfig.social.linkedinProfile,
      siteConfig.social.githubProfile,
      siteConfig.author.twitter
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.business.location.city,
      addressRegion: siteConfig.business.location.state,
      addressCountry: siteConfig.business.location.country
    },
    knowsAbout: [
      'React',
      'TypeScript',
      'JavaScript',
      'Next.js',
      'Web Development',
      'Frontend Development',
      'User Interface Design',
      'Algorithm Implementation'
    ]
  };

  // Website schema
  const websiteSchema = {
    '@type': 'WebSite',
    '@id': `${siteConfig.baseUrl}#website`,
    url: siteConfig.baseUrl,
    name: siteConfig.siteName,
    description: siteConfig.siteDescription,
    publisher: {
      '@id': `${siteConfig.baseUrl}#person`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  // Professional service schema
  const professionalServiceSchema = {
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.baseUrl}#service`,
    name: 'Web Development Services',
    description: 'Professional web development services specializing in React, TypeScript, and modern frontend technologies',
    provider: {
      '@id': `${siteConfig.baseUrl}#person`
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States'
    },
    serviceType: [
      'Web Development',
      'Frontend Development',
      'React Development',
      'TypeScript Development',
      'UI/UX Design'
    ]
  };

  // Base schema array
  const schemas: Record<string, unknown>[] = [personSchema, websiteSchema, professionalServiceSchema];

  // Page-specific schema
  if (type === 'article') {
    const articleSchema = {
      '@type': 'Article',
      '@id': `${canonicalUrl}#article`,
      headline: title,
      description: description,
      url: canonicalUrl,
      image: image,
      author: {
        '@id': `${siteConfig.baseUrl}#person`
      },
      publisher: {
        '@id': `${siteConfig.baseUrl}#person`
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl
      },
      ...(publishedTime && { datePublished: publishedTime }),
      ...(modifiedTime && { dateModified: modifiedTime })
    };
    schemas.push(articleSchema);
  } else {
    const webPageSchema = {
      '@type': 'WebPage',
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description: description,
      image: image,
      isPartOf: {
        '@id': `${siteConfig.baseUrl}#website`
      },
      about: {
        '@id': `${siteConfig.baseUrl}#person`
      },
      mainEntity: {
        '@id': `${siteConfig.baseUrl}#person`
      }
    };
    schemas.push(webPageSchema);
  }

  // Return as a single graph
  return {
    '@context': 'https://schema.org',
    '@graph': schemas
  };
}

/**
 * Get page-specific SEO configuration
 */
export function getPageSEO(pathname: string): SEOProps {
  // Find matching page config
  const pageConfig = Object.values(pageConfigs).find(config => config.path === pathname);
  
  if (pageConfig) {
    return {
      title: pageConfig.title,
      description: pageConfig.description,
      path: pageConfig.path
    };
  }

  // Handle dynamic routes
  if (pathname.startsWith('/code/exercises/')) {
    const exerciseName = pathname.split('/').pop();
    return {
      title: `Algorithm: ${exerciseName} - ${siteConfig.author.name}`,
      description: `Check out this algorithm implementation: ${exerciseName} with multiple solution approaches and complexity analysis.`,
      path: pathname,
      type: 'article'
    };
  }

  if (pathname.startsWith('/code/utilities/')) {
    const utilityName = pathname.split('/').pop();
    return {
      title: `Utility: ${utilityName} - ${siteConfig.author.name}`,
      description: `Explore this utility function: ${utilityName} with usage examples and implementation details.`,
      path: pathname,
      type: 'article'
    };
  }

  // Default fallback
  return {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    path: pathname
  };
}

/**
 * Generate share URLs for social media platforms
 */
export function generateShareUrls(url: string, title: string, text: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text);

  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}`,
    copy: url
  };
}

/**
 * Utility to create a complete SEO Head component props
 */
export function createSEOProps(pathname: string, overrides: Partial<SEOProps> = {}) {
  const baseSEO = getPageSEO(pathname);
  const finalSEO = { ...baseSEO, ...overrides };
  
  return {
    metaTags: generateMetaTags(finalSEO),
    structuredData: generateStructuredData(finalSEO),
    canonical: getCanonicalUrl(finalSEO.path || pathname),
    title: finalSEO.title || siteConfig.seo.defaultTitle
  };
}