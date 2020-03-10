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
    '/api/detailMake/queryDetailMakeSource':{
        success:true,
        msg:"成功",
        obj:{
            detailData:[{name:"供应商基本信息",type:"object",field:[{name:"name",type:"string",component:""},{name:"description",type:"string",component:""},{name:"creator",type:"string",component:""},{name:"createTime",type:"date",component:""}]},
                        {name:"供应商属性信息",type:"array",field:[{name:"name",type:"string",component:""},{name:"creator",type:"string",component:""},{name:"createTime",type:"date",component:""}]},
                        {name:"供应商信息",type:"array",field:[{name:"name",type:"string",component:""},{name:"ID",type:"string",component:""}]},],
                      
            specialEvent:[],
        },
    },
    '/api/listMake/queryDetailSetting':{
        success:true,
        msg:"成功",
        obj:{
          ButtonSetting:[],
          SourceSetting:[]
        }
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
  