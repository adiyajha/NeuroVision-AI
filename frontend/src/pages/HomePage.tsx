import { HeroSection } from '@/components/landing/HeroSection'
import { ProblemSection } from '@/components/landing/ProblemSection'
import { InnovationSection } from '@/components/landing/InnovationSection'
import { HowItWorksSection } from '@/components/landing/HowItWorksSection'
import { DashboardPreview } from '@/components/landing/DashboardPreview'
import { ImpactSection } from '@/components/landing/ImpactSection'
import { ApplicationsSection } from '@/components/landing/ApplicationsSection'
import { FutureVisionSection } from '@/components/landing/FutureVisionSection'
import { ComparisonSection } from '@/components/landing/ComparisonSection'
import { CTASection } from '@/components/landing/CTASection'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <InnovationSection />
      <HowItWorksSection />
      <DashboardPreview />
      <ImpactSection />
      <ApplicationsSection />
      <ComparisonSection />
      <FutureVisionSection />
      <CTASection />
    </>
  )
}
