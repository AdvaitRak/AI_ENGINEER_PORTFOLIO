'use client'

import { useEffect, useRef } from 'react'
import { animate, splitText, stagger } from 'animejs'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, FileText } from 'lucide-react'
import { Magnetic } from '@/components/magnetic'
import { usePrefersReducedMotion } from '@/hooks/use-device'

export function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null)
  const reduced = usePrefersReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  useEffect(() => {
    if (!nameRef.current) return
    const split = splitText(nameRef.current, { chars: true, words: true })

    // Chars must be inline-block to accept a translate transform.
    for (const c of split.chars as HTMLElement[]) {
      c.style.display = 'inline-block'
      c.style.willChange = 'transform, opacity'
    }

    if (reduced) {
      return () => split.revert()
    }

    animate(split.chars, {
      y: ['1.1em', '0em'],
      opacity: [0, 1],
      duration: 900,
      ease: 'out(3)',
      delay: stagger(45, { start: 250 }),
    })

    return () => split.revert()
  }, [reduced])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden px-6 md:px-10"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="mx-auto w-full max-w-6xl"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mb-6 flex items-center gap-3 text-sm font-medium uppercase tracking-[0.25em] text-muted-foreground"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          Available for AI engineering roles
        </motion.p>

        <h1
          ref={nameRef}
          className="text-balance text-6xl font-semibold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Advait Raktate
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <p className="mt-6 text-2xl font-semibold text-foreground/90 md:text-4xl">
            AI Engineer <span className="text-muted-foreground">—</span>{' '}
            <span className="text-accent">Agentic Systems &amp; RAG</span>
          </p>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Building production LLM systems — multi-agent orchestration, RAG
            pipelines, realtime AI.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-base font-semibold text-accent-foreground transition-colors"
              >
                View Projects
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-7 py-3.5 text-base font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <FileText className="h-4 w-4" />
                Resume
              </a>
            </Magnetic>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.div>
    </section>
  )
}
