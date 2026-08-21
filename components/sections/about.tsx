'use client'

import { Reveal, SectionHeading, StaggerGroup, StaggerItem } from '@/components/motion-primitives'

const focus = [
  {
    k: 'Agentic Systems',
    v: 'Multi-agent orchestration, tool-use loops, planning and self-correction.',
  },
  {
    k: 'Retrieval',
    v: 'RAG pipelines with hybrid search, re-ranking, and eval-driven iteration.',
  },
  {
    k: 'Realtime AI',
    v: 'Streaming inference, low-latency voice and chat, structured outputs.',
  },
  {
    k: 'Production',
    v: 'Observability, cost control, and eval harnesses for LLM systems at scale.',
  },
]

export function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="About" title="Engineering intelligence into products." />

        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <Reveal>
              <p className="text-pretty text-2xl font-medium leading-snug md:text-3xl">
                I build the systems that let language models{' '}
                <span className="text-accent">reason, retrieve, and act</span>{' '}
                reliably in production.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Six months of production experience building multi-agent
                orchestration, realtime conversational AI, and async backend
                services with LangChain, LangGraph, FastAPI, Azure OpenAI, and
                hybrid-search retrieval. I care about latency, cost, and
                correctness in equal measure.
              </p>
            </Reveal>
          </div>

          <StaggerGroup className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 md:col-span-5">
            {focus.map((f) => (
              <StaggerItem
                key={f.k}
                className="bg-surface p-6 transition-colors hover:bg-accent/5"
              >
                <h3 className="text-base font-semibold">{f.k}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.v}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
