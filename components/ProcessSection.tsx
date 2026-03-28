"use client"

import { useState } from "react"
import { Lightbulb, Code, Rocket, Repeat, TestTube } from "lucide-react"
import { PROCESS_STEPS } from "@/utils/constants"
import ScrollReveal from "./ScrollReveal"

const iconMap = {
  Lightbulb,
  Code,
  Rocket,
  Repeat,
  TestTube,
}

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(null)

  return (
    <section id="process" className="py-24 relative overflow-hidden w-full">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-yellow-500 rounded-full filter blur-[100px]"></div>
        <div className="absolute top-40 -left-20 w-60 h-60 bg-yellow-500 rounded-full filter blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              My Development <span className="text-yellow-500">Process</span>
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              From concept to launch, here's how I approach each project to ensure success and client satisfaction.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROCESS_STEPS.map((step, index) => (
            <ScrollReveal key={index} delay={index * 150} distance="30px">
              <ProcessStep
                {...step}
                Icon={iconMap[step.icon]}
                isActive={activeStep === index}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
                stepNumber={index + 1}
              />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={300}>
          <div className="mt-20 glass p-6 sm:p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-center text-white">Why My Process Works</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">Efficient</h4>
                <p className="text-gray-400">Streamlined workflow that saves time and resources</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">Reliable</h4>
                <p className="text-gray-400">Proven methodology that delivers consistent results</p>
              </div>
              <div className="text-center sm:col-span-2 md:col-span-1">
                <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold mb-2 text-white">Transparent</h4>
                <p className="text-gray-400">Clear communication and visibility throughout</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function ProcessStep({ Icon, title, description, isActive, onMouseEnter, onMouseLeave, stepNumber }) {
  return (
    <div
      className="glass rounded-xl p-8 text-center relative transition-all duration-500 hover:shadow-lg hover:shadow-yellow-500/10 h-full"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className={`absolute -top-4 -right-4 w-10 h-10 rounded-full bg-yellow-500 text-gray-900 flex items-center justify-center font-bold transition-transform duration-300 ${isActive ? "scale-125" : ""}`}
      >
        {stepNumber}
      </div>
      <div
        className={`bg-yellow-500 text-gray-900 rounded-full p-5 inline-flex items-center justify-center mb-6 transition-all duration-300 ${isActive ? "scale-110 shadow-lg shadow-yellow-500/20" : ""}`}
      >
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
      <div className={`h-1 bg-yellow-500 mx-auto mt-6 transition-all duration-500 ${isActive ? "w-1/2" : "w-0"}`}></div>
    </div>
  )
}
