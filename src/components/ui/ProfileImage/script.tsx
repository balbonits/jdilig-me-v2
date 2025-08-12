import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/classnames';
import styles from './style.module.css';

export type ProfileImageShape = 'circle' | 'box' | 'rounded' | 'hexagon';

export interface ProfileImageProps {
  // Required props
  src: string;
  alt: string;
  
  // Size props
  width?: number;
  height?: number;
  
  // Shape variant
  shape?: ProfileImageShape;
  
  // Styling
  className?: string;
  
  // Next.js Image props
  priority?: boolean;
  quality?: number;
}

export default function ProfileImage({
  src,
  alt,
  width = 160,
  height = 160,
  shape = 'circle',
  className,
  priority = false,
  quality = 75
}: ProfileImageProps) {
  const shapeLabel = shape === 'circle' ? 'circular' : 
                    shape === 'box' ? 'square' : 
                    shape === 'rounded' ? 'rounded square' : 'hexagonal';

  return (
    <div 
      className={cn(
        styles.profileImageWrapper,
        styles[`shape${shape.charAt(0).toUpperCase() + shape.slice(1)}`],
        className
      )}
      role="img"
      aria-label={`${alt} - ${shapeLabel} profile image`}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={styles.profileImage}
        priority={priority}
        quality={quality}
        role="presentation"
      />
    </div>
  );
}