'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer } from '@/hooks/use-device'

export function CustomCursor() {
  const fine = useFinePointer()
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Layered springs create a soft, satisfying “ink in water” feel.
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })
  const trailX = useSpring(x, { stiffness: 150, damping: 24, mass: 0.8 })
  const trailY = useSpring(y, { stiffness: 150, damping: 24, mass: 0.8 })
  const dotX = useSpring(x, { stiffness: 900, damping: 40 })
  const dotY = useSpring(y, { stiffness: 900, damping: 40 })

  useEffect(() => {
    if (!fine) return
    document.documentElement.classList.add('custom-cursor-active')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)

      const target = e.target as HTMLElement | null
      const interactive = target?.closest(
        'a, button, [role="button"], input, textarea, [data-cursor="hover"]',
      )
      setHovering(Boolean(interactive))
    }

    const leave = () => setVisible(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [fine, x, y])

  if (!fine) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.2s' }}
    >
      {/* Soft trailing echo */}
      <motion.div
        className="fixed left-0 top-0 rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: 18,
          height: 18,
          backgroundColor: 'var(--accent)',
          opacity: 0.16,
          filter: 'blur(5px)',
        }}
        animate={{ scale: hovering ? 2.6 : 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 24 }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed left-0 top-0 rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          mixBlendMode: 'difference',
        }}
        animate={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          backgroundColor: hovering
            ? 'rgba(79,124,255,0.15)'
            : 'rgba(79,124,255,0)',
          borderColor: hovering
            ? 'rgba(79,124,255,0.9)'
            : 'rgba(245,245,245,0.5)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed left-0 top-0 rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          backgroundColor: 'var(--accent)',
        }}
        animate={{ scale: hovering ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </div>
  )
}
