# John Dilig - Personal Website v2

A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS v4. Features a modular component architecture with CSS modules, a unified design system, and comprehensive code showcase.

## 🚀 Tech Stack

- **Framework**: Next.js (Pages Router) with TypeScript
- **Styling**: Tailwind CSS v4 + CSS Modules
- **Architecture**: Modular components with reusable UI primitives
- **Theme**: Light/dark mode with CSS custom properties
- **Testing**: Jest + React Testing Library + Playwright E2E
- **Quality**: Full ESLint compliance, automated visual regression testing

## 🎯 Features

- **Personal Portfolio**: Resume, projects, and professional experience
- **Code Showcase**: 15+ algorithm exercises with multiple solutions and complexity analysis
- **Utility Functions**: Reusable TypeScript utilities with documentation
- **Responsive Design**: Mobile-first approach across all components
- **Theme System**: Smooth light/dark mode transitions
- **Accessibility**: WCAG 2.1 AA compliant with comprehensive ARIA support
- **ProfileImage System**: 4 shape variants (circle, box, rounded, hexagon) with accessibility features
- **PWA Ready**: Offline support, app shortcuts, and installable interface


## 🖼️ Assets
- Favicon and app icons are located in `/public/images/favicon` (multi-size PNG, ICO, Apple touch, manifest)

src/
├── pages/                  # Next.js Pages Router
├── components/             # Modular UI components
│   ├── ui/                # Reusable UI primitives (PageContainer, Section, Card, Grid, HeroBanner, ProfileImage, Modal)
│   ├── pages/             # Page-level components (HomePage, AboutPage, CodePage)
│   ├── ResumeDisplay/     # Resume component
│   └── SiteLayout/        # Main layout with theme toggle
├── interfaces/            # Domain-specific data structures
├── types/                 # Reusable utility types and UI definitions
├── exercises/             # Coding exercises (TypeScript files)
├── utilities/             # Utility functions (TypeScript files)
├── styles/                # Global styles and theme variables
└── data/                  # Static content and configuration

## 📁 Project Structure

```
src/
├── pages/                  # Next.js Pages Router
├── components/             # Modular UI components
│   ├── ui/                # Reusable UI primitives (PageContainer, Section, Card, Grid, HeroBanner, ProfileImage, Modal)
│   ├── pages/             # Page-level components (HomePage, AboutPage, CodePage)
│   ├── ResumeDisplay/     # Resume component
│   └── SiteLayout/        # Main layout with theme toggle
├── interfaces/            # Domain-specific data structures
├── types/                 # Reusable utility types and UI definitions
├── exercises/             # Coding exercises (TypeScript files)
├── utilities/             # Utility functions (TypeScript files)
├── styles/                # Global styles and theme variables
└── data/                  # Static content and configuration
projects/
  {project-name}.ts        # Individual project data as typed TS modules
public/
  projects.json            # Consolidated project data (generated)
```

## 🗂️ Projects Data Structure (NEW)

Project data is now stored as individual TypeScript modules in the `projects/` directory. Each file exports a typed `ProjectData` object. The build script consolidates these into `public/projects.json`.

**Example:**
```ts
import { ProjectData } from '@/interfaces/projects';

const project: ProjectData = {
  slug: 'my-cool-project',
  title: 'My Cool Project',
  description: 'A short summary of the project.',
  technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  repoUrl: 'https://github.com/yourname/my-cool-project',
  liveUrl: 'https://mycoolproject.com',
  images: [
    '/projects/my-cool-project/1-desktop-home.png',
    '/projects/my-cool-project/2-mobile-feature.png'
  ],
  // ...other fields as defined in ProjectData
};

export default project;
```

**Migration:**
- Migrate existing `projects/*.json` files to `.ts` modules using the above pattern.
- Update generation scripts to import and process TypeScript modules instead of JSON.

**Benefits:**
- Type safety and autocompletion
- Consistent with exercises/utilities system
- Easier to extend and refactor

## 🎨 Component Architecture

### Modular Component Philosophy
Each component follows a **"separation of concerns"** approach:

- `index.tsx` - Clean export: `export { default } from './script';`
- `script.tsx` - Component logic and JSX
- `style.module.css` - Scoped CSS modules with mobile-first design
- `test.tsx` - Jest tests (optional)

### CSS Architecture Standards ⭐
**All styles follow a mandatory hierarchy** (see [CLAUDE.md](./CLAUDE.md) for complete details):

1. **Mobile-First**: Base styles for 320px+, enhance with `min-width` media queries
2. **CSS Hierarchy**: Root/Base → Component → Page → Theme (conditional overrides)
3. **Framework Mindset**: Reusable, generic components over page-specific styles
4. **Theme Structure**: `:global(.dark)` and `:global(.light)` as conditional selectors

