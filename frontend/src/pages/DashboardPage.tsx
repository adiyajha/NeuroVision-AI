import {
  Card,
  Title,
  Text,
  Metric,
  Flex,
  ProgressBar,
  Badge,
  AreaChart,
  BarChart,
  DonutChart,
  List,
  ListItem,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@tremor/react'
import {
  Activity, AlertTriangle, Cpu, Eye, Radio, Shield,
  Zap, Clock, Server, Wifi, WifiOff, RefreshCw, History,
} from 'lucide-react'
import { BorderBeam, Marquee } from '@/components/magic-ui'
import { useStats } from '@/hooks/useStats'
import { useWebSocket } from '@/hooks/useWebSocket'
import { formatNumber } from '@/lib/utils'
import { FadeIn } from '@/components/layout/PageTransition'

const tremorValueFormatter = (n: number) => formatNumber(n)

function KPICard({
  title,
  metric,
  icon: Icon,
  delta,
  deltaType,
  beamDelay = 0,
}: {
  title: string
  metric: string
  icon: React.ElementType
  delta?: string
  deltaType?: 'increase' | 'moderateIncrease' | 'unchanged'
  beamDelay?: number
}) {
  return (
    <div className="relative glass-card overflow-hidden">
      <BorderBeam size={180} duration={10} delay={beamDelay} />
      <Card className="!bg-transparent !border-0 !shadow-none !ring-0">
        <Flex alignItems="start" justifyContent="between">
          <div>
            <Text className="!text-muted-foreground">{title}</Text>
            <Metric className="!text-white !text-2xl mt-1">{metric}</Metric>
            {delta && (
              <Badge color={deltaType === 'increase' ? 'emerald' : 'gray'} className="mt-2">
                {delta}
              </Badge>
            )}
          </div>
          <div className="p-2 rounded-lg bg-nv-cyan/10">
            <Icon className="h-5 w-5 text-nv-cyan" />
          </div>
        </Flex>
      </Card>
    </div>
  )
}

function LiveEventMarquee({ events }: { events: { time: string; msg: string; loc: string }[] }) {
  if (events.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <Radio className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">Waiting for events from the pipeline...</p>
      </div>
    )
  }

  return (
    <div className="glass-card p-4 overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <Radio className="h-4 w-4 text-nv-cyan animate-pulse" />
        <span className="text-sm font-semibold text-white">Live Event Stream</span>
      </div>
      <Marquee pauseOnHover duration="30s">
        {events.map((e, i) => (
          <div
            key={`${e.time}-${i}`}
            className="flex items-center gap-3 px-4 py-2 rounded-lg border border-white/[0.06] bg-white/[0.02] mx-2 whitespace-nowrap"
          >
            <span className="text-xs font-mono text-nv-cyan">{e.time}</span>
            <span className="text-sm text-white">{e.msg}</span>
            <span className="text-xs text-muted-foreground">{e.loc}</span>
          </div>
        ))}
      </Marquee>
    </div>
  )
}

