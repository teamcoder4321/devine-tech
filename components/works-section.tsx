"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { works } from "@/lib/site-data"

export function WorksSection() {
  return (
    <section id="works" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            Selected Works
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Products We&apos;ve Shipped
          </h2>
          <p className="mt-4 text-muted-foreground">
            A snapshot of platforms and products built end-to-end by our team.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {works.map((work, i) => (
            <motion.a
              key={work.title}
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.1 }}
              whileHover={{ y: -4 }}
              className="glow-border group relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={work.image || "/placeholder.svg"}
                  alt={`${work.title} product preview`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                <div className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur-sm transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="size-4" />
                </div>
              </div>

              <div className="p-6">
                <span className="text-xs font-medium text-neon-cyan">{work.category}</span>
                <h3 className="mt-1 text-lg font-semibold">{work.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{work.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {work.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[11px] font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
