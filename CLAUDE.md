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

**CRITICAL - Project Status Policy**: 
- NEVER use "complete", "completed", "finished", "done" or any completion status language
- NEVER add status fields to project data or interfaces (no "status: completed")
- NEVER display completion badges or status indicators in the UI
- All projects are constantly evolving - describe current capabilities, not completion state
- Use terms like "current", "working", "functional", "implemented" instead of completion language

## 🛠️ **Technical Debt & Refactoring**
For comprehensive technical debt tracking, component refactoring plans, and development priorities, see **[TECH_DEBT.md](./TECH_DEBT.md)**. This document contains:
- **✅ COMPLETED**: AboutContent component modularization (JourneyCard, ExperienceCard, SkillCard, ContactSection)
- **NEW**: "My Notes" feature for Code page (medium priority)
- CSS anti-patterns and design system improvements
- Component audit checklists and migration strategies  
- Performance optimization plans
- Testing and accessibility improvements

When discussing "tech debt" or refactoring, always reference this centralized document.

## 🐛 **Critical Debugging Journey: Infinite Refresh Bug (August 2025)**

**Problem:** Adding Gemini CLI Demo project caused infinite refresh loops in Next.js development server.

**Root Cause Analysis:**
- **Initial Assumption**: Gemini CLI Demo data was malformed → ❌ **FALSE**
- **Actual Issue**: Direct TypeScript module imports in `src/data/projects.ts` caused webpack Hot Module Replacement (HMR) conflicts
- **Trigger**: Importing both `personalWebsiteV2` and `geminiCliDemo` as TS modules created circular dependencies during hot reloading

**Technical Details:**
```typescript
// ❌ PROBLEMATIC - Causes infinite refresh
import personalWebsiteV2 from '../../projects/personal-website-v2/personal-website-v2';
import geminiCliDemo from '../../projects/gemini-cli-demo/gemini-cli-demo';

// ✅ SOLUTION - Use stable JSON imports
import projectsJsonData from '../../public/projects.json';
```

**Why Personal Website v2 Worked Initially:**
- It was already in the stable JSON files from previous builds
- The issue only manifested when importing BOTH projects as direct TS modules
- Single TS import worked, but multiple imports triggered the HMR conflict

**Debug Process:**
1. **Isolated the issue**: Disabled Gemini CLI Demo import → refresh stopped
2. **Identified webpack symptoms**: Continuous `Fast Refresh had to perform a full reload` warnings
3. **Tested different approaches**: @root alias, require() vs import, etc.
4. **Found solution**: Switch to stable JSON imports instead of direct TS modules

**Final Architecture:**
```
./projects/{name}/{name}.ts → [build script] → /public/projects.json → src/data/projects.ts
    (source of truth)           (copy)            (stable)           (import)
```

**Key Learnings:**
- **Source of truth vs stable imports**: TypeScript modules in `./projects/` remain the authoritative source, but production code should import from stable JSON files
- **HMR conflicts**: Direct imports of complex data structures can cause webpack hot reloading issues
- **Build-time vs runtime**: Use build scripts to copy/transform data, then import the stable output
- **Debug methodology**: Isolate changes systematically rather than assuming data content issues

**Prevention:**
- Always use the existing build system pipeline for data imports
- Avoid direct TypeScript module imports in data layer files
- Test with multiple projects, not just single additions
- Monitor webpack output for HMR warnings as early indicators

This debugging experience reinforces the value of our established build pipeline and shows why we have JSON generation systems in place.

## Project Overview
- **Name**: jdilig-me-v2
- **Type**: Personal website
- **Public URL**: https://www.jdilig.me
- **Framework**: Next.js with Pages Router
- **Technologies**: React, TypeScript, Tailwind CSS v4, Jest, Playwright, Vercel Analytics, Google Analytics 4
- **Branch**: master
- **Status**: Modular component architecture with unified UI system
- **Architecture**: Pages Router with modular component structure and reusable UI primitives

## Website Features
-### Recent Changes (August 2025)
  - **Comprehensive Analytics Implementation**: Added Google Analytics 4 with official Next.js integration (@next/third-parties/google), Vercel Analytics (@vercel/analytics), Core Web Vitals tracking, and custom event system for detailed user behavior insights across code showcase interactions
  - **Enhanced Descriptions System**: Implemented comprehensive, engaging descriptions with emojis and structured formatting for ALL 15 exercises and 14 utilities, improving user experience and educational value
  - **Projects Page Fix**: Brute force solution to eliminate empty sections issue by directly importing TypeScript modules instead of JSON dependencies
  - **Navigation Enhancement**: Added Code sub-menu with Exercises and Utilities links for improved site navigation
  - Implemented custom favicon and app icons using assets in /public/images/favicon (multi-size PNG, ICO, Apple touch, manifest)
  - Added Playwright E2E test to verify favicon and app icon links in <head>
