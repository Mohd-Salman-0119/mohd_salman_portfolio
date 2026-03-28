"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin, Sparkles, Briefcase } from "lucide-react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import ScrollReveal from "./ScrollReveal"

const AnimatedBackground = dynamic(() => import("./AnimatedBackground"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black" />
  ),
})
export default function DeveloperHero() {
  return (
    <section className="relative text-white py-20 overflow-hidden min-h-[90vh] flex items-center w-full">

      {/* Static fallback background */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-50" />

      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
      </div>

      {/* ── Open to Work — top floating banner, one place only ── */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
        <div
          className="flex items-center gap-3 px-5 py-2.5 rounded-full border border-green-500/50 bg-gray-900/80 backdrop-blur-md"
          style={{ animation: "otw-glow 3s ease-in-out infinite" }}
        >
          {/* Pulsing dot */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
          </span>
          <Briefcase className="w-3.5 h-3.5 text-green-400" strokeWidth={2.5} />
          <span className="text-green-300 font-semibold text-sm tracking-wide">
            Open to Work
          </span>
          <span className="hidden sm:block w-px h-4 bg-green-700/60" />
          <span className="hidden sm:inline text-gray-400 text-xs">
            Available for Frontend &amp; Full Stack roles
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* LEFT CONTENT */}
          <ScrollReveal className="order-2 md:order-1" duration={1000}>
            <div className="glass p-6 sm:p-10 rounded-2xl border border-yellow-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-yellow-500/10">

              {/* Role tag */}
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-3 py-1 mb-5">
                <Sparkles className="w-3 h-3" />
                Frontend Software Engineer · Lucid Motors
              </div>

              {/* Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Hi, I'm{" "}
                <span className="text-yellow-500 glow-text">Salman</span>
                <br />
                Full Stack Developer
              </h1>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-6">
                <MapPin className="w-3.5 h-3.5 text-yellow-500/70" />
                Bengaluru, India
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg mb-8 text-gray-300 leading-relaxed">
                I build scalable and high-performance web applications using modern technologies.
                Specialized in React.js, Next.js, Node.js, and cloud platforms — crafting fast,
                user-focused solutions that make an impact.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/20 rounded-full px-8 py-6 group"
                >
                  <Link href="#projects">
                    View My Work
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 transform hover:scale-105 rounded-full px-8 py-6"
                >
                  <Link href="#contact">Contact Me</Link>
                </Button>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT IMAGE */}
          <ScrollReveal
            className="order-1 md:order-2 flex justify-center"
            duration={1000}
            delay={200}
          >
            {/* Extra margin so floating cards aren't clipped */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mt-8 mb-8 mx-8">

              {/* Glow behind avatar */}
              <div className="absolute inset-0 rounded-full bg-yellow-500/20 animate-pulse" />

              {/* Slow-spinning decorative ring */}
              <div
                className="absolute -inset-3 rounded-full border border-yellow-500/10 mobile-fix"
                style={{ animation: "spin 12s linear infinite" }}
              />

              {/* Avatar */}
              <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-yellow-500">
                <Image
                  src="/favicon.jpeg"
                  alt="Salman - Full Stack Developer"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* ── Experience Card — floating on avatar, bottom-right ── */}
              <div className="absolute -bottom-5 -right-5 bg-gray-900 px-4 py-3 rounded-xl border border-yellow-500/50 shadow-lg shadow-yellow-500/10 text-center min-w-[90px]">
                <div className="text-yellow-500 font-bold text-base leading-none">3+ Years</div>
                <div className="text-gray-400 text-xs font-medium mt-1">Experience</div>
              </div>

            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  )
}