import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from '@/contexts/ThemeContext';
import { Icon, PixelMark } from './Icons';

// UX-IA 3: Work and Contact get aria-current; Resume is an in-page anchor and never does.
const NAV = [
  { href: '/projects', label: 'Work', match: '/projects' },
  { href: '/#resume', label: 'Resume', match: null },
  { href: '/contact', label: 'Contact', match: '/contact' },
];

export default function Header() {
  const { pathname } = useRouter();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="s-header">
      <div className="s-container s-header__row">
        <Link href="/" className="s-logo" aria-label="jdilig.me home">
          <span className="s-tile" style={{ width: 44, height: 44 }}>
            <PixelMark scale={4} />
          </span>
          <span className="s-logo__word" aria-hidden="true">jdilig.me</span>
        </Link>
        <nav className="s-nav" aria-label="Main">
          <ul>
            {NAV.map((item) => {
              const current =
                item.match !== null && (pathname === item.match || pathname.startsWith(`${item.match}/`));
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={current ? 'page' : undefined}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <button
          type="button"
          className="s-toggle"
          onClick={toggleTheme}
          aria-label="Dark theme"
          aria-pressed={theme === 'dark'}
        >
          <Icon name="sun" className="s-ico-sun" />
          <Icon name="moon" className="s-ico-moon" />
        </button>
      </div>
    </header>
  );
}
