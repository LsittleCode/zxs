<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import WorkflowPanel from '@/components/workflow/WorkflowPanel.vue'
import WorkflowTimelineChart from '@/components/workflow/WorkflowTimelineChart.vue'
import LobsterAvatar from '@/components/lobster/LobsterAvatar.vue'
import { useOpenclawStore } from '@/stores/openclaw'

const store = useOpenclawStore()
const command = ref('')
const stateLabel = computed(() => `系统状态：${store.system.state}｜延迟 ${store.system.latencyMs}ms`)

onMounted(() => store.bootstrap())

const submitCommand = async () => {
  if (!command.value.trim()) return
  await store.executeCommand(command.value)
  command.value = ''
}
</script>

<template>
  <AppLayout title="OpenClaw Vue UI" :subtitle="stateLabel">
    <el-alert v-if="store.warning" :title="store.warning" type="warning" :closable="false" show-icon />

    <el-row :gutter="14" class="mt">
      <el-col :span="16">
        <el-card shadow="never">
          <template #header>系统监控</template>
          <el-row :gutter="10">
            <el-col :span="8"><el-statistic title="CPU" :value="store.system.cpuUsage" suffix="%" /></el-col>
            <el-col :span="8"><el-statistic title="内存" :value="store.system.memoryUsage" suffix="%" /></el-col>
            <el-col :span="8"><el-statistic title="活跃代理" :value="store.system.activeAgents" /></el-col>
          </el-row>
        </el-card>
        <WorkflowTimelineChart class="mt" :workflow="store.workflow" />
        <el-card class="mt" shadow="never">
          <template #header>指令控制台</template>
          <el-input v-model="command" type="textarea" :rows="4" placeholder="输入要执行的 OpenClaw 指令" />
          <el-button type="primary" class="mt" @click="submitCommand">执行命令</el-button>
        </el-card>
      </el-col>
      <el-col :span="8" class="stack">
        <WorkflowPanel :workflow="store.workflow" />
        <LobsterAvatar :state="store.system.state" :instruction="store.workflow.currentInstruction" />
        <el-card shadow="never">
          <template #header>会话列表</template>
          <el-table :data="store.sessions" size="small">
            <el-table-column prop="title" label="标题" />
            <el-table-column prop="status" label="状态" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </AppLayout>
</template>

<style scoped>
.mt{ margin-top:12px; }
.stack{ display:grid; gap:12px; }
</style>
