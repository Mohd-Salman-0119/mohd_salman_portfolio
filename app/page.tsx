import TopNavbar from "@/components/TopNavbar"
import MainNavbar from "@/components/MainNavbar"
import DeveloperHero from "@/components/DeveloperHero"
import SkillsSection from "@/components/SkillsSection"
import ExperienceSection from "@/components/ExperienceSection"
import ProjectsSection from "@/components/ProjectsSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import ProcessSection from "@/components/ProcessSection"
import ContactSection from "@/components/ContactSection"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden w-full">
      <TopNavbar />
      <MainNavbar />
      <main className="grow overflow-x-hidden w-full">
        <DeveloperHero />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        {/* <TestimonialsSection /> */}
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
