import { X, Check } from 'lucide-react'
import { FadeIn } from '@/components/layout/PageTransition'

const comparisons = [
  { param: 'Processing Model', traditional: 'Continuous Frame Polling', neurovision: 'Event-Driven Spike Activations' },
  { param: 'CPU / GPU Utilization', traditional: 'High continuous load (~80-95%)', neurovision: 'Low idle (~2%), spikes on event' },
  { param: 'Power Consumption', traditional: 'Always on high metabolic drain', neurovision: 'Minimal power profile (92% savings)' },
  { param: 'AI Model Application', traditional: 'Continuous evaluation (30 FPS)', neurovision: 'Selective YOLO wakes on motion delta' },
  { param: 'Scale Deployment Cost', traditional: 'Requires high server clusters', neurovision: 'Scales on edge hardware' },
]

export function ComparisonSection() {
  return (
    <section className="section-padding bg-white/[0.01]">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="text-center mb-12">
          <span className="section-label">Why it matters</span>
          <h2 className="section-title">A new approach to intelligence</h2>
        </FadeIn>

        <FadeIn>
          <div className="glass-card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left p-4 text-muted-foreground font-mono text-xs uppercase">Parameter</th>
                  <th className="text-left p-4 text-red-400/80 font-mono text-xs uppercase">
                    <X className="h-3 w-3 inline mr-1" />Before
                  </th>
                  <th className="text-left p-4 text-nv-cyan font-mono text-xs uppercase">
                    <Check className="h-3 w-3 inline mr-1" />NeuroVision AI
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row) => (
                  <tr key={row.param} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-white font-medium">{row.param}</td>
                    <td className="p-4 text-muted-foreground">{row.traditional}</td>
                    <td className="p-4 text-white">{row.neurovision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
