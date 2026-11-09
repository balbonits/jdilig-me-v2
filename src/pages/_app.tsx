import type { AppProps } from 'next/app';
import type { NextWebVitalsMetric } from 'next/app';
import { Geist, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.css';
import '@/styles/site.css';
import Layout from '@/components/site/Layout';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';

// Self-hosted at build time by next/font (no requests to Google at runtime), with size-adjusted fallbacks.
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const instrument = Instrument_Serif({ subsets: ['latin'], weight: '400', style: 'italic', variable: '--font-instrument', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-jetbrains', display: 'swap', preload: false });

// Core Web Vitals reporting for performance monitoring
export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID) {
    if (typeof window !== 'undefined' && window.gtag) {
      const eventData: Record<string, unknown> = {
        custom_map: { metric_id: 'dimension1' },
        metric_id: metric.id,
        metric_value: Math.round(metric.value),
      };
      if ('delta' in metric && typeof metric.delta === 'number') {
        eventData.metric_delta = metric.delta;
      }
      if ('rating' in metric && typeof metric.rating === 'string') {
        eventData.metric_rating = metric.rating;
      }
      window.gtag('event', metric.name, eventData);
    }
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`s-root ${geist.variable} ${instrument.variable} ${jetbrains.variable}`}>
      <ThemeProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_ID ? <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} /> : null}
      </ThemeProvider>
    </div>
  );
}
