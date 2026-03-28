"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  distance?: string
  reset?: boolean
  threshold?: number
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 800,
  distance = "50px",
  reset = false,
  threshold = 0.1,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  // Set isClient to true once component mounts to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const currentRef = ref.current
    if (!currentRef) return

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Use lower threshold on mobile devices for better triggering
    const isMobile = window.innerWidth < 768
    const effectiveThreshold = isMobile ? 0.05 : threshold

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If user prefers reduced motion, show content immediately
        if (prefersReducedMotion) {
          setIsVisible(true)
          setHasAnimated(true)
          return
        }

        // If reset is true, we want to animate every time the element enters the viewport
        // If reset is false, we only want to animate once
        if (entry.isIntersecting && (reset || !hasAnimated)) {
          setIsVisible(true)
          if (!reset) setHasAnimated(true)
        } else if (reset) {
          setIsVisible(false)
        }
      },
      {
        threshold: effectiveThreshold,
        rootMargin: isMobile ? "50px 0px" : "0px", // Add margin on mobile for better triggering
      },
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [isClient, hasAnimated, reset, threshold])

  // Define the animation style
  const animationStyle = isClient
    ? {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : `translateY(${distance})`,
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        transitionDelay: `${delay}ms`,
      }
    : {}

  // If not client-side, render without animation to avoid hydration mismatch
  if (!isClient) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={className} style={animationStyle}>
      {children}
    </div>
  )
}
