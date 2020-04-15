function getFakeCaptcha(req, res) {
    return res.json('captcha-xxx');
  } // 代码中会兼容本地 service mock 以及部署站点的静态数据
  
  export default {
    // 支持值为 Object 和 Array
    '/api/editMake/queryUserEdit':{
        success: "",
        msg: "",
        obj: {
           UserInfo:{name:"示例类型",account:"1234",mobile:"13417651234"},
           OtherInfo:[{address:"1",postcode:"00010"},{address:"2",postcode:"00020"}],
        },
     },
     '/api/editMake/queryRoleEdit': (req, res) => {
       console.log("mockapieditmake",req.query);
       if(req.query.ID=="0001"){
      res.send({
        success: true,
         msg:"查询编辑信息成功",
         obj:{RoleInfo:{ID:"0001",name:"管理员",description:"这是一个管理员"}},
      });
    }else{
      res.send({
        success: true,
         msg:"查询编辑信息成功",
         obj:{RoleInfo:{ID:"0002",name:"普通用户",description:"这是一个普通用户"}}
      });
    }
    },

    '/api/editMake/queryDepartmentEdit': (req, res) => {
      console.log("mockapieditmake",req.query);
      if(req.query.ID=="0001"){
     res.send({
       success: true,
        msg:"查询编辑信息成功",
        obj:{DepartmentInfo:{name:"行政部",leadDep:"",manager:"主管李四",count:23,buildTime:"2020-01-01"}}
     });
   }else{
     res.send({
       success: true,
        msg:"查询编辑信息成功",
        obj:{DepartmentInfo:{ID:"0002",name:"人事部",leadDep:"",manager:"主管张三",count:12,buildTime:"2020-01-01"}}
     });
   }
   },

   '/api/editMake/queryCoopEdit': (req, res) => {
    console.log("mockapieditmake",req.query);
    if(req.query.ID=="0001"){
   res.send({
     success: true,
      msg:"查询编辑信息成功",
      obj:{ID:"0001",supplierName:"供应商1",Operator:"zyh",Date:"2019-02-11"}
   });
 }else{
   res.send({
     success: true,
      msg:"查询编辑信息成功",
      obj:{ID:"0002",supplierName:"供应商2",Operator:"zyh",Date:"2019-02-11"}
   });
 }
 },

 'POST /api/editMake/saveCoopEdit': (req, res) => {
  res.send({
    success: true,
     msg:"保存合作方信息成功",
  });
},
'POST /api/editMake/saveNewCoop': (req, res) => {
  res.send({
    success: true,
     msg:"新建合作方成功",
  });
},

    '/api/editMake/queryEditMakeSource':{
        success:true,
        msg:"成功",
        obj:{
            editData:[{name:"UserInfo",type:"object",display:"",field:[{name:"name",type:"string"},{name:"account",type:"string"},{name:"mobile", type:"string"}]},
            {name:"OtherInfo",type:"array",display:"",field:[{name:"address",type:"string"},{name:"postcode",type:"string"}]},
          ],                     
            specialEvent:[{name:"resetPW",type:"EventDeal"}],
        },
    },
    '/api/editMake/queryEditSetting':{
        success:true,
        msg:"成功",
        obj:{
          ButtonSetting:[],
          SourceSetting:[]
        }
    },
    '/api/editMake/queryEditTimestamp':{
      success:true,
      msg:"成功",
      obj:{timestamp:1,},
  },
  'POST /api/editMake/saveUserEdit': (req, res) => {
    res.send({
      success: true,
       msg:"保存用户信息成功",
    });
  },
  'POST /api/editMake/saveNewUser': (req, res) => {
    res.send({
      success: true,
       msg:"保存用户信息成功",
    });
  },
  'POST /api/editMake/saveRoleEdit': (req, res) => {
    res.send({
      success: true,
       msg:"保存角色信息成功",
    });
  },
  'POST /api/editMake/saveNewRole': (req, res) => {
    res.send({
      success: true,
       msg:"新建角色成功",
    });
  },

  'POST /api/editMake/saveDepartmentEdit': (req, res) => {
    res.send({
      success: true,
       msg:"保存部门信息成功",
    });
  },
  'POST /api/editMake/saveNewDepartment': (req, res) => {
    res.send({
      success: true,
       msg:"新建部门成功",
    });
  },

  'POST /api/editMake/queryAuthTree': (req, res) => {
    const { ID } = req.body;
    if(ID=="0001"){
    res.send({
      "success": true,
      "msg": "查询成功！",
      "obj": [
          {
              "children": [],
              "name": "首页",
              "range": "all",
              "id": 10000000,
              "operation": "edit"
          },
          {
            "children": [],
            "name": "个人中心",
            "range": null,
            "id": 11030000,
            "operation": "edit"
        },   
          {
              "children": [
              {  
                "children": [
                  {  
                    "children": [],
                    "name": "列表页配置",
                    "range": "one",
                    "id": 11010000,
                   "operation": "all"
                  },
                  {  
                    "children": [],
                    "name": "详情页配置",
                    "range": "one",
                    "id": 11010000,
                    "operation": "all"
                  },
                  {  
                    "children": [],
                    "name": "编辑页配置",
                    "range": "one",
                    "id": 11010000,
                    "operation": "all"
                  },
                ],
                "name": "页面配置",
                "range": "one",
                "id": 11010000,
                "operation": "two"
              },
              { 
              "children": [],
              "name": "语言配置",
              "range": "one",
              "id": 11010000,
              "operation": "all"
              },
              ],
              "name": "配置中心",
              "range": "one",
              "id": 20000000,
              "operation": "all"
          },
          {
              "children": [
                  {
                      "children": [],
                      "name": "角色管理",
                      "range": "one",
                      "id": 11030100,
                      "operation": "all"
                  },
                  {
                      "children": [],
                      "name": "用户管理",
                      "id": 11030200,
                      "operation": "all"
                  }
              ],
              "name": "用户及角色管理",
              "range": null,
              "id": 11030000,
              "operation": "all"
          },   
      ]
  })
}else{
  res.send({
    "success": true,
    "msg": "查询成功！",
    "obj": [
      {
        "children": [],
        "name": "首页",
        "range": "all",
        "id": 10000000,
        "operation": "edit"
    },
    {
      "children": [],
      "name": "个人中心",
      "range": null,
      "id": 11030000,
      "operation": "edit"
  },     
  ]
})
  }
  },
   

  'POST /api/editMake/submitAuth': (req, res) => {
    res.send({
      success: true,
       msg:"权限保存成功",
    });
  },
    'POST /api/register': (req, res) => {
      res.send({
        status: 'ok',
        currentAuthority: 'user',
      });
    },
    'GET  /api/login/captcha': getFakeCaptcha,
  };
  