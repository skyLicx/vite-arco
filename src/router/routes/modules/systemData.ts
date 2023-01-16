import { DEFAULT_LAYOUT } from '@/router/constans'

export default {
  path: '/systemData',
  name: '系统数据',
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: 'baseData',
      name: '基础数据',
      component: () => import('@/views/systemData/baseData/index.vue'),
      meta: {
        locale: '基础数据',
        // 不缓存路由
        ignoreCache: true
      }
    },
    {
      path: 'template',
      name: '项目模板',
      component: () => import('@/views/systemData/template/index.vue'),
      meta: {
        locale: '项目模板'
      }
    },
    {
      path: 'categorize',
      name: '模板分类',
      component: () => import('@/views/systemData/categorize/index.vue'),
      meta: {
        locale: '模板分类'
      }
    },
    {
      path: 'medicare',
      name: '医保管理',
      component: () => import('@/views/systemData/medicare/index.vue'),
      meta: {
        locale: '医保管理'
      }
    }
  ]
}
