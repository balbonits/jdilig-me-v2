# John Dilig - Personal Website v2

A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS v4. Features a modular component architecture with CSS modules, a unified design system, and comprehensive code showcase.

## 🚀 Tech Stack

- **Framework**: Next.js (Pages Router) with TypeScript
- **Styling**: Tailwind CSS v4 + CSS Modules
- **Architecture**: Modular components with reusable UI primitives
- **Theme**: Light/dark mode with CSS custom properties
- **Testing**: Jest (249 tests) + Playwright E2E (160+ scenarios, 5 browsers) + Advanced performance & accessibility testing
- **Analytics**: Vercel Analytics + Google Analytics 4 with Core Web Vitals tracking
- **Quality**: Full ESLint compliance, automated visual regression testing

## 🎯 Features

- **Personal Portfolio**: Resume, projects, and professional experience
- **Code Showcase**: 15+ algorithm exercises with multiple solutions and complexity analysis
- **Utility Functions**: Reusable TypeScript utilities with documentation
- **Modular About Components**: JourneyCard, ExperienceCard, SkillCard, ContactSection for reusable professional displays
- **Responsive Design**: Mobile-first approach across all components
- **Theme System**: Smooth light/dark mode transitions
- **Accessibility**: WCAG 2.1 AA compliant with comprehensive ARIA support
- **ProfileImage System**: 4 shape variants (circle, box, rounded, hexagon) with accessibility features
- **PWA Ready**: Offline support, app shortcuts, and installable interface

## 📊 Analytics & Performance Monitoring

### Professional Analytics Implementation
- **Google Analytics 4**: Official Next.js integration (@next/third-parties/google) with TypeScript definitions
- **Vercel Analytics**: Automatic deployment analytics with zero-configuration setup
- **Core Web Vitals**: Automatic tracking of LCP, FID, CLS, FCP, and TTFB metrics
- **Custom Events**: Comprehensive user behavior tracking across code showcase interactions

### User Behavior Tracking
- **Code Showcase**: Exercise/utility card clicks, page views, and code copy events
- **Navigation**: User journey analysis with referrer tracking
- **Engagement**: Theme changes, modal interactions, and usage depth
- **Performance**: Real-time Core Web Vitals monitoring with GA4 integration

### Configuration
```bash
# .env.local (production only)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics 4 Measurement ID
# Vercel Analytics: Auto-enabled on Vercel deployments
```

### Privacy & Performance
- **Production-Only**: No tracking in development mode
- **Zero Performance Impact**: Deferred loading, no Core Web Vitals impact  
- **Type Safe**: Full TypeScript definitions for gtag and va functions
- **Error Handling**: Graceful degradation when analytics unavailable

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

## 🗂️ Project Showcase System

### TypeScript Module Architecture
Project data is stored as individual TypeScript modules in the `projects/` directory. Each file exports a typed `ProjectData` object with comprehensive metadata, features, tech stack, and more.

