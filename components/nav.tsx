'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Magnetic } from '@/components/magnetic'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact', label: 'Contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="fixed inset-x-0 top-0 z-[80] px-4 pt-3 md:px-6"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-colors md:px-6 ${
          scrolled
            ? 'border border-border bg-background/70 backdrop-blur-xl'
            : 'border border-transparent'
        }`}
      >
        <a
          href="#top"
          className="text-sm font-semibold tracking-tight"
          aria-label="Back to top"
        >
          AR<span className="text-accent">.</span>
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-draw text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <Magnetic>
          <a
            href="#contact"
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition-colors"
          >
            Get in touch
          </a>
        </Magnetic>
      </nav>
    </motion.header>
  )
}
