import { useEffect, useState, useCallback, useRef } from 'react'
import type { Event, Alert } from '@/lib/api'
import { api, WS_URL } from '@/lib/api'

interface WebSocketMessage {
  type: 'event' | 'alert' | 'stats_update'
  data: Event | Alert | Record<string, unknown>
}

const FALLBACK_EVENTS: Event[] = [
  { id: '1', timestamp: new Date().toISOString(), camera_id: 'CAM-LOBBY-02', event_type: 'Person detected', confidence: 97, location: 'Lobby', status: 'active' },
  { id: '2', timestamp: new Date().toISOString(), camera_id: 'CAM-NORTH-01', event_type: 'Motion spike', confidence: 84, location: 'North Gate', status: 'active' },
  { id: '3', timestamp: new Date().toISOString(), camera_id: 'CAM-DOCK-04', event_type: 'Vehicle arrival', confidence: 91, location: 'Dock', status: 'active' },
]

const FALLBACK_ALERTS: Alert[] = [
  { id: '1', severity: 'high', message: 'Unauthorized motion', location: 'Lobby', confidence: 92, timestamp: new Date().toISOString(), resolved: false },
  { id: '2', severity: 'medium', message: 'Loitering pattern', location: 'Dock', confidence: 48, timestamp: new Date().toISOString(), resolved: false },
  { id: '3', severity: 'low', message: 'Geofence boundary', location: 'North', confidence: 12, timestamp: new Date().toISOString(), resolved: false },
]

export function useWebSocket() {
  const [events, setEvents] = useState<Event[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [connected, setConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectRef = useRef<ReturnType<typeof setTimeout>>()

  const loadFallback = useCallback(async () => {
    try {
      const [ev, al] = await Promise.all([api.getEvents(), api.getAlerts()])
      if (ev.length) setEvents(ev)
      else setEvents(FALLBACK_EVENTS)
      if (al.length) setAlerts(al)
      else setAlerts(FALLBACK_ALERTS)
    } catch {
      setEvents(FALLBACK_EVENTS)
      setAlerts(FALLBACK_ALERTS)
    }
  }, [])

  const connect = useCallback(() => {
    try {
      const ws = new WebSocket(WS_URL)
      wsRef.current = ws

      ws.onopen = () => setConnected(true)
      ws.onclose = () => {
        setConnected(false)
        reconnectRef.current = setTimeout(connect, 3000)
      }
      ws.onerror = () => ws.close()
      ws.onmessage = (msg) => {
        const parsed: WebSocketMessage = JSON.parse(msg.data)
        if (parsed.type === 'event') {
          setEvents((prev) => [parsed.data as Event, ...prev].slice(0, 50))
        } else if (parsed.type === 'alert') {
          setAlerts((prev) => [parsed.data as Alert, ...prev].slice(0, 20))
        }
      }
    } catch {
      reconnectRef.current = setTimeout(connect, 3000)
    }
  }, [])

  useEffect(() => {
    loadFallback()
    connect()
    return () => {
      clearTimeout(reconnectRef.current)
      wsRef.current?.close()
    }
  }, [connect, loadFallback])

  return { events, alerts, connected }
}
