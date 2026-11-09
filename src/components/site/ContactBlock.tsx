import { useEffect, useRef, useState } from 'react';
import { resumeMeta } from '@/data/resume';
import { Icon } from './Icons';

const ext = <span className="s-visually-hidden"> (external site)</span>;

// UX-IA 5: address visible as text + mailto, a "Copy email" button that reads "Copied" for 2s,
// and a polite live region announcing "Email address copied".
export default function ContactBlock({ headingLevel = 2, label }: { headingLevel?: 1 | 2; label?: string }) {
  const [canCopy, setCanCopy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const email = resumeMeta.email;

  useEffect(() => {
    const id = requestAnimationFrame(() => setCanCopy(typeof navigator !== 'undefined' && !!navigator.clipboard));
    return () => {
      cancelAnimationFrame(id);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setStatus('Email address copied');
    } catch {
      setStatus('Copy failed. Select the address instead.');
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied(false);
      setStatus('');
    }, 2000);
  };

  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <div>
      {label && (
        <p className="s-label s-seclabel" aria-hidden="true">{label}</p>
      )}
      <Heading id="contact-heading" className={headingLevel === 1 ? 's-h1-inner' : 's-h2'}>
        Get in touch
      </Heading>
      <a className="s-addr" href={`mailto:${email}`}>{email}</a>
      <div className="s-btns">
        <a className="s-btn s-btn--primary" href={`mailto:${email}`}>
          <Icon name="mail" /> Email me
        </a>
        {canCopy && (
          <button type="button" className="s-btn s-btn--secondary" onClick={copy}>
            <Icon name={copied ? 'check' : 'copy'} /> {copied ? 'Copied' : 'Copy email'}
          </button>
        )}
      </div>
      <p className="s-status" aria-live="polite">{status}</p>
      <p className="s-label" style={{ marginTop: 16 }}>Elsewhere</p>
      <ul className="s-rows">
        <li>
          <a className="s-row" href={resumeMeta.linkedin}>
            LinkedIn{ext}
            <span className="s-host" aria-hidden="true">linkedin.com <Icon name="external" small /></span>
          </a>
        </li>
        <li>
          <a className="s-row" href={resumeMeta.github}>
            GitHub{ext}
            <span className="s-host" aria-hidden="true">github.com <Icon name="external" small /></span>
          </a>
        </li>
      </ul>
    </div>
  );
}