```css
/* ✅ Correct hierarchy example */
.component { /* Mobile-first base */ }
@media (min-width: 768px) { .component { /* Tablet enhancement */ } }
:global(.dark) .component { /* Dark theme override */ }
```


### UI Component Usage
```tsx
import { PageContainer, PageHeader, SectionContainer, Section, Card, Grid, Modal } from '@/components/ui';

export default function ExamplePage() {
  const [open, setOpen] = React.useState(false);
  return (
    <PageContainer>
      <PageHeader title="Page Title" subtitle="Optional subtitle" />
      <SectionContainer>
        <Section title="Section Title">
          <Grid>
            <Card>Card content</Card>
            <Card>Card content</Card>
            <button onClick={() => setOpen(true)}>Open Modal</button>
            <Modal open={open} onClose={() => setOpen(false)} title="Modal Title">
              Modal content goes here
            </Modal>
          </Grid>
        </Section>
      </SectionContainer>
    </PageContainer>
  );
}
```
### Modal Component

The `Modal` component is a reusable, accessible dialog for displaying overlay content. It supports:

- **Props**: `open` (boolean), `onClose` (function), `children` (content), `title` (optional), `className` (optional)
- **Accessibility**: Uses `role="dialog"`, `aria-modal`, and keyboard focus management
- **Styling**: Mobile-first, theme-aware, and fully customizable via CSS Modules
- **Usage**: Import from `@/components/ui` and control visibility with state

Example:
```tsx
<Modal open={open} onClose={() => setOpen(false)} title="My Modal">
  Modal content here
</Modal>
```

## 🖼️ ProfileImage Component

### Shape Variants
The ProfileImage component offers 4 distinct shape options for different design contexts:

```tsx
import { ProfileImage } from '@/components/ui';

// Circle - Default circular profile images (used in ResumeDisplay)
<ProfileImage 
  src="/images/profile.png" 
  alt="Profile picture"
  shape="circle"
  width={160}
  height={160}
/>

// Rounded - Rounded corners (used in Homepage hero)
<ProfileImage 
  src="/images/profile.png" 
  alt="Profile picture"
  shape="rounded"
  width={160}
  height={160}
/>

// Box - Sharp corners for formal contexts
<ProfileImage shape="box" src="/images/profile.png" alt="Profile picture" />

// Hexagon - Creative six-sided display using CSS clip-path
<ProfileImage shape="hexagon" src="/images/profile.png" alt="Profile picture" />
```

### Features
- **Next.js Integration**: Uses optimized Next.js Image component
- **TypeScript Safety**: Full type definitions with shape validation
- **Accessibility**: ARIA labels with shape descriptions for screen readers
- **Performance**: Configurable quality, priority loading, and responsive sizing

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- **ARIA Implementation**: Comprehensive role assignments and descriptive labels
- **Screen Reader Support**: Semantic HTML structure with proper landmark roles
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Content Relationships**: Proper `aria-describedby` and `aria-labelledby` connections

### Components with Accessibility
- **ProfileImage**: `role="img"` with descriptive shape labels
- **HeroBanner**: Semantic `<article>` structure with grouped stats and skills
- **Contact Cards**: Complete ARIA labeling for email, phone, and location
- **Navigation**: Proper heading hierarchy and landmark roles throughout

## 💻 Code Showcase System

### Algorithm Exercises
15+ exercises demonstrating algorithms, data structures, and problem-solving:
- **Multiple Solutions**: Different approaches (Hash Map, Brute Force, Dynamic Programming)
- **Complexity Analysis**: Time/space complexity with optimal solution detection (★ badges)
- **Difficulty Levels**: Beginner → Easy → Medium → Hard → Expert
- **Interactive UI**: Tabbed interface with examples and explanations

### Utility Functions
Reusable TypeScript utilities with:
- **Clean Implementations**: Production-ready functions
- **Usage Examples**: Practical code examples
- **Documentation**: Descriptions, categories, and use cases
- **Performance Notes**: Complexity analysis where relevant

### Build System
- **JSON Generation**: Automatic parsing of TypeScript files
- **Static Assets**: exercises.json and utilities.json served from `/public`
- **Type Safety**: Full TypeScript interfaces and validation



## 🧪 Testing & Quality

### August 2025 Updates
- Playwright E2E tests are now organized by page/component (not monolithic)
- Utilities and Exercises pages now include SEOHead for correct titles/meta (fixes E2E failures)
All test errors (unit, E2E, lint, type, Playwright visual snapshot mismatches) are build-blocking and must be resolved before commit. Only warnings or skips that are essential but not build-breaking are tracked in TECH_DEBT.md. Always update and validate Playwright snapshots as part of the workflow. Correct Playwright snapshots are required to catch UI/data issues before deploy.

