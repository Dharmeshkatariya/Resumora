import { ResumeData, JobCard } from "./types";

export const TEMPLATE_PRESETS = [
  {
    id: "executive",
    name: "Classic Executive",
    description: "Elegant serif typography with center headers designed for senior leadership and finance positions.",
    fontDisplay: "Cabinet Grotesk",
    fontBody: "Satoshi",
    borderColor: "rgba(0,0,0,0.1)",
  },
  {
    id: "tech-mono",
    name: "Silicon Valley Mono",
    description: "Sleek, developer-focused aesthetic using clean code font accents and compact horizontal layouts.",
    fontDisplay: "Space Grotesk",
    fontBody: "JetBrains Mono",
    borderColor: "rgba(0,255,178,0.15)",
  },
  {
    id: "creative",
    name: "Modern Creative",
    description: "Two-column design styled with bold mint bullet markers and deep space typography.",
    fontDisplay: "Cabinet Grotesk",
    fontBody: "Satoshi",
    borderColor: "rgba(79,110,247,0.15)",
  },
  {
    id: "minimal",
    name: "Elegant Minimalist",
    description: "Ultra-clean hairline dividers, spacious margins, and classic modern grotesque pairings.",
    fontDisplay: "Inter",
    fontBody: "Inter",
    borderColor: "rgba(255,255,255,0.08)",
  }
];

