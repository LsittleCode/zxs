<script setup lang="ts">
import type { WorkflowSnapshot } from '@/types/openclaw'

const props = defineProps<{ workflow: WorkflowSnapshot }>()
const statusType = (status: string) => {
  if (status === 'done') return 'success'
  if (status === 'running') return 'warning'
  if (status === 'error') return 'danger'
  return 'info'
}
</script>

<template>
  <el-card shadow="never">
    <template #header>
      <div class="head">
        <span>实时工作流程</span>
        <el-tag type="primary">{{ props.workflow.overallProgress }}%</el-tag>
      </div>
    </template>
    <el-progress :percentage="props.workflow.overallProgress" />
    <p class="tip">当前指令：{{ props.workflow.currentInstruction }}</p>
    <div class="steps">
      <el-tag v-for="step in props.workflow.steps" :key="step.id" :type="statusType(step.status)">
        {{ step.name }} {{ step.progress }}%
      </el-tag>
    </div>
  </el-card>
</template>

<style scoped>
.head { display:flex; justify-content:space-between; align-items:center; }
.tip { color:#4d5f80; margin:10px 0; }
.steps { display:flex; gap:8px; flex-wrap:wrap; }
</style>
