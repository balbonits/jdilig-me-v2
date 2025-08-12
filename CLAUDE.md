# CLAUDE.md - Project Context & References

This file contains context and references for the jdilig-me-v2 project to help Claude understand the codebase structure and conventions.

## 🤖 **Shared Context System**
This document serves as a **persistent knowledge base** that is shared between different Claude instances and conversations. It acts as a "memory system" that allows different Claude sessions to understand:
- Project architecture and technical decisions
- Current development status and progress
- Known issues, tech debt, and workarounds  
- Established conventions and patterns
- Recent changes and their context

**For Claude instances**: Always refer to this file for project context and update it when making significant changes to maintain continuity across conversations.

## 🛠️ **Technical Debt & Refactoring**
For comprehensive technical debt tracking, component refactoring plans, and development priorities, see **[TECH_DEBT.md](./TECH_DEBT.md)**. This document contains:
- Modularization opportunities (AboutContent component ~600 lines → modular components)
- CSS anti-patterns and design system improvements
- Component audit checklists and migration strategies
- Performance optimization plans
- Testing and accessibility improvements

When discussing "tech debt" or refactoring, always reference this centralized document.

## Project Overview
- **Name**: jdilig-me-v2
- **Type**: Personal website
- **Framework**: Next.js with Pages Router
- **Technologies**: React, TypeScript, Tailwind CSS v4
- **Branch**: master
- **Status**: Modular component architecture with unified UI system
- **Architecture**: Pages Router with modular component structure and reusable UI primitives

## Website Features
- Home page (/) - main landing with ResumeDisplay component
- Projects page (/projects) - work/project gallery showcase  
- Code page (/code) - comprehensive coding showcase with algorithm exercises and utility functions
- About page (/about) - personal info, skills, and contact details

### Code Showcase System
- **Algorithm Exercises** (/code/exercises) - Interactive showcase of computer science problems
- **Utility Functions** (/code/utilities) - Reusable utility functions with documentation
- **Individual Pages** (/code/exercises/[slug], /code/utilities/[slug]) - Detailed code analysis and examples
- **2+1 Layout**: Description | Code + Examples spanning bottom (mobile-first responsive)
- **Multiple Solutions**: Tabbed interface showing different algorithmic approaches
- **Complexity Analysis**: Time/space complexity with optimal solution detection
- **Pascal Case Convention**: All code showcase files use PascalCase naming

## Design Principles
- **Modular Architecture**: Each component follows index.tsx -> script.tsx -> style.module.css pattern
- **CSS Modules**: Scoped styles using .module.css files
- **Theme System**: Light/dark mode using CSS custom properties and class-based switching
- **Mobile-First Design**: All components use mobile-first responsive approach with min-width media queries
- **Unified UI System**: Reusable UI primitives for consistent design across all pages
- **Frontend Library Mindset**: Building reusable, scalable patterns for future component library development
- Performance-first approach
- Clean, maintainable code structure
- Consistent component organization
- **Tailwind Integration**: Uses Tailwind color system via CSS custom properties

## CSS Architecture Standards ⭐ **CRITICAL**

**ALL CSS must follow this mandatory hierarchy and approach:**

### **📱 Mobile-First Approach**
- **Always start with mobile base styles** (320px+ default)
- Use **`min-width` media queries only** to enhance for larger screens
- **Never use `max-width`** as primary breakpoint strategy

### **📐 Responsive Breakpoints**
- **Mobile (base)**: 320px+ default styles
- **Tablet**: `@media (min-width: 768px)`
- **Desktop**: `@media (min-width: 1024px)`

### **🧩 Framework/Library Mindset**
- Build **reusable, scalable components**
- Use **generic naming conventions**
- **Component-based architecture**
- **Modular and composable** patterns

