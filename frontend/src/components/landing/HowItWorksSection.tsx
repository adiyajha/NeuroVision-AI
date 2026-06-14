import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Eye, Radio, Brain, Bell, Video, Zap, Database, LayoutDashboard } from 'lucide-react'
import { FadeIn } from '@/components/layout/PageTransition'
import { AnimatedBeam } from '@/components/magic-ui/animated-beam'
import { cn } from '@/lib/utils'

const steps = [
  { num: '01', title: 'Observe', desc: 'Continuous awareness of the environment — passive, efficient, always present.', icon: Eye },
  { num: '02', title: 'Detect', desc: 'Recognize meaningful activity the moment it emerges from the baseline.', icon: Radio },
  { num: '03', title: 'Understand', desc: 'Awaken full intelligence to analyze the event with deep context.', icon: Brain },
  { num: '04', title: 'Respond', desc: 'Deliver insights and alerts instantly — to the right person, at the right time.', icon: Bell },
]

const archNodes = [
  { id: 'camera', label: 'Camera Feed', icon: Video, ref: 'camera' },
  { id: 'detector', label: 'Event Detector', icon: Radio, ref: 'detector' },
  { id: 'processor', label: 'Async Processor', icon: Zap, ref: 'processor' },
  { id: 'ai', label: 'YOLOv8 Nano', icon: Brain, ref: 'ai' },
  { id: 'db', label: 'SQLite DB', icon: Database, ref: 'db' },
  { id: 'dash', label: 'Dashboard', icon: LayoutDashboard, ref: 'dash' },
]

export function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const refs = {
    camera: useRef<HTMLDivElement>(null),
    detector: useRef<HTMLDivElement>(null),
    processor: useRef<HTMLDivElement>(null),
    ai: useRef<HTMLDivElement>(null),
    db: useRef<HTMLDivElement>(null),
    dash: useRef<HTMLDivElement>(null),
  }

  const beamPairs: [keyof typeof refs, keyof typeof refs][] = [
    ['camera', 'detector'],
    ['detector', 'processor'],
    ['processor', 'ai'],
    ['ai', 'db'],
    ['db', 'dash'],
  ]

  return (
    <section id="how-it-works" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="section-label">How it works</span>
          <h2 className="section-title">A New Sensing Loop</h2>
          <p className="section-desc">
            Four stages. One continuous cycle. Built to mirror how living intelligence engages with the world.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 0.1}>
              <motion.div whileHover={{ y: -6 }} className="glass-card-hover p-6 h-full">
                <div className="text-xs font-mono text-nv-cyan mb-4">{step.num}</div>
                <step.icon className="h-8 w-8 text-nv-cyan mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div
            ref={containerRef}
            className="relative glass-card p-8 md:p-12 min-h-[400px] flex flex-wrap justify-center items-center gap-8 md:gap-12"
          >
            {archNodes.map((node) => (
              <div
                key={node.id}
                ref={refs[node.ref as keyof typeof refs]}
                className={cn(
                  'relative z-10 flex flex-col items-center gap-2 p-4 rounded-xl',
                  'border border-white/10 bg-nv-surface/80 backdrop-blur-sm',
                  'hover:border-nv-cyan/30 transition-colors'
                )}
              >
                <node.icon className="h-6 w-6 text-nv-cyan" />
                <span className="text-xs font-mono text-white whitespace-nowrap">{node.label}</span>
              </div>
            ))}
            {beamPairs.map(([from, to], i) => (
              <AnimatedBeam
                key={`${from}-${to}`}
                containerRef={containerRef}
                fromRef={refs[from]}
                toRef={refs[to]}
                delay={i * 0.5}
                duration={4}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
