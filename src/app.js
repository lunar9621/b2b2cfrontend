let extraRoutes;

export function render(oldRender){
 
  // fetch('/apikoa/routes').then((res)=>{
  //   res.json().then(
  //     data=>{
  //       extraRoutes=data.routes;
  //       console.log("data",data,"extraroutes",extraRoutes);
  //       oldRender();
       
  //   });
   
  // });
  window.oldRender=()=>{
    console.log("runwindow.oldRender");
    fetch('/apikoa/routes').then((res)=>{
      res.json().then(
        data=>{
          extraRoutes=data.routes;
          console.log("data",data,"extraroutes",extraRoutes);
          oldRender();
         console.log("endwindowoldrender");
      });
     
    });
  }
 if(window.oldRender){
   console.log("enterifoldrender");
   window.oldRender();
 }
}

export function patchRoutes(routes) {
  //merge(routes,extraRoutes);
  console.log("routesbeforepatch",routes);
  for(let item in extraRoutes){
    
      if(extraRoutes[item].fatherNode=="TopMenu"){
      delete extraRoutes[item].fatherNode;
      if(extraRoutes[item].component=='./CoopManage/CoopList'){
        for(let activetmp =20;activetmp<=24;activetmp++){//找到第一个未被使用的合作方临时挂载点
          if(routes[1].routes[0].routes[activetmp].path=='/CoopManage'){
            routes[1].routes[0].routes[activetmp].path=extraRoutes[item].path+'/dataSource='+extraRoutes[item].dataSource;
            routes[1].routes[0].routes[activetmp].name=extraRoutes[item].name;
            break;
          }
        }
      }else{
        for(let activetmp =25;activetmp<=29;activetmp++){//找到第一个未被使用的审核管理临时挂载点
          if(routes[1].routes[0].routes[activetmp].path=='/CheckManage'){
            routes[1].routes[0].routes[activetmp].path=extraRoutes[item].path+'/dataSource='+extraRoutes[item].dataSource;
            routes[1].routes[0].routes[activetmp].name=extraRoutes[item].name;
            break;
          }
        }
      }
    }
  }
  window.routes=routes;
}