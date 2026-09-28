import {
  Boxes,
  Brain,
  Cloud,
  Code2,
  Rocket,
  Smartphone,
  type LucideIcon,
} from "lucide-react"

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Works", href: "#works" },
  { label: "Pricing", href: "#pricing" },
]

export const stats = [
  { value: 99.9, suffix: "%", label: "Reliability" },
  { value: 5, prefix: "", suffix: "x Faster", label: "Delivery via AI Workflows" },
  { value: 100, suffix: "%", label: "Global & Cloud Ready" },
  { value: 24, suffix: "/7", label: "Founder Support" },
]

export type Service = {
  id: string
  icon: LucideIcon
  title: string
  description: string
  stack: string[]
  basePrice: number
  weeks: number
  accent: "cyan" | "purple"
}

export const services: Service[] = [
  {
    id: "web",
    icon: Code2,
    title: "Web Development & SaaS",
    description:
      "Marketing sites, dashboards, and full SaaS platforms built for speed, SEO, and scale.",
    stack: ["Next.js", "React", "Tailwind", "tRPC"],
    basePrice: 4500,
    weeks: 3,
    accent: "cyan",
  },
  {
    id: "apps",
    icon: Smartphone,
    title: "Multi-Platform Apps",
    description:
      "Native-feel iOS & Android experiences from a single, maintainable codebase.",
    stack: ["Flutter", "React Native", "Swift UI", "Kotlin"],
    basePrice: 7000,
    weeks: 5,
    accent: "purple",
  },
  {
    id: "architecture",
    icon: Boxes,
    title: "System Architecture & API Design",
    description:
      "Microservices, event-driven systems, and scalable database design that won't fall over.",
    stack: ["Microservices", "GraphQL", "PostgreSQL", "Redis"],
    basePrice: 6000,
    weeks: 4,
    accent: "cyan",
  },
  {
    id: "ai",
    icon: Brain,
    title: "AI Solutions & LLM Integration",
    description:
      "Custom chatbots, RAG pipelines, and workflow automation powered by modern LLMs.",
    stack: ["AI SDK", "RAG", "Vector DBs", "Automation"],
    basePrice: 8000,
    weeks: 4,
    accent: "purple",
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Ops & DevOps",
    description:
      "Zero-downtime deploys, observability, and infrastructure-as-code across every major cloud.",
    stack: ["AWS", "GCP", "Azure", "CI/CD"],
    basePrice: 5000,
    weeks: 3,
    accent: "cyan",
  },
  {
    id: "mvp",
    icon: Rocket,
    title: "Rapid MVP Sprint",
    description:
      "Fixed-price, productized delivery to get your idea in front of real users, fast.",
    stack: ["Design Sprint", "No-Code Glue", "Fixed Scope", "2-4 Weeks"],
    basePrice: 3000,
    weeks: 2,
    accent: "purple",
  },
]

export type TeamMember = {
  slug: string
  name: string
  nameNative: string
  role: string
  bio: string
  about: string
  experience: string[]
  expertise: string[]
  services: string[]
  deliveredProjects: string[]
  initials: string
  image: string
  social: { label: "LinkedIn" | "GitHub" | "X"; href: string }[]
}

