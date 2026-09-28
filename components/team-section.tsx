"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Code2, Link2, X as XIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { team } from "@/lib/site-data"

const socialIcon = {
  LinkedIn: Link2,
  GitHub: Code2,
  X: XIcon,
}

export function TeamSection() {
  return (
    <section id="team" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            The Team
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Founders Behind Devine Tech
          </h2>
          <p className="mt-4 text-muted-foreground">
            A small, senior team obsessed with shipping fast without cutting corners.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              data-cursor="card"
              className="glow-border group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 text-center backdrop-blur-sm"
            >
              <Link
                href={`/team/${member.slug}`}
                prefetch
                aria-label={`View ${member.name}'s profile`}
                className="block cursor-pointer rounded-xl outline-none transition-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
              >
                <div className="relative mx-auto size-20 rounded-full bg-linear-to-br from-neon-cyan to-neon-purple p-0.5 shadow-lg">
                  <Image
                    src={member.image}
                    alt={`${member.name} profile`}
                    width={80}
                    height={80}
                    className="relative z-10 size-full rounded-full object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -inset-1 rounded-full bg-linear-to-br from-neon-cyan to-neon-purple opacity-60 blur-xl transition-opacity duration-300 group-hover:opacity-90"
                  />
                </div>

                <h3 className="mt-5 text-lg font-semibold">{member.name}</h3>
                <p
                  className="text-sm text-muted-foreground [font-family:var(--font-devanagari)]"
                  lang="hi"
                >
                  {member.nameNative}
                </p>
                <p className="mt-2 text-sm font-medium text-gradient-brand">{member.role}</p>
                <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
                <span className="mt-4 inline-block text-sm font-medium text-neon-cyan transition-transform group-hover:translate-x-1">
                  View full profile →
                </span>
              </Link>

              <div className="mt-5 flex items-center justify-center gap-2">
                {member.social.map((s) => {
                  const Icon = socialIcon[s.label]
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={`${member.name} on ${s.label}`}
                      className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
                    >
                      <Icon className="size-4" />
                    </a>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
