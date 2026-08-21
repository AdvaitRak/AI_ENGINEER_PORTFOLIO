'use client'

import { Reveal, SectionHeading } from '@/components/motion-primitives'

const achievements: {
  stat: string
  label: string
  body: string
}[] = [
  {
    stat: 'Top 4',
    label: 'UST D3CODE Hackathon',
    body: 'Placed top 4 out of 20,000 participants.',
  },
  {
    stat: 'BRAICON 2026',
    label: 'Co-authored paper',
    body: '"RASEED: AI-Powered Personal Finance Manager & Advisor" accepted at BRAICON 2026, MDIS Singapore.',
  },
]

export function Achievements() {
  return (
    <section id="achievements" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Achievements" title="Recognition." />
        <div className="grid gap-6 md:grid-cols-2">
          {achievements.map((a, i) => (
            <Reveal key={a.label} delay={i * 0.12}>
              <div className="group h-full rounded-2xl border border-border bg-surface p-8 transition-colors duration-300 hover:border-accent/40 md:p-10">
                <div className="text-4xl font-semibold tracking-tight text-accent md:text-5xl">
                  {a.stat}
                </div>
                <div className="mt-4 text-lg font-semibold">{a.label}</div>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">
                  {a.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
