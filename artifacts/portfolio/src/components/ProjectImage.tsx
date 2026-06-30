import { useState } from 'react'
import { cn } from '@/lib/utils'

const GRADIENT_COLORS = [
  'from-blue-500 to-indigo-600',
  'from-purple-500 to-pink-600',
  'from-green-500 to-teal-600',
  'from-orange-500 to-red-600',
  'from-cyan-500 to-blue-600',
  'from-violet-500 to-purple-600',
]

function getGradient(title: string) {
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash)
  }
  return GRADIENT_COLORS[Math.abs(hash) % GRADIENT_COLORS.length]
}

interface ProjectImageProps {
  src: string
  alt: string
  projectTitle: string
  className?: string
}

export function ProjectImage({ src, alt, projectTitle, className }: ProjectImageProps) {
  const [error, setError] = useState(false)
  const gradient = getGradient(projectTitle)

  if (!src || error) {
    return (
      <div
        className={cn(
          `bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg`,
          className,
        )}
        aria-label={alt}
      >
        {projectTitle.charAt(0).toUpperCase()}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  )
}
