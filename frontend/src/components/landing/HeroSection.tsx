import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Zap, Brain, Activity } from 'lucide-react'
import { Spotlight, NumberTicker, NeuralNetwork } from '@/components/magic-ui'
import { FadeIn } from '@/components/layout/PageTransition'

const stats = [
  { value: 95, suffix: '%', label: 'Less Processing', icon: Zap },
  { value: 92, suffix: '%', label: 'Resource Savings', icon: Activity },
  { value: 0, suffix: '', label: 'Real-Time', display: 'Real-Time', icon: Brain },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <Spotlight className="fill-nv-cyan" />
      <div className="absolute inset-0 z-[1] opacity-40">
        <NeuralNetwork />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-nv-cyan/70 tracking-widest">CH·01 ▸ ACTIVE</span>
                <span className="h-px w-8 bg-nv-cyan/30" />
                <span className="text-xs font-mono text-muted-foreground">STATE ▸ FOCUSED</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 rounded-full border border-nv-cyan/20 bg-nv-cyan/5 px-4 py-1.5 text-xs text-nv-cyan mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nv-cyan opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-nv-cyan" />
                </span>
                Now in private preview
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
                <span className="text-gradient">NeuroVision</span>
                <br />
                <span className="text-white">AI</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-xl md:text-2xl text-white/80 font-medium mb-4">
                Intelligence That Activates Only When It Matters
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mb-10">
                Traditional surveillance watches everything. NeuroVision AI understands what matters —
                inspired by the human brain, activating intelligence only when meaningful events occur.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard" className="btn-primary">
                  <Play className="h-4 w-4" />
                  Watch Demo
                </Link>
                <a href="#innovation" className="btn-secondary">
                  Explore Innovation
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.3} direction="left">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className={`glass-card-hover p-6 ${i === 2 ? 'col-span-2' : ''}`}
                >
                  <stat.icon className="h-5 w-5 text-nv-cyan mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-gradient font-mono mb-1">
                    {stat.display ?? (
                      <>
                        <NumberTicker value={stat.value} suffix={stat.suffix} />
                      </>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="glass-card-hover p-6 col-span-2 flex items-center gap-4"
              >
                <Brain className="h-8 w-8 text-nv-purple shrink-0" />
                <div>
                  <div className="text-lg font-semibold text-white">Brain-Inspired Architecture</div>
                  <div className="text-sm text-muted-foreground">Event-driven neuromorphic processing</div>
                </div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
