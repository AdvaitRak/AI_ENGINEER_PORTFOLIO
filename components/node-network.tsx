'use client'

import { useEffect, useRef } from 'react'
import { animate, utils } from 'animejs'
import { useFinePointer, usePrefersReducedMotion } from '@/hooks/use-device'

type Node = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  glow: number // 0..1 accent intensity, eased back to 0
}

const ACCENT = { r: 79, g: 124, b: 255 }
const BASE = { r: 245, g: 245, b: 245 }

export function NodeNetwork() {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let dpr = 1
    let nodes: Node[] = []
    const mouse = { x: -9999, y: -9999, active: false }
    const radius = 150

    const buildNodes = () => {
      // Density scales with viewport but stays bounded for perf.
      const count = Math.min(
        90,
        Math.max(28, Math.floor((width * height) / 22000)),
      )
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: utils.random(0.8, 2.2, 2) as number,
        glow: 0,
      }))
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildNodes()
    }

    let pulse = 0
    // Anime.js drives a global ambient pulse used for node radius breathing.
    const pulseAnim = animate(
      { value: 0 },
      {
        value: 1,
        duration: 3200,
        loop: true,
        alternate: true,
        ease: 'inOutSine',
        onUpdate: (self) => {
          // @ts-expect-error runtime target value
          pulse = self.targets[0].value
        },
      },
    )

    let raf = 0
    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1

        // Mouse repulsion + glow
        if (mouse.active) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < radius && dist > 0.001) {
            const force = (1 - dist / radius) * 0.9
            n.x += (dx / dist) * force
            n.y += (dy / dist) * force
            n.glow = Math.max(n.glow, 1 - dist / radius)
          }
        }
        n.glow *= 0.94 // ease glow back down
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 130) {
            const t = 1 - dist / 130
            const g = Math.max(a.glow, b.glow)
            const col = g > 0.02 ? ACCENT : BASE
            ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},${
              t * (0.06 + g * 0.35)
            })`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Nodes
      for (const n of nodes) {
        const col = n.glow > 0.02 ? ACCENT : BASE
        const rr = n.r + pulse * 0.4 + n.glow * 1.6
        const alpha = 0.25 + pulse * 0.1 + n.glow * 0.6
        ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${alpha})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, rr, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
    }
    const onLeave = () => {
      mouse.active = false
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    window.addEventListener('resize', resize)
    if (fine) window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)

    // Draw a single static frame when motion is reduced.
    if (reduced) {
      draw()
      cancelAnimationFrame(raf)
      pulseAnim.pause()
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(raf)
      pulseAnim.pause()
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
    }
  }, [fine, reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70"
    />
  )
}
