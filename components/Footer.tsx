"use client"

import Link from "next/link"
import { Mail, Phone, MapPin, ArrowRight, Send } from "lucide-react"
import { SOCIAL_LINKS, CONTACT_INFO } from "@/utils/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ScrollReveal from "./ScrollReveal"
import { LuLinkedin, LuGitlab } from "react-icons/lu"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="pt-24 relative overflow-hidden w-full">
      
      {/* Glow Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-yellow-500 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-500 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <ScrollReveal>
            <div>
              <h3 className="text-2xl font-bold mb-4">
                <span className="text-yellow-500">M</span>ohd Salman
              </h3>

              <p className="text-gray-400 mb-4 leading-relaxed">
                Crafting modern, scalable, and high-performance web applications with cutting-edge technologies.
              </p>

              {/* SOCIAL */}
              {/* <div className="flex space-x-3 mt-4">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  className="group w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-500 transition"
                >
                  <LuGitlab className="text-gray-300 group-hover:text-black" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  className="group w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-yellow-500 transition"
                >
                  <LuLinkedin className="text-gray-300 group-hover:text-black" />
                </a>
              </div> */}
            </div>
          </ScrollReveal>

          {/* LINKS */}
          <ScrollReveal delay={100}>
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "Experience", "Projects",].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="flex items-center text-gray-400 hover:text-yellow-500 transition group"
                    >
                      <ArrowRight
                        size={14}
                        className="mr-2 transform group-hover:translate-x-1 transition"
                      />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* CONTACT */}
          <ScrollReveal delay={200}>
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Phone className="text-yellow-500 mt-1" size={18} />
                  <a href={`tel:${CONTACT_INFO.phone}`} className="text-gray-400 hover:text-yellow-500">
                    {CONTACT_INFO.phone}
                  </a>
                </li>

                <li className="flex gap-3">
                  <Mail className="text-yellow-500 mt-1" size={18} />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-400 hover:text-yellow-500">
                    {CONTACT_INFO.email}
                  </a>
                </li>

                <li className="flex gap-3">
                  <MapPin className="text-yellow-500 mt-1" size={18} />
                  <span className="text-gray-400">{CONTACT_INFO.location}</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* NEWSLETTER */}
          <ScrollReveal delay={300}>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4 text-sm">
                Stay updated with latest tech & projects.
              </p>

              <form className="flex flex-col gap-3">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-900 border-gray-700 focus:border-yellow-500 text-white"
                />
                <Button className="flex items-center justify-center gap-2 bg-yellow-500 text-black hover:bg-yellow-400">
                  Subscribe <Send size={16} />
                </Button>
              </form>
            </div>
          </ScrollReveal>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 my-10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm pb-8 gap-4">
          <p>© {currentYear} Mohd Salman. All rights reserved.</p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-yellow-500 transition">Privacy</a>
            <a href="#" className="hover:text-yellow-500 transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}