import { FaReact, FaNodeJs, FaHtml5, FaCss3, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiJavascript, SiRedux, SiTailwindcss, SiExpress, SiNestjs, SiMongodb, SiPostgresql, SiGraphql, SiPostman, SiVercel, SiStorybook, SiJira } from "react-icons/si";
import { DiRedis } from "react-icons/di";
import { VscVscode } from "react-icons/vsc";
import { FaFigma } from "react-icons/fa";

export const SKILLS = [
  {
    icon: "Code",
    title: "Frontend",
    description:
      "Building responsive and high-performance user interfaces using modern frontend technologies and best practices.",
    technologies: [
      { name: "React.js", Icon: FaReact },
      { name: "Next.js", Icon: SiNextdotjs },
      { name: "TypeScript", Icon: SiTypescript },
      { name: "JavaScript", Icon: SiJavascript },
      { name: "Tailwind CSS", Icon: SiTailwindcss },
      { name: "Redux", Icon: SiRedux },
      { name: "HTML5", Icon: FaHtml5 },
      { name: "CSS3", Icon: FaCss3 },
    ],
  },
  {
    icon: "Database",
    title: "Backend",
    description:
      "Developing scalable backend services, APIs, and data-driven applications with modern server-side technologies.",
    technologies: [
      { name: "Node.js", Icon: FaNodeJs },
      { name: "Express.js", Icon: SiExpress },
      { name: "NestJS", Icon: SiNestjs },
      { name: "MongoDB", Icon: SiMongodb },
      { name: "PostgreSQL", Icon: SiPostgresql },
      { name: "GraphQL", Icon: SiGraphql },
      { name: "Redis", Icon: DiRedis },
    ],
  },
  {
    icon: "Wrench",
    title: "Tools",
    description:
      "Using modern development tools for version control, collaboration, debugging, and deployment.",
    technologies: [
      { name: "Git", Icon: FaGitAlt },
      { name: "VS Code", Icon: VscVscode },
      { name: "Postman", Icon: SiPostman },
      { name: "Vercel", Icon: SiVercel },
      { name: "Storybook", Icon: SiStorybook },
      { name: "Jira", Icon: SiJira },
      { name: "Figma", Icon: FaFigma }
    ],
  },
];

export const CONTACT_INFO = {
  phone: "+91 7668264646",
  email: "salmanansari910550@gmail.com",
  location: "Bengaluru, Karnataka, India",
}

export const SOCIAL_LINKS = {
  github: "https://github.com/Mohd-Salman-0119/",
  linkedin: "https://www.linkedin.com/in/mohd-salman01/",
}


export const EXPERIENCE = [
  {
    company: "InspironLabs Software Systems Pvt Ltd",
    role: "MERN Full Stack Developer",
    period: "Mar 2024 – Present",
    logo: "/inspironlabsindia_logo.jpg",
    description:
      "Building scalable full-stack applications for vehicle financing workflows at Lucid Motors. Detail-oriented engineer with a focus on performance optimization, clean architecture, and delivering reliable user experiences.",
    clients: ["Lucid Motors EV"],
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Nest.js",
      "Tailwind CSS",
    ],
    projects: [
      { name: "Lucid Nexus Console" },
      { name: "Lucid Finance Services (LFS)" },
      { name: "Payment Calculator" },
      { name: "Subscription 2.0" },
    ],
  },
  {
    "company": "Masai School",
    "role": "Junior Software Developer",
    "period": "Mar 2023 – Mar 2024",
    "logo": "/masaischool_logo.jpg",
    "description": "Built and maintained frontend applications while strengthening core development skills through hands-on projects and collaborative learning.",
    "skills": [
      "React.js",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Redux",
      "REST APIs"
    ],
    "achievements": [
      { "label": "Built SPA applications using React", "type": "positive" },
      { "label": "Implemented Redux for state management", "type": "neutral" },
      { "label": "Improved UI performance and responsiveness", "type": "positive" }
    ],

    "projects": [
      { "name": "Bewakoof.com" },
      { "name": "Wood Fans" },
      { "name": "Online Wine Shop" }
    ]
  },
]

