import { Zap, Cpu, Shield, Clock } from 'lucide-react'
import { FadeIn } from '@/components/layout/PageTransition'
import { NumberTicker } from '@/components/magic-ui'

const metrics = [
  { value: 95, suffix: '%', label: 'Less Processing', icon: Cpu },
  { value: 92, suffix: '%', label: 'Lower Resource Usage', icon: Zap },
  { display: 'Real-Time', label: 'Threat Awareness', icon: Shield },
  { display: 'Instant', label: 'Event Detection', icon: Clock },
]

export function ImpactSection() {
  return (
    <section id="impact" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="section-label">Impact</span>
          <h2 className="section-title">The Numbers Behind the Quiet Revolution</h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <FadeIn key={m.label} delay={i * 0.1}>
              <div className="glass-card-hover p-8 text-center">
                <m.icon className="h-6 w-6 text-nv-cyan mx-auto mb-4" />
                <div className="text-4xl md:text-5xl font-bold text-gradient font-mono mb-2">
                  {m.display ?? <NumberTicker value={m.value!} suffix={m.suffix} />}
                </div>
                <div className="text-sm text-muted-foreground">{m.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
