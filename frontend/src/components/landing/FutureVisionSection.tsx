import { motion } from 'framer-motion'
import { FadeIn } from '@/components/layout/PageTransition'

const roadmap = [
  { phase: 'Now', title: 'Intelligent Recognition', desc: 'Detect and understand meaningful events in real time.' },
  { phase: 'Next', title: 'Advanced Threat Understanding', desc: 'Reason about intent and context before action.' },
  { phase: '2026', title: 'Environmental Awareness', desc: 'Sense the broader state of a space — beyond visual cues.' },
  { phase: '2027', title: 'Predictive Intelligence', desc: 'Anticipate events moments before they unfold.' },
  { phase: 'Horizon', title: 'Autonomous Monitoring', desc: 'Self-coordinating networks of attentive intelligence.' },
]

export function FutureVisionSection() {
  return (
    <section id="future" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="section-label">Future Vision</span>
          <h2 className="section-title">The Evolution of Attention</h2>
          <p className="section-desc">
            A roadmap toward intelligence that is not only aware — but anticipatory.
          </p>
        </FadeIn>

        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-nv-cyan/30 to-transparent hidden md:block" />
          <div className="grid md:grid-cols-5 gap-6">
            {roadmap.map((item, i) => (
              <FadeIn key={item.phase} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, borderColor: 'rgba(0, 240, 255, 0.3)' }}
                  className={`glass-card-hover p-6 h-full ${i === 0 ? 'border-nv-cyan/30' : ''}`}
                >
                  <span className="text-xs font-mono text-nv-cyan mb-3 block">{item.phase}</span>
                  <h3 className="font-semibold text-white mb-2 text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
