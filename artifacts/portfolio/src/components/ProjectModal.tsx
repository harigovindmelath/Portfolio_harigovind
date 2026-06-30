import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ExternalLink, Github, X } from '@/components/icons/Icons'
import { ProjectImage } from '@/components/ProjectImage'
import { cn } from '@/lib/utils'

export interface Project {
  id: string
  title: string
  badge: string
  description: string
  image: string
  tags: string[]
  details: string[]
  githubLink: string
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [project, onClose])

  if (!project) return null

  return createPortal(
    <div
      className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <div
        className="animate-zoom-in-sm relative flex max-h-[90vh] w-full max-w-3xl flex-col rounded-lg border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-6">
          <div className="flex items-center">
            <ProjectImage
              src={project.image}
              alt={project.title}
              projectTitle={project.title}
              className="mr-4 h-12 w-12 rounded-full border-2 border-border object-cover"
            />
            <h2 id="project-title" className="text-2xl font-bold text-card-foreground">
              {project.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-8">
          {project.badge && (
            <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {project.badge}
            </span>
          )}

          <div className="mb-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mb-6 text-muted-foreground">{project.description}</p>

          <h3 className="mb-3 text-xl font-bold text-primary">Key Features and Details</h3>
          <ul className="mb-6 list-inside list-disc space-y-2 text-foreground">
            {project.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-end rounded-b-lg border-t border-border bg-background/50 p-6">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" />
              View on GitHub
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

interface ProjectCardProps {
  project: Project
  onCardClick: () => void
}

export function ProjectCard({ project, onCardClick }: ProjectCardProps) {
  return (
    <div
      onClick={onCardClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onCardClick() }}
      role="button"
      tabIndex={0}
      className={cn(
        'flex cursor-pointer flex-col overflow-hidden rounded-lg border border-border bg-card/80 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl',
      )}
    >
      <div className="flex flex-grow flex-col p-6">
        <div className="mb-4 flex items-center">
          <ProjectImage
            src={project.image}
            alt={`${project.title} logo`}
            projectTitle={project.title}
            className="mr-4 h-12 w-12 rounded-full border-2 border-border object-cover"
          />
          <div>
            {project.badge && (
              <span className="mb-1 block text-xs font-semibold text-primary">
                {project.badge}
              </span>
            )}
            <h3 className="text-xl font-bold text-card-foreground">{project.title}</h3>
          </div>
        </div>

        <p className="mb-4 line-clamp-2 flex-grow text-sm text-muted-foreground">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-0.5 text-xs text-muted-foreground">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
