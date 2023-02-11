import Mock from 'mockjs'

export default Mock.mock(new RegExp('/mock/user/menu'), 'post', () => {
    const menuList = [
      {
        path: '/customer',
        name: '客户管理',
        meta: {
          locale: '客户管理',
          requiresAuth: true,
          icon: 'icon-list',
        }
      },
      {
        path: '/systemData',
        name: '系统数据',
        meta: {
          locale: '系统数据',
          requiresAuth: true,
          icon: 'icon-list',
        },
        children: [
          {
            path: 'baseData',
            name: '基础数据',
            meta: {
              locale: '基础数据',
              requiresAuth: true,
            },
          },
          {
            path: 'template',
            name: '项目模板',
            meta: {
              locale: '项目模板',
              requiresAuth: true,
            },
          },
        ],
      },
    ];
    return {
        code: 200,
        data: menuList
    };
  })