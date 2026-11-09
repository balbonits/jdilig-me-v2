import Link from 'next/link';
import type { WorkItem } from '@/data/resume';
import { Icon } from './Icons';

export default function WorkCard({ item, headingLevel = 3 }: { item: WorkItem; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  const body = (
    <>
      <span className="s-cover" aria-hidden="true">{item.title}</span>
      <span className="s-meta">{item.meta}</span>
      <H className="s-h3">
        {item.title}
        <span className="s-card__sub">{item.subtitle}</span>
      </H>
      <span className="s-card__sum">{item.summary}</span>
      <ul className="s-tags" aria-label="Stack">
        {item.tags.slice(0, 4).map((t) => (
          <li key={t} className="s-tag">{t}</li>
        ))}
      </ul>
      {item.external ? (
        <span className="s-host">
          opens {item.host} <Icon name="external" small />
          <span className="s-visually-hidden">, new tab</span>
        </span>
      ) : (
        <span className="s-card__foot" aria-hidden="true">
          View project <Icon name="arrow" small />
        </span>
      )}
    </>
  );

  if (item.external) {
    return (
      <a className="s-card" href={item.href} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }
  return (
    <Link className="s-card" href={item.href}>
      {body}
    </Link>
  );
}
