import Image from "next/image";
import { ProjectCardProps } from "./ProjectsSection";
import { ArrowRight, ExternalLink, Star } from "lucide-react"
import Link from "next/link";

export function ProjectCard({
  title,
  description,
  image,
  link,
  github,
  isHovered,
  onMouseEnter,
  onMouseLeave,
}: ProjectCardProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-500 border border-yellow-500/20 ${
        isHovered ? "scale-[1.02] shadow-lg shadow-yellow-500/10" : ""
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-transform duration-700 ${
            isHovered ? "scale-110" : ""
          }`}
        />

        <div className={`absolute inset-0 bg-black/70 p-4 flex flex-col justify-end transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex gap-3">
            {github && (
              <a href={github} target="_blank" className="p-2 bg-gray-800 rounded-full">
                <ExternalLink size={16} />
              </a>
            )}
            <a href={link} target="_blank" className="p-2 bg-gray-800 rounded-full">
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-3">{description}</p>

        <Link href={link} className="text-yellow-500 flex items-center text-sm">
          View Project <ArrowRight className="ml-1" size={14} />
        </Link>
      </div>
    </div>
  )
}