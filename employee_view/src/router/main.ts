import { createRouter, createWebHistory } from 'vue-router'
import { Initpinia } from '@/store/init.ts'
import { useBreadStore } from '@/store/bread.ts'
import { useSysStore } from '@/store/sys.ts'
const breadStore = useBreadStore(Initpinia)
const sysStore = useSysStore(Initpinia)

const { updateBreadList } = breadStore

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '/dashboard',
        meta: {
          name: '首页'
        },
        component: () => import('@/views/dashboard/index.vue')
      },
      {
        path: '/empolyee',
        meta: {
          name: '员工查询'
        },
        component: () => import('@/views/empolyee/index.vue')
      },
      {
        path: '/rewardPunishments',
        meta: {
          name: '奖惩管理'
        },
        component: () => import('@/views/rewardAndPunishments/index.vue')
      },
      {
        path: '/salary',
        meta: {
          name: '薪酬'
        },
        component: () => import('@/views/salary/index.vue')
      },
      {
        path: '/department',
        meta: {
          name: '部门管理'
        },
        component: () => import('@/views/department/index.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const whilteName = ['/login']
router.beforeEach((to, from, next) => {
  updateBreadList({ name: to.meta.name as string, path: to.path })

  if (whilteName.includes(to.path)) {
    if (sysStore.token) {
      next('/dashboard')
    } else {
      next()
    }
  } else {
    if (sysStore.token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