export const PROJECTS = [
  {
    title: "Lucid Motors",
    description:
      "Lucid is the future of sustainable mobility, designing electric cars that further reimagines the driving experience.",
    image: "/project_images/lucid_motors.png",
    link: "https://lucidmotors.com/",
    category: "web",
    featured: true,
  },
  {
    title: "Wood Fans",
    description:
      "Where artistry meets practicality. Curated sustainable furniture, superior craftsmanship, timeless elegance. Transform your space with us.",
    image: "/project_images/wood-fans.png",
    link: "https://wood-fans-drab.vercel.app/",
    github: "https://github.com/Mohd-Salman-0119/wood-fans",
    category: "web",
    featured: true,
  },
  {
    title: "Online Wine Shop",
    description:
      "Your one-stop destination for all things wine. Explore, learn, and shop your favorites with ease. Dive in today.",
    image: "/project_images/wine-shop.png",
    link: "https://glowing-marigold-0b2a2a.netlify.app/",
    github: "https://github.com/srudhi6383/Online-Wine-shop",
    category: "web",
    featured: true,
  },
  {
    title: "Eduction Websiite",
    description:
      "Learn. Grow. Discover. — Curated resources to fuel your intellectual journey. Your feedback shapes us. Join in today.",
    image: "/project_images/education.png",
    link: "https://creative-maamoul-4e79b9.netlify.app/",
    github: "https://github.com/Mohd-Salman-0119/Education-Website",
    category: "web",
    featured: false,
  },
  {
    title: "GPT-3 UI",
    description:
      "GPT-3 — Explore the future of AI language. Clean, intuitive, and built to inform. Discover what's possible.",
    image: "/project_images/gpt3.png",
    link: "https://gpt3-jsm-project.netlify.app/",
    github: "https://github.com/Mohd-Salman-0119/gpt3-website",
    technologies: ["React Native", "Redux", "HealthKit", "Firebase"],
    category: "web",
    featured: false,
  }
]

export const PROCESS_STEPS = [
  {
    icon: "Lightbulb",
    title: "Research & Planning",
    description:
      "I start by understanding the problem domain, researching existing solutions, and planning the architecture and technology stack.",
  },
  {
    icon: "Code",
    title: "Development",
    description: "Writing clean, maintainable code with a focus on performance, scalability, and best practices.",
  },
  {
    icon: "TestTube",
    title: "Testing & QA",
    description:
      "Implementing comprehensive testing strategies including unit tests, integration tests, and end-to-end testing.",
  },
  {
    icon: "Rocket",
    title: "Deployment & Monitoring",
    description: "Setting up CI/CD pipelines, deploying to production, and implementing monitoring and analytics.",
  },
]

export const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "Engineering Manager",
    company: "TechCorp Inc.",
    content:
      "Alex is an exceptional developer who consistently delivers high-quality code. Their deep understanding of frontend technologies and attention to detail have been invaluable to our team.",
    image: "/placeholder.svg",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "InnovateSoft",
    content:
      "Working with Alex was a pleasure. They have a rare combination of technical expertise, problem-solving skills, and communication abilities that make them an asset to any development team.",
    image: "/placeholder.svg",
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "StartupLabs",
    content:
      "Alex has a talent for translating complex requirements into elegant technical solutions. They're proactive, detail-oriented, and always focused on delivering the best possible user experience.",
    image: "/placeholder.svg",
  },
  {
    name: "David Lee",
    role: "Senior Developer",
    company: "TechCorp Inc.",
    content:
      "As a fellow developer, I've been impressed by Alex's coding standards and problem-solving approach. They're always willing to share knowledge and help others, making them a great team player.",
    image: "/placeholder.svg",
  },
]

export const TECH_STACKS = {
  frontend: [
    { name: "React", icon: "react" },
    { name: "Next.js", icon: "nextjs" },
    { name: "TypeScript", icon: "typescript" },
    { name: "Tailwind CSS", icon: "tailwind" },
    { name: "Redux", icon: "redux" },
    { name: "HTML5", icon: "html" },
    { name: "CSS3", icon: "css" },
    { name: "JavaScript", icon: "javascript" },
  ],
  backend: [
    { name: "Node.js", icon: "nodejs" },
    { name: "Express", icon: "express" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "PostgreSQL", icon: "postgresql" },
    { name: "GraphQL", icon: "graphql" },
    { name: "REST API", icon: "api" },
  ],
  tools: [
    { name: "Git", icon: "git" },
    { name: "Docker", icon: "docker" },
    { name: "AWS", icon: "aws" },
    { name: "Vercel", icon: "vercel" },
    { name: "GitHub Actions", icon: "github" },
    { name: "VS Code", icon: "vscode" },
  ],
  design: [
    { name: "Figma", icon: "figma" },
    { name: "Adobe XD", icon: "xd" },
    { name: "Sketch", icon: "sketch" },
  ],
}
