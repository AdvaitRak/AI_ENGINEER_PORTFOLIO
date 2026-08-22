'use client'

import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useSpring } from 'framer-motion'
import { useFinePointer } from '@/hooks/use-device'

const DOT_SIZE = 7
const TARGET_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="hover"]'

function getTargetColor(element: HTMLElement) {
  const styles = window.getComputedStyle(element)
  const transparent = ['transparent', 'rgba(0, 0, 0, 0)']
  if (!transparent.includes(styles.borderColor)) return styles.borderColor
  if (!transparent.includes(styles.backgroundColor)) return styles.backgroundColor
  return 'var(--accent)'
}

function getTargetRadius(element: HTMLElement) {
  const radius = window.getComputedStyle(element).borderRadius
  return radius === '0px' ? '2px' : radius
}

export function CustomCursor() {
  const fine = useFinePointer()
  const [visible, setVisible] = useState(false)
  const [morphed, setMorphed] = useState(false)
  const activeTarget = useRef<HTMLElement | null>(null)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const width = useMotionValue(DOT_SIZE)
  const height = useMotionValue(DOT_SIZE)
  const radius = useMotionValue('50%')
  const borderWidth = useMotionValue(0)
  const borderColor = useMotionValue('var(--accent)')
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.55 })
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.55 })
  const trailX = useSpring(x, { stiffness: 150, damping: 24, mass: 0.8 })
  const trailY = useSpring(y, { stiffness: 150, damping: 24, mass: 0.8 })

  useEffect(() => {
    if (!fine) return
    document.documentElement.classList.add('custom-cursor-active')

    const move = (event: MouseEvent) => {
      if (!activeTarget.current) {
        x.set(event.clientX)
        y.set(event.clientY)
      }
      setVisible(true)
    }

    const enter = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        TARGET_SELECTOR,
      )
      if (!target) return
      const rect = target.getBoundingClientRect()
      const styles = window.getComputedStyle(target)
      activeTarget.current = target
      setMorphed(true)
      animate(x, rect.left + rect.width / 2, { type: 'spring', stiffness: 420, damping: 30 })
      animate(y, rect.top + rect.height / 2, { type: 'spring', stiffness: 420, damping: 30 })
      animate(width, rect.width, { type: 'spring', stiffness: 360, damping: 28 })
      animate(height, rect.height, { type: 'spring', stiffness: 360, damping: 28 })
      animate(radius, getTargetRadius(target), { type: 'spring', stiffness: 360, damping: 28 })
      animate(borderWidth, 2, { type: 'spring', stiffness: 420, damping: 30 })
      animate(borderColor, getTargetColor(target), { type: 'spring', stiffness: 420, damping: 30 })
      target.dataset.cursorColor = getTargetColor(target)
      target.dataset.cursorFill = styles.backgroundColor
    }

    const leave = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        TARGET_SELECTOR,
      )
      const next = (event.relatedTarget as HTMLElement | null)?.closest<HTMLElement>(
        TARGET_SELECTOR,
      )
      if (!target || target === next) return
      activeTarget.current = null
      setMorphed(false)
      animate(width, DOT_SIZE, { type: 'spring', stiffness: 500, damping: 32 })
      animate(height, DOT_SIZE, { type: 'spring', stiffness: 500, damping: 32 })
      animate(radius, '50%', { type: 'spring', stiffness: 500, damping: 32 })
      animate(borderWidth, 0, { type: 'spring', stiffness: 500, damping: 32 })
      animate(borderColor, 'var(--accent)', { type: 'spring', stiffness: 500, damping: 32 })
    }

    const hide = () => setVisible(false)
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', enter)
    document.addEventListener('mouseout', leave)
    document.addEventListener('mouseleave', hide)
    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', enter)
      document.removeEventListener('mouseout', leave)
      document.removeEventListener('mouseleave', hide)
    }
  }, [fine, x, y, width, height, radius, borderWidth, borderColor])

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
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: 18,
          height: 18,
          backgroundColor: 'var(--accent)',
          opacity: morphed ? 0 : 0.14,
          filter: 'blur(5px)',
        }}
      />
      <motion.div
        className="fixed left-0 top-0 box-border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width,
          height,
          borderRadius: radius,
          borderWidth,
          borderStyle: 'solid',
          borderColor: morphed ? borderColor : 'transparent',
          backgroundColor: 'transparent',
          boxShadow: morphed ? '0 0 18px color-mix(in srgb, var(--accent) 24%, transparent)' : 'none',
        }}
      />
    </div>
  )
}