**Complete Example:**
```ts
import { ProjectData } from '@/interfaces/projects';

const project: ProjectData = {
  slug: 'my-cool-project',
  metadata: {
    title: 'My Cool Project',
    name: 'my-cool-project',
    description: 'A modern web application built with React and TypeScript.',
    detailedDescription: 'Comprehensive description of the project...',
    category: 'Full-Stack Development',
    status: 'completed',
    startDate: '2024-01',
    
    
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

### Image Processing Pipeline
Automated image optimization with naming convention detection:
- **Format**: `[number]-[category]-[description].[ext]`
- **Categories**: `desktop` (1200×800), `mobile` (375×667), `tablet` (768×1024), `feature` (800×600)
- **Output**: WebP + PNG formats, thumbnails, quality optimization
- **Commands**: `npm run process-images [slug]` or `npm run process-images all`

### Project Addition Workflow
1. **🤖 AI Assistant Workflow** ⭐ **RECOMMENDED**: Use `AI_PROJECT_SETUP.md` - comprehensive guide for any AI assistant (Claude Code, Gemini, etc.) to add projects seamlessly
2. **Simple**: Upload images to `raw-images/{slug}/`, write `PROJECT.md`, run processing  
3. **Comprehensive**: Follow `PROJECT_GUIDE.md` for detailed manual workflow
4. **Documentation**: See `ADD_PROJECT_SIMPLE.md` and `IMAGE_WORKFLOW.md` for legacy approaches

**Benefits:**
- Type safety and autocompletion
- Consistent with exercises/utilities system
- Automated image processing pipeline
- Comprehensive documentation guides
- Easy project addition workflow

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



## 🧪 **Enterprise-Grade Testing Infrastructure** ⭐

### **Professional Testing Excellence**
Our testing infrastructure demonstrates **Fortune 500-level development practices** with comprehensive coverage across all quality dimensions, positioning for senior/lead engineering roles.

### **Jest Testing Suite - 249 Tests Across 18 Suites**
**Advanced Test Utilities Framework** (`src/__tests__/test-utils.ts`):
- **Mock Factories**: localStorage, matchMedia, IntersectionObserver, ResizeObserver with realistic behavior
- **Spy Utilities**: Console spies with automatic cleanup, window method interceptors
- **Data Generators**: Comprehensive mock data for journey, experience, skill, contact components
- **Custom Assertions**: Accessibility validation, component testing patterns

**Comprehensive Component Testing**:
- **SkillCard Component**: 12 specialized tests covering filtering algorithms, year parsing, accessibility
- **Hook Testing**: Advanced browser API integration, error boundaries, graceful degradation
- **Edge Case Validation**: Empty states, malformed data, performance under load

### **Playwright E2E Testing - 160+ Scenarios Across 5 Browsers**
**Custom Fixtures Framework** (`tests/fixtures/playwright-fixtures.ts`):
- **Network Interception**: API mocking, offline simulation, 3G network throttling
- **Performance Fixtures**: CPU throttling, memory monitoring, Core Web Vitals validation
- **Accessibility Fixtures**: Screen reader simulation, keyboard navigation testing
- **Mobile Testing**: Touch interactions, responsive behavior, PWA compliance

**Advanced Testing Suites**:
- **Performance Testing** (`advanced-performance.spec.ts`): Core Web Vitals, memory leak detection, caching validation
- **User Journey Testing** (`user-journey.spec.ts`): Complete recruiter evaluation flows, accessibility compliance
- **Cross-Browser Matrix**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Network Conditions**: 3G simulation, offline scenarios, progressive enhancement

### **Quality Assurance Standards**
**Performance Validation**:
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Memory Management**: Theme switching leak detection, component lifecycle validation
- **Network Resilience**: Offline functionality, API failure handling

**Accessibility Compliance**:
- **WCAG 2.1 AA**: Complete keyboard navigation, screen reader compatibility
- **Cross-Platform**: Mobile accessibility, touch interaction validation
- **Error Boundaries**: Graceful degradation, user-friendly error states

### **Professional Testing Commands**
```bash
# Jest Testing (249 tests, 18 suites)
npm run test                     # Run all Jest tests
npm run test:coverage           # Generate coverage report
npm run test:watch              # Development watch mode

# Advanced Playwright E2E (160+ scenarios, 5 browsers)
npm run test:e2e                # All E2E tests with text reporting
npm run test:e2e:performance    # Core Web Vitals & performance testing
npm run test:e2e:journey        # Complete user journey validation
npm run test:e2e:advanced       # All advanced testing suites
npm run test:coverage:full      # Combined Jest coverage + advanced E2E

# Specialized Testing
npm run test:e2e:update         # Update Playwright visual snapshots
npm run test:all                # Complete test suite execution
```

### **Career Impact & Professional Benefits**
**Technical Skill Demonstration**:
- **Senior/Lead Engineer Level**: Advanced testing patterns, performance monitoring
- **Enterprise Readiness**: Fortune 500-grade quality assurance practices
- **Full-Stack Awareness**: End-to-end validation from unit to user experience
- **Performance Consciousness**: Production-ready monitoring and optimization

**Recruiting Value**: This testing infrastructure demonstrates the **technical depth and quality awareness** expected for senior frontend engineering roles at top-tier technology companies, significantly differentiating from basic developer portfolios.

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
npm run dev:fresh        # Clear cache, regenerate JSON, and start dev server
npm run build            # Generate JSON + build for production
npm run build:next       # Build Next.js only
npm run build:clean      # Clear cache and build
npm run start            # Start production server
npm run lint             # Run ESLint
npm run test             # Run Jest unit tests
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

## 📊 Analytics Configuration

This project includes both Vercel Analytics and Google Analytics 4 for comprehensive tracking:

### Vercel Analytics
- **Package**: `@vercel/analytics`
- **Configuration**: Automatically enabled on Vercel deployments
- **Features**: Privacy-friendly, cookieless tracking (44KB)
- **Environment**: Production only

### Google Analytics 4
- **Package**: `@next/third-parties/google`
- **Configuration**: Requires environment variable setup
- **Environment**: Production only with optimized script loading

#### Setup Instructions
1. Copy `.env.local.example` to `.env.local`
2. Add your Google Analytics Measurement ID:
   ```bash
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Deploy to production - both analytics will automatically start tracking

Both analytics systems follow official Next.js documentation best practices and only track in production environments.

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
- **PROJECT_GUIDE.md**: Comprehensive guide for adding new projects
- **ADD_PROJECT_SIMPLE.md**: Simplified project addition workflow
- **IMAGE_WORKFLOW.md**: Image processing pipeline documentation
- **PROJECT.md**: Project showcase data for the website itself

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