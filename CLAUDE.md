# CLAUDE.md - Project Context & References

## 🧠 Memorize Pattern for Context Updates

To streamline adding new information to this context file, you can use the special pattern:

**memorize:**

Any statement or block following a line that starts with `memorize:` should be considered as a candidate for inclusion in this file as persistent project context. When you instruct Copilot or Copilot Chat with a message like:

```
memorize: [your statement here]
```

I will suggest or make an edit to append that statement to this file, ensuring it becomes part of the shared project context for future suggestions and responses.

**Example usage:**
```
memorize: All new utility functions must include at least one usage example and a complexity analysis.
```

This workflow helps maintain a living, up-to-date project knowledge base.

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
-### Recent Changes (August 2025)
  - Implemented custom favicon and app icons using assets in /public/images/favicon (multi-size PNG, ICO, Apple touch, manifest)
  - Added Playwright E2E test to verify favicon and app icon links in <head>
- Added SEOHead to Utilities and Exercises pages for correct page titles and SEO meta tags (fixes E2E Playwright title checks)
- Split Playwright E2E tests into per-page spec files for maintainability
- Cleaned up obsolete combined E2E spec files and snapshots
- All test errors (unit, E2E, lint, type, and Playwright visual snapshot mismatches) are now build-blocking and must be resolved before commit. Only warnings or skips that are essential but not build-breaking are tracked in TECH_DEBT.md. Snapshots must be updated and validated as part of the commit workflow. Correct Playwright snapshots are required to catch UI/data issues before deploy.
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
- **HeroBanner**: Article-based hero sections with stats, tags, and ARIA support
- **ProfileImage**: Multi-shape image component with accessibility features
- **Modal**: Accessible, theme-aware modal dialog for overlay content
- **CodeShowcase**: 2+1 layout component for algorithm exercises with description, code, and examples
- **UtilityShowcase**: Utility function display component with usage examples
- **SolutionTabs**: Tabbed interface for multiple algorithm solutions with complexity analysis

### Mobile-First Responsive Design

### Modal Component
- **Location**: `src/components/ui/Modal/`
- **Features**: Accessible dialog with `role="dialog"`, `aria-modal`, keyboard focus, and close button
- **Props**: `open`, `onClose`, `children`, `title?`, `className?`
- **Styling**: Mobile-first, theme-aware, customizable via CSS Modules
- **Testing**: Fully tested with Jest (unit tests for open/close, content, and accessibility)
- **Usage**: Import from `@/components/ui` and control with state
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
│   │   ├── HeroBanner/    # Hero sections with ARIA support
│   │   ├── ProfileImage/  # Multi-shape image component (circle, box, rounded, hexagon)
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
│   ├── projects.ts        # Legacy projects data (deprecated)
│   └── navigation.ts      # Site navigation items
├── exercises/             # Coding exercises (TypeScript files with metadata)
├── utilities/             # Utility functions (TypeScript files with examples)
├── interfaces/            # Domain-specific data structures
│   ├── exercises.ts       # Exercise and example case interfaces
│   ├── utilities.ts       # Utility function interfaces
│   ├── projects.ts        # Project data interfaces
│   └── shared.ts          # Shared interfaces and types
├── types/                 # Reusable utility types and UI definitions
│   └── index.ts           # Common types, UI props, system enums
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
├── scripts/               # Build and generation scripts
│   ├── generate-all.ts    # Generate all JSON files
│   ├── generate-exercises.ts # Parse exercises to JSON
│   ├── generate-utilities.ts # Parse utilities to JSON
│   ├── generate-projects.ts  # Parse projects TypeScript modules to JSON
│   └── process-project-images.ts # Image processing pipeline
└── styles/                # Global styles
    └── globals.css        # Tailwind imports and theme variables
projects/                  # Project data (TypeScript modules)
└── personal-website-v2.ts # Individual project TypeScript files
raw-images/                # Raw project images for processing
└── {project-slug}/        # Project-specific image folders
```

## TypeScript Organization

The project uses a clear separation between **interfaces** and **types**:

### **Interface Hierarchy**
The codebase follows a shared template pattern: **Shared** (collection) → **Showcase** (template) → **Exercise, Utility** (specific types)

- **src/interfaces/shared.ts**: Collection of shared utility types & interfaces
  - Core data types (DataValue, DataArray, DataTuple, DataStructure)
  - Input/output types (ExerciseInput, UtilityInput, ExerciseOutput, UtilityOutput)
  - Classification enums (DifficultyLevel, SolutionType)
  - Base interfaces (BaseMetadata, Solution, SolutionMetadata)
  - **Showcase<TMetadata, TExample>**: Base template interface for both exercises and utilities

- **src/interfaces/exercises.ts**: Exercise-specific structures extending shared base
  - **ExerciseData = Showcase<ExerciseMetadata, ExampleCase>**
  - ExampleCase interface with required input/output
  - ExerciseMetadata type alias

- **src/interfaces/utilities.ts**: Utility-specific structures extending shared base  
  - **UtilityData = Showcase<UtilityMetadata, UtilityExample>**
  - UtilityExample interface with optional input/output
  - UtilityMetadata extends BaseMetadata with category field

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

### Testing
#### E2E Favicon Test
- Playwright E2E test (`tests/e2e/favicon.spec.ts`) verifies that all favicon and app icon <link> tags are present and point to the correct files in /images/favicon.
- **Jest + Testing Library**: Component and logic testing
- **Coverage Reports**: Track test coverage
- **Mock Strategy**: Mock data imports and contexts in tests

## ProfileImage Component System

### Shape Variants & Usage
- **Circle** (`shape="circle"`): Default circular profile images - used in ResumeDisplay
- **Box** (`shape="box"`): Sharp-cornered square variant for formal contexts
- **Rounded** (`shape="rounded"`): Rounded-corner square variant - used in Homepage hero
- **Hexagon** (`shape="hexagon"`): Six-sided polygon using CSS clip-path for creative displays

### Implementation Details
```tsx
import { ProfileImage } from '@/components/ui';

