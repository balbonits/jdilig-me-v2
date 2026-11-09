import SEOHead from '@/components/SEOHead';
import ContactBlock from '@/components/site/ContactBlock';

export default function Contact() {
  return (
    <>
      <SEOHead pathname="/contact" title="Contact - John Dilig" description="Get in touch with John Dilig, Senior Front-End Developer." />
      <div className="s-container">
        <section className="s-page-head" aria-labelledby="contact-heading" style={{ paddingBottom: 64 }}>
          <ContactBlock headingLevel={1} showLabel={false} />
        </section>
      </div>
    </>
  );
}
