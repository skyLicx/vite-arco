import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const CUSTOMER: AppRouteRecordRaw = {
  path: '/customer',
  component: DEFAULT_LAYOUT,
  redirect: '/customer',
  name: '客户管理',
  meta: {
    locale: '客户管理',
    requiresAuth: true,
    icon: 'icon-list',
    hideChildrenInMenu: true
  },
  children: [
    {
      path: '',
      name: '客户管理',
      component: () => import('@/views/customer/index.vue'),
      meta: {
        locale: '客户管理',
        requiresAuth: true
      }
    }
  ]
}

export default CUSTOMER
