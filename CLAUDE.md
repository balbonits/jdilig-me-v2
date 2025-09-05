# CLAUDE.md - Project Context

## 🤖 Shared Context System
This serves as a **persistent knowledge base** shared between AI sessions for project continuity.

**memorize:** pattern - Any statement following `memorize:` becomes a candidate for inclusion in this context file.

## 📝 Content Management
- **LinkedIn Posts**: Record all written LinkedIn posts in `linkedin-posts.md` with date posted
- Each post should be numbered and dated for tracking purposes
- Maintain archive of all portfolio-related social media content

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

### TypeScript Standards & Type Discipline
- **Zero tolerance for `any` types** - Use specific interfaces/types  
- **ESLint compliance required** - All errors are build-blocking
- **Vercel deployment fails** on TypeScript/ESLint errors

#### Type-First Development Principles
1. **No Global Shortcuts** - Never use `any`, `unknown`, or ESLint disable comments globally
2. **Targeted Exemptions** - Use specific ESLint disables with clear justification for patterns that require `any` (e.g., Proxy, dynamic property access)
3. **Specific Over Generic** - Create exact types instead of broad fallbacks
4. **Type Libraries** - Build reusable type definitions in `/src/types/`
5. **Segregated Processing** - Separate functions for different data types
6. **Runtime Type Guards** - Validate and narrow types at boundaries
7. **Discriminated Unions** - Use explicit type fields to distinguish cases

#### Pattern-Specific Type Requirements
- **API Clients**: Use `JsonValue` for serializable data, specific request/response types
- **Event Systems**: Use `EventMap` with specific event payload types
- **Proxy Patterns**: Use targeted `/* eslint-disable @typescript-eslint/no-explicit-any -- reason */` for dynamic property access
- **Form Validation**: Use `FormField` interfaces with specific validation rules
- **State Management**: Use specific state interfaces, never generic objects

#### Type Architecture Rules
- `interfaces/` - Domain data structures (what data looks like)
- `types/` - Utility types and behavioral types (how code behaves)  
- Pattern: `JsonValue | JsonObject | JsonArray` for API data
- Pattern: `EventMap` with typed event payloads
- Pattern: `PropertyValue` with runtime type guards for dynamic access
- **ESLint Integration**: All type violations are build-blocking errors

#### Code Quality Standards  
- **No `let` for immutable data** - Use `const` unless reassignment needed
- **No unused variables** - Clean up refactoring artifacts immediately
- **Arrow functions preferred** - Use ES6 syntax consistently
- **Type-specific handlers** - Avoid generic `any` processors
- **Explicit return types** - Document function contracts

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

### Jest (327+ tests, 20 suites)
- Mock factories for browser APIs
- Component testing with accessibility  
- Advanced test utilities framework
- **Comprehensive SEO Test Suite**: 52 tests covering meta tags, OpenGraph, structured data, semantic HTML, performance, and accessibility compliance
- **Markdown Processing Tests**: 36 tests validating header conversion, formatting, and edge cases

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

## 📝 Code Showcase System
- **Exercises** (15), **Utilities** (14), & **Design Patterns** (27) with enhanced descriptions
- Multiple solutions with complexity analysis
- Optimal solution auto-detection (★ badges)
- PascalCase naming convention

### Enhanced Descriptions & Markdown Processing
- `description`: Brief one-liner for cards
- `detailedDescription`: Comprehensive showcase content with full markdown support
- **Custom Markdown Processor**: 251-line solution converting markdown to semantic HTML
- **MarkdownRenderer Component**: Reusable React component for consistent processing
- **Header Structure**: Proper `##` → `<h2>`, `###` → `<h3>` conversion with whitespace handling
- **Rich Formatting**: Bold text, emoji bullets, inline code, structured lists
- **SEO Optimized**: Semantic HTML output with proper heading hierarchy

## 🎨 Design Pattern Generation System
- **27 Patterns** across 4 categories (Creational, Structural, Behavioral, Modern)
- **84 Solutions** with actual TypeScript implementation code (275.6 KB)
- **Advanced Path Resolution**: Custom tsconfig.scripts.json for Node.js ts-node imports
- **Intelligent Tab Optimization**: 50+ abbreviations with 14-character limit
- **Real Code Generation**: Extracts actual implementation from TypeScript modules
- **Comprehensive Testing**: 23 tests including tab name optimization validation

### Pattern Generation Pipeline
```bash
npm run generate:patterns    # Generate patterns.json from TS modules
```

#### Tab Name Shortening Algorithm
- **Smart Abbreviations**: Database → DB, Application → App, Iterator → Iter
- **Pattern-Aware**: Preserves Factory, Bridge, Proxy, Adapter terminology
- **Intelligent Truncation**: First+last word selection with ellipsis fallback
- **UI Optimized**: 14-character limit ensures container compatibility

Examples: "Database Abstraction Factory" → "DB Factory", "WebSocket Message Stream" → "WS Msg Strm"

### Build Integration
- **tsconfig-paths**: Resolves @ aliases in Node.js environment
- **Automated Generation**: Runs during build pipeline
- **Error Resilient**: Continues processing when individual patterns fail

## 🚀 Project Showcase System

### Structure
```
projects/{name}/
├── {name}.ts      # TypeScript module
├── images/        # Raw images
└── PROJECT.md     # Documentation
```