### **🏗️ CSS Hierarchy (MANDATORY ORDER)**
```css
/* 1. ROOT/BASE - Global foundation */
:root { /* CSS variables, design system colors */ }
body { /* Global typography, base styles */ }

/* 2. COMPONENT - Reusable component styles */
.componentName { 
  /* Base mobile-first component styles */
}
.componentVariant { 
  /* Component variations and modifiers */
}

/* 3. PAGE - Page-specific overrides (minimize usage) */
.pageSpecificClass { 
  /* Only when component styles insufficient */
}

/* 4. THEME - Conditional theme overrides */
:global(.dark) .component { 
  /* Dark theme-specific overrides only */
}
:global(.light) .component { 
  /* Light theme-specific overrides only */
}
```

### **🎯 Implementation Rules**
1. **Mobile-first base styles** always come first
2. **CSS variables** for all themeable properties
3. **Base styles establish defaults**, theme selectors override conditionally
4. **Components over page-specific styles**
5. **Generic and reusable** approach to all styling
6. **Theme classes are conditional selectors**, not base styles

**⚠️ NEVER:**
- Use `max-width` for primary responsive design
- Set theme styles as base (themes are conditional overrides)
- Create page-specific styles when components can be enhanced
- Use desktop-first approach

### Card Component Design System
**Standardized Alignment Pattern for ALL Card Types:**
- All card containers use `align-items: flex-start` to push content to top
- All cards have `min-height: 200px` for visual consistency
- Headers use `flex-shrink: 0` to prevent compression
- Content areas use `width: 100%` and `align-self: flex-start`
- Titles use appropriate flex properties for text flow
- Icons use `flex-shrink: 0` to maintain size

**Applied to ALL card categories:**
- **Journey Cards** (.cardContent, .cardHeader, .cardTitle, .cardDescription)
- **Experience Banners** (.experienceContent, .experienceHeader, .experienceTitle, .experienceDescription)  
- **Skill Cards** (.skillContent, .skillHeader, .skillTitle, .skillTags)

**Special Skill Card Features:**
- Vertical header layout (title above level badge)
- Distinct level badge styling vs skill tags
- Level badges: smaller, gradient background, subtle shadow
- Skill tags: bottom-aligned with `margin-top: auto`

**Benefits:**
- Perfect text alignment across ALL card types
- Prevents wrapping/layout issues universally
- Maintains visual hierarchy consistently
- Scales for future library use with predictable behavior
- Single pattern to maintain across entire design system

## UI Component System

### Core UI Primitives (src/components/ui/)
- **PageContainer**: Main page wrapper with responsive padding and layout
- **PageHeader**: Standardized page titles, subtitles, and descriptions  
- **SectionContainer**: Wrapper for multiple content sections with proper spacing
- **Section**: Individual content sections with card styling and titles
- **Card**: Reusable card component with hover effects and responsive padding
- **Grid**: Responsive grid system (1→2→3 columns across breakpoints)
- **CodeShowcase**: 2+1 layout component for algorithm exercises with description, code, and examples
- **UtilityShowcase**: Utility function display component with usage examples
- **SolutionTabs**: Tabbed interface for multiple algorithm solutions with complexity analysis

### Mobile-First Responsive Design
- **Breakpoints**: Mobile (default) → Tablet (768px+) → Desktop (1024px+)
- **CSS Pattern**: Start with mobile styles, enhance with min-width media queries
- **Spacing**: 1rem mobile → 2rem tablet+ padding
- **Typography**: Smaller mobile → larger desktop font sizes
- **Grid**: Single column → multi-column layouts

## Technical Architecture
- **Rendering**: Pages Router (SSR/SSG)
- **Styling**: CSS Modules + Tailwind CSS v4
- **Theming**: CSS custom properties with .light/.dark class switching
- **Component Structure**: Modular components with separated concerns
- **Type Safety**: Full TypeScript implementation

