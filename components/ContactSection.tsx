"use client"

import { FiSend } from "react-icons/fi";
import { useState } from "react"
import { LuLinkedin, LuGitlab } from "react-icons/lu"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CONTACT_INFO, SOCIAL_LINKS } from "@/utils/constants"
import ScrollReveal from "./ScrollReveal"

const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
})

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      const whatsappMessage = encodeURIComponent(
        `New message from ${formData.name} (${formData.email}):

 ${formData.message}`,
      )
      window.open(`https://wa.me/1234567890?text=${whatsappMessage}`, "_blank")
      setIsSubmitting(false)
      setSubmitSuccess(true)

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })

      setTimeout(() => {
        setSubmitSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <section id="contact" className="relative min-h-screen bg-black text-white flex items-center">
      <div className="absolute inset-0 opacity-40">
        <ThreeScene />
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 relative z-10">
        {/* LEFT SIDE */}
        {/* LEFT SIDE */}
        <div className="space-y-8">
          <p className="text-yellow-500 tracking-widest font-semibold">CONTACT</p>

          <h1 className="text-5xl font-bold leading-tight text-white">
            Have a new <br />
            <span className="text-yellow-500">Project Idea?</span> <br />
            Please Drop a Message
          </h1>

          <p className="text-gray-300 max-w-md leading-relaxed">
            Get in touch and let me know how I can help. Fill out the form and I will be in touch as soon as possible.
          </p>

          {/* CONTACT INFO */}
          <div className="space-y-5 text-gray-300">

            <div className="flex items-start space-x-3">
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <p className="text-white">{CONTACT_INFO.location}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white">{CONTACT_INFO.phone}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">{CONTACT_INFO.email}</p>
              </div>
            </div>

          </div>

          {/* SOCIAL ICONS */}
          <div className="flex space-x-4 pt-2">
            <div className="w-11 h-11 flex items-center justify-center bg-gray-800 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 cursor-pointer">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-2 flex items-center justify-center text-gray-400 hover:text-yellow-500 hover:bg-dark-3 transition duration-300"
                aria-label="GitHub"
              >
                <LuGitlab size={20} />
              </a>
            </div>
            <div className="w-11 h-11 flex items-center justify-center bg-gray-800 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300 cursor-pointer">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-2 flex items-center justify-center text-gray-400 hover:text-yellow-500 hover:bg-dark-3 transition duration-300"
                aria-label="LinkedIn"
              >
                <LuLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        {/* RIGHT SIDE FORM */}
        <ScrollReveal delay={300} distance="30px">
          <div className="glass border= rounded-xl p-6 sm:p-8 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-500 h-full">
            <h3 className="text-2xl font-bold mb-6 text-white">Send a Message</h3>
            {submitSuccess ? (
              <div className="bg-green-500/20 border border-green-500 text-green-400 rounded-lg p-4 mb-6">
                Your message has been sent successfully! I'll get back to you soon.
              </div>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-400 mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="eg: Salman"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-dark-3 border-gray-700 focus:border-yellow-500 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2">
                  Your Email
                </label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="eg: salmanansari910550@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-dark-3 border-gray-700 focus:border-yellow-500 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2">
                  Your Phone
                </label>
                <Input
                  id="phone"
                  type="number"
                  name="phone"
                  placeholder="eg: 7668264646"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-dark-3 border-gray-700 focus:border-yellow-500 text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="How can I help you?"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="bg-dark-3 border-gray-700 focus:border-yellow-500 text-white"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${isSubmitting
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 hover:from-yellow-400 hover:to-yellow-500"
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <FiSend />
                  </>
                )}
              </Button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}