### Project Addition Workflow
1. Capture screenshots (01-desktop-homepage.png, etc.)
2. Create TypeScript module with ProjectData interface
3. Process images: `npm run process-images {slug}`
4. Generate JSON: `npm run generate:projects`
5. **Check routes**: Verify URLs work by updating data-fetchers.ts slug lists
6. Build & test: `npm run build`
7. Update snapshots: `npx playwright test --update-snapshots`
8. Commit & push to deploy

## 🚨 CRITICAL DEVELOPMENT WORKFLOW

### 🔴 PRODUCTION DEPLOYMENT WARNING
**EVERY PUSH GOES LIVE IMMEDIATELY - NO DEV ENVIRONMENT**
- Pushes deploy directly to production at https://www.jdilig.me
- Broken code affects live users instantly
- NEVER push without complete testing

### Testing Requirements (MANDATORY)
**ALL tests must PASS before any commit consideration:**
```bash
npm run dev          # Test dev server works
npm run lint         # Zero ESLint errors
npm test             # All Jest tests pass
npm run build        # Production build succeeds
npx playwright test  # E2E tests pass (optional for docs)
```

### Commit/Push Protocol
1. **NEVER commit or push without explicit user approval**
2. **NEVER assume user wants immediate deployment**  
3. **Always ask: "Should I commit these changes?"**
4. **Wait for explicit "commit" or "push" commands**
5. **If build/tests fail, fix completely before mentioning commit**

### Pre-Commit Checklist
- [ ] Dev server runs without errors (`npm run dev`)
- [ ] All syntax errors fixed (CSS, TypeScript, etc.)  
- [ ] Build succeeds (`npm run build`)
- [ ] Linting passes (`npm run lint`)
- [ ] Tests pass (`npm test`)
- [ ] Changes tested in browser
- [ ] User explicitly approved commit/push

### Smart Test Skip (Docs Only)
```bash
# For .md files only - skip expensive tests
if git diff --cached --name-only | grep -v '\.md$' | grep -q .; then
  npm run lint && npm test && npx playwright test && npm run build
else
  npm run lint  # Lint only for docs
fi
```

## 🐛 Known Issues & Lessons

### Pattern URL 404 Bug (Resolved)
- **Cause**: `getAllPatternSlugs()` in data-fetchers.ts was hardcoded to 5 patterns
- **Solution**: Update slug arrays when adding new patterns/exercises/utilities
- **Prevention**: Always verify route generation for new content pages

### Infinite Refresh Bug (Resolved)
- **Cause**: Direct TS module imports in data layer
- **Solution**: Use stable JSON imports
- **Prevention**: Always use build pipeline for data imports

### Interface Design Patterns
- Required fields for core data
- Optional fields for enhancements
- Never spread undefined values (overwrites existing)
- Always provide fallbacks for optional fields

## 🚀 Automated Versioning System
- **semantic-release** with **GitHub Actions** for commit-based versioning
- **Conventional Commits** determine version bumps automatically
- **GitHub releases** created with changelogs for every version
- **Version info** displayed in website footer with build metadata
- **Quality gates** ensure tests pass before releases

### Version Workflow
```bash
feat: add new feature     # Minor bump (1.0.0 → 1.1.0)
fix: resolve bug         # Patch bump (1.0.0 → 1.0.1)  
feat!: breaking change   # Major bump (1.0.0 → 2.0.0)
docs: update readme     # No version bump
```

### Files & Configuration
- `.github/workflows/release.yml` - GitHub Actions release workflow
- `.releaserc.json` - semantic-release configuration  
- `.commitlintrc.json` - conventional commit validation
- `scripts/get-version.ts` - version info generation
- `public/version.json` - build-time version metadata

## 📚 Key References
**Complete documentation is now organized in the [docs/](./docs/) directory:**

### **Architecture & Technical**
- **[docs/architecture/CSR_SSG_AUDIT.md](./docs/architecture/CSR_SSG_AUDIT.md)** - SSG architecture analysis and performance optimization
- **[docs/architecture/SEO_AUDIT_REPORT.md](./docs/architecture/SEO_AUDIT_REPORT.md)** - Comprehensive 52-point SEO validation
- **[docs/architecture/TECH_DEBT.md](./docs/architecture/TECH_DEBT.md)** - Technical debt tracking and cleanup status
- **[docs/architecture/test-coverage-report.md](./docs/architecture/test-coverage-report.md)** - Testing infrastructure (360 tests)

### **Guides & Workflows**  
- **[docs/guides/AI_PROJECT_SETUP.md](./docs/guides/AI_PROJECT_SETUP.md)** - AI assistant project guide
- **[docs/guides/ADD_PROJECT_SIMPLE.md](./docs/guides/ADD_PROJECT_SIMPLE.md)** - Simple project addition workflow
- **[docs/guides/IMAGE_WORKFLOW.md](./docs/guides/IMAGE_WORKFLOW.md)** - Asset processing pipeline

### **Meta & Historical**
- **[docs/meta/VERSIONING.md](./docs/meta/VERSIONING.md)** - Automated versioning system documentation
- **[docs/meta/HISTORY.md](./docs/meta/HISTORY.md)** - Historical changes and project evolution
- **[docs/meta/DEV_JOURNEY.md](./docs/meta/DEV_JOURNEY.md)** - Development milestones and journey

**Quick Reference**: See **[docs/README.md](./docs/README.md)** for complete documentation index

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
- when resolving issues & bugs, write tests first to verify the issue & the fix before debugging/resolving.