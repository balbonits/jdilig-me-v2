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
    <div className={cn(
      styles.heroBanner, 
      imageUrl && styles.heroWithImage,
      variant === 'profile' && styles.heroProfile,
      variant === 'minimal' && styles.heroMinimal,
      variant === 'background' && styles.heroBackground,
      className
    )} onClick={onClick}>
      <div className={styles.heroLayout}>
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
          <div className={styles.heroHeader}>
            {icon && <div className={styles.heroIcon}>{icon}</div>}
            <div className={styles.heroTitleSection}>
              <h3 className={styles.heroTitle}>{title}</h3>
              {subtitle && <div className={styles.heroSubtitle}>{subtitle}</div>}
            </div>
            {badge && <div className={styles.heroBadge}>{badge}</div>}
          </div>
          
          {/* Description */}
          {description && <p className={styles.heroDescription}>{description}</p>}
          
          {/* Stats */}
          {stats.length > 0 && (
            <div className={styles.heroStats}>
              {stats.map((stat, index) => (
                <div key={index} className={styles.stat}>
                  <span className={styles.statNumber}>{stat.number}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className={styles.heroTech}>
              {tags.map((tag, index) => (
                <span key={index}>{tag}</span>
              ))}
            </div>
          )}
          
          {/* Custom children content */}
          {children}
        </div>
      </div>
      <div className={styles.heroGradient}></div>
    </div>
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
