import type { Router } from 'vue-router'

export default function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (localStorage.getItem('token')) {
      next()
    } else {
      // 如果不存在token 则跳转到登录页
      if (to.name === 'login') {
        next()
        return
      }
      next({
        name: 'login'
      })
    }
  })
}
