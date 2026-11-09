// Source: Reuel_John_Dilig_Resume_2026_FrontEnd.pdf (John's resume, Nov 2026).
// Keep this file in sync with public/resume.pdf. Do not add experience that is not in the resume.

export interface ResumeJob {
  role: string;
  company: string;
  place: string;
  dates: string;
  bullets: string[];
}

export const resumeMeta = {
  name: 'John Dilig',
  legalName: 'Reuel John Dilig',
  title: 'Senior Front-End Developer',
  location: 'Redondo Beach, CA',
  email: 'rjdofficemail@gmail.com',
  linkedin: 'https://www.linkedin.com/in/rjdilig',
  github: 'https://github.com/balbonits',
  pdf: '/John_Dilig_Resume.pdf',
  pdfSize: '67 KB', // real size of public/John_Dilig_Resume.pdf (69,032 bytes)
  updated: 'November 2026',
};

export const summary =
  'Senior Front-End Developer with 18+ years building production web apps in React, TypeScript, and Next.js across streaming and sports media, enterprise BI/SaaS, consumer products, and live-event platforms. Recent work includes real-time, data-dense UIs (data tables, geographic maps, live GraphQL data, streamed AI query interfaces), enterprise SSO with role-based UI, and subscription auth and payment flows. Uses AI-assisted development (Claude Code, multi-agent workflows) for delivery, documentation, and testing.';

export const skills: { label: string; items: string }[] = [
  { label: 'Languages & Frameworks', items: 'TypeScript, JavaScript (ES6+), React, Next.js, HTML5, CSS3' },
  { label: 'State & Data', items: 'Redux, Zustand, React Query, React Router, GraphQL, RESTful APIs, JSON data modeling' },
  { label: 'UI & Styling', items: 'Tailwind CSS, Material UI, responsive design, accessibility (a11y)' },
  { label: 'Data Visualization', items: 'Geographic/interactive maps, Chart.js, Leaflet' },
  { label: 'Auth & Integrations', items: 'Enterprise SSO, route-level auth gating, role-based UI, Okta, Stripe' },
  { label: 'Testing & Quality', items: 'Jest, Testing Library, Vitest, WebdriverIO, Selenium, Google Lighthouse, code review' },
  { label: 'Media & Streaming', items: 'JW Player, live-event interfaces, real-time state management' },
  { label: 'AI-Assisted Development', items: 'Claude Code, multi-agent workflows, spec-driven development, LLM tooling, streamed AI response UX' },
  { label: 'Build & Tooling', items: 'Webpack, Vite, Git workflows, PWA/Cordova' },
  { label: 'Backend Familiarity', items: 'Node.js, MongoDB, Java/Spring Boot, ASP.NET (for FE/BE collaboration)' },
];

