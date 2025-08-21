import { useCallback } from 'react';
import type { CodeAnalyticsEvent, ProjectAnalyticsEvent, PerformanceAnalyticsEvent } from '@/types/analytics';

/**
 * Custom hook for analytics tracking with Google Analytics 4 and Vercel Analytics
 * Only tracks events in production with proper environment configuration
 */
export function useAnalytics() {
  const isProduction = process.env.NODE_ENV === 'production';
  const hasGA = Boolean(process.env.NEXT_PUBLIC_GA_ID);
  
  // Generic event tracking
  const trackEvent = useCallback((eventName: string, properties: Record<string, unknown> = {}) => {
    if (!isProduction || typeof window === 'undefined') return;
    
    try {
      // Send to Google Analytics 4
      if (hasGA && window.gtag) {
        window.gtag('event', eventName, properties);
      }
      
      // Send to Vercel Analytics (provided by @vercel/analytics package)
      // Note: Vercel Analytics API signature may differ - focusing on GA4 for now
      // if (window.va) {
      //   window.va('track', eventName, properties);
      // }
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }, [isProduction, hasGA]);

  // Code showcase specific tracking
  const trackCodeView = useCallback((event: CodeAnalyticsEvent) => {
    trackEvent('code_view', {
      exercise_slug: event.exerciseSlug,
      utility_slug: event.utilitySlug,
      solution_type: event.solutionType,
      difficulty: event.difficulty,
      complexity: event.complexity,
      category: 'Code Showcase',
    });
  }, [trackEvent]);

  const trackCodeInteraction = useCallback((action: string, slug: string, type: 'exercise' | 'utility') => {
    trackEvent('code_interaction', {
      action,
      [type === 'exercise' ? 'exercise_slug' : 'utility_slug']: slug,
      content_type: type,
      category: 'Code Showcase',
    });
  }, [trackEvent]);

  // Project showcase specific tracking
  const trackProjectView = useCallback((event: ProjectAnalyticsEvent) => {
    trackEvent('project_view', {
      project_slug: event.projectSlug,
      project_category: event.projectCategory,
      interaction_type: event.interactionType,
      category: 'Project Showcase',
    });
  }, [trackEvent]);

  const trackProjectInteraction = useCallback((action: string, projectSlug: string, interactionType?: string) => {
    trackEvent('project_interaction', {
      action,
      project_slug: projectSlug,
      interaction_type: interactionType,
      category: 'Project Showcase',
    });
  }, [trackEvent]);

  // Performance tracking
  const trackPerformance = useCallback((event: PerformanceAnalyticsEvent) => {
    trackEvent('performance_metric', {
      metric: event.metric,
      metric_value: event.value,
      metric_rating: event.rating,
      category: 'Performance',
    });
  }, [trackEvent]);

  // Navigation tracking
  const trackNavigation = useCallback((page: string, source?: string) => {
    trackEvent('page_view', {
      page_title: page,
      page_location: window.location.href,
      page_path: window.location.pathname,
      referrer: source || document.referrer,
      category: 'Navigation',
    });
  }, [trackEvent]);

  // Contact/engagement tracking
  const trackEngagement = useCallback((action: string, element?: string) => {
    trackEvent('engagement', {
      action,
      element_type: element,
      page_path: window.location.pathname,
      category: 'User Engagement',
    });
  }, [trackEvent]);

  // Theme switching tracking
  const trackThemeChange = useCallback((theme: 'light' | 'dark') => {
    trackEvent('theme_change', {
      theme,
      category: 'User Preferences',
    });
  }, [trackEvent]);

  return {
    // Generic tracking
    trackEvent,
    
    // Specific tracking methods
    trackCodeView,
    trackCodeInteraction,
    trackProjectView,
    trackProjectInteraction,
    trackPerformance,
    trackNavigation,
    trackEngagement,
    trackThemeChange,
    
    // Utility flags
    isTrackingEnabled: isProduction && hasGA,
  };
}