import { DEFAULT_LAYOUT } from '@/router/constans'

export default {
  path: '/customer',
  component: DEFAULT_LAYOUT,
  children: [
    {
      path: '',
      name: '客户管理',
      component: () => import('@/views/customer/index.vue'),
      meta: {
        locale: '客户管理'
      }
    }
  ]
}
