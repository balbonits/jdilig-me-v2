import { resumeMeta } from '@/data/resume';

const ext = <span className="s-visually-hidden"> (external site)</span>;

export default function Footer() {
  return (
    <footer className="s-footer">
      <div className="s-container s-footer__row">
        <ul className="s-footer__links">
          <li><a href="https://games.jdilig.me">Playground{ext}</a></li>
          <li><a href={resumeMeta.github}>GitHub{ext}</a></li>
          <li><a href={resumeMeta.linkedin}>LinkedIn{ext}</a></li>
          <li><a href={`mailto:${resumeMeta.email}`}>Email</a></li>
        </ul>
        <p className="s-footer__copy">© 2026 John Dilig</p>
      </div>
    </footer>
  );
}
