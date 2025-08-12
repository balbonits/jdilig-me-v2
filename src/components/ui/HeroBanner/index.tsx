import React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/classnames';
import ProfileImage, { ProfileImageShape } from '@/components/ui/ProfileImage';
import styles from './style.module.css';

export interface HeroBannerStat {
  number: string;
  label: string;
}

export type HeroBannerVariant = 'default' | 'profile' | 'minimal' | 'background';

export interface HeroBannerProps {
  // Content
  title: string;
  badge?: string;
  description?: string;
  stats?: HeroBannerStat[];
  tags?: string[];
  
  // Profile Image
  imageUrl?: string;
  imageAlt?: string;
  imageShape?: ProfileImageShape;
  imageWidth?: number;
  imageHeight?: number;
  
  // Styling
  variant?: HeroBannerVariant;
  className?: string;
  
  // Behavior
  href?: string;
  onClick?: () => void;
  
  // Layout
  children?: React.ReactNode;
  
  // Custom content areas
  icon?: React.ReactNode;
  subtitle?: string;
}

export default function HeroBanner({
  title,
  badge,
  description,
  stats = [],
  tags = [],
  imageUrl,
  imageAlt,
  imageShape = 'circle',
  imageWidth = 160,
  imageHeight = 160,
  variant = 'default',
  href,
  onClick,
  className,
  children,
  icon,
  subtitle
}: HeroBannerProps) {
  const content = (
    <article 
      className={cn(
        styles.heroBanner, 
        imageUrl && styles.heroWithImage,
        variant === 'profile' && styles.heroProfile,
        variant === 'minimal' && styles.heroMinimal,
        variant === 'background' && styles.heroBackground,
        className
      )} 
      onClick={onClick}
      role={href ? "link" : onClick ? "button" : "banner"}
      aria-label={`${title}${badge ? ` - ${badge}` : ''} hero section`}
    >
      <div className={styles.heroLayout} role="group" aria-label="Profile information">
        {/* Profile Image - Only show for non-background variants */}
        {imageUrl && variant !== 'background' && (
          <div className={styles.heroImageSection}>
            <ProfileImage
              src={imageUrl}
              alt={imageAlt || title}
              shape={imageShape}
              width={imageWidth}
              height={imageHeight}
              priority
            />
          </div>
        )}
        
        {/* Content */}
        <div className={styles.heroContent}>
          {/* Header section */}
          <header className={styles.heroHeader}>
            {icon && <div className={styles.heroIcon} aria-hidden="true">{icon}</div>}
            <div className={styles.heroTitleSection}>
              <h1 className={styles.heroTitle} id="hero-title">{title}</h1>
              {subtitle && <div className={styles.heroSubtitle} aria-describedby="hero-title">{subtitle}</div>}
            </div>
            {badge && <div className={styles.heroBadge} role="status" aria-label={`Professional status: ${badge}`}>{badge}</div>}
          </header>
          
          {/* Description */}
          {description && <p className={styles.heroDescription} aria-describedby="hero-title">{description}</p>}
          
          {/* Stats */}
          {stats.length > 0 && (
            <div 
              className={styles.heroStats} 
              role="group" 
              aria-label="Professional statistics"
            >
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={styles.stat}
                  role="status"
                  aria-label={`${stat.number} ${stat.label}`}
                >
                  <span className={styles.statNumber} aria-hidden="true">{stat.number}</span>
                  <span className={styles.statLabel} aria-hidden="true">{stat.label}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Tags */}
          {tags.length > 0 && (
            <div 
              className={styles.heroTech}
              role="group"
              aria-label="Technical skills and expertise"
            >
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  role="status"
                  aria-label={`Skill: ${tag}`}
                >{tag}</span>
              ))}
            </div>
          )}
          
          {/* Custom children content */}
          {children}
        </div>
      </div>
      <div className={styles.heroGradient}></div>
    </article>
  );

  // If href is provided, wrap in Link
  if (href) {
    return (
      <Link href={href} className={styles.heroLink}>
        {content}
      </Link>
    );
  }

  // If onClick is provided, wrap in button
  if (onClick) {
    return (
      <button className={styles.heroButton}>
        {content}
      </button>
    );
  }

  // Otherwise just return the content
  return content;
}
