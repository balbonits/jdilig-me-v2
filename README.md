# John Dilig - Personal Website v2

A modern, responsive personal website built with Next.js, TypeScript, and Tailwind CSS v4. Features a modular component architecture with CSS modules and a clean theme system.

## Tech Stack

- **Framework**: Next.js (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + CSS Modules
- **Architecture**: Modular components with scoped styles
- **Theme**: Light/dark mode with CSS custom properties

## Project Structure

```
src/
├── pages/                  # Next.js Pages Router
├── components/             # Modular UI components
│   ├── pages/             # Page-level components
│   │   ├── HomePage/      # index.tsx, script.tsx, style.module.css
│   │   ├── ProjectsPage/  # Modular page components
│   │   ├── AboutPage/     # Follow same pattern
│   │   └── CodePage/      # Clean separation of concerns
│   └── SiteLayout/        # Main layout with theme toggle
├── contexts/              # React contexts (ThemeContext)
├── styles/                # Global styles and theme variables
└── data/                  # Static content and configuration
```

## Component Architecture

Each component follows a consistent modular pattern:
- `index.tsx` - Clean export: `export { default } from './script';`
- `script.tsx` - Component logic and JSX
- `style.module.css` - Scoped CSS modules
- `test.tsx` - Jest tests (optional)

## Theme System

The website features a robust light/dark theme system:
- CSS custom properties for consistent theming
- Class-based theme switching (`.light`, `.dark`)
- Tailwind color integration via `var(--color-*)` properties
- Smooth transitions without `!important` declarations

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
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run test             # Run Jest tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
```

## Development

- **Pages**: Add new routes in `src/pages/` that import page components
- **Components**: Create modular components in `src/components/` following the established pattern
- **Styling**: Use CSS modules for component-specific styles, global variables for theming
- **Context**: See `CLAUDE.md` for detailed project context and conventions

## Deploy on Vercel

This project is optimized for deployment on Vercel. Connect your repository to Vercel for automatic deployments on every push to master.
