import { getMenuList } from '@/api/serveMenu'
import { defineStore } from 'pinia'
import { PermissionState } from './types'

const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    // 后端返回的权限菜单
    serverMenu: []
  }),
  getters: {
    getRouters(): any[] {
      return this.serverMenu
    }
  },
  actions: {
    // 获取后端返回的权限菜单
    async getServerMenuConfig() {
      try {
        const { data } = await getMenuList()
        const menu: any = []
        const privsOjb: any = {}
        // 处理数据
        data.forEach((item) => {
          const menuItem = {
            name: item.privName,
            fullPath: item.privUrl,
            meta: {
              locale: item.privName
            },
            children: null,
            value: item.privId
          }
          if (item.parentId === 0) {
            menu.push(menuItem)
          } else if (!privsOjb[item.parentId]) {
            privsOjb[item.parentId] = [menuItem]
          } else {
            privsOjb[item.parentId].push(menuItem)
          }
        })
        menu.forEach((item: any) => {
          if (privsOjb[item.value]) {
            item.children = privsOjb[item.value]
          }
        })
        this.serverMenu = menu
        return Promise.resolve(data)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})

export default usePermissionStore
