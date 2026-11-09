// Source: Job Hunter's NDA-safe site copy (/workspace/jdilig-site/resume-copy.md) and
// Reuel_John_Dilig_Resume_2026_FrontEnd.pdf (Nov 9 2026). No FOX 2026 metrics on the site.
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
  pdfSize: '70 KB', // real size of public/John_Dilig_Resume.pdf (71,703 bytes)
  updated: 'November 2026',
};

export const summary =
  "I've been building production web apps for 18+ years, mostly in media, sports, streaming and SaaS. These days I work in React, TypeScript and Next.js, on real-time, data-dense interfaces: live data tables, AI-powered query tools, auth and payment flows. I like owning a feature from the first commit to production, and I use AI-assisted tooling (Claude Code, multi-agent workflows) to ship faster and keep docs and tests current.";

export const status = "Open to full-time front-end roles. Based in Redondo Beach, CA; remote preferred. Available now.";

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
    role: "Frontend Developer (Contract)",
    company: "FOX",
    place: "Los Angeles, CA (Remote)",
    dates: "Jul 2026 – Nov 2026",
    bullets: [
      "Front-end work on a new internal real-time analytics web app, from early build to production. I mostly built the sortable, filterable data tables with live GraphQL data and the natural-language AI query feature (streamed answers, saved history, follow-ups), and I assisted with map visualizations and other UI work. On election night it was used by FOX News analysts and producers and was displayed as \"Election Insights\" during FOX News' election watch.",
    ],
  },
  {
    role: "Senior Front-End Developer",
    company: "Squanto",
    place: "Los Angeles, CA (Remote)",
    dates: "Oct 2025 – Jun 2026",
    bullets: [
      "Sole front-end developer for squanto.app, a live gig marketplace for hosts, performers and audiences. Built the entire web UI in React/TypeScript through soft launch, including real-time maps and data visualizations, and extended it to mobile as a PWA.",
    ],
  },
  {
    role: "React/TypeScript Developer (Contract)",
    company: "Trinity Broadcasting Network",
    place: "Fort Worth, TX (Hybrid)",
    dates: "Jun 2023 – Aug 2024",
    bullets: [
      "Led front-end development for the TBNPlus and MeritPlus subscription streaming platforms, owning sign-in and payment flows (Okta, Stripe).",
    ],
  },
  {
    role: "Front-End Developer (Contract)",
    company: "AWS QuickSight",
    place: "Seattle, WA (Remote)",
    dates: "Jul 2022 – May 2023",
    bullets: [
      "Built React, Redux and TypeScript UI components for AWS's business intelligence platform.",
    ],
  },
  {
    role: "Front-End Developer (Contract)",
    company: "FOX",
    place: "Los Angeles, CA (Remote)",
    dates: "Jun 2020 – May 2022",
    bullets: [
      "Maintained and enhanced the FOX Web Player (JW Player) across FOX.com, FOXSports.com, FOX Nation and more, including fixes for Xbox and Chromecast.",
    ],
  },
  {
    role: "Front-End Developer (Contract)",
    company: "ADP",
    place: "Pasadena, CA",
    dates: "Nov 2019 – May 2020",
    bullets: [
      "Built React components and pages for myWisely, ADP's consumer debit card platform and hybrid mobile app.",
    ],
  },
  {
    role: "Front-End Developer",
    company: "FOX Sports",
    place: "Los Angeles, CA",
    dates: "Mar 2012 – Aug 2019",
    bullets: [
      "Built real-time features for FOXSports.com across the NFL, MLB, NBA, World Cup and Olympics: live scoreboards, brackets and video players. Contributed to \"The Vanishing Man,\" a Sports Emmy–winning longform feature, and covered on-call for major live events.",
    ],
  },
  {
    role: "UI Engineer",
    company: "Medversant Technologies",
    place: "Los Angeles, CA",
    dates: "May 2008 – Feb 2012",
    bullets: [
      "Primary UI engineer for ProviderSource.com, a SaaS medical credentialing platform.",
    ],
  },
];

export const education = {
  degree: 'Associate of Science in Computer Network Systems',
  school: 'ITT Technical Institute, San Dimas, CA',
  dates: 'June 2006 – December 2008 (Graduated)',
};
