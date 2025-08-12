import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileImage from './script';

describe('ProfileImage Component Accessibility', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'John Doe Profile Picture',
    width: 160,
    height: 160
  };

  describe('ARIA Attributes', () => {
    it('should render with default circle shape and proper ARIA labels', () => {
      render(<ProfileImage {...defaultProps} />);
      
      const wrapper = screen.getByRole('img');
      expect(wrapper).toHaveAttribute('aria-label', 'John Doe Profile Picture - circular profile image');
      expect(wrapper).toBeInTheDocument();
    });

    it('should render with box shape and proper ARIA label', () => {
      render(<ProfileImage {...defaultProps} shape="box" />);
      
      const wrapper = screen.getByRole('img');
      expect(wrapper).toHaveAttribute('aria-label', 'John Doe Profile Picture - square profile image');
    });

    it('should render with rounded shape and proper ARIA label', () => {
      render(<ProfileImage {...defaultProps} shape="rounded" />);
      
      const wrapper = screen.getByRole('img');
      expect(wrapper).toHaveAttribute('aria-label', 'John Doe Profile Picture - rounded square profile image');
    });

    it('should render with hexagon shape and proper ARIA label', () => {
      render(<ProfileImage {...defaultProps} shape="hexagon" />);
      
      const wrapper = screen.getByRole('img');
      expect(wrapper).toHaveAttribute('aria-label', 'John Doe Profile Picture - hexagonal profile image');
    });

    it('should set role="presentation" on the inner Image component', () => {
      render(<ProfileImage {...defaultProps} />);
      
      const image = screen.getByAltText('John Doe Profile Picture');
      expect(image).toHaveAttribute('role', 'presentation');
    });
  });

  describe('Shape Variants', () => {
    it('should apply circle shape class by default', () => {
      render(<ProfileImage {...defaultProps} />);
      
      const wrapper = screen.getByRole('img');
      expect(wrapper).toHaveClass('shapeCircle');
    });

    it('should apply correct shape classes for each variant', () => {
      const shapes: Array<{ shape: 'circle' | 'box' | 'rounded' | 'hexagon', expectedClass: string }> = [
        { shape: 'circle', expectedClass: 'shapeCircle' },
        { shape: 'box', expectedClass: 'shapeBox' },
        { shape: 'rounded', expectedClass: 'shapeRounded' },
        { shape: 'hexagon', expectedClass: 'shapeHexagon' }
      ];

      shapes.forEach(({ shape, expectedClass }) => {
        const { unmount } = render(<ProfileImage {...defaultProps} shape={shape} />);
        
        const wrapper = screen.getByRole('img');
        expect(wrapper).toHaveClass(expectedClass);
        
        unmount();
      });
    });
  });

  describe('Screen Reader Support', () => {
    it('should provide comprehensive accessibility information', () => {
      render(<ProfileImage {...defaultProps} shape="rounded" />);
      
      const wrapper = screen.getByRole('img');
      
      // Check that wrapper provides comprehensive context
      expect(wrapper).toHaveAttribute('aria-label', 'John Doe Profile Picture - rounded square profile image');
      
      // Check that inner image is marked as presentation
      const innerImage = screen.getByAltText('John Doe Profile Picture');
      expect(innerImage).toHaveAttribute('role', 'presentation');
    });

    it('should handle custom className while maintaining accessibility', () => {
      render(<ProfileImage {...defaultProps} className="custom-profile" />);
      
      const wrapper = screen.getByRole('img');
      expect(wrapper).toHaveClass('custom-profile');
      expect(wrapper).toHaveAttribute('aria-label', 'John Doe Profile Picture - circular profile image');
    });
  });

  describe('Next.js Image Integration', () => {
    it('should pass through Next.js Image props correctly', () => {
      render(
        <ProfileImage 
          {...defaultProps} 
          priority={true}
          quality={90}
        />
      );
      
      const image = screen.getByAltText('John Doe Profile Picture');
      expect(image).toHaveAttribute('src');
      expect(image).toHaveAttribute('width', '160');
      expect(image).toHaveAttribute('height', '160');
    });
  });
});