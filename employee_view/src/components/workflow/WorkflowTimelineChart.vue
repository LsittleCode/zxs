<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { WorkflowSnapshot } from '@/types/openclaw'

const props = defineProps<{ workflow: WorkflowSnapshot }>()
const chartRef = ref<HTMLDivElement>()
let chart: echarts.ECharts | undefined

const render = () => {
  if (!chartRef.value) return
  if (!chart) chart = echarts.init(chartRef.value)
  chart.setOption({
    grid: { left: 30, right: 20, top: 20, bottom: 20 },
    xAxis: { type: 'value', max: 100 },
    yAxis: { type: 'category', data: props.workflow.steps.map((s) => s.name) },
    series: [{ type: 'bar', data: props.workflow.steps.map((s) => s.progress), itemStyle: { color: '#3f8cff' } }]
  })
}

watch(() => props.workflow, render, { deep: true })
onMounted(render)
onUnmounted(() => chart?.dispose())
</script>

<template><el-card shadow="never"><div ref="chartRef" class="chart" /></el-card></template>

<style scoped>
.chart { height: 240px; }
</style>
