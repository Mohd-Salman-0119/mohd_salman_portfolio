import { Phone, Mail, MapPin } from "lucide-react"
import { CONTACT_INFO } from "@/utils/constants"

export default function TopNavbar() {
  return (
    <header className="bg-gray-900/80 backdrop-blur-lg text-gray-300 py-2 border-b border-gray-800/50 hidden md:block">
      <div className="container mx-auto px-4 flex justify-end items-center space-x-6 text-sm">
        <a
          href={`tel:${CONTACT_INFO.phone}`}
          className="flex items-center hover:text-yellow-500 transition duration-300"
        >
          <Phone className="h-4 w-4 mr-2" />
          {CONTACT_INFO.phone}
        </a>
        <a
          href={`mailto:${CONTACT_INFO.email}`}
          className="flex items-center hover:text-yellow-500 transition duration-300"
        >
          <Mail className="h-4 w-4 mr-2" />
          {CONTACT_INFO.email}
        </a>
        <span className="flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          {CONTACT_INFO.location}
        </span>
      </div>
    </header>
  )
}
