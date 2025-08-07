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
├── interfaces/            # Domain-specific data structures
├── types/                 # Reusable utility types and UI definitions
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

### Modular Component Philosophy

The project follows a **"separation of concerns"** approach with each component split into focused files:

- `index.tsx` - **Clean export**: `export { default } from './script';`
- `script.tsx` - **Component logic and JSX**: The actual React component implementation
- `style.module.css` - **Scoped styles**: Component-specific CSS modules with mobile-first design
- `test.tsx` - **Jest tests**: Component testing (optional)

### Design Principles

#### **1. Single Responsibility Components**
Each component has one clear purpose and can be composed with others:
- **Layout Components**: Handle structure and positioning (`PageContainer`, `Grid`, `Section`)
- **Content Components**: Display data and handle interactions (`Card`, `PageHeader`)
- **Logic Components**: Manage state and business logic (page components, data providers)

#### **2. Composable Architecture**
Components are designed to work together like building blocks:
```tsx
// Small, focused components combine to create complex layouts
<PageContainer>
  <PageHeader /> {/* Handles titles/descriptions */}
  <SectionContainer> {/* Manages spacing between sections */}
    <Section> {/* Individual content area */}
      <Grid> {/* Responsive layout */}
        <Card /> {/* Reusable content container */}
      </Grid>
    </Section>
  </SectionContainer>
</PageContainer>
```

#### **3. Clean Import Strategy**
- **Unified exports**: `import { Card, Grid } from '@/components/ui'`
- **No deep imports**: Avoid `import Card from '@/components/ui/Card/script'`
- **Index files**: Each component exports cleanly through `index.tsx`

#### **4. Scalable File Structure**
Components follow a predictable pattern making the codebase easy to navigate:
```
ComponentName/
├── index.tsx      # Export only - no logic
├── script.tsx     # React component - imports ./style.module.css
├── style.module.css # CSS modules - scoped styles
└── test.tsx       # Jest tests - optional
```

#### **5. Style Isolation**
- **CSS Modules**: Each component's styles are scoped automatically
- **No style conflicts**: Components can safely coexist without CSS collisions  
- **Mobile-first**: All components use responsive design from the ground up

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
npm run build            # Generate code JSON + build for production
npm run build:next       # Build Next.js only (without code generation)
npm run start            # Start production server
npm run lint             # Run ESLint
npm run test             # Run Jest tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run generate         # Generate all code showcase JSON files
npm run generate:exercises  # Generate exercises.json only
npm run generate:utilities  # Generate utilities.json only
```

## Code Showcase System

### **Code Exercises** 💻
The project includes a comprehensive collection of coding exercises demonstrating algorithms, data structures, and problem-solving techniques:

#### **Exercise Structure**
Each exercise in `src/exercises/` contains:
- **Multiple Solutions**: Different algorithmic approaches (Hash Map, Brute Force, Sorting, etc.)
- **Complexity Analysis**: Time and space complexity for each solution
- **Test Cases**: Input/output examples with descriptions
- **Metadata**: Title, description, concepts, and performance metrics

#### **Optimal Solution Detection**
Solutions are automatically analyzed and marked as optimal based on time complexity:
- **Priority Order**: O(1) > O(log n) > O(n) > O(n log n) > O(n²) > O(n³) > O(2^n)
- **Multiple Optimal**: If multiple solutions share the best complexity, all are marked optimal
- **Visual Indicators**: Optimal solutions display with ★ badges in the UI

#### **Exercise Categories**
- **Array & String Manipulation**: Two Sum, Anagram Checker, Array Deduplication
- **Searching & Sorting**: Binary Search, Merge Sort, Sliding Window Maximum
- **Data Structures**: LRU Cache, Trie Implementation
- **Dynamic Programming**: Fibonacci Sequence, Longest Common Substring
- **Mathematical**: Factorial Calculator, Palindrome Checker

### **Utility Functions** 🛠️
Reusable utility functions for common programming tasks in `src/utilities/`:

#### **Utility Structure**
Each utility contains:
- **Function Implementation**: Clean, reusable TypeScript functions
- **Usage Examples**: Practical code examples showing real-world applications  
- **Documentation**: Description, category, and use cases
- **Performance Notes**: Complexity and optimization details where relevant

#### **Utility Categories**
- **Performance**: Debounce functions for rate limiting
- **Data Manipulation**: Array helpers, object utilities
- **Validation**: Input sanitization and type checking
- **Formatting**: String formatting and data transformation

### **JSON Generation System** ⚙️
The build system automatically parses TypeScript files and generates structured JSON:
- **exercises.json**: All coding exercises with solutions, examples, and metadata
- **utilities.json**: All utility functions with examples and documentation
- **Build Integration**: JSON generation runs automatically before Next.js build
- **Network Access**: JSON files served from `/public` for client-side fetching

## Development

See `CLAUDE.md` for detailed project context, architecture, and conventions.

### Quick Start
1. Create page component in `src/components/pages/NewPage/`
2. Use UI primitives: `PageContainer`, `PageHeader`, `Section`, etc.
3. Import page component in `src/pages/new-page.tsx`
4. Follow mobile-first responsive design patterns

### TypeScript Organization

The project uses a clear separation between **interfaces** and **types**:

#### **Interfaces** (`src/interfaces/`)
Use for **domain-specific data structures** that define the shape of business logic entities:
- `exercises.ts` - Exercise data structures (ExerciseMetadata, ExampleCase, etc.)
- `utilities.ts` - Utility function data structures
- Resume, project, and content-specific data shapes
- External API response structures

#### **Types** (`src/types/`)  
Use for **reusable utility types** and UI/system-level definitions:
- Generic utility types (Optional, NonEmptyArray, DeepPartial)
- UI component prop types (ButtonVariant, Size, Theme)
- System-wide enums and unions (LoadingState, BreakPoint)
- Form and navigation type definitions
- Cross-component shared types

**Rule of Thumb:**
- **Interface** = "What data looks like" (business domain)
- **Type** = "How code behaves" (technical implementation)

## Deploy on Vercel

This project is optimized for deployment on Vercel. Connect your repository to Vercel for automatic deployments on every push to master.
