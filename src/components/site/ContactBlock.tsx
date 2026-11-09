import { useEffect, useRef, useState } from 'react';
import { resumeMeta } from '@/data/resume';
import { Icon } from './Icons';

export default function ContactBlock({ headingLevel = 2, showLabel = true }: { headingLevel?: 1 | 2; showLabel?: boolean }) {
  const [canCopy, setCanCopy] = useState(false);
  const [status, setStatus] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const email = resumeMeta.email;

  useEffect(() => {
    // Only render the Copy button when the Clipboard API exists (no-JS users still get selectable text).
    const id = requestAnimationFrame(() => setCanCopy(typeof navigator !== 'undefined' && !!navigator.clipboard));
    return () => {
      cancelAnimationFrame(id);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus('✓ Copied');
    } catch {
      setStatus('Copy failed. Select the address above instead.');
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(''), 4000);
  };

  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <div>
      {showLabel && (
        <p className="s-label s-seclabel">
          <span aria-hidden="true">04</span>
        </p>
      )}
      <Heading id="contact-heading" className={headingLevel === 1 ? 's-h1-inner' : 's-h2'}>
        Get in touch
      </Heading>
      <span className="s-addr">{email}</span>
      <div className="s-btns">
        <a className="s-btn s-btn--primary" href={`mailto:${email}`}>
          <Icon name="mail" /> Email me
        </a>
        {canCopy && (
          <button type="button" className="s-btn s-btn--secondary" onClick={copy}>
            <Icon name="copy" /> Copy address
          </button>
        )}
      </div>
      <p className="s-status" role="status">{status}</p>
      <p className="s-label" style={{ marginTop: 16 }}>Elsewhere</p>
      <ul className="s-rows">
        <li>
          <a className="s-row" href={resumeMeta.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn, opens linkedin.com, new tab">
            LinkedIn
            <span className="s-host">opens linkedin.com <Icon name="external" small /></span>
          </a>
        </li>
        <li>
          <a className="s-row" href={resumeMeta.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub, opens github.com, new tab">
            GitHub
            <span className="s-host">opens github.com <Icon name="external" small /></span>
          </a>
        </li>
      </ul>
    </div>
  );
}
