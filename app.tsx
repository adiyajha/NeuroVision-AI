 import { Nav } from './components/nav'
import { Hero } from './components/hero'
import { ProblemSection } from './components/problem-section'
import { BreakthroughSection } from './components/breakthrough-section'
import { HowItWorks } from './components/how-it-works'
import { LiveExperience } from './components/live-experience'
import { ImpactSection } from './components/impact-section'
import { ApplicationsSection } from './components/applications-section'
import { WhyItMatters } from './components/why-it-matters'
import { FutureVision } from './components/future-vision'
import { FinalCTA, Footer } from './components/cta-footer'

function App() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Nav />
      <Hero />
      <ProblemSection />
      <BreakthroughSection />
      <HowItWorks />
      <LiveExperience />
      <ImpactSection />
      <ApplicationsSection />
      <WhyItMatters />
      <FutureVision />
      <FinalCTA />
      <Footer />
    </main>
  )
}

export default App