- Added SEOHead to Utilities and Exercises pages for correct page titles and SEO meta tags (fixes E2E Playwright title checks)
- Split Playwright E2E tests into per-page spec files for maintainability
- Cleaned up obsolete combined E2E spec files and snapshots
- All test errors (unit, E2E, lint, type, and Playwright visual snapshot mismatches) are now build-blocking and must be resolved before commit. Only warnings or skips that are essential but not build-breaking are tracked in TECH_DEBT.md. Snapshots must be updated and validated as part of the commit workflow. Correct Playwright snapshots are required to catch UI/data issues before deploy.

#### Mobile Responsiveness Improvements (August 2025)
- **Static Data Collections**: Created static data collections for projects, exercises, and utilities to eliminate large JSON files (utilities.json was 202KB, exceeding Next.js 128KB threshold) and network requests
- **Mobile Navigation**: Implemented hamburger sidebar menu for mobile viewports (≤768px) with floating overlay design, backdrop blur, and smooth slide-in animation from right side
- **Mobile Layout Fixes**: 
  - Fixed ResumeDisplay cards overflow on mobile by removing `columns={3}` prop and adding overflow-x backup
  - Fixed homepage mobile layout by removing forced 3-column grid and equal heights (`min-height: 350px` → `min-height: auto` on mobile)
  - All Grid components now use responsive behavior (1 column mobile → 3 columns desktop)
- **Breadcrumb Navigation**: Added breadcrumb component to code showcase pages (exercises/utilities) with responsive design
- **Data Architecture**: Moved from JSON network requests to static TypeScript collections for better performance and type safety
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

## 📊 Analytics & Performance Monitoring

### **Comprehensive Analytics Implementation** ✅ **COMPLETED HIGH PRIORITY**
**Professional-grade analytics system for demonstrating modern web development expertise**

#### **Dual Analytics Platform**
- **Google Analytics 4**: Official Next.js integration (@next/third-parties/google) with proper TypeScript definitions
- **Vercel Analytics**: Automatic deployment analytics with zero-configuration setup
- **Production-Only Tracking**: Environment-gated analytics (only active with `NEXT_PUBLIC_GA_ID` in production)
- **Privacy-Focused**: No tracking in development, respects user privacy

#### **Core Web Vitals Integration**
- **Performance Monitoring**: Automatic tracking of LCP, FID, CLS, FCP, and TTFB metrics
- **Google Analytics Integration**: Core Web Vitals sent to GA4 with custom dimensions
- **Vercel Analytics Integration**: Dual reporting for comprehensive performance insights
- **Rating System**: Automatic good/needs-improvement/poor classification

#### **Custom Event Tracking System**
**Comprehensive user behavior analytics across all code showcase interactions:**

**Code Showcase Events:**
- **Exercise/Utility Card Clicks**: Track which algorithms and utilities generate most interest
- **Page Views**: Detailed tracking of individual exercise/utility page visits with metadata (difficulty, complexity, category)
- **Code Copy Events**: Track when users copy solution code (indicates genuine interest and potential reuse)
- **Solution Tab Interactions**: Monitor which algorithmic approaches users prefer
- **Example Modal Opens**: Track interest in practical usage examples for utilities

**Navigation & Engagement:**
- **Theme Changes**: Monitor light/dark mode preferences
- **Page Navigation**: Track user journey through the site with referrer information
- **Engagement Actions**: Button clicks, modal opens, and interaction depth

#### **Analytics Architecture**
```typescript
// Custom Analytics Hook (/src/hooks/useAnalytics.ts)
- trackCodeView(): Exercise/utility specific tracking with metadata
- trackCodeInteraction(): User interaction events (clicks, copies, views)
- trackProjectView(): Project showcase engagement
- trackPerformance(): Performance metrics and Core Web Vitals
- trackNavigation(): Page transitions and user journey
- trackEngagement(): General user engagement events
- trackThemeChange(): Theme preference tracking
```

#### **Analytics Integration Points**
- **Code Showcase Pages**: All exercise and utility pages track views, interactions, and code copying
- **Homepage**: Navigation tracking for code showcase sections
- **Project Pages**: Project view and interaction tracking
- **Global**: Theme changes, Core Web Vitals, and navigation events

#### **Environment Configuration**
```bash
# .env.local (production)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX  # Google Analytics 4 Measurement ID
# Vercel Analytics: Auto-enabled on Vercel deployments
```

#### **Technical Benefits for Demonstrating Expertise**
- **Official Next.js Integration**: Uses @next/third-parties/google (modern approach)
- **Type Safety**: Full TypeScript definitions for gtag and va functions
- **Performance Optimized**: No impact on Core Web Vitals, deferred loading
- **Privacy Compliant**: Production-only tracking with environment gating
- **Error Handling**: Graceful degradation when analytics services unavailable
- **Modern Patterns**: Custom hooks, proper React integration, and clean separation of concerns

## Design Principles
- **Modular Architecture**: Each component follows index.tsx -> script.tsx -> style.module.css pattern
- **CSS Modules**: Scoped styles using .module.css files
- **Theme System**: Professional three-tier theming (default/:root, .light, .dark) with comprehensive CSS custom properties
- **Mobile-First Design**: All components use mobile-first responsive approach with min-width media queries
- **Unified UI System**: Reusable UI primitives for consistent design across all pages
- **Frontend Library Mindset**: Building reusable, scalable patterns for future component library development
- Performance-first approach
- Clean, maintainable code structure
- Consistent component organization
- **Tailwind Integration**: Uses Tailwind color system via CSS custom properties

