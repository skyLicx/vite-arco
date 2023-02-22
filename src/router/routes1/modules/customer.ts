import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const CUSTOMER: AppRouteRecordRaw = {
  path: '/customer',
  component: DEFAULT_LAYOUT,
  redirect: '/customer',
  name: 'customer',
  meta: {
    locale: '客户管理',
    requiresAuth: true,
    icon: 'icon-list',
    hideChildrenInMenu: true
  },
  children: [
    {
      path: '',
      name: 'customer',
      component: () => import('@/views/customer/index.vue'),
      meta: {
        locale: '客户管理',
        requiresAuth: true
      }
    }
  ]
}

export default CUSTOMER
