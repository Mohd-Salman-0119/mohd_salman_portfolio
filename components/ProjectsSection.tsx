"use client"

import { useState } from "react"
import { PROJECTS } from "@/utils/constants"
import { Star } from "lucide-react"
import ScrollReveal from "./ScrollReveal"
import { ProjectCard } from "./project-card"

// ─── Types ─────────────────────────────────────────────────────────────

type Project = {
  title: string
  description: string
  image?: string
  link: string
  github?: string
  category: string
  featured?: boolean
}

export type ProjectCardProps = Project & {
  isHovered: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

// ─── Main Component ─────────────────────────────────────────────────────

export default function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>("all")

  // ✅ Dynamic categories
  const categories: string[] = ["all", ...Array.from(new Set(PROJECTS.map((p: Project) => p.category)))]

  // ✅ Filter logic
  const filteredProjects: Project[] =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((project: Project) => project.category === activeFilter)

  return (
    <section id="projects" className="py-24 relative overflow-hidden w-full">

      {/* Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-500 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 -left-20 w-60 h-60 bg-yellow-500 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Featured <span className="text-yellow-500">Projects</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6" />
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              A selection of my recent work showcasing real-world applications and impact.
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs */}
        {/* <ScrollReveal delay={200}>
          <div className="flex justify-center mb-12 overflow-x-auto pb-2">
            <div className="flex gap-2 bg-[#0b0f0e] border border-yellow-500/20 p-1.5 rounded-full">
              {categories.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter)
                    setHoveredIndex(null)
                  }}
                  className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300
                  ${
                    activeFilter === filter
                      ? "bg-yellow-500 text-black shadow-md shadow-yellow-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal> */}

        {/* Featured Projects */}
        <div className="mb-16">
          <ScrollReveal delay={300}>
            <h3 className="text-2xl font-bold mb-8 text-white flex items-center">
              <Star className="text-yellow-500 mr-2" size={20} />
              Highlighted Projects
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {filteredProjects
              .filter((p) => p.featured)
              .map((project, index) => (
                <ScrollReveal key={index} delay={index * 150}>
                  <ProjectCard
                    {...project}
                    isHovered={hoveredIndex === index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                </ScrollReveal>
              ))}
          </div>
        </div>

        {/* Other Projects */}
        <ScrollReveal delay={400}>
          <h3 className="text-2xl font-bold mb-8 text-white">Other Projects</h3>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects
            .filter((p) => !p.featured)
            .map((project, index) => (
              <ScrollReveal key={index} delay={index * 150}>
                <ProjectCard
                  {...project}
                  isHovered={hoveredIndex === index + 100}
                  onMouseEnter={() => setHoveredIndex(index + 100)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              </ScrollReveal>
            ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No projects found.
          </div>
        )}

        {/* CTA */}
        {/* <ScrollReveal delay={500}>
          <div className="text-center mt-16">
            <Button asChild className="bg-yellow-500 font-bold hover:bg-yellow-400 rounded-full px-8 py-6">
              <Link href="https://github.com/your-github" target="_blank">
                View All Projects <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </ScrollReveal> */}

      </div>
    </section>
  )
}