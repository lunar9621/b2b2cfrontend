import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
 
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: '高级表单',
              icon: 'smile',
              path: '/formadvancedform',
              component: './FormAdvancedForm',
            },
            {
              name: 'table',
              icon: 'smile',
              path: '/testsearchform',
              component: './testsearchForm',
            },
            {
              name: '配置中心',
              icon: 'smile',
              path:'/ConfigureCenter',
              routes: [
                {
                  name:'页面配置',
                  path:'PageConfigure',
                  routes: [
                    {
                      name:'列表页配置首页',
                      path: '/ConfigureCenter/PageConfigure/ListMakeHome',
                      component:'./PageConfigure/ListMakeHome',
                    },
                    {
                      name:'详情页配置首页',
                      path: '/ConfigureCenter/PageConfigure/DetailMakeHome',
                      component:'./PageConfigure/DetailMakeHome',
                    },
                    {
                      name:'编辑页配置首页',
                      path: '/ConfigureCenter/PageConfigure/EditMakeHome',
                      component:'./PageConfigure/EditMakeHome',
                    },
                    {
                      path: '/ConfigureCenter/PageConfigure/ListMake',
                      component:'./PageConfigure/ListMake',
                    },
                    {
                      path: '/ConfigureCenter/PageConfigure/DetailMake',
                      component:'./PageConfigure/DetailMake',
                    },
                    {
                      path: '/ConfigureCenter/PageConfigure/EditMake',
                      component:'./PageConfigure/EditMake',
                    },
                    {
                      path: '/ConfigureCenter/PageConfigure/ListMakePreview',
                      component:'./PageConfigure/ListMakePreview',
                    },
                    {
                      path: '/ConfigureCenter/PageConfigure/DetailMakePreview',
                      component:'./PageConfigure/DetailMakePreview',
                    },
                    {
                      path: '/ConfigureCenter/PageConfigure/EditMakePreview',
                      component:'./PageConfigure/EditMakePreview',
                    },
                  ],
                },
                {
                  name:"语言配置",
                  path:"LocaleConfigure",
                  component:'./LocaleConfigure/ConfigureHome',
                },
                {
                  name:"菜单配置",
                  path:"MenuConfigure",
                  component:'./MenuConfigure/MenuConfigureHome',
                },
              ],
            },
            {
              path: '/SelfInfo',
              name: '个人中心',
              icon: 'smile',
              component: './SelfInfo/View',
            },
            {
              path: '/SelfInfo/resetPWD',
              component: './SelfInfo/resetPWD',
            },
            {
              path: '/UserAndRole',
              name:'用户及角色管理',
              icon: 'smile',
              routes: [
                {
                  path: '/UserAndRole/UserManage',
                  name: '用户管理',
                  component: './UserManage/UserList',
                },
                {
                  path: '/UserAndRole/UserManageEdit',
                  component: './UserManage/UserEdit',
                },
                {
                  path: '/UserAndRole/RoleManage',
                  name: '角色管理',
                  component: './RoleManage/RoleList',
                },
                {
                  path: '/UserAndRole/RoleManageEdit',
                  component: './RoleManage/RoleEdit',
                },
                {
                  path: '/UserAndRole/RoleManageGrantAuth',
                  component: './RoleManage/GrantAuth',
                },
              ],
             
            },
            {
              path: '/DepartmentManage',
              name:'部门管理',
              component:'./DepartmentManage/DepartmentList',
              icon: 'smile',
            },
            {
              path: '/DepartmentManage/Detail',
              component: './DepartmentManage/DepartmentDetail',
            },
            {
              path: '/DepartmentManage/Edit',
              component: './DepartmentManage/DepartmentEdit',
            },
            {
              path: '/CoopManage',
              name:'合作方管理',
              component:'./CoopManage/CoopList',
              icon: 'smile',
            },
            {
              path: '/CoopManage/Detail',
              component: './CoopManage/CoopDetail',
            },
            {
              path: '/CoopManage/Edit',
              component: './CoopManage/CoopEdit',
            },
            {
              path: '/ContractManage',
              name:'合同管理',
              component:'./ContractManage/ContractList',
              icon: 'smile',
            },
            {
              path: '/ContractManage/Detail',
              component: './ContractManage/ContractDetail',
            },
            {
              path: '/ContractManage/Edit',
              component: './ContractManage/ContractEdit',
            },
            {
              path: '/CheckManage',
              name:'审核管理',
              component:'./CheckManage/CheckList',
              icon: 'smile',
            },
            {
              path: '/CheckManage/Audit',
              component: './CheckManage/CheckAudit',
            },
            {
              path: '/CoopManage',
              component:'./CoopManage/CoopList',
              rootKey:'CoopListtmp1',
              icon: 'smile',
            },
            {
              path: '/CoopManage',
              component:'./CoopManage/CoopList',
              rootKey:'CoopListtmp2',
              icon: 'smile',
            },
            {
              path: '/CoopManage',
              component:'./CoopManage/CoopList',
              rootKey:'CoopListtmp3',
              icon: 'smile',
            },
            {
              path: '/CoopManage',
              component:'./CoopManage/CoopList',
              rootKey:'CoopListtmp4',
              icon: 'smile',
            },
            {
              path: '/CoopManage',
              component:'./CoopManage/CoopList',
              rootKey:'CoopListtmp5',
              icon: 'smile',
            },
            {
              path: '/CheckManage',
              rootKey:'CheckListtmp1',
              component:'./CheckManage/CheckList',
              icon: 'smile',
            },
            {
              path: '/CheckManage',
              rootKey:'CheckListtmp2',
              component:'./CheckManage/CheckList',
              icon: 'smile',
            },
            {
              path: '/CheckManage',
              rootKey:'CheckListtmp3',
              component:'./CheckManage/CheckList',
              icon: 'smile',
            },
            {
              path: '/CheckManage',
              rootKey:'CheckListtmp4',
              component:'./CheckManage/CheckList',
              icon: 'smile',
            },
            {
              path: '/CheckManage',
              rootKey:'CheckListtmp5',
              component:'./CheckManage/CheckList',
              icon: 'smile',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    primaryColor: defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
};
