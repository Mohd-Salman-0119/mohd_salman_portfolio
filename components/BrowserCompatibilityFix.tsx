"use client"

import { useEffect } from "react"

export default function BrowserCompatibilityFix() {
  useEffect(() => {
    // Detect browser
    const isChrome = navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1
    const isEdge = navigator.userAgent.indexOf("Edge") > -1

    // Apply browser-specific fixes
    if (isChrome) {
      document.documentElement.classList.add("chrome")

      // Fix container padding in Chrome
      const containers = document.querySelectorAll(".container")
      containers.forEach((container) => {
        const containerElement = container as HTMLElement
        containerElement.style.boxSizing = "border-box"
        containerElement.style.width = "100%"
        containerElement.style.paddingLeft = "0.5rem"
        containerElement.style.paddingRight = "0.5rem"
      })

      // Fix section padding in Chrome
      const sections = document.querySelectorAll("section")
      sections.forEach((section) => {
        const sectionElement = section as HTMLElement
        sectionElement.style.boxSizing = "border-box"
        sectionElement.style.width = "100%"
      })
    }

    if (isEdge) {
      document.documentElement.classList.add("edge")
    }

    // Ensure the site wrapper contains everything properly
    const siteWrapper = document.querySelector(".site-wrapper") as HTMLElement
    if (siteWrapper) {
      siteWrapper.style.width = "100%"
      siteWrapper.style.overflowX = "hidden"
    }

    // Fix body overflow
    document.body.style.overflowX = "hidden"
    document.body.style.width = "100%"

    return () => {
      // Clean up
      if (isChrome) {
        document.documentElement.classList.remove("chrome")
      }
      if (isEdge) {
        document.documentElement.classList.remove("edge")
      }
    }
  }, [])

  return null
}
