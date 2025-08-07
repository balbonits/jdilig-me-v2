# CLAUDE.md - Project Context & References

This file contains context and references for the jdilig-me-v2 project to help Claude understand the codebase structure and conventions.

## Project Overview
- **Name**: jdilig-me-v2
- **Type**: Personal website
- **Framework**: Next.js with Pages Router
- **Technologies**: React, TypeScript, Tailwind CSS v4
- **Branch**: master
- **Status**: Hybrid SSG + CSR approach for optimal SEO and performance
- **Architecture**: Static generation for key pages, client-side for interactive components

## Website Features
- Home page (/) - main landing with resume/CV section
- Projects page (/projects) - work/project gallery showcase  
- Code section (/code) - parent route for coding showcase
  - Exercises listing (/code/exercises) - algorithm & data structure problems
  - Individual exercises (/code/exercises/[name]) - e.g., /code/exercises/AnagramCheck
  - Utilities listing (/code/utilities) - practical utility functions
  - Individual utilities (/code/utilities/[name]) - e.g., /code/utilities/Debounce
- About page (/about) - personal info and contact details

## Design Principles
- **Hybrid Rendering**: SSG for key pages (SEO), CSR for interactive components (performance)
- Mobile-first, responsive design
- Single Page Application (SPA) with smooth scroll navigation
- Performance-first approach
- Sticky/floating header navigation
- Custom theming system (light/dark, extensible for future custom themes)
- Fast, subtle transitions without "blinking" effects
- Clean, close-to-metal implementation (no heavy animation libraries)
- **Data Loading**: Static generation at build time + client-side for dynamic content
- **SEO Optimized**: Search engine friendly with pre-rendered content

## Technical Architecture
- **Rendering**: Hybrid SSG + CSR (Static Site Generation for key pages, Client-Side for interactive components)
- **Data Fetching**: Build-time static generation + client-side for dynamic features
- **SEO Strategy**: Pre-rendered HTML with ISR (Incremental Static Regeneration) revalidation
- **SSG Implementation**: Key pages (Home, About, Projects, Code listings) use `getStaticProps` with 1-hour revalidation
- **CSR Components**: Interactive showcases (CodeShowcase) remain client-side for optimal UX
- **PWA Ready**: Future enhancement, not blocking launch
- Building from scratch with Claude Code
- Will deploy to existing Vercel deployment (v2 iteration)

## Project Structure
```
src/
├── app/                    # Global app configuration & context
│   ├── layout.tsx         # Root layout with ThemeProvider + SiteLayout
│   ├── globals.css        # Global styles + Tailwind v4 layers + CSS variables
│   └── [other global files] # App-level configuration, contexts, providers
├── pages/                 # Next.js Pages Router - ALL routing handled here
│   ├── index.tsx          # Home page (/)
│   ├── projects.tsx       # Projects page (/projects)
│   ├── about.tsx          # About page (/about)
│   ├── code/              # Code section pages
│   │   ├── index.tsx      # Code main page (/code)
│   │   ├── exercises/     # Exercises section
│   │   │   ├── index.tsx  # Exercises listing (/code/exercises)
│   │   │   └── [name].tsx # Individual exercise (/code/exercises/AnagramCheck)
│   │   └── utilities/     # Utilities section
│   │       ├── index.tsx  # Utilities listing (/code/utilities)
│   │       └── [name].tsx # Individual utility (/code/utilities/Debounce)
│   ├── _app.tsx           # Custom App component
│   └── _document.tsx      # Custom Document component
├── components/            # Reusable UI components
│   ├── pages/             # Page-level components (imported by routes)
│   │   ├── HomePage/      # Home page component
│   │   ├── ProjectsPage/  # Projects page component  
│   │   ├── AboutPage/     # About page component
│   │   ├── CodePage/      # Code main page component
│   │   ├── ExercisesPage/ # Exercises listing page component
│   │   ├── UtilitiesPage/ # Utilities listing page component
│   │   ├── ErrorPage/     # Error page component
│   │   └── ComingSoonPage/ # Coming soon page component
│   ├── {ComponentName}/   # UI Component structure:
│   │   ├── index.tsx      #   - Clean imports
│   │   ├── script.tsx     #   - Main component logic (imports ./style.css)
│   │   ├── style.css      #   - Component styles (Tailwind v4 + theme() functions)
│   │   └── test.tsx       #   - Jest tests
│   ├── SiteHeaderNav/     # Fixed header navigation
│   ├── SiteLayout/        # Main layout wrapper
├── contexts/              # React contexts
│   └── ThemeContext.tsx   # Custom theme system
├── data/                  # Static data
│   ├── resume.ts          # Personal info, experience, skills
│   ├── projects.ts        # Portfolio projects
│   └── navigation.ts      # Site navigation items
├── exercises/             # Coding exercises (parsed by build scripts)
├── utilities/             # Utility functions (parsed by build scripts)
├── hooks/                 # Custom React hooks
├── interfaces/            # TypeScript interfaces
├── lib/                   # Utility libraries (including codeData.ts)
└── types/                 # TypeScript type definitions
```