// Usage examples
<ProfileImage 
  src="/images/profile.png" 
  alt="John Dilig - Developer"
  shape="rounded"           // circle | box | rounded | hexagon
  width={160}
  height={160}
  priority={true}
/>
```

### Technical Features
- **Next.js Integration**: Uses optimized Next.js Image component with priority loading
- **TypeScript Safety**: Full type definitions with ProfileImageProps and ProfileImageShape types
- **CSS Modules**: Scoped styling with hover effects and responsive behavior
- **Performance**: Configurable quality settings and lazy loading support

## Accessibility (WCAG 2.1 AA Compliance)

### ARIA Implementation
- **ProfileImage**: `role="img"` with descriptive shape labels (`circular profile image`, `hexagonal profile image`)
- **HeroBanner**: Semantic `<article>` structure with proper heading hierarchy
- **Stats Sections**: `role="group"` with individual `role="status"` items and comprehensive `aria-label` descriptions
- **Contact Cards**: Complete ARIA labeling for email/phone/location with proper relationships via `aria-labelledby`
- **Navigation Elements**: Keyboard accessible with proper focus management

### Screen Reader Support
- **Content Relationships**: `aria-describedby` relationships between titles and descriptions
- **Landmark Roles**: Proper `<section>`, `<header>`, `<article>` structure for navigation
- **Hidden Decorative Elements**: Icons marked with `aria-hidden="true"` to avoid clutter
- **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3) throughout components
- **Status Announcements**: Dynamic content changes announced to assistive technology

### Testing Coverage
- **Unit Tests**: 64+ tests including 15+ accessibility-specific test cases
- **ARIA Validation**: Tests verify proper role assignments, aria-label content, and relationship attributes
- **Keyboard Navigation**: All interactive elements properly focusable and keyboard accessible
- **Cross-Browser**: Playwright E2E tests across Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari

---

## Current Status
- **Framework**: Next.js Pages Router with TypeScript
- **Architecture**: Modular component system + unified UI primitives + ProfileImage variants + Complete project showcase system
- **Testing**: Jest + React Testing Library + Playwright E2E visual regression (84+ tests passing)
- **Styling**: Tailwind CSS v4 with CSS Modules and custom theme system
- **Build**: Static site generation with 38+ pages + automated image processing + JSON consolidation pipelines
- **Quality**: Full ESLint compliance, comprehensive accessibility testing, multi-browser E2E coverage
- **Accessibility**: WCAG 2.1 AA compliant with complete ARIA implementation and screen reader support
- **Project System**: Complete automated showcase with PROJECT.md workflow, image processing, and responsive design

## Project Showcase System

### **Complete Implementation** ✅
- **Hero banner cards** matching Code page design with gradients and hover effects
- **Screenshots moved to Project Overview** (first section) with modal interactions
- **TypeScript modules** for type-safe project data management
- **Automated image processing** with naming convention: `[number]-[category]-[description].[ext]`
- **Build-time consolidation** similar to exercises/utilities system
- **Comprehensive guide documentation** with multiple workflow approaches
- **Type-safe interfaces** with comprehensive project data structure

### **Project System Commands**
```bash
npm run process-images [slug]    # Process project images for specific project
npm run process-images all       # Process images for all projects
npm run generate:projects        # Generate projects JSON from TypeScript modules
npm run generate                 # All generation (exercises + utilities + projects)
```

### **File Structure (TypeScript Project Modules)**
```
projects/{project-name}.ts      # Individual project data as typed TS modules
raw-images/{project-name}/      # Raw images with naming convention  
public/projects.json            # Generated consolidated data
public/projects-index.json      # Generated project index
```

### **Project Data Module Implementation**
Each project is a TypeScript file in `/projects/{project-name}.ts` that exports a typed object:

```ts
import { ProjectData } from '@/interfaces/projects';

