function getFakeCaptcha(req, res) {
    return res.json('captcha-xxx');
  } // 代码中会兼容本地 service mock 以及部署站点的静态数据
  
  export default {
    // 支持值为 Object 和 Array
    '/api/listMake/queryCoopList':{
        success: "",
        msg: "",
        obj: {
            rows: [{supplierName:"供应商1",Operator:"zyh",Date:"2019-02-11"}],
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
            otherOpe:[],
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
  