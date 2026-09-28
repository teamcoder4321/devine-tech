"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { services } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export function ServicesSection() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            What We Do
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Full-Stack Engineering, End to End
          </h2>
          <p className="mt-4 text-muted-foreground">
            From first line of code to global scale, one team covers the entire stack.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -4 }}
              className={cn(
                "glow-border glow-shadow group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm"
              )}
            >
              <div
                className={cn(
                  "mb-5 flex size-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-110",
                  service.accent === "cyan"
                    ? "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan"
                    : "border-neon-purple/40 bg-neon-purple/10 text-neon-purple"
                )}
              >
                <service.icon className="size-6" />
              </div>

              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {service.stack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-[11px] font-normal">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div
                aria-hidden="true"
                className={cn(
                  "absolute -right-10 -top-10 size-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
                  service.accent === "cyan" ? "bg-neon-cyan/25" : "bg-neon-purple/25"
                )}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
