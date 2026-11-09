import { ProjectData } from '@/interfaces/projects';

// Content from the live jdilig.me project card and the repo README (balbonits/city-app-framework).
const cityAppFramework: ProjectData = {
  slug: 'city-app-framework',
  metadata: {
    title: 'City App Framework',
    name: 'city-app-framework',
    description:
      'A framework for structuring AI-assisted software and web development: project facts the agent loads, hard stops for risky actions, a spec-to-tests build loop, and front-end checks, each tested against real model runs.',
    detailedDescription: `A small, tested kit for building apps with AI coding agents. Made for Claude Code; the AGENTS.md part also works with Codex, Cursor, Copilot and Grok.

## What it gives an agent

- **Project facts and working style**, in a file the agent actually loads.
- **Hard stops** for the few things that need a person: new dependencies and deleting tests (it asks), force-push, production deploys, finishing with failing tests.
- **Corrections that stick**, so the next session doesn't repeat the mistake.

## How it was tested

- Every piece was tested against real model runs; rules that made no difference were cut.
- A rule for vague asks (build the smallest part, then offer options) changed behavior in 5 of 5 runs; bare agents never offered options.
- A "write a test" line took tests from 17 of 25 runs to 25 of 25.
- Lessons carried over between sessions only as one AGENTS.md line or a failing check, not as a journal.`,
    category: 'Tools / Experiments',
    startDate: '2026-09',
    role: 'Author',
    difficulty: 'Expert',
    featured: true,
  },
  techStack: [
    { category: 'Kit', items: ['Claude Code plugin', 'AGENTS.md', 'Hooks', 'Evals'] },
    { category: 'Checks', items: ['Node.js', 'Playwright', 'axe-core'] },
  ],
  features: [
    {
      title: 'Spec-to-tests build loop',
      description:
        'Starts an app or feature from a short spec: writes the requirements down, turns each into a failing acceptance test, then builds until they pass.',
    },
    {
      title: 'Guard hooks',
      description:
        'Asks before a new dependency or deleting a test, and blocks force-push, production deploys and publishing.',
    },
    {
      title: 'Front-end checks',
      description:
        'Checks changed pages for accessibility problems, console errors and layouts wider than the screen at phone, tablet and desktop sizes.',
    },
  ],
  highlights: [],
  links: [
    { type: 'github', url: 'https://github.com/balbonits/city-app-framework', label: 'Source on GitHub' },
  ],
};

export default cityAppFramework;
