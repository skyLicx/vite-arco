import { createRouter, createWebHashHistory } from 'vue-router'
import { REDIRECT_MAIN } from './routes/base'
import createRouteGuard from './guard'
import { appRoutes } from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    ...appRoutes,
    REDIRECT_MAIN
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})
createRouteGuard(router)

export default router
