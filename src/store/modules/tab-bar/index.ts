import type { RouteLocationNormalized } from 'vue-router'
import { defineStore } from 'pinia'
import { TabBarState, TagProps } from './types'

const formatTag = (route: RouteLocationNormalized): TagProps => {
  const { name, meta, fullPath, query } = route
  return {
    // 标题
    title: meta.locale || '',
    // 名称
    name: name as string,
    // 路由全路径
    fullPath,
    // 路由参数
    query
  }
}

const useTabBarStore = defineStore('tabBar', {
  state: (): TabBarState => ({
    // 需要缓存的路由标签列表
    cacheTabList: new Set(),
    // 标签列表
    tagList: [
      // 根据需要设置第一个标签元素
      // {
      //   title: '基础数据',
      //   name: '基础数据',
      //   fullPath: '/systemData/baseData',
      // },
    ]
  }),

  getters: {
    // 获取标签列表
    getTabList(): TagProps[] {
      return this.tagList
    },
    // 获取需要缓存的路由标签列表
    getCacheList(): string[] {
      return Array.from(this.cacheTabList)
    }
  },

  actions: {
    // 增加标签
    updateTabList(route: RouteLocationNormalized) {
      this.tagList.push(formatTag(route))
      // 如果需要缓存 则增加name
      if (!route.meta.ignoreCache) {
        this.cacheTabList.add(route.name as string)
      }
    },
    // 删除标签
    deleteTag(idx: number, tag: TagProps) {
      this.tagList.splice(idx, 1)
      this.cacheTabList.delete(tag.name)
    }
  }
})

export default useTabBarStore
