export default {
  '/api/routes': {
    routes: 
     [{
        path: '/CheckManage',
        name:'新建渠道审核管理',
        component:'./CheckManage/CheckList',
        icon: 'smile',
      },
      {
        path: '/CheckManage/Audit',
        component: './CheckManage/CheckAudit',
      },
    ],
  },
  '/api/auth_routes': {
    '/form/advanced-form': {
      authority: ['admin', 'user'],
    },
  },
};
