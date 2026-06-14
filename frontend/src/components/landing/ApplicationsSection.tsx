import {
  Home, Building2, Car, HeartPulse, TreePine, Factory,
  Shield, Users,
} from 'lucide-react'
import { FadeIn } from '@/components/layout/PageTransition'
import { BentoGrid, BentoCard } from '@/components/magic-ui'

const applications = [
  { name: 'Home Security', desc: 'Quiet protection for what you love most.', icon: Home, className: 'md:col-span-1' },
  { name: 'Smart Cities', desc: 'Awareness at the scale of an entire city.', icon: Building2, className: 'md:col-span-1' },
  { name: 'Transportation', desc: 'Watch movement, not motion.', icon: Car, className: 'md:col-span-1' },
  { name: 'Industrial Safety', desc: 'Catch the moment before it becomes an incident.', icon: Factory, className: 'md:col-span-1 md:row-span-2' },
  { name: 'Wildlife Monitoring', desc: 'Observe nature without disturbing it.', icon: TreePine, className: 'md:col-span-1' },
  { name: 'Healthcare', desc: 'Attentive care without constant surveillance.', icon: HeartPulse, className: 'md:col-span-1' },
  { name: 'Critical Infrastructure', desc: 'Protect what powers everything else.', icon: Shield, className: 'md:col-span-1' },
  { name: 'Public Spaces', desc: 'Safety that respects the rhythm of life.', icon: Users, className: 'md:col-span-2' },
]

export function ApplicationsSection() {
  return (
    <section id="applications" className="section-padding bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="section-label">Applications</span>
          <h2 className="section-title">Built for Every Environment</h2>
          <p className="section-desc">
            From a single doorway to an entire city — NeuroVision AI adapts to wherever attention matters most.
          </p>
        </FadeIn>

        <FadeIn>
          <BentoGrid>
            {applications.map((app, i) => (
              <BentoCard
                key={app.name}
                name={app.name}
                description={app.desc}
                Icon={app.icon}
                className={app.className}
              />
            ))}
          </BentoGrid>
        </FadeIn>
      </div>
    </section>
  )
}