## 🎨 **Professional Theming System** ⭐ **CRITICAL**

### **Three-Tier Architecture**
Our theming system uses a sophisticated three-tier approach for maximum flexibility and reliability:

1. **Default/Fallback (`:root`)**: Base professional color palette with enterprise-grade values
2. **Light Theme (`.light`)**: Explicit light mode values for recruiters and professional presentation
3. **Dark Theme (`.dark`)**: High-contrast dark mode optimized for accessibility and reduced eye strain

### **Professional Color Philosophy**
**Recruiter-Focused Design**: All colors chosen to convey competence, professionalism, and technical expertise to hiring managers and technical leads.

```css
/* Enterprise Professional Colors */
--primary-brand: #2563eb;      /* Professional blue - confidence & trust */
--success-accent: #059669;     /* Achievement green - success & growth */
--expertise-highlight: #7c3aed; /* Technical purple - innovation & expertise */
--corporate-neutral: #64748b;   /* Enterprise gray - stability & reliability */
--warning-attention: #d97706;   /* Strategic orange - attention & energy */
```

### **Component Color System**
**Hierarchical Color Inheritance**: Component variables reference base color palette, ensuring automatic theme transitions.

```css
/* Base Color Palette (defined per theme) */
--color-blue: rgba(103, 126, 234, 0.15);        /* Light mode */
--color-blue: rgba(120, 145, 255, 0.2);         /* Dark mode */

/* Component Variables (inherit automatically) */
--card-bg-color-default: var(--color-neutral);
--badge-bg-color-default: var(--color-blue);
--banner-bg-color-default: var(--color-blue);
```

### **Theme Variable Categories**

#### **1. Professional Text Colors**
```css
--text-primary: #111827;    /* High contrast primary text */
--text-secondary: #374151;  /* Secondary content */
--text-muted: #6b7280;     /* Supporting information */
--text-light: #9ca3af;     /* Subtle details */
```

#### **2. Professional Background Colors**
```css
--bg-primary: #ffffff;      /* Pure white for cleanliness */
--bg-secondary: #f9fafb;    /* Subtle sections */
--bg-accent: #f3f4f6;      /* Card backgrounds */
--bg-highlight: #e5e7eb;   /* Highlight areas */
```

#### **3. Component Color Palette**
**8-Color System with Hover States**: Blue, Purple, Teal, Pink, Orange, Green, Red, Yellow + Neutral
- **Light Mode**: 0.15 base opacity, 0.25 hover
- **Dark Mode**: 0.2 base opacity, 0.3 hover (better visibility)

#### **4. Component-Specific Variables**
- **Cards**: `--card-bg-color-{variant}`, `--card-bg-color-{variant}-hover`
- **Banners**: `--banner-bg-color-{type}`, `--banner-bg-color-{type}-hover`
- **Badges**: `--badge-bg-color-{state}`, `--badge-border-color-{state}`
- **Tags**: `--tag-bg-color-{state}`, `--tag-border-color-{state}`
- **Sections**: `--section-bg-color-{state}`, `--section-border-color-{state}`
- **Contacts**: `--contact-card-bg-color-{1-7}` (7-color rotation system)

### **Theme Implementation Pattern**

#### **Adding New Component Variables**
```css
/* 1. Define in :root with descriptive naming */
:root {
  --new-component-bg-color-default: var(--color-neutral);
  --new-component-bg-color-hover: var(--color-neutral-hover);
  --new-component-border-color: var(--border-color-default);
}

/* 2. Override in .light if needed (usually inherit from :root) */
.light {
  /* Usually inherits correctly from :root */
}

/* 3. Override in .dark if different behavior needed */
.dark {
  /* Usually inherits correctly from base colors */
}
```

#### **CSS Variable Naming Convention**
```
--{component}-{property}-{state}
```
**Examples**:
- `--card-bg-color-default`
- `--banner-border-color-hover`
- `--badge-shadow-hover`
- `--contact-card-bg-color-3`

### **Visibility Optimization**
**Light Mode**: Enhanced visibility with `rgba(*, *, *, 0.15)` base opacity
**Dark Mode**: Better contrast with `rgba(*, *, *, 0.2)` base opacity
**Hover States**: Increased opacity (+0.1) for clear interaction feedback

### **Professional Benefits**
1. **Consistent Brand Identity**: All colors reinforce professional competence
2. **Accessibility Compliance**: High contrast ratios for WCAG 2.1 AA
3. **Scalable Architecture**: New components inherit theme behavior automatically
4. **Recruiter Appeal**: Colors chosen specifically for hiring manager psychology
5. **Technical Excellence**: Demonstrates advanced CSS architecture knowledge

