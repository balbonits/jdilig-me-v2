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
- **PWA Ready**: Offline support, app shortcuts, and installable interface

## 📁 Project Structure

```
src/
├── pages/                  # Next.js Pages Router
├── components/             # Modular UI components
│   ├── ui/                # Reusable UI primitives (PageContainer, Section, Card, Grid)
│   ├── pages/             # Page-level components (HomePage, AboutPage, CodePage)
│   ├── ResumeDisplay/     # Resume component
│   └── SiteLayout/        # Main layout with theme toggle
├── interfaces/            # Domain-specific data structures
├── types/                 # Reusable utility types and UI definitions
├── exercises/             # Coding exercises (TypeScript files)
├── utilities/             # Utility functions (TypeScript files)
├── styles/                # Global styles and theme variables
└── data/                  # Static content and configuration
```

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
import { PageContainer, PageHeader, SectionContainer, Section, Card, Grid } from '@/components/ui';

export default function ExamplePage() {
  return (
    <PageContainer>
      <PageHeader title="Page Title" subtitle="Optional subtitle" />
      <SectionContainer>
        <Section title="Section Title">
          <Grid>
            <Card>Card content</Card>
            <Card>Card content</Card>
          </Grid>
        </Section>
      </SectionContainer>
    </PageContainer>
  );
}
```

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

### Playwright E2E Testing
- **Visual Regression**: 18+ baseline screenshots across 5 browser/device combinations
- **Multi-Browser**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Component Testing**: Individual sections, responsive layouts, theme switching
- **Commands**: `npm run test:e2e`, `npm run test:e2e:ui`, `npm run test:e2e:headed`

### Unit Testing
- **22+ test cases** with Jest + React Testing Library
- **Component testing**: Card component, classnames utility
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

## 🔧 Development Workflow

**Critical validation before commits:**
1. `npm run lint` - Zero ESLint warnings/errors
2. `npm test` - All unit tests passing
3. `npm run build` - Successful production build

## 📚 Documentation

- **README.md**: Project overview and getting started
- **CLAUDE.md**: Current project context and development guidelines
- **HISTORY.md**: Historical changes and major updates
- **TECH_DEBT.md**: Refactoring plans and technical debt tracking

## 🌟 Recent Highlights

- **E2E Testing**: Comprehensive Playwright visual regression testing
- **Gradient System**: Simplified 2-color gradients for consistent design
- **Exercise Enhancement**: 5-tier difficulty system with solution type classification
- **Hero Banner System**: Vibrant, responsive banner components across pages
- **Type Safety**: Enhanced interfaces with shared type system

## 🚀 Deploy on Vercel

This project is optimized for Vercel deployment. Connect your repository for automatic deployments on every push to master.

---

*For detailed project context and development guidelines, see [CLAUDE.md](./CLAUDE.md)*