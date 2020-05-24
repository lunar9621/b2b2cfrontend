import React, { PureComponent } from 'react';
import {Card, Table, Button, Radio, Popconfirm, Divider, message,Form,Select,Input} from 'antd';
import { connect } from 'dva';
import ManageDetail from '../../components/ManageDetail';
import localStorageDB from 'localstoragedb';



@Form.create()
class ContractDetail extends PureComponent {

  state = {  
    roleList:[],
    editSetting:[],
  };
  componentDidMount() {
    const { dispatch } = this.props;
    const { isEnabled } = this.state;
    const values = {
      isEnabled,
    };
    let db=new localStorageDB("myDB",localStorage);
    let result=db.queryAll("DetailSetting", {
      query: {moduleID: 0}
    });
    console.log("userdbDetailquery",result);
    // if(!result[0].timestamp){
    // dispatch({
    //     type: 'detailMakeModel/fetchDetailSetting',
    //     payload:0,
    //     callback:()=>{
    //       let {detailSetting}=this.props;
    //       db.insertOrUpdate("DetailSetting",{moduleID:3},{setting:detailSetting});
    //       this.setState({
    //         editSetting,
    //       })     
    //     }
    //   });
    // }
    //   dispatch({
    //     type: 'detailMakeModel/fetchDetailTimestamp',
    //     payload:0,
    //     callback:()=>{
    //       let {detailTimestamp:{timestamp}}=this.props;
    //       db.insertOrUpdate("DetailSetting",{moduleID:3},{timestamp:timestamp});
    //       let result=db.queryAll("EditSetting", {
    //         query: {moduleID: 0}
    //       });
    //       console.log("userdbDetailqueryafter",result);
    //       if(timestamp==result[0].timestamp){
    //         this.setState({
    //           detailSetting:result[0].setting,
    //         })
    //       }else if(result[0].timestamp!=''){
    //         dispatch({
    //           type: 'detailMakeModel/fetchDetailSetting',
    //           payload:0,
    //           callback:()=>{
    //             let {detailSetting}=this.props;
    //             db.insertOrUpdate("DetailSetting",{moduleID:3},{setting:detailSetting});
    //             this.setState({
    //               detailSetting,
    //             })     
    //           }
    //         });
    //       }
    //     }
    //   });
    
    }


  render() {
    //公用属性信息，默认属性信息都可在配置页配置，
        let SourceSetting =[{
            index: 0,
            name: "ContractInfo",
            title: "合同详细信息",
            displayMethod: "list",
            listItemSet: [
                {name: "合同号",
            field: "contractCode"},
            {name: "生效时间",
            field: "startDate"},
            {name: "失效时间",
            field: "deadDate"},
            {name: "审核状态",
            field: "auditStatus"},
            {name: "合同状态",
            field: "contractStatus"},
            {name: "企业签约主管",
            field: "signManager"},
            {name: "开户人",
            field: "kaihuPeople"},
            {name: "开户行",
            field: "kaihuBank"},
           ],
            bordered: true,
            itemLayout: "vertical",
            column: undefined,
        },
        {
          index: 1,
          name: "AccountInfo",
          title: "账号信息",
          displayMethod: "list",
          listItemSet: [
              {name: "合同号",
          field: "contractCode"},
          {name: "生效时间",
          field: "startDate"},
          {name: "失效时间",
          field: "deadDate"},
          {name: "审核状态",
          field: "auditStatus"},
          {name: "合同状态",
          field: "contractStatus"},
          {name: "企业签约主管",
          field: "signManager"},
          {name: "开户人",
          field: "kaihuPeople"},
          {name: "开户行",
          field: "kaihuBank"},
         ],
          bordered: true,
          itemLayout: "vertical",
          column: undefined,
      },
    ]
    let ButtonSetting=[{
      index:0,
      existCondition:{infoName:'ContractInfo',
      field:'contractStatus',
      value:'冻结',
      },
      isRouterButton:true,
      routerPath:'/ContractManage/Pay',
      routerFields:'contractCode',
      buttonText:'缴纳押金',
    },{index:1,
      existCondition:{infoName:'ContractInfo',
      field:'contractStatus',
      value:'冻结',
      },
      isRouterButton:false,
      eventHandlerDispatch:'ManageDetailModel/ContractQuit',
      eventHandlerFields:'contractCode',
      buttonText:'申请退出',},
      {index:2,
        existCondition:{infoName:'ContractInfo',
        field:'contractStatus',
        value:'正常',
        },
        isRouterButton:false,
        routerPath:'ContractManage/Renew',
        routerFields:'contractCode',
        buttonText:'直接续签',},
        {index:3,
          existCondition:{infoName:'ContractInfo',
          field:'contractStatus',
          value:'正常',
          },
          isRouterButton:false,
          routerPath:'ContractManage/Renew',
          routerFields:'contractCode',
          buttonText:'变更续签',},
          {index:4,
            existCondition:{infoName:'ContractInfo',
            field:'contractStatus',
            value:'正常',
            },
            isRouterButton:false,
            eventHandlerDispatch:'ManageDetailModel/contractQuit',
            eventHandlerFields:'contractCode',
            buttonText:'申请退出',}]
        return ( <ManageDetail
            dispatchType="ManageDetailModel/fetchContractDetail"
            SourceSetting={SourceSetting}
            ButtonSetting={ButtonSetting}
            initparams={this.props.location.params.ViewParam.contractCode}
            returnPath='/ContractManage'
          > 
          </ManageDetail>
        )
}
}

export default connect(({ detailMakeModel }) => ({
  detailSetting: detailMakeModel.detailSetting.obj,
  detailTimestamp:detailMakeModel.detailTimestamp.obj,
  loading: detailMakeModel.loading,
}))(Form.create()(ContractDetail))
