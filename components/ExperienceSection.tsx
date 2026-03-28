import Image from "next/image"
import { EXPERIENCE } from "@/utils/constants"
import { Calendar, Briefcase, User, Wrench } from "lucide-react"
import ScrollReveal from "./ScrollReveal"

// ─── Types ────────────────────────────────────────────────────────────────────

type Project = {
  name: string
  description: string
  technologies: string[]
}

type Experience = {
  logo?: string
  company: string
  role: string
  period: string
  description: string
  clients?: string[]
  skills?: string[]
  projects: Project[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isCurrent(period: string): boolean {
  return /present|current|now/i.test(period)
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TechBadge({ label }: { label: string }) {
  return (
    <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-xs">
      {label}
    </span>
  )
}

function ProjectNameBadge({ name }: { name: string }) {
  return (
    <span className="px-3 py-1 bg-dark-3 border border-yellow-500/20 text-gray-300 rounded-full text-xs hover:border-yellow-500/50 transition-colors duration-200">
      {name}
    </span>
  )
}

function MetricBadge({
  label,
  type,
}: {
  label: string
  type?: "positive" | "negative" | "neutral"
}) {
  const styles =
    type === "positive"
      ? "bg-green-500/10 text-green-400 border-green-500/20"
      : type === "negative"
      ? "bg-red-500/10 text-red-400 border-red-500/20"
      : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"

  return (
    <span className={`px-3 py-1 text-xs rounded-full border ${styles}`}>
      {label}
    </span>
  )
}

function ExperienceCard({ exp, isEven }: { exp: Experience; isEven: boolean }) {
  const current = isCurrent(exp.period)

  return (
    <div className="w-full">
      <div
        className={`glass p-5 sm:p-6 rounded-xl transition-all duration-500
          hover:shadow-lg hover:shadow-yellow-500/10
          ${current ? "ring-1 ring-yellow-500/40 shadow-md shadow-yellow-500/10" : ""}
        `}
      >
        {/* Current badge */}
        {current && (
          <div className={`flex mb-3 ${isEven ? "md:justify-end" : "justify-start"}`}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
              Currently Working Here
            </span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center mb-3">
          <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden bg-dark-3 flex items-center justify-center mr-3 border border-yellow-500/30">
            <Image
              src={exp.logo ?? "/placeholder.svg"}
              alt={exp.company}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">{exp.role}</h3>
            <p className="text-yellow-500 text-sm">{exp.company}</p>
          </div>
        </div>

        {/* Period */}
        <div className="flex items-center mb-3 text-gray-400 text-sm">
          <Calendar className="w-3.5 h-3.5 mr-2 text-yellow-500 shrink-0" />
          <span>{exp.period}</span>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed mb-4">{exp.description}</p>

        {/* Clients */}
        {exp.clients && exp.clients.length > 0 && (
          <div className="mb-4">
            <h4 className="text-white text-sm font-semibold mb-2 flex items-center">
              <User className="w-3.5 h-3.5 mr-2 text-yellow-500" />
              Clients
            </h4>
            <div className="flex flex-wrap gap-2">
              {exp.clients.map((client) => (
                <span
                  key={client}
                  className="px-3 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded-full text-xs"
                >
                  {client}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {exp.skills && exp.skills.length > 0 && (
          <div className="mb-4">
            <h4 className="text-white text-sm font-semibold mb-2 flex items-center">
              <Wrench className="w-3.5 h-3.5 mr-2 text-yellow-500" />
              Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {exp.skills.map((skill) => (
                <TechBadge key={skill} label={skill} />
              ))}
            </div>
          </div>
        )}

        {/* Key Projects — names only */}
        {exp.projects && exp.projects.length > 0 && (
          <div className="mb-4">
            <h4 className="text-white text-sm font-semibold mb-2 flex items-center">
              <Briefcase className="w-3.5 h-3.5 mr-2 text-yellow-500" />
              Key Projects
            </h4>
            <div className="flex flex-wrap gap-2">
              {exp.projects.map((project) => (
                <ProjectNameBadge key={project.name} name={project.name} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 relative overflow-hidden w-full">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full filter blur-[100px]" />
        <div className="absolute top-1/2 -right-20 w-60 h-60 bg-yellow-500 rounded-full filter blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Work <span className="text-yellow-500">Experience</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6" />
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              My professional journey as a developer, showcasing the companies I've worked with and
              the projects I've contributed to.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-yellow-500/20" />

          {(EXPERIENCE as Experience[]).map((exp, index) => {
            const isEven = index % 2 === 0
            return (
              <ScrollReveal key={`${exp.company}-${index}`} delay={index * 150}>
                <div className="relative mb-12 md:mb-16">
                  <div
                    className={`flex flex-col md:flex-row items-center ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-yellow-500 border-4 border-gray-900 z-10" />

                    {/* Spacer — pushes card away from the center line */}
                    <div className="hidden md:block md:w-1/2" />

                    {/* Card — takes the other half, with padding away from the line */}
                    <div className={`w-full md:w-1/2 ${isEven ? "md:pr-10" : "md:pl-10"}`}>
                      <ExperienceCard exp={exp} isEven={isEven} />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}