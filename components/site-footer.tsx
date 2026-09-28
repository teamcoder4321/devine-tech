import { Code2, Link2, X as XIcon } from "lucide-react"
import Link from "next/link"
import { LogoMark } from "@/components/logo-mark"
import { navLinks, team } from "@/lib/site-data"

const socialIcon = { LinkedIn: Link2, GitHub: Code2, X: XIcon }

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <a href="#home" className="flex items-center gap-2.5">
              <LogoMark className="size-8" />
              <span className="text-lg font-bold tracking-tight">Devine Tech</span>
            </a>
            <p className="mt-3 text-sm text-muted-foreground">
              AI-first digital engineering agency building next-gen web, apps, AI & cloud
              infrastructure for global businesses.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 sm:gap-14">
            <div>
              <p className="text-sm font-semibold">Navigate</p>
              <ul className="mt-3 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold">Team Credits</p>
              <ul className="mt-3 flex flex-col gap-2">
                {team.map((member) => (
                  <li key={member.name}>
                    <Link
                      href={`/team/${member.slug}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-neon-cyan"
                    >
                      {member.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-border pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Devine Tech &copy; 2026. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with <span className="font-medium text-gradient-brand">Saurabh Gupta</span>
          </p>
          <div className="flex items-center gap-3">
            {[
              { label: "LinkedIn" as const, href: "https://linkedin.com" },
              { label: "X" as const, href: "https://x.com" },
              { label: "GitHub" as const, href: "https://github.com" },
            ].map((s) => {
              const Icon = socialIcon[s.label]
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={`Devine Tech on ${s.label}`}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
                >
                  <Icon className="size-4" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
