'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Reveal, SectionHeading } from '@/components/motion-primitives'

type Tab = {
  id: string
  name: string
  blurb: string
  points: string[]
  stack: string[]
}

const role = {
  company: 'Arcitech.ai',
  title: 'GenAI Intern',
  period: 'Dec 2025 — May 2026',
}

const tabs: Tab[] = [
  {
    id: 'agbrain',
    name: 'AGBrain',
    blurb: 'Realtime conversational AI + multi-agent HR automation.',
    points: [
      'Built realtime conversational AI with the OpenAI Realtime API over WebSockets.',
      'Redesigned the system as a LangGraph multi-agent graph — 5 modular agents with OpenAI-to-Gemini fallback.',
      'Async parallel agent graphs merging Zoho + PostgreSQL across 100+ employees.',
      'Cut response latency to ~5–6s and reduced manual HR review by ~60%.',
    ],
    stack: ['OpenAI Realtime', 'LangGraph', 'WebSockets', 'PostgreSQL', 'Zoho'],
  },
  {
    id: 'bpobox',
    name: 'BPOBox',
    blurb: 'Async call ingestion with an LLM-as-a-judge scoring pipeline.',
    points: [
      'Async call ingestion pipeline with AssemblyAI transcription + Gemini.',
      'KPI + LLM-as-a-judge evaluation across 8–10 KPIs.',
      'Modeled data with SQLAlchemy across 10–15 tables, backed by AWS storage.',
      'Exposed scoring through a REST API.',
    ],
    stack: ['AssemblyAI', 'Gemini', 'SQLAlchemy', 'AWS', 'FastAPI'],
  },
]

export function Experience() {
  const [active, setActive] = useState(tabs[0].id)
  const current = tabs.find((t) => t.id === active) ?? tabs[0]

  const lineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start 70%', 'end 60%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  const markerFill = useTransform(scrollYProgress, [0, 0.15], [0, 1])

  return (
    <section id="experience" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Experience" title="Where I've shipped." />

        <div ref={lineRef} className="relative pl-10 md:pl-16">
          {/* Drawing timeline line */}
          <div className="absolute left-[7px] top-2 h-full w-px bg-border md:left-[15px]">
            <motion.div
              className="absolute left-0 top-0 w-full origin-top bg-accent"
              style={{ scaleY: lineScale, height: '100%' }}
            />
          </div>
          {/* Marker */}
          <motion.div
            className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full border border-accent md:top-1.5"
            style={{ opacity: markerFill }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </motion.div>

          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-2xl font-semibold md:text-3xl">
                {role.company}
                <span className="text-muted-foreground"> · {role.title}</span>
              </h3>
              <span className="text-sm text-muted-foreground">
                {role.period}
              </span>
            </div>
          </Reveal>

          {/* Tabs */}
          <Reveal delay={0.05}>
            <div
              role="tablist"
              aria-label="Projects at Arcitech.ai"
              className="mt-7 inline-flex rounded-xl border border-border p-1"
            >
              {tabs.map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active === t.id}
                  onClick={() => setActive(t.id)}
                  className="relative rounded-lg px-5 py-2 text-sm font-semibold transition-colors"
                >
                  {active === t.id && (
                    <motion.span
                      layoutId="expTab"
                      className="absolute inset-0 rounded-lg bg-accent"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      active === t.id
                        ? 'text-accent-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {t.name}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* Tab panel */}
          <div className="mt-8 min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                role="tabpanel"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                className="rounded-2xl border border-border bg-surface p-6 md:p-8"
              >
                <div className="flex items-start gap-2">
                  <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-accent" />
                  <p className="text-lg font-medium text-foreground/90">
                    {current.blurb}
                  </p>
                </div>

                <ul className="mt-6 grid gap-3">
                  {current.points.map((p, i) => (
                    <motion.li
                      key={p}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * i, duration: 0.4 }}
                      className="flex gap-3 text-muted-foreground"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span className="leading-relaxed">{p}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2">
                  {current.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