### **Usage in Components**
```css
/* Component styles reference theme variables */
.myComponent {
  background: var(--card-bg-color-default);
  border: 1px solid var(--border-color-default);
  color: var(--text-primary);
}

.myComponent:hover {
  background: var(--card-bg-color-hover);
  border-color: var(--border-color-medium);
}
```

**Theme switching handled automatically** - no component-level theme logic needed.

## 🧪 **Advanced Testing Infrastructure** ⭐ **ENTERPRISE-GRADE**

### **Professional Testing Excellence**
Our testing infrastructure demonstrates **Fortune 500-level development practices** and positions the developer for senior/lead engineering roles with comprehensive coverage across all quality dimensions.

### **Jest Testing Suite - 249 Tests Across 18 Suites**
**Advanced Test Utilities Framework** (`src/__tests__/test-utils.ts`):
- **Mock Factories**: localStorage, matchMedia, IntersectionObserver, ResizeObserver
- **Spy Utilities**: Console spies with automatic cleanup, window method spies
- **Data Generators**: Realistic mock data for journey, experience, skill, contact components
- **Async Utilities**: Controllable promises, multiple promise handling
- **Custom Assertions**: Accessibility validation, component testing patterns

**Comprehensive Component Testing Examples**:
```typescript
// Enterprise-grade component testing with edge cases
describe('SkillCard Component', () => {
  test('displays top 4 skills sorted by years descending', () => {
    const skillsWithYears = ['JavaScript (8 years)', 'React (5 years)', 'TypeScript (3 years)', /* ... */];
    render(<SkillCard skills={skillsWithYears} />);
    
    const skillTags = screen.getAllByRole('listitem');
    expect(skillTags[0]).toHaveTextContent('JavaScript (8 years)');
    expect(skillTags[1]).toHaveTextContent('React (5 years)');
  });
  
  test('handles year ranges by taking maximum value', () => {
    // Tests complex parsing logic: "CSS (6-8 years)" → 8 years
  });
});
```

**Advanced Hook Testing with Browser APIs**:
```typescript
// Browser API integration testing
test('handles localStorage unavailability gracefully', () => {
  mockLocalStorage.setItem.mockImplementation(() => {
    throw new Error('localStorage not available');
  });
  // Tests graceful degradation patterns
});
```

### **Playwright E2E Testing - 160+ Scenarios Across 5 Browsers**
**Custom Fixtures Framework** (`tests/fixtures/playwright-fixtures.ts`):
- **Network Interception**: API mocking, offline simulation, 3G throttling
- **Performance Fixtures**: CPU throttling, memory monitoring, Core Web Vitals validation
- **Accessibility Fixtures**: Screen reader simulation, keyboard navigation, WCAG 2.1 AA compliance
- **Mobile Fixtures**: Touch interactions, responsive behavior, PWA testing

**Performance Testing Suite** (`tests/e2e/advanced-performance.spec.ts`):
```typescript
// Core Web Vitals validation with custom assertions
test('should meet Core Web Vitals thresholds', async ({ performancePage }) => {
  await customExpect.toHaveGoodPerformance(performancePage);
  // Validates: LCP < 2.5s, FID < 100ms, CLS < 0.1, DOM load < 1.5s
});

// Memory leak detection
test('should not have memory leaks with theme switching', async ({ page }) => {
  // Tests 20 theme switches for memory growth < 50%
});
```

**User Journey Testing Suite** (`tests/e2e/user-journey.spec.ts`):
```typescript
// Complete recruiter evaluation flow
test('should support complete recruiter evaluation flow', async ({ page }) => {
  // Tests: Landing → Skills → Experience → Code → Resume Download → Contact
  // Validates professional presentation for hiring managers
});

// Accessibility compliance testing  
test('should support complete keyboard navigation', async ({ accessibilityPage }) => {
  // Tests tab order, focus management, screen reader compatibility
});
```

### **Cross-Browser & Mobile Testing Matrix**
- **Desktop**: Chromium, Firefox, WebKit
- **Mobile**: Mobile Chrome, Mobile Safari  
- **Responsive**: 375px mobile → 1280px desktop
- **Network Conditions**: 3G simulation, offline scenarios
- **Accessibility**: WCAG 2.1 AA compliance across all platforms

### **Advanced Testing Patterns**

#### **Error Resilience Testing**
```typescript
// Network failure handling
test('should handle network failures gracefully', async ({ page }) => {
  await page.route('**/*', route => route.abort('internetdisconnected'));
  // Should still show cached content and maintain functionality
});

// JavaScript error boundary testing
test('should handle JavaScript errors gracefully', async ({ page }) => {
  // Injects errors and validates graceful degradation
});
```

#### **Performance Monitoring**
```typescript
// Custom performance assertions
await customExpect.toHaveGoodPerformance(page); // Core Web Vitals
await customExpect.toBeAccessible(page);        // WCAG 2.1 AA
await customExpect.toBePWAReady(page);          // PWA requirements
```

