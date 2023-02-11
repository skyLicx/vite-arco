import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const TESTPAGE: AppRouteRecordRaw = {
  path: '/testpage',
  name: 'testpage',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '测试页面',
    requiresAuth: true,
    icon: 'icon-list'
  },
  children: [
    {
      path: 'baseData',
      name: '测试页面1',
      component: () => import('@/views/testPage/index.vue'),
      meta: {
        locale: '测试页面1',
        // 不缓存路由
        ignoreCache: true,
        requiresAuth: true
      }
    }
  ]
}

export default TESTPAGE
