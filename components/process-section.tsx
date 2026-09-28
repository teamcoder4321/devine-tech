"use client"

import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { processSteps } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export function ProcessSection() {
  const [active, setActive] = React.useState(0)

  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            How We Work
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            From Blueprint to Global Launch
          </h2>
          <p className="mt-4 text-muted-foreground">
            An interactive 4-step workflow. Click any step to see what happens.
          </p>
        </div>

        <div className="mt-16">
          <div
            className="relative grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-4"
            role="tablist"
            aria-label="Our process steps"
          >
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-6 hidden h-px bg-border sm:block"
            />
            <motion.div
              aria-hidden="true"
              className="absolute top-6 hidden h-px bg-gradient-to-r from-neon-cyan to-neon-purple sm:block"
              initial={false}
              animate={{ width: `${(active / (processSteps.length - 1)) * 100}%` }}
              transition={{ duration: 0.4 }}
              style={{ left: 0 }}
            />

            {processSteps.map((step, i) => (
              <button
                key={step.title}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className="relative z-10 flex flex-col items-center gap-3 text-center"
              >
                <span
                  className={cn(
                    "flex size-12 items-center justify-center rounded-full border font-mono text-sm font-bold transition-all duration-300",
                    active === i
                      ? "border-neon-cyan bg-background text-neon-cyan shadow-[0_0_24px_rgba(34,211,238,0.5)]"
                      : active > i
                        ? "border-neon-purple/60 bg-neon-purple/10 text-neon-purple"
                        : "border-border bg-card text-muted-foreground"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-medium sm:block",
                    active === i ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="glow-border mx-auto mt-10 max-w-xl rounded-2xl border border-border bg-card/60 p-8 text-center backdrop-blur-sm"
            >
              <span className="font-mono text-xs text-neon-cyan">
                STEP {String(active + 1).padStart(2, "0")} / {processSteps.length}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{processSteps[active].title}</h3>
              <p className="mt-3 text-muted-foreground">{processSteps[active].description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-center gap-2">
            {processSteps.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to step ${i + 1}`}
                onClick={() => setActive(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  active === i ? "w-8 bg-gradient-to-r from-neon-cyan to-neon-purple" : "w-1.5 bg-border"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