export const SAMPLE_RESUME: ResumeData = {
  id: "sample-staff-engineer",
  name: "Jane Doe - Principal Architect Resume",
  templateId: "tech-mono",
  lastModified: "2026-06-06T10:30:00Z",
  atsScore: 92,
  tags: ["Engineering", "Leadership", "Architect"],
  isFavorite: true,
  header: {
    name: "Jane Doe",
    title: "Principal Staff Frontend Architect",
    email: "jane.doe@stripe.dev",
    phone: "+1 (555) 382-9201",
    location: "San Francisco, CA (Hybrid)",
    website: "https://janedoe.dev",
    linkedin: "https://linkedin.com/in/janedoe-staff",
  },
  experiences: [
    {
      id: "exp-1",
      company: "Stripe",
      role: "Staff Engineer (Core UI & Billing)",
      location: "San Francisco, CA",
      startDate: "2023-01",
      endDate: "Present",
      current: true,
      description: "Spearheaded the redesign of the merchant onboarding gateway, leveraging React Server Components and micro-frontends. Orchestrated cross-functional collaboration of 14 designers, product managers, and developers across 3 continents.\nOptimized dashboard telemetry and core payload bundles, resulting in an 18% reduction in Largest Contentful Paint (LCP) and saving $400k in annual server execution overhead.\nArchitected and deployed stripe-ui-core, a modern robust web component kit utilized by 200+ internal developers, streamlining product launch speeds by 40%."
    },
    {
      id: "exp-2",
      company: "Stripe (formerly Segment)",
      role: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2020-03",
      endDate: "2022-12",
      current: false,
      description: "Implemented a sub-millisecond edge rendering pipeline for user analytics, handling over 3.2 billion requests per day with 99.999% uptime.\nLed a team of 4 engineers to migrate our monolithic customer dashboard to a distributed next-gen React platform, completing the migration 2 months ahead of schedule.\nEstablished automated semantic accessibility audits which achieved WCAG AA standard conformity across the core enterprise portal, eliminating key regulatory compliance risks."
    }
  ],
  educations: [
    {
      id: "edu-1",
      school: "Stanford University",
      degree: "M.S. in Computer Science",
      fieldOfStudy: "Human-Computer Interaction & Graphics",
      location: "Stanford, CA",
      startDate: "2018-09",
      endDate: "2020-06",
      gpa: "3.94"
    },
    {
      id: "edu-2",
      school: "UC Berkeley",
      degree: "B.S. in Electrical Engineering & Computer Sciences",
      fieldOfStudy: "Computer Science",
      location: "Berkeley, CA",
      startDate: "2014-09",
      endDate: "2018-06",
      gpa: "3.85"
    }
  ],
  skills: [
    {
      category: "Languages",
      list: ["TypeScript", "JavaScript", "Rust", "Go", "Python", "SQL", "HTML5/CSS3"]
    },
    {
      category: "Frameworks & UI",
      list: ["React", "Next.js", "Tailwind CSS", "GraphQL", "Framer Motion", "D3.js", "Node.js"]
    },
    {
      category: "Infrastructure & Tools",
      list: ["AWS", "Vercel", "Docker", "SST", "Git", "Webpack", "Redis", "Cloudflare Pages"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "ZenFrame Canvas Layouts",
      role: "Creator & Lead Architect",
      description: "High-performance vector rendering canvas in Rust compiled to WebAssembly, powering drag-and-drop workflow models natively inside React.",
      url: "https://github.com/janedoe/zenframe",
      technologies: ["Rust", "Wasm", "React", "TypeScript"]
    },
    {
      id: "proj-2",
      title: "PulseFlow State Engine",
      role: "Solo Creator",
      description: "An offline-first, highly responsive distributed state sync library with automatic diff propagation over raw WebSockets.",
      url: "https://pulseflow.org",
      technologies: ["TypeScript", "IndexedDB", "WebSockets"]
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Professional",
      issuer: "Amazon Web Services",
      date: "2024-05"
    },
    {
      id: "cert-2",
      name: "Advanced Interactions Certificate",
      issuer: "Framer Academy",
      date: "2022-11"
    }
  ],
  languages: [
    {
      id: "lang-1",
      name: "English",
      proficiency: "Native / Bilingual"
    },
    {
      id: "lang-2",
      name: "Spanish",
      proficiency: "Conversational"
    }
  ],
  customSections: [
    {
      id: "cust-1",
      title: "Key Accomplishments",
      content: "- Awarded Stripe Engineering Innovation Prize (2025)\n- 12x speaker at international design systems and React conferences\n- Open source contributor to React core and Next.js (500+ github stars)"
    }
  ],
  styles: {
    fontDisplay: "Cabinet Grotesk",
    fontBody: "Satoshi",
    fontSizeScale: "normal",
    spacingScale: "normal",
    accentColor: "#00FFB2",
    borderRadius: "soft",
    headerStyle: "modern",
    dividerStyle: "line",
    showNumbering: false,
    iconStyle: "outline",
  }
};

export const SAMPLE_JOBS: JobCard[] = [
  {
    id: "job-1",
    company: "Stripe",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&fit=crop&auto=format",
    role: "Staff Frontend Architect",
    salary: "$210,000 - $260,000",
    date: "2026-05-12",
    status: "interview",
    notes: "Phone interview completed. Scheduled next panel loop on June 10. Focusing on system architecture and scalability questions."
  },
  {
    id: "job-2",
    company: "Linear",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&fit=crop&auto=format",
    role: "Senior Product Engineer",
    salary: "$180,000 - $220,000 + equity",
    date: "2026-05-20",
    status: "applied",
    notes: "Submitted tailored mono resume version. Reached out to recruiting coordinator."
  },
  {
    id: "job-3",
    company: "OpenAI",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80&fit=crop&auto=format",
    role: "Machine Learning Interface Architect",
    salary: "$240,000 - $310,000",
    date: "2026-06-01",
    status: "wishlist",
    notes: "Drafting bullet points focusing on my ZenFrame WebAssembly canvas tool. Fits ML interface rendering pipeline perfectly."
  }
];

export const PRESET_JOB_DESCRIPTIONS = [
  {
    title: "Staff Frontend Architect at Stripe",
    text: `Stripe is looking for a Staff Frontend Architect to lead the future of our globally distributed merchant dashboard.
    
    Required Experience:
    - 8+ years building enterprise scale React/Next.js systems.
    - Deep knowledge of bundlers, edge delivery networks, and micro-frontends.
    - Hands-on experience modeling design systems, web components, and CSS architecture.
    - Track record of driving engineering performance metrics (LCP, FID, bundle sizes, telemetry, Web telemetry audits).
    - M.S. or B.S. in Computer Science, engineering or equivalent.
    
    Keywords to match: stripe-ui-core, React Server Components (RSC), micro-frontends, telemetry, LCP, bundle load overhead, scalability.`
  },
  {
    title: "Senior Product Engineer at Linear",
    text: `Linear builds the best tools for developer workflows. We are seeking a design-minded Senior Product Engineer to craft the future of tracking interfaces.
    
    Core criteria:
    - Absolute pixel-perfection, eye for typography, margins, layouts, and spring physics.
    - Expert TypeScript and React architecture.
    - Fluent in offline-first systems, IndexedDB replication, performance tracking, Web Worker systems, WebSockets.
    - Experience building canvases, canvas rendering systems, mouse offset calculations and magnetic dragging.
    - Autonomous, entrepreneurial mindset.`
  },
  {
    title: "Machine Learning Interface Architect at OpenAI",
    text: `OpenAI seeks a frontend wizard to build interfaces for next-generation frontier intelligence AI systems.
    
    Requirements:
    - Fluent in dynamic data visualization (D3.js, WebGL, high-density charts).
    - Expert in compiling native components to WebAssembly (Rust/C++) to power rich local computation.
    - Deep experience scaling AI playgrounds, prompt playgrounds, conversational streaming text models, and LLM telemetry.
    - Mastery over React hooks, reactive memoization, and rendering optimization.`
  }
];

export const TESTIMONIALS = [
  {
    name: "Alex Rivera",
    role: "Staff Engineer",
    company: "Vercel",
    quote: "The interface alone left me speechless. It feels 100 times faster than other builders. Got an interview at Vercel in 4 days.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&auto=format"
  },
  {
    name: "Sarah Jenkins",
    role: "Lead Product Designer",
    company: "Airbnb",
    quote: "The Theme Studio let me build a warm custom editorial resume that stood out immediately. Recruiters actually complimented the margins and typography!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&auto=format"
  }
];

export const PRICING_PLANS = [
  {
    name: "Standard Free Plan",
    price: "$0",
    period: "forever",
    description: "Start crafting your professional presence instantly.",
    features: [
      "Access to 2 Active Resumes",
      "5 Premium Core Templates",
      "3 AI Rewrites & Bullet Generations per month",
      "Standard PDF Exports (with minimal digital seal)",
      "Standard ATS Match Feedback score",
      "Core Kanban Job Tracker (up to 5 jobs)"
    ],
    buttonText: "Current Plan",
    isCurrent: true,
    accent: "border-slate-800"
  },
  {
    name: "Executive Pro Elite",
    price: "$12",
    period: "month",
    description: "Unlock full command over your career trajectory and resume tailoring.",
    features: [
      "Unlimited Active Resumes & Libraries",
      "Unrestricted AI Tools (Tailor, Critic, Bullets, Interview Prep)",
      "Infinite PDF, DOCX, and Vector Exports (no seal)",
      "Dynamic Heatmaps & ATS Simulator Engines (Greenhouse / Lever)",
      "One-click LinkedIn Optimizer & Optimizer Panel",
      "Custom Automated Portfolio web builder with dark luxury templates",
      "Comprehensive Job Tracker analytics dashboards"
    ],
    buttonText: "Upgrade to Pro Elite",
    isCurrent: false,
    badge: "Most Popular",
    accent: "border-neon-mint"
  },
  {
    name: "Autonomous Recruiter",
    price: "$49",
    period: "month",
    description: "Built for recruitment professionals and high-volume matching.",
    features: [
      "Everything in Executive Pro Plan",
      "Recruiter workspace dashboard with version diffs",
      "Bulk resume uploads & resume-grading queues",
      "Interactive candidate sharing interfaces",
      "Full API access points for custom integration",
      "Enterprise Single Sign-On (SSO) integration"
    ],
    buttonText: "Contact Sales",
    isCurrent: false,
    accent: "border-indigo-accent"
  }
];
