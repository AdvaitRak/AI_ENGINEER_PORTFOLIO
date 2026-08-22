'use client'

import { useEffect, useRef } from 'react'
import { animate, stagger } from 'animejs'
import { SectionHeading } from '@/components/motion-primitives'
import { usePrefersReducedMotion } from '@/hooks/use-device'

const groups: { title: string; items: string[] }[] = [
  {
    title: 'LLM & Agentic AI',
    items: [
      'LangChain',
      'LangGraph',
      'MCP (FastMCP)',
      'RAG',
      'Vector Search',
      'Azure AI Search',
      'BM25',
      'pgvector',
      'Semantic Ranking',
      'Reranking',
      'Prompt Engineering',
      'Multi-Agent Orchestration',
      'LoRA/QLoRA',
    ],
  },
  {
    title: 'Backend & Infra',
    items: [
      'FastAPI',
      'Async Python',
      'WebSockets',
      'SSE',
      'SQLAlchemy',
      'Alembic',
      'PostgreSQL',
      'Redis',
      'Celery',
      'Docker',
      'JWT/OAuth2',
      'RBAC',
      'REST APIs',
      'CI/CD',
    ],
  },
  {
    title: 'ML/DL & Tools',
    items: [
      'PyTorch',
      'TensorFlow',
      'Scikit-learn',
      'MLflow',
      'NLP',
      'PySpark',
    ],
  },
  {
    title: 'Quantum ML',
    items: [
      'PennyLane',
      'Quantum SVM (QSVM)',
      'Variational Quantum Circuits (VQC)',
      'Quantum Machine Learning',
      'Transfer Learning',
      'PCA/Dimensionality Reduction',
      'ResNet50',
    ],
  },
  {
    title: 'Cloud',
    items: [
      'AWS',
      'Azure OpenAI/Foundry',
      'Azure AI Search',
      'Docker',
      'Kubernetes',
    ],
  },
]

function BadgeGroup({ title, items }: { title: string; items: string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const badges = el.querySelectorAll<HTMLElement>('[data-badge]')

    if (reduced) {
      badges.forEach((b) => {
        b.style.opacity = '1'
        b.style.transform = 'none'
      })
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          animate(badges, {
            opacity: [0, 1],
            scale: [0.6, 1],
            translateY: [12, 0],
            delay: stagger(45, { from: 'center' }),
            duration: 620,
            ease: 'outElastic(1, 0.7)',
          })
          observer.disconnect()
        })
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [reduced])

  return (
    <div ref={wrapRef} className="border-t border-border py-8">
      <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2.5">
        {items.map((item) => (
          <span
            key={item}
            data-badge
            data-cursor="hover"
            style={{ opacity: 0 }}
            className="group cursor-default rounded-xl border border-border px-3.5 py-2 text-sm font-medium text-foreground/90 transition-colors duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_20px_-6px_var(--accent)]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Skills" title="Tools of the trade." />
        <div>
          {groups.map((g) => (
            <BadgeGroup key={g.title} title={g.title} items={g.items} />
          ))}
        </div>
      </div>
    </section>
  )
}