### **Professional Benefits & Career Impact**
**Technical Skill Demonstration**: 
- **Senior/Lead Engineer Level**: Advanced testing patterns, performance monitoring, accessibility compliance
- **Enterprise Readiness**: Fortune 500-grade quality assurance practices  
- **Full-Stack Awareness**: End-to-end quality validation from unit to user experience
- **Performance Consciousness**: Production-ready monitoring and optimization
- **Inclusive Design**: Accessibility-first development approach

**Recruiting Value**: 
This testing infrastructure demonstrates the **technical depth and quality awareness** expected for senior frontend engineering roles at top-tier technology companies, setting the portfolio apart from basic developer showcases.

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
- **MobileMenu**: Floating overlay navigation menu for mobile viewports with backdrop blur and slide animation
- **Breadcrumb**: Navigation breadcrumb component with accessibility support and responsive design

### Modular About Components ✅ **NEW**
- **JourneyCard**: Personal journey and values display with icon, title, and description
- **ExperienceCard**: Professional experience with company, badge, and achievements
- **SkillCard**: Technical skills by category with proficiency levels and skill tags
- **ContactSection**: Contact information hero with status badge and structured contact methods

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
projects/                  # Project data & images (consolidated)
└── personal-website-v2/   # Individual project folders
    ├── personal-website-v2.ts # Project TypeScript module
    ├── images/             # Raw images for processing  
    └── PROJECT.md          # Optional project documentation
```

## TypeScript Organization

The project uses a clear separation between **interfaces** and **types**:

### **Component Architecture Updates ✅ COMPLETED**
- **Modular About Components**: Complete separation of AboutContent into reusable UI components
- **Type Safety**: Added CardColorVariant type for consistent card color theming
- **Interface Exports**: Proper TypeScript interface exports for all new UI components
- **Data Organization**: Centralized about.ts data module with typed interfaces

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

### **TypeScript Standards ⭐ CRITICAL**

**Zero Tolerance for `any` Types in Production Code:**
- **NEVER use `any` types** - always define specific interfaces and types
- **Use proper type definitions** for all function parameters, return values, and object properties
- **Extend types strategically** using intersection types and conditional generics

#### **Approved Type Patterns for Common Scenarios:**

**Mock Component Props:**
```typescript
// ✅ CORRECT - Specific interface
interface MockProps {
  children?: React.ReactNode;
  colorVariant?: string;
  className?: string;
  [key: string]: unknown; // For spread props
}

// ❌ WRONG - Using any
const props: any
```

**Browser API Mocking:**
```typescript
// ✅ CORRECT - Extended window type
(window as Window & { matchMedia?: unknown }).matchMedia;
(window as Window & { IntersectionObserver: unknown }).IntersectionObserver;

// ❌ WRONG - any casting
(window as any).matchMedia;
```

**Test Utilities:**
```typescript
// ✅ CORRECT - Proper generic constraints
export const waitForMultiple = (promises: Promise<unknown>[]) => Promise.allSettled(promises);
export const createControlledPromise = <T>() => { reject: (reason?: unknown) => void };

// ❌ WRONG - any types
const promises: Promise<any>[]
```

**Playwright Performance Metrics:**
```typescript
// ✅ CORRECT - Extended PerformanceEntry with specific properties
const firstInput = performance.getEntriesByType('first-input')[0] as PerformanceEntry & { processingStart?: number; startTime: number };

// ❌ WRONG - any casting
const firstInput = performance.getEntriesByType('first-input')[0] as any;
```

#### **ESLint Compliance Requirements:**
- **@typescript-eslint/no-explicit-any**: MUST be error-free in production builds
- **@typescript-eslint/no-unused-vars**: Address all unused parameters (use underscore prefix if needed)
- **Strict type checking**: All function signatures must have proper types

#### **Testing Type Standards:**
- **Mock factories**: Use specific interfaces for test data generation
- **Spy utilities**: Proper function signature typing with generic constraints
- **Playwright fixtures**: Extended Page/Context types for custom methods
- **Browser API mocks**: Window interface extensions instead of any casting

#### **Build-Blocking Policy:**
- **Vercel deployment** will fail on any ESLint `any` type errors
- **All TypeScript errors** must be resolved before production deployment
- **Jest tests** must pass with proper type compliance
- **Next.js build** requires zero TypeScript/ESLint errors

**This standard prevents production deployment failures and ensures enterprise-grade code quality.**

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

### **⭐ CRITICAL - Human Readability Principle**
**ALL CODE MUST BE READABLE BY HUMANS FIRST**

Humans need to be able to read, understand, and maintain all code. Prioritize clarity over cleverness:

- **Template Literals**: Use backticks for multiline strings instead of escaped `\n` characters
- **Descriptive Names**: Choose clear variable and function names over brevity
- **Self-Documenting Code**: Write code that explains intent without extensive comments
- **Explicit Logic**: Prefer explicit over implicit logic flows
- **Meaningful Comments**: Explain "why", not "what"
- **Natural Structure**: Code should read like well-written prose

**Examples:**
```typescript
// ✅ GOOD - Human readable
const detailedDescription = `🔥 **Enhanced Description**
This is a comprehensive explanation that spans multiple lines
and uses natural formatting for human comprehension.

Key benefits:
• Easy to read and edit
• Clear structure and formatting
• Maintainable by any developer`;

