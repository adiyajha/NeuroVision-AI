import { motion } from 'framer-motion'
import { XCircle, Cpu, Zap, Radio, TrendingDown } from 'lucide-react'
import { FadeIn } from '@/components/layout/PageTransition'

const problems = [
  {
    icon: Cpu,
    title: 'Wasted Computation',
    desc: 'Endless cycles spent analyzing empty frames where nothing happens.',
  },
  {
    icon: Zap,
    title: 'Wasted Energy',
    desc: 'Always-on intelligence consumes power 24/7 — most of it for nothing.',
  },
  {
    icon: Radio,
    title: 'Noise Over Signal',
    desc: 'Critical events drown in oceans of irrelevant data.',
  },
  {
    icon: TrendingDown,
    title: 'Scale Breaks Down',
    desc: 'Every new camera multiplies cost. Growth becomes a liability.',
  },
]

export function ProblemSection() {
  const timestamps = Array.from({ length: 6 }, (_, i) => {
    const s = 14 + i
    return `02:${String(s).padStart(2, '0')}:0${i}`
  })

  return (
    <section id="problem" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="section-label">The Problem</span>
          <h2 className="section-title">The Hidden Cost of Continuous Surveillance</h2>
          <p className="section-desc">
            Most systems analyze every moment — even when nothing is happening.
            The result: enormous waste hiding in plain sight.
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="glass-card p-8">
              <div className="text-xs font-mono text-muted-foreground mb-4">// Today</div>
              <div className="space-y-2 mb-8">
                {timestamps.map((ts, i) => (
                  <motion.div
                    key={ts}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 font-mono text-sm"
                  >
                    <span className="text-nv-cyan/60">{ts}</span>
                    <span className="text-muted-foreground">analyzed</span>
                    <XCircle className="h-3 w-3 text-red-400/60 ml-auto" />
                  </motion.div>
                ))}
              </div>
              <div className="text-center p-6 rounded-xl bg-red-500/5 border border-red-500/10">
                <div className="text-5xl font-bold text-gradient font-mono mb-2">99.7%</div>
                <div className="text-sm text-muted-foreground">of frames contain no meaningful event</div>
              </div>
            </div>
          </FadeIn>

          <div className="grid gap-4">
            {problems.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ x: 8 }}
                  className="glass-card-hover p-6 flex gap-4 items-start"
                >
                  <div className="p-3 rounded-xl bg-red-500/10 shrink-0">
                    <p.icon className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
