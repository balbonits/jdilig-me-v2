import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutContent from './script';

// Mock the UI components
jest.mock('@/components/ui', () => ({
  SectionContainer: ({ children }: { children: React.ReactNode }) => <div data-testid="section-container">{children}</div>,
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
  Grid: ({ children }: { children: React.ReactNode }) => <div data-testid="grid">{children}</div>
}));

jest.mock('@/components/ui/HeroBanner', () => {
  return function MockHeroBanner({ title, badge, imageShape, variant }: { title: string; badge?: string; imageShape?: string; variant?: string }) {
    // Use h1 for main hero, h3 for minimal experience banners
    const HeadingTag = variant === 'minimal' ? 'h3' : 'h1';
    return (
      <div data-testid="hero-banner">
        <HeadingTag>{title}</HeadingTag>
        {badge && <span data-testid="badge">{badge}</span>}
        {imageShape && <span data-testid="image-shape">{imageShape}</span>}
      </div>
    );
  };
});

describe('AboutContent Component Accessibility', () => {
  beforeEach(() => {
    // Clear any previous renders
    document.body.innerHTML = '';
  });

  describe('Contact Section Accessibility', () => {
    it('should render contact section with proper semantic structure', () => {
      render(<AboutContent />);
      
      const contactSection = screen.getByLabelText('Contact information and availability');
      expect(contactSection).toBeInTheDocument();
      expect(contactSection.tagName).toBe('SECTION');
    });

    it('should render contact header with proper heading structure', () => {
      render(<AboutContent />);
      
      const contactTitle = screen.getByRole('heading', { level: 2, name: "Let's Connect" });
      expect(contactTitle).toHaveAttribute('id', 'contact-title');
    });

    it('should render employment status badge with proper ARIA attributes', () => {
      render(<AboutContent />);
      
      const statusBadge = screen.getByText('Open to Work');
      expect(statusBadge).toHaveAttribute('role', 'status');
      expect(statusBadge).toHaveAttribute('aria-label', 'Current employment status: Open to work');
    });

    it('should render contact description with proper relationship to title', () => {
      render(<AboutContent />);
      
      const description = screen.getByText(/I'm actively seeking new opportunities/);
      expect(description).toHaveAttribute('aria-describedby', 'contact-title');
    });
  });

  describe('Contact Methods Accessibility', () => {
    it('should render contact methods group with proper labeling', () => {
      render(<AboutContent />);
      
      const contactMethodsGroup = screen.getByLabelText('Contact methods');
      expect(contactMethodsGroup).toBeInTheDocument();
      expect(contactMethodsGroup).toHaveAttribute('role', 'group');
    });

    it('should render email contact with comprehensive accessibility', () => {
      render(<AboutContent />);
      
      const emailGroup = screen.getByLabelText('Email contact information');
      expect(emailGroup).toHaveAttribute('role', 'group');
      
      const emailLabel = screen.getByText('Email');
      expect(emailLabel).toHaveAttribute('id', 'email-label');
      
      const emailLink = screen.getByLabelText('Send email to rjdofficemail@gmail.com');
      expect(emailLink).toHaveAttribute('href', 'mailto:rjdofficemail@gmail.com');
      expect(emailLink).toHaveAttribute('aria-labelledby', 'email-label');
      expect(emailLink).toHaveAttribute('aria-label', 'Send email to rjdofficemail@gmail.com');
      
      const emailIcon = screen.getByText('📧');
      expect(emailIcon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should render phone contact with proper accessibility attributes', () => {
      render(<AboutContent />);
      
      const phoneGroup = screen.getByLabelText('Phone contact information');
      expect(phoneGroup).toHaveAttribute('role', 'group');
      
      const phoneLabel = screen.getByText('Phone');
      expect(phoneLabel).toHaveAttribute('id', 'phone-label');
      
      const phoneValue = screen.getByLabelText('Phone number: +1 (909) 997-1393');
      expect(phoneValue).toHaveAttribute('aria-labelledby', 'phone-label');
      
      const phoneIcon = screen.getByText('📱');
      expect(phoneIcon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should render location contact with proper accessibility attributes', () => {
      render(<AboutContent />);
      
      const locationGroup = screen.getByLabelText('Location information');
      expect(locationGroup).toHaveAttribute('role', 'group');
      
      const locationLabel = screen.getByText('Location');
      expect(locationLabel).toHaveAttribute('id', 'location-label');
      
      const locationValue = screen.getByLabelText('Located in Redondo Beach, California');
      expect(locationValue).toHaveAttribute('aria-labelledby', 'location-label');
      
      const locationIcon = screen.getByText('📍');
      expect(locationIcon).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Hero Banner Integration', () => {
    it.skip('should render main hero banner with rounded image shape', () => {
      render(<AboutContent />);
      
      const mainHero = screen.getByTestId('hero-banner');
      const imageShape = screen.getByTestId('image-shape');
      
      expect(mainHero).toBeInTheDocument();
      expect(imageShape).toHaveTextContent('rounded');
    });

    it('should render hero banner with proper title and badge', () => {
      render(<AboutContent />);
      
      const title = screen.getByRole('heading', { level: 1, name: 'John Dilig' });
      const badge = screen.getByTestId('badge');
      
      expect(title).toBeInTheDocument();
      expect(badge).toHaveTextContent('Front-End Developer');
    });
  });

  describe('Screen Reader Support', () => {
    it('should provide comprehensive context for screen readers', () => {
      render(<AboutContent />);
      
      // Check that all interactive elements have proper labels
      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).toHaveAccessibleName();
      });
      
      // Check that all status elements are properly labeled
      const statusBadge = screen.getByRole('status');
      expect(statusBadge).toHaveAccessibleName();
      
      // Check that sections are properly labeled
      const contactSection = screen.getByRole('region');
      expect(contactSection).toHaveAccessibleName();
    });

    it('should hide decorative elements from screen readers', () => {
      render(<AboutContent />);
      
      const icons = ['📧', '📱', '📍'];
      icons.forEach(icon => {
        const iconElement = screen.getByText(icon);
        expect(iconElement).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('should establish proper heading hierarchy', () => {
      render(<AboutContent />);
      
      const mainHeading = screen.getByRole('heading', { level: 1 });
      const contactHeading = screen.getByRole('heading', { level: 2 });
      
      expect(mainHeading).toBeInTheDocument();
      expect(contactHeading).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation Support', () => {
    it('should ensure all interactive elements are focusable', () => {
      render(<AboutContent />);
      
      const links = screen.getAllByRole('link');
      expect(links.length).toBeGreaterThan(0);
      
      // All links should have href attributes and be keyboard accessible
      links.forEach(link => {
        expect(link).toHaveAttribute('href');
        expect(link).not.toHaveAttribute('tabindex', '-1');
      });
    });
  });

  describe('Content Structure and Semantics', () => {
    it('should use proper landmark roles and structure', () => {
      render(<AboutContent />);
      
      // Main content should be in a section landmark
      const contactSection = screen.getByLabelText('Contact information and availability');
      expect(contactSection.tagName).toBe('SECTION');
      
      // Should have proper header structure
      const header = contactSection.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('should group related information logically', () => {
      render(<AboutContent />);
      
      const contactMethodsGroup = screen.getByLabelText('Contact methods');
      const emailGroup = screen.getByLabelText('Email contact information');
      const phoneGroup = screen.getByLabelText('Phone contact information');
      const locationGroup = screen.getByLabelText('Location information');
      
      expect(contactMethodsGroup).toContainElement(emailGroup);
      expect(contactMethodsGroup).toContainElement(phoneGroup);
      expect(contactMethodsGroup).toContainElement(locationGroup);
    });
  });
});