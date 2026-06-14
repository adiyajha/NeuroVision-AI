import { Check, Minus, Brain, Eye } from 'lucide-react'
import { FadeIn } from '@/components/layout/PageTransition'
import { NumberTicker } from '@/components/magic-ui'

const ignores = ['Background movement', 'Repetitive patterns', 'Irrelevant activity']
const reacts = ['Meaningful change', 'Unexpected motion', 'Potential threats']

export function InnovationSection() {
  return (
    <section id="innovation" className="section-padding bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="section-label">The Breakthrough</span>
          <h2 className="section-title">Inspired by Human Attention</h2>
          <p className="section-desc">
            Your brain ignores the predictable — and snaps to attention the instant something matters.
            NeuroVision AI works the same way.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="glass-card p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-nv-glow opacity-50" />
              <div className="relative text-center">
                <div className="relative inline-block mb-6">
                  <Brain className="h-32 w-32 text-nv-purple mx-auto opacity-80" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-mono font-bold text-white">
                      <NumberTicker value={99.1} suffix="%" decimalPlaces={1} />
                    </span>
                  </div>
                </div>
                <div className="text-sm font-mono text-nv-cyan mb-2">Attention · Active</div>
                <div className="text-lg font-semibold text-white">Focus · 99.1%</div>
              </div>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Minus className="h-4 w-4 text-muted-foreground" />
                  <h3 className="font-semibold text-muted-foreground">Ignores</h3>
                </div>
                <ul className="space-y-3">
                  {ignores.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="glass-card p-6 border-nv-cyan/20">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="h-4 w-4 text-nv-cyan" />
                  <h3 className="font-semibold text-nv-cyan">Instantly reacts to</h3>
                </div>
                <ul className="space-y-3">
                  {reacts.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-white">
                      <Check className="h-4 w-4 text-nv-cyan shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-muted-foreground leading-relaxed">
                NeuroVision AI follows the same principle — staying silent through the predictable,
                awakening with full intelligence when something meaningful happens.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
