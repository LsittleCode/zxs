export type RunState = 'idle' | 'running' | 'error' | 'success' | 'offline'

export interface SystemStatus {
  state: RunState
  cpuUsage: number
  memoryUsage: number
  activeAgents: number
  queueDepth: number
  latencyMs: number
  updatedAt: string
}

export interface GatewayInfo {
  name: string
  version: string
  endpoint: string
}

export interface Session {
  id: string
  title: string
  status: RunState
  updatedAt: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: string
}

export interface WorkflowStep {
  id: string
  name: string
  status: 'pending' | 'running' | 'done' | 'error'
  progress: number
  detail: string
  startedAt?: string
  finishedAt?: string
}

export interface WorkflowSnapshot {
  overallProgress: number
  currentInstruction: string
  steps: WorkflowStep[]
}

export interface CommandResult {
  ok: boolean
  message: string
}

export interface Subagent {
  id: string
  name: string
  task: string
  status: RunState
}
