<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <div class="layout">
    <aside class="sidebar">
      <h2>OpenClaw 控制台</h2>
      <p>中文增强版</p>
      <ul>
        <li>系统总览</li>
        <li>会话管理</li>
        <li>工作流可视化</li>
        <li>任务控制台</li>
      </ul>
    </aside>
    <main class="content">
      <header class="top">
        <h1>{{ title }}</h1>
        <span>{{ subtitle }}</span>
      </header>
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout { display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }
.sidebar { background:#0f2548; color:#e6f0ff; padding:20px; }
.sidebar h2 { margin:0 0 8px; font-size:20px; }
.sidebar p { margin:0 0 16px; color:#9fc0ff; }
.sidebar ul { padding-left:16px; line-height:1.9; }
.content { background:#f5f8ff; padding:18px; }
.top { display:flex; justify-content:space-between; align-items:end; margin-bottom:14px; }
.top h1{ margin:0; font-size:24px; color:#153267; }
.top span{ color:#63779b; }
</style>