// ❌ BAD - Hard for humans to read
const detailedDescription = "🔥 **Enhanced Description**\\nThis is a comprehensive explanation...\\n\\nKey benefits:\\n• Easy to read...";
```

### **ESLint Configuration & Standards**
The project maintains strict code quality through comprehensive ESLint rules:

#### **Type Safety Standards** ⭐ **CRITICAL**
- **No `any` types**: Use specific interfaces and types from `src/interfaces/` and `src/types/`
- **No `unknown` types**: Define proper types for function parameters and return values
- **Proper generics**: Use constrained generics instead of broad unknown types
- **Strategic field design**: Use required fields for core data, optional for gradual enhancements
- **Example**: Instead of `(...args: unknown[]) => unknown`, use `DebouncableFunction` type

#### **TypeScript Interface Standards** ⭐ **CRITICAL**

**Strategic use of required vs optional fields for gradual enhancement:**

```typescript
// ✅ CORRECT - Mix of required and optional fields for type safety + flexibility
export interface BaseMetadata {
  title: string;                    // REQUIRED - core field
  description: string;              // REQUIRED - core field
  detailedDescription?: string;     // OPTIONAL - allows gradual enhancement
  concepts: string[];               // REQUIRED - core field
  timeComplexity: string;           // REQUIRED - core field
  spaceComplexity: string;          // REQUIRED - core field
  difficulty: DifficultyLevel;      // REQUIRED - core field
}

// ✅ CORRECT - Component logic handles optional fields safely
const description = metadata.detailedDescription || metadata.description;
```

**Interface Design Principles:**
- **Required for Core Fields**: Essential metadata that all items must have
- **Optional for Enhancements**: Rich content that can be added gradually
- **Safe Component Logic**: Always provide fallbacks for optional fields
- **Build System Support**: Generation scripts preserve existing metadata without overwriting

**Critical Generation Script Pattern:**
```typescript
// ✅ CORRECT - Only include defined properties to avoid overwriting
let enrichedMetadata: any = {};
if (foundDescription) {
  enrichedMetadata.detailedDescription = foundDescription;
}
// Don't add undefined values that would overwrite existing metadata

const mergedMetadata = { ...metadata, ...enrichedMetadata };
```

**Lessons Learned from Metadata Overwrite Bug:**
- **Never set undefined**: Spreading objects with undefined properties overwrites existing values
- **Use conditional assignment**: Only add properties to objects when they have valid values
- **Write tests for build scripts**: Generation scripts need comprehensive testing to prevent data loss
- **Template literals over escaped strings**: Human readability is paramount for maintainability

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

#### **Enhanced Description System**
**Source of Truth**: All exercises/utilities in `src/exercises/*.ts` and `src/utilities/*.ts` are the authoritative source
- **Brief Description**: `metadata.description` - Used in index page cards (one-line summary)
- **Detailed Description**: `metadata.detailedDescription` - Used in individual showcase pages (comprehensive explanation)
- **JSDoc Comments**: Enhanced with emojis, bullet points, and structured content for engaging documentation

**JSDoc Structure Pattern**:
```typescript
/**
 * 🎯 Exercise/Utility Title - Descriptive Subtitle
 * 
 * DESCRIPTION:
 * Comprehensive explanation with context and importance...
 * 
 * HOW IT WORKS / EXAMPLES:
 * • Step-by-step breakdown
 * • Real-world examples with code
 * • Visual explanations
 * 
 * IMPLEMENTATION VARIANTS / APPROACHES:
 * • Different algorithmic approaches
 * • Performance trade-offs
 * • When to use each variant
 * 
 * REAL-WORLD USE CASES / APPLICATIONS:
 * • Production scenarios
 * • Industry applications
 * • Problem-solving contexts
 * 
 * PERFORMANCE:
 * - Time/Space complexity analysis
 */