const project: ProjectData = {
  slug: 'my-cool-project',
  metadata: {
    title: 'My Cool Project',
    name: 'my-cool-project',
    description: 'A short summary of the project.',
    detailedDescription: 'Comprehensive description...',
    category: 'Full-Stack Development',
    status: 'completed',
    startDate: '2024-01',
    endDate: '2024-03',
    duration: '3 months',
    role: 'Full-Stack Developer',
    difficulty: 'Hard',
    featured: true
  },
  techStack: [{
    category: 'Frontend Framework',
    items: ['Next.js', 'TypeScript', 'Tailwind CSS']
  }],
  features: [{
    title: 'Key Feature',
    description: 'Feature description',
    impact: 'Impact measurement'
  }],
  highlights: [{
    title: 'Technical Achievement',
    description: 'Implementation details',
    achievements: ['Achievement 1', 'Achievement 2']
  }],
  links: [{
    type: 'live',
    url: 'https://example.com',
    label: 'Live Demo'
  }],
  lessons: ['Learning 1', 'Learning 2'],
  challenges: ['Challenge 1', 'Challenge 2'],
  futureImprovements: ['Improvement 1', 'Improvement 2']
};

export default project;
```

### **Project Addition Workflow**

**Simple Approach** (see `ADD_PROJECT_SIMPLE.md`):
1. Upload images to `raw-images/{project-slug}/` following naming convention
2. Write `PROJECT.md` with complete project documentation 
3. Run `npm run process-images {slug}` and `npm run generate:projects`

**Comprehensive Approach** (see `PROJECT_GUIDE.md`):
- Detailed project data structure guide
- Image processing workflow with `IMAGE_WORKFLOW.md`
- Complete metadata collection checklist
- Integration testing steps

**Benefits:**
- Type safety and autocompletion
- Consistent with exercises/utilities system
- Comprehensive documentation guides
- Automated image processing pipeline
- Easy project addition workflow

### **Image Processing System**
- **Format**: `[number]-[category]-[description].[ext]`
- **Categories**: `desktop` (1200×800), `mobile` (375×667), `tablet` (768×1024), `feature` (800×600)
- **Auto-processing**: WebP + PNG output, thumbnails, quality optimization
- **Workflow Documentation**: Complete guide in `IMAGE_WORKFLOW.md`
- **Simple Setup**: Drop images in `raw-images/{slug}/` and run processing command

## Key Technologies
- **Theming**: Custom CSS variables with light/dark mode and system preference detection
- **Tailwind CSS v4**: Layer-based architecture with fallback CSS values (theme() functions pending)
- **Performance**: Static JSON generation, service worker caching, minimal dependencies
- **Accessibility**: WCAG 2.1 AA compliance with comprehensive ARIA implementation, screen reader support, and keyboard navigation
- **ProfileImage System**: 4 shape variants (circle, box, rounded, hexagon) with accessibility features
- **Component Testing**: 64+ Jest tests including accessibility validation and ARIA compliance
- **PWA**: Offline support, app shortcuts, installable with custom icons



## Development & Commit Workflow ⚠️ CRITICAL
**Commit Message Standard:**
- If a commit includes more than one change, write the commit message in an itemized (bulleted or numbered) format, listing each change clearly.
**ALWAYS follow this workflow before committing:**
* All test errors (unit, E2E, lint, type, Playwright visual) are build-blocking. No errors may be skipped or ignored for a successful build/commit.
* Only warnings/skips that are essential but not build-breaking are tracked in TECH_DEBT.md for follow-up.
1. **Update Documentation:**
  - `CLAUDE.md`: Update AI context, architecture, and workflow notes
  - `HISTORY.md`: Summarize all recent changes (features, refactors, fixes)
  - `TECH_DEBT.md`: Log non-urgent improvements or follow-ups
  - `README.md`: Update technical documentation, scripts, and usage
2. **Update & Run Tests:**
  - Add/update tests for all new/changed features (unit, E2E, etc.)
  - Run tests in strict order:
    1. `npm run lint` (ESLint)
    2. `npm test` (Jest unit tests)
    3. `npx playwright test` (E2E tests) — **E2E tests are commit-essential: all must pass before commit, not just before deploy.**
    4. `npm run build` (build check)
3. **Git Flow:**
  - Stage all changes (`git add`)
  - Write a detailed commit message documenting all work
  - Commit and push (or notify user to push if not possible)

**Notes:**
- Always update or add tests for all changes before committing.
- Document every significant change in the Markdown files.
- This workflow ensures code quality, documentation, and reproducibility for both AI and human contributors.

## Documentation
- **CLAUDE.md**: Current project context and development guidelines
- **HISTORY.md**: Historical changes and major updates
- **TECH_DEBT.md**: Refactoring plans and technical debt tracking
- **PROJECT_GUIDE.md**: Comprehensive guide for adding new projects
- **ADD_PROJECT_SIMPLE.md**: Simplified project addition workflow
- **IMAGE_WORKFLOW.md**: Image processing pipeline documentation
- **PROJECT.md**: Project showcase data for the website itself

---
*For project history and detailed changes, see [HISTORY.md](./HISTORY.md)*
- when committing, update the Markdown files, run tests (lint, unit, e2e, build), then git add & commit.
- always update, or add, tests for all (unit, e2e, etc.) whenever possible, and before committing work.
- make sure to update the technical documentation on README.md