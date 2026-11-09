import { Icon } from './Icons';

export default function Footer() {
  return (
    <footer className="s-footer">
      <div className="s-container s-footer__row">
        <p className="s-footer__copy">© 2026 John Dilig</p>
        <a href="https://games.jdilig.me" target="_blank" rel="noopener noreferrer" aria-label="Playground: opens games.jdilig.me, new tab">
          Playground: opens games.jdilig.me
          <Icon name="external" small />
        </a>
      </div>
    </footer>
  );
}
