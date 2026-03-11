export interface ContactLink {
  label: string;
  href: string;
  icon: 'email' | 'github' | 'linkedin' | 'phone';
}

export const contactLinks: ContactLink[] = [
  { label: 'Email', href: 'mailto:rjdofficemail@gmail.com', icon: 'email' },
  { label: 'GitHub', href: 'https://github.com/balbonits', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/jdilig', icon: 'linkedin' },
];