## Project Structure
```
src/
├── pages/                  # Next.js Pages Router
│   ├── index.tsx          # Home route (imports HomePage component)
│   ├── projects.tsx       # Projects route (imports ProjectsPage component)
│   ├── about.tsx          # About route (imports AboutPage component)
│   ├── code.tsx           # Code route (imports CodePage component)
│   ├── _app.tsx           # Custom App component with providers
│   └── _document.tsx      # Custom Document component
├── components/            # Reusable UI components
│   ├── ui/                # Unified UI component system
│   │   ├── PageContainer/ # Main page wrapper
│   │   │   ├── index.tsx  #   - Clean export
│   │   │   ├── script.tsx #   - Component logic
│   │   │   └── style.module.css # - Mobile-first styles
│   │   ├── PageHeader/    # Page titles and descriptions
│   │   ├── SectionContainer/ # Section layout wrapper
│   │   ├── Section/       # Individual content sections
│   │   ├── Card/          # Reusable card component
│   │   ├── Grid/          # Responsive grid layouts
│   │   └── index.ts       # Unified exports for all UI components
│   ├── pages/             # Page-level components (imported by routes)
│   │   ├── HomePage/      # Home page component
│   │   │   ├── index.tsx  #   - Clean export
│   │   │   ├── script.tsx #   - Component logic (uses ResumeDisplay)
│   │   │   └── style.module.css # - Page-specific styles
│   │   ├── ProjectsPage/  # Projects showcase
│   │   ├── AboutPage/     # About/contact info
│   │   └── CodePage/      # Code showcase
│   ├── ResumeDisplay/     # Resume component (refactored to use UI primitives)
│   │   ├── index.tsx      #   - Clean export
│   │   ├── script.tsx     #   - Uses PageContainer, PageHeader, Section, etc.
│   │   └── style.module.css # - Component-specific styles only
│   └── SiteLayout/        # Main layout wrapper
│       ├── index.tsx      # Clean export
│       ├── script.tsx     # Layout logic with theme toggle
│       └── style.module.css # Layout styles
│   └── {ComponentName}/   # UI Component structure:
│       ├── index.tsx      #   - Clean exports
│       ├── script.tsx     #   - Main component logic
│       ├── style.module.css #   - Scoped CSS modules
│       └── test.tsx       #   - Jest tests
├── contexts/              # React contexts
│   └── ThemeContext.tsx   # Light/dark theme system
├── data/                  # Static data
│   ├── resume.ts          # Personal info, experience, skills
│   ├── projects.ts        # Portfolio projects
│   └── navigation.ts      # Site navigation items
├── exercises/             # Coding exercises (TypeScript files with metadata)
├── utilities/             # Utility functions (TypeScript files with examples)
├── interfaces/            # Domain-specific data structures
│   ├── exercises.ts       # Exercise and example case interfaces
│   └── utilities.ts       # Utility function interfaces
├── types/                 # Reusable utility types and UI definitions
│   └── index.ts           # Common types, UI props, system enums
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── scripts/               # Build and generation scripts
│   ├── generate-all.ts    # Generate all JSON files
│   ├── generate-exercises.ts # Parse exercises to JSON
│   └── generate-utilities.ts # Parse utilities to JSON
└── styles/                # Global styles
    └── globals.css        # Tailwind imports and theme variables
```

## TypeScript Organization

The project uses a clear separation between **interfaces** and **types**:

### **Interfaces** (`src/interfaces/`)
Domain-specific data structures that define business logic entities:
- **exercises.ts**: Exercise data structures (ExerciseMetadata, ExampleCase, etc.)
- **utilities.ts**: Utility function data structures  
- Resume, project, and content-specific data shapes
- External API response structures

### **Types** (`src/types/`)
Reusable utility types and UI/system-level definitions:
- **Generic utility types**: Optional, NonEmptyArray, DeepPartial
- **UI component prop types**: ButtonVariant, Size, Theme, BreakPoint
- **System-wide enums**: LoadingState, ApiResponse, FormField
- **Navigation types**: NavItem, cross-component shared types

**Rule of Thumb**: Interface = "What data looks like" (business domain), Type = "How code behaves" (technical implementation)

## Component Architecture

### Modular Component Philosophy
The project follows a **"separation of concerns"** approach with focused, composable components:

