"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Phone, Mail, ChevronRight } from "lucide-react"
import { CONTACT_INFO } from "@/utils/constants"
import { Button } from "@/components/ui/button"

type NavLinkProps = {
  href: string
  children: React.ReactNode
  onClick?: () => void
  isActive?: boolean
}

export default function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleScrollForActiveSection = () => {
      const sections = ["skills", "experience", "projects", "contact"]
      const scrollPosition = window.scrollY + 120

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const { offsetTop, offsetHeight } = element

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("scroll", handleScrollForActiveSection)

    handleScrollForActiveSection()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", handleScrollForActiveSection)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    element.scrollIntoView({ behavior: "smooth" })
    setActiveSection(id)
    setIsMenuOpen(false)
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold text-white">
          <span className="text-yellow-500">M</span>ohd Salman
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex space-x-8">
          <NavLink href="#skills" onClick={() => scrollToSection("skills")} isActive={activeSection === "skills"}>
            Skills
          </NavLink>
          <NavLink
            href="#experience"
            onClick={() => scrollToSection("experience")}
            isActive={activeSection === "experience"}
          >
            Experience
          </NavLink>
          <NavLink href="#projects" onClick={() => scrollToSection("projects")} isActive={activeSection === "projects"}>
            Projects
          </NavLink>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Button
            asChild
            className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition"
          >
            <Link href="#contact" onClick={() => scrollToSection("contact")}>
              Contact Me
            </Link>
          </Button>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white hover:text-yellow-500 border border-red-400 p-2 rounded-full bg-dark-3/50 backdrop-blur"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-gradient-to-b from-gray-900 to-black border-l border-gray-800 z-50 transition ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-800 flex justify-between">
          <span className="text-white font-bold text-xl">
            <span className="text-yellow-500">S</span>almanDev
          </span>
          <X onClick={() => setIsMenuOpen(false)} className="cursor-pointer text-gray-400 hover:text-yellow-500" />
        </div>

        {/* CONTACT */}
        <div className="p-6 space-y-4 border-b border-gray-800">
          <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-yellow-500">
            <Phone className="text-yellow-500" /> {CONTACT_INFO.phone}
          </a>
          <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-3 text-gray-300 hover:text-yellow-500">
            <Mail className="text-yellow-500" /> {CONTACT_INFO.email}
          </a>
        </div>

        {/* LINKS */}
        <div className="p-6 space-y-2">
          <MobileNavLink href="#skills" onClick={() => scrollToSection("skills")} isActive={activeSection === "skills"}>
            Skills
          </MobileNavLink>
          <MobileNavLink
            href="#experience"
            onClick={() => scrollToSection("experience")}
            isActive={activeSection === "experience"}
          >
            Experience
          </MobileNavLink>
          <MobileNavLink href="#projects" onClick={() => scrollToSection("projects")} isActive={activeSection === "projects"}>
            Projects
          </MobileNavLink>
          <MobileNavLink href="#contact" onClick={() => scrollToSection("contact")} isActive={activeSection === "contact"}>
            Contact
          </MobileNavLink>
        </div>
      </div>
    </nav>
  )
}

/* NAV LINK */
function NavLink({ href, children, onClick, isActive = false }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`relative ${
        isActive ? "text-yellow-500" : "text-gray-300 hover:text-yellow-500"
      }`}
    >
      {children}
      <span
        className={`absolute left-0 -bottom-1 h-[2px] bg-yellow-500 transition-all ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </a>
  )
}

/* MOBILE LINK */
function MobileNavLink({ href, children, onClick, isActive = false }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`flex justify-between p-4 rounded-lg ${
        isActive
          ? "bg-yellow-500/10 text-yellow-500 border-l-2 border-yellow-500"
          : "text-gray-300 hover:bg-gray-800"
      }`}
    >
      {children}
      <ChevronRight size={18} />
    </a>
  )
}