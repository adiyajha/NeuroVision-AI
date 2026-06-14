import { useEffect, useState, useCallback } from 'react'
import { api, type SystemStats } from '@/lib/api'

function buildMockTimeline(): SystemStats['timeline'] {
  return Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i).padStart(2, '0')}:00`,
    events: Math.floor(5 + Math.sin(i * 0.5) * 8 + i * 0.3),
    threats: Math.floor(Math.max(0, Math.sin(i * 0.8) * 2)),
  }))
}

function buildMockChart(base: number, variance: number): { time: string; value: number }[] {
  return Array.from({ length: 12 }, (_, i) => ({
    time: `${i * 2}h`,
    value: Math.round((base + Math.sin(i * 0.7) * variance) * 10) / 10,
  }))
}

const MOCK_STATS: SystemStats = {
  events_today: 147,
  cpu_saved_percent: 92.4,
  threats_detected: 8,
  frames_skipped: 2847392,
  events_processed: 147,
  power_reduction_percent: 87.6,
  detection_accuracy: 96.8,
  active_cameras: 4,
  system_uptime_hours: 72.5,
  avg_latency_ms: 42,
  cpu_usage_percent: 8.2,
  memory_usage_percent: 34.1,
  timeline: buildMockTimeline(),
  cpu_savings_history: buildMockChart(91, 4),
  frames_skipped_history: buildMockChart(225000, 25000),
  detection_stats: [
    { label: 'Person', count: 68, percentage: 46.3 },
    { label: 'Vehicle', count: 34, percentage: 23.1 },
    { label: 'Package', count: 22, percentage: 15.0 },
    { label: 'Animal', count: 15, percentage: 10.2 },
    { label: 'Other', count: 8, percentage: 5.4 },
  ],
  resource_utilization_history: Array.from({ length: 12 }, (_, i) => ({
    time: `${i * 2}h`,
    cpu: Math.round((8 + Math.sin(i * 0.6) * 4) * 10) / 10,
    memory: Math.round((32 + Math.cos(i * 0.5) * 6) * 10) / 10,
  })),
}

export function useStats(refreshInterval = 30000) {
  const [stats, setStats] = useState<SystemStats>(MOCK_STATS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingMock, setUsingMock] = useState(true)

  const fetchStats = useCallback(async () => {
    try {
      const data = await api.getStats()
      setStats(data)
      setUsingMock(false)
      setError(null)
    } catch {
      setStats(MOCK_STATS)
      setUsingMock(true)
      setError('Backend offline — showing demo metrics')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchStats, refreshInterval])

  return { stats, loading, error, usingMock, refetch: fetchStats }
}
