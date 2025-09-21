import type { AppProps } from 'next/app';
import type { NextWebVitalsMetric } from 'next/app';
import '@/styles/globals.css';
import SiteLayout from '@/components/SiteLayout';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CodeDataProvider } from '@/contexts/CodeDataContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';

// Core Web Vitals reporting for performance monitoring
export function reportWebVitals(metric: NextWebVitalsMetric) {
  // Only send metrics in production and when GA is configured
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID) {
    // Send to Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      // Base event data that always exists
      const eventData: Record<string, unknown> = {
        custom_map: { metric_id: 'dimension1' },
        metric_id: metric.id,
        metric_value: Math.round(metric.value),
      };

      // Add optional properties with proper type casting if they exist
      if ('delta' in metric && typeof metric.delta === 'number') {
        eventData.metric_delta = metric.delta;
      }
      if ('rating' in metric && typeof metric.rating === 'string') {
        eventData.metric_rating = metric.rating;
      }

      window.gtag('event', metric.name, eventData);
    }
    
    // Note: Vercel Analytics automatically tracks Core Web Vitals via the <Analytics /> component
    // No manual tracking needed - the component handles it automatically
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <CodeDataProvider>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </CodeDataProvider>
    </ThemeProvider>
  );
}