**Component Structure**: Each component follows a consistent pattern:
- `index.tsx` - Clean export: `export { default } from './script';`
- `script.tsx` - Main component logic and JSX
- `style.module.css` - Scoped CSS modules for component-specific styles
- `test.tsx` - Jest tests (optional)

**Pages Router Strategy**: Clear separation between routing and page components
- `src/pages/` - Contains route files that import page components
- `src/components/pages/` - Contains actual page component implementations
- Route files are minimal: just import and export the page component

## UI Component Usage Patterns

### Standard Page Layout
```tsx
import { PageContainer, PageHeader, SectionContainer, Section, Card, Grid } from '@/components/ui';

export default function ExamplePage() {
  return (
    <PageContainer>
      <PageHeader 
        title="Page Title" 
        subtitle="Optional subtitle"
      >
        Optional description content goes here
      </PageHeader>
      
      <SectionContainer>
        <Section title="First Section">
          <Grid>
            <Card>Content for card 1</Card>
            <Card>Content for card 2</Card>
            <Card>Content for card 3</Card>
          </Grid>
        </Section>
        
        <Section title="Second Section">
          <p>Regular content without cards</p>
        </Section>
      </SectionContainer>
    </PageContainer>
  );
}
```

### Component Import Pattern
```tsx
// Always import UI components from the unified export
import { PageContainer, PageHeader, SectionContainer, Section, Card, Grid } from '@/components/ui';

// Individual imports also work but are not recommended
import PageContainer from '@/components/ui/PageContainer';
```

### Mobile-First CSS Pattern
```css
/* Mobile-first approach - start with mobile styles */
.component {
  padding: 1rem;
  font-size: 1rem;
}

/* Tablet and up - enhance for larger screens */
@media (min-width: 768px) {
  .component {
    padding: 2rem;
    font-size: 1.125rem;
  }
}

/* Desktop and up - further enhancements */
@media (min-width: 1024px) {
  .component {
    padding: 3rem;
    font-size: 1.25rem;
  }
}
```

## Code Quality & Development Standards

### **ESLint Configuration & Standards**
The project maintains strict code quality through comprehensive ESLint rules:

#### **Type Safety Standards**
- **No `any` types**: Use specific interfaces and types from `src/interfaces/` and `src/types/`
- **No `unknown` types**: Define proper types for function parameters and return values
- **Proper generics**: Use constrained generics instead of broad unknown types
- **Example**: Instead of `(...args: unknown[]) => unknown`, use `DebouncableFunction` type

#### **Import/Export Standards**
- **Named default exports**: Assign objects to variables before default export
  ```typescript
  // ✅ Correct
  const exerciseModule = { functions, metadata, examples };
  export default exerciseModule;
  
  // ❌ Avoid
  export default { functions, metadata, examples };
  ```

#### **React Standards**
- **Next.js Link components**: Use `<Link>` from `next/link` instead of `<a>` tags for internal navigation
- **Escaped entities**: Use `&apos;` instead of `'` in JSX text content
- **Proper imports**: Import all necessary dependencies at the top level

#### **Exercise/Utility Standards**
- **Multiple solutions**: Each exercise can contain multiple algorithmic approaches
- **Complexity analysis**: Automatic detection and marking of optimal solutions based on time complexity
- **Consistent exports**: Each file exports functions, metadata, examples, and a default module object

### **Optimal Solution Detection**
Automatic analysis marks best solutions with ★ badges based on time complexity priority: O(1) > O(log n) > O(n) > O(n log n) > O(n²) > O(n³) > O(2^n)

## Development Commands
```bash
npm run dev              # Start development server
npm run dev:clean        # Clear .next cache and start dev server
npm run dev:fresh        # Clear cache, regenerate JSON, and start dev server
npm run build            # Generate code JSON + build Next.js
npm run build:next       # Build Next.js only  
npm run build:clean      # Clear cache and build
npm run start            # Start production server
npm run lint             # Run ESLint
npm run test             # Run Jest tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run generate         # Generate exercises + utilities JSON
npm run generate:exercises  # Generate exercises JSON only
npm run generate:utilities  # Generate utilities JSON only
```

