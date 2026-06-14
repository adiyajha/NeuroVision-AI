const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`)
  return res.json()
}

export const api = {
  getEvents: () => fetchApi<Event[]>('/events'),
  getAlerts: () => fetchApi<Alert[]>('/alerts'),
  getStats: () => fetchApi<SystemStats>('/stats'),
  getHealth: () => fetchApi<HealthStatus>('/health'),
  getSnapshots: () => fetchApi<Snapshot[]>('/snapshots'),
  postEvent: (event: Partial<Event>) =>
    fetchApi<Event>('/event', { method: 'POST', body: JSON.stringify(event) }),
  postAlert: (alert: Partial<Alert>) =>
    fetchApi<Alert>('/alert', { method: 'POST', body: JSON.stringify(alert) }),
}

export interface Event {
  id: string
  timestamp: string
  camera_id: string
  event_type: string
  confidence: number
  location: string
  status: 'idle' | 'active' | 'threat'
  metadata?: Record<string, unknown>
}

export interface Alert {
  id: string
  timestamp: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  location: string
  confidence: number
  resolved: boolean
}

export interface SystemStats {
  events_today: number
  cpu_saved_percent: number
  threats_detected: number
  frames_skipped: number
  events_processed: number
  power_reduction_percent: number
  detection_accuracy: number
  active_cameras: number
  system_uptime_hours: number
  avg_latency_ms: number
  cpu_usage_percent: number
  memory_usage_percent: number
  timeline: TimelinePoint[]
  cpu_savings_history: ChartPoint[]
  frames_skipped_history: ChartPoint[]
  detection_stats: DetectionStat[]
}

export interface TimelinePoint {
  time: string
  events: number
  threats: number
}

export interface ChartPoint {
  time: string
  value: number
}

export interface DetectionStat {
  label: string
  count: number
  percentage: number
}

export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'critical'
  uptime_seconds: number
  pipeline_active: boolean
  websocket_connections: number
  last_event_at: string | null
}

export interface Snapshot {
  id: string
  timestamp: string
  camera_id: string
  event_type: string
  thumbnail_url: string
}

export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws/events'
