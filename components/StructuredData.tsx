import { SOCIAL_LINKS } from "@/utils/constants"

export default function StructuredData() {
  const structuredData = {
    "@type": "Person",
    name: "Mohd Salman",
    jobTitle: "Full Stack Developer",
    description:
      "Experienced  specializing in full-stack web development with React, Node.js, and modern technologies.",
    url: "https://www.alexdev.example.com",
    sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru, Karnataka",
      addressCountry: "India",
    },
    telephone: "+91 7668264646",
    email: "salmanansari910550@gmail.com",
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "Frontend Development",
      "Backend Development",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of Technology",
    },
    worksFor: {
      "@type": "Organization",
      name: "TechCorp Inc.",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}
