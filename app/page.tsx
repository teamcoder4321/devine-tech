import { ContactSection } from "@/components/contact-section"
import { AmbientBackground } from "@/components/ambient-background"
import { CursorFollower } from "@/components/cursor-follower"
import { HeroSection } from "@/components/hero-section"
import { ParticleField } from "@/components/particle-field"
import { PricingSection } from "@/components/pricing-section"
import { ProcessSection } from "@/components/process-section"
import { ServicesSection } from "@/components/services-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { StatsSection } from "@/components/stats-section"
import { TeamSection } from "@/components/team-section"
import { WorksSection } from "@/components/works-section"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <ParticleField className="pointer-events-none fixed inset-0 -z-10 h-screen w-screen" />
      <AmbientBackground />
      <CursorFollower />
      <SiteHeader />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProcessSection />
      <WorksSection />
      <TeamSection />
      <PricingSection />
      <ContactSection />
      <SiteFooter />
    </main>
  )
}
