"use client"

import Image from "next/image"
import { useState } from "react"
import { SKILLS } from "@/utils/constants"
import ScrollReveal from "./ScrollReveal"

// ─── Types ────────────────────────────────────────────────────────────────────

type Technology = {
  name: string
  Icon: React.ElementType
}

type Skill = {
  icon: string
  title: string
  description: string
  technologies: Technology[]
}

// ─── TechCard ─────────────────────────────────────────────────────────────────

function TechCard({ name, Icon }: { name: string; Icon: React.ElementType }) {
  return (
    <div className="group relative w-24 h-24 flex items-center justify-center rounded-2xl 
      border border-yellow-500/30
      hover:border-yellow-400 
      hover:shadow-[0_0_20px_rgba(234,179,8,0.25)]
      transition-all duration-300 cursor-pointer">

      {/* Icon */}
      <Icon className="text-4xl text-gray-300 group-hover:text-yellow-400 transition-all duration-300" />

      {/* Skill Name (on hover) */}
      <span className="absolute -bottom-6 text-[11px] text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
        {name}
      </span>
    </div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<string>(SKILLS[0].title)

  const activeSkill = SKILLS.find((s) => s.title === activeTab) as Skill

  return (
    <section id="skills" className="py-24 relative overflow-hidden w-full">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full filter blur-[100px]" />
        <div className="absolute top-1/2 -right-20 w-60 h-60 bg-yellow-500 rounded-full filter blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

        {/* Heading */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Tech <span className="text-yellow-500">Stack</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6" />
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              My expertise spans across various technologies and tools that I use to build robust,
              scalable applications.
            </p>
          </div>
        </ScrollReveal>

        {/* Tab Filters */}
        <ScrollReveal delay={150}>
          <div className="flex justify-center items-center mb-10 overflow-x-auto pb-1">
            <div className="inline-flex glass rounded-2xl p-1.5 gap-1">
              {SKILLS.map((skill) => (
                <button
                  key={skill.title}
                  onClick={() => setActiveTab(skill.title)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 whitespace-nowrap
                    ${activeTab === skill.title
                      ? "bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/30"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <span>{skill.title}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Tech Grid */}
        <ScrollReveal delay={250}>
          <div
            key={activeTab}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 justify-items-center"
          >
            {activeSkill.technologies.map((tech, index) => (
              <TechCard key={`${activeTab}-${index}`} name={tech.name} Icon={tech.Icon} />
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}