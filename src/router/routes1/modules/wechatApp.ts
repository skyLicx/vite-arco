import { DEFAULT_LAYOUT } from '../base'
import { AppRouteRecordRaw } from '../types'

const WECHATAPP: AppRouteRecordRaw = {
  path: '/wechatApp',
  name: '小程序',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '小程序',
    requiresAuth: true,
    icon: 'icon-list'
  },
  children: [
    {
      path: 'topicManage',
      name: '话题管理',
      component: () => import('@/views/wechatApp/topicManage/index.vue'),
      meta: {
        locale: '话题管理',
        requiresAuth: true
        // roles: ['*'],
      }
    },
    {
      path: 'userAccount',
      name: '用户账号',
      component: () => import('@/views/wechatApp/userAccount/index.vue'),
      meta: {
        locale: '用户账号',
        requiresAuth: true
      }
    },
    {
      path: 'publishPost',
      name: '发布帖子',
      component: () => import('@/views/wechatApp/publishPost/index.vue'),
      meta: {
        locale: '发布帖子',
        requiresAuth: true
      }
    }
  ]
}
export default WECHATAPP