## Code Conventions

### Component Architecture
- **Content Components**: Focus on data and logic (ResumeDisplay, ProjectCard)
- **Layout Components**: Handle positioning and structure (TwoColumnLayout, GridLayout)
- **Generic Components**: Reusable, configurable, avoid specific naming
- **Component Structure**: index.tsx (clean imports) + script.tsx (logic) + style.css + test.tsx

### Styling Strategy
- **CSS Modules**: Component-scoped styles using `.module.css` files
- **Tailwind CSS v4**: Integration via CSS custom properties in globals.css
- **Theme System**: Light/dark mode using CSS custom properties and class switching
- **Color System**: Uses Tailwind's color palette via `var(--color-*)` custom properties
- **Component Structure**: Each component has its own `style.module.css` file
- **Global Styles**: Minimal globals.css for theme variables and base styles
- **No !important**: Clean CSS cascade using proper specificity
- **Responsive Design**: Mobile-first approach with consistent breakpoints
- **⚠️ Known Issue**: Tailwind v4 `theme()` functions not working properly - using standard CSS values as fallback

### Theme Implementation
```css
/* Light theme (default) */
:root {
  --background: var(--color-white);
  --foreground: var(--color-gray-900);
  --primary: var(--color-blue-500);
  /* ... */
}

/* Dark theme via class */
.dark {
  --background: var(--color-gray-950);
  --foreground: var(--color-gray-50);
  --primary: var(--color-blue-400);
  /* ... */
}
```

### Build System
- **Code Generation**: Exercises and utilities parsed into JSON at build time using ts-node scripts
- **TypeScript Interfaces**: Shared types for exercises and utilities in `src/types/` and `src/interfaces/`
- **Static Assets**: Resume PDF served from public/ directory
- **SSG Build**: 27+ pages generated (14 exercises + 1 utility + core pages)
- **Type Safety**: Proper interfaces for PersonalInfo, Skills, ProjectItem, ResumeSection, ExerciseData, UtilityData
- **Pascal Case Convention**: All code showcase files use PascalCase naming for consistency
- **Optimal Solution Detection**: Algorithm automatically identifies best time complexity solutions
- **Dynamic Routing**: [slug].tsx pages for individual exercise and utility showcases

### Testing
- **Jest + Testing Library**: Component and logic testing
- **Coverage Reports**: Track test coverage
- **Mock Strategy**: Mock data imports and contexts in tests

---

## Current Status
- **Framework**: Next.js Pages Router with TypeScript
- **Architecture**: Modular component system with unified UI primitives
- **Testing**: Jest + React Testing Library + Playwright E2E visual regression
- **Styling**: Tailwind CSS v4 with CSS Modules and custom theme system
- **Build**: Static site generation with 24+ pages, optimal solution detection
- **Quality**: Full ESLint compliance, 22+ unit tests passing, multi-browser E2E coverage

## Key Technologies
- **Theming**: Custom CSS variables with light/dark mode and system preference detection
- **Tailwind CSS v4**: Layer-based architecture with fallback CSS values (theme() functions pending)
- **Performance**: Static JSON generation, service worker caching, minimal dependencies
- **Accessibility**: WCAG 2.1 AA compliance with screen reader support and keyboard navigation
- **PWA**: Offline support, app shortcuts, installable with custom icons


## Development Workflow ⚠️ CRITICAL
**ALWAYS run before committing:**
1. `npm run lint` - Zero ESLint warnings/errors
2. `npm test` - All test suites passing
3. `npm run build` - Successful compilation

## Documentation
- **CLAUDE.md**: Current project context and development guidelines
- **HISTORY.md**: Historical changes and major updates
- **TECH_DEBT.md**: Refactoring plans and technical debt tracking

---
*For project history and detailed changes, see [HISTORY.md](./HISTORY.md)*
- when committing, update the Markdown files, run tests (lint, unit, e2e, build), then git add & commit.