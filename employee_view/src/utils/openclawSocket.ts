import type { SystemStatus, WorkflowSnapshot } from '@/types/openclaw'

type RealtimePacket = {
  system?: SystemStatus
  workflow?: WorkflowSnapshot
}

export const createOpenclawRealtime = (
  onUpdate: (packet: RealtimePacket) => void,
  onError: () => void
): (() => void) => {
  const wsUrl = import.meta.env.VITE_OPENCLAW_WS_URL
  if (!wsUrl) {
    const timer = window.setInterval(() => {
      onUpdate({
        system: {
          state: 'running',
          cpuUsage: Math.round(35 + Math.random() * 30),
          memoryUsage: Math.round(40 + Math.random() * 25),
          activeAgents: 2,
          queueDepth: 1,
          latencyMs: Math.round(50 + Math.random() * 60),
          updatedAt: new Date().toLocaleTimeString()
        }
      })
    }, 2500)
    return () => window.clearInterval(timer)
  }

  const ws = new WebSocket(wsUrl)

  ws.onmessage = (event) => {
    try {
      const payload = JSON.parse(event.data) as RealtimePacket
      onUpdate(payload)
    } catch {
      onError()
    }
  }
  ws.onerror = () => onError()

  return () => ws.close()
}
