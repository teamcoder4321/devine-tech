import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, ExternalLink } from "lucide-react"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ParticleField } from "@/components/particle-field"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { team } from "@/lib/site-data"
import { readTeamUpdates } from "@/lib/team-updates"

type TeamProfilePageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }))
}

export async function generateMetadata({ params }: TeamProfilePageProps): Promise<Metadata> {
  const { slug } = await params
  const member = team.find((item) => item.slug === slug)

  return member
    ? {
        title: `${member.name} — Devine Tech`,
        description: member.bio,
      }
    : {}
}

export default async function TeamProfilePage({ params }: TeamProfilePageProps) {
  const { slug } = await params
  const baseMember = team.find((item) => item.slug === slug)

  if (!baseMember) notFound()
  const updates = await readTeamUpdates()
  const member = { ...baseMember, ...updates[baseMember.slug] }

  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <ParticleField className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen" />
      <SiteHeader />
      <section className="relative py-28 sm:py-36">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Link
            href="/#team"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
          >
            <ArrowLeft className="size-4" />
            Back to team
          </Link>

          <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr] lg:items-start">
            <div className="mx-auto lg:mx-0">
              <div className="relative size-56 rounded-full bg-linear-to-br from-neon-cyan to-neon-purple p-1 shadow-2xl">
                <Image
                  src={member.image}
                  alt={`${member.name} profile`}
                  fill
                  priority
                  sizes="224px"
                  className="relative z-10 rounded-full object-cover"
                />
              </div>
            </div>

            <div>
              <Badge variant="secondary">{member.role}</Badge>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">{member.name}</h1>
              <p className="mt-2 text-lg text-muted-foreground [font-family:var(--font-devanagari)]" lang="hi">
                {member.nameNative}
              </p>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{member.about}</p>

              <div className="mt-7 flex flex-wrap gap-3">
                {member.social.map((social) => (
                  <Button
                    key={social.label}
                    render={
                      <a href={social.href} target="_blank" rel="noreferrer">
                        {social.label}
                        <ExternalLink className="ml-1 size-3.5" />
                      </a>
                    }
                    nativeButton={false}
                    variant="outline"
                    size="sm"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold">Work experience</h2>
              <ul className="mt-5 space-y-4">
                {member.experience.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-neon-cyan" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold">Core expertise</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {member.expertise.map((skill) => (
                  <Badge key={skill} variant="outline" className="px-3 py-1 text-sm font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
            </article>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold">Services led</h2>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {member.services.map((service) => <li key={service}>• {service}</li>)}
              </ul>
            </article>
            <article className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold">Delivered projects</h2>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {member.deliveredProjects.map((project) => <li key={project}>• {project}</li>)}
              </ul>
            </article>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  )
}
