import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Activity, Shield, Cpu, Clock, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/layout/PageTransition'
import { BorderBeam, NumberTicker } from '@/components/magic-ui'

const cameras = [
  { id: 'NORTH·01', status: 'idle', label: 'Perimeter — North' },
  { id: 'LOBBY·02', status: 'event', label: 'Main Lobby', detail: 'person · 97%' },
  { id: 'SVC·03', status: 'idle', label: 'Service Corridor' },
  { id: 'DOCK·04', status: 'idle', label: 'Loading Dock' },
]

const threats = [
  { label: 'Unauthorized motion', location: 'Lobby', confidence: 92 },
  { label: 'Loitering pattern', location: 'Dock', confidence: 48 },
  { label: 'Geofence boundary', location: 'North', confidence: 12 },
]

const events = [
  { time: '14:02:31', event: 'Person detected', location: 'Lobby' },
  { time: '13:48:09', event: 'Vehicle arrival', location: 'Dock' },
  { time: '13:31:55', event: 'Door opened', location: 'Service' },
  { time: '13:12:02', event: 'Idle baseline', location: 'All' },
]

export function DashboardPreview() {
  return (
    <section id="dashboard-preview" className="section-padding bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="section-label">Live Experience</span>
          <h2 className="section-title">The Command Center for What Matters</h2>
          <p className="section-desc">
            A single, unified view of meaningful events — beautifully designed, instantly actionable.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="relative glass-card overflow-hidden">
            <BorderBeam size={250} duration={12} />
            <div className="p-4 md:p-6 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-gradient font-semibold">neurovision.ai · operations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-xs font-mono text-green-400">LIVE</span>
              </div>
            </div>

            <div className="p-4 md:p-6 grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">Live Monitoring</h3>
                  <span className="text-xs text-muted-foreground font-mono">04 streams · 1 active event</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {cameras.map((cam) => (
                    <motion.div
                      key={cam.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 rounded-xl border ${
                        cam.status === 'event'
                          ? 'border-nv-cyan/30 bg-nv-cyan/5'
                          : 'border-white/[0.06] bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`h-2 w-2 rounded-full ${cam.status === 'event' ? 'bg-nv-cyan animate-pulse' : 'bg-muted-foreground/40'}`} />
                        <span className="text-xs font-mono text-muted-foreground">{cam.id}</span>
                      </div>
                      <div className="text-sm text-white">{cam.label}</div>
                      {cam.detail && <div className="text-xs text-nv-cyan mt-1">{cam.detail}</div>}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4 text-red-400" />
                    <span className="text-sm font-semibold">Threat Detection</span>
                    <span className="text-xs text-red-400 font-mono ml-auto">live</span>
                  </div>
                  {threats.map((t) => (
                    <div key={t.label} className="flex justify-between text-xs py-2 border-b border-white/[0.04] last:border-0">
                      <span className="text-muted-foreground">{t.label}</span>
                      <span className="text-white font-mono">{t.location} · {t.confidence}%</span>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="h-4 w-4 text-nv-cyan" />
                    <span className="text-sm font-semibold">Resource Savings</span>
                  </div>
                  <div className="text-3xl font-bold text-gradient font-mono">
                    <NumberTicker value={92} suffix="%" />
                  </div>
                  <div className="text-xs text-muted-foreground">vs. always-on baseline</div>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 border-t border-white/[0.06] grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-semibold">Recent Events</span>
                  <span className="text-xs text-muted-foreground ml-auto">last 60 min</span>
                </div>
                {events.map((e) => (
                  <div key={e.time} className="flex justify-between text-xs py-2 border-b border-white/[0.04] last:border-0">
                    <span className="font-mono text-muted-foreground">{e.time}</span>
                    <span className="text-white">{e.event}</span>
                    <span className="text-muted-foreground">{e.location}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <Activity className="h-8 w-8 text-nv-cyan mx-auto mb-3" />
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div><div className="text-lg font-mono text-white">8%</div><div className="text-xs text-muted-foreground">Awake</div></div>
                    <div><div className="text-lg font-mono text-nv-cyan">42ms</div><div className="text-xs text-muted-foreground">Latency</div></div>
                    <div><div className="text-lg font-mono text-white">12</div><div className="text-xs text-muted-foreground">Events</div></div>
                  </div>
                  <Link to="/dashboard" className="btn-primary text-xs mt-6 inline-flex">
                    Open Full Console <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
