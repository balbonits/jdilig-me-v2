import Head from 'next/head';
import { SEOProps, createSEOProps } from '@/lib/seo';

interface SEOHeadProps extends Partial<SEOProps> {
  pathname: string;
}

export default function SEOHead({ pathname, ...overrides }: SEOHeadProps) {
  const { metaTags, structuredData, canonical, title } = createSEOProps(pathname, overrides);

  return (
    <Head>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      
      {/* Dynamic meta tags */}
      {metaTags.map((tag, index) => {
        if (tag.name) {
          return <meta key={index} name={tag.name} content={tag.content} />;
        }
        if (tag.property) {
          return <meta key={index} property={tag.property} content={tag.content} />;
        }
        return null;
      })}

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2)
        }}
      />
    </Head>
  );
}