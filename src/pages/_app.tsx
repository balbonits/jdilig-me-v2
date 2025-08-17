import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import SiteLayout from '@/components/SiteLayout';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CodeDataProvider } from '@/contexts/CodeDataContext';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <CodeDataProvider>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
        <Analytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </CodeDataProvider>
    </ThemeProvider>
  );
}