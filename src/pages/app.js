import config from '../../../config/config';


export function patchRoutes(routes) {
  console.log("--------app.routes",config);
  console.log("routes",routes);
    routes.unshift({name:"test",
    path: '/test',
    component: '../layouts/BasicLayout',
    routes: [
      {
        name: 'login',
        path: '/user/test',
        component: './user/login',
      },
    ],
  });
  }