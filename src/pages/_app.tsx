import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import SiteLayout from '@/components/SiteLayout';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { CodeDataProvider } from '@/contexts/CodeDataContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <CodeDataProvider>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </CodeDataProvider>
    </ThemeProvider>
  );
}