"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { CheckCircle2, Loader2, Send } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type FormState = {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const initialState: FormState = { name: "", email: "", message: "" }

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = "Please tell us your name."
  if (!values.email.trim()) {
    errors.email = "Email is required."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Enter a valid email address."
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Tell us a bit more (10+ characters)."
  }
  return errors
}

async function fireConfetti() {
  const confetti = (await import("canvas-confetti")).default
  const colors = ["#22d3ee", "#a855f7", "#ffffff"]
  confetti({
    particleCount: 90,
    spread: 70,
    startVelocity: 35,
    origin: { y: 0.6 },
    colors,
  })
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.7 },
    colors,
  })
  confetti({
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.7 },
    colors,
  })
}

export function ContactSection() {
  const [values, setValues] = React.useState<FormState>(initialState)
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle")
  const [submitError, setSubmitError] = React.useState("")

  function handleChange(field: keyof FormState, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus("submitting")
    setSubmitError("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(result?.error || "Unable to send your message right now.")
      }

      setStatus("success")
      fireConfetti()
      setValues(initialState)
      setTimeout(() => setStatus("idle"), 4000)
    } catch (error) {
      setStatus("error")
      setSubmitError(error instanceof Error ? error.message : "Unable to send your message right now.")
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="glow-border glow-shadow relative overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm sm:p-12"
        >
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 size-64 rounded-full bg-neon-cyan/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-24 size-64 rounded-full bg-neon-purple/20 blur-3xl"
          />

          <div className="relative text-center">
            <Badge variant="secondary" className="mb-4">
              Let&apos;s Talk
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Build Something Next-Gen?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Tell us about your project. Our founders reply personally, usually within a few
              hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="relative mx-auto mt-10 max-w-xl">
            <FieldGroup>
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={values.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  disabled={status === "submitting"}
                />
                <FieldError errors={errors.name ? [{ message: errors.name }] : undefined} />
              </Field>

              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={values.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  disabled={status === "submitting"}
                />
                <FieldError errors={errors.email ? [{ message: errors.email }] : undefined} />
              </Field>

              <Field data-invalid={!!errors.message}>
                <FieldLabel htmlFor="message">Project Details</FieldLabel>
                <Textarea
                  id="message"
                  placeholder="What are you looking to build?"
                  rows={4}
                  value={values.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  aria-invalid={!!errors.message}
                  disabled={status === "submitting"}
                />
                <FieldDescription>
                  Include timeline, budget range, and any technical constraints.
                </FieldDescription>
                <FieldError errors={errors.message ? [{ message: errors.message }] : undefined} />
              </Field>

              <Button
                type="submit"
                size="lg"
                disabled={status === "submitting"}
                className="glow-shadow w-full rounded-full bg-linear-to-r from-neon-cyan to-neon-purple text-background hover:opacity-90"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 className="size-4" data-icon="inline-start" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="size-4" data-icon="inline-start" />
                    Send Message
                  </>
                )}
              </Button>
              {status === "error" && (
                <p role="alert" className="text-center text-sm text-destructive">
                  {submitError}
                </p>
              )}
            </FieldGroup>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
