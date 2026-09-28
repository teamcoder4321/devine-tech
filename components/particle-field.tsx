"use client"

import * as React from "react"
import { useTheme } from "next-themes"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  hue: "cyan" | "purple"
}

export function ParticleField({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isDark = resolvedTheme !== "light"
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const cyan = isDark ? "34, 211, 238" : "6, 182, 212"
    const purple = isDark ? "192, 132, 252" : "147, 51, 234"
    const lineAlpha = isDark ? 0.16 : 0.08
    const particleAlpha = isDark ? 0.85 : 0.55

    let width = 0
    let height = 0
    let particles: Particle[] = []
    let animationFrame: number
    let mouse = { x: -1000, y: -1000 }

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas!.width = width * window.devicePixelRatio
      canvas!.height = height * window.devicePixelRatio
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio)

      const count = Math.max(28, Math.min(60, Math.floor((width * height) / 22000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.6 + 0.6,
        hue: Math.random() > 0.5 ? "cyan" : "purple",
      }))
    }

    function handlePointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    function handlePointerLeave() {
      mouse = { x: -1000, y: -1000 }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          p.x -= dx * 0.004
          p.y -= dy * 0.004
        }

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 140) {
            ctx!.strokeStyle = `rgba(${a.hue === "cyan" ? cyan : purple}, ${
              lineAlpha * (1 - dist / 140)
            })`
            ctx!.lineWidth = 1
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx!.beginPath()
        ctx!.fillStyle = `rgba(${p.hue === "cyan" ? cyan : purple}, ${particleAlpha})`
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fill()
      }

      if (!reduceMotion) animationFrame = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(canvas.parentElement!)
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("pointerleave", handlePointerLeave)
    }
  }, [resolvedTheme])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
    />
  )
}
