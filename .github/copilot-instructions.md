# CLAUDE.md - Project Context

## 🤖 Shared Context System
This serves as a **persistent knowledge base** shared between AI sessions for project continuity.

**memorize:** pattern - Any statement following `memorize:` becomes a candidate for inclusion in this context file.

## 🚨 Critical Policies

### Project Status Language
- NEVER use "complete", "completed", "finished", "done" status language
- NEVER add status fields to project data or interfaces  
- Use "current", "working", "functional", "implemented" instead

### Project Card Display Rules
- Projects in "Featured" section: No badges needed (already in Featured section)
- Projects in "All Projects & Case Studies" section: Show type badge
  - "Featured" - if project is also in Featured section
  - "Case Study" - if category contains "case study"
  - "Project" - for all other projects
- The featured field in data is ONLY for determining what shows in Featured section

### TypeScript Standards
- **Zero tolerance for `any` types** - Use specific interfaces/types
- **ESLint compliance required** - All errors are build-blocking
- **Vercel deployment fails** on TypeScript/ESLint errors

### Human Readability First
- Use template literals for multiline strings (not escaped `\n`)
- Write self-documenting code with clear naming
- Code should read like well-written prose

## Project Overview
- **Name**: jdilig-me-v2  
- **URL**: https://www.jdilig.me
- **Stack**: Next.js Pages Router, TypeScript, Tailwind CSS v4, Jest, Playwright
- **Analytics**: Google Analytics 4, Vercel Analytics, Core Web Vitals tracking
- **Architecture**: Modular components with unified UI system

## 📁 Project Structure
```
src/
├── pages/                  # Next.js Pages Router
├── components/
│   ├── ui/                # Core UI primitives
│   └── pages/             # Page components
├── interfaces/            # Domain data structures
├── types/                 # Utility types
├── data/                  # Static data
├── exercises/             # Algorithm exercises
├── utilities/             # Utility functions
└── scripts/               # Build scripts
projects/                  # Project showcase data
```

## 🎨 CSS Architecture (MANDATORY)

### Mobile-First Hierarchy
```css
/* 1. ROOT - Global foundation */
:root { /* CSS variables */ }

/* 2. COMPONENT - Reusable styles */
.component { /* Mobile-first base */ }

/* 3. PAGE - Specific overrides (minimize) */
.pageSpecific { /* Only when needed */ }

/* 4. THEME - Conditional overrides */
:global(.dark) .component { /* Dark only */ }
```

### Responsive Breakpoints
- Mobile: 320px+ (base)
- Tablet: `@media (min-width: 768px)`
- Desktop: `@media (min-width: 1024px)`

**NEVER**: Use `max-width` queries or desktop-first approach

## 🎨 Theming System

### Three-Tier Architecture
1. **`:root`** - Default/fallback palette
2. **`.light`** - Light mode overrides
3. **`.dark`** - Dark mode overrides

### Component Variables Pattern
```css
--card-bg-color-default: var(--color-neutral);
--banner-border-color-hover: var(--border-color-medium);
```
Naming: `--{component}-{property}-{state}`

## 🧪 Testing Infrastructure

### Jest (249 tests, 18 suites)
- Mock factories for browser APIs
- Component testing with accessibility
- Advanced test utilities framework

### Playwright E2E (160+ scenarios, 5 browsers)
- Core Web Vitals validation
- Cross-browser testing matrix
- Visual regression snapshots
- User journey testing

### Test Commands
```bash
npm test                # Jest unit tests
npm run test:e2e        # Playwright E2E
npm run test:all        # Both suites
npm run test:e2e:update # Update snapshots
```

## 💻 Development Commands
```bash
npm run dev             # Start dev server
npm run build           # Build production
npm run generate        # Generate JSON data
npm run process-images  # Process project images
npm run lint            # ESLint check
```

## 📊 Analytics Implementation
- **Google Analytics 4** via @next/third-parties/google
- **Vercel Analytics** with zero config
- **Custom event tracking** for code showcase interactions
- **Production-only** with environment gating

Setup: Add `NEXT_PUBLIC_GA_ID=G-XXX` to `.env.local`

## 🏗️ Component Architecture

### Structure Pattern
```
ComponentName/
├── index.tsx      # Clean export
├── script.tsx     # Component logic
├── style.module.css # Scoped styles
└── test.tsx       # Jest tests
```

### UI Component System
Core primitives: PageContainer, PageHeader, Section, Card, Grid, Modal, ProfileImage, CodeShowcase, SolutionTabs, Breadcrumb

### TypeScript Organization
- `interfaces/` - Domain data structures (what data looks like)
- `types/` - Utility types (how code behaves)
- Shared template pattern: Shared → Showcase → Exercise/Utility

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
npm run test:e2e         # Run Playwright E2E tests
npm run test:all         # Run both unit and E2E tests
npm run test:e2e:ui      # Run E2E tests with UI
npm run test:e2e:headed  # Run E2E tests in headed mode
npm run generate         # Generate exercises + utilities + projects JSON
npm run generate:exercises  # Generate exercises JSON only
npm run generate:utilities  # Generate utilities JSON only
npm run generate:projects   # Generate projects JSON from TypeScript modules
npm run process-images   # Process project images (requires slug parameter)
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

## 🐛 Known Issues & Lessons

### Infinite Refresh Bug (Resolved)
- **Cause**: Direct TS module imports in data layer
- **Solution**: Use stable JSON imports
- **Prevention**: Always use build pipeline for data imports

### Interface Design Patterns
- Required fields for core data
- Optional fields for enhancements
- Never spread undefined values (overwrites existing)
- Always provide fallbacks for optional fields

## 📚 Key References
- **TECH_DEBT.md** - Refactoring plans and priorities
- **AI_PROJECT_SETUP.md** - AI assistant project guide
- **HISTORY.md** - Historical changes record

## 🎯 Accessibility & Quality
- WCAG 2.1 AA compliant
- Complete ARIA implementation
- Mobile-first responsive design
- 38+ pages static generation
- PWA with offline support

---
*Critical reminders:*
- Do only what's asked, nothing more
- Never create files unless necessary
- Always prefer editing over creating
- Never proactively create documentation
