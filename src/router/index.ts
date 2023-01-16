import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { appRoutes } from './routes'
import createRouteGuard from './guard'

const routerMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  ...(appRoutes as AppRouteRecordRaw[]),
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routerMap as RouteRecordRaw[],
  scrollBehavior() {
    return { top: 0 }
  }
})
createRouteGuard(router)

export default router
