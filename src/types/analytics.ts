// Analytics type definitions for Google Analytics and Vercel Analytics

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: {
        custom_map?: Record<string, string>;
        metric_id?: string;
        metric_value?: number;
        metric_delta?: number;
        metric_rating?: string;
        [key: string]: unknown;
      }
    ) => void;
  }
}

// Custom event types for analytics tracking
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: unknown;
}

// Code showcase specific events
export interface CodeAnalyticsEvent extends AnalyticsEvent {
  exerciseSlug?: string;
  utilitySlug?: string;
  solutionType?: string;
  difficulty?: string;
  complexity?: string;
}

// Project showcase specific events
export interface ProjectAnalyticsEvent extends AnalyticsEvent {
  projectSlug?: string;
  projectCategory?: string;
  interactionType?: 'view' | 'click' | 'modal_open' | 'screenshot_view';
}

// Performance tracking events
export interface PerformanceAnalyticsEvent extends AnalyticsEvent {
  metric: string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
}

export {};