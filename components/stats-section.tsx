"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { stats } from "@/lib/site-data"

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const [display, setDisplay] = React.useState(0)

  React.useEffect(() => {
    if (!isInView) return
    const duration = 1400
    const start = performance.now()
    const decimals = value % 1 !== 0 ? 1 : 0

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(Number((eased * value).toFixed(decimals)))
      if (progress < 1) requestAnimationFrame(tick)
    }

    const frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [isInView, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center"
          >
            <div className="text-3xl font-bold text-gradient-brand sm:text-4xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
