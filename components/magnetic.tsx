'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer } from '@/hooks/use-device'

type MagneticProps = {
  children: ReactNode
  className?: string
  strength?: number
}

/**
 * Wraps children in an element that pulls slightly toward the cursor on hover
 * and springs back on leave. No-op on touch devices.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: MagneticProps) {
  const fine = useFinePointer()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 20, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 300, damping: 20, mass: 0.4 })

  const onMove = (e: React.MouseEvent) => {
    if (!fine || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileTap={{ scale: 0.94 }}
    >
      {children}
    </motion.div>
  )
}
