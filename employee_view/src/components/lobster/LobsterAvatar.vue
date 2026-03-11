<script setup lang="ts">
import { computed } from 'vue'
import type { RunState } from '@/types/openclaw'

const props = defineProps<{ state: RunState; instruction: string }>()
const face = computed(() => {
  if (props.state === 'error') return '困惑'
  if (props.state === 'running') return '忙碌'
  if (props.state === 'success') return '开心'
  if (props.state === 'offline') return '离线'
  return '休息'
})
</script>

<template>
  <el-card shadow="never" class="card">
    <template #header>卡通龙虾（像素风）</template>
    <div class="sprite" :class="`st-${props.state}`">
      <div class="px body"></div><div class="px claw l"></div><div class="px claw r"></div><div class="px eye l"></div><div class="px eye r"></div>
    </div>
    <p>状态：{{ face }} ｜ 指令：{{ instruction }}</p>
  </el-card>
</template>

<style scoped>
.card p{ color:#52617e; font-size:13px; }
.sprite{ position:relative; width:160px; height:110px; margin:0 auto 8px; transition:.3s; }
.px{ position:absolute; background:#ff7a45; border:3px solid #2c2238; box-sizing:border-box; }
.body{ width:70px;height:50px;left:45px;top:38px; }
.claw{ width:24px;height:30px;top:44px; }
.claw.l{ left:14px; } .claw.r{ right:14px; }
.eye{ width:8px;height:8px;background:#2c2238;top:28px; }
.eye.l{ left:58px; } .eye.r{ right:58px; }
.st-running{ transform:translateY(-4px) rotate(-1deg); }
.st-success{ transform:scale(1.06); }
.st-error{ transform:rotate(2deg); }
.st-offline{ opacity:.45; }
</style>
