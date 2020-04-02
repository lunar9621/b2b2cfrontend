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
    '/api/listMake/queryEditTimestamp':{
      success:true,
      msg:"成功",
      obj:{timestamp:'',},
  },
  'POST /api/editMake/saveUserEdit': (req, res) => {
    res.send({
      success: true,
       msg:"保存用户信息成功",
    });
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
  