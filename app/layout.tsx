import type React from "react"
import "./globals.css"
import { Inter, Geist } from "next/font/google"
import StructuredData from "@/components/StructuredData"
import BrowserCompatibilityFix from "@/components/BrowserCompatibilityFix"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mohd Salman - Full-Stack Web Developer",
  icons: {
    icon: [
      { url: "/favicon.jpeg", sizes: "32x32", type: "image/jpeg" },
      { url: "/favicon.jpeg", sizes: "16x16", type: "image/jpeg" },
    ],
  },
  description:
    "Professional full-stack web development services by Mohd Salman. Crafting powerful, scalable, and user-centric web applications that drive business growth.",
  keywords:
    "full-stack developer, web development, React, Next.js, Node.js, freelance developer, software engineer, 3D web development",
  author: "Mohd Salman",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </head>
      <body className={`${inter.className} min-h-screen bg-linear-to-b from-gray-900 to-black overflow-x-hidden`}
        data-new-gr-c-s-check-loaded="14.1279.0"
        data-gr-ext-installed=""
      >
        <BrowserCompatibilityFix />
        {children}
        <StructuredData />
      </body>
    </html>
  )
}