export const team: TeamMember[] = [
  {
    slug: "saurabh-kumar-gupta",
    name: "Saurabh Kumar Gupta",
    nameNative: "सौरभ कुमार गुप्ता",
    role: "Founder & Lead Architect / AI Specialist",
    bio: "Driving core technology, scalable system designs, and AI workflow integration.",
    about:
      "Saurabh helps ambitious teams turn complex product ideas into resilient, AI-powered systems. He leads technical direction at Devine Tech, balancing thoughtful architecture with fast, measurable delivery.",
    experience: [
      "Leads end-to-end architecture for web, SaaS, and AI products.",
      "Designs scalable APIs, data platforms, and automation workflows.",
      "Guides engineering teams through technical strategy and delivery.",
    ],
    expertise: ["System architecture", "AI workflows", "API design", "Cloud platforms"],
    services: ["AI solutions and LLM integration", "System architecture and API design"],
    deliveredProjects: ["Nimbus Finance analytics platform", "Cortex AI support assistant"],
    initials: "SG",
    image: "/team/saurabh.jpg",
    social: [
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "X", href: "#" },
    ],
  },
  {
    slug: "aprajita-pandey",
    name: "Aprajita Pandey",
    nameNative: "अपराजिता पांडे",
    role: "Co-Founder & Full-Stack / Product Engineer",
    bio: "Crafting seamless multi-platform user experiences and robust web architectures.",
    about:
      "Aprajita turns product requirements into polished, intuitive experiences. She works across product design and full-stack engineering to make every interaction clear, fast, and dependable.",
    experience: [
      "Builds responsive web applications and multi-platform products.",
      "Owns frontend systems, design implementation, and product quality.",
      "Connects user needs with maintainable technical solutions.",
    ],
    expertise: ["Product engineering", "React and Next.js", "UX implementation", "Mobile apps"],
    services: ["Web development and SaaS", "Multi-platform apps"],
    deliveredProjects: ["Trackr Mobile logistics app", "Devine Tech client portals"],
    initials: "AP",
    image: "/team/aprajita.jpeg",
    social: [
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "X", href: "#" },
    ],
  },
  {
    slug: "ritesh-tiwari",
    name: "Ritesh Tiwari",
    nameNative: "रितेश तिवारी",
    role: "Co-Founder & Business Growth / Cloud Operations",
    bio: "Leading global client strategy, productized service delivery, and DevOps infrastructure.",
    about:
      "Ritesh builds the partnerships and operational systems that help products move from launch to sustainable growth. He connects business goals, delivery plans, and reliable cloud operations.",
    experience: [
      "Shapes client strategy, delivery plans, and long-term partnerships.",
      "Builds repeatable processes for productized engineering services.",
      "Oversees deployment, observability, and cloud operations.",
    ],
    expertise: ["Business strategy", "Cloud operations", "DevOps", "Delivery leadership"],
    services: ["Cloud ops and DevOps", "Rapid MVP sprints"],
    deliveredProjects: ["Orbit Cloud infrastructure overhaul", "Global deployment programs"],
    initials: "RT",
    image: "/placeholder-user.jpg",
    social: [
      { label: "LinkedIn", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "X", href: "#" },
    ],
  },
]

export const processSteps = [
  {
    title: "Architecture Blueprint",
    description:
      "We map your product's core flows, data model, and system architecture before a single line of code ships.",
  },
  {
    title: "AI-Accelerated MVP Prototype",
    description:
      "AI-assisted workflows spin up a clickable, testable prototype in days, not months.",
  },
  {
    title: "Full-Stack Engineering",
    description:
      "Production-grade code across frontend, backend, and infrastructure, built to scale from day one.",
  },
  {
    title: "Global Deployment",
    description:
      "Zero-downtime releases, monitoring, and cloud infrastructure tuned for a worldwide audience.",
  },
]

export type Work = {
  title: string
  category: string
  description: string
  image: string
  tags: string[]
}

export const works: Work[] = [
  {
    title: "Nimbus Finance",
    category: "Web Development & SaaS",
    description: "Real-time analytics dashboard for a fintech scale-up, built on Next.js.",
    image: "/works/fintech-dashboard.png",
    tags: ["Next.js", "PostgreSQL", "Charts"],
  },
  {
    title: "Trackr Mobile",
    category: "Multi-Platform Apps",
    description: "Cross-platform logistics tracking app shipped to iOS & Android from one codebase.",
    image: "/works/mobile-app.png",
    tags: ["React Native", "Realtime", "Maps"],
  },
  {
    title: "Cortex AI",
    category: "AI Solutions & LLM Integration",
    description: "RAG-powered support assistant that cut response time by 70% for a SaaS team.",
    image: "/works/ai-platform.png",
    tags: ["RAG", "Vector DB", "AI SDK"],
  },
  {
    title: "Orbit Cloud",
    category: "Cloud Ops & DevOps",
    description: "Multi-region infrastructure overhaul with zero-downtime CI/CD pipelines.",
    image: "/works/cloud-infra.png",
    tags: ["AWS", "Kubernetes", "CI/CD"],
  },
]

export type PricingTier = {
  name: string
  price: string
  cadence: string
  description: string
  features: string[]
  highlighted?: boolean
}

export const pricingTiers: PricingTier[] = [
  {
    name: "MVP Sprint",
    price: "$3,000+",
    cadence: "fixed scope",
    description: "Validate your idea with a focused, production-ready MVP.",
    features: [
      "1 core platform (web or mobile)",
      "AI-accelerated prototyping",
      "2-3 week delivery",
      "2 weeks of post-launch support",
    ],
  },
  {
    name: "Scale-Up",
    price: "$8,000+",
    cadence: "per engagement",
    description: "For growing products that need robust architecture and integrations.",
    features: [
      "Web + mobile or API layer",
      "Custom system architecture",
      "AI / automation integration",
      "Dedicated founder support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "tailored",
    description: "Full-scale engineering partnership across your entire stack.",
    features: [
      "Multi-platform delivery",
      "Dedicated architecture team",
      "24/7 SLA-backed support",
      "Cloud ops & compliance",
    ],
  },
]
