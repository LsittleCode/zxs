import axios from 'axios'
import type {
  CommandResult,
  GatewayInfo,
  Message,
  Session,
  Subagent,
  SystemStatus,
  WorkflowSnapshot
} from '@/types/openclaw'

const client = axios.create({
  baseURL: import.meta.env.VITE_OPENCLAW_BASE_URL || 'http://localhost:8000/api',
  timeout: 15000
})

export const openclawApi = {
  getSystemStatus: async (): Promise<SystemStatus> => (await client.get('/system/status')).data,
  getGatewayInfo: async (): Promise<GatewayInfo> => (await client.get('/gateway/info')).data,
  listSessions: async (): Promise<Session[]> => (await client.get('/sessions')).data,
  getSessionHistory: async (sessionId: string): Promise<Message[]> =>
    (await client.get(`/sessions/${sessionId}/history`)).data,
  getWorkflow: async (): Promise<WorkflowSnapshot> => (await client.get('/workflow')).data,
  executeCommand: async (command: string): Promise<CommandResult> =>
    (await client.post('/commands/execute', { command })).data,
  spawnSubagent: async (task: string): Promise<Subagent> =>
    (await client.post('/subagents', { task })).data,
  readFile: async (path: string): Promise<string> => (await client.get('/files/read', { params: { path } })).data,
  writeFile: async (path: string, content: string): Promise<void> => {
    await client.post('/files/write', { path, content })
  }
}

export type OpenclawApi = typeof openclawApi
