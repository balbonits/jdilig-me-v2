# AGENTS.md

## Commands
bun install / bun run dev / bun run build / bun run preview

## Stack
Astro 5, TypeScript (strict), Tailwind CSS v4 (utility classes only), MDX content collections, Preact (islands), Vercel.

## Structure
src/components/ (.astro and .tsx), src/content/ (collections),
src/layouts/, src/pages/, src/styles/, src/types/, src/data/, src/utils/

## Code Conventions
- Zero `any` — use specific types or `unknown` with narrowing
- Mobile-first only — base=mobile, then md: and lg:
- Colors via Tailwind theme tokens only — no raw hex/rgba in components
- Tailwind utility classes only — no CSS modules or external component stylesheets
- Custom design tokens defined via `@theme` in global.css
- Custom utilities defined via `@utility` in global.css
- .astro for static, .tsx only for client interactivity (Preact islands)
- client:visible or client:idle — never client:load
- bun as package manager — not npm or yarn

## Accessibility
- WCAG 2.1 AA compliance required
- All interactive elements must have aria labels
- Touch targets minimum 44px (touch-target utility)
- Skip-to-content link on every page
- prefers-reduced-motion disables all animations
- Semantic HTML with proper heading hierarchy

## Boundaries
- NEVER use "completed/finished/done" — use "current/working/functional"
- NEVER commit/push without explicit user approval
- NEVER add dependencies without discussion
- NEVER create files unless necessary
- NEVER use CSS modules or external stylesheets — Tailwind classes only

## Commits (conventional, enforced via commitlint)
feat: / fix: / docs: / refactor: / test: / chore:

## Pre-Commit: bun run build

## References → CLAUDE.md
