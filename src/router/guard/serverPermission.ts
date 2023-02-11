import type { Router } from 'vue-router'
import { usePermissionStore } from '@/store'
import testPage from '@/router/routes/modules/testPage'

// 白名单
const WHITE_LIST = [
  { name: 'notFound', children: [] },
  { name: 'login', children: [] },
  testPage
]

export default function setupServerPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const appStore = usePermissionStore()
    // 获取后端权限路由
    // 如果没有权限路由列表而且跳转的路由不在白名单内 则重新获取权限
    if (
      !appStore.getRouters.length &&
      !WHITE_LIST.find((el) => el.name === to.name)
    ) {
      await appStore.getServerMenuConfig()
    }
    const serverMenuConfig = [...appStore.getRouters, ...WHITE_LIST]
    let exist = false
    // 遍历权限列表查看跳转的路由是否在权限内
    while (serverMenuConfig.length) {
      const element = serverMenuConfig.shift()
      if (element?.name === to.name) exist = true
      if (element?.children) {
        serverMenuConfig.push(
          ...(element.children as unknown as AppRouteRecordRaw[])
        )
      }
    }
    if (exist) next()
    else next({ name: 'notFound' })
  })
}