### Playwright E2E Testing
- **Favicon & App Icon Test**: E2E test (`tests/e2e/favicon.spec.ts`) verifies that all favicon and app icon <link> tags are present and point to the correct files in `/images/favicon`.
- **Visual Regression**: 18+ baseline screenshots across 5 browser/device combinations
- **Multi-Browser**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Component Testing**: Individual sections, responsive layouts, theme switching
- **Commands**: `npm run test:e2e`, `npm run test:e2e:ui`, `npm run test:e2e:headed`

### Unit Testing
- **64+ test cases** with Jest + React Testing Library
- **Component testing**: ProfileImage, HeroBanner, Card, AboutContent components
- **Accessibility testing**: ARIA validation, screen reader support, keyboard navigation
- **Data validation**: API response handling and error cases
- **Coverage reports**: Track test coverage across codebase

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run linting and tests
npm run lint
npm test

# Build for production
npm run build
```

## 📋 Available Scripts

```bash
npm run dev              # Start development server
npm run dev:clean        # Clear cache and start dev server
npm run build            # Generate JSON + build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run test             # Run Jest unit tests
npm run test:e2e         # Run Playwright E2E tests
npm run generate         # Generate exercises + utilities JSON
```

## 🎨 TypeScript Organization

### Interfaces (`src/interfaces/`)
Domain-specific data structures:
- `exercises.ts` - Exercise data (ExerciseMetadata, ExampleCase)
- `utilities.ts` - Utility function data structures
- Resume, project, and content-specific shapes

### Types (`src/types/`)
Reusable utility types and UI definitions:
- Generic utility types (Optional, NonEmptyArray)
- UI component props (ButtonVariant, Size, Theme)
- System-wide enums (LoadingState, BreakPoint)

**Rule**: Interface = "What data looks like", Type = "How code behaves"


## 🔧 Development & Commit Workflow

**Always follow this workflow before committing:**
1. Update documentation files: `CLAUDE.md`, `HISTORY.md`, `TECH_DEBT.md`, `README.md`
2. Add/update tests for all new/changed features (unit, E2E, etc.)
+3. Run tests in order:
+   - `npm run lint` (ESLint)
+   - `npm test` (Jest unit tests)
+   - `npx playwright test` (E2E tests) — **E2E tests are commit-essential: all must pass before commit, not just before deploy.**
+   - `npm run build` (build check)
4. Stage, commit, and push changes (with detailed commit message)

### New Scripts & Features
- `npm run test:all`: Runs both Jest and Playwright tests
- Utility data refactored: now split into summary index and per-utility JSON files
- Utility usage examples: 2-column grid, modal for each card
- Playwright browsers must be installed for E2E tests (`npx playwright install`)

## 📚 Documentation

- **README.md**: Project overview and getting started
- **CLAUDE.md**: Current project context and development guidelines
- **HISTORY.md**: Historical changes and major updates
- **TECH_DEBT.md**: Refactoring plans and technical debt tracking

## 🔗 Technical References & Best Practices

### Component Libraries & UI Frameworks
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Tailwind UI](https://tailwindcss.com/plus)** - Premium UI components by Tailwind creators
- **[Headless UI](https://headlessui.com/)** - Unstyled, accessible UI components for React
- **[Radix UI](https://www.radix-ui.com/)** - Low-level UI primitives with accessibility
- **[Shadcn UI](https://ui.shadcn.com/)** - Modern component library using Radix UI + Tailwind

### React & Next.js Resources
- **[Next.js Documentation](https://nextjs.org/docs)** - React framework for production
- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)** - Testing utilities for React
- **[Playwright](https://playwright.dev/)** - End-to-end testing framework

### Development Tools
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and developer experience
- **[ESLint](https://eslint.org/)** - Code quality and consistency
- **[Jest](https://jestjs.io/)** - JavaScript testing framework

## 🌟 Recent Highlights

- **ProfileImage Component**: 4 shape variants (circle, box, rounded, hexagon) with accessibility features
- **WCAG 2.1 AA Compliance**: Comprehensive ARIA implementation and screen reader support
- **Enhanced Testing**: 64+ Jest tests including accessibility validation and component testing
- **E2E Testing**: Comprehensive Playwright visual regression testing across 5 browser combinations
- **Exercise Enhancement**: 5-tier difficulty system with solution type classification
- **Type Safety**: Enhanced interfaces with shared type system and accessibility props

## 🚀 Deploy on Vercel

This project is optimized for Vercel deployment. Connect your repository for automatic deployments on every push to master.

---

*For detailed project context and development guidelines, see [CLAUDE.md](./CLAUDE.md)*