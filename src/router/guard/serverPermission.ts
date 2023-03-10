import type { Router } from 'vue-router'
import { usePermissionStore } from '@/store'
import { DEFAULT_LAYOUT, NOT_FOUND_ROUTE } from '../routes/base'
// vite要使用这种写法拼接路径
const routeAllPathToCompMap = import.meta.glob('/src/views/**/*.vue')

export default function setupServerPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 获取后端权限路由
    const appStore = usePermissionStore()
    // 已经登录并且还没有获取动态路由数据则重新获取
    if (localStorage.getItem('token') && !appStore.getRouters.length) {
      // 从服务端获取路由
      await appStore.getServerMenuConfig()
      // 处理数据 组成路由
      const filterASyncRoutes = (data) => {
        const routes = data.map((item) => {
          if (item.component === 'Layout') {
            item.component = DEFAULT_LAYOUT
          } else {
            item.component =
              routeAllPathToCompMap[`/src/views${item.component}.vue`]
          }
          if (item.children) {
            item.children = filterASyncRoutes(item.children)
          }
          return {
            ...item
          }
        })
        return routes
      }
      const routes: any = filterASyncRoutes(appStore.getRouters)
      // 添加路由
      routes.forEach((item) => {
        router.addRoute(item)
      })
      // 将404添加在路由最后 否则动态路由还没添加完毕前跳转会出错
      router.addRoute(NOT_FOUND_ROUTE)
      next(to)
    } else {
      next()
    }
  })
}
