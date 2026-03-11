# CLAUDE.md
Read AGENTS.md first.

## Project Overview
- **Name**: jdilig-me-v2 (v3 rebuild)
- **URL**: https://www.jdilig.me
- **Stack**: Astro 5, TypeScript (strict), Tailwind CSS v4, MDX, Preact islands
- **Deployment**: Vercel (static output, every push goes live)
- **Package Manager**: bun
- **Analytics**: GA4 (G-D80RETE964, free tier)

## Behavioral Rules
- Do only what is asked
- Prefer editing over creating files
- Tailwind utility classes only — no CSS modules, no external stylesheets
- Custom tokens via `@theme`, custom utilities via `@utility` in global.css
- NEVER use "complete/done/finished" — use "current/working/functional"

## Production Warning
Every push → live at jdilig.me. No staging environment.

## Commit Protocol
1. Never commit without explicit approval
2. Ask: "Should I commit?"
3. Run: bun run build before committing

## Styling Rules
- All styling via Tailwind v4 utility classes
- Custom design tokens in `src/styles/global.css` via `@theme { }`
- Custom utility classes via `@utility name { }` directives
- No CSS modules, no `.module.css`, no separate component stylesheets
- Colors only from theme tokens — no raw hex/rgba in component files
- Mobile-first: base=mobile, `md:` for tablet, `lg:` for desktop
- Never use `max-width` media queries

## Accessibility Requirements
- WCAG 2.1 AA compliance on all pages
- Semantic HTML, proper heading hierarchy (h1 > h2 > h3)
- ARIA labels on all interactive elements
- Touch targets minimum 44px (`touch-target` utility)
- Skip-to-content link on every page layout
- `prefers-reduced-motion: reduce` disables all animations
- Focus-visible outlines on all interactive elements
- Color contrast minimum 4.5:1 for text

## Verification
```bash
bun run check         # astro check (TypeScript)
bun run build         # Production build (includes astro check)
```

## Project Structure
```
src/
├── assets/images/     # Build-time optimized (headshot, profile)
├── components/        # .astro components (static)
├── content/           # MDX content collections (projects, blog)
├── content.config.ts  # Zod schemas for content
├── data/              # Static TypeScript data modules
├── layouts/           # BaseLayout.astro
├── pages/             # File-based routing
├── styles/global.css  # Tailwind imports + @theme + @utility
├── types/             # TypeScript types
└── utils/             # Utility functions
```

## Content Collections
- `src/content/projects/*.mdx` — Project case studies (Zod-validated frontmatter)
- `src/content/blog/*.mdx` — Blog posts
- Schema defined in `src/content.config.ts`

## Key Files
| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro + Tailwind + MDX + Vercel config |
| `src/styles/global.css` | All design tokens and custom utilities |
| `src/content.config.ts` | Content collection Zod schemas |
| `src/data/site.config.ts` | Site metadata and SEO defaults |
| `src/layouts/BaseLayout.astro` | HTML shell + View Transitions |

---
*Critical reminders:*
- Do only what's asked, nothing more
- Never create files unless necessary
- Always prefer editing over creating
- Never proactively create documentation
- Make sure all code has no linting or syntax errors
