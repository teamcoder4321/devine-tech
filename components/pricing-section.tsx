"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { pricingTiers, services } from "@/lib/site-data"
import { cn } from "@/lib/utils"

function formatUSD(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

function Estimator() {
  const [selected, setSelected] = React.useState<string[]>(["web"])

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const chosen = services.filter((s) => selected.includes(s.id))
  const total = chosen.reduce((sum, s) => sum + s.basePrice, 0)
  const weeks = chosen.length ? Math.max(...chosen.map((s) => s.weeks)) : 0
  const bundleDiscount = chosen.length >= 3 ? 0.1 : 0
  const finalTotal = Math.round(total * (1 - bundleDiscount))

  return (
    <div className="glow-border rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-neon-cyan" />
        <h3 className="text-lg font-semibold">Instant Project Estimator</h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Select what you need. We&apos;ll calculate a ballpark budget and timeline instantly.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {services.map((service) => {
          const checked = selected.includes(service.id)
          return (
            <label
              key={service.id}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors",
                checked
                  ? "border-neon-cyan/50 bg-neon-cyan/5"
                  : "border-border bg-background/40 hover:border-neon-cyan/30"
              )}
            >
              <Checkbox
                checked={checked}
                onCheckedChange={() => toggle(service.id)}
                aria-label={service.title}
              />
              <span className="flex-1">
                <span className="block text-sm font-medium leading-tight">{service.title}</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  from {formatUSD(service.basePrice)}
                </span>
              </span>
            </label>
          )
        })}
      </div>

      <div className="mt-6 flex flex-col items-stretch gap-4 rounded-xl border border-dashed border-border bg-background/50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Estimated Budget</p>
          <motion.p
            key={finalTotal}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gradient-brand"
          >
            {chosen.length ? formatUSD(finalTotal) : "$0"}
            <span className="text-sm text-muted-foreground"> +</span>
          </motion.p>
          {bundleDiscount > 0 && (
            <p className="mt-1 text-xs font-medium text-neon-purple">
              10% bundle discount applied for 3+ services
            </p>
          )}
        </div>
        <div className="text-left sm:text-right">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Est. Timeline</p>
          <p className="text-3xl font-bold">{chosen.length ? `${weeks} wks` : "—"}</p>
        </div>
      </div>

      <Button
        size="lg"
        render={<a href="#contact" />}
        nativeButton={false}
        className="glow-shadow mt-6 w-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple text-background hover:opacity-90"
      >
        Get This Estimate
      </Button>
    </div>
  )
}

function PricingCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      {pricingTiers.map((tier) => (
        <div
          key={tier.name}
          className={cn(
            "relative flex flex-col rounded-2xl border p-6 backdrop-blur-sm",
            tier.highlighted
              ? "glow-shadow border-neon-cyan/50 bg-card"
              : "border-border bg-card/60"
          )}
        >
          {tier.highlighted && (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-neon-cyan to-neon-purple text-background">
              Most Popular
            </Badge>
          )}
          <h3 className="text-lg font-semibold">{tier.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{tier.description}</p>
          <div className="mt-4">
            <span className="text-3xl font-bold">{tier.price}</span>
            <span className="ml-1.5 text-sm text-muted-foreground">{tier.cadence}</span>
          </div>
          <ul className="mt-6 flex flex-1 flex-col gap-3">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-neon-cyan" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
          <Button
            render={<a href="#contact" />}
            nativeButton={false}
            variant={tier.highlighted ? "default" : "outline"}
            className={cn(
              "mt-6 rounded-full",
              tier.highlighted &&
                "bg-gradient-to-r from-neon-cyan to-neon-purple text-background hover:opacity-90"
            )}
          >
            Choose {tier.name}
          </Button>
        </div>
      ))}
    </div>
  )
}

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            Pricing
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Transparent, Productized Pricing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Build your own estimate, or pick a plan that fits your stage.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mx-auto mt-14 max-w-3xl"
        >
          <Estimator />
        </motion.div>

        <div className="mx-auto mt-16 max-w-5xl">
          <PricingCards />
        </div>
      </div>
    </section>
  )
}