## Routing Architecture
**Pages Router Strategy**: Clear separation between routing and page components
- `src/pages/` - Contains route files that import page components (e.g., `index.tsx` imports `HomePage`)
- `src/components/pages/` - Contains actual page component implementations
- `src/app/` - Reserved for global app configuration, contexts, and providers
- Dynamic routes use `[name].tsx` for parameterized pages
- Exercises and utilities use filename-based routing (e.g., AnagramCheck.ts → /code/exercises/AnagramCheck)

**Component Architecture**: 
- **Route files** (`src/pages/*.tsx`) handle Next.js routing and import page components
- **Page components** (`src/components/pages/*/`) contain the actual UI logic and can be reused/tested independently
- **UI components** (`src/components/*/`) are reusable across multiple pages

## Development Commands
```bash
npm run dev              # Start development server
npm run build            # Generate code JSON + build Next.js
npm run build:next       # Build Next.js only
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
- **Tailwind CSS v4**: Latest version with explicit layer system and theme() functions
- **Global CSS**: Component styles consolidated in `src/styles/globals.css` for build optimization
- **Layer Architecture**: @layer theme, base, components, utilities for proper cascade
- **CSS Variables**: Theme-aware colors and fonts for dynamic theming
- **theme() Functions**: Replace deprecated @apply with Tailwind v4's theme() syntax
- **Mobile-first**: Responsive design starting from mobile
- **Component Organization**: Styles organized by component in global CSS layers

### Build System
- **Code Generation**: Exercises and utilities parsed into JSON at build time
- **TypeScript Interfaces**: Shared types for exercises and utilities in `src/types/` and `src/interfaces/`
- **Static Assets**: Resume PDF served from public/ directory
- **SSG Build**: 25 pages generated (14 exercises + 1 utility + core pages)
- **Type Safety**: Proper interfaces for PersonalInfo, Skills, ProjectItem, ResumeSection

### Testing
- **Jest + Testing Library**: Component and logic testing
- **Coverage Reports**: Track test coverage
- **Mock Strategy**: Mock data imports and contexts in tests

## Important Notes

### Theming System
- Custom implementation (no libraries)
- CSS variables for dynamic theme switching
- Light/dark mode with system preference detection
- Extensible for future custom themes

### Tailwind CSS v4 Implementation
- **Layer System**: Explicit `@layer theme, base, components, utilities` declaration
- **Import Strategy**: 
  - `@import "tailwindcss/theme.css" layer(theme)`
  - `@import "tailwindcss/preflight.css" layer(base)` 
  - `@import "tailwindcss/utilities.css" layer(utilities)`
- **Component Styles**: Use `theme()` functions instead of deprecated `@apply`
- **Modular Architecture**: Each component imports its own CSS file
- **Examples**:
  ```css
  /* Tailwind v4 approach */
  .button {
    padding: theme('spacing.3') theme('spacing.6');
    border-radius: theme('borderRadius.lg');
    font-weight: theme('fontWeight.medium');
  }
  
  /* NOT the old @apply approach */
  .button-old {
    @apply px-6 py-3 rounded-lg font-medium; /* DEPRECATED */
  }
  ```

### Performance Strategy
- SPA with smooth scroll navigation (no routing overhead)
- Static JSON generation at build time
- CSS transitions for theme changes (no "blinking")
- Minimal dependencies ("close to the metal" approach)
- **PWA Features**: Service worker caching, offline support, app shortcuts
- **Web Accessibility**: Screen reader support, keyboard navigation, focus management, semantic HTML

### Code Display
- Simple `<pre><code>` with custom CSS classes
- No syntax highlighting dependencies (can add later)
- Monospace Geist font integration
- **Enhanced Layout**: CodeItemDisplay uses 2-column + 1 row grid layout:
  - Left: Description and title
  - Right: Code implementation  
  - Bottom: Examples/Test Cases (spanning both columns)

## Accessibility & PWA Features

### Web Accessibility (WCAG 2.1 AA)
- **Semantic HTML**: Proper heading hierarchy, landmarks, sections
- **Screen Reader Support**: ARIA labels, live regions, skip links
- **Keyboard Navigation**: Tab order, focus management, keyboard shortcuts
- **Focus Management**: Visible focus indicators, focus trapping
- **Route Announcements**: Screen reader notifications on page changes
- **High Contrast**: Support for prefers-contrast media query
- **Reduced Motion**: Respects prefers-reduced-motion preference
- **Color Accessibility**: Sufficient color contrast ratios

### Progressive Web App (PWA)
- **Service Worker**: Offline caching, background sync capabilities
- **Web App Manifest**: Installable app with custom icons and shortcuts
- **Offline Support**: Core pages cached for offline viewing
- **App Shortcuts**: Quick access to Projects, Code, and About sections
- **Performance**: Optimized loading with cache-first strategy
- **Security Headers**: XSS protection, content type sniffing prevention
- **Icons**: Full icon set for various device sizes and platforms

### Accessibility Keyboard Shortcuts
- **Alt + S**: Skip to main content
- **Tab/Shift+Tab**: Navigate through interactive elements
- **Escape**: Close modals/dropdowns (when implemented)
- **Enter/Space**: Activate buttons and links

## Recent Changes & Updates

### December 2024 - SEO & Layout Improvements
- **SSG Implementation**: Converted from pure CSR to hybrid SSG+CSR approach
  - Home, About, Projects, and Code pages now use Static Site Generation
  - Individual exercise/utility pages already had SSG
  - Added ISR with 1-hour revalidation for dynamic content updates
  - Build generates 25 static pages for improved SEO and performance
- **Enhanced Code Layout**: Updated CodeItemDisplay component
  - New 2-column + 1 row grid layout for better content organization
  - Description (left) | Code (right) | Examples (bottom spanning both)
  - Responsive design maintains mobile-first approach
- **Type Safety Improvements**: Consolidated type definitions
  - Added PersonalInfo, Skills interfaces to `src/types/index.ts`
  - Proper typing for all page props (replaced `unknown[]` usage)
  - Leveraged existing interfaces from `src/interfaces/exercises.ts`
- **Build Optimization**: Resolved CSS import issues
  - Consolidated component styles into `src/styles/globals.css`
  - Maintained Tailwind v4 theme() function approach
  - Eliminated Next.js build warnings for global CSS imports

### Fixed Issues
- **Infinite Refresh Bug**: Resolved React dependency loop in CodeDataContext
- **TypeScript Errors**: Proper type definitions throughout the application
- **CSS Import Conflicts**: Moved component styles to global CSS for build compatibility
- **SEO Limitations**: Added static generation for search engine visibility

## January 2025 - Critical Bug Resolution & Rebuild

### Infinite Refresh Bug Investigation
- **Problem**: Fast Refresh infinite reload loop causing development server instability
- **Root Cause**: Complex React patterns causing hydration mismatches and dependency loops:
  1. `useMemo`/`useCallback` with incomplete or circular dependencies
  2. SSR/CSR hydration mismatches in theme components
  3. Stale browser cache loading outdated component logic
- **Solution**: Systematic rebuild approach isolating each component

### Current State (January 2025)
- **Status**: Clean rebuild in progress with basic functionality working
- **Working Components**: 
  - Basic Pages Router setup with Home, About, Projects, Code pages
  - Simple ThemeContext with localStorage persistence (no complex memoization)
  - Basic SiteLayout with navigation and theme toggle
  - Tailwind CSS v4 implementation
- **Verified Working**: Navigation, theme toggle, no hydration errors or infinite refresh

### Debugging Methodology That Worked
1. **Git-based testing**: Reverted to initial commit to establish baseline
2. **Incremental rebuilding**: Added components one-by-one with testing at each step
3. **Cache clearing**: Systematic clearing of Next.js (.next) and browser caches
4. **Debug logging**: Strategic console.log placement to track render cycles
5. **Isolation testing**: Disabled providers/contexts to isolate issues

### Key Lessons Learned
- **Avoid complex memoization** during initial development - optimize later
- **Simple patterns work**: Basic `useEffect` + `useState` patterns are stable
- **Hydration matters**: Server/client rendering consistency is critical
- **Cache clearing is essential** when debugging React development issues
- **Systematic approach**: Don't guess - isolate and test incrementally

### Next Steps for Rebuild
1. Clean up debug console.log statements
2. Fix ThemeContext useEffect dependency (currently `[theme]` could cause loops)
3. Add remaining components using simple patterns first
4. Add data generation scripts and content
5. Optimize with memoization only after core functionality is stable

## Documentation Maintenance

### CLAUDE.md Updates
- **Automatically maintain**: Update this file when making significant architectural, technical, or structural changes
- **Key sections to update**: Project structure, dependencies, build commands, conventions, important notes
- **No need to ask**: Proactively update CLAUDE.md when relevant changes impact project understanding or workflow
- **Repository files**: Also maintain `.gitignore` and other config files as needed when adding new tools or dependencies

---
*This file is maintained to provide context for AI assistance and should be updated as the project evolves.*