function getFakeCaptcha(req, res) {
    return res.json('captcha-xxx');
  } // 代码中会兼容本地 service mock 以及部署站点的静态数据
  
  export default {
    // 支持值为 Object 和 Array,
    //详情页配置使用
    // '/api/detailMake/queryCoopDetail':{
    //     success: "",
    //     msg: "",
    //     obj: {
    //        TypeBasicInfo:{name:"示例类型",description:"描述123455664325454352532",creator:"zyh",creatTime:"20200101"},
    //        TypePropertyInfo:[{name:"area",creator:"zyh",createTime:"20200101"},{name:"time",creator:"zyh",createTime:"20200102"}],
    //        SupplierInfo:[{name:"gong1",ID:"01010010"},{name:"gong2",ID:"01010015"},{name:"gong3",ID:"01010016"},],
    //     },
    //  },
     '/api/detailMake/queryCoopDetail':{
      success: "",
      msg: "",
      obj: {
         CoopInfo:[{supplierName:"供应商1",Operator:"zyh",Date:"2019-02-11"},{name:"gong2",ID:"01010015"},{name:"gong3",ID:"01010016"},],
      },
   },
     '/api/detailMake/queryDepartmentDetail': (req, res) => {
      console.log("mockapieditmake",req.query);
      if(req.query.ID=="0001"){
     res.send({
       success: true,
        msg:"查询详情信息成功",
        obj:{DepartmentInfo:{name:"行政部",leadDep:"",manager:"主管李平",count:23,buildTime:"2020-01-01"},
        DepartmentStaffInfo:[{name:"赵晓霞",sex:"男",phone:"13412521287",staffID:"00001"},
        {name:"沈军",sex:"女",phone:"13976512361",staffID:"00002"},
        {name:"王建国",sex:"女",phone:"16256327895",staffID:"00003"},
      ]
      }
     });
   }else{
     res.send({
       success: true,
        msg:"查询详情信息成功",
        obj:{DepartmentInfo:{ID:"0002",name:"人事部",leadDep:"",manager:"主管张孝昌",count:12,buildTime:"2020-01-01"},
        DepartmentStaffInfo:[{name:"王帅",sex:"男",staffID:"00001"},
        {name:"赵胜男",sex:"女",staffID:"00002"},
        {name:"史天",sex:"女",staffID:"00003"},
      ]}
     });
   }
   },
    '/api/detailMake/queryDetailMakeSource':(req,res)=>{
      if(req.query.moduleID==3){
        res.send({success:true,
        msg:"成功",
        obj:{
            detailData:[
              // {name:"TypeBasicInfo",type:"object",display:"",field:[{name:"name",type:"string",component:""},{name:"description",type:"string",component:""},{name:"creator",type:"string",component:""},{name:"createTime",type:"date",component:""}]},
                        // {name:"TypePropertyInfo",type:"array",display:"",field:[{name:"name",type:"string",component:""},{name:"creator",type:"string",component:""},{name:"createTime",type:"date",component:""}]},
                        {name:"SupplierInfo",type:"array",display:"",field:[{name:"name",type:"string",component:""},{name:"ID",type:"string",component:""}]},],
                      
            specialEvent:[],
        },
      })
      }else if(req.query.moduleID==2){
        res.send({success:true,
          msg:"成功",
          obj:{
              detailData:[{name:"DepartmentInfo",type:"object",display:"",field:[{name:"ID",type:"string",component:""},{name:"name",type:"string",component:""},{name:"leadDep",type:"string",component:""},{name:"manager",type:"date",component:""}
            ,{name:"count",type:"int",component:""},{name:"buildTime",type:"int",component:""}]},
                          {name:"DepartmentStaffInfo",type:"array",display:"",field:[{name:"name",type:"string",component:""},{name:"sex",type:"string",component:""},{name:"createTime",type:"date",component:""}]},
                         ],
                        
              specialEvent:[],
          },
      })
    }
  },
    '/api/detailMake/queryDetailSetting':{
        success:true,
        msg:"成功",
        obj:{
          ButtonSetting:[],
          SourceSetting:[]
        }
    },
    '/api/detailMake/queryDetailTimestamp':{
      success:true,
      msg:"成功",
      obj:{timestamp:1,},
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
  