function RecentActivity({ events }: { events: { time: string; msg: string; loc: string; confidence?: number }[] }) {
  return (
    <div className="relative glass-card overflow-hidden h-full">
      <BorderBeam size={160} duration={11} delay={4} />
      <Card className="!bg-transparent !border-0 !shadow-none !ring-0 h-full">
        <div className="flex items-center gap-2 mb-4">
          <History className="h-4 w-4 text-nv-purple" />
          <Title className="!text-white">Recent Activity</Title>
        </div>
        {events.length === 0 ? (
          <Text className="!text-muted-foreground">No recent activity recorded.</Text>
        ) : (
          <List>
            {events.slice(0, 8).map((e, i) => (
              <ListItem key={`${e.time}-${i}`}>
                <div className="flex items-center justify-between w-full gap-4">
                  <div className="min-w-0">
                    <Text className="!text-white !font-medium truncate">{e.msg}</Text>
                    <Text className="!text-muted-foreground !text-xs">{e.loc}</Text>
                  </div>
                  <div className="text-right shrink-0">
                    <Text className="!text-nv-cyan !text-xs !font-mono">{e.time}</Text>
                    {e.confidence != null && (
                      <Text className="!text-muted-foreground !text-xs">{e.confidence}%</Text>
                    )}
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
        )}
      </Card>
    </div>
  )
}

export function DashboardPage() {
  const { stats, loading, error, usingMock, refetch } = useStats()
  const { events: wsEvents, alerts, connected } = useWebSocket()

  const liveEvents = wsEvents.length > 0
    ? wsEvents.map((e) => ({
        time: new Date(e.timestamp).toLocaleTimeString(),
        msg: e.event_type,
        loc: e.location,
        confidence: e.confidence,
      }))
    : [
        { time: '14:02:31', msg: 'Person detected', loc: 'Lobby', confidence: 97 },
        { time: '13:58:12', msg: 'Motion spike', loc: 'North Gate', confidence: 84 },
        { time: '13:45:07', msg: 'Vehicle arrival', loc: 'Dock', confidence: 91 },
        { time: '13:31:55', msg: 'Door opened', loc: 'Service', confidence: 76 },
        { time: '13:12:02', msg: 'Idle baseline', loc: 'All zones', confidence: 100 },
      ]

  const threats = alerts.length > 0 ? alerts : [
    { id: '1', severity: 'high' as const, message: 'Unauthorized motion', location: 'Lobby', confidence: 92, timestamp: new Date().toISOString(), resolved: false },
    { id: '2', severity: 'medium' as const, message: 'Loitering pattern', location: 'Dock', confidence: 48, timestamp: new Date().toISOString(), resolved: false },
    { id: '3', severity: 'low' as const, message: 'Geofence boundary', location: 'North', confidence: 12, timestamp: new Date().toISOString(), resolved: false },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <Activity className="h-8 w-8 text-nv-cyan animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Initializing command center...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-nv-cyan" />
                <span className="text-sm font-mono text-gradient font-semibold">NEUROVISION CONSOLE</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Operations Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Real-time event-driven surveillance analytics</p>
              {error && (
                <p className="text-xs text-amber-400/80 mt-2">{error}</p>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => refetch()}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-muted-foreground hover:text-white hover:border-nv-cyan/30 transition-colors"
              >
                <RefreshCw className="h-3 w-3" /> Refresh
              </button>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                {connected ? (
                  <><Wifi className="h-3 w-3 text-green-400" /><span className="text-xs font-mono text-green-400">WS LIVE</span></>
                ) : (
                  <><WifiOff className="h-3 w-3 text-yellow-400" /><span className="text-xs font-mono text-yellow-400">{usingMock ? 'DEMO MODE' : 'RECONNECTING'}</span></>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-xs font-mono text-green-400">PIPELINE ACTIVE</span>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KPICard title="Events Today" metric={String(stats.events_today)} icon={Radio} delta="+12% vs yesterday" deltaType="increase" beamDelay={0} />
          <KPICard title="CPU Saved" metric={`${stats.cpu_saved_percent}%`} icon={Cpu} delta="vs always-on" deltaType="increase" beamDelay={1} />
          <KPICard title="Threats Detected" metric={String(stats.threats_detected)} icon={Shield} delta={`${threats.filter(t => !t.resolved).length} active`} deltaType="moderateIncrease" beamDelay={2} />
          <KPICard title="Frames Skipped" metric={formatNumber(stats.frames_skipped)} icon={Zap} delta="92% idle" deltaType="increase" beamDelay={3} />
        </div>

        <FadeIn delay={0.1}>
          <LiveEventMarquee events={liveEvents} />
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <FadeIn delay={0.15} className="lg:col-span-2">
            <div className="relative glass-card overflow-hidden">
              <BorderBeam size={200} duration={14} />
              <Card className="!bg-transparent !border-0 !shadow-none !ring-0">
                <Title className="!text-white">Event Detection Timeline</Title>
                <Text className="!text-muted-foreground">Events and threats over 24 hours</Text>
                <AreaChart
                  className="mt-4 h-72 [&_.recharts-cartesian-axis-tick-value]:!fill-[#a1a1aa] [&_.recharts-legend-item-text]:!text-[#a1a1aa]"
                  data={stats.timeline}
                  index="time"
                  categories={['events', 'threats']}
                  colors={['cyan', 'rose']}
                  valueFormatter={tremorValueFormatter}
                  showAnimation
                  curveType="monotone"
                />
              </Card>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative glass-card overflow-hidden h-full">
              <BorderBeam size={150} duration={12} delay={2} />
              <Card className="!bg-transparent !border-0 !shadow-none !ring-0 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <Title className="!text-white">Threat Monitoring</Title>
                </div>
                <List>
                  {threats.map((t) => (
                    <ListItem key={t.id ?? t.message}>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <Text className="!text-white !font-medium">{t.message}</Text>
                          <Text className="!text-muted-foreground !text-xs">{t.location}</Text>
                        </div>
                        <Badge
                          color={
                            t.severity === 'critical' || t.severity === 'high' ? 'rose' :
                            t.severity === 'medium' ? 'amber' : 'gray'
                          }
                        >
                          {t.confidence}%
                        </Badge>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </Card>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.25} className="mt-6">
          <RecentActivity events={liveEvents} />
        </FadeIn>

        <TabGroup className="mt-6">
          <TabList variant="solid" className="!bg-white/5 !border !border-white/10 !rounded-xl !p-1">
            <Tab className="!text-muted-foreground data-[headlessui-state=selected]:!text-white data-[headlessui-state=selected]:!bg-white/10 !rounded-lg">Resource Usage</Tab>
            <Tab className="!text-muted-foreground data-[headlessui-state=selected]:!text-white data-[headlessui-state=selected]:!bg-white/10 !rounded-lg">Detection Stats</Tab>
            <Tab className="!text-muted-foreground data-[headlessui-state=selected]:!text-white data-[headlessui-state=selected]:!bg-white/10 !rounded-lg">System Health</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="relative glass-card overflow-hidden">
                  <BorderBeam size={180} duration={11} />
                  <Card className="!bg-transparent !border-0 !shadow-none !ring-0">
                    <Title className="!text-white">CPU Savings</Title>
                    <Text className="!text-muted-foreground">Percentage saved vs always-on baseline</Text>
                    <AreaChart
                      className="mt-4 h-60 [&_.recharts-cartesian-axis-tick-value]:!fill-[#a1a1aa]"
                      data={stats.cpu_savings_history}
                      index="time"
                      categories={['value']}
                      colors={['cyan']}
                      valueFormatter={(n) => `${n.toFixed(1)}%`}
                      showAnimation
                    />
                  </Card>
                </div>
                <div className="relative glass-card overflow-hidden">
                  <BorderBeam size={180} duration={13} delay={1} />
                  <Card className="!bg-transparent !border-0 !shadow-none !ring-0">
                    <Title className="!text-white">Frames Skipped</Title>
                    <Text className="!text-muted-foreground">Idle frames bypassed per interval</Text>
                    <BarChart
                      className="mt-4 h-60 [&_.recharts-cartesian-axis-tick-value]:!fill-[#a1a1aa]"
                      data={stats.frames_skipped_history}
                      index="time"
                      categories={['value']}
                      colors={['violet']}
                      valueFormatter={tremorValueFormatter}
                      showAnimation
                    />
                  </Card>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="relative glass-card overflow-hidden">
                  <BorderBeam size={160} duration={10} />
                  <Card className="!bg-transparent !border-0 !shadow-none !ring-0">
                    <Title className="!text-white">Detection Distribution</Title>
                    <DonutChart
                      className="mt-4 h-60"
                      data={stats.detection_stats}
                      category="count"
                      index="label"
                      colors={['cyan', 'violet', 'indigo', 'fuchsia', 'slate']}
                      valueFormatter={tremorValueFormatter}
                      showAnimation
                    />
                  </Card>
                </div>
                <div className="relative glass-card overflow-hidden">
                  <BorderBeam size={160} duration={12} delay={3} />
                  <Card className="!bg-transparent !border-0 !shadow-none !ring-0">
                    <Title className="!text-white">Detection Statistics</Title>
                    <List className="mt-4">
                      {stats.detection_stats.map((d) => (
                        <ListItem key={d.label}>
                          <div className="w-full">
                            <Flex>
                              <Text className="!text-white">{d.label}</Text>
                              <Text className="!text-nv-cyan !font-mono">{d.count}</Text>
                            </Flex>
                            <ProgressBar value={d.percentage} color="cyan" className="mt-2" />
                          </div>
                        </ListItem>
                      ))}
                    </List>
                  </Card>
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {[
                  { label: 'Detection Accuracy', value: `${stats.detection_accuracy}%`, icon: Eye },
                  { label: 'Power Reduction', value: `${stats.power_reduction_percent}%`, icon: Zap },
                  { label: 'Avg Latency', value: `${stats.avg_latency_ms}ms`, icon: Clock },
                  { label: 'Uptime', value: `${stats.system_uptime_hours}h`, icon: Server },
                ].map((item) => (
                  <div key={item.label} className="glass-card p-6">
                    <item.icon className="h-5 w-5 text-nv-cyan mb-3" />
                    <div className="text-2xl font-bold text-white font-mono">{item.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                  </div>
                ))}
                <div className="glass-card p-6 sm:col-span-2 lg:col-span-4">
                  <Title className="!text-white !text-sm mb-4">Resource Utilization</Title>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Flex><Text className="!text-muted-foreground">CPU Usage</Text><Text className="!text-white !font-mono">{stats.cpu_usage_percent}%</Text></Flex>
                      <ProgressBar value={stats.cpu_usage_percent} color="cyan" className="mt-2" />
                    </div>
                    <div>
                      <Flex><Text className="!text-muted-foreground">Memory Usage</Text><Text className="!text-white !font-mono">{stats.memory_usage_percent}%</Text></Flex>
                      <ProgressBar value={stats.memory_usage_percent} color="violet" className="mt-2" />
                    </div>
                    <div>
                      <Flex><Text className="!text-muted-foreground">Events Processed</Text><Text className="!text-white !font-mono">{formatNumber(stats.events_processed)}</Text></Flex>
                    </div>
                    <div>
                      <Flex><Text className="!text-muted-foreground">Active Cameras</Text><Text className="!text-white !font-mono">{stats.active_cameras}</Text></Flex>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  )
}
