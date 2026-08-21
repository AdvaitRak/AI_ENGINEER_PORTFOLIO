'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import { GithubIcon } from '@/components/icons/github-icon'
import type { Project } from './projects-data'

type Lenis = { stop: () => void; start: () => void }

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!project) return
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis
    lenis?.stop()
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()

    return () => {
      lenis?.start()
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl border border-border bg-surface p-6 sm:rounded-2xl sm:p-8"
            data-lenis-prevent
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3
                  id="project-modal-title"
                  className="text-3xl font-semibold tracking-tight"
                >
                  {project.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{project.pitch}</p>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close dialog"
                className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {project.metric && (
              <div className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
                {project.metric.map((m) => (
                  <div key={m.label} className="bg-surface p-4 text-center">
                    <div className="text-xl font-semibold text-accent md:text-2xl">
                      {m.value}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 grid gap-5">
              {project.detail.map((d) => (
                <div key={d.label}>
                  <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    {d.label}
                  </h4>
                  <p className="mt-2 leading-relaxed text-muted-foreground">
                    {d.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
                >
                  View Live Demo
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