```

**Generation Process**: Build scripts parse JSDoc DESCRIPTION sections to populate `detailedDescription` in generated JSON

### **Optimal Solution Detection**
Automatic analysis marks best solutions with ★ badges based on time complexity priority: O(1) > O(log n) > O(n) > O(n log n) > O(n²) > O(n³) > O(2^n)

## Development Commands
```bash
npm run dev              # Start development server (no analytics in dev)
npm run dev:clean        # Clear .next cache and start dev server
npm run dev:fresh        # Clear cache, regenerate JSON, and start dev server
npm run build            # Generate code JSON + build Next.js
npm run build:next       # Build Next.js only  
npm run build:clean      # Clear cache and build
npm run start            # Start production server (analytics active with env vars)
npm run lint             # Run ESLint
# 🧪 ADVANCED TESTING SUITE - Enterprise-Grade Patterns
npm run test             # Run Jest tests (249 tests across 18 suites)
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
npm run test:e2e         # Run Playwright E2E tests (160+ scenarios, 5 browsers)
npm run test:e2e:performance # Run Core Web Vitals & performance tests
npm run test:e2e:journey # Run complete user journey tests
npm run test:e2e:advanced # Run all advanced E2E test suites
npm run test:coverage:full # Combined Jest coverage + advanced E2E
npm run test:all         # Run both unit and E2E tests
npm run test:e2e:update  # Update Playwright visual snapshots
npm run test:e2e:ui      # Run E2E tests with UI
npm run test:e2e:headed  # Run E2E tests in headed mode
npm run generate         # Generate exercises + utilities + projects JSON
npm run generate:exercises  # Generate exercises JSON only
npm run generate:utilities  # Generate utilities JSON only
npm run generate:projects   # Generate projects JSON from TypeScript modules
npm run process-images   # Process project images (requires slug parameter)
```

### Analytics Setup Commands
```bash
# Setup analytics environment (production only)
cp .env.local.example .env.local  # Copy environment template
# Edit .env.local and add your Google Analytics ID:
# NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Test analytics in production build
npm run build && npm run start    # Analytics will be active with env vars
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
- **Static Data Collections**: TypeScript-based data collections replace JSON files for better performance and type safety
  - `src/data/projects-static.ts`: Static project data with fallback to generated JSON
  - `src/data/exercises-static.ts`: Static exercise data collection (eliminates large JSON files)
  - `src/data/utilities-static.ts`: Static utility data collection (replaces 202KB utilities.json)
- **Code Generation**: Exercises and utilities parsed into JSON at build time using ts-node scripts (with static fallbacks)
- **TypeScript Interfaces**: Shared types for exercises and utilities in `src/types/` and `src/interfaces/`
- **Static Assets**: Resume PDF served from public/ directory
- **SSG Build**: 38+ pages generated (15 exercises + 14 utilities + individual project pages + core pages)
- **Type Safety**: Proper interfaces for PersonalInfo, Skills, ProjectItem, ResumeSection, ExerciseData, UtilityData
- **Pascal Case Convention**: All code showcase files use PascalCase naming for consistency
- **Optimal Solution Detection**: Algorithm automatically identifies best time complexity solutions
- **Dynamic Routing**: [slug].tsx pages for individual exercise, utility, and project showcases

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
- **Project System**: Automated showcase with PROJECT.md workflow, image processing, and responsive design

## Project Showcase System

### **Current Implementation**
- **Hero banner cards** matching Code page design with gradients and hover effects
- **Screenshots moved to Project Overview** (first section) with modal interactions
- **TypeScript modules** for type-safe project data management
- **Automated image processing** with naming convention: `[number]-[category]-[description].[ext]`
- **Build-time consolidation** similar to exercises/utilities system
- **Guide documentation** with multiple workflow approaches
- **Type-safe interfaces** with project data structure

### **Project System Commands**
```bash
npm run process-images [slug]    # Process project images for specific project
npm run process-images all       # Process images for all projects
npm run generate:projects        # Generate projects JSON from TypeScript modules
npm run generate                 # All generation (exercises + utilities + projects)
```

### **File Structure (Consolidated Project Organization)**
```
projects/
└── {project-name}/
    ├── {project-name}.ts       # Individual project data as typed TS modules
    ├── images/                 # Raw images with naming convention
    │   ├── 01-desktop-home.png
    │   ├── 02-mobile-feature.png
    │   └── ...
    └── PROJECT.md              # Project documentation (optional)
public/projects.json            # Generated consolidated data
public/projects-index.json      # Generated project index
```

### **Project Data Module Implementation**
Each project is organized as a folder in `/projects/{project-name}/` with a TypeScript file `{project-name}.ts` that exports a typed object:

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

### **Project Addition Workflow**

**🤖 AI Assistant Approach** ⭐ **RECOMMENDED** (see `AI_PROJECT_SETUP.md`):
- **Universal Guide**: Works with any AI assistant (Claude Code, Gemini, ChatGPT, etc.)
- **Complete Template**: TypeScript project data template with proper interface structure
- **Step-by-Step Process**: Deploy → Screenshots → Create Project Module → Process & Build
- **Quality Assurance**: Professional standards, build verification, and success criteria
- **Copy & Paste Ready**: Drop the file in any project repo and instruct AI to follow

**Legacy Workflows**:
1. **Simple** (`ADD_PROJECT_SIMPLE.md`): Upload images → write PROJECT.md → run processing
2. **Comprehensive** (`PROJECT_GUIDE.md`): Detailed manual workflow with metadata checklist

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
- **Workflow Documentation**: Guide in `IMAGE_WORKFLOW.md`
- **Simple Setup**: Drop images in `raw-images/{slug}/` and run processing command

## Key Technologies
- **Theming**: Custom CSS variables with light/dark mode and system preference detection
- **Tailwind CSS v4**: Layer-based architecture with fallback CSS values (theme() functions pending)
- **Performance**: Static JSON generation, service worker caching, minimal dependencies
- **Accessibility**: WCAG 2.1 AA compliance with comprehensive ARIA implementation, screen reader support, and keyboard navigation
- **ProfileImage System**: 4 shape variants (circle, box, rounded, hexagon) with accessibility features
- **Component Testing**: 64+ Jest tests including accessibility validation and ARIA compliance
- **PWA**: Offline support, app shortcuts, installable with custom icons



