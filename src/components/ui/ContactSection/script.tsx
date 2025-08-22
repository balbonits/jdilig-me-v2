import React from 'react';
import styles from './style.module.css';

export interface ContactItem {
  /** Type of contact method */
  type: 'email' | 'phone' | 'location';
  /** Display label for the contact method */
  label: string;
  /** Contact value (email address, phone number, location) */
  value: string;
  /** Icon emoji to display */
  icon: string;
  /** Optional href for clickable contacts (email/phone) */
  href?: string;
}

export interface ContactSectionProps {
  /** Section title */
  title: string;
  /** Status badge text (e.g., "Open to Work") */
  badge: string;
  /** Section description */
  description: string;
  /** Array of contact items to display */
  contacts: ContactItem[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * ContactSection - Standardized contact information display
 * 
 * Professional contact section with status indicator, description,
 * and structured contact information with accessibility support.
 * 
 * @example
 * <ContactSection
 *   title="Let's Connect"
 *   badge="Open to Work"
 *   description="I'm actively seeking new opportunities..."
 *   contacts={[
 *     {
 *       type: 'email',
 *       label: 'Email',
 *       value: 'john@example.com',
 *       icon: '📧',
 *       href: 'mailto:john@example.com'
 *     }
 *   ]}
 * />
 */
export default function ContactSection({
  title,
  badge,
  description,
  contacts,
  className,
}: ContactSectionProps) {
  return (
    <section 
      className={`${styles.contactHero} ${className || ''}`}
      aria-label="Contact information and availability"
    >
      <div className={styles.contactContent}>
        <header className={styles.contactHeader}>
          <h2 className={styles.contactTitle} id="contact-title">
            {title}
          </h2>
          <div 
            className={styles.contactBadge}
            role="status"
            aria-label={`Current employment status: ${badge}`}
          >
            {badge}
          </div>
        </header>
        
        <p 
          className={styles.contactDescription}
          aria-describedby="contact-title"
        >
          {description}
        </p>
        
        {/* Primary CTAs for Recruiter Engagement */}
        <div className={styles.contactCTA}>
          <a 
            href="mailto:rjdofficemail@gmail.com?subject=Job%20Opportunity%20-%20Senior%20Frontend%20Engineer"
            className={styles.ctaButton}
            aria-label="Send email to discuss job opportunities"
          >
            📧 Contact for Opportunities
          </a>
          <a 
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaSecondary}
            aria-label="Download resume PDF in new window"
          >
            📄 Download Resume
          </a>
        </div>
        
        <div 
          className={styles.contactGrid}
          role="group"
          aria-label="Contact methods"
        >
          {contacts.map((contact) => (
            <div 
              key={contact.type}
              className={styles.contactItem}
              role="group"
              aria-label={`${contact.label} contact information`}
            >
              <div 
                className={styles.contactIcon} 
                aria-hidden="true"
              >
                {contact.icon}
              </div>
              <div className={styles.contactText}>
                <div 
                  className={styles.contactLabel} 
                  id={`${contact.type}-label`}
                >
                  {contact.label}
                </div>
                <div className={styles.contactValue}>
                  {contact.href ? (
                    <a 
                      href={contact.href}
                      aria-labelledby={`${contact.type}-label`}
                      aria-label={`${contact.type === 'email' ? 'Send email to' : 'Call'} ${contact.value}`}
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <span
                      aria-labelledby={`${contact.type}-label`}
                      aria-label={`${contact.label}: ${contact.value}`}
                    >
                      {contact.value}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}