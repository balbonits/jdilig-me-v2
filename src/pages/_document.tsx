import { Html, Head, Main, NextScript } from 'next/document';
import { siteConfig } from '@/config/site';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:site_name" content={siteConfig.siteName} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={siteConfig.seo.ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={siteConfig.siteName} />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content={siteConfig.seo.twitterCard} />
        <meta name="twitter:site" content={siteConfig.social.twitterHandle} />
        <meta name="twitter:creator" content={siteConfig.social.twitterHandle} />
        <meta name="twitter:image" content={siteConfig.seo.ogImage} />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}