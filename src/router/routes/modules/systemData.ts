import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const SYSTEMDATA: AppRouteRecordRaw = {
  path: '/systemData',
  name: '系统数据',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '系统数据',
    requiresAuth: true,
    icon: 'icon-list'
  },
  children: [
    {
      path: 'baseData',
      name: '基础数据',
      component: () => import('@/views/systemData/baseData/index.vue'),
      meta: {
        locale: '基础数据',
        // 不缓存路由
        ignoreCache: true,
        requiresAuth: true
      }
    },
    {
      path: 'template',
      name: '项目模板',
      component: () => import('@/views/systemData/template/index.vue'),
      meta: {
        locale: '项目模板',
        requiresAuth: true
      }
    },
    {
      path: 'categorize',
      name: '模板分类',
      component: () => import('@/views/systemData/categorize/index.vue'),
      meta: {
        locale: '模板分类',
        requiresAuth: true
      }
    },
    {
      path: 'medicare',
      name: '医保管理',
      component: () => import('@/views/systemData/medicare/index.vue'),
      meta: {
        locale: '医保管理',
        requiresAuth: true
      }
    }
  ]
}

export default SYSTEMDATA
