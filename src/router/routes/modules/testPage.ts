import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const TESTPAGE: AppRouteRecordRaw = {
  path: '/level1',
  name: 'level1',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'level1',
    isAlwaysShow: true
  },
  children: [
    {
      path: 'level2',
      name: 'level2',
      component: () => import('@/views/testPage/index.vue'),
      meta: {
        locale: 'level2'
      },
      children: [
        {
          path: 'level3-1',
          name: 'level3-1',
          component: () => import('@/views/testPage/index2.vue'),
          meta: {
            locale: 'level3-1'
          }
        },
        // {
        //   path: 'level3-2',
        //   name: 'level3-2',
        //   component: () => import('@/views/testPage/index3.vue'),
        //   meta: {
        //     locale: 'level3-2'
        //   }
        // }
      ]
    }
  ]
}

export default TESTPAGE
