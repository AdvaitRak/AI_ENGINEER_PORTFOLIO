'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer } from '@/hooks/use-device'

const DOT_SIZE = 11

export function CustomCursor() {
  const fine = useFinePointer()
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const dotX = useSpring(x, { stiffness: 900, damping: 38, mass: 0.35 })
  const dotY = useSpring(y, { stiffness: 900, damping: 38, mass: 0.35 })
  const trailX = useSpring(x, { stiffness: 180, damping: 22, mass: 0.8 })
  const trailY = useSpring(y, { stiffness: 180, damping: 22, mass: 0.8 })
  const echoX = useSpring(x, { stiffness: 90, damping: 18, mass: 1 })
  const echoY = useSpring(y, { stiffness: 90, damping: 18, mass: 1 })

  useEffect(() => {
    if (!fine) return
    document.documentElement.classList.add('custom-cursor-active')

    const move = (event: MouseEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
    }
    const hide = () => setVisible(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', hide)
    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', hide)
    }
  }, [fine, x, y])

  if (!fine) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.2s' }}
    >
      <motion.div
        className="fixed left-0 top-0 rounded-full"
        style={{
          x: echoX,
          y: echoY,
          translateX: '-50%',
          translateY: '-50%',
          width: 26,
          height: 26,
          backgroundColor: '#2f80ff',
          opacity: 0.1,
          filter: 'blur(8px)',
        }}
      />
      <motion.div
        className="fixed left-0 top-0 rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: 18,
          height: 18,
          backgroundColor: '#2f80ff',
          opacity: 0.22,
          filter: 'blur(4px)',
        }}
      />
      <motion.div
        className="fixed left-0 top-0 rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: DOT_SIZE,
          height: DOT_SIZE,
          backgroundColor: '#2f80ff',
          boxShadow: '0 0 14px rgba(47, 128, 255, 0.65)',
        }}
      />
    </div>
  )
}
