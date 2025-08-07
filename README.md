# John Dilig - Personal Website v2

A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS v4. Features a modular component architecture with CSS modules, a unified design system, and mobile-first responsive design.

## Tech Stack

- **Framework**: Next.js (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + CSS Modules
- **Architecture**: Modular components with scoped styles and reusable UI primitives
- **Theme**: Light/dark mode with CSS custom properties
- **Design**: Mobile-first responsive approach with unified card/section styling

## Project Structure

```
src/
├── pages/                  # Next.js Pages Router
├── components/             # Modular UI components
│   ├── ui/                # Reusable UI primitives
│   │   ├── PageContainer/ # Main page wrapper
│   │   ├── PageHeader/    # Page title and description
│   │   ├── SectionContainer/ # Section layout wrapper
│   │   ├── Section/       # Individual content sections
│   │   ├── Card/          # Reusable card component
│   │   ├── Grid/          # Responsive grid layouts
│   │   └── index.ts       # Unified exports
│   ├── pages/             # Page-level components
│   │   ├── HomePage/      # index.tsx, script.tsx, style.module.css
│   │   ├── ProjectsPage/  # Modular page components
│   │   ├── AboutPage/     # Follow same pattern
│   │   └── CodePage/      # Clean separation of concerns
│   ├── ResumeDisplay/     # Resume component (used on homepage)
│   └── SiteLayout/        # Main layout with theme toggle
├── contexts/              # React contexts (ThemeContext)
├── styles/                # Global styles and theme variables
└── data/                  # Static content and configuration
```

## UI Component System

The project features a unified, reusable UI component system:

### Core UI Primitives
- **PageContainer**: Main page wrapper with consistent padding and responsive layout
- **PageHeader**: Standardized page titles, subtitles, and descriptions
- **SectionContainer**: Wrapper for multiple content sections with proper spacing
- **Section**: Individual content sections with consistent card styling
- **Card**: Reusable card component with hover effects and responsive padding
- **Grid**: Flexible grid system (1 col mobile → 2 col tablet → 3 col desktop)

### Mobile-First Design
- All components use mobile-first responsive approach
- Breakpoints: Mobile (default) → Tablet (768px+) → Desktop (1024px+)
- Consistent spacing and typography scaling across devices
- Touch-friendly interfaces and hover states

## Component Architecture

Each component follows a consistent modular pattern:
- `index.tsx` - Clean export: `export { default } from './script';`
- `script.tsx` - Component logic and JSX
- `style.module.css` - Scoped CSS modules with mobile-first responsive design
- `test.tsx` - Jest tests (optional)

### UI Component Usage
```tsx
import { PageContainer, PageHeader, SectionContainer, Section, Card, Grid } from '@/components/ui';

// Typical page structure
<PageContainer>
  <PageHeader title="Page Title" subtitle="Optional subtitle">
    Optional description content
  </PageHeader>
  
  <SectionContainer>
    <Section title="Section Title">
      <Grid>
        <Card>Card content</Card>
        <Card>Card content</Card>
      </Grid>
    </Section>
  </SectionContainer>
</PageContainer>
```

## Theme System

The website features a robust light/dark theme system:
- CSS custom properties for consistent theming
- Class-based theme switching (`.light`, `.dark`)
- Tailwind color integration via `var(--color-*)` properties
- Smooth transitions without `!important` declarations
- Mobile-first responsive design across all components

### CSS Variables
```css
:root {
  --background: var(--color-white);
  --foreground: var(--color-gray-900);
  --primary: var(--color-blue-500);
  --muted: var(--color-gray-500);
  --card: var(--color-white);
  --border: var(--color-gray-200);
}

body.dark {
  --background: var(--color-gray-950);
  --foreground: var(--color-gray-50);
  --card: var(--color-gray-900);
  --border: var(--color-gray-800);
}
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run test             # Run Jest tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
```

## Development

See `CLAUDE.md` for detailed project context, architecture, and conventions.

### Quick Start
1. Create page component in `src/components/pages/NewPage/`
2. Use UI primitives: `PageContainer`, `PageHeader`, `Section`, etc.
3. Import page component in `src/pages/new-page.tsx`
4. Follow mobile-first responsive design patterns

## Deploy on Vercel

This project is optimized for deployment on Vercel. Connect your repository to Vercel for automatic deployments on every push to master.
