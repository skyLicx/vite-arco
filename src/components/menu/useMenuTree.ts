import { computed } from 'vue'
import { RouteRecordRaw, RouteRecordNormalized } from 'vue-router'
import appClientMenus from '@/router/appMenus'
import { usePermissionStore } from '@/store'
import { cloneDeep } from 'lodash'

export default function useMenuTree() {
  const appStore = usePermissionStore()
  // 路由
  const appRoute = computed(() => {
    // 服务端数据
    // return appStore.getRouters
    // 本地数据
    return appClientMenus
  })
  // 侧边栏菜单
  const menuTree = computed(() => {
    // 拷贝路由
    const copyRouter = cloneDeep(appRoute.value) as RouteRecordNormalized[]
    console.log(copyRouter, '..')
    // 路由根据order排序
    copyRouter.sort((a: RouteRecordNormalized, b: RouteRecordNormalized) => {
      return (a.meta.order || 0) - (b.meta.order || 0)
    })
    function travel(_routes: RouteRecordRaw[]) {
      if (!_routes) return null

      const collector: any = _routes.map((element) => {
        // no access
        // if (!permission.accessRouter(element)) {
        // 	return null
        // }

        // 隐藏菜单
        if (element.meta?.hideInMenu === true) {
          return null
        }

        // 隐藏子路由菜单或没有子路由时children置空
        if (element.meta?.hideChildrenInMenu || !element.children) {
          element.children = []
          return element
        }

        // 处理子路由
        const subItem = travel(element.children)

        if (subItem.length) {
          element.children = subItem
          return element
        }

        return null
      })
      // 去除所有为null的选项
      return collector.filter(Boolean)
    }
    return travel(copyRouter as any)
  })
  return {
    menuTree
  }
}
