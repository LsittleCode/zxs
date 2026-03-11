import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/openclaw' },
  { path: '/openclaw', component: () => import('@/views/OpenClawDashboard.vue') }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
