"use client"

import * as React from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"
import { ArrowRight, ChevronDown, Cloud, Cpu, Database, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ParticleField } from "@/components/particle-field"
import { useTypewriter } from "@/hooks/use-typewriter"

const HEADLINE = "We Build Next-Gen Web, Apps, AI & Cloud Infrastructure."

const nodes = [
  { icon: Cpu, label: "API Layer", top: "8%", left: "6%", accent: "cyan" as const },
  { icon: Database, label: "Scalable DB", top: "12%", left: "62%", accent: "purple" as const },
  { icon: Sparkles, label: "AI Engine", top: "58%", left: "4%", accent: "purple" as const },
  { icon: Cloud, label: "Cloud Deploy", top: "62%", left: "60%", accent: "cyan" as const },
]

function TiltCard() {
  const ref = React.useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 150, damping: 18 })
  const springY = useSpring(rotateY, { stiffness: 150, damping: 18 })
  const transform = useMotionTemplate`rotateX(${springX}deg) rotateY(${springY}deg)`

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * 14)
    rotateX.set(py * -14)
  }

  function handlePointerLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div className="relative mx-auto w-full max-w-md [perspective:1200px] sm:max-w-lg">
      <motion.div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ transform }}
        className="relative aspect-square w-full rounded-3xl border border-border bg-card/60 p-6 shadow-2xl backdrop-blur-sm"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-purple/10" />

        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
          <motion.line
            x1="20%" y1="18%" x2="50%" y2="50%"
            stroke="currentColor" className="text-neon-cyan/40" strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.line
            x1="75%" y1="20%" x2="50%" y2="50%"
            stroke="currentColor" className="text-neon-purple/40" strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.3 }}
          />
          <motion.line
            x1="15%" y1="70%" x2="50%" y2="50%"
            stroke="currentColor" className="text-neon-purple/40" strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.6 }}
          />
          <motion.line
            x1="72%" y1="72%" x2="50%" y2="50%"
            stroke="currentColor" className="text-neon-cyan/40" strokeWidth="1"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.7, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.15 }}
          />
        </svg>

        <div className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-border bg-background shadow-lg">
          <span className="text-xs font-bold text-gradient-brand">DT</span>
        </div>

        {nodes.map((node) => (
          <div
            key={node.label}
            style={{ top: node.top, left: node.left }}
            className="absolute flex flex-col items-center gap-1.5"
          >
            <div
              className={
                "flex size-11 items-center justify-center rounded-xl border bg-card shadow-md " +
                (node.accent === "cyan"
                  ? "border-neon-cyan/40 text-neon-cyan"
                  : "border-neon-purple/40 text-neon-purple")
              }
            >
              <node.icon className="size-5" />
            </div>
            <span className="whitespace-nowrap rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground shadow-sm">
              {node.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function HeroSection() {
  const { output, done } = useTypewriter(HEADLINE, 28, 400)

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="absolute inset-0 -z-10 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute inset-0 -z-10">
        <ParticleField className="h-full w-full" />
      </div>
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-neon-purple/20 via-neon-cyan/10 to-transparent blur-3xl"
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-neon-cyan opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-neon-cyan" />
            </span>
            AI-First Digital Engineering Agency
          </motion.div>

          <h1 className="mt-6 min-h-[9rem] text-4xl font-bold leading-[1.1] tracking-tight sm:min-h-[11rem] sm:text-5xl md:text-6xl">
            {output.split(/(Web|Apps|AI|Cloud Infrastructure)/g).map((chunk, i) =>
              ["Web", "Apps", "AI", "Cloud Infrastructure"].includes(chunk) ? (
                <span key={i} className="text-gradient-brand">
                  {chunk}
                </span>
              ) : (
                <React.Fragment key={i}>{chunk}</React.Fragment>
              )
            )}
            <span
              aria-hidden="true"
              className={
                "ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-1 bg-neon-cyan align-middle " +
                (done ? "animate-pulse" : "")
              }
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            Empowering global businesses with scalable system architecture,
            high-performance web/mobile solutions, and custom AI tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button
              size="lg"
              render={<a href="#pricing" />}
              nativeButton={false}
              className="glow-shadow rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple text-background hover:opacity-90"
            >
              Start a Project (Instant Estimate)
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              render={<a href="#services" />}
              nativeButton={false}
              className="rounded-full border-border bg-card/50 backdrop-blur-sm"
            >
              Explore Services
              <ChevronDown data-icon="inline-end" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TiltCard />
        </motion.div>
      </div>
    </section>
  )
}
