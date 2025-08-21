import React from 'react';
import { render, screen } from '@testing-library/react';
import ContactSection from './script';

describe('ContactSection', () => {
  const defaultContacts = [
    {
      type: 'email' as const,
      label: 'Email',
      value: 'test@example.com',
      icon: '📧',
      href: 'mailto:test@example.com'
    },
    {
      type: 'phone' as const,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      icon: '📱',
      href: 'tel:+15551234567'
    },
    {
      type: 'location' as const,
      label: 'Location',
      value: 'Test City, CA',
      icon: '📍'
    }
  ];

  const defaultProps = {
    title: 'Get In Touch',
    badge: 'Available',
    description: 'I am currently available for new opportunities.',
    contacts: defaultContacts,
  };

  it('renders correctly with all props', () => {
    render(<ContactSection {...defaultProps} />);
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('I am currently available for new opportunities.')).toBeInTheDocument();
  });

  it('renders all contact items', () => {
    render(<ContactSection {...defaultProps} />);
    
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Test City, CA')).toBeInTheDocument();
  });

  it('creates clickable links for email and phone', () => {
    render(<ContactSection {...defaultProps} />);
    
    const emailLink = screen.getByRole('link', { name: 'Send email to test@example.com' });
    expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');
    
    const phoneLink = screen.getByRole('link', { name: 'Call +1 (555) 123-4567' });
    expect(phoneLink).toHaveAttribute('href', 'tel:+15551234567');
  });

  it('does not create link for location', () => {
    render(<ContactSection {...defaultProps} />);
    
    const locationText = screen.getByText('Test City, CA');
    expect(locationText.tagName).toBe('SPAN');
  });

  it('provides proper accessibility attributes', () => {
    render(<ContactSection {...defaultProps} />);
    
    // Check section accessibility
    const section = screen.getByRole('region', { name: 'Contact information and availability' });
    expect(section).toBeInTheDocument();
    
    // Check status badge accessibility
    const badge = screen.getByRole('status', { name: 'Current employment status: Available' });
    expect(badge).toBeInTheDocument();
    
    // Check contact methods group
    const contactGroup = screen.getByRole('group', { name: 'Contact methods' });
    expect(contactGroup).toBeInTheDocument();
  });

  it('renders title as h2 heading', () => {
    render(<ContactSection {...defaultProps} />);
    
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Get In Touch');
  });

  it('applies custom className when provided', () => {
    render(<ContactSection {...defaultProps} className="custom-class" />);
    
    const section = screen.getByRole('region');
    expect(section).toHaveClass('custom-class');
  });

  it('handles empty contacts array gracefully', () => {
    render(<ContactSection {...defaultProps} contacts={[]} />);
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    const contactGroup = screen.getByRole('group', { name: 'Contact methods' });
    expect(contactGroup).toBeEmptyDOMElement();
  });
});