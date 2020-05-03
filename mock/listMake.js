function getFakeCaptcha(req, res) {
    return res.json('captcha-xxx');
  } // 代码中会兼容本地 service mock 以及部署站点的静态数据
  
  export default {
    // 支持值为 Object 和 Array
    '/api/listMake/queryCoopList':{
        success: "",
        msg: "",
        obj: {
            rows: [{ID:"0001",supplierName:"供应商1",Operator:"zyh",Date:"2019-02-11"},
            {ID:"0002",supplierName:"供应商2",Operator:"zyh",Date:"2020-01-11"}],
            pageSize: null,
            pageNumber: null,
            total: null,
        },
     },
     'POST /api/listMake/roleManageDelete': (req, res) => {
      res.send({
        success: true,
         msg:"删除角色成功",
      });
    },
     'POST /api/listMake/userManageDelete': (req, res) => {
      res.send({
        success: true,
         msg:"删除用户成功",
      });
    },
    'POST /api/listMake/departmentManageDelete': (req, res) => {
      res.send({
        success: true,
         msg:"删除部门成功",
      });
    },
    'POST /api/listMake/coopManageDelete': (req, res) => {
      res.send({
        success: true,
         msg:"删除合作方成功",
      });
    },
     'POST /api/listMake/userManageResetPWD': (req, res) => {
      res.send({
        success: true,
         msg:"密码修改成功",
      });
    },
     '/api/listMake/queryUserList':{
      success: "",
      msg: "",
      obj: {
          rows: [{ID:"0001",username:"zyhadmin",name:"zyh",mobile:"0000001",role:'admin',department:'部门1'},
          {ID:"0002",username:"zyhuser",name:"zyh",mobile:"0000001",role:'user',department:'部门1'}],
          pageSize: null,
          pageNumber: null,
          total: null,
      },
   },
   '/api/listMake/queryRoleList':{
    success: "",
    msg: "",
    obj: {
        rows: [{ID:"0001",name:"管理员",description:"这是一个管理员"},
        {ID:"0002",name:"普通用户",description:"这是一个普通用户"}],
        pageSize: null,
        pageNumber: null,
        total: null,
    },
 },
  '/api/listMake/queryDepartmentList':{
    success: "",
    msg: "",
    obj: {
        rows: [{ID:"0001",name:"行政部",leadDep:"",manager:"主管李四",count:23,buildTime:"2020-01-01",children:[
          {name:"部门1",leadDep:"",manager:"主管李无",count:23,buildTime:"2020-01-01"}
        ]},
        {ID:"0002",name:"人事部",leadDep:"",manager:"主管张三",count:12,buildTime:"2020-01-01"}],
        pageSize: null,
        pageNumber: null,
        total: null,
    },
  },
    '/api/listMake/queryListMakeSource':{
        success:true,
        msg:"成功",
        obj:{
            fieldValue:[{name:"supplierName",type:"string"},{name:"Operator",type:"string"},{name:"Date",type:"Date"},{name:"status",type:"enum",options:[0,1,2]}],
            otherOpe:[{index:0,name:"resetPWD",dispatchType:"ManageListModel/userManageResetPWD"}],
            otherRoute:[],
        },
    },
    '/api/listMake/queryListSetting':{
        success:true,
        msg:"成功",
        obj:{
        renderFormSetting:[],
        columnSetting:[],
        },
    },
    '/api/listMake/queryListTimestamp':{
      success:true,
      msg:"成功",
      obj:{timestamp:'',},
  },
    'POST /api/login/account': (req, res) => {
      const { password, userName, type } = req.body;
  
      if (password === 'ant.design' && userName === 'admin') {
        res.send({
          status: 'ok',
          type,
          currentAuthority: 'admin',
        });
        return;
      }
  
      if (password === 'ant.design' && userName === 'user') {
        res.send({
          status: 'ok',
          type,
          currentAuthority: 'user',
        });
        return;
      }
  
      res.send({
        status: 'error',
        type,
        currentAuthority: 'guest',
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
  