import Mock from 'mockjs'

// 动态路由
export default Mock.mock(new RegExp('/mock/user/menu'), 'post', () => {
  const menuList = [
    {
      path: '/systemData',
      name: 'SystemData',
      component: 'Layout',
      meta: {
        locale: '系统数据',
        icon: 'icon-list'
      },
      children: [
        {
          path: '/systemData/baseData',
          name: 'BaseData',
          component: '/systemData/baseData/index',
          meta: {
            locale: '基础数据',
            // 不缓存路由
            ignoreCache: true
          }
        },
        {
          path: '/systemData/template',
          name: 'Template',
          component: '/systemData/template/index',
          meta: {
            locale: '项目模板'
          }
        },
        {
          path: '/systemData/categorize',
          name: 'Categorize',
          component: '/systemData/categorize/index',
          meta: {
            locale: '模板分类'
          }
        }
      ]
    },
    {
      path: '/wechatApp',
      name: 'wechatApp',
      component: 'Layout',
      meta: {
        locale: '小程序',
        icon: 'icon-list',
        // isAlwaysShow: true
      },
      children: [
        {
          path: '/wechatApp/publishPost',
          name: 'publishPost',
          component: '/wechatApp/publishPost/index',
          meta: {
            locale: '发布帖子',
            icon: 'icon-list'
          }
        }
      ]
    }
  ]
  return {
    code: 200,
    data: menuList
  }
})
