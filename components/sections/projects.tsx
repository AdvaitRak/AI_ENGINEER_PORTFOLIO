'use client'

import { useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { GithubIcon } from '@/components/icons/github-icon'
import { SectionHeading } from '@/components/motion-primitives'
import { useFinePointer } from '@/hooks/use-device'
import { ProjectModal } from './project-modal'
import { projects, type Project } from './projects-data'

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: () => void
}) {
  const fine = useFinePointer()
  const ref = useRef<HTMLDivElement>(null)

  // Scroll-linked scale: grows toward viewport center, shrinks at edges.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94])
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0.4, 1, 1, 0.4])

  // Cursor-based 3D tilt.
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 200, damping: 20 })
  const sry = useSpring(ry, { stiffness: 200, damping: 20 })

  const onMove = (e: React.MouseEvent) => {
    if (!fine || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    ry.set(px * 10)
    rx.set(-py * 10)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div ref={ref} style={{ scale, opacity }}>
      <motion.button
        type="button"
        onClick={onOpen}
        onMouseMove={onMove}
        onMouseLeave={reset}
        data-cursor="hover"
        style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
        className="group block w-full rounded-2xl border border-border bg-surface p-7 text-left transition-colors hover:border-accent/40 md:p-9"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
            {project.title}
          </h3>
          <ArrowUpRight className="h-6 w-6 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </div>

        <p className="mt-3 max-w-lg text-pretty leading-relaxed text-muted-foreground">
          {project.pitch}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-7 flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
            >
              View Live Demo
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}
          <span className="ml-auto text-xs text-muted-foreground/70">
            Click for details
          </span>
        </div>
      </motion.button>
    </motion.div>
  )
}

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null)
  const active = projects.find((p) => p.id === openId) ?? null

  return (
    <section id="projects" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Projects" title="Things I've built." />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setOpenId(p.id)} />
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setOpenId(null)} />
    </section>
  )
}