export const jobs: ResumeJob[] = [
  {
    role: 'Frontend Developer (Contract)',
    company: 'FOX',
    place: 'Los Angeles, CA (Remote)',
    dates: 'July 2026 – Nov 2026',
    bullets: [
      'Merged 48 PRs in ~4 months (~3/week) on a real-time analytics web app (React, Next.js, TypeScript, Tailwind CSS), with 13 features in six weeks: app shell, navigation, loading/error/access states, and sortable, filterable data tables with live GraphQL data.',
      'Built the natural-language query feature end to end (~22 PRs), with streamed AI answers, saved history, editable sessions, follow-ups, and deep links; took it to production, cutting ~11k legacy lines.',
      'Used by FOX News analysts and producers on election night (100+ queries); displayed as "Election Insights" during FOX News\u2019 election watch.',
      'Built geographic map visualizations (~12 PRs) with change-scaled trend indicators, density tuning, and missing-data notices; implemented enterprise SSO and claims-driven role-based access for 3 user roles.',
      'Reviewed 102 teammate PRs (158 reviews), including 6k–11k-line refactors, across 159 Jest + Testing Library files; built multi-agent AI engineering workflows with human approval gates and 20+ tested automation skills.',
    ],
  },
  {
    role: 'Senior Front-End Developer',
    company: 'Squanto',
    place: 'Los Angeles, CA (Remote)',
    dates: 'October 2025 – June 2026',
    bullets: [
      'Built and shipped squanto.app\u2019s entire web UI as sole front-end developer, a live gig marketplace for hosts, performers, and audiences, taking React/TypeScript flows through soft launch.',
      'Implemented real-time mapping, data visualizations, and analytics interfaces for live data, and extended the same UI to mobile with PWA/Cordova.',
      'Partnered with the CEO and systems architect in live debugging sessions, and built and fixed Node.js/MongoDB API endpoints for front-end data, including the repo\u2019s AI context setup.',
      'Maintained front-end conventions (routing, design patterns, spec-driven development) and used Claude Code to speed up docs and test coverage.',
    ],
  },
  {
    role: 'React/TypeScript Developer (Contract)',
    company: 'Trinity Broadcasting Network',
    place: 'Fort Worth, TX (Hybrid)',
    dates: 'June 2023 – August 2024',
    bullets: [
      'Led React/TypeScript front-end development for the TBNPlus.com and MeritPlus.com subscription streaming platforms, owning complex user flows including authentication and payment integration.',
      'Partnered with backend engineers on Okta and Stripe integrations while troubleshooting and optimizing UI performance and reliability.',
      'Supported and maintained TBN.org and related microsites built on WordPress and Drupal CMS.',
    ],
  },
  {
    role: 'Front-End Developer (Contract)',
    company: 'AWS QuickSight',
    place: 'Seattle, WA (Remote)',
    dates: 'July 2022 – May 2023',
    bullets: [
      'Built and maintained React, Redux, and TypeScript UI components for AWS QuickSight, AWS\u2019s business intelligence platform.',
      'Delivered production components under strict testing standards and collaborated on cross-functional prototypes for new features.',
    ],
  },
  {
    role: 'Front-End Developer (Contract)',
    company: 'FOX',
    place: 'Los Angeles, CA (Remote)',
    dates: 'June 2020 – May 2022',
    bullets: [
      'Maintained and enhanced the FOX Web Player (powered by JW Player) used across FOX.com, FOXSports.com, FOX Nation, and other properties serving millions of users.',
      'Diagnosed and resolved complex UI and WebView issues, including channel branding and compatibility on Xbox and Chromecast.',
      'Implemented analytics tracing and performance improvements in close coordination with engineering teams.',
    ],
  },
  {
    role: 'Front-End Developer (Contract)',
    company: 'ADP',
    place: 'Pasadena, CA',
    dates: 'November 2019 – May 2020',
    bullets: [
      'Built and maintained reusable React components and pages for myWisely, ADP\u2019s direct-to-consumer debit card platform and hybrid mobile app, targeting both browser and WebView environments.',
      'Implemented Jest and Selenium WebDriver testing within a Redux, Material UI, and Webpack front-end architecture.',
    ],
  },
  {
    role: 'Front-End Developer',
    company: 'FOX Sports (FOX Corporation)',
    place: 'Los Angeles, CA',
    dates: 'March 2012 – August 2019',
    bullets: [
      'Built real-time front-end features for FOXSports.com, a high-traffic platform covering the NFL, MLB, NBA, NCAA, FIFA World Cup, US Open, and Olympics.',
      'Contributed front-end work to \u201cThe Vanishing Man,\u201d a Sports Emmy Award\u2013winning longform feature.',
      'Delivered live scoreboards, event brackets, newsletter tools, ad integrations, and companion video players with JavaScript, React (partial integration), JW Player, and Webpack.',
      'Shipped multiple full-site redesigns and CMS migrations, partnering with backend teams on proprietary Java Spring services serving JSON/HTML.',
      'Kept live events reliable through performance optimization, analytics implementation, and on-call PagerDuty coverage for major events and channel launches, including FS1.',
    ],
  },
  {
    role: 'UI Engineer',
    company: 'Medversant Technologies LLC',
    place: 'Los Angeles, CA',
    dates: 'May 2008 – February 2012',
    bullets: [
      'Owned the front end of ProviderSource.com, a SaaS medical credentialing platform, as primary UI engineer, designing and building it end to end.',
      'Developed form-heavy interfaces and internal web apps for large-scale data processing workflows.',
    ],
  },
];

export const education = {
  degree: 'Associate of Science in Computer Network Systems',
  school: 'ITT Technical Institute, San Dimas, CA',
  dates: 'June 2006 – December 2008 (Graduated)',
};
