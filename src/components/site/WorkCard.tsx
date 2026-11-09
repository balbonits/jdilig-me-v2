import Link from 'next/link';
import type { WorkItem } from '@/data/work';
import { Icon } from './Icons';

// One card = one link (UX-IA 4). Lives inside a <li> of a <ul>.
export default function WorkCard({ item, headingLevel = 3 }: { item: WorkItem; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <Link className="s-card" href={item.href}>
      <span className="s-cover" aria-hidden="true">{item.title}</span>
      <span className="s-meta">{item.meta}</span>
      <H className="s-h3">{item.title}</H>
      <span className="s-card__sum">{item.summary}</span>
      <ul className="s-tags" aria-label="Stack">
        {item.tags.map((t) => (
          <li key={t} className="s-tag">{t}</li>
        ))}
      </ul>
      <span className="s-card__foot" aria-hidden="true">
        View project <Icon name="arrow" small />
      </span>
    </Link>
  );
}
