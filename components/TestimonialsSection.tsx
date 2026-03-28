"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { TESTIMONIALS } from "@/utils/constants"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import ScrollReveal from "./ScrollReveal"

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const autoplayRef = useRef<NodeJS.Timeout | null>(null)

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToPrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    autoplayRef.current = setInterval(goToNext, 5000)
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [])

  const pauseAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
  }

  const resumeAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current)
    autoplayRef.current = setInterval(goToNext, 5000)
  }

  // Handle touch events for mobile swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      goToNext()
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      goToPrev()
    }
  }

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden w-full">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-40 -left-20 w-60 h-60 bg-yellow-500 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-yellow-500 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Client <span className="text-yellow-500">Testimonials</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Don't just take my word for it. Here's what my clients have to say about working with me.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div
            className="relative max-w-5xl mx-auto"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="absolute -top-10 -left-10 text-yellow-500 opacity-20 hidden md:block">
              <Quote size={80} />
            </div>

            <div className="glass rounded-2xl p-1 shadow-xl">
              <div className="overflow-hidden rounded-xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {TESTIMONIALS.map((testimonial, index) => (
                    <TestimonialCard key={index} {...testimonial} />
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={goToPrev}
              variant="outline"
              size="icon"
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500 text-gray-900 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </Button>

            <Button
              onClick={goToNext}
              variant="outline"
              size="icon"
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500 text-gray-900 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex justify-center mt-8">
            {TESTIMONIALS.map((_, index) => (
              <Button
                key={index}
                onClick={() => {
                  setIsAnimating(true)
                  setCurrentIndex(index)
                  setTimeout(() => setIsAnimating(false), 500)
                }}
                variant="ghost"
                size="icon"
                className={`w-3 h-3 mx-1 p-0 min-w-0 transition-all duration-300 rounded-full ${
                  index === currentIndex ? "bg-yellow-500 w-6" : "bg-gray-600 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function TestimonialCard({ name, role, content, image, company = "" }) {
  return (
    <div className="w-full shrink-0 px-4">
      <div className="bg-dark-2 p-6 sm:p-8 rounded-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
          <div className="mb-4 md:mb-0 md:mr-6 relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-yellow-500">
              <Image
                src={image || "/placeholder.svg"}
                alt={name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-500 rounded-full flex items-center justify-center text-gray-900">
              <Quote size={14} />
            </div>
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-bold text-xl text-white">{name}</h3>
            <p className="text-yellow-500">{role}</p>
            {company && <p className="text-gray-400 text-sm">{company}</p>}
          </div>
        </div>
        <p className="text-gray-300 text-base sm:text-lg italic leading-relaxed">{content}</p>
        <div className="mt-6 flex justify-center md:justify-start">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
