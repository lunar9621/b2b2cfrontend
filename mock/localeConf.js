function getFakeCaptcha(req, res) {
    return res.json('captcha-xxx');
  } // 代码中会兼容本地 service mock 以及部署站点的静态数据
  
  export default {
    // 支持值为 Object 和 Array
    '/api/localeConf/queryzhcnConf':{
        success: "",
        msg: "",
        obj: {
          'test1': '测试1',
          'test2': '测试2',
          'test3': '测试3',
          'test4': '测试4',
          'test5': '测试5',
          'test6': '测试6',
          'test7': '测试7',
        },
     },
     '/api/localeConf/queryzhtwConf':{
      success: "",
      msg: "",
      obj: {
        'test1': '测试1',
        'test2': '测试2',
        'test3': '测试3',
        'test4': '测试4',
        'test5': '测试5',
        'test6': '测试6',
        'test7': '测试7',
      },
   },
   '/api/localeConf/queryenusConf':{
    success: "",
    msg: "",
    obj: {
      'test1': '测试1',
      'test2': '测试2',
      'test3': '测试3',
      'test4': '测试4',
      'test5': '测试5',
      'test6': '测试6',
      'test7': '测试7',
     },
    },
    '/api/localeConf/queryptbrConf':{
      success: "",
      msg: "",
      obj: {
        'test1': '测试1',
        'test2': '测试2',
        'test3': '测试3',
        'test4': '测试4',
        'test5': '测试5',
        'test6': '测试6',
        'test7': '测试7',
      },
    },
    '/api/localeConf/querymylocalConf':{
      success: "",
      msg: "",
      obj: {
        mylocal:{'test1': '测试1',
        'test2': '测试2',
        'test3': '测试3',
        'test4': '测试4',
        'test5': '测试5',
        'test6': '测试6',
        'test7': '测试7',
      }
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
  