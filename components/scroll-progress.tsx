'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[90] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          'linear-gradient(90deg, rgba(79,124,255,0.2), var(--accent))',
      }}
    />
  )
}
