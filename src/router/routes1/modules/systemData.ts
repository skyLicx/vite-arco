import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const SYSTEMDATA: AppRouteRecordRaw = {
  path: '/systemData',
  name: 'systemData',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '系统数据',
    icon: 'icon-list'
  },
  children: [
    {
      path: 'baseData',
      name: 'baseData',
      component: () => import('@/views/systemData/baseData/index.vue'),
      meta: {
        locale: '基础数据',
        // 不缓存路由
        ignoreCache: true
      }
    },
    {
      path: 'template',
      name: 'template',
      component: () => import('@/views/systemData/template/index.vue'),
      meta: {
        locale: '项目模板'
      }
    },
    {
      path: 'categorize',
      name: 'categorize',
      component: () => import('@/views/systemData/categorize/index.vue'),
      meta: {
        locale: '模板分类'
      }
    },
    {
      path: 'medicare',
      name: 'medicare',
      component: () => import('@/views/systemData/medicare/index.vue'),
      meta: {
        locale: '医保管理'
      }
    }
  ]
}

export default SYSTEMDATA