## Project Addition Routine ⭐ **MANDATORY WORKFLOW**

**Complete workflow for adding projects to the showcase page:**

### **Step 1: Project Preparation**
1. **Verify live deployment** - Ensure project is deployed and accessible via URL
2. **Capture screenshots** following naming convention:
   - `01-desktop-homepage.png` (main landing page, desktop view)
   - `02-feature-[description].png` (key features/functionality)
   - `03-mobile-[description].png` (mobile responsive views if applicable)
   - Place in `projects/{project-slug}/images/` directory

### **Step 2: Create Project Data Module**
1. **Create TypeScript module** at `projects/{project-slug}/{project-slug}.ts`
2. **Use proper TypeScript interface** extending `ProjectData` from `@/interfaces/projects`
3. **Include comprehensive metadata**:
   - Complete title, description, detailedDescription
   - Proper category, role, difficulty
   - Featured status (true for showcase projects)
4. **Add tech stack, features, highlights** with detailed descriptions
5. **Include live and GitHub links** in proper format

### **Step 3: Image Processing & Build**
1. **Rename images** to follow convention: `[number]-[category]-[description].[ext]`
2. **Process images**: `npm run process-images {project-slug}`
3. **Generate projects JSON**: `npm run generate:projects`
4. **Build and test**: `npm run build` (verify 38+ pages generate successfully)

### **Step 4: Verification & Deployment**
1. **Run full test suite**: `npm run lint && npm test && npx playwright test`
   - **CRITICAL**: New projects will cause visual snapshot failures - this is expected
   - Update snapshots with `npx playwright test --update-snapshots` after manual verification
   - Verify counting tests pass (projects page should show correct number of project cards)
2. **Verify JSON generation**: Check `public/projects.json` and `public/projects-index.json` contain new project
3. **Test locally**: Start dev server and verify project appears on `/projects` page with correct count
4. **Commit changes**: Use comprehensive commit message documenting all changes (but do NOT push yet)
5. **Final test verification**: Run tests once more to ensure snapshots are updated correctly
6. **Push to deploy**: `git push` to trigger Vercel deployment
7. **Verify live deployment**: After push, confirm project appears on live site (may take 2-3 minutes)

### **Step 5: Documentation Updates**
1. **Update CLAUDE.md**: Add project to recent changes if significant
2. **Update README.md**: If new commands or processes are introduced
3. **Update HISTORY.md**: Document project addition in historical record

**⚠️ CRITICAL DEPLOYMENT NOTE:**
- Projects won't appear on live site until changes are **pushed to remote repository**
- Local commits must be pushed to trigger Vercel deployment
- Always verify with `git status` and `git push` after committing
- Live site updates typically take 2-3 minutes after successful deployment

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
3. **Development Server Management:**
  - **CRITICAL**: Always kill `npm run dev` after testing and before committing code
  - Running dev servers can interfere with E2E tests and cause port conflicts
  - Use `pkill -f "next dev"` or Ctrl+C to terminate properly
4. **Git Flow:**
  - Stage all changes (`git add`)
  - Write a detailed commit message documenting all work
  - Commit and push (or notify user to push if not possible)

**Notes:**
- Always update or add tests for all changes before committing.
- Document every significant change in the Markdown files.
- This workflow ensures code quality, documentation, and reproducibility for both AI and human contributors.

### **⚡ Smart Test Optimization**
For documentation-only changes (only `.md` files modified), skip expensive tests:
```bash
# Check if only markdown files changed
if git diff --cached --name-only | grep -v '\.md$' | grep -q .; then
  echo "Code changes detected - running full test suite"
  npm run lint && npm test && npx playwright test && npm run build
else
  echo "Documentation-only changes - skipping tests"
  npm run lint  # Still check for any lint issues
fi
```

**Rationale**: Documentation changes don't affect UX or functionality, so running the full test suite (Jest + Playwright + build) is unnecessary and wastes time.

## Documentation
- **CLAUDE.md**: Current project context and development guidelines
- **HISTORY.md**: Historical changes and major updates
- **TECH_DEBT.md**: Refactoring plans and technical debt tracking
- **AI_PROJECT_SETUP.md**: ⭐ Universal AI assistant guide for adding projects (RECOMMENDED)
- **PROJECT_GUIDE.md**: Comprehensive manual guide for adding new projects
- **ADD_PROJECT_SIMPLE.md**: Simplified project addition workflow
- **IMAGE_WORKFLOW.md**: Image processing pipeline documentation
- **PROJECT.md**: Project showcase data for the website itself

---
*For project history and detailed changes, see [HISTORY.md](./HISTORY.md)*
- when committing, update the Markdown files, run tests (lint, unit, e2e, build), then git add & commit.
- always update, or add, tests for all (unit, e2e, etc.) whenever possible, and before committing work.
- make sure to update the technical documentation on README.md
- always follow correct coding semantics for HTML, CSS, and JS/TS. check online for guidelines.