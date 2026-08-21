'use client'

import { ArrowUpRight, Mail } from 'lucide-react'
import { Reveal } from '@/components/motion-primitives'
import { Magnetic } from '@/components/magnetic'
import { GithubIcon } from '@/components/icons/github-icon'

const links: {
  label: string
  value: string
  href: string
  icon: 'mail' | 'linkedin' | 'github'
}[] = [
  {
    label: 'Email',
    value: 'advraktate@gmail.com',
    href: 'mailto:advraktate@gmail.com',
    icon: 'mail',
  },
  {
    label: 'LinkedIn',
    value: '/in/advait-raktate-97510525a',
    href: 'https://www.linkedin.com/in/advait-raktate-97510525a',
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    value: '@AdvaitRak',
    href: 'https://github.com/AdvaitRak',
    icon: 'github',
  },
]

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

function Icon({ name, className }: { name: string; className?: string }) {
  if (name === 'mail') return <Mail className={className} />
  if (name === 'linkedin') return <LinkedInIcon className={className} />
  return <GithubIcon className={className} />
}

export function Contact() {
  return (
    <footer
      id="contact"
      className="relative border-t border-border px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Contact
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-4xl text-pretty text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Let&apos;s build something.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <Magnetic>
            <a
              href="mailto:advraktate@gmail.com"
              data-cursor="hover"
              className="mt-10 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-accent-foreground transition-transform"
            >
              Get in touch
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </Magnetic>
        </Reveal>

        <div className="mt-20 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.icon === 'mail' ? undefined : '_blank'}
              rel={l.icon === 'mail' ? undefined : 'noopener noreferrer'}
              data-cursor="hover"
              className="group flex items-center justify-between gap-4 bg-surface p-6 transition-colors duration-300 hover:bg-surface-hover"
            >
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {l.label}
                </div>
                <div className="mt-1.5 truncate font-medium text-foreground transition-colors group-hover:text-accent">
                  {l.value}
                </div>
              </div>
              <Icon
                name={l.icon}
                className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-accent"
              />
            </a>
          ))}
        </div>

        <p className="mt-16 text-sm text-muted-foreground/70">
          © {new Date().getFullYear()} Advait Raktate. Built with Next.js,
          Framer Motion & Anime.js.
        </p>
      </div>
    </footer>
  )
}
