import { defineStore } from 'pinia'
import { openclawApi } from '@/api/openclaw'
import { createOpenclawRealtime } from '@/utils/openclawSocket'
import type { Session, SystemStatus, WorkflowSnapshot } from '@/types/openclaw'

const mockSystem = (): SystemStatus => ({
  state: 'running',
  cpuUsage: 43,
  memoryUsage: 57,
  activeAgents: 2,
  queueDepth: 1,
  latencyMs: 86,
  updatedAt: new Date().toLocaleTimeString()
})

const mockWorkflow = (): WorkflowSnapshot => ({
  overallProgress: 52,
  currentInstruction: '正在拆解需求并调用工具链',
  steps: [
    { id: '1', name: '解析输入', status: 'done', progress: 100, detail: '意图识别完成' },
    { id: '2', name: '规划任务', status: 'running', progress: 58, detail: '生成执行计划' },
    { id: '3', name: '执行工具', status: 'pending', progress: 0, detail: '等待规划完成' },
    { id: '4', name: '输出结果', status: 'pending', progress: 0, detail: '等待执行完成' }
  ]
})

export const useOpenclawStore = defineStore('openclaw', {
  state: () => ({
    loading: false,
    warning: '',
    system: mockSystem() as SystemStatus,
    sessions: [] as Session[],
    workflow: mockWorkflow() as WorkflowSnapshot,
    disconnectRealtime: undefined as undefined | (() => void)
  }),
  actions: {
    async bootstrap() {
      await this.refreshAll()
      this.connectRealtime()
    },
    async refreshAll() {
      this.loading = true
      this.warning = ''
      try {
        const [system, sessions, workflow] = await Promise.all([
          openclawApi.getSystemStatus(),
          openclawApi.listSessions(),
          openclawApi.getWorkflow()
        ])
        this.system = system
        this.sessions = sessions
        this.workflow = workflow
      } catch {
        this.warning = 'OpenClaw 服务未连接，当前展示演示数据。请检查 API/WS 配置。'
        this.system = mockSystem()
        if (!this.sessions.length) {
          this.sessions = [
            { id: 's1', title: '代码审查会话', status: 'running', updatedAt: '刚刚' },
            { id: 's2', title: '故障定位会话', status: 'idle', updatedAt: '3 分钟前' }
          ]
        }
        this.workflow = mockWorkflow()
      } finally {
        this.loading = false
      }
    },
    connectRealtime() {
      this.disconnectRealtime?.()
      this.disconnectRealtime = createOpenclawRealtime(
        (packet) => {
          if (packet.system) this.system = packet.system
          if (packet.workflow) this.workflow = packet.workflow
        },
        () => {
          this.warning = '实时通道异常，已自动切换到轮询/演示数据。'
        }
      )
    },
    async executeCommand(command: string) {
      await openclawApi.executeCommand(command)
      await this.refreshAll()
    }
  }